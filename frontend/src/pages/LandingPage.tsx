import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPosts } from "../api/posts";
import type { Post } from "../types/post";
import { readingTime } from "../utils/readingTime";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function LandingPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const featured = posts[0];
  const recent = posts.slice(1, 4);

  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <p className="hero-eyebrow">Est. 2026</p>
          <h1 className="hero-title">
            Claude<br />Blog
          </h1>
          <div className="hero-rule" />
          <p className="hero-subtitle">
            Thoughtful writing on software,<br />
            technology, and the craft of building.
          </p>
          <div className="hero-actions">
            <Link to="/posts" className="btn btn-primary hero-btn">
              Read the Blog
              <ArrowRight />
            </Link>
            <Link to="/posts/new" className="btn btn-secondary hero-btn">
              Start Writing
            </Link>
          </div>
        </div>
        <div className="hero-decoration" aria-hidden="true" />
      </section>

      {/* Featured Post */}
      {!loading && featured && (
        <section className="landing-section">
          <div className="section-header">
            <h2 className="section-title">Latest</h2>
            <div className="section-rule" />
          </div>
          <Link to={`/posts/${featured.id}`} className="featured-card">
            <div className="featured-content">
              <p className="featured-meta">
                {formatDate(featured.created_at)}
                <span className="meta-dot">&middot;</span>
                {readingTime(featured.content)}
              </p>
              <h3 className="featured-title">{featured.title}</h3>
              <p className="featured-excerpt">
                {featured.content.length > 280
                  ? featured.content.slice(0, 280) + "..."
                  : featured.content}
              </p>
              <span className="featured-read">
                Read more <ArrowRight />
              </span>
            </div>
            <div className="featured-accent" aria-hidden="true">
              <span className="featured-number">01</span>
            </div>
          </Link>
        </section>
      )}

      {/* Recent Posts */}
      {!loading && recent.length > 0 && (
        <section className="landing-section">
          <div className="section-header">
            <h2 className="section-title">Recent</h2>
            <div className="section-rule" />
          </div>
          <div className="recent-grid">
            {recent.map((post, i) => (
              <Link
                key={post.id}
                to={`/posts/${post.id}`}
                className="recent-card"
                style={{ animationDelay: `${0.1 + i * 0.06}s` }}
              >
                <span className="recent-number">
                  {String(i + 2).padStart(2, "0")}
                </span>
                <div>
                  <p className="recent-meta">
                    {formatDate(post.created_at)}
                    <span className="meta-dot">&middot;</span>
                    {readingTime(post.content)}
                  </p>
                  <h3 className="recent-title">{post.title}</h3>
                  <p className="recent-excerpt">
                    {post.content.length > 120
                      ? post.content.slice(0, 120) + "..."
                      : post.content}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          {posts.length > 4 && (
            <div className="landing-view-all">
              <Link to="/posts" className="view-all-link">
                View all posts <ArrowRight />
              </Link>
            </div>
          )}
        </section>
      )}

      {/* Empty state */}
      {!loading && posts.length === 0 && (
        <section className="landing-section">
          <div className="landing-empty">
            <p className="landing-empty-title">No posts yet</p>
            <p className="landing-empty-text">Be the first to publish something.</p>
            <Link to="/posts/new" className="btn btn-primary">
              Write your first post
            </Link>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="landing-cta">
        <p className="cta-text">Have something to say?</p>
        <Link to="/posts/new" className="btn btn-primary hero-btn">
          Start Writing <ArrowRight />
        </Link>
      </section>
    </div>
  );
}
