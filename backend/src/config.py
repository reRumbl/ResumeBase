import os
from pydantic_settings import BaseSettings, SettingsConfigDict


def get_env_file_path():
    return os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env')


class DatabaseSettings(BaseSettings):
    model_config = SettingsConfigDict(env_file=get_env_file_path(), extra='ignore')
    
    DB_USER: str = 'postgres'
    DB_PASS: str = 'postgres'
    DB_HOST: str = 'localhost'
    DB_PORT: int = 5432
    DB_NAME: str = 'resumebase_db'
    DB_POOL_SIZE: int = 5
    DB_MAX_OVERFLOW: int = 10
    DB_ECHO: bool = False

    @property
    def asyncpg_url(self):
        return f'postgresql+asyncpg://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}'


class TestDatabaseSettings(BaseSettings):
    model_config = SettingsConfigDict(env_file=get_env_file_path(), extra='ignore')
    
    DBTEST_USER: str = 'postgres'
    DBTEST_PASS: str = 'postgres'
    DBTEST_HOST: str = 'localhost'
    DBTEST_PORT: int = 5432
    DBTEST_NAME: str = 'resumebase_db_test'
    
    @property
    def test_asyncpg_url(self):
        return f'postgresql+asyncpg://{self.DBTEST_USER}:{self.DBTEST_PASS}@{self.DBTEST_HOST}:{self.DBTEST_PORT}/{self.DBTEST_NAME}'


class AuthSettings(BaseSettings):
    model_config = SettingsConfigDict(env_file=get_env_file_path(), extra='ignore')
    
    JWT_SECRET_KEY: str = ''
    JWT_ALGHORITM: str= 'HS256'
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    JWT_REFRESH_TOKEN_EXPIRE_MINUTES: int = 10080


db_settings = DatabaseSettings()
test_db_settings = TestDatabaseSettings()
auth_settings = AuthSettings()