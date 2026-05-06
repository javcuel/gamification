import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";

import path from 'path';
import { fileURLToPath } from 'url';

import gameRoutes from "./routes/gameRoutes.js";
import rankingRoutes from "./routes/rankingRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import themeRoutes from "./routes/themeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import gameSessionRoutes from "./routes/gameSessionRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import playRoutes from "./routes/playRoutes.js";



//Instancia de una aplicación express
const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors(corsOptions)); // User CORS options
app.use(express.json()); // Parse to JSON in the requests


app.use('/games', express.static(path.join(__dirname, 'public/games'), {
  setHeaders: (res, filePath) => {
    // 1. Configuramos el tipo de compresión
    if (filePath.endsWith('.br')) {
      res.setHeader('Content-Encoding', 'br');
    } else if (filePath.endsWith('.gz')) {
      res.setHeader('Content-Encoding', 'gzip');
    }

    // 2. Configuramos el tipo de contenido exacto (evita que Express lo cambie)
    if (filePath.includes('.wasm')) {
      res.setHeader('Content-Type', 'application/wasm');
    } else if (filePath.includes('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (filePath.includes('.data')) {
      res.setHeader('Content-Type', 'application/octet-stream');
    }
  }
}));

// Servimos también el script de integración desde el backend
app.use('/ApiComunicacionPlataforma', express.static(path.join(__dirname, 'public/ApiComunicacionPlataforma')));

// Routes

app.use((req, res, next) => {
  console.log(`Nueva petición: ${req.method} ${req.url}`);
  next();
});

app.use("/api/rankings", rankingRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/users", userRoutes);
app.use("/api/theme", themeRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/game-sessions", gameSessionRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/plays", playRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(
    `Servidor en funcionamiento en http://localhost:${PORT} -- Listening...`
  );
});
