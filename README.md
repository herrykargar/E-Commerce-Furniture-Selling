# Wooden World

Full-stack React + Express + MongoDB app. This guide walks from clone to running dev servers and connecting to MongoDB Atlas.

## Prerequisites
- Node.js 18+ and npm 9+ installed
- MongoDB Atlas account (or local MongoDB if you prefer)

## 1) Install dependencies
From the project root:

```bash
npm install              # frontend deps
npm --prefix Backend install  # backend deps
```

## 2) Configure environment
Create Backend/.env with your secrets:

```bash
# MongoDB Atlas connection string
CONNECTION_STRING="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/WoodenWorld?retryWrites=true&w=majority&appName=<AppName>"

# JWT signing key
JWT_KEY="change-me"

# Optional
PORT=5000
FRONTEND_URL=http://localhost:5173
```

Notes:
- DATABASE name expected by code is `WoodenWorld` (see mongoClient).
- FRONTEND_URL must match the Vite dev origin for CORS/cookies.

## 3) MongoDB Atlas setup (quick path)
1. Sign in to https://cloud.mongodb.com and create a Project.
2. Build a free cluster (M0 is fine) and choose a region near you.
3. Create a database user with password auth; keep the username/password for the connection string.
4. In Network Access, allow your IP (or 0.0.0.0/0 for dev only).
5. Click Connect → Drivers → copy the SRV connection string; replace `<user>`, `<password>`, `<cluster>` and set DB name to WoodenWorld.
6. Paste that into CONNECTION_STRING in Backend/.env.

## 4) Run the app
Development (concurrent frontend + backend):

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

Backend only:

```bash
npm --prefix Backend run dev
```

Frontend only:

```bash
npm run dev:client
```

## 5) Build & preview frontend

```bash
npm run build
npm run preview
```

## Troubleshooting
- If requests fail with CORS/cookie issues, confirm FRONTEND_URL matches your browser origin.
- If MongoDB connection fails, verify IP allowlist and CONNECTION_STRING spelling.
- For port conflicts, change PORT in Backend/.env and update the proxy in package.json if needed.
