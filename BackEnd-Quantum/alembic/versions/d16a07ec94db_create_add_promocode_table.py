"""create_add_promocode_table

Revision ID: d16a07ec94db
Revises: 2d649f8d5e84
Create Date: 2025-06-05 00:53:12.250360

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd16a07ec94db'
down_revision = '2d649f8d5e84'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table("promo_code", sa.Column("id", 
        sa.Integer(), nullable=False, unique=True),
        sa.Column("code", sa.String(), nullable=False, unique=True),
        sa.Column("free_days", sa.Integer(), nullable=False),
        sa.Column("validity_date", sa.DateTime(), nullable=False)
    )

    op.create_index(op.f("ix_promo_code_code"), "promo_code", ["code"], unique=True)

    op.drop_column("subscription", "promo_code")
    op.add_column("subscription", sa.Column("promo_code_id", sa.Integer(), nullable=True))


    op.create_foreign_key("fk_subscription_promo_code", "subscription", "promo_code", ["promo_code_id"], ["id"])




def downgrade() -> None:
    op.drop_table("promo_code")
