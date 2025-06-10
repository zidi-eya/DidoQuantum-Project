from src.schemas import CustomSchema
from src.schemas import JsonSerializable
from enum import IntEnum

class Recurrence(IntEnum):
    MONTH = 0,
    YEAR = 1


class Price(CustomSchema):
    id: str
    name: str
    description: str
    logo: str
    recurrence: Recurrence
    price: float
    currency: str


class Plan(CustomSchema):
    id: str

    def __init__(self, id: str) -> None:
        self.id = id


class CreateCheckoutSessionRequest(CustomSchema):
    price_id: str | None = None

class StripeEventObject:
    id: str
    object: str
    client_reference_id: None
    mode: str
    payment_status: str
    subscription: str
    success_url: str
    status: str
    plan: Plan

    def __init__(
        self,
        id: str,
        object: str,
        client_reference_id: None,
        mode: str,
        payment_status: str,
        subscription: str,
        success_url: str,
        plan: Plan,
    ) -> None:
        self.id = id
        self.object = object
        self.client_reference_id = client_reference_id
        self.mode = mode
        self.payment_status = payment_status
        self.subscription = subscription
        self.success_url = success_url
        self.plan = plan


class StripeEventData:
    object: StripeEventObject

    def __init__(self, object: StripeEventObject) -> None:
        self.object = object


class StripeEvent(JsonSerializable):
    type: str
    data: StripeEventData

    def __init__(self, type: str, object: StripeEventData) -> None:
        self.type = type
        self.object = object