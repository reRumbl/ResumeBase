from datetime import datetime, UTC
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from src.auth.schemas import User, UserRegister, UserLogin, TokenPairResponse
from src.auth.models import UserModel, BlackListTokenModel
from src.auth.utils import create_token_pair, decode_access_token, refresh_token_state
from src.auth.password import get_password_hash
from src.auth.constants import JTI, EXP
from src.auth.exceptions import (
    EmailAlreadyRegisteredException, IncorrectEmailOrPasswordException,
    UserNotFoundException
)


class AuthService:
    def __init__(self, session: AsyncSession):
        self.session = session
    
    async def register(self, data: UserRegister) -> User:
        user = await UserModel.find_by_email(self.session, data.email)
        if user:
            raise EmailAlreadyRegisteredException()
        
        user_data = data.model_dump(exclude={'confirm_password'})
        user_data['hashed_password'] = get_password_hash(user_data['password'].get_secret_value())
        user_data.pop('password', None)
        
        user = UserModel(**user_data)
        await user.save(self.session)
        
        user_schema = User.model_validate(user)
        
        return user_schema
    
    async def login(self, data: UserLogin) -> TokenPairResponse:
        user = await UserModel.authenticate(self.session, data.email, data.password.get_secret_value())
        if not user:
            raise IncorrectEmailOrPasswordException()
        
        user = User.model_validate(user)
        token_pair = create_token_pair(user)
        
        return TokenPairResponse(
            access_token=token_pair.access.token,
            refresh_token=token_pair.refresh.token
        )
    
    async def logout(self, token: str) -> None:
        payload = await decode_access_token(self.session, token)
        black_listed = BlackListTokenModel(id=payload[JTI], expire=datetime.fromtimestamp(payload[EXP]))
        await black_listed.save(self.session)
    
    async def get(self, user_id: UUID)  -> User:
        user = await self.session.get(UserModel, user_id)
        if not user:
            raise UserNotFoundException()
        user_schema = User.model_validate(user)
        return user_schema
    
    async def refresh(self, token: str) -> TokenPairResponse:
        new_access_token = await refresh_token_state(token)
        return TokenPairResponse(
            access_token=new_access_token,
            refresh_token=token
        )
