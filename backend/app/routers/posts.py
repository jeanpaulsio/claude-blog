from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.repositories import post as post_repo
from app.schemas.post import PostCreate, PostResponse, PostUpdate

router = APIRouter(prefix="/posts", tags=["posts"])


@router.get("", response_model=list[PostResponse])
async def list_posts(db: AsyncSession = Depends(get_db)):
    return await post_repo.list_posts(db)


@router.get("/{post_id}", response_model=PostResponse)
async def get_post(post_id: int, db: AsyncSession = Depends(get_db)):
    post = await post_repo.get_post(db, post_id)
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@router.post("", response_model=PostResponse, status_code=201)
async def create_post(data: PostCreate, db: AsyncSession = Depends(get_db)):
    return await post_repo.create_post(db, data)


@router.put("/{post_id}", response_model=PostResponse)
async def update_post(
    post_id: int, data: PostUpdate, db: AsyncSession = Depends(get_db)
):
    post = await post_repo.get_post(db, post_id)
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return await post_repo.update_post(db, post, data)


@router.delete("/{post_id}", status_code=204)
async def delete_post(post_id: int, db: AsyncSession = Depends(get_db)):
    post = await post_repo.get_post(db, post_id)
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    await post_repo.delete_post(db, post)
