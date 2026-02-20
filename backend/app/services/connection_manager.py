from fastapi import WebSocket
from typing import Dict, List

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, List[WebSocket]] = {}

    async def connect(self, ride_id: int, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.setdefault(ride_id, []).append(websocket)

    def disconnect(self, ride_id: int, websocket: WebSocket):
        self.active_connections[ride_id].remove(websocket)

    async def broadcast(self, ride_id: int, message: dict):
        for ws in self.active_connections.get(ride_id, []):
            await ws.send_json(message)

manager = ConnectionManager()
