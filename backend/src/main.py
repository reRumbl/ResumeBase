from contextlib import asynccontextmanager
import uvicorn
from fastapi import FastAPI
from src.auth.router import router as auth_router
from src.resume.router import router as resume_router
from src.logging_cfg import setup_logging

# --- App Lifespan ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    setup_logging()
    yield


# --- FastAPI App ---
app = FastAPI(
    title='ResumeBase',
    version='0.1.0',
    description='ResumeBase API',
    docs_url='/docs',
    redoc_url=None
)

# --- Routers ---
app.include_router(auth_router)
app.include_router(resume_router)


# --- Root Endpoint ---
@app.get('/')
async def root():
    return {'message': 'Hello World'}


# --- Entry Point ---
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)
