# Full symphony actions

from fastapi import APIRouter, Response, status
from ..config import Config

router = APIRouter(
    prefix=Config().API_PATH + "/symphony",
    tags=["symphony"],
)

@router.get('', status_code = 501)
async def symphony_get(response: Response):
    return {"name":"starter"}

@router.post('', status_code = 501)
async def symphony_play(response: Response):
    return {"status":"started"}
