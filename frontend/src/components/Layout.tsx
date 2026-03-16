import { Link, Outlet } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Layout() {
  const { theme, toggle } = useTheme();

  return (
    <div className="layout">
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="header-logo">
            Claude Blog
          </Link>
          <div className="header-actions">
            <Link to="/posts" className="header-link">
              Blog
            </Link>
            <Link to="/posts/new" className="header-link">
              Write
            </Link>
            <button
              className="theme-toggle"
              onClick={toggle}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>
          </div>
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
