import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config({ path: "./development.env" });

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/register", (req, res, next) => {
  console.log("Auth service hit:", req.method, req.originalUrl);
  next();
});
app.use("/login", (req, res, next) => {
  console.log("Auth service hit:", req.method, req.originalUrl);
  next();
});

app.use("/", authRoutes);

app.listen(5001, () => {
  console.log("Auth service running on port 5001");
});