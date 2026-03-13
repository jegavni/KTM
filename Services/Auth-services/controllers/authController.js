
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

// JWT secret from .env
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// GET /api/auth/check
export const checkAuth = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not logged in" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ loggedIn: true, userId: decoded.id });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const register = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);  // Text fields
    console.log("REQ FILE:", req.file);  // Profile picture

    const { name, email, phone, location, role, password } = req.body;

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    let imageUrl = "";
    if (req.file) {
      imageUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profiles" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        stream.end(req.file.buffer);
      });
    }

    // Create user in MongoDB
    const user = await User.create({
      name,
      email,
      phone,
      location,
      role,
      password: hash,
      profilePic: imageUrl,
    });

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send token in response (optional: cookie)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    // Send response with user info (excluding password)
    const { password: pwd, ...userData } = user._doc;
    res.json({ user: userData, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


export const login = async (req, res) => {

  const { email, password } = req.body;
  console.log("Login attempt:", email);

  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);

  if (!match)
    return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  res.json({ message: "Login successful" });

};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  console.log("User logged out");

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};