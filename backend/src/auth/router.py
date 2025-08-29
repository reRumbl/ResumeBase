from uuid import UUID
from fastapi import APIRouter, BackgroundTasks
from src.schemas import SuccessResponse
from src.auth.schemas import User, UserRegister, UserLogin, TokenPairResponse, TokenRequest
from src.auth.dependencies import AuthServiceDep
from src.decorators import default_router_exceptions

router = APIRouter(prefix='/auth', tags=['auth'])


@router.post('/register', response_model=User)
@default_router_exceptions
async def register(data: UserRegister, auth_service: AuthServiceDep):
    user = await auth_service.register(data) 
    return user


@router.post('/login', response_model=TokenPairResponse)
@default_router_exceptions
async def login(data: UserLogin, auth_service: AuthServiceDep):
    tokens = await auth_service.login(data)
    return tokens


@router.post('/logout', response_model=SuccessResponse)
@default_router_exceptions
async def logout(data: TokenRequest, auth_service: AuthServiceDep):
    await auth_service.logout(data.token)
    return SuccessResponse(message='Succesfully logout')


@router.get('/users/{user_id}', response_model=User)
@default_router_exceptions
async def get_user(user_id: UUID, auth_service: AuthServiceDep):
    user = await auth_service.get(user_id) 
    return user


@router.post('/refresh', response_model=TokenPairResponse)
@default_router_exceptions
async def refresh(data: TokenRequest, auth_service: AuthServiceDep):
    tokens = await auth_service.refresh(data.token)
    return tokens
