# Backend Documentation

Node.js + Express + Socket.io REST API and WebSocket server for Orders Management System.

## 📋 Description

The backend provides:

- **REST API**: HTTP endpoints for orders and products data
- **WebSocket Server**: Real-time active sessions tracking
- **Mock Data**: In-memory data storage (no database)
- **CORS Enabled**: Allows cross-origin requests from frontend

### REST Endpoints

#### `GET /orders`

Returns all orders with enriched data:

- Order details (id, title, date, description)
- Products filtered by `order.id`
- Computed `productsCount` per order
- Computed `totalPriceUSD` per order

**Response Example**:

```json
[
  {
    "id": 1,
    "title": "Order 1",
    "date": "2017-06-29 12:09:33",
    "description": "desc",
    "productsCount": 2,
    "totalPriceUSD": 150,
    "products": [...]
  }
]
```

#### `GET /products`

Returns all products from mock data.

**Response Example**:

```json
[
  {
    "id": 1,
    "serialNumber": 1234,
    "isNew": 1,
    "photo": "pathToFile.jpg",
    "title": "Product 1",
    "type": "Monitors",
    "specification": "Specification 1",
    "guarantee": {
      "start": "2017-06-29 12:09:33",
      "end": "2017-06-29 12:09:33"
    },
    "price": [
      { "value": 100, "symbol": "USD", "isDefault": 0 },
      { "value": 2600, "symbol": "UAH", "isDefault": 1 }
    ],
    "order": 1,
    "date": "2017-06-29 12:09:33"
  }
]
```

### WebSocket Events

#### Connection

When a client connects:

- Server logs the connection ID
- Emits `activeSessions` event with current client count

#### Disconnection

When a client disconnects:

- Server emits `activeSessions` event with updated client count

#### Event: `activeSessions`

**Type**: Server → Client  
**Payload**: `number` (active session count)

**Usage**:

```javascript
socket.on("activeSessions", (count) => {
  console.log("Active sessions:", count);
});
```

## 🚀 Development Startup

### Prerequisites

- Node.js 18+ installed
- npm package manager

### Installation

```bash
npm install
```

### Start Server

```bash
node server.js
```

The server will start on `http://localhost:4000`

### Expected Output

```
Backend started at http://localhost:4000
Connected: <socket-id>
```

## 🐳 Docker Build/Run

### Build Image

```bash
docker build -t dzen-backend .
```

### Run Container

```bash
docker run -p 4000:4000 dzen-backend
```

### With Docker Compose

The backend is automatically built and run via `docker-compose.yml`:

```bash
docker compose up backend
```

## 📁 Code Structure

```
backend/
├── server.js          # Main Express + Socket.io server
├── data.js            # Mock data (orders, products)
├── package.json       # Dependencies and scripts
├── Dockerfile         # Docker production image
└── .dockerignore      # Files excluded from Docker build
```

### server.js Structure

```javascript
// 1. Imports
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { orders, products } from "./data.js";

// 2. Express App Setup
const app = express();
app.use(cors());

// 3. REST API Routes
app.get("/orders", ...);
app.get("/products", ...);

// 4. WebSocket Setup
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// 5. WebSocket Event Handlers
io.on("connection", ...);

// 6. Server Start
server.listen(4000, ...);
```

### data.js Structure

Exports two arrays:

- `orders`: Array of order objects
- `products`: Array of product objects

**Order Structure**:

```javascript
{
  id: number,
  title: string,
  date: string,
  description: string,
  get products() { return products.filter(p => p.order === this.id); }
}
```

**Product Structure**:

```javascript
{
  id: number,
  serialNumber: number,
  isNew: number,
  photo: string,
  title: string,
  type: string,
  specification: string,
  guarantee: { start: string, end: string },
  price: [{ value: number, symbol: string, isDefault: number }],
  order: number,
  date: string
}
```

## 📦 ES Modules Explanation

The backend uses **ES6 modules** (not CommonJS).

### Configuration

In `package.json`:

```json
{
  "type": "module"
}
```

### Import Syntax

