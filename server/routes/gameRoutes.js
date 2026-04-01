import express from "express";
import {
  createGame,
  deleteGame,
  getGames,
  getGamesBySubject,
  getAvailableGamesForSubject,
  updateGame,
  updateGameOpenState,
  updateGameVisibleState,
} from "../controllers/gameController.js";
const router = express.Router();

router.get("/", getGames);
router.get("/linked/:subjectId", getGamesBySubject);
router.get("/unlinked/:subjectId", getAvailableGamesForSubject);
router.post("/", createGame);
router.put("/:id", updateGame);
router.put("/:id/open", updateGameOpenState);
router.put("/:id/visible", updateGameVisibleState);
router.delete("/:id", deleteGame);

export default router;
