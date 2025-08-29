# ResumeBase: AI-Powered Resume Builder

ResumeBase — это веб-приложение с открытым исходным кодом, предназначенное для создания, управления и улучшения резюме с помощью искусственного интеллекта.

## ✨ Возможности

*   **Аутентификация пользователей**: Безопасная регистрация и вход в систему.
*   **CRUD для резюме**: Создание, просмотр, редактирование и удаление резюме.
*   **Улучшение с помощью ИИ**: Получение улучшенных версий текста резюме одним кликом.
*   **История улучшений**: Просмотр истории изменений для каждого резюме.
*   **Полная контейнеризация**: Простое развертывание и запуск с помощью Docker.

## 🛠️ Технологический стек

*   **Бэкенд**:
    *   Python 3.12
    *   FastAPI
    *   SQLAlchemy 2.0
    *   Alembic для миграций баз данных
    *   PostgreSQL
*   **Фронтенд**:
    *   React
    *   TypeScript
    *   Vite
    *   Tailwind CSS
*   **DevOps**:
    *   Docker & Docker Compose
    *   Nginx (для обслуживания фронтенда)

## 🚀 Начало работы

### Предварительные требования

*   [Docker](https://www.docker.com/get-started)
*   [Docker Compose](https://docs.docker.com/compose/install/)

### Установка и запуск

1.  **Клонируйте репозиторий**:
    ```bash
    git clone <URL-вашего-репозитория>
    cd ResumeBase
    ```

2.  **Настройте переменные окружения**:
    Создайте файл `.env` в директории `backend`, скопировав содержимое из `backend/.env.example` (если он есть) или используя следующие значения:
    ```env
    # backend/.env

    # Database settings
    DB_HOST=db
    DB_PORT=5432
    DB_USER=user
    DB_PASS=password
    DB_NAME=resume_db

    # JWT settings
    JWT_SECRET_KEY=your_super_secret_key
    JWT_ALGORITHM=HS256
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES=60
    JWT_REFRESH_TOKEN_EXPIRE_MINUTES=43200
    ```
    > **Важно**: Замените `your_super_secret_key` на случайную, сложную строку.

3.  **Запустите приложение с помощью Docker Compose**:
    ```bash
    docker-compose up --build
    ```
    Эта команда соберет образы для бэкенда и фронтенда, запустит контейнеры и применит миграции базы данных.

    _Примечание:_
    Для остановки и удаления контейнеров, томов и образов, используйте:

    ```bash
    docker-compose down -v
    ```
    Эта команда остановит и удалит контейнеры, а также тома, созданные Docker Compose.

4.  **Откройте приложение в браузере**:
    Перейдите по адресу [http://localhost:3000](http://localhost:3000).

## 📝 Использование API

Бэкенд предоставляет REST API. Интерактивная документация API (Swagger UI) доступна по адресу [http://localhost:8000/docs](http://localhost:8000/docs) после запуска приложения.

## 🧪 Тесты

### Запуск тестов

Для запуска тестов в директории `backend` вы можете использовать следующую команду:

```bash
pytest -v
```
