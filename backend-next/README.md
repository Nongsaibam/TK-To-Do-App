# backend-next

Next.js backend layer for the upgraded management dashboard.

## Included API Routes
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/tasks`
- `GET /api/analytics`
- `POST /api/ai/assistant`

## Run
```bash
cd backend-next
npm install
npm run dev
```

## Frontend integration idea
Point your Vite frontend services to `http://localhost:3000/api/...`.
