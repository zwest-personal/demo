from fastapi import FastAPI, Path

from .api import performers, socket, symphony

app = FastAPI(title="DoTheThing Conductor",
              description="Rest and Socket API for demoing proficiency in FastAPI and PyTorch and doing a fun thing.",
              version="0.1.0")

app.include_router(performers.router)
app.include_router(socket.router)
app.include_router(symphony.router)

# app.get('/ping')

