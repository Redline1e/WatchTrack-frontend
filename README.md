**WatchTrack** is a full-stack movie & series tracking application built with Next.js, NestJS, and Prisma. The application is deployed on Railway, ensuring reliable and high-performance hosting.

## Live Demo

Check out the live demo: [WatchTrack](https://watchtrack-frontend-production.up.railway.app/films)

## Technologies Used

- **NestJS**
- **Prisma ORM**
- **Zod (validation)**
- **JWT Auth via NestJS Guards**
- **NeonDB**
- **PostgreSQL**



## Project Structure
```
├── backend/               # NestJS + Prisma API
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   ├── films/         # Film endpoints
│   │   ├── genres/        # Genre endpoints
│   │   ├── health/        # Health-check endpoints
│   │   ├── prisma/        # Prisma client
│   │   ├── reviews/       # Review endpoints
│   │   ├── users/         # User endpoints
│   │   └── watch-items/   # Watchlist endpoints
│   ├── prisma/            # Database migrations
│   ├── uploads/           # Uploaded assets
│   ├── test/              # Unit & E2E tests
│   ├── .env               # Environment variables
│   ├── package.json
│   └── tsconfig.json
└── README.md              # This file
```

## ✨ Features



- ✅ User Authentication (JWT)

- 🎬 Film, Genre, Review, and Watchlist management CRUD

- 📁 File Upload for cover images

- 🏥 Health Check endpoints for monitoring

- 🔒 Role-based access control for admin routes

## How to Run


1. Clone the repository or download the project files:

    
bash

    git clone <YOUR_REPO_URL>
    cd <YOUR_REPO_FOLDER>

2. Setup


bash

    cp .env.example .env
    # Edit .env → set DATABASE_URL
    npm install
    npx prisma generate
    npx prisma migrate dev --name init
    npm run start:dev  # http://localhost:3000

3. Frontend setup

  bash
  
      cd ../frontend
      cp .env.local.example .env.local
      # Edit .env.local → set NEXT_PUBLIC_API_URL=http://localhost:3000/api
      npm install
      npm run dev        # http://localhost:3001/films



## 📝 Scripts & Commands

| Command                  | Description                     |
| ------------------------ | ------------------------------- |
| `npm run dev` (frontend) | Start Next.js dev server (3001) |
| `npm run dev` (backend)  | Start NestJS dev server (3000)  |
| `npm run build`          | Build for production            |
| `npm run start`          | Run production server           |
| `npx prisma studio`      | Open Prisma Studio (DB GUI)     |



