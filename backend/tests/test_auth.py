import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_register_user(client: AsyncClient):
    response = await client.post(
        '/auth/register',
        json={'email': 'test@example.com', 'password': 'password'},
    )
    assert response.status_code == 201
    assert response.json()['email'] == 'test@example.com'


@pytest.mark.asyncio
async def test_login_for_access_token(client: AsyncClient):
    await client.post(
        '/auth/register',
        json={'email': 'test@example.com', 'password': 'password'},
    )
    response = await client.post(
        '/auth/login',
        data={'username': 'test@example.com', 'password': 'password'},
        headers={'Content-Type': 'application/x-www-form-urlencoded'},
    )
    assert response.status_code == 200
    assert 'access_token' in response.json()
    assert response.json()['token_type'] == 'bearer'
