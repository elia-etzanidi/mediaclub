# Media Club — Real-Time Chat Platform

A real-time chat application for book/movie/show/game discussion clubs. Built as a thesis project.

**Stack:** Java + Spring Boot (backend), React (frontend)

## Structure

```
mediaclub-project/
 ├── backend/     Spring Boot REST API + WebSocket server
 └── frontend/    React application (added later)
```

Each subfolder is an independent project with its own build tooling — see each folder's own README for setup and run instructions.

## Current status

- [x] Project scaffold + JWT authentication (register/login)
- [ ] Club / Channel / Membership entities + CRUD
- [ ] External media API integration (Open Library / TMDB / RAWG)
- [ ] WebSocket real-time messaging
- [ ] Reactions, moderation actions, roles/permissions
- [ ] Direct messages
- [ ] Notification preferences
- [ ] React frontend

## Running locally

See [`backend/README.md`](backend/README.md) for backend setup and run instructions.
