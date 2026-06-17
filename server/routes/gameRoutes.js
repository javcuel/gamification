import express from "express";
import multer from "multer";
import authenticateToken from "../middleware/authMiddleware.js"; 

import {
  createGame,
  deleteGame,
  getGames,
  getGameById,
  updateGame,
  updateGameOpenState,
  updateGameVisibleState,
} from "../controllers/gameController.js";
import { getGameProgress } from "../controllers/playController.js";
const router = express.Router();


const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getGames);
router.get("/:id", getGameById);
router.post(
  "/",
  upload.fields([
    { name: "gameFile", maxCount: 1 },
    { name: "imageFile", maxCount: 1 },
  ]),
  createGame
);
router.put(
  "/:id",
  upload.fields([
    { name: "gameFile", maxCount: 1 },
    { name: "imageFile", maxCount: 1 },
  ]),
  updateGame
);
router.put("/:id/open", updateGameOpenState);
router.put("/:id/visible", updateGameVisibleState);
router.delete("/:id", deleteGame);
router.get("/:idGame/plays/progress", authenticateToken, getGameProgress); 

export default router;
