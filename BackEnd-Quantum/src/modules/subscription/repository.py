from sqlalchemy import select
from src.modules.subscription.models import (
    Subscription,
    PromoCode
)
from src.database import async_session
from datetime import datetime
from datetime import timedelta
from src.config import app_config
from src.exceptions import BadRequest


class SubsRepository:
    async def create_subscription(
        self,
        user_id: int,
        referer_id: str,
        promo_code: str,
        provider: int = 0,
        plan_id: int = 0
    ) -> Subscription:
        async with async_session() as session:
            promo_code_id = None
            if promo_code != "":
                promo = await session.execute(
                    select(PromoCode).where(PromoCode.code == promo_code)
                )
                promo = promo.scalar_one_or_none()
                if promo is None:
                    raise BadRequest("Invalid promo code")
                
                if promo.validity_date < datetime.now(): 
                    raise BadRequest("Promo code has expired")
                promo_code_id = promo.id

            new_subscription = Subscription(
                owner_id=user_id,
                referer_id=referer_id,
                promo_code_id=promo_code_id,
                provider = provider,
                validity_date=datetime.now() + timedelta(days=app_config.TRIAL_PERIOD_DAYS) if promo_code == "" else datetime.now() + timedelta(days=promo.free_days),
                plan_id = plan_id
            )
            session.add(new_subscription)
            await session.commit()
            await session.refresh(new_subscription)
            return new_subscription

    async def get_susbcription_by_owner_id(self, owner_id: int) -> Subscription:
        async with async_session() as session:
            result = await session.execute(
                select(Subscription).where(Subscription.owner_id == owner_id)
            )
            return result.unique().scalar()

    async def patch_subscription(self, subscription_id: int, **kwargs) -> Subscription:
        async with async_session() as session:
            result = await session.execute(
                select(Subscription).where(Subscription.id == subscription_id)
            )
            subscription = result.unique().scalar_one()
            for key, value in kwargs.items():
                if value is not None:
                    setattr(subscription, key, value)
            await session.commit()
            await session.refresh(subscription)
            return subscription

    async def get_susbcription_from_external_id(
        self, external_id: str
    ) -> Subscription:
        async with async_session() as session:
            result = await session.execute(
                select(Subscription).where(
                    Subscription.external_subscription_id == external_id
                )
            )
            return result.unique().scalar()

repository: SubsRepository = SubsRepository()
