import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_create_post(client: AsyncClient):
    response = await client.post(
        "/api/posts", json={"title": "Hello", "content": "World"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Hello"
    assert data["content"] == "World"
    assert "id" in data
    assert "created_at" in data


@pytest.mark.asyncio
async def test_list_posts(client: AsyncClient):
    await client.post("/api/posts", json={"title": "First", "content": "Content 1"})
    await client.post("/api/posts", json={"title": "Second", "content": "Content 2"})

    response = await client.get("/api/posts")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2


@pytest.mark.asyncio
async def test_get_post(client: AsyncClient):
    create = await client.post(
        "/api/posts", json={"title": "Test", "content": "Body"}
    )
    post_id = create.json()["id"]

    response = await client.get(f"/api/posts/{post_id}")
    assert response.status_code == 200
    assert response.json()["title"] == "Test"


@pytest.mark.asyncio
async def test_get_post_not_found(client: AsyncClient):
    response = await client.get("/api/posts/999")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_update_post(client: AsyncClient):
    create = await client.post(
        "/api/posts", json={"title": "Old", "content": "Old body"}
    )
    post_id = create.json()["id"]

    response = await client.put(
        f"/api/posts/{post_id}", json={"title": "New Title"}
    )
    assert response.status_code == 200
    assert response.json()["title"] == "New Title"
    assert response.json()["content"] == "Old body"


@pytest.mark.asyncio
async def test_delete_post(client: AsyncClient):
    create = await client.post(
        "/api/posts", json={"title": "Delete me", "content": "Bye"}
    )
    post_id = create.json()["id"]

    response = await client.delete(f"/api/posts/{post_id}")
    assert response.status_code == 204

    response = await client.get(f"/api/posts/{post_id}")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_create_post_validation(client: AsyncClient):
    response = await client.post("/api/posts", json={})
    assert response.status_code == 422
