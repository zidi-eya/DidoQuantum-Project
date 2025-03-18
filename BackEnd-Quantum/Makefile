# Start the containers in detached mode (background)
up-bg:
	docker-compose up -d

# Start the containers in foreground (shows logs)
up:
	docker-compose up

# Stop and remove running containers
kill:
	docker-compose kill

# Build the project using a build script
build:
	sh ./scripts/build.sh

# Show logs for the backend service
logs:
	docker-compose logs backend $(args)

# Show running containers
ps:
	docker-compose ps

# Execute a command inside the backend container
exec:
	docker-compose exec backend $(args)

# Run ruff (linter) on the src directory
ruff:
	docker-compose exec backend ruff $(args) src

# Format code using Black
black:
	docker-compose exec backend black src

# Run all linters (ruff + black)
lint: ruff black

# Create a new Alembic migration
db-make-migration:
	docker-compose exec backend alembic revision -m "$(args)"

# Apply database migrations
db-migrate:
	docker-compose exec backend alembic upgrade head

# Rollback database migrations
db-downgrade:
	docker-compose exec backend alembic downgrade $(args)

# Backup the database
db-backup:
	docker-compose exec db scripts/backup

# Copy database backup from container to host
db-mount-docker-backup:
	docker cp db:/backups/$(args) ./$(args)

# Restore database from a backup file
db-restore:
	docker-compose exec db scripts/restore $(args)

db-history:
	docker-compose exec backend alembic history
