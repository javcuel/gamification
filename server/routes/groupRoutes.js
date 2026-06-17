import express from "express";
import { 
    createGroup, 
    deleteGroup, 
} from "../controllers/groupController.js";

import { 
    createAssignment, 
    deleteAssignment, 
    getUsersByGroup 
} from "../controllers/assignmentController.js";

const router = express.Router();


router.post("/", createGroup);
router.delete("/:id", deleteGroup);

router.get("/:idGroup/users", getUsersByGroup);
router.post("/:idGroup/users", createAssignment);
router.delete("/:idGroup/users/:idUser", deleteAssignment);

export default router;