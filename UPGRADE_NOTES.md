# Project Upgrade Notes

## Added on frontend
- New **AI Workspace** page
- Modern **feature grid** on dashboard
- Improved **AI Copilot** chat panel
- **Voice input** and **speech output** support in browser
- LocalStorage persistence for tasks in `TaskContext`
- Dynamic AI insights using current date instead of fixed date

## Added on backend
A separate **Next.js backend** folder: `backend-next`

### API routes included
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/tasks`
- `GET /api/analytics`
- `POST /api/ai/assistant`

## Important
The uploaded project's existing `node_modules` could not be fully build-verified in this environment because the Rollup optional native package was missing in the provided dependency tree. If you run locally, reinstall dependencies before building.

### Recommended local steps
```bash
# frontend
rm -rf node_modules package-lock.json
npm install
npm run dev

# backend
cd backend-next
npm install
npm run dev
```
