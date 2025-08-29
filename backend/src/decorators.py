import logging
from functools import wraps
from fastapi import HTTPException
from src.exceptions import InternalServerError

logger = logging.getLogger('resume_base')


def default_router_exceptions(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        try:
            return await func(*args, **kwargs)
        except HTTPException as ex:
            raise ex
        except Exception as ex:
            logger.error(str(ex))
            raise InternalServerError()
    return wrapper
