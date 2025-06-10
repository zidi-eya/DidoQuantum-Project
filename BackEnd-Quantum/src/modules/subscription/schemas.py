from src.schemas import CustomSchema

class SubscriptionLimits(CustomSchema):
    kb_limit: int | None = None
    users_limit: int | None = None