import express from "express";
import multer from "multer";
import { processBulkUpload } from "../controllers/bulkController.js";

const router = express.Router();

// Configuramos multer para procesar el archivo en la memoria RAM (sin guardarlo en disco)
const upload = multer({ storage: multer.memoryStorage() });

// Ruta POST: /api/bulk/upload
// 'csvFile' es el nombre del campo que deberá enviar el Frontend
router.post("/upload", upload.single("csvFile"), processBulkUpload);

export default router;