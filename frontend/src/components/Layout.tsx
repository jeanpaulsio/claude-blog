import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "1rem" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ddd",
          paddingBottom: "1rem",
          marginBottom: "2rem",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1 style={{ margin: 0 }}>Claude Blog</h1>
        </Link>
        <Link to="/posts/new">New Post</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
