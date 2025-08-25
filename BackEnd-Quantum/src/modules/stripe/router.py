import stripe
from fastapi import APIRouter, Request, Depends
from src.config import app_config
from src.modules.stripe.schemas import CreateCheckoutSessionRequest
from src.modules.stripe.service import service as stripe_service
from src.schemas import UrlResponse
from src.modules.stripe.schemas import StripeEvent
from src.exceptions import BadRequest
from src.modules.email.service import service as email_service
from src.modules.auth.repository import repository as auth_repository
from src.exceptions import NotFound
from src.modules.auth.models import User
from src.modules.auth.service import service as auth_service

router: APIRouter = APIRouter()
stripe.api_key = app_config.STRIPE_API_KEY
endpoint_secret = app_config.STRIPE_ENPOINT_SECRET


@router.get("/prices")
async def get_all() -> object:
    return await stripe_service.get_prices()

@router.post("/webhook")
async def webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    try:
        stripe_event_response = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError:
        email_service.send_email(
            app_config.NOTIFICATION_EMAIL_ADDRESS,
            "Invalid Payload",
            f"Stripe payload used: {payload}",
        )
        raise BadRequest(detail="Invalid payload")
    except stripe.error.SignatureVerificationError:
        email_service.send_email(
            app_config.NOTIFICATION_EMAIL_ADDRESS,
            "Invalid Signature",
            f"Stripe signature used: {sig_header}",
        )
        return BadRequest(detail="Invalid signature")

    try:
        stripe_event = StripeEvent.json_to_object(stripe_event_response)

        if stripe_event.type == "checkout.session.completed":
            await stripe_service.process_checkout_session_completed(
                checkout_session=stripe_event.data.object
            )

        if stripe_event.type == "invoice.paid":
            await stripe_service.process_invoice_paid(
                invoice_data=stripe_event.data.object
            )

    except Exception as e:
        email_service.send_email(
            app_config.NOTIFICATION_EMAIL_ADDRESS,
            "Error on Stripe Webhook",
            f"Processing Stripe Payload: {payload} throw the following exception {str(e)}",
        )
        raise

    return


@router.post("/checkout-session")
async def create_checkout_session(request: CreateCheckoutSessionRequest, user: User = Depends(auth_service.access_token_validation())):
    url = await stripe_service.create_checkout_session(user, request.price_id)
    return UrlResponse(url=url)

@router.get("/subscription")
async def get_subscription(user: User = Depends(auth_service.access_token_validation())):
    url = await stripe_service.get_subscription(user);
    return UrlResponse(url=url)