// server/src/index.js
import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./db/connectDB.js";
import authRouter from "./routes/auth.route.js";
import startupRouter from "./routes/startup.route.js";
import investmentRouter from "./routes/investment.route.js";
import investorRouter from "./routes/investor.route.js";

// Use 5099 to avoid the old 8080 weirdness
const PORT = 5099;

/* -------------------------- 🔗 Connect to MongoDB -------------------------- */

connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

/* ------------------------ 🧾 Simple request logger ------------------------ */

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

/* ---------------------------- ❤️ Health checks ---------------------------- */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running!",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is healthy",
    timestamp: new Date().toISOString(),
  });
});

/* ----------------------------- 📦 API Routes ------------------------------ */

app.use("/auth", authRouter);
app.use("/api/startups", startupRouter);
app.use("/api/investments", investmentRouter);
app.use("/api/investor", investorRouter);

/* ---------------------------- 404 (Not Found) ----------------------------- */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

/* --------------------------- Global Error Handler ------------------------- */

app.use((err, req, res, next) => {
  console.error("Error:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

/* ------------------------------ 🚀 Start app ------------------------------ */

app.listen(PORT, () => {
  console.log(`🎯 Server is running on port ${PORT}`);
  console.log(
    `📱 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:5180"}`
  );
  console.log(`🔑 Environment: ${process.env.NODE_ENV || "development"}`);
});
