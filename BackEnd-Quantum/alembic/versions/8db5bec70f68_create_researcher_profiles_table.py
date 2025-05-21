"""create_researcher_profiles_table

Revision ID: 8db5bec70f68
Revises: 3bb525fd0def
Create Date: 2025-05-16 13:55:38.627321

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8db5bec70f68'
down_revision = '3bb525fd0def'
branch_labels = None
depends_on = None


def upgrade():
       op.create_table(
        'researcher_profiles',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True, nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column('skills', sa.Text(), nullable=False),
        sa.Column('topics', sa.Text(), nullable=False),
        sa.Column('publications', sa.Text()),
        sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='CASCADE')
    )


def downgrade():
        op.drop_table('researcher_profiles')

