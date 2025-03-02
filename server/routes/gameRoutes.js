import express from "express";
import {
  deleteGame,
  getGamesByWorld,
  updateGame,
  updateGameOpenState,
  updateGameVisibleState,
} from "../controllers/gameController.js";
const router = express.Router();

// Fetch all games for a specific world
router.get("/:worldId", getGamesByWorld);

// Update a specific game
router.put("/:id", updateGame);

// Delete a specific game
router.delete("/:id", deleteGame);

// Toggle open/closed game state
router.put("/:id/open", updateGameOpenState);

// Toggle visible/invisible game state
router.put("/:id/visible", updateGameVisibleState);

export default router;
