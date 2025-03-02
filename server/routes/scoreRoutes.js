import express from "express";
import { getTotalScore } from "../controllers/scoreController.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/totalScore", authenticateToken, getTotalScore);

export default router;
