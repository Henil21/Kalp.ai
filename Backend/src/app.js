import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import researchRoutes from "./routes/research.routes.js";
import inquiryRoutes from "./routes/inquiry.js"; // 👈 ADD THIS

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/inquiry", inquiryRoutes); // 👈 ADD THIS

export default app;
