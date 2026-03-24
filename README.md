# Compliance Tracker

A full-stack compliance task tracker for managing clients, deadlines, and task status.

## What This Project Includes

- Backend API: Express + MongoDB (Mongoose)
- Frontend: React (Vite)
- Core entities: Clients and Tasks
- Optional seed script for demo data

## Quick Setup

### 1. Prerequisites

- Node.js 18+
- npm 9+
- MongoDB connection string (local MongoDB or MongoDB Atlas)

### 2. Install Dependencies

From the project root:

```bash
npm install --prefix backend
npm install --prefix frontend
```

### 3. Configure Environment Variables

Create `backend/.env`:

```env
MONGODB_URI=<your_mongodb_connection_string>
PORT=5000
```

Create `frontend/.env` (optional):

```env
VITE_API_URL=http://localhost:5000/api
```

If `VITE_API_URL` is not set, frontend defaults to `http://localhost:5000/api`.

### 4. Run the App

In one terminal (backend):

```bash
npm run dev --prefix backend
```

In another terminal (frontend):

```bash
npm run dev --prefix frontend
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### 5. (Optional) Seed Demo Data

```bash
npm run seed --prefix backend
```

This clears existing Clients and Tasks, then inserts sample data.

## Scripts

Backend:

- `npm run dev --prefix backend` - start backend with nodemon
- `npm run start --prefix backend` - start backend in production mode
- `npm run seed --prefix backend` - seed sample clients and tasks

Frontend:

- `npm run dev --prefix frontend` - start Vite dev server
- `npm run build --prefix frontend` - production build
- `npm run preview --prefix frontend` - preview production build
- `npm run lint --prefix frontend` - run ESLint

## Assumptions

- Single-user local development setup (no authentication/authorization layer).
- A valid MongoDB URI is available before backend startup.
- Backend and frontend run as separate processes in development.

## Tradeoffs

- Simplicity over complexity: no auth, no role model, and minimal infrastructure to keep setup fast.
- Fast iteration over strict architecture: straightforward REST + React state flow.
- MongoDB schema flexibility over strict relational constraints.

## Known Limitations

- No automated tests are included yet.
- No containerization (Docker) setup yet.
- No production hardening (rate limiting, advanced logging, monitoring, security headers).

## Deployment Notes

- Frontend includes `frontend/vercel.json` for SPA route fallback.
- Set `VITE_API_URL` in your deployment environment to point to your deployed backend API.
- Backend needs a hosted MongoDB and environment variables configured on your hosting platform.
