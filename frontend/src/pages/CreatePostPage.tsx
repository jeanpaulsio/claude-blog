import { useNavigate } from "react-router-dom";
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
      <h1>New Post</h1>
      <PostForm onSubmit={handleSubmit} submitLabel="Create" />
    </>
  );
}
