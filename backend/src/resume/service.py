import logging
from uuid import UUID
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from src.auth.schemas import User
from src.resume.schemas import ResumeCreate, ResumeUpdate, Resume, ImprovementHistory
from src.resume.models import ResumeModel, ImprovementHistoryModel
from src.resume.exceptions import ResumeNotFoundException
from src.exceptions import Forbidden
from src.resume.exceptions import ResumeNotFoundException
from src.resume.models import ImprovementHistoryModel, ResumeModel

logger = logging.getLogger('resume_base')


class ResumeService:
    def __init__(self, session: AsyncSession):
        self.session = session
    
    def _check_for_authorship(self, resume: ResumeModel | None, user_id: UUID):
        if not resume:
            raise ResumeNotFoundException()
        if not resume.author_id == user_id:
            raise Forbidden()
    
    async def get(self, resume_id: UUID) -> Resume:
        logger.info(f'GetResume: resume_id={resume_id}')
        resume = await self.session.get(ResumeModel, resume_id)
        if not resume:
            raise ResumeNotFoundException()
        resume_schema = Resume.model_validate(resume)
        return resume_schema
    
    async def get_all_by_user(self, user_id: UUID) -> list[Resume]:
        logger.info(f'GetAllResumes: user_id={user_id}')
        query = select(ResumeModel).where(ResumeModel.author_id == user_id)
        res = await self.session.execute(query)
        resumes = [Resume.model_validate(resume) for resume in res.scalars().all()]
        return resumes
    
    async def create(self, resume_create: ResumeCreate) -> Resume:
        logger.info(f'CreateResume: user_id={resume_create.author_id}')
        resume_model = ResumeModel(**resume_create.model_dump())
        await resume_model.save(self.session)
        resume_schema = Resume.model_validate(resume_model)
        return resume_schema

    async def update(self, resume_id: UUID, resume_update: ResumeUpdate, current_user: User):
        logger.info(f'UpdateResume: resume_id={resume_id}, user_id={current_user.id}')
        resume = await self.session.get(ResumeModel, resume_id)
        self._check_for_authorship(resume, current_user.id)
        
        for key, value in resume_update.model_dump(exclude_unset=True).items():
            setattr(resume, key, value)
        
        await self.session.commit()
        
    async def improve(self, resume_id: UUID, current_user: User) -> Resume:
        logger.info(f'ImproveResume: resume_id={resume_id}, user_id={current_user.id}')
        resume = await self.session.get(ResumeModel, resume_id)    
        self._check_for_authorship(resume, current_user.id)
        if not resume:
            raise ResumeNotFoundException()
        
        content_before = resume.content
        content_after = resume.content + ' [Improved]'

        history_entry = ImprovementHistoryModel(
            resume_id=resume.id,
            content_before=content_before,
            content_after=content_after
        )
        self.session.add(history_entry)

        resume.content = content_after
        await self.session.commit()
        await self.session.refresh(resume)
        
        return Resume.model_validate(resume)

    async def get_history_by_resume(self, resume_id: UUID, current_user: User) -> list[ImprovementHistory]:
        logger.info(f'GetHistoryByResume: resume_id={resume_id}, user_id={current_user.id}')
        resume = await self.session.get(ResumeModel, resume_id)
        self._check_for_authorship(resume, current_user.id)
        if not resume:
            raise ResumeNotFoundException()

        history_records = resume.history
        
        return [ImprovementHistory.model_validate(record) for record in history_records]
        
    async def delete(self, resume_id: UUID, current_user: User):
        logger.info(f'DeleteResume: resume_id={resume_id}, user_id={current_user.id}')
        resume = await self.session.get(ResumeModel, resume_id)
        self._check_for_authorship(resume, current_user.id)
        
        await self.session.delete(resume)
        await self.session.commit()