import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchPost, updatePost } from "../api/posts";
import PostForm from "../components/PostForm";
import type { Post } from "../types/post";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchPost(Number(id))
      .then(setPost)
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(data: { title: string; content: string }) {
    if (!id) return;
    await updatePost(Number(id), data);
    navigate(`/posts/${Number(id)}`);
  }

  if (loading) return <p className="loading">Loading...</p>;
  if (!post) return <p className="error-message">Post not found.</p>;

  return (
    <>
      <Link to={`/posts/${post.id}`} className="back-link">
        &larr; Back to post
      </Link>
      <h1 className="form-title">Edit Post</h1>
      <PostForm
        initialValues={{ title: post.title, content: post.content }}
        onSubmit={handleSubmit}
        submitLabel="Update"
      />
    </>
  );
}
