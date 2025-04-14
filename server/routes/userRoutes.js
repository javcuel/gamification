import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getTotalScore,
  getUsers,
} from "../controllers/userController.js";

const router = express.Router();

// Fetch all users
router.get("/", getUsers);

// Fetch user score
router.get("/:id/totalScore", getTotalScore);

// Creates new user
router.post("/", createUser);

// Update a specific user
router.put("/:id", updateUser);

// Delete a specific user
router.delete("/:id", deleteUser);

export default router;
