import express from "express";
import { register, login, logout ,checkAuth} from "../controllers/authController.js";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Attach multer to the register route
router.post("/register", upload.single("profilePic"), register);

router.post("/login", login);
router.post("/logout", logout);
router.get("/check", checkAuth);

export default router;