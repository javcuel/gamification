import express from "express";
import {
  createGame,
  deleteGame,
  getGamesBySubject,
  updateGame,
  updateGameOpenState,
  updateGameVisibleState,
} from "../controllers/gameController.js";
const router = express.Router();

// Fetch all games by a subject id
router.get("/:subjectId", getGamesBySubject);

// Creates a new game
router.post("/", createGame);

// Update a specific game
router.put("/:id", updateGame);

// Toggle open/closed game state
router.put("/:id/open", updateGameOpenState);

// Toggle visible/hidden game state
router.put("/:id/visible", updateGameVisibleState);

// Delete a specific game
router.delete("/:id", deleteGame);

export default router;
