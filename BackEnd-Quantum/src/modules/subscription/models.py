from sqlalchemy import (
    ForeignKey,
)
from src.database import Base
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship
)
import datetime;


class PromoCode(Base):
    __tablename__ = "promo_code"
    id: Mapped[int] = mapped_column(primary_key=True)
    code: Mapped[str] = mapped_column(nullable=False)
    free_days: Mapped[int] = mapped_column(nullable=False)
    validity_date: Mapped[datetime.datetime] = mapped_column(nullable=False)

class Subscription(Base):
    __tablename__ = "subscription"
    id: Mapped[int] = mapped_column(primary_key=True)
    provider: Mapped[int] = mapped_column(nullable=False)
    owner_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    external_subscription_id: Mapped[str] = mapped_column(nullable=True, default="" )
    referer_id : Mapped[str] = mapped_column(nullable=True, default="VITAMINAI")
    validity_date: Mapped[datetime.datetime] = mapped_column(nullable=False)
    plan_id: Mapped[int] = mapped_column(nullable=False)
    promo_code_id: Mapped[int] = mapped_column(ForeignKey("promo_code.id"), nullable=True)
    promo_code: Mapped[PromoCode] = relationship(lazy="joined")


