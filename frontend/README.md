# Frontend Documentation

React + TypeScript + Vite Single Page Application.

## 🚀 Development

```bash
npm install
npm run dev
```

Runs on `http://localhost:5173` with HMR and TypeScript checking.

## 🏗️ Build

```bash
npm run build
```

Builds optimized production bundle to `dist/` directory.

## 🚀 Render Deployment

### Environment Configuration

Set `VITE_API_URL` environment variable in Render dashboard:

```
VITE_API_URL=https://dzen-code-test.onrender.com
```

**Important**: This variable must be set at build time. Vite embeds it into static files during `npm run build`. Render automatically passes it as Docker build argument.

### Docker Build

The Dockerfile uses multi-stage build:

- **Stage 1**: Node 20 Alpine → installs dependencies, builds with Vite
- **Stage 2**: Nginx Alpine → serves static files from `dist/`

The `ARG VITE_API_URL` and `ENV VITE_API_URL=$VITE_API_URL` in Dockerfile allow Render to pass the environment variable during build.

### Verification

After deployment, verify API requests go to your Render backend URL and WebSocket connections work correctly.

## 🐳 Local Docker

For local Docker development, create `.env` in project root:

```env
VITE_API_URL=http://localhost:4000
```

Then build and run:

```bash
docker compose build frontend
docker compose up -d frontend
```

## 📦 Available Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run lint` - ESLint check
