import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";

import path from 'path';
import { fileURLToPath } from 'url';

import gameRoutes from "./routes/gameRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import themeRoutes from "./routes/themeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import gameSessionRoutes from "./routes/gameSessionRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";

import { STATIC_ROUTES } from './config/constants.js';



const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors(corsOptions)); 
app.use(express.json()); 

app.use(cors(corsOptions)); 
app.use(express.json()); 

// If the request arrives duplicated due to the proxy or cache, we modify it.
app.use((req, res, next) => {
  if (req.url.startsWith('/api/api')) {
    req.url = req.url.replace(/^\/api\/api/, '/api');
  }
  next();
});
// ------------------------------------



app.use(STATIC_ROUTES.GAME_FILES, express.static(path.join(__dirname, 'public/games'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.br')) {
      res.setHeader('Content-Encoding', 'br');
    } else if (filePath.endsWith('.gz')) {
      res.setHeader('Content-Encoding', 'gzip');
    }

    if (filePath.includes('.wasm')) {
      res.setHeader('Content-Type', 'application/wasm');
    } else if (filePath.includes('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (filePath.includes('.data')) {
      res.setHeader('Content-Type', 'application/octet-stream');
    }
  }
}));

app.use(STATIC_ROUTES.COMMUNICATION_SCRIPT, express.static(path.join(__dirname, 'public/ApiPlataformComunication')));
app.use(STATIC_ROUTES.IMAGES, express.static(path.join(__dirname, 'public/images')));


app.use("/api/subjects", subjectRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/users", userRoutes);
app.use("/api/theme", themeRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/game-sessions", gameSessionRoutes);
app.use("/api/groups", groupRoutes);




// Start the server
app.listen(PORT, () => {
  console.log(
    `Servidor en funcionamiento en http://localhost:${PORT} -- Listening...`
  );
});