import express from "express";
import {
  createGame,
  deleteGame,
  getGames,
  getGamesBySubject,
  updateGame,
  updateGameOpenState,
  updateGameVisibleState,
} from "../controllers/gameController.js";
const router = express.Router();

router.get("/", getGames);
router.get("/:subjectId", getGamesBySubject);
router.post("/", createGame);
router.put("/:id", updateGame);
router.put("/:id/open", updateGameOpenState);
router.put("/:id/visible", updateGameVisibleState);
router.delete("/:id", deleteGame);

export default router;
