# TK To DO App

Menesments is a modern task management dashboard built with a React + Vite frontend and a Next.js API backend. It includes authentication, task dashboards, vital task tracking, task categories, AI workspace tools, member invites, profile settings, and change password screens.

The app is designed as a full-stack demo project. The frontend runs on Vite, while the backend API runs from the separate `backend-next` folder using Next.js App Router API routes.

## Features

- Login and create account flows
- Protected dashboard pages
- Demo Google, Facebook, and X social buttons on auth screens
- Task dashboard with active, completed, and priority task views
- My Tasks page with search, edit, delete, and status actions
- Vital Tasks page with detailed selected-task view and checklist actions
- Task status and task priority management
- Create category flow
- Member invite modal with editable permissions and copyable project link
- Account information page
- Change password page
- AI Workspace with quick actions, risk review, daily planning, and task recommendations
- Responsive layout for desktop, laptop, tablet, and mobile screens
- Backend API for auth, tasks, analytics, members, and AI assistant demo responses

## Tech Stack

Frontend:

- React 18
- Vite
- React Router
- Tailwind CSS
- React Icons

Backend:

- Next.js 15 App Router
- Node.js file-based JSON persistence
- API routes under `backend-next/app/api`

Data:

- Seed data lives in frontend `src/data`
- Backend seed data lives in `backend-next/data/mockData.js`
- Runtime backend data is stored in `backend-next/data/runtime-db.json`

## Requirements

- Node.js 18 or newer
- npm

This project has two package installations:

- Root frontend package: `package.json`
- Backend package: `backend-next/package.json`

## Installation

Install frontend dependencies from the project root:

```bash
npm install
```

Install backend dependencies:

```bash
npm --prefix backend-next install
```

## Running The App

Start frontend and backend together:

```bash
npm run dev
```

This runs:

- Frontend: Vite dev server, usually `http://localhost:5173`
- Backend: Next.js API server, usually `http://localhost:3000`

Run only the frontend:

```bash
npm run dev:frontend
```

Run only the backend:

```bash
npm run dev:backend
```

## Build Commands

Build the frontend:

```bash
npm run build
```

Build the backend:

```bash
npm --prefix backend-next run build
```

Preview the frontend production build:

```bash
npm run preview
```

Start the backend production server after building:

```bash
npm --prefix backend-next run start
```

## Environment

The frontend API base URL is configured in `src/services/api.js`.

Default:

```js
http://localhost:3000/api
```

To override it, create a frontend environment file such as `.env.local`:

```bash
VITE_API_BASE_URL=http://localhost:3000/api
```

## Authentication

The app includes:

- Email/password login
- Create account
- Profile update
- Change password
- Protected dashboard routes

Auth state is stored in browser local storage using the key:

```txt
modern-taskflow-auth
```

Social buttons for Google, Facebook, and X are currently demo UI only. They do not perform real OAuth login and do not navigate the user. Real OAuth would require platform credentials, callback routes, and provider-specific setup.

## Main Routes

Frontend routes are defined in `src/routes/routePaths.js` and wired in `src/routes/AppRouter.jsx`.

| Route | Page |
| --- | --- |
| `/` | Login |
| `/register` | Create account |
| `/dashboard` | Dashboard |
| `/vital-tasks` | Vital Tasks |
| `/my-tasks` | My Tasks |
| `/task-categories` | Task Categories |
| `/ai-workspace` | AI Workspace |
| `/account-info` | Account Info |
| `/change-password` | Change Password |
| `/create-categories` | Create Categories |

## Backend API Routes

