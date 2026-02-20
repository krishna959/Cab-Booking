from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.services.connection_manager import manager

router = APIRouter()

@router.websocket("/ws/ride/{ride_id}")
async def ride_tracking(websocket: WebSocket, ride_id: int):
    await manager.connect(ride_id, websocket)

    try:
        while True:
            data = await websocket.receive_json()
            await manager.broadcast(ride_id, data)

    except WebSocketDisconnect:
        manager.disconnect(ride_id, websocket)
