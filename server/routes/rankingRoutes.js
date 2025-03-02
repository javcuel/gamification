import express from "express";

import {
  getRankingGG,
  getRankingGJ,
  getRankingJG,
  getRankingJJ,
} from "../controllers/rankingController.js";

const router = express.Router();

/* router.get("/jg", authenticateToken, getRankingJG);
router.get("/gg", authenticateToken, getRankingGG);
router.get("/jj", authenticateToken, (req, res) =>
  getRankingJJ(req, res, req.query.gameId)
);
router.get("/gj", authenticateToken, (req, res) =>
  getRankingGJ(req, res, req.query.gameId)
);
 */

router.get("/jg", getRankingJG);
router.get("/gg", getRankingGG);
router.get("/jj/:gameId", getRankingJJ);
router.get("/gj/:gameId", getRankingGJ);

export default router;
