import { Link, useNavigate } from "react-router-dom";
import { createPost } from "../api/posts";
import PostForm from "../components/PostForm";

export default function CreatePostPage() {
  const navigate = useNavigate();

  async function handleSubmit(data: { title: string; content: string }) {
    const post = await createPost(data);
    navigate(`/posts/${post.id}`);
  }

  return (
    <>
      <Link to="/" className="back-link">
        &larr; Back to posts
      </Link>
      <h1 className="form-title">New Post</h1>
      <PostForm onSubmit={handleSubmit} submitLabel="Publish" />
    </>
  );
}
