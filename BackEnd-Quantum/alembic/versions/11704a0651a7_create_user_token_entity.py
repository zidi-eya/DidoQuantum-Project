"""Create user token entity


Revision ID: 11704a0651a7
Revises: 7db3764a8b47
Create Date: 2025-03-17 10:14:39.594488

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '11704a0651a7'
down_revision = '7db3764a8b47'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "user_token",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("token", sa.String(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("purpose", sa.String(), nullable=False),
        sa.Column("valid_until", sa.DateTime(), nullable=False),
        sa.Column("created_at", sa.DateTime(), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["user.id"],
        ),
    )


def downgrade() -> None:
    op.drop_table("user_token")
