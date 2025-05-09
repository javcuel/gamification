import express from "express";
import {
  createUser,
  deleteUser,
  getScore,
  getUsers,
  loginUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getScore);
router.post("/login", loginUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
