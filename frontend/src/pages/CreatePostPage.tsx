import { Link, useNavigate } from "react-router-dom";
import { createPost } from "../api/posts";
import PostForm from "../components/PostForm";

function BackArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

export default function CreatePostPage() {
  const navigate = useNavigate();

  async function handleSubmit(data: { title: string; content: string }) {
    const post = await createPost(data);
    navigate(`/posts/${post.id}`);
  }

  return (
    <>
      <Link to="/" className="back-link">
        <BackArrow />
        All Posts
      </Link>
      <h1 className="form-title">New Post</h1>
      <span className="form-title-accent" />
      <PostForm onSubmit={handleSubmit} submitLabel="Publish" />
    </>
  );
}
