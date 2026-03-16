import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchPost, updatePost } from "../api/posts";
import PostForm from "../components/PostForm";
import type { Post } from "../types/post";

function BackArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

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
        <BackArrow />
        Back to Post
      </Link>
      <h1 className="form-title">Edit Post</h1>
      <span className="form-title-rule" />
      <PostForm
        initialValues={{ title: post.title, content: post.content }}
        onSubmit={handleSubmit}
        submitLabel="Update"
      />
    </>
  );
}
