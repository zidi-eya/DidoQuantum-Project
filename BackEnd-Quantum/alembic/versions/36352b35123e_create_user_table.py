"""create user table

Revision ID: 36352b35123e
Revises: 
Create Date: 2025-03-05 21:12:03.844285

"""
from alembic import op
import sqlalchemy as sa
from datetime import datetime


# revision identifiers, used by Alembic.
revision = '36352b35123e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
  op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('name', sa.String(100), nullable=False),
        sa.Column('email', sa.String(150), unique=True, nullable=False),
        sa.Column('role', sa.String(50), nullable=False),
        sa.Column('profile_image', sa.String(255), nullable=True),
        sa.Column('created_at', sa.DateTime, nullable=False, default=datetime.utcnow),
        sa.Column('status', sa.String(20), nullable=False)
    )


def downgrade():
     op.drop_table("users")
