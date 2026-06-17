import express from "express";
import { startGameSession, endGameSession } from "../controllers/gameSessionController.js";
import { savePlay } from "../controllers/playController.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", startGameSession);

router.put("/:id", endGameSession); 

router.post("/:id/close-beacon", endGameSession);

router.post("/:idGameSession/plays", authenticateToken, savePlay); 

export default router;