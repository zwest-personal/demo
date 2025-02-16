from fastapi import FastAPI, Path, Request

from .api import performers, socket, symphony
from .config import Config

app = FastAPI(title="DoTheThing Demo Conductor",
              description="Rest and Socket API for demoing proficiency in FastAPI and PyTorch and doing a fun thing.",
              version="0.1.0",
              root_path=Config().API_PATH,
              docs_url="/docs",
          #    openapi_url="/openapi.json",
              redoc_url=None)

app.include_router(performers.router)
app.include_router(socket.router)
app.include_router(symphony.router)