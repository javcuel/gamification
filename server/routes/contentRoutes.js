import express from "express";
import { unlinkGameFromSubject, linkGameToSubject } from "../controllers/contentController.js";

const router = express.Router();


router.delete("/:subjectId/:gameId", unlinkGameFromSubject); 
router.post("/", linkGameToSubject);

export default router;