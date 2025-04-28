from __future__ import annotations
import logging
import os
import tempfile
import asyncio
from fastapi import UploadFile, WebSocket
from starlette.datastructures import UploadFile
from playwright.async_api import async_playwright
from src.modules.auth.models import User
from src.config import app_config
from src.exceptions import InvalidFileSize
from src.constants import Environment
from typing import Union
import psutil


class OpenChromiumBrowser:
    def __init__(self):
        self.browser = None
        self.playwright = None

    async def start(self):
        if not self.playwright:
            self.playwright = await async_playwright().start()
        if not self.browser:
            self.browser = await self.playwright.chromium.launch()
        return self.browser

    async def stop(self):
        if self.browser:
            await self.browser.close()
            self.browser = None
        if self.playwright:
            await self.playwright.stop()
            self.playwright = None

    async def __aenter__(self):
        return await self.start()

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.stop()


class OSUtils:
    @staticmethod
    def is_first_worker_process():
        parent_process = psutil.Process(os.getppid())
        children = parent_process.children(recursive=True)
        return children[0].pid == os.getpid()


class AsyncUtils:
    @staticmethod
    async def repeat_task(interval: int, callback: callable):
        while True:
            try:
                await callback()
            except Exception as e:
                logging.exception(f"Error in repeating task: {e}")
            await asyncio.sleep(interval)

    @staticmethod
    def run_repeating_task(
        interval: int, callback: callable, main_worker_only: bool = False
    ):
        if (
            app_config.ENVIRONMENT != Environment.LOCAL
            and main_worker_only
            and not OSUtils.is_first_worker_process()
        ):
            return

        asyncio.create_task(AsyncUtils.repeat_task(interval, callback))


class FileValidationUtils:
    @staticmethod
    def validate_file_size(uploaded_file: UploadFile):
        match uploaded_file.content_type:
            case "application/pdf" | "application/vnd.openxmlformats-officedocument.wordprocessingml.document" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | "text/csv":
                if uploaded_file.size > app_config.TEXT_FILE_SIZE:
                    raise InvalidFileSize()
            case "audio/mpeg" | "audio/mp3" | "audio/mp4" | "audio/mpga" | "audio/x-m4a" | "audio/wav" | "audio/wave" | "audio/vnd.wave" | "audio/webm":
                if uploaded_file.size > app_config.AUDIO_FILE_SIZE:
                    raise InvalidFileSize()


class _ConnectionManager:
    connections: dict[int, WebSocket] = dict()

    def connect(self, ws: WebSocket, owner_id: int):
        """
        Connects a WebSocket instance to a user.

        Args:
            ws (WebSocket): The WebSocket instance.
            owner_id (int): The user id.
        """
        _ConnectionManager.connections[owner_id] = ws

    def disconnect(self, owner_id: int):
        """
        Disconnects a user from the WebSocket.

        Args:
            owner_id (int): The user id.
        """
        try:
            _ConnectionManager.connections.pop(owner_id)
        except KeyError:
            # Reaching this point means the websocket
            # was not registered to begin with
            pass

    async def notify(self, owner_id: int, type: str, message: str, tag: str = ""):
        """
        Notifies a int with a message.

        Args:
            owner_id (int): The user id.
            type (str): The type of the message.
            message (str): The content of the message.
        """
        ws = _ConnectionManager.connections.get(owner_id)
        if ws is not None:
            try:
                await ws.send_json({"type": type, "message": message, "tag": tag})
            except Exception as e:
                logging.exception(f"Error while sending message: {e}", exc_info=True)
                await self.disconnect(owner_id=owner_id)

    async def broadcast(self, target_ids: list[int], type: str, message: str, tag: str = ""):
        logging.info(f"Broadcasting tag {tag} to {len(target_ids)} users")
        for target_id in target_ids:
            await self.notify(owner_id=target_id, type=type, message=message, tag=tag)


connection_manager = _ConnectionManager()
