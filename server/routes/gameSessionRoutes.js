import express from "express";
import { startGameSession, endGameSession } from "../controllers/gameSessionController.js";

const router = express.Router();

// POST /api/game-sessions - Iniciar
router.post("/", startGameSession);

// PUT /api/game-sessions/:id - Finalizar
router.put("/:id", endGameSession);

export default router;