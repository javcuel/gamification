import express from "express";

import {
  getRankingP,
  getRankingG,
  getRankingPG,
  getRankingGG,
} from "../controllers/rankingController.js";

const router = express.Router();

// Añadimos :subjectId a todas las rutas
router.get("/p/:subjectId", getRankingP);
router.get("/g/:subjectId", getRankingG);
router.get("/pg/:subjectId/:gameId", getRankingPG);
router.get("/gg/:subjectId/:gameId", getRankingGG);

export default router;