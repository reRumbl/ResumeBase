# 1. Base image
FROM python:3.12-slim

# 2. Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# 3. Set work directory
WORKDIR /app

# 4. Install poetry
RUN pip install poetry

# 5. Copy dependencies and install them
COPY poetry.lock pyproject.toml /app/
RUN poetry config virtualenvs.create false && poetry install --no-interaction --no-ansi --no-root

# 6. Copy all other files
COPY . /app/

# 7. Expose port
EXPOSE 8000

# 8. Add entrypoint
COPY ./entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]