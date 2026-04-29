import express from "express";
import { getGameProgress, savePlay } from "../controllers/playController.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

// Obtener progreso: La URL se centra en el Juego
router.get("/game/:gameId/progress", authenticateToken, getGameProgress);

// Guardar partida: La URL se centra en la Sesión de Juego (Jerárquica)
router.post("/game-session/:gameSessionId/plays", authenticateToken, savePlay);

export default router;