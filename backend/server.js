import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { orders, products } from "./data.js";

const app = express();
app.use(cors());

// ---------- REST API ----------
app.get("/orders", (req, res) => {
  const enriched = orders.map((o) => {
    const orderProducts = products.filter((p) => p.order === o.id);

    const totalPriceUSD = orderProducts.reduce((sum, p) => {
      const usd = p.price.find((pr) => pr.symbol === "USD");
      return sum + (usd?.value || 0);
    }, 0);

    return {
      ...o,
      productsCount: orderProducts.length,
      totalPriceUSD,
    };
  });

  res.json(enriched);
});

app.get("/products", (req, res) => res.json(products));

// ---------- WebSocket ----------
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  io.emit("activeSessions", io.engine.clientsCount);

  socket.on("disconnect", () => {
    io.emit("activeSessions", io.engine.clientsCount);
  });
});

// ---------- Start server ----------
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Backend started at http://localhost:${PORT}`);
});
