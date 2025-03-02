import express from "express";
import { getTheme, updateTheme } from "../controllers/themeController.js";

const router = express.Router();

// Ruta para obtener el theme
router.get("/", getTheme);

// Ruta para actualizar el theme
router.post("/update", updateTheme);

export default router;
