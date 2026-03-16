import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <>
      <h1>Edit Post</h1>
      <PostForm
        initialValues={{ title: post.title, content: post.content }}
        onSubmit={handleSubmit}
        submitLabel="Update"
      />
    </>
  );
}
