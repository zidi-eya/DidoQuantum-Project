"""create_matches_table

Revision ID: 86b9fae86f70
Revises: 8db5bec70f68
Create Date: 2025-05-16 13:59:24.293770

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '86b9fae86f70'
down_revision = '8db5bec70f68'
branch_labels = None
depends_on = None


def upgrade():
     op.create_table(
        'matches',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True, nullable=False),
        sa.Column('researcher_id', sa.Integer()),
        sa.Column('project_id', sa.Integer()),
        sa.Column('score', sa.Float(), nullable=False),
        sa.Column('feedback', sa.Text()),
        sa.ForeignKeyConstraint(['researcher_id'], ['researcher_profiles.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['project_id'], ['company_projects.id'], ondelete='CASCADE')
    )


def downgrade():
        op.drop_table('matches')

