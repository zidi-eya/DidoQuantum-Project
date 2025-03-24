from __future__ import annotations
import datetime
import uuid

from sqlalchemy import select, delete, join
from src.modules.auth.constants import RoleType, UserTokenPurpose
from src.modules.auth.models import (
    User,
    UserToken,
    Role,
    ApiKey,
)
from src.database import async_session
from html_sanitizer import Sanitizer



class AuthRepository:

    def __init__(self):
        self.sanitizer = Sanitizer({'tags': set("zyz"), 'empty': set(), 'separate': set(), 'attributes': {}})


    async def get_role_by_id(self, role_id: int) -> Role | None:
        async with async_session() as session:
            result = await session.execute(select(Role).where(Role.id == role_id))
            return result.unique().scalar()

    async def get_roles_by_names(self, names: list[str]) -> list[Role]:
        async with async_session() as session:
            result = await session.execute(select(Role).where(Role.name.in_(names)))
            return result.scalars().all()

    async def get_roles_by_types(self, types: list[RoleType]) -> list[Role]:
        async with async_session() as session:
            result = await session.execute(
                select(Role).where(Role.type.in_([type.value for type in types]))
            )
            return result.scalars().all()

    async def get_user_by_id(self, user_id: int) -> User | None:
        async with async_session() as session:
            result = await session.execute(select(User).where(User.id == user_id))
            return result.unique().scalar()
        
    async def get_user_by_api_key(self, api_key: str) -> User | None:
        async with async_session() as session:
            j = join(User, ApiKey, User.id == ApiKey.user_id)
            query = select(User).select_from(j).where(ApiKey.key == api_key)
            result = await session.execute(query)
            return result.unique().scalar_one_or_none()

    async def get_user_by_email(self, email: str) -> User | None:
        async with async_session() as session:
            result = await session.execute(select(User).where(User.email == email.lower()))
            return result.unique().scalar()

    #async def get_user_by_client_reference_id(
     #   self, client_reference_id: str
    #) -> User | None:
     #   async with async_session() as session:
      #      result = await session.execute(
       #         select(User).where(User.client_reference_id == client_reference_id)
        #    )
         #   return result.unique().scalar()

    async def create_user(
        self,
        full_name: str,
        email: str,
        roles: list[str],
        is_active: bool = True,
        password: str | None = None,
    ) -> User:
        #client_reference_id = str(uuid.uuid4())
        user_roles = await self.get_roles_by_names(roles)
        async with async_session() as session:
            new_user = User(
                full_name=self.sanitizer.sanitize(full_name),
                email=email,
                hashed_password=None
                if password is None
                else await User.hash_password(password),
                is_active=is_active,
                roles=user_roles,
               # client_reference_id=client_reference_id,
            )
            session.add(new_user)
            await session.commit()
            await session.refresh(new_user)
            return new_user
    
    async def delete_user(self, id: int) -> None:
        async with async_session() as session:
            await session.execute(delete(User).where(User.id == id))
            await session.commit()

    async def create_user_token(
        self,
        user_id: int,
        purpose: UserTokenPurpose,
        valid_until: datetime.datetime,
    ) -> UserToken:
        async with async_session() as session:
            new_token = UserToken(
                user_id=user_id,
                token=str(uuid.uuid4()),
                purpose=purpose.value,
                valid_until=valid_until,
            )
            session.add(new_token)
            await session.commit()
            await session.refresh(new_token)
            return new_token

    async def get_user_token(
        self, token: str, purpose: UserTokenPurpose | None = None
    ) -> UserToken | None:
        async with async_session() as session:
            now = datetime.datetime.now()
            query = (
                select(UserToken)
                .where(UserToken.token == token)
                .where(UserToken.valid_until > now)
            )

            if purpose is not None:
                query = query.where(UserToken.purpose == purpose.value)

            result = await session.execute(query)
            return result.unique().scalar()

    async def remove_user_token(self, id: int) -> None:
        async with async_session() as session:
            await session.execute(delete(UserToken).where(UserToken.id == id))
            await session.commit()

    async def patch_user(self, user_id: int, **kwargs) -> User:
        async with async_session() as session:
            result = await session.execute(select(User).where(User.id == user_id))
            user = result.unique().scalar_one()
            for key, value in kwargs.items():
                if key == 'hashed_password':
                    setattr(user, key, value)
                elif value is not None:
                    setattr(user, key, self.sanitizer.sanitize(value))
            await session.commit()
            await session.refresh(user)
            return user

    async def create_api_key(
        self,
        user_id: int,
        name: str,
        key: str,
        prompt: bool,
        valid_until: datetime.date | None = None,
    ) -> ApiKey:
        async with async_session() as session:
            new_api_key = ApiKey(
                user_id=user_id,
                name=name,
                key=key,
                prompt=prompt,
                valid_until=valid_until,
            )
            session.add(new_api_key)
            await session.commit()
            await session.refresh(new_api_key)
            return new_api_key

    #async def create_api_key_collection_access(
     #   self, user_id: int, collection_id: int
    #) -> ApiKeyCollectionAccess:
    #    async with async_session() as session:
     #       new_access = ApiKeyCollectionAccess(
      #          api_key_id=user_id, collection_id=collection_id
       #     )
        #    session.add(new_access)
         #   await session.commit()
          #  return new_access

    async def get_api_keys_by_user_id(self, user_id: int) -> list[ApiKey]:
        async with async_session() as session:
            result = await session.execute(
                select(ApiKey).where(ApiKey.user_id == user_id)
            )
            return result.unique().scalars().all()

    async def get_api_key_by_id(self, id: int) -> ApiKey | None:
        async with async_session() as session:
            result = await session.execute(select(ApiKey).where(ApiKey.id == id))
            return result.unique().unique().scalar()

    async def get_api_key(self, api_key: str) -> ApiKey | None:
        async with async_session() as session:
            result = await session.execute(select(ApiKey).where(ApiKey.key == api_key))
            return result.unique().scalar()

    async def remove_api_key(self, id: int) -> None:
        async with async_session() as session:
            await session.execute(delete(ApiKey).where(ApiKey.id == id))
            await session.commit()


repository: AuthRepository = AuthRepository()
