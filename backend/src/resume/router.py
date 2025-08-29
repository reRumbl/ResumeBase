from uuid import UUID
from fastapi import APIRouter
from src.resume.schemas import ResumeBase, ResumeCreate, ResumeUpdate, Resume, ImprovementHistory
from src.resume.dependencies import ResumeServiceDep
from src.auth.dependencies import CurrentUserDep
from src.schemas import SuccessResponse
from src.decorators import default_router_exceptions

router = APIRouter(prefix='/resume', tags=['resume'])


@router.get('/', response_model=list[Resume])
@default_router_exceptions
async def get_all_resumes(
    resume_service: ResumeServiceDep,
    current_user: CurrentUserDep
):
    resumes = await resume_service.get_all_by_user(current_user.id)
    return resumes


@router.get('/{resume_id}', response_model=Resume)
@default_router_exceptions
async def get_resume(resume_id: UUID, resume_service: ResumeServiceDep):
    resume = await resume_service.get(resume_id)
    return resume


@router.post('/', response_model=Resume)
@default_router_exceptions
async def create_resume(
    resume_data: ResumeBase, 
    resume_service: ResumeServiceDep,
    current_user: CurrentUserDep
):
    resume_create = ResumeCreate(
        **resume_data.model_dump(),
        author_id=current_user.id
    )
    resume = await resume_service.create(resume_create)
    return resume


@router.put('/{resume_id}', response_model=SuccessResponse)
@default_router_exceptions
async def update_resume(
    resume_id: UUID,
    resume_data: ResumeUpdate,
    resume_service: ResumeServiceDep,
    current_user: CurrentUserDep
):
    await resume_service.update(resume_id, resume_data, current_user)
    return SuccessResponse(message='Resume updated')


@router.patch('/{resume_id}/improve', response_model=Resume)
@default_router_exceptions
async def improve_resume(
    resume_id: UUID,
    resume_service: ResumeServiceDep,
    current_user: CurrentUserDep
):
    resume = await resume_service.improve(resume_id, current_user)
    return resume


@router.get('/{resume_id}/history', response_model=list[ImprovementHistory])
@default_router_exceptions
async def get_resume_history(
    resume_id: UUID,
    resume_service: ResumeServiceDep,
    current_user: CurrentUserDep
):
    history = await resume_service.get_history_by_resume(resume_id, current_user)
    return history


@router.delete('/{resume_id}')
@default_router_exceptions
async def delete_resume(
    resume_id: UUID,
    resume_service: ResumeServiceDep,
    current_user: CurrentUserDep
):
    await resume_service.delete(resume_id, current_user)
    return SuccessResponse(message='Resume deleted')