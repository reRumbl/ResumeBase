from typing import Annotated
from fastapi import Depends
from src.resume.service import ResumeService
from src.dependencies import SessionDep


def get_resume_service(session: SessionDep):
    return ResumeService(session)


ResumeServiceDep = Annotated[ResumeService, Depends(get_resume_service)]
