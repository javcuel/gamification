import express from "express";
import {
  deleteGame,
  getGamesBySubject,
  updateGame,
  updateGameOpenState,
  updateGameVisibleState,
} from "../controllers/gameController.js";
const router = express.Router();

router.get("/:subjectId", getGamesBySubject);
router.put("/:id", updateGame);
router.delete("/:id", deleteGame);
router.put("/:id/open", updateGameOpenState);
router.put("/:id/visible", updateGameVisibleState);

export default router;
