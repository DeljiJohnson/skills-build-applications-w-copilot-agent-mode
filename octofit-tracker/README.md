# OctoFit Tracker

A modern, multi-tier fitness tracking application built with React, Node.js/Express, and MongoDB.

## 🎯 Project Overview

OctoFit Tracker is a full-stack web application designed to help users track their fitness activities, connect with teammates, and compete on leaderboards. The application is organized as a modern multi-tier architecture with separate frontend and backend services.

## 🏗️ Architecture

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Server Port**: `5173`
- **Location**: `octofit-tracker/frontend/`

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Server Port**: `8000`
- **Location**: `octofit-tracker/backend/`

### Database
- **Technology**: MongoDB
- **ODM**: Mongoose
- **Port**: `27017`
- **Database**: `octofit-tracker`

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or Docker)
- npm

### Setup Instructions

#### 1. Start MongoDB (if running locally)
```bash
# Using Docker (recommended)
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or using local MongoDB installation
mongod --dbpath /path/to/db
```

#### 2. Setup Backend
```bash
cd octofit-tracker/backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Start development server
npm run dev
```

Backend will be available at: `http://localhost:8000`

#### 3. Setup Frontend (in a new terminal)
```bash
cd octofit-tracker/frontend

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

Frontend will be available at: `http://localhost:5173`

### Verify Setup
Test the backend API health:
```bash
curl http://localhost:8000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "OctoFit Tracker Backend is running",
  "port": 8000,
  "timestamp": "2026-08-17T12:00:00.000Z"
}
```

## 📁 Project Structure

```
octofit-tracker/
├── frontend/                 # React 19 + Vite frontend application
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md
├── backend/                  # Node.js + Express + TypeScript backend
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── routes/          # API route definitions
│   │   ├── models/          # Mongoose data models
│   │   ├── middleware/      # Custom middleware
│   │   ├── scripts/         # Utility scripts (seed, etc.)
│   │   └── server.ts        # Main application entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── README.md
└── README.md                # This file
```

## 🔌 Available Services

| Service | URL | Status Check |
|---------|-----|--------------|
| Frontend (Vite) | http://localhost:5173 | Visit in browser |
| Backend API | http://localhost:8000 | `curl http://localhost:8000/api/health` |
| MongoDB | localhost:27017 | `mongosh` |

## 📚 Documentation

- [Frontend Setup & Usage](./octofit-tracker/frontend/README.md)
- [Backend Setup & Usage](./octofit-tracker/backend/README.md)

## 🔧 Common Development Tasks

### Start All Services
```bash
# Terminal 1: Start MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Terminal 2: Start Backend
cd octofit-tracker/backend && npm run dev

# Terminal 3: Start Frontend
cd octofit-tracker/frontend && npm run dev
```

### Build for Production

Backend:
```bash
cd octofit-tracker/backend
npm run build
```

Frontend:
```bash
cd octofit-tracker/frontend
npm run build
```

### Seed Database
```bash
cd octofit-tracker/backend
npm run seed
```

## 📝 Environment Configuration

### Backend (.env)
```
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/octofit-tracker
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:8000
```

## 🤝 Development Workflow

1. Create a feature branch
2. Implement changes in frontend and/or backend
3. Test locally with all services running
4. Commit changes to your branch
5. Push to remote and create a pull request

## 📝 Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: describe your changes"

# Push to remote
git push -u origin feature/your-feature-name

# Create pull request on GitHub
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongosh` to test connection
- Check `MONGODB_URI` in `.env` file
- Default: `mongodb://localhost:27017/octofit-tracker`

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: Use `npm run dev -- --port <new-port>`

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

ISC

---

**OctoFit Tracker** - Building the future of fitness tracking 💪
