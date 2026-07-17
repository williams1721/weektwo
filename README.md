# Week 2 API — Express App

A small Express API built for the Backend Development Week 2 assignment.

## Endpoints

| Method | Route       | Description                                              |
|--------|-------------|------------------------------------------------------------|
| GET    | `/`         | Serves a static HTML page (`public/index.html`)           |
| GET    | `/api`      | Returns the text `My Week 2 API!`                          |
| POST   | `/user`     | Body: `{ "name": "...", "email": "..." }` → `Hello, [name]!` (400 if fields missing) |
| GET    | `/user/:id` | Returns `User [id] profile` for a previously created user  |

> Note: the brief says `GET /` should return "My Week 2 API!" **and** that a static
> HTML page should be served at `/`. Since a route can only do one, this app serves the
> static page at `/` and moved the plain-text message to `GET /api`. Say the word if you'd
> rather have `/` return the text response instead.

## Features

- JSON body parsing via `express.json()`
- 400 error handling for missing `name`/`email` on `POST /user`
- 404 handler for unknown routes and unknown user ids
- Central error-handling middleware
- `.env` support for `PORT` (via `dotenv`)
- Custom middleware (`middleware/logger.js`) that logs every request's method, URL, and timestamp — **bonus requirement**
- Static HTML page served from `public/`

## Setup

```bash
npm install
cp .env.example .env    # adjust PORT if needed
npm start                # or: node server.js
```

Server runs at `http://localhost:3000` by default.

## Testing with curl

```bash
curl http://localhost:3000/api

curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Ada","email":"ada@example.com"}'

curl http://localhost:3000/user/1
```

## Testing with Postman

1. Import a new request, set method/URL per the table above.
2. For `POST /user`, set Body → raw → JSON, and provide `name` and `email`.
3. Send and confirm the responses match the table above.

## Version control (Git & GitHub)

Run these from the project root to push it up:

```bash
git init
git add .
git commit -m "Week 2: Express API with routing, error handling, and logging middleware"
git branch -M main
git remote add origin https://github.com/<your-username>/week2-node-express.git
git push -u origin main
```

Then submit the resulting GitHub link.
