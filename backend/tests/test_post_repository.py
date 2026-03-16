import pytest
from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.post import (
    create_post,
    delete_post,
    get_post,
    list_posts,
    update_post,
)
from app.schemas.post import PostCreate, PostUpdate


@pytest.mark.asyncio
async def test_create_and_get(db_session: AsyncSession):
    post = await create_post(db_session, PostCreate(title="Test", content="Body"))
    assert post.id is not None

    fetched = await get_post(db_session, post.id)
    assert fetched is not None
    assert fetched.title == "Test"


@pytest.mark.asyncio
async def test_list_posts_returns_all(db_session: AsyncSession):
    await create_post(db_session, PostCreate(title="First", content="A"))
    await create_post(db_session, PostCreate(title="Second", content="B"))

    posts = await list_posts(db_session)
    assert len(posts) == 2
    titles = {p.title for p in posts}
    assert titles == {"First", "Second"}


@pytest.mark.asyncio
async def test_update(db_session: AsyncSession):
    post = await create_post(db_session, PostCreate(title="Old", content="Old body"))
    updated = await update_post(db_session, post, PostUpdate(title="New"))
    assert updated.title == "New"
    assert updated.content == "Old body"


@pytest.mark.asyncio
async def test_delete(db_session: AsyncSession):
    post = await create_post(db_session, PostCreate(title="Del", content="Bye"))
    await delete_post(db_session, post)
    assert await get_post(db_session, post.id) is None


@pytest.mark.asyncio
async def test_get_nonexistent(db_session: AsyncSession):
    assert await get_post(db_session, 999) is None
