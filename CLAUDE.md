# Claude Blog

Full-stack CRUD blog application with a Python FastAPI backend and React frontend, deployed on Render.

## Project Structure

```
claude-blog/
├── render.yaml          # Render deployment config (Postgres + API + static site)
├── backend/             # Python FastAPI backend
│   ├── app/
│   │   ├── main.py      # FastAPI app entry point, CORS
│   │   ├── config.py    # Settings via pydantic-settings (DATABASE_URL, ALLOWED_ORIGINS)
│   │   ├── database.py  # Async SQLAlchemy engine + session
│   │   ├── models/      # SQLAlchemy ORM models
│   │   ├── schemas/     # Pydantic request/response schemas
│   │   ├── repositories/# Data access layer (repository pattern)
│   │   └── routers/     # FastAPI route handlers
│   ├── alembic/         # Database migrations
│   └── tests/           # pytest-asyncio tests (SQLite for tests)
└── frontend/            # React + TypeScript + Vite
    ├── src/
    │   ├── api/         # API client (fetch-based)
    │   ├── components/  # Reusable components (Layout, PostList, PostForm)
    │   ├── pages/       # Route pages (Home, Post, Create, Edit)
    │   └── types/       # TypeScript interfaces
    └── tests/           # Vitest + Testing Library
```

## Development Commands

### Backend
```bash
cd backend
pip install -e ".[dev]"        # Install with dev dependencies
uvicorn app.main:app --reload  # Start dev server (port 8000)
python -m pytest tests/ -v     # Run tests
```

### Frontend
```bash
cd frontend
npm install                    # Install dependencies
npm run dev                    # Start dev server (port 5173, proxies /api to :8000)
npm test                       # Run tests
npm run build                  # Production build
```

## Tech Stack

- **Backend**: FastAPI, SQLAlchemy 2.0 (async), PostgreSQL (prod) / SQLite (test), Alembic, Pydantic v2
- **Frontend**: React 19, TypeScript, Vite, React Router v7, Vitest
- **Deployment**: Render (render.yaml) — PostgreSQL + Python web service + static site

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | List all posts |
| GET | `/api/posts/{id}` | Get single post |
| POST | `/api/posts` | Create post |
| PUT | `/api/posts/{id}` | Update post |
| DELETE | `/api/posts/{id}` | Delete post |

## Environment Variables

- `DATABASE_URL` — PostgreSQL connection string (backend)
- `ALLOWED_ORIGINS` — Comma-separated CORS origins (backend)
- `VITE_API_URL` — Backend API base URL (frontend, build-time)
