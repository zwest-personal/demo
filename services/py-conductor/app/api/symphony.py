# Full symphony actions

from fastapi import APIRouter, Response, status
from ..config import Config
from ..models.symphony import find_by_id
import pprint

router = APIRouter(
    prefix="/symphony",
    tags=["symphony"],
)

# Get a single fully Symphony by ID
@router.get('/{symphony_id}', status_code = 200)
async def symphony_get(response: Response, symphony_id: str):
    s = find_by_id(symphony_id)
    if s is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return
    return s

@router.post('', status_code = 501)
async def symphony_play(response: Response):
    return {"status":"started"}
