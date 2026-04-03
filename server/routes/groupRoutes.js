import express from "express";
import { 
    createGroup, 
    deleteGroup, 
    getGroupsBySubject 
} from "../controllers/groupController.js";

const router = express.Router();

/**
 * @route   POST /api/groups
 * @desc    Crea un nuevo grupo vinculado a una asignatura
 */
router.post("/", createGroup);

/**
 * @route   DELETE /api/groups/:id
 * @desc    Elimina un grupo (y sus asignaciones por CASCADE)
 */
router.delete("/:id", deleteGroup);

/**
 * @route   GET /api/groups/subject/:idSubject
 * @desc    Obtiene todos los grupos de una asignatura específica
 */
router.get("/subject/:idSubject", getGroupsBySubject);

export default router;