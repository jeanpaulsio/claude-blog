import { useEffect, useState } from "react";
import { fetchPosts } from "../api/posts";
import PostList from "../components/PostList";
import type { Post } from "../types/post";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="loading">Loading posts...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Posts</h1>
      </div>
      <PostList posts={posts} />
    </>
  );
}
