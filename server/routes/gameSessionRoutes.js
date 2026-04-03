import express from "express";
import { startGameSession, endGameSession } from "../controllers/gameSessionController.js";

const router = express.Router();

// Ruta para iniciar una sesion de juego al hacer clikc sobre uno
router.post("/", startGameSession);

// Ruta para navegación normal (React)
router.put("/:id", endGameSession); 

// Ruta para cierre de pestaña (Beacon)
router.post("/:id/close-beacon", endGameSession);

export default router;