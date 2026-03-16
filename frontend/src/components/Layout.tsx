import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="layout">
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="header-logo">
            Claude Blog
          </Link>
          <Link to="/posts/new" className="btn btn-primary">
            New Post
          </Link>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
