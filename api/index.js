import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";

//initialize dotenv
dotenv.config();

// connect to MongoDB (options optional) and log result
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

const app = express();
app.use("/api/users", userRoutes);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
