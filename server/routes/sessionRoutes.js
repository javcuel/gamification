import express from "express";
import {
  createSession,
  closeSession,
  getAllSessions
} from "../controllers/sessionController.js";

const router = express.Router();

// GET /api/sessions - Get all sessions (for admin or logs)
router.get("/", getAllSessions);

// POST /api/sessions - Create a new session (called during login)
router.post("/", createSession);

// PUT /api/sessions/:id - Update LogoutTime (called during logout)
router.put("/:id", closeSession);

export default router;