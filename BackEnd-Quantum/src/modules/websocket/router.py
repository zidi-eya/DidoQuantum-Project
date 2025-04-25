import asyncio
import logging
from fastapi import APIRouter, WebSocket

from websockets import ConnectionClosedError, ConnectionClosedOK
from src.modules.auth.config import config as auth_config
from src.modules.auth.service import service as auth_service
from src.utils import connection_manager
from starlette.websockets import WebSocketDisconnect

router: APIRouter = APIRouter()


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    user = None
    connection_start_time = None
    try:
        access_token = websocket.cookies["refresh_token"]
        user = await auth_service.get_user_from_token(
            token=access_token, key=auth_config.JWT_REFRESH_SECRET_KEY
        )
        await websocket.accept()
        connection_manager.connect(websocket, user.id)
        connection_start_time = asyncio.get_event_loop().time()
        logging.info(f"Connection established for user {user.id}")
        
        while True:
            message = await websocket.receive_json()
            logging.debug(f"Received message from user {user.id}: {message}")
            
            # Every 5 minutes, log the connection duration
            current_time = asyncio.get_event_loop().time()
            if current_time - connection_start_time > 300:
                duration = current_time - connection_start_time
                logging.info(f"Connection for user {user.id} active for {duration:.2f} seconds")
                connection_start_time = current_time

    except RuntimeError as e:
        logging.error(f"RuntimeError for user {user.id if user else 'Unknown'}: {e}")
    except ConnectionClosedOK:
        logging.info(f"Websocket Connection closed properly for user {user.id if user else 'Unknown'}")
    except ConnectionClosedError as e:
        logging.error(f"Websocket Connection closed unexpectedly for user {user.id if user else 'Unknown'}: {e}")
    except WebSocketDisconnect:
        logging.error(f"Websocket Connection disconnected for user {user.id if user else 'Unknown'}")
    except Exception as e:
        logging.error(f"Websocket Connection error for user {user.id if user else 'Unknown'}: {e}")
    finally:
        if user:
            connection_manager.disconnect(user.id)
        if connection_start_time:
            duration = asyncio.get_event_loop().time() - connection_start_time
            logging.info(f"Connection for user {user.id if user else 'Unknown'} lasted {duration:.2f} seconds")


@router.websocket("/ws/healthcheck")
async def websocket_healthcheck(websocket: WebSocket):
    await websocket.accept()
    while True:
        await asyncio.sleep(10)  # Send a health check message every 10 seconds
        try:
            await websocket.send_json({"health": "ok"})
        except Exception as e:
            logging.exception(f"Error sending message: {e}")
            break
