import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Otp from "../models/otp.js";
import { sendEmail } from "../utils/sendEmail.js";

/* =========================
   Utils
========================= */

const generateToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

/* =========================
   SIGNUP
========================= */

export const signup = async (req, res) => {
  try {
    const { name, email, password, role, expertise, avatar } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!avatar || !avatar.name || !avatar.image) {
      return res.status(400).json({ message: "Avatar is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      expertise,
      avatar
    });

    res.status(201).json({
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        expertise: user.expertise,
        avatar: user.avatar
      }
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup failed" });
  }
};

/* =========================
   LOGIN
========================= */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        expertise: user.expertise,
        avatar: user.avatar
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};

/* =========================
   REQUEST OTP
========================= */

export const requestOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.deleteMany({ email });

    await Otp.create({
      email,
      code,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });

    await sendEmail({
      to: email,
      subject: "Your Kalp Labs Login Code",
      html: `
        <div style="background:#f7f7f4;padding:40px 0;">
          <div style="max-width:520px;margin:auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #e6e6db;">
            <h2 style="text-align:center;font-family:Georgia;font-style:italic;">Kalp Labs</h2>
            <p>Your OTP code is:</p>
            <div style="text-align:center;font-size:28px;font-weight:600;letter-spacing:6px;">
              ${code}
            </div>
            <p>This code expires in 5 minutes.</p>
          </div>
        </div>
      `
    });

    res.json({ message: "OTP sent" });
  } catch (err) {
    console.error("OTP error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

/* =========================
   VERIFY OTP
========================= */

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await Otp.findOne({ email, code: otp });
    if (!record) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (record.expiresAt < new Date()) {
      await record.deleteOne();
      return res.status(400).json({ message: "OTP expired" });
    }

    await record.deleteOne();

    let user = await User.findOne({ email });

    // Auto-register if new user
    if (!user) {
      user = await User.create({
        name: email.split("@")[0],
        email,
        password: "OTP_LOGIN",
        role: "EXPLORER",
        avatar: {
          name: "TARS",
          image:
            "https://ih1.redbubble.net/image.782884253.3467/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u10.jpg"
        }
      });
    }

    res.json({
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        expertise: user.expertise,
        avatar: user.avatar
      }
    });
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json({ message: "OTP verification failed" });
  }
};

/* =========================
   CHANGE PASSWORD
========================= */

export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ FIXED HERE
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }

    const user = await User.findById(userId).select("+password");

    // ✅ SAFETY CHECK
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ❌ OTP users cannot change password
    if (user.password === "OTP_LOGIN") {
      return res.status(400).json({
        message: "Password change not available for OTP accounts",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Current password is incorrect",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({
      message: "Password changed successfully",
    });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({
      message: "Failed to change password",
    });
  }
};
