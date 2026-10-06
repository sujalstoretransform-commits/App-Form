import "dotenv/config";
import mongoose from "mongoose";

export default async function handler(req, res) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    res.status(200).json({ success: true, message: "MongoDB connected" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}