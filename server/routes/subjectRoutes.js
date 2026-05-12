import express from "express";
import multer from "multer";
import {
  createSubject,
  deleteSubject,
  getSubjects,
  updateSubject,
  updateSubjectOpenState,
  updateSubjectVisibleState,
  getSubjectsByUser,
  getSubjectsByTeacher,
  importUsersToSubject 
} from "../controllers/subjectController.js";

const router = express.Router();

// Configuración de multer para procesar el CSV en memoria
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
router.get("/user/:userId", getSubjectsByUser);
router.get("/teacher/:userId", getSubjectsByTeacher);
router.post("/:id/import-users", upload.single("csvFile"), importUsersToSubject);

export default router;