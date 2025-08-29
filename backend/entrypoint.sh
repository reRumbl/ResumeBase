#!/bin/bash

# Run migrations
alembic revision --autogenerate -m "Database creation"
alembic upgrade head

# Start the application
python3 src/main.py