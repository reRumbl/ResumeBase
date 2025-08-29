from typing import Self
from datetime import datetime
from sqlalchemy import select, text as sa_text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import Base
from src.auth.password import verify_password


class BlackListTokenModel(Base):
    __tablename__ = 'black_list_token'
    
    expire: Mapped[datetime]
    

class UserModel(Base):
    __tablename__ = 'user'
    
    email: Mapped[str] = mapped_column(unique=True, index=True)
    hashed_password: Mapped[str]
    updated_at: Mapped[datetime] = mapped_column(
        server_default=sa_text('TIMEZONE(\'UTC\', NOW())'),
        onupdate=sa_text('TIMEZONE(\'UTC\', NOW())')
    )
    
    resumes = relationship('ResumeModel', back_populates='author', lazy='selectin', passive_deletes=True)
    
    @classmethod
    async def find_by_email(cls, session: AsyncSession, email: str):
        query = select(cls).where(cls.email == email)
        result = await session.execute(query)
        return result.scalars().first()

    @classmethod
    async def authenticate(cls, session: AsyncSession, email: str, password: str) -> Self | None:
        user = await cls.find_by_email(session=session, email=email)
        if not user or not verify_password(password, user.hashed_password):
            return
        return user
