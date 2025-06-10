from src.modules.subscription.repository import repository as subscription_repository
from src.modules.auth.repository import repository as auth_repository
from src.modules.auth.models import User

from src.exceptions import NotFound
from src.config import app_config
from src.modules.stripe.schemas import StripeEventObject, Price, Recurrence
import stripe
from src.modules.subscription.constant import ProviderType
import datetime
import logging

stripe.api_key = app_config.STRIPE_API_KEY
endpoint_secret = app_config.STRIPE_ENPOINT_SECRET


class StripeService:
    async def create_checkout_session(self, user: User, price_id: str) -> str:
        try:
            url = ""

            if not user.subscription.external_subscription_id:
                subscription_data = {}
                remaining_trial_days = user.subscription.validity_date - datetime.datetime.now()

                if(remaining_trial_days.days > 0):
                    subscription_data = {
                        "trial_period_days" : remaining_trial_days.days
                    }                    

                checkout_session = stripe.checkout.Session.create(
                    line_items=[
                        {
                            "price": price_id,
                            "quantity": 1,
                        },
                    ],
                    mode="subscription",
                    success_url = app_config.CLIENT_URL + "/subscription/success",
                    cancel_url = app_config.CLIENT_URL + "/subscription/cancel",
                    client_reference_id=user.client_reference_id,
                    subscription_data =  subscription_data,
                    customer_email = user.email
                )


                url = checkout_session.url
            else:
                subscription = stripe.Subscription.retrieve(
                    user.subscription.external_subscription_id
                )

                if subscription["status"] == "canceled":
                    checkout_session= stripe.checkout.Session.create(
                    line_items=[
                        {
                            "price": price_id,
                            "quantity": 1,
                        },
                    ],
                    mode="subscription",
                    success_url = app_config.CLIENT_URL + "/subscription/success",
                    cancel_url = app_config.CLIENT_URL + "/subscription/cancel",
                    client_reference_id=user.client_reference_id,
                    customer_email = user.email
                )
                    url = checkout_session.url
                else: 
                    return self.get_subscription(user, subscription)
        except Exception as e:
            return str(e)

        return url

    async def get_stripe_subscription(self, subscription_id: str) -> stripe.Subscription:
        return stripe.Subscription.retrieve(subscription_id, expand=["items.data.price.product"])



    async def   process_checkout_session_completed(
        self,
        checkout_session: StripeEventObject,
    ):
        client_reference_id = checkout_session.client_reference_id

        user: User = None

        if client_reference_id is None:
            user = await auth_repository.get_user_by_email(checkout_session.customer_details.email)
        else:
            user = await auth_repository.get_user_by_client_reference_id(client_reference_id)


        susbcription_id = checkout_session.subscription

        if not user:
            logging.error("could not find user with client reference id %s", client_reference_id) 
            raise NotFound("User not found with this client reference id %s" % client_reference_id)

        if not user.subscription:
            logging.error("could not find subscription with client reference id %s", client_reference_id)
            raise NotFound("Subscription not found with this client reference id %s" % client_reference_id)
        
        await subscription_repository.patch_subscription(
                user.subscription.id, external_subscription_id = susbcription_id, provider = ProviderType.STRIPE
        )
        logging.info("updated subscription with client reference id %s and subscription id %s", client_reference_id, susbcription_id)

    async def process_invoice_paid(self, invoice_data: StripeEventObject):
        subscription_source_id = invoice_data.subscription
        subscription = await subscription_repository.get_susbcription_from_external_id(
            subscription_source_id
        )
        return
        #price_id = subscription["plan"]["id"]

        stripe_subscription = stripe.Subscription.retrieve(subscription_source_id, expand=["items.data.price.product"])

        is_active = stripe_subscription["status"] in ["active", "trialing"]

        if not subscription:
            logging.error("could not find subscription with subscription id %s", subscription_source_id)
            raise NotFound("Subscription not found")

        await subscription_repository.patch_subscription(
            subscription.id, provider=ProviderType.STRIPE, external_subscription_id=subscription_source_id
        )
        logging.info("updated subscription with subscription id %s", subscription_source_id)

    async def get_prices(self) -> list[Price]:
        response = stripe.Price.list(active = True, limit=10, expand=["data.product"])
        prices = []
        for item in response.data:
            if item.unit_amount is None:
                continue
            new_price = Price(
                id=item.id, 
                name=item.product.name,
                recurrence=Recurrence.MONTH if item.recurring.interval.upper() == "MONTH" else Recurrence.YEAR,
                description=item.product.description or "",
                logo=item.product.images[0],
                price=item.unit_amount/100,
                currency = item.currency.upper()
            )
            prices.append(new_price)
        return prices

    async def get_subscription(self, user: User) -> str:
        subscription = stripe.Subscription.retrieve(
                    user.subscription.external_subscription_id
                )
        billing_session = stripe.billing_portal.Session.create(
                        customer=subscription["customer"],
                        return_url=app_config.CLIENT_URL + "/subscription",
                    )

        return billing_session.url

service: StripeService = StripeService()
