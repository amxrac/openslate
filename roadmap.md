# Project Roadmap

Self-hostable markdown note-taking web app with Obsidian-like editor, tags, wikilinks, and media support.

---

## Tech Stack

| Layer          | Technology                          |
|----------------|-------------------------------------|
| Frontend       | SvelteKit                           |
| Backend API    | Rust (Axum)                         |
| Database       | SQLite                               |
| Package Manager| Bun                                 |
| Editor         | Tiptap (ProseMirror)                |
| Media Storage  | Cloudflare R2                       |
| Auth           | JWT in httpOnly cookie              |

---

## Architecture

```
[Browser] ──► [SvelteKit] ──► [Axum API] ──► [SQLite]
                    │                │
                    │        [Cloudflare R2] (media)
                    │
            [Tiptap Editor]
```

- SvelteKit talks to Axum over REST
- Axum handles auth, CRUD, search, presigned URLs
- Notes stored as rich text JSON in SQLite
- Full-text search via FTS5
- Media uploads via presigned URLs to R2
- Dual deployment: separate services or single Docker container

---

## Database Schema

```sql
notes
├── id           TEXT PRIMARY KEY (UUID)
├── title        TEXT NOT NULL
├── slug         TEXT UNIQUE NOT NULL
├── content      TEXT (rich text JSON)
├── created_at   TEXT (ISO 8601)
└── updated_at   TEXT (ISO 8601)

tags
├── id           TEXT PRIMARY KEY (UUID)
└── name         TEXT UNIQUE NOT NULL

note_tags
├── note_id      TEXT FK → notes.id
└── tag_id       TEXT FK → tags.id

note_links
├── source_note_id  TEXT FK → notes.id
└── target_note_id  TEXT FK → notes.id (nullable)

media
├── id           TEXT PRIMARY KEY (UUID)
├── filename     TEXT NOT NULL (R2 key)
├── original_name TEXT NOT NULL
├── mime_type    TEXT NOT NULL
├── size         INTEGER NOT NULL
├── note_id      TEXT FK → notes.id (nullable)
└── created_at   TEXT (ISO 8601)

preferences
├── key          TEXT PRIMARY KEY
└── value        TEXT
```

- All IDs are UUID v4 stored as TEXT (SQLite has no native UUID type)
- `note_links.target_note_id` is nullable — links to not-yet-created notes remain pending and resolve when the target is created
- Full-text search via SQLite FTS5 virtual table with Porter tokenizer

---

## API Endpoints

### Auth (no JWT required)
| Method | Path              | Description              |
|--------|-------------------|--------------------------|
| POST   | `/api/auth/login`  | Returns JWT as cookie    |
| POST   | `/api/auth/logout` | Clears cookie            |

### Notes (JWT required)
| Method | Path                 | Description                    |
|--------|----------------------|--------------------------------|
| GET    | `/api/notes`          | List all notes                 |
| GET    | `/api/notes/:slug`    | Single note + backlinks + tags |
| POST   | `/api/notes`          | Create note                    |
| PUT    | `/api/notes/:slug`    | Update note                    |
| DELETE | `/api/notes/:slug`    | Delete note                    |

### Search
| Method | Path              | Description               |
|--------|-------------------|---------------------------|
| GET    | `/api/search?q=`   | Full-text search (FTS5)  |

### Tags
| Method | Path                | Description          |
|--------|---------------------|----------------------|
| GET    | `/api/tags`          | List all tags        |
| GET    | `/api/tags/:name`    | Notes by tag         |

### Media
| Method | Path                 | Description                     |
|--------|----------------------|---------------------------------|
| GET    | `/api/media`          | List media files                |
| POST   | `/api/media`          | Upload a file to R2             |
| POST   | `/api/media/from-url` | Import a file from a URL        |
| GET    | `/api/media/{id}`     | Get media metadata              |
| GET    | `/api/media/{id}/file`| Serve the file from R2          |
| PUT    | `/api/media/{id}`     | Update tags/note association    |
| DELETE | `/api/media/{id}`     | Delete from R2 and database     |

### Preferences
| Method | Path                 | Description                     |
|--------|----------------------|---------------------------------|
| GET    | `/api/preferences`    | Get all preferences             |
| PUT    | `/api/preferences`    | Update preferences (theme)      |

---

## SvelteKit Routes

```
/login              → Password-only form
/notes              → Sidebar list + editor area
/notes/[slug]       → Single note view
/search             → Full-text search page
```

---

## Keyboard Shortcuts

| Key             | Action             |
|-----------------|--------------------|
| `Cmd+K`          | Command palette    |
| `Cmd+N`          | New note           |
| `Cmd+S`          | Save current note  |
| `Cmd+Shift+F`    | Global search      |

---

## Project Phases

### Phase 1: Backend Skeleton
- Cargo init Axum project
- Database connection pool (sqlx with SQLite)
- Run migrations on startup
- Health check endpoint `GET /api/health`

### Phase 2: Auth
- Store bcrypt password hash in env var
- `POST /api/auth/login` — compare password, issue JWT
- `POST /api/auth/logout` — clear cookie
- JWT middleware for protected routes

### Phase 3: Notes CRUD
- Notes table + create/read/update/delete
- Slug generation from title
- Wiki link parsing on save → populate `note_links`
- Tags CRUD + many-to-many `note_tags`
- Backlink query on single note fetch

### Phase 4: Search + Media
- SQLite FTS5 virtual table for full-text search
- `GET /api/search` endpoint
- Cloudflare R2 integration
- Media upload, list, serve, import-from-url

### Phase 5: Frontend Setup
- `bun create svelte@latest`
- Tailwind CSS
- Login page + JWT cookie handling
- API client module (fetch wrapper)

### Phase 6: Editor + Notes UI
- Tiptap editor integration
- Note list sidebar with tags
- Wiki link rendering (click to navigate)
- Tag management UI

### Phase 7: Polish + Deploy
- Keyboard shortcuts (Cmd+K palette, Cmd+N, Cmd+S, Cmd+Shift+F)
- Command palette / search modal
- Dockerfile (single container for both services)
- Environment-based config for flexible deployment
