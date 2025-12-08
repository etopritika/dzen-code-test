# Backend Documentation

Node.js + Express + Socket.io REST API and WebSocket server.

## 🚀 Development

```bash
npm install
npm start
```

Server runs on `http://localhost:4000`

## 📡 API Endpoints

### `GET /orders`

Returns all orders with enriched data:

- Order details (id, title, date, description)
- Computed `productsCount` per order
- Computed `totalPriceUSD` per order

### `GET /products`

Returns all products from mock data.

## 🔌 WebSocket Events

**Event**: `activeSessions`  
**Type**: Server → Client  
**Payload**: `number` (active session count)

Emitted on client connect and disconnect.

**Usage**:

```javascript
socket.on("activeSessions", (count) => {
  console.log("Active sessions:", count);
});
```

## 🐳 Docker

### Build and Run

```bash
docker build -t dzen-backend .
docker run -p 4000:4000 dzen-backend
```

### With Docker Compose

```bash
docker compose up backend
```

## 📁 Structure

- `server.js` - Express server + Socket.io
- `data.js` - Mock data (orders, products)
- `Dockerfile` - Node.js 18 production image

## 📝 Notes

- Uses ES modules (`"type": "module"` in package.json)
- CORS enabled for all origins
- No database (in-memory mock data)
- No authentication validation (frontend-only mock JWT)
