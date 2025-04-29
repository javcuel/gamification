import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";

import gameRoutes from "./routes/gameRoutes.js";
import rankingRoutes from "./routes/rankingRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import themeRoutes from "./routes/themeRoutes.js";
import userRoutes from "./routes/userRoutes.js";

//Instancia de una aplicación express
const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions)); // User CORS options
app.use(express.json()); // Parse to JSON in the requests

// Routes

app.use("/api/ranking", rankingRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/users", userRoutes);
app.use("/api/theme", themeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(
    `Servidor en funcionamiento en http://localhost:${PORT} -- Listening...`
  );
});
