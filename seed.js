import dotenv from "dotenv";
import mongoose from "mongoose";
import Admin from "./models/Admin.js";
import connectDB from "./config/db.js";

dotenv.config();

console.log("ENV Loaded:", {
  mongo: !!process.env.MONGO_URI,
  nodeEnv: process.env.NODE_ENV,
});

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await Admin.findOne({
      email: "admin@standardpetro.com",
    });

    if (adminExists) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    await Admin.create({
      email: "admin@standardpetro.com",
      password: "Admin@123", // will be auto-hashed
      role: "admin",
    });

    console.log("✅ Admin seeded successfully");
    console.log("📧 Email: admin@standardpetro.com");
    console.log("🔑 Password: Admin@123");

    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedAdmin();
