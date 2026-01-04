# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **TODO App** project - a task management application.

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - CSS Variables, Flexbox, Responsive Design
- **JavaScript (ES6+)** - Vanilla JS, LocalStorage API

## Commands

```bash
# Open in browser (no build required)
start index.html    # Windows
open index.html     # macOS
```

## Project Structure

```
TODO/
├── index.html    # Main HTML structure
├── style.css     # Styles with CSS variables (light/dark themes)
├── app.js        # Application logic
└── CLAUDE.md     # This file
```

## Features

- **CRUD**: Add, complete, delete tasks
- **Categories**: Personal, Work, Study with color-coded badges
- **Filters**: View all or by category
- **Dark Mode**: Toggle with localStorage persistence
- **Responsive**: Mobile-friendly layout

## Data Structure

```javascript
// Todo object
{
  id: number,           // Unique ID (Date.now() + random)
  text: string,         // Task content
  category: string,     // 'personal' | 'work' | 'study'
  completed: boolean,   // Completion status
  createdAt: string     // ISO timestamp
}

// LocalStorage keys
- 'todos': JSON array of tasks
- 'theme': 'light' | 'dark'
```

## Key Functions (app.js)

| Function | Description |
|----------|-------------|
| `addTodo(text, category)` | Create new task |
| `toggleTodo(id)` | Toggle completion |
| `deleteTodo(id)` | Remove task |
| `setFilter(filter)` | Change category filter |
| `renderTodos()` | Render task list |
| `toggleTheme()` | Switch light/dark mode |

## Code Style Guidelines

- **모든 새 파일에는 날짜와 시간을 주석으로 표시할 것**
  - Python: `# Created: 2025-12-25 14:30:00`
  - JavaScript: `// Created: 2025-12-25 14:30:00`
  - HTML: `<!-- Created: 2025-12-25 14:30:00 -->`
  - CSS: `/* Created: 2025-12-25 14:30:00 */`

## Related Projects

See `../Study-02/todo-app/` for reference implementation with:
- CRUD operations with categories (업무/개인/공부)
- Dashboard with progress tracking
- Dark mode, keyboard shortcuts
- Drag & drop reordering
- Data export/import (JSON)
- Auto-categorization by keywords
