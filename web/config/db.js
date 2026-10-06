// web/config/db.js
import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connection.readyState === 1) return; // already connected, reuse it
  await mongoose.connect(process.env.MONGO_URI);
}