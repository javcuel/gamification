import express from "express";
import multer from "multer";
import {
  addWorld,
  deleteWorld,
  getWorlds,
  updateWorld,
  updateWorldOpenState,
  updateWorldVisibleState,
} from "../controllers/worldController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Almacena temporalmente las imágenes

// Fetch all worlds
router.get("/", getWorlds);

// Update a specific world
router.put("/:id", updateWorld);

// Delete a specific world
router.delete("/:id/delete", deleteWorld);

// Toggle open/closed world state
router.put("/:id/open", updateWorldOpenState);

// Toggle visible/invisible world state
router.put("/:id/visible", updateWorldVisibleState);

// Add new world
router.post(
  "/add",
  upload.fields([{ name: "imgWorldUrl" }, { name: "imgBackgroundUrl" }]),
  addWorld
);

export default router;
