import { Link } from "react-router-dom";
import type { Post } from "../types/post";

interface Props {
  posts: Post[];
}

export default function PostList({ posts }: Props) {
  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state-title">No posts yet</p>
        <p className="empty-state-text">Create your first blog post to get started.</p>
        <Link to="/posts/new" className="btn btn-primary">
          Create Post
        </Link>
      </div>
    );
  }

  return (
    <ul className="post-list" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {posts.map((post) => (
        <li key={post.id} className="post-item">
          <Link to={`/posts/${post.id}`} className="post-item-link">
            <h2 className="post-item-title">{post.title}</h2>
            <p className="post-item-meta">
              {new Date(post.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="post-item-excerpt">
              {post.content.length > 150
                ? post.content.slice(0, 150) + "..."
                : post.content}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
