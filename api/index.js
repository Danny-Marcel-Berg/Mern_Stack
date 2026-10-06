import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import listingRoutes from "./routes/listing.routes.js";

dotenv.config();

const __dirname = path.resolve();

if (process.env.MONGO_URL) {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB, running in fallback mode:", err.message);
    });
} else {
  console.log("MONGO_URL not configured. Running with in-memory storage fallback.");
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/listing", listingRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Error middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
