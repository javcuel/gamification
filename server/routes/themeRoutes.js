import express from "express";
import { createTheme, getTheme } from "../controllers/themeController.js";

const router = express.Router();

router.get("/", getTheme);
router.post("/", createTheme);

export default router;
