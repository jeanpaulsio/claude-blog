import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePost, fetchPost } from "../api/posts";
import type { Post } from "../types/post";

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    fetchPost(Number(id))
      .then(setPost)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    if (!post || !window.confirm("Are you sure you want to delete this post?")) return;
    await deletePost(post.id);
    navigate("/");
  }

  if (loading) return <p className="loading">Loading post...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!post) return <p className="error-message">Post not found.</p>;

  return (
    <>
      <Link to="/" className="back-link">
        &larr; Back to posts
      </Link>
      <article className="post-detail">
        <h1 className="post-detail-title">{post.title}</h1>
        <p className="post-detail-meta">
          {new Date(post.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="post-detail-content">{post.content}</div>
        <div className="post-detail-actions">
          <Link to={`/posts/${post.id}/edit`} className="btn btn-secondary">
            Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete
          </button>
        </div>
      </article>
    </>
  );
}
