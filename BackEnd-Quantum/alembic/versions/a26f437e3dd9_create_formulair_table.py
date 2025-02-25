"""create formulair table

Revision ID: a26f437e3dd9
Revises: 
Create Date: 2025-02-24 12:37:25.008837

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a26f437e3dd9'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
            'formulair',
            sa.Column('id', sa.Integer, primary_key=True),
            sa.Column('firstname', sa.String(50), nullable=False),
            sa.Column('lastname', sa.String(50), nullable=False),
            sa.Column (('emil'), sa.String(50), nullable=False), 
            sa.Column('description', sa.Unicode(200)),

    )

def downgrade():
    op.drop_table('formulair')