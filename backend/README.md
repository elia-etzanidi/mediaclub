# Media Club Backend

Spring Boot backend for the real-time media club chat platform.

## Included in this scaffold (vertical slice #1)

- Project structure (Maven, Spring Boot 3.3.2, Java 17)
- `User` entity + repository
- JWT-based authentication: `POST /api/auth/register`, `POST /api/auth/login`
- Spring Security config (stateless, JWT filter, CORS for local React dev)
- Global exception handling
- H2 in-memory database for local development (no setup needed)

## Not yet included (next steps)

- Club / Channel / Membership entities
- WebSocket (STOMP) configuration for real-time messaging
- Message / Reaction entities
- External API integration (Open Library / TMDB / RAWG)
- Role-based authorization (Moderator / Admin permission checks)

## Running locally

Requires Java 17+ and Maven (or use the included wrapper if you add one).

```bash
mvn spring-boot:run
```

The app starts on `http://localhost:8080`.

H2 console (view your dev database in the browser): `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:mediaclub`
- Username: `sa`
- Password: (leave blank)

## Testing the auth endpoints

Register:
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","email":"alice@example.com","password":"password123"}'
```

Login:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"password123"}'
```

Both return a JSON response with a `token` — use it as `Authorization: Bearer <token>` on any future protected endpoint.