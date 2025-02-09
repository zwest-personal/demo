# Socket establishment and communication route

from fastapi import APIRouter, Response, status, WebSocket
from ..config import Config

router = APIRouter(
    prefix=Config().API_PATH + "/ws",
    tags=["websocket"],
)

@router.websocket('/')
async def socket_establish(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")
