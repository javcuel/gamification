import express from "express";
import { getTheme, createTheme } from "../controllers/themeController.js";

const router = express.Router();

// Fetch theme
router.get("/", getTheme);

// Creates new theme
router.post("/", createTheme);

export default router;
