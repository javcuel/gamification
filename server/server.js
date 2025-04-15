import dotenv from "dotenv"; // Carga las variables de entorno definidas en .env
dotenv.config();

import cors from "cors"; // Permite que el front-end interactúe con el back-end
import express from "express"; // Framework para crear APIs en Node.js

import authRoutes from "./routes/authRoutes.js"; // Importa las rutas de autenticación
import gameRoutes from "./routes/gameRoutes.js";
import rankingRoutes from "./routes/rankingRoutes.js"; // Importa las rutas de ranking
import subjectRoutes from "./routes/subjectRoutes.js";
import themeRoutes from "./routes/themeRoutes.js";
import userRoutes from "./routes/userRoutes.js";

//Instancia de una aplicación express
const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:5173", // Permitir solo tu aplicación de frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  credentials: true, // Permitir el envío de cookies
};

app.use(cors(corsOptions)); // Usar las opciones de CORS
app.use(express.json()); // Para parsear el JSON en las solicitudes

// Rutas

app.use("/api/auth", authRoutes);
app.use("/api/ranking", rankingRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/users", userRoutes);
app.use("/api/theme", themeRoutes);

// Rutas protegidas
//app.use("/api/protected", protectedRoutes);
// Inicia el Servidor
app.listen(PORT, () => {
  console.log(
    `Servidor en funcionamiento en http://localhost:${PORT} -- Listening...`
  );
});
