from enum import Enum, IntEnum


class PaymentRequiredType(str, Enum):
    RECURRING_PAYMENT_FAILED = "recurring-payment-failed"
    SUBSCRIPTION_LIMIT_REACHED = "subscription-limit-reached"
    SUBSCRIPTION_LIMIT_REACHED_MEMBER = "subscription-limit-reached-member"
    INACTIVE_SUBSCRIPTION = "inactive-subscription"
    INACTIVE_SUBSCRIPTION_LOGGED_USER = "inactive-subscription-logged-user"

class ProviderType(IntEnum):
    INTERNAL = 0
    STRIPE = 1
