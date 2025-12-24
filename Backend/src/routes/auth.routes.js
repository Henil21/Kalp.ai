import express from "express";
import {
  signup,
  login,
  requestOtp,
  verifyOtp
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/request-otp", requestOtp);
router.post("/verify-otp", verifyOtp);

// test protected route
router.get("/me", protect, (req, res) => {
  res.json({ user: req.user });
});

export default router;
