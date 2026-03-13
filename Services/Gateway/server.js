import express from "express";
import cors from "cors";

import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";

dotenv.config({ path: "./development.env" });

const app = express();


app.use(
  cors({
    origin: ["http://localhost:5173", "https://ktm-vg51.onrender.com"],
    credentials: true
  })
);
app.use("/api/auth", (req, res, next) => {
  console.log("Gateway hit:", req.method, req.originalUrl);
  next();
});

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,

    pathRewrite: {
      "^/api/auth": ""
    }
  })
);

app.use(
  "/api/members",
  createProxyMiddleware({
    target: process.env.MEMBERS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api/members": ""
    }
  })
);

app.listen(process.env.PORT || 5000, () => {
  console.log("Gateway running on port", process.env.PORT || 5000);
});