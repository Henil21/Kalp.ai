import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import researchRoutes from "./routes/research.routes.js";



const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/research", researchRoutes);

export default app;
