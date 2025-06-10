"""create_subscription_table

Revision ID: 404ae1cf3faf
Revises: 86b9fae86f70
Create Date: 2025-06-05 00:01:27.356303

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '404ae1cf3faf'
down_revision = '86b9fae86f70'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "subscription",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("price_id_external", sa.String(), nullable=False),
        sa.Column("owner_id", sa.Integer(), nullable=False),
        sa.Column("is_active", sa.Boolean(), server_default=sa.text("false"), nullable=False),
        sa.ForeignKeyConstraint(["owner_id"], ["user.id"]),
        sa.Column("subscription_source_id", sa.String(), nullable=False)

    )

def downgrade() -> None:
    op.drop_table("subscription")
