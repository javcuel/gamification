import express from "express";
import {
  addUser,
  deleteUser,
  getUsers,
} from "../controllers/userController.js";

const router = express.Router();

// Fetch all users
router.get("/", getUsers);

// Add a new user
router.post("/", addUser);

// Delete a specific user
router.delete("/:id", deleteUser);

export default router;
