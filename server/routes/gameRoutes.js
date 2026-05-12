import express from "express";
import multer from "multer";

import {
  createGame,
  deleteGame,
  getGames,
  getGameById,
  getGamesBySubject,
  getAvailableGamesForSubject,
  updateGame,
  updateGameOpenState,
  updateGameVisibleState,
} from "../controllers/gameController.js";
const router = express.Router();


// Configuramos multer para que guarde el archivo en la memoria temporal del servidor
// Esto es ideal para descomprimirlo al vuelo sin dejar archivos basura
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getGames);
router.get("/:id", getGameById);
router.get("/linked/:subjectId", getGamesBySubject);
router.get("/unlinked/:subjectId", getAvailableGamesForSubject);
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

export default router;
