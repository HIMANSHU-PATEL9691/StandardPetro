// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import compression from "compression";
import helmet from "helmet";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

// Route Imports
import authRoutes from "./routes/auth.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import teamRoutes from "./routes/team.routes.js";
import inquiryRoutes from "./routes/inquiry.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import partnerRoutes from "./routes/partner.routes.js"; // ✅ NEW (Channel Partner)
import careerRoutes from "./routes/career.js";

dotenv.config();
connectDB();

const app = express();

// --- 1. Security & Performance ---
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use(compression());

// --- 2. CORS ---
app.use(
  cors({
    origin: ["https://api.standardpetro.com","http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

// --- 3. Body Parsers ---
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// --- 4. Static Files ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- 5. API Mounting ---
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/inquiries", inquiryRoutes);

app.use("/api/contact", contactRoutes);   // ✅ Contact Form Email
app.use("/api/partner", partnerRoutes);   // ✅ Channel Partner Form Email


app.use("/api/career", careerRoutes);

// --- 6. Error Handling ---
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// --- 7. Server Start ---
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`❌ Error: ${err.message}`);
  server.close(() => process.exit(1));
});
