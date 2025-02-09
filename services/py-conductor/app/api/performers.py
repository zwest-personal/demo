# Performer actions

from fastapi import APIRouter, Response, status
from ..config import Config

router = APIRouter(
    prefix= Config().API_PATH + "/performers",
    tags=["performers"],
)

@router.get('/check', status_code = 501)
async def performers_check(response: Response):
    return [{"performer": "go", "status":"ready"}]

@router.get('', status_code = 501)
async def performers_get(response: Response):
    return [{"performer": "go"}]

@router.post('', status_code = 501)
async def performers_command(response: Response):
    return [{"performer": "go", "result":"acted"}]
