from typing import Self
from datetime import datetime
from sqlalchemy import ForeignKey, text as sa_text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.database import Base

class ResumeModel(Base):
    __tablename__ = 'resume'

    title: Mapped[str]
    content: Mapped[str]
    author_id: Mapped[int] = mapped_column(ForeignKey('user.id', ondelete='CASCADE'))
    
    updated_at: Mapped[datetime] = mapped_column(
        server_default=sa_text('TIMEZONE(\'UTC\', NOW())'),
        onupdate=sa_text('TIMEZONE(\'UTC\', NOW())')
    )
    
    author = relationship('UserModel', back_populates='resumes', lazy='selectin', passive_deletes=True)
    history = relationship(
        'ImprovementHistoryModel', 
        back_populates='resume', 
        lazy='selectin', 
        passive_deletes=True, 
        cascade='all, delete-orphan',
        order_by='ImprovementHistoryModel.created_at.desc()'
    )


class ImprovementHistoryModel(Base):
    __tablename__ = 'improvement_history'

    content_before: Mapped[str]
    content_after: Mapped[str]
    resume_id: Mapped[int] = mapped_column(ForeignKey('resume.id', ondelete='CASCADE'))

    resume = relationship('ResumeModel', back_populates='history', lazy='selectin')