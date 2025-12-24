import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Otp from "../models/otp.js";
import { sendEmail } from "../utils/sendEmail.js";


const generateToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

// 🔐 SIGNUP
export const signup = async (req, res) => {
  const { name, email, password, role, expertise } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    expertise
  });

  res.status(201).json({
    token: generateToken(user),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      expertise: user.expertise
    }
  });
};

// 🔐 LOGIN
export const login = async (req, res) => {
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
      expertise: user.expertise
    }
  });
};


// 📩 REQUEST OTP
export const requestOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await Otp.deleteMany({ email }); // invalidate old OTPs

  await Otp.create({
    email,
    code,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min
  });

  // TODO: send email here (console for now)
  // console.log("OTP for", email, ":", code);//
 await sendEmail({
  to: email,
  subject: "Your Kalp Labs Login Code",
  html: `
    <div style="
      background-color:#f7f7f4;
      padding:40px 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    ">
      <div style="
        max-width:520px;
        margin:0 auto;
        background:#ffffff;
        border-radius:12px;
        padding:32px;
        border:1px solid #e6e6db;
      ">

        <!-- Header -->
        <div style="text-align:center; margin-bottom:24px;">
          <h1 style="
            margin:0;
            font-family: Georgia, 'Times New Roman', serif;
            font-style: italic;
            font-size:26px;
            color:#111;
          ">
            Kalp Labs
          </h1>
          <p style="
            margin-top:6px;
            font-size:14px;
            color:#777;
          ">
            Secure Login Verification
          </p>
        </div>

        <!-- Body -->
        <p style="
          font-size:15px;
          color:#333;
          line-height:1.6;
        ">
          You requested a one-time verification code to sign in to your Kalp Labs account.
        </p>

        <div style="
          margin:24px 0;
          text-align:center;
        ">
          <div style="
            display:inline-block;
            padding:14px 28px;
            font-size:28px;
            letter-spacing:6px;
            font-weight:600;
            border-radius:10px;
            background:#111;
            color:#ffffff;
          ">
            ${code}
          </div>
        </div>

        <p style="
          font-size:14px;
          color:#555;
          line-height:1.6;
        ">
          This code will expire in <strong>5 minutes</strong>.  
          If you did not request this, you can safely ignore this email.
        </p>

        <!-- Divider -->
        <hr style="
          border:none;
          border-top:1px solid #eee;
          margin:32px 0;
        " />

        <!-- Footer -->
        <p style="
          font-size:12px;
          color:#888;
          text-align:center;
          line-height:1.5;
        ">
          © ${new Date().getFullYear()} Kalp Labs  
          <br />
          Building trust in research collaboration
        </p>

      </div>
    </div>
  `,
});

res.json({ message: "OTP sent" });

};
// ✅ VERIFY OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const record = await Otp.findOne({ email, code: otp });

  if (!record) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  if (record.expiresAt < new Date()) {
    await record.deleteOne();
    return res.status(400).json({ message: "OTP expired" });
  }

  await record.deleteOne(); // one-time use

  let user = await User.findOne({ email });

  // Auto-register if new user
  if (!user) {
    user = await User.create({
      name: email.split("@")[0],
      email,
      password: "OTP_LOGIN", // placeholder
      role: "EXPLORER"
    });
  }

  res.json({
    token: generateToken(user),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      expertise: user.expertise
    }
  });
};

