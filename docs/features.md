# Features

## Rich Text Editor

OpenSlate uses the **Tiptap** editor (built on ProseMirror) with full rich text support.

### Text Formatting

- **Bold**, *Italic*, ~~Strikethrough~~, <u>Underline</u>, `Code`, <mark>Highlight</mark>
- Headings 1–3
- Bullet lists, ordered lists, task lists (`- [ ]`)
- Blockquotes, horizontal rules, code blocks with syntax highlighting
- Links
- Tables with row/column add/delete

### Markdown Support

The editor exports/imports markdown via `tiptap-markdown`. You can paste markdown text and it will be converted to rich text, and vice versa.

### File Handling

- **Paste** images from clipboard (auto-uploads to R2)
- **Drag and drop** images/files into the editor
- **Media picker** for inserting previously uploaded files
- **Import from URL**: paste a URL to fetch and store a remote file

## Tags

Organize notes and media with tags.

- Add tags when creating or editing a note
- Tags are shared across notes and media
- Filter notes by tag in the sidebar
- Add tags to media files in the Media Gallery

## Full-Text Search

Search across all notes with `Cmd+Shift+F` / `Ctrl+Shift+F` or via the command palette.

- Powered by SQLite FTS5 with prefix matching
- Searches both note titles and content
- Returns highlighted snippets showing where matches were found
- Results include the matching note's title and preview

## Media Library

Upload, browse, and manage files.

- **Upload** files via drag-and-drop or file picker
- **Grid view** with image thumbnails
- **Detail panel** showing filename, type, size, tags, and associated note
- **Search** media by filename
- **Filter** by type: image, video, PDF, or all
- **Delete** files from R2 and database
- **Copy link** to clipboard for embedding in notes
- **Import from URL**: paste a remote URL to download and store a file

## Themes

Six built-in themes switchable from the command palette.

| Theme | Description |
|-------|------------|
| Light | Clean white background |
| Dark | Dark gray with muted text |
| Sepia | Warm paper-like tone |
| Nord | Cool blue-gray palette |
| Monokai | High-contrast dark with vibrant colors |
| Tokyo Night | Deep blue-black with pastel accents |

Theme preference persists in localStorage and syncs to the server. If you log in from another device, your theme preference follows you.

## Keyboard Shortcuts

| macOS | Windows/Linux | Action |
|-------|--------------|--------|
| `Cmd+Shift+P` | `Ctrl+Shift+P` | Command palette |
| `Cmd+Shift+K` | `Ctrl+Shift+K` | Create new note |
| `Cmd+Shift+S` | `Ctrl+Shift+S` | Save current note |
| `Cmd+Shift+F` | `Ctrl+Shift+F` | Search all notes |
| `Cmd+Shift+G` | `Ctrl+Shift+G` | Toggle media/notes tab |
| `Cmd+Shift+\` | `Ctrl+Shift+\` | Split focused pane vertically |
| `Cmd+\` | `Ctrl+\` | Toggle sidebar |
| `Cmd+K` then `\` | `Ctrl+K` then `\` | Split focused pane vertically |
| `Cmd+K` then `Shift+\` | `Ctrl+K` then `Shift+\` | Split focused pane horizontally |
| `Cmd+K` then `Arrow` | `Ctrl+K` then `Arrow` | Focus pane in direction |
| `Cmd+K` then `W` | `Ctrl+K` then `W` | Close active tab |
| `Cmd+K` then `Cmd+W` | `Ctrl+K` then `Ctrl+W` | Close focused pane |
| `Option+W` | `Alt+W` | Close active tab (reliable cross-browser) |
| `Ctrl+Tab` | `Ctrl+Tab` | Next tab |
| `Ctrl+Shift+Tab` | `Ctrl+Shift+Tab` | Previous tab |
| `Escape` | `Escape` | Dismiss modals / cancel actions |

> **Note:** `Cmd+W`/`Ctrl+W` is reserved by browsers for closing the browser tab. Use `Option+W`/`Alt+W` or the `Cmd+K, W` chord instead.

## Command Palette

Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux) to open the command palette. It provides quick access to:

- Search notes
- Create new note
- Save current note
- Switch theme
- Navigate to media gallery / notes list
- Logout

Type to filter commands, use arrow keys to navigate, Enter to select, Esc to dismiss.