```javascript
// ES6 imports (used in this project)
import express from "express";
import { orders } from "./data.js";

// NOT CommonJS (would be):
// const express = require("express");
```

### Benefits

- Modern JavaScript standard
- Tree-shaking support
- Better IDE support
- Aligns with frontend (React uses ES modules)

### File Extensions

- `.js` files are treated as ES modules when `"type": "module"` is set
- No need for `.mjs` extension

## 🔌 Ports Used

### Development

- **Port**: `4000`
- **URL**: `http://localhost:4000`
- **WebSocket**: `ws://localhost:4000`

### Docker

- **Container Port**: `4000`
- **Host Port**: `4000` (mapped in docker-compose.yml)
- **Internal Network**: Accessible as `http://backend:4000` from frontend container

## 🌐 Frontend Connection

### Development Mode

Frontend connects to:

```
http://localhost:4000
```

**Configuration**: Frontend `axiosClient.ts` uses `baseURL: "http://localhost:4000"`

### Docker Mode

Frontend connects via Docker service name:

```
http://backend:4000
```

**Why**: Docker Compose creates an internal network where services can communicate using service names as hostnames.

**Configuration**: Frontend `axiosClient.ts` uses `baseURL: "http://backend:4000"`

### WebSocket Connection

**Development**:

```javascript
const socket = io("http://localhost:4000");
```

**Docker** (if needed):

```javascript
const socket = io("http://backend:4000");
```

**Note**: The `useActiveSessions` hook currently hardcodes `localhost:4000`. For Docker, this should be configurable via environment variables.

## 📦 Dependencies

### Production Dependencies

- **express**: ^5.2.1 - Web framework
- **socket.io**: ^4.8.1 - WebSocket server
- **cors**: ^2.8.5 - Cross-origin resource sharing

### Installation

```bash
npm install
```

## 🐳 Dockerfile Explanation

```dockerfile
FROM node:18

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (production-ready)
RUN npm ci

# Copy application code
COPY . .

# Expose port
EXPOSE 4000

# Start server
CMD ["node", "server.js"]
```

### Build Process

1. Uses Node.js 18 base image
2. Sets working directory to `/app`
3. Copies `package.json` and `package-lock.json`
4. Runs `npm ci` (clean install, faster and reproducible)
5. Copies all application files
6. Exposes port 4000
7. Starts server with `node server.js`

### .dockerignore

Excludes from Docker build:

- `node_modules/`
- `.git/`
- Log files
- IDE files
- Environment files

## 🔧 Configuration

### CORS

Currently allows all origins:

```javascript
app.use(cors());
```

**Production Recommendation**: Restrict to specific origins:

```javascript
app.use(
  cors({
    origin: "http://yourdomain.com",
  })
);
```

### WebSocket CORS

Allows all origins:

```javascript
const io = new Server(server, {
  cors: { origin: "*" },
});
```

**Production Recommendation**: Restrict to specific origins.

## 📝 Notes

- **No Database**: All data is in-memory (mock data)
- **No Authentication**: Endpoints are publicly accessible
- **No Rate Limiting**: Consider adding for production
- **No Logging**: Basic console.log only
- **No Error Handling**: Consider adding middleware for production
- **Stateless**: No session management (except WebSocket connections)

## 🚀 Production Considerations

1. **Environment Variables**: Use env vars for port, CORS origins
2. **Logging**: Implement proper logging (Winston, Pino)
3. **Error Handling**: Add error middleware
4. **Rate Limiting**: Add rate limiting middleware
5. **Health Checks**: Add `/health` endpoint
6. **Database**: Replace mock data with real database
7. **Authentication**: Add JWT or session-based auth
8. **Validation**: Add request validation (Joi, Zod)
9. **Monitoring**: Add monitoring and metrics
10. **SSL/TLS**: Use HTTPS in production

## 📚 API Documentation

### Request/Response Examples

#### GET /orders

```bash
curl http://localhost:4000/orders
```

#### GET /products

```bash
curl http://localhost:4000/products
```

### WebSocket Connection

```javascript
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

socket.on("activeSessions", (count) => {
  console.log("Active sessions:", count);
});
```
