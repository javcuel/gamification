import express from "express";
import {
  createUser,
  deleteUser,
  getScore,
  getUsers,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

// Fetch all users
router.get("/", getUsers);

// Fetch user
router.get("/:id", getScore);

// Creates new user
router.post("/", createUser);

// Update a specific user
router.put("/:id", updateUser);

// Delete a specific user
router.delete("/:id", deleteUser);

export default router;
