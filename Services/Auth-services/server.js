import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import cloudinary from "./config/cloudinary.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

/* ---------- ENV ---------- */
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: envFile });

console.log("NODE_ENV =", process.env.NODE_ENV);
console.log("PORT =", process.env.PORT);

/* ---------- APP ---------- */
const app = express();

app.use(express.json());
app.use(cookieParser());


const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});


app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.originalUrl);
  next();
} );


app.use((req, res, next) => {
  console.log("AUTH SERVICE HIT:", req.method, req.originalUrl);
  next();
});

app.delete("/delete-cloudinary-images", (req, res) => {
  cloudinary.api.delete_resources_by_prefix(
    "profiles/",
    (error, result) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }

      res.status(200).json({
        success: true,
        result,
      });
    }
  );
});

app.use("/api/auth",authRoutes);


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

      callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true
  })
);



/* ---------- START SERVER ---------- */
const PORT = process.env.PORT || 5001 ;

app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Auth service running on port ${PORT}`);

  try {
    await connectDB();
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:");
    console.error(err.message);
  }
});