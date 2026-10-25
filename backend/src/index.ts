import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns";
import requirementsRouter from "./routes/requirements";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ message: "GoPratle API is running" });
});

app.use("/api/requirements", requirementsRouter);

// Start server
async function startServer() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in .env");
    }

    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
