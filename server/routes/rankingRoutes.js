import express from "express";

import {
  getRankingP,
  getRankingG,
  getRankingPG,
  getRankingGG,
} from "../controllers/rankingController.js";

const router = express.Router();

router.get("/p", getRankingP);
router.get("/g", getRankingG);
router.get("/pg/:gameId", getRankingPG);
router.get("/gg/:gameId", getRankingGG);

export default router;
