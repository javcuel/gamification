import express from "express";
import multer from "multer";
import {
  addSubject,
  deleteSubject,
  getSubjects,
  updateSubject,
  updateSubjectOpenState,
  updateSubjectVisibleState,
} from "../controllers/subjectController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Almacena temporalmente las imágenes

// Fetch all worlds
router.get("/", getSubjects);

// Update a specific Subject
router.put("/:id", updateSubject);

// Delete a specific Subject
router.delete("/:id/delete", deleteSubject);

// Toggle open/closed Subject state
router.put("/:id/open", updateSubjectOpenState);

// Toggle visible/invisible Subject state
router.put("/:id/visible", updateSubjectVisibleState);

// Add new Subject
router.post(
  "/",
  upload.fields([{ name: "imgSubjectUrl" }, { name: "imgBackgroundUrl" }]),
  addSubject
);

export default router;
