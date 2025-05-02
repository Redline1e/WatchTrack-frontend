**🎬 WatchTrack Frontend** is a **Next.js 15** + **React** client for the WatchTrack full‑stack movie & series tracker, consuming a NestJS/Prisma API.  

[🌐 Live Demo](https://watchtrack-frontend-production.up.railway.app/films)

---

## 🛠️ Technologies Used

- **Next.js 15**  
- **React**  
- **TypeScript**  
- **Tailwind CSS**  
- **TanStack React Query**  
- **Axios**  
- **Lucide React** (icons)  

---

## 📁 Project Structure

```plaintext
frontend/
├── app/                      # Next.js App Router: pages & layouts
│   ├── admin/                # Admin panel (user management)
│   ├── auth/                 # Login & registration
│   ├── films/                # Film list & detail routes
│   ├── profile/              # User profile page
│   └── watchlist/            # My Watchlist page
│
├── components/               # Reusable UI components
├── hooks/                    # Custom React Query hooks
│   ├── useAdminUsers.ts
│   ├── useFilms.ts
│   ├── useGenres.ts
│   ├── useReviews.ts
│   └── useWatchlist.ts
│
├── lib/                      # Shared utilities & API client
│   └── api.ts                # Axios instance
│
├── public/                   # Static assets (favicon, images)
├── types/                    # TypeScript types/interfaces
│   ├── film.ts
│   ├── review.ts
│   ├── role.ts
│   ├── user.ts
│   └── watch-status.ts
│
├── .env.local                # Environment variables (API URL)
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies & scripts

```

## ✨ Features

- 🔐 **Protected routes** with client‑side token guard  
- 🎥 **Film** listing, detail view & cover images  
- ⭐ **Review** submission & display  
- 📑 **Watchlist** status (Planned / Watching / Completed)  
- 🔎 **Search** & **filter** films by genre/year  
- ⚡ **Data caching** & automatic updates with React Query  
- 🎨 Fully **responsive** layout via Tailwind CSS  

---

## 🚀 Getting Started

1. **Copy & configure env**  
   ```bash
   cd frontend
   cp .env.local.example .env.local
   # edit .env.local → set your API URL:
   NEXT_PUBLIC_API_URL=http://localhost:3000/api

2. **Install dependencies**  
   ```bash
   npm install

3. **Start dev server**  
   ```bash
       npm run dev   # → http://localhost:3001/films

**Production build:**  
   ```bash
        npm run build
        npm run start
   ```

## 📝 Scripts & Commands

| Command                  | Description                     |
| ------------------------ | ------------------------------- |
| npm run dev (frontend) | Start Next.js dev server (3001) |
| npm run dev (backend)  | Start NestJS dev server (3000)  |
| npm run build          | Build for production            |
| npm run start          | Run production server           |
| npx prisma studio      | Open Prisma Studio (DB GUI)     |
