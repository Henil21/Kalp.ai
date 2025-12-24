import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { researcherOnly } from "../middlewares/role.middleware.js";
import {
  getAllResearch,
  getMyResearch,
  createResearch,
  updateResearch,
  deleteResearch,
} from "../controllers/research.controller.js";

const router = express.Router();

/* ===== Public ===== */
router.get("/", getAllResearch);

/* ===== Logged-in user ===== */
router.get("/me", protect, getMyResearch);

/* ===== Researcher actions ===== */
router.post("/", protect, researcherOnly, createResearch);
router.put("/:id", protect, researcherOnly, updateResearch);
router.delete("/:id", protect, researcherOnly, deleteResearch);

export default router;
