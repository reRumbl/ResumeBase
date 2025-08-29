import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_create_resume(client: AsyncClient):
    # First, register and login to get a token
    await client.post(
        '/auth/register',
        json={'email': 'test@example.com', 'password': 'password'},
    )
    login_response = await client.post(
        '/auth/login',
        data={'username': 'test@example.com', 'password': 'password'},
        headers={'Content-Type': 'application/x-www-form-urlencoded'},
    )
    token = login_response.json()['access_token']
    headers = {'Authorization': f'Bearer {token}'}

    # Create a resume
    response = await client.post(
        '/resume/',
        json={'title': 'My Resume', 'content': 'This is my resume.'},
        headers=headers,
    )
    assert response.status_code == 201
    assert response.json()['title'] == 'My Resume'
