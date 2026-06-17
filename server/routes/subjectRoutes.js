import express from "express";
import multer from "multer";
import {
  createSubject,
  deleteSubject,
  getSubjects,
  updateSubject,
  updateSubjectOpenState,
  updateSubjectVisibleState,
  importUsersToSubject 
} from "../controllers/subjectController.js";
import { getGroupsBySubject } from "../controllers/groupController.js"; 
import { 
  linkGameToSubject,      
  unlinkGameFromSubject, 
  updateGameLocalOpenState,    
  updateGameLocalVisibleState  
} from "../controllers/contentController.js";
import { 
  getRankingP, 
  getRankingG, 
  getRankingPG, 
  getRankingGG 
} from "../controllers/rankingController.js";

import { getGamesBySubject, getAvailableGamesForSubject } from "../controllers/gameController.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getSubjects);
router.post(
  "/",
  upload.fields([
    { name: "imageFile", maxCount: 1 },
    { name: "bgImageFile", maxCount: 1 },
  ]),
  createSubject
);
router.put(
  "/:id",
  upload.fields([
    { name: "imageFile", maxCount: 1 },
    { name: "bgImageFile", maxCount: 1 },
  ]),
  updateSubject
);  
router.put("/:id/open", updateSubjectOpenState);
router.put("/:id/visible", updateSubjectVisibleState);
router.delete("/:id", deleteSubject);


router.get("/:idSubject/groups", getGroupsBySubject);

router.post("/:id/users/import", upload.single("csvFile"), importUsersToSubject);

router.post("/:idSubject/games/:idGame", linkGameToSubject);
router.delete("/:idSubject/games/:idGame", unlinkGameFromSubject);
router.put("/:idSubject/games/:idGame/open", updateGameLocalOpenState);
router.put("/:idSubject/games/:idGame/visible", updateGameLocalVisibleState);

router.get("/:idSubject/rankings/players", getRankingP);
router.get("/:idSubject/rankings/groups", getRankingG);
router.get("/:idSubject/games/:idGame/rankings/players", getRankingPG);
router.get("/:idSubject/games/:idGame/rankings/groups", getRankingGG);

router.get("/:idSubject/games/linked", getGamesBySubject);
router.get("/:idSubject/games/unlinked", getAvailableGamesForSubject);

export default router;