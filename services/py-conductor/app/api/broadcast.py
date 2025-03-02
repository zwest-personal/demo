# Debug Operations
# You would never, ever want this in a production env,
# but useful for just testing things out through the service

import nest_asyncio, asyncio
from fastapi import APIRouter, Response, status
from pydantic import BaseModel

from ..config import Config
from ..helpers.nats import Nats, NatsRequest

router = APIRouter(
    prefix= "/debug",
    tags=["debug"],
)



@router.post('/nats', status_code = 200)
async def nats_send(response: Response, message: NatsRequest):
    await Nats.publish(message)
    return {"status":"sent"}

