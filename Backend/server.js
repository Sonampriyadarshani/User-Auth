import express from "express";
import connectDB from "./config/db.js"; // Ensure correct import
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB(); // Call the connectDB function

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
