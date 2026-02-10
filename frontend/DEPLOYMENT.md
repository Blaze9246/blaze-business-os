# Blaze Business OS - Frontend MVP

## Completed Features

### 1. Authentication (Clerk)
- ✅ Sign-in page with dark theme
- ✅ Sign-up page with dark theme
- ✅ Protected routes middleware
- ✅ User profile integration in sidebar

### 2. Dashboard
- ✅ Stats cards (Revenue, Tasks, AI Agents, Stores)
- ✅ Recent activity feed
- ✅ AI Agent status panel
- ✅ Responsive layout

### 3. Sidebar Navigation
- ✅ Collapsible sidebar
- ✅ Store selector dropdown
- ✅ Navigation links with active states
- ✅ User profile section with sign-out

### 4. Task Kanban Board
- ✅ 4 columns: To Do, In Progress, Review, Done
- ✅ Task cards with priority badges
- ✅ Assignee and due date display
- ✅ Search and filter UI
- ✅ Tags support

### 5. Dark Theme (Linear-inspired)
- ✅ Dark void background (#0A0A0B)
- ✅ Surface colors for cards
- ✅ Purple primary accent
- ✅ Custom scrollbar styling
- ✅ Smooth transitions

## File Structure
```
src/
├── app/
│   ├── dashboard/
│   │   ├── agents/page.tsx
│   │   ├── settings/page.tsx
│   │   ├── stores/page.tsx
│   │   ├── tasks/page.tsx
│   │   ├── workflows/page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── sign-in/[[...sign-in]]/page.tsx
│   ├── sign-up/[[...sign-up]]/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── layout/
│       ├── Sidebar.tsx
│       └── StoreSelector.tsx
├── lib/
│   └── constants.ts
├── stores/
│   └── appStore.ts
├── types/
│   └── index.ts
└── middleware.ts
```

## Deployment Instructions

### Option 1: Vercel CLI (Recommended)
1. Run `vercel login` to authenticate
2. Run `vercel` to deploy
3. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

### Option 2: GitHub + Vercel
1. Initialize git: `git init`
2. Create repository on GitHub
3. Push code: `git push -u origin main`
4. Import project in Vercel dashboard
5. Set environment variables

### Required Environment Variables
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
```

## Local Development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Notes
- All pages are fully responsive
- Kanban board is view-only (no drag-and-drop)
- Mock data is used for stores and tasks
- AI Agent and Workflow pages are placeholders
