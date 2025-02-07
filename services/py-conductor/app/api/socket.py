# Socket establishment and communication route

from fastapi import APIRouter, Response, status, WebSocket

router = APIRouter(
    prefix="/ws",
    tags=["websocket"],
)

@router.websocket('/')
async def socket_establish(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")
