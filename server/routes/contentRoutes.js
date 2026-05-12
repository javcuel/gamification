import express from "express";
import { 
    unlinkGameFromSubject, 
    linkGameToSubject,
    updateContentOpenState,      
    updateContentVisibleState    
} from "../controllers/contentController.js";

const router = express.Router();

router.delete("/:subjectId/:gameId", unlinkGameFromSubject); 
router.post("/", linkGameToSubject);

router.put("/:subjectId/:gameId/open", updateContentOpenState);
router.put("/:subjectId/:gameId/visible", updateContentVisibleState);

export default router;