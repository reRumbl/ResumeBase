from logging.config import dictConfig
from pydantic import BaseModel


class LogConfig(BaseModel):
    '''Logging configuration to be set for the server'''

    LOGGER_NAME: str = 'resume_base'
    LOG_FORMAT: str = '%(levelprefix)s | %(asctime)s | %(message)s'
    LOG_LEVEL: str = 'DEBUG'

    version: int = 1
    disable_existing_loggers: bool = False
    formatters: dict = {
        'default': {
            '()': 'uvicorn.logging.DefaultFormatter',
            'fmt': LOG_FORMAT,
            'datefmt': '%Y-%m-%d %H:%M:%S',
        },
    }
    handlers: dict = {
        'default': {
            'formatter': 'default',
            'class': 'logging.StreamHandler',
            'stream': 'ext://sys.stderr',
        },
        'file': {
            'formatter': 'default',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': 'resume_base.log',
            'maxBytes': 1024 * 1024 * 5,  # 5 MB
            'backupCount': 5,
        },
    }
    loggers: dict = {
        'resume_base': {'handlers': ['default', 'file'], 'level': LOG_LEVEL},
    }


def setup_logging():
    dictConfig(LogConfig().model_dump())
