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
    if (!post || !window.confirm("Delete this post?")) return;
    await deletePost(post.id);
    navigate("/");
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <article>
      <h1>{post.title}</h1>
      <small style={{ color: "#666" }}>
        {new Date(post.created_at).toLocaleDateString()}
      </small>
      <div style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>
        {post.content}
      </div>
      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <Link to={`/posts/${post.id}/edit`}>Edit</Link>
        <button onClick={handleDelete} style={{ color: "red", background: "none", border: "none", cursor: "pointer" }}>
          Delete
        </button>
      </div>
    </article>
  );
}
