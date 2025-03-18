import jwt
import datetime

from fastapi import Request, Response
from pydantic_settings import BaseSettings
from fastapi.security import HTTPBearer, APIKeyHeader


class AuthConfig(BaseSettings):
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    REFRESH_TOKEN_EXPIRE_MINUTES: int
    JWT_ALGORITHM: str
    JWT_SECRET_KEY: str
    JWT_REFRESH_SECRET_KEY: str
    class Config:
        env_file = ".env"
        extra = "allow"


class HTTPBearerWithCookie(HTTPBearer):
    async def __check_token_from_cookies(
        self, token_key: str, secret_key: str, request: Request
    ) -> str | None:
        token = request.cookies.get(token_key)
        if not token:
            return None

        try:
            jwt.decode(
                token,
                secret_key,
                algorithms=[config.JWT_ALGORITHM],
            )
            return token
        except jwt.PyJWTError:
            return None

    async def __call__(self, request: Request, response: Response):
        token = await self.__check_token_from_cookies(
            "access_token", config.JWT_SECRET_KEY, request
        )
        if token:
            return token
        else:
            response.delete_cookie(key="access_token")

        refresh_token = await self.__check_token_from_cookies(
            "refresh_token", config.JWT_REFRESH_SECRET_KEY, request
        )
        if refresh_token:
            refresh_payload = jwt.decode(
                refresh_token,
                config.JWT_REFRESH_SECRET_KEY,
                algorithms=[config.JWT_ALGORITHM],
            )

            now = datetime.datetime.utcnow()
            new_token = jwt.encode(
                {
                    "sub": refresh_payload["sub"],
                    "iat": now,
                    "exp": now
                    + datetime.timedelta(minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES),
                },
                config.JWT_SECRET_KEY,
                algorithm=config.JWT_ALGORITHM,
            )
            response.set_cookie(
                key="access_token",
                value=new_token,
                httponly=True,
            )
            return new_token
        else:
            response.delete_cookie(key="refresh_token")

        bearer_token = await super().__call__(request)
        if bearer_token:
            return bearer_token.credentials


config: AuthConfig = AuthConfig()

bearer_security = HTTPBearerWithCookie(auto_error=False)
api_key_security = APIKeyHeader(name="X-API-Key", auto_error=False)
