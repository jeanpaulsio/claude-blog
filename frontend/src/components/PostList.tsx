import { Link } from "react-router-dom";
import type { Post } from "../types/post";

interface Props {
  posts: Post[];
}

export default function PostList({ posts }: Props) {
  if (posts.length === 0) {
    return <p>No posts yet. Create one!</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {posts.map((post) => (
        <li
          key={post.id}
          style={{
            borderBottom: "1px solid #eee",
            padding: "1rem 0",
          }}
        >
          <Link to={`/posts/${post.id}`}>
            <h2 style={{ margin: 0 }}>{post.title}</h2>
          </Link>
          <small style={{ color: "#666" }}>
            {new Date(post.created_at).toLocaleDateString()}
          </small>
          <p>{post.content.slice(0, 150)}...</p>
        </li>
      ))}
    </ul>
  );
}
