"""create_subscription_trial_table

Revision ID: 2d649f8d5e84
Revises: 404ae1cf3faf
Create Date: 2025-06-05 00:46:36.342594

"""
from alembic import op
import sqlalchemy as sa
from datetime import datetime
from datetime import timedelta

# revision identifiers, used by Alembic.
revision = '2d649f8d5e84'
down_revision = '404ae1cf3faf'
branch_labels = None
depends_on = None


def upgrade():
    conn = op.get_bind()
    op.add_column("subscription", sa.Column("validity_date", sa.DateTime(), nullable=True))
    op.add_column("subscription", sa.Column("referer_id", sa.String(), nullable=True))
    op.add_column("subscription", sa.Column("promo_code", sa.String(), nullable=True))
    op.alter_column("subscription", "price_id_external",  nullable=True)
    op.alter_column("subscription", "subscription_source_id", nullable=True)
    q = sa.sql.text(
            """
            UPDATE subscription SET validity_date = :p1
            """
        )
    conn.execute(
        q, {"p1" : datetime.now() + timedelta(days=14)}
    )
    op.alter_column("subscription", "validity_date", nullable=False)
    op.add_column("subscription", sa.Column("subscription_name", sa.String(), nullable=True))
    op.create_unique_constraint('uc_subscription_owner_id', 'subscription', ['owner_id'])

    conn.execute(sa.sql.text(
        """
        INSERT INTO subscription (owner_id, is_active, validity_date)
        SELECT id AS owner_id, true, NOW() + INTERVAL '14 days'
        FROM "user"
        WHERE id NOT IN (SELECT owner_id FROM subscription);
        """
    ))




def downgrade() -> None:
    op.drop_column("subscription", "validity_date")
    op.drop_column("subscription", "referer_id")
    op.drop_column("subscription", "promo_code")
    op.drop_column("subscription", "subscription_name")
    op.drop_constraint('uc_subscription_owner_id', 'subscription')
    #op.alter_column("subscription", "price_id_external",  nullable=False)
    #op.alter_column("subscription", "subscription_source_id", nullable=False)
