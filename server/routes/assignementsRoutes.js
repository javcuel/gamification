import express from "express";
import { 
    createAssignment, 
    deleteAssignment, 
    getUsersByGroup 
} from "../controllers/assignmentController.js";

const router = express.Router();

/**
 * @route   POST /api/assignments
 * @desc    Asigna un usuario a un grupo
 */
router.post("/", createAssignment);

/**
 * @route   DELETE /api/assignments/user/:idUser/group/:idGroup
 * @desc    Elimina la relación entre un usuario y un grupo específico
 */
router.delete("/user/:idUser/group/:idGroup", deleteAssignment);

/**
 * @route   GET /api/assignments/group/:idGroup/users
 * @desc    Obtiene la lista de usuarios pertenecientes a un grupo
 */
router.get("/group/:idGroup/users", getUsersByGroup);

export default router;