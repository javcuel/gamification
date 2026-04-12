import express from "express";
import {
  createSubject,
  deleteSubject,
  getSubjects,
  updateSubject,
  updateSubjectOpenState,
  updateSubjectVisibleState,
  getSubjectsByUser,
} from "../controllers/subjectController.js";

const router = express.Router();

router.get("/", getSubjects);
router.post("/", createSubject);
router.put("/:id", updateSubject);
router.put("/:id/open", updateSubjectOpenState);
router.put("/:id/visible", updateSubjectVisibleState);
router.delete("/:id", deleteSubject);
router.get("/user/:userId", getSubjectsByUser);

export default router;
