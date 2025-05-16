"""create_company_projects_tables

Revision ID: 3bb525fd0def
Revises: 11704a0651a7
Create Date: 2025-05-16 12:49:29.130393

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3bb525fd0def'
down_revision = '11704a0651a7'
branch_labels = None
depends_on = None


def upgrade():
        op.create_table(
        'company_projects',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True, nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('description', sa.Text(), nullable=False),
        sa.Column('required_tech', sa.Text(), nullable=False),
        sa.Column('goal', sa.Text(), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='CASCADE')
    )



def downgrade():
        op.drop_table('company_projects')

