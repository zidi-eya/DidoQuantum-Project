import inspect

from fastapi import Depends, Request, Response
from src.modules.auth.models import User
from src.modules.auth.config import bearer_security, api_key_security
from src.exceptions import PermissionDenied
from src.modules.auth.config import config as auth_config
from src.config import app_config

def auth_chain(callbacks: list[callable]):
    async def chain(
        request: Request,
        token=Depends(bearer_security),
        api_key=Depends(api_key_security),
    ) -> User:
        for callback in callbacks:
            try:
                # Check the parameters of the callback
                params = inspect.signature(callback).parameters

                # Prepare arguments based on the callback's parameters
                callback_kwargs = {}
                if "request" in params:
                    callback_kwargs["request"] = request
                if "token" in params:
                    callback_kwargs["token"] = token
                if "api_key" in params:
                    callback_kwargs["api_key"] = api_key

                # Call the callback with the appropriate arguments
                value = await callback(**callback_kwargs)

                if value is not None:
                    return value
            except Exception as _:
                continue
        raise PermissionDenied()

    return chain


def set_cookie(
    response: Response,
    key: str,
    value: str,
    max_age: int | None = None,
    httponly: bool = True,
) -> None:
    response.set_cookie(key=key, value=value, httponly=httponly, max_age=max_age, samesite=app_config.COOKIES_CONFIG_SAMESITE, secure=True)


def set_access_token_cookie(
    response: Response, token: str, persist_cookie: bool = True
) -> None:
    set_cookie(
        response=response,
        key="access_token",
        value=token,
        max_age=auth_config.ACCESS_TOKEN_EXPIRE_MINUTES * 60
        if persist_cookie
        else None,
    )


def set_refresh_token_cookie(
    response: Response, token: str, persist_cookie: bool = False
) -> None:
    set_cookie(
        response=response,
        key="refresh_token",
        value=token,
        max_age=auth_config.REFRESH_TOKEN_EXPIRE_MINUTES * 60
        if persist_cookie
        else None,
    )

