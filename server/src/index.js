import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./db/connectDB.js";
import authRouter from "./routes/auth.route.js";
import startupRouter from "./routes/startup.route.js";
import investmentRouter from "./routes/investment.route.js";
import investorRoutes from "./routes/investor.js"; // ✅ move this import up

const PORT = process.env.PORT || 8080;

// Connect to database
connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

// Health check route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running!",
    timestamp: new Date().toISOString(),
  });
});

// ✅ Register API Routes before app.listen()
app.use("/auth", authRouter);
app.use("/api/startups", startupRouter);
app.use("/api/investments", investmentRouter);
app.use("/api/investor", investorRoutes); // ✅ investor routes active now

// Health check for API
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is healthy",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use("/*path", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler
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

import investorRouter from "./routes/investor.route.js";
app.use("/api/investor", investorRouter);

app.listen(PORT, () => {
  console.log(`🎯 Server is running on port ${PORT}`);
  console.log(
    `📱 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:5173"}`
  );
  console.log(`🔑 Environment: ${process.env.NODE_ENV || "development"}`);
});
