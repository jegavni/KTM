import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import memberRoutes from "./routes/memberRoutes.js";

const envFile = process.env.NODE_ENV
  ? `.env.${process.env.NODE_ENV}`
  : ".env.development";

dotenv.config({ path: envFile });

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);
app.use("/", memberRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Member Service running on port ${process.env.PORT}`);
});