The backend uses Next.js route handlers in `backend-next/app/api`.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/login` | Login with email and password |
| `POST` | `/api/auth/register` | Create a new user |
| `PATCH` | `/api/auth/profile` | Update profile details |
| `PATCH` | `/api/auth/password` | Change password |
| `POST` | `/api/auth/social` | Demo social auth endpoint |
| `GET` | `/api/tasks` | List tasks |
| `POST` | `/api/tasks` | Create task |
| `PATCH` | `/api/tasks/[id]` | Update task |
| `DELETE` | `/api/tasks/[id]` | Delete task |
| `GET` | `/api/analytics` | Dashboard analytics |
| `POST` | `/api/ai/assistant` | AI assistant demo response |
| `GET` | `/api/members` | List members |
| `POST` | `/api/members` | Invite member |
| `PATCH` | `/api/members/[id]` | Update member permission |

## Folder And File Structure

Generated folders such as `node_modules`, `.next`, and `dist` are intentionally not shown in detail.

```txt
Menesments/
├── README.md
├── UPGRADE_NOTES.md
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── scripts/
│   └── dev-all.mjs
├── public/
├── data/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── assets/
│   │   ├── icons/
│   │   │   ├── fb.svg
│   │   │   ├── goole(1).svg
│   │   │   ├── mdi_password.svg
│   │   │   ├── mdi_user.svg
│   │   │   └── x.svg
│   │   └── illustrations/
│   │       ├── singhin.svg
│   │       └── singup.svg
│   ├── components/
│   │   ├── ai/
│   │   │   ├── AIBackendStack.jsx
│   │   │   ├── AIChatPanel.jsx
│   │   │   ├── AIMissionControl.jsx
│   │   │   ├── AIQuickActions.jsx
│   │   │   └── AIWorkspaceHero.jsx
│   │   ├── auth/
│   │   │   ├── AuthLayout.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   └── SocialLogin.jsx
│   │   ├── categories/
│   │   │   ├── CategoryTable.jsx
│   │   │   ├── TaskPriorityTable.jsx
│   │   │   └── TaskStatusTable.jsx
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── CardContainer.jsx
│   │   │   ├── InputField.jsx
│   │   │   ├── ModalWrapper.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── SectionTitle.jsx
│   │   │   └── StatusBadge.jsx
│   │   ├── dashboard/
│   │   │   ├── AIAssistantPanel.jsx
│   │   │   ├── CompletedTaskCard.jsx
│   │   │   ├── SmartFeatureGrid.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskStatusChart.jsx
│   │   │   ├── TeamInviteBar.jsx
│   │   │   └── WelcomeHeader.jsx
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx
│   │   │   ├── PageContainer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Topbar.jsx
│   │   ├── modals/
│   │   │   ├── AddTaskModal.jsx
│   │   │   ├── AddTaskPriorityModal.jsx
│   │   │   ├── CreateCategoryModal.jsx
│   │   │   ├── EditTaskStatusModal.jsx
│   │   │   └── InviteMemberModal.jsx
│   │   ├── settings/
│   │   │   ├── AccountInfoForm.jsx
│   │   │   ├── ChangePasswordForm.jsx
│   │   │   └── ProfileCard.jsx
│   │   └── tasks/
│   │       ├── MyTaskDetailsPanel.jsx
│   │       ├── MyTaskList.jsx
│   │       ├── TaskDetailsPanel.jsx
│   │       ├── TaskListPanel.jsx
│   │       ├── TaskMetaRow.jsx
│   │       └── VitalTaskList.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── TaskContext.jsx
│   ├── data/
│   │   ├── categories.js
│   │   ├── members.js
│   │   ├── sidebarLinks.js
│   │   ├── tasks.js
│   │   └── user.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useModal.js
│   │   └── useTaskFilter.js
│   ├── pages/
│   │   ├── NotFoundPage.jsx
│   │   ├── auth/
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   └── dashboard/
│   │       ├── AccountInfoPage.jsx
│   │       ├── AIWorkspacePage.jsx
│   │       ├── ChangePasswordPage.jsx
│   │       ├── CreateCategoriesPage.jsx
│   │       ├── DashboardPage.jsx
│   │       ├── MyTasksPage.jsx
│   │       ├── TaskCategoriesPage.jsx
│   │       └── VitalTasksPage.jsx
│   ├── routes/
│   │   ├── AppRouter.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── routePaths.js
│   ├── services/
│   │   ├── api.js
│   │   └── backendGuide.js
│   ├── styles/
│   │   └── globals.css
│   └── utils/
│       ├── aiCopilot.js
│       ├── aiInsights.js
│       ├── constants.js
│       ├── formatDate.js
│       └── helpers.js
└── backend-next/
    ├── package.json
    ├── package-lock.json
    ├── next.config.js
    ├── README.md
    ├── app/
    │   ├── layout.js
    │   ├── page.js
    │   └── api/
    │       ├── ai/
    │       │   └── assistant/
    │       │       └── route.js
    │       ├── analytics/
    │       │   └── route.js
    │       ├── auth/
    │       │   ├── login/route.js
    │       │   ├── password/route.js
    │       │   ├── profile/route.js
    │       │   ├── register/route.js
    │       │   └── social/route.js
    │       ├── members/
    │       │   ├── route.js
    │       │   └── [id]/route.js
    │       └── tasks/
    │           ├── route.js
    │           └── [id]/route.js
    ├── data/
    │   ├── mockData.js
    │   └── runtime-db.json
    └── lib/
        ├── response.js
        └── store.js
```

## Important Frontend Files

- `src/main.jsx`: React entry point.
- `src/App.jsx`: Top-level app wrapper.
- `src/routes/AppRouter.jsx`: Defines all application routes.
- `src/routes/ProtectedRoute.jsx`: Blocks dashboard pages unless the user is authenticated.
- `src/context/AuthContext.jsx`: Handles login, register, logout, profile, and password state.
- `src/context/TaskContext.jsx`: Handles task loading, create, update, delete, and local fallback behavior.
- `src/services/api.js`: Central frontend API client for auth, tasks, analytics, AI, and members.
- `src/styles/globals.css`: Global Tailwind styles and responsive fixes.

## Important Backend Files

- `backend-next/app/api/auth/login/route.js`: Login endpoint.
- `backend-next/app/api/auth/register/route.js`: Register endpoint.
- `backend-next/app/api/tasks/route.js`: Task list and create endpoint.
- `backend-next/app/api/tasks/[id]/route.js`: Task update and delete endpoint.
- `backend-next/app/api/members/route.js`: Member list and invite endpoint.
- `backend-next/lib/store.js`: Reads and writes runtime JSON data.
- `backend-next/lib/response.js`: Shared API response and CORS helpers.
- `backend-next/data/mockData.js`: Backend seed data.
- `backend-next/data/runtime-db.json`: Runtime JSON database created/updated by the backend.

## Data Persistence

The backend stores data in:

```txt
backend-next/data/runtime-db.json
```

This is a simple demo database. If you want to reset backend data, stop the server and delete `runtime-db.json`; the backend will recreate it from `mockData.js` the next time it reads data.

Some frontend-only settings also use browser local storage, such as auth session and category UI settings.

## Common Development Notes

- Use `npm run dev` from the root when you want frontend and backend together.
- If backend API changes do not appear, stop the dev server and start it again.
- If a stale Next.js build causes route errors, remove `backend-next/.next` and rebuild.
- Do not edit generated folders such as `node_modules`, `.next`, or `dist`.
- Keep reusable UI in `src/components`.
- Keep page-level layouts in `src/pages`.
- Keep shared app state in `src/context`.
- Keep backend API logic in `backend-next/app/api`.

## Troubleshooting

### Frontend cannot fetch backend

Check that the backend is running on `http://localhost:3000`.

Then verify the frontend API base URL in `src/services/api.js` or `.env.local`.

### Register or login returns a backend error

Restart the backend:

```bash
npm run dev:backend
```

If the error mentions `.next/server`, clear the backend build cache:

```bash
cd backend-next
rmdir /s /q .next
cd ..
npm --prefix backend-next run build
```

In PowerShell, use:

```powershell
Remove-Item .\backend-next\.next -Recurse -Force
npm --prefix backend-next run build
```

### Ports are already in use

Stop the old terminal process and run:

```bash
npm run dev
```

Vite may choose another frontend port automatically if `5173` is busy. The backend normally uses `3000`.

## Project Status

This project is a working full-stack demo. It is suitable for local development, UI demos, and learning full-stack structure. Before production use, replace the JSON file database with a real database, add secure password hashing, add real authentication tokens, and configure real OAuth providers if needed.
