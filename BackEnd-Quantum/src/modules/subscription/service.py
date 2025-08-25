from src.modules.auth.models import User
from src.modules.subscription.repository import repository as subscription_repository
from src.modules.subscription.models import Subscription
from src.modules.subscription.schemas import SubscriptionLimits
from src.exceptions import NotFound
import stripe


class SubscriptionService:
    async def create_subscription(
        self,
        user_id: str,
        referer_id: str = "",
        promo_code: str = "",
    ) -> Subscription:
        subscription = await subscription_repository.create_subscription(
            user_id, referer_id, promo_code, 
        )
        return subscription

    async def patch_subscription(self, subscription_id: int, **kwargs) -> User:
        return await subscription_repository.patch_subscription(
            subscription_id, **kwargs
        )

    async def get_susbcription_by_userId(
        self,
        user_id: int,
    ) -> Subscription:
        subscription = await subscription_repository.get_susbcription_by_owner_id(user_id)
        return subscription
    
    async def get_subscription_limit(self, subscription: Subscription) -> SubscriptionLimits:
        response = stripe.Price.list(limit=10, expand=["data.product"])
        filtered_products = [ item for item in response.data if item.id == subscription.price_id_external ]

        if not filtered_products:
            raise NotFound("Price not found")
        else:
            product = filtered_products[0].product
            return SubscriptionLimits(
                kb_limit=product.metadata.kb_limit or None,
                users_limit=product.metadata.users_limit or None,
            )


service: SubscriptionService = SubscriptionService()
