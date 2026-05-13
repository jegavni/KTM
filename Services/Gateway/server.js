import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";

const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: envFile });

const app = express();

/* ---------- DEBUG ENV ---------- */
console.log("NODE_ENV =", process.env.NODE_ENV);
console.log("AUTH_SERVICE_URL =", process.env.AUTH_SERVICE_URL);
console.log("MEMBERS_SERVICE_URL =", process.env.MEMBERS_SERVICE_URL);
console.log("PORT =", process.env.PORT);

/* ---------- CORS ---------- */
const allowedOrigins = [
  "http://localhost:5173",
  "https://ktm-vg51.onrender.com"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true
  })
);

/* ---------- AUTH PROXY ---------- */
const authProxy = createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,
  secure: false,
  xfwd: true,
   proxyTimeout: 120000,
    timeout: 120000,

pathRewrite: (path) => {
  console.log("Original path:", path);
  return "/api/auth" + path;
},
  onProxyReq: (proxyReq, req) => {
    console.log(
      "[AUTH PROXY]",
      req.method,
      req.originalUrl,
      "=>",
      process.env.AUTH_SERVICE_URL + "/api/auth" + req.url
    );
  },

  onError: (err, req, res) => {
    console.error("[AUTH ERROR]", err.message);

    if (!res.headersSent) {
      res.status(502).json({
        success: false,
        error: err.message
      });
    }
  }
});


app.use("/api/auth", authProxy);

/* ---------- MEMBERS PROXY ---------- */
app.use(
  "/api/members",
  createProxyMiddleware({
    target: process.env.MEMBERS_SERVICE_URL,
    changeOrigin: true,
    secure: false,
    xfwd: true,

    onProxyReq: (proxyReq, req) => {
      console.log(
        "[MEMBERS PROXY]",
        req.method,
        req.originalUrl
      );
    }
  })
);


/* ---------- 404 ---------- */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
});



/* ---------- START ---------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
});