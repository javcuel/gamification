import express from "express";
import {
  createSubject,
  deleteSubject,
  getSubjects,
  updateSubject,
  updateSubjectOpenState,
  updateSubjectVisibleState,
} from "../controllers/subjectController.js";

const router = express.Router();

// Fetch all subjects
router.get("/", getSubjects);

// Creates new subject
router.post("/", createSubject);

// Update a specific subject
router.put("/:id", updateSubject);

// Toggle open/closed subject state
router.put("/:id/open", updateSubjectOpenState);

// Toggle visible/invisible subject state
router.put("/:id/visible", updateSubjectVisibleState);

// Delete a specific subject
router.delete("/:id", deleteSubject);

export default router;
