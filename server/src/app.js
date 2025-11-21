// server/src/app.js
import express from "express";
import cors from "cors";

const app = express();

// figure out which frontend URL is used in dev:
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5180", // Vite moved here for you
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow curl / Postman (no origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

export default app;
