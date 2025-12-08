# Orders Management System

A full-stack Single Page Application (SPA) built with React and Node.js for managing orders, products, and generating reports with real-time features.

## 🚀 Live Deployment

- **Frontend**: https://dzen-code-test-1.onrender.com
- **Backend**: https://dzen-code-test.onrender.com

## 📋 Project Overview

Modern web application providing orders management, products catalog, interactive reports with charts, real-time WebSocket sessions tracking, multilingual support (EN/UA), and JWT authentication.

## ✨ Features Implemented

**Core Features**: Orders management, products catalog with filtering, form validation (React Hook Form + Zod), WebSocket real-time sessions, animations (Animate.css), Docker containerization, live clock.

**Junior+ Enhancements**: Full TypeScript, lazy-loaded routes, localStorage persistence, i18n (EN/UA), Recharts visualization, Google Maps integration, unit tests (Vitest), mock JWT authentication.

**Middle Enhancements**: Performance optimizations (React.memo, useMemo, useCallback), npm task runners.

## 🏗️ Project Structure

```
.
├── frontend/          # React + Vite + TypeScript
│   ├── src/
│   │   ├── api/      # Axios client
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── i18n/     # Translations
│   │   ├── layout/
│   │   ├── pages/    # Orders, Products, Reports, Map, Auth
│   │   ├── router/   # React Router + ProtectedRoute
│   │   ├── store/    # Redux Toolkit
│   │   └── utils/
│   ├── Dockerfile
│   └── nginx.conf
├── backend/          # Node.js + Express + Socket.io
│   ├── server.js
│   ├── data.js       # Mock data
│   └── Dockerfile
└── docker-compose.yml
```

## 🛠️ Tech Stack

**Frontend**: React 19, TypeScript, Vite, Redux Toolkit, React Router v6, Bootstrap 5, Axios, React Hook Form, Zod, Recharts, i18next, Socket.io Client, Vitest.

**Backend**: Node.js 18, Express 5, Socket.io, CORS.

**DevOps**: Docker, Docker Compose, Nginx, Alpine Linux, Node.js 20 (frontend build).

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker and Docker Compose

### Development Mode

```bash
# Backend
cd backend && npm install && npm start
# Runs on http://localhost:4000

# Frontend
cd frontend && npm install && npm run dev
# Runs on http://localhost:5173
```

### Docker Mode

Create `.env` file in project root:

```env
VITE_API_URL=http://localhost:4000
```

```bash
docker compose build
docker compose up -d
```

Access:

- Frontend: http://localhost:80
- Backend: http://localhost:4000

## 🚀 Render Deployment

### Frontend

1. Create Web Service on Render
2. Connect GitHub repository
3. Set Dockerfile path: `frontend/Dockerfile`
4. Add environment variable: `VITE_API_URL=https://dzen-code-test.onrender.com`
5. Deploy

Render automatically passes `VITE_API_URL` as build argument during Docker build.

### Backend

1. Create Web Service on Render
2. Connect GitHub repository
3. Set Dockerfile path: `backend/Dockerfile`
4. Deploy

## 📚 Architecture Summary

**Frontend**: Redux Toolkit for state, React Router v6 with lazy loading, Axios for API, Socket.io for WebSocket, localStorage for persistence, i18next for translations.

**Backend**: Express REST API (`/orders`, `/products`), Socket.io WebSocket server emitting `activeSessions` events, in-memory mock data, CORS enabled.

**Authentication**: Mock JWT (frontend-only). Token stored in localStorage, all routes except `/login` are protected. Axios interceptor adds `Authorization: Bearer {token}` header.

**WebSocket**: Real-time active sessions count. Client connects via `VITE_API_URL`, server emits `activeSessions` event on connect/disconnect.

**Charts**: Recharts library. USD BarChart per order, UAH LineChart aggregated by date.
