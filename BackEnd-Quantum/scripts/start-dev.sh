#!/usr/bin/env bash

set -e

DEFAULT_MODULE_NAME=src.main  # Set this to match where your FastAPI app instance exists.

MODULE_NAME=${MODULE_NAME:-$DEFAULT_MODULE_NAME}
VARIABLE_NAME=${VARIABLE_NAME:-app}  # Change to `app` if your FastAPI instance is named `app`.
export APP_MODULE=${APP_MODULE:-"$MODULE_NAME:$VARIABLE_NAME"}

HOST=${HOST:-0.0.0.0}
PORT=${PORT:-8000}  # Make sure to use the port your API is supposed to run on.
DEBUG_PORT=${DEBUG_PORT:-5678}  # Adjust if you are using a different debugging port.
LOG_LEVEL=${LOG_LEVEL:-info}
LOG_CONFIG=${LOG_CONFIG:-/src/logging.ini}  # Ensure this path is correct.

# Start Uvicorn with live reload
exec python -m debugpy --listen $HOST:$DEBUG_PORT -m uvicorn --reload --proxy-headers --host $HOST --port $PORT --log-config $LOG_CONFIG "$APP_MODULE"