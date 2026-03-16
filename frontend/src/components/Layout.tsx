import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="layout">
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="header-logo">
            Claude Blog
          </Link>
          <nav className="header-nav">
            <Link to="/posts/new">Write</Link>
          </nav>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <p className="footer-text">Built with FastAPI & React</p>
      </footer>
    </div>
  );
}
