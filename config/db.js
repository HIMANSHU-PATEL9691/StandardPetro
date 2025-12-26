import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not found in environment variables");
    }

    console.log("⏳ Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI, {
      family: 4, // ✅ FORCE IPv4 (CRITICAL FIX FOR WINDOWS)
      serverSelectionTimeoutMS: 10000,
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
