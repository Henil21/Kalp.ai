import User from "../models/User.js";
import express from "express";
import {
  signup,
  login,
  requestOtp,
  verifyOtp,
  changePassword
} from "../controllers/auth.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/request-otp", requestOtp);
router.post("/verify-otp", verifyOtp);
router.post("/change-password", protect, changePassword);


// test protected route

router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "name email role expertise avatar"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    console.error("AUTH /ME ERROR:", err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});


export default router;
