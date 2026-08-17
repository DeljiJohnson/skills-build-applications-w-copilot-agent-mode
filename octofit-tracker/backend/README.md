# OctoFit Tracker Backend

## Overview
The OctoFit Tracker Backend is built with Node.js, Express, and TypeScript, with MongoDB for data persistence.

## Technical Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (via Mongoose)
- **Development**: Nodemon, ts-node

## Ports & Services
- **Backend Server**: http://localhost:8000
- **MongoDB**: localhost:27017/octofit-tracker

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or via Docker)
- npm

### Installation

1. Navigate to the backend directory:
```bash
cd octofit-tracker/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your configuration if needed.

### Development

Start the development server with hot-reload:
```bash
npm run dev
```

The server will be available at `http://localhost:8000`

### Building

Compile TypeScript to JavaScript:
```bash
npm run build
```

### Production

Start the production server:
```bash
npm start
```

### Database

Seed the database with test data:
```bash
npm run seed
```

## API Health Check

Test if the server is running:
```bash
curl http://localhost:8000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "OctoFit Tracker Backend is running",
  "port": 8000,
  "timestamp": "2026-08-17T00:00:00.000Z"
}
```

## Project Structure
```
backend/
├── src/
│   ├── config/          # Configuration (database, etc.)
│   ├── routes/          # API route definitions
│   ├── models/          # Mongoose data models
│   ├── middleware/      # Custom middleware
│   ├── scripts/         # Utility scripts (seed, etc.)
│   └── server.ts        # Main application entry point
├── dist/                # Compiled JavaScript (after build)
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── .env.example         # Environment variables template
└── README.md            # This file
```

## Environment Variables

See `.env.example` for available configuration options.

## License
ISC
