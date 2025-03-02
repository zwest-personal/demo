# Performer actions

from fastapi import APIRouter, Response, status
from ..config import Config, NATS_SUBJECT_BROADCAST
from pydantic import BaseModel
from ..helpers.nats import Nats, NatsRequest

router = APIRouter(
    prefix= "/performers",
    tags=["performers"],
)

# PerformerBroadcast is a singular command out to all the performers that they execute without question to all active sockets
class PerformerBroadcast(BaseModel):
    type: str
    output: str


@router.get('/check', status_code = 501)
async def performers_check(response: Response):
    return [{"performer": "go", "status":"ready"}]

@router.get('', status_code = 501)
async def performers_get(response: Response):
    return [{"performer": "go"}]

@router.post('', status_code = 501)
async def performers_command(response: Response):
    return [{"performer": "go", "result":"acted"}]

# Broadcast accepts in performer command direclty and sends it out to all listening performers
# It does not wait for confirmation. Used for testing/demonstration
@router.post('/broadcast', status_code = 201)
async def nats_broadcast(response: Response, message: PerformerBroadcast):
    broadcast = NatsRequest(message = PerformerBroadcast, subject = NATS_SUBJECT_BROADCAST)
    Nats.publish(broadcast)
    return
