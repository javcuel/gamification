import db from "../config/db.js";

// 1. Obtener el progreso (Mejor intento por nivel: Max Score -> Min Time)
export const getGameProgress = async (req, res) => {
  const { gameId } = req.params;
  
  // Imprimimos el objeto del token para ver su estructura exacta
  console.log("Token decodificado en req.user:", req.user);
  
  // Extraemos el ID usando los nombres más comunes de tu sistema
  const userId = req.user.IDUser || req.user.id || req.user.userId;

  if (!userId) {
    console.error("¡ERROR! No se pudo extraer el ID del usuario del token.");
    return res.status(400).json({ message: "ID de usuario no encontrado en el token" });
  }

  try {
    const query = `
      WITH RankedPlays AS (
        SELECT 
          p.Level AS level, 
          p.Score AS score, 
          p.Time AS time, 
          p.Completed AS completed,
          ROW_NUMBER() OVER (
            PARTITION BY p.Level 
            ORDER BY p.Score DESC, p.Time ASC
          ) as rn
        FROM play p
        JOIN game_session gs ON p.IDGameSession = gs.IDGameSession
        JOIN session s ON gs.IDSession = s.IDSession
        WHERE gs.IDGame = ? AND s.IDUser = ?
      )
      SELECT level, score, time, completed 
      FROM RankedPlays 
      WHERE rn = 1
      ORDER BY level ASC;
    `;

    const [rows] = await db.query(query, [gameId, userId]);
    
    // Devolvemos el array de objetos con el formato exacto que necesita el juego
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener progreso:", error);
    res.status(500).json({ message: "Error al obtener progreso" });
  }
};

// 2. Guardar los datos de un nivel terminado
export const savePlay = async (req, res) => {
  const { gameSessionId } = req.params; // Viene de la URL anidada
  const { level, score, time, completed } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO play (IDGameSession, Level, Score, Time, Completed) VALUES (?, ?, ?, ?, ?)",
      [gameSessionId, level, score, time, completed ? 1 : 0]
    );
    res.status(201).json({ message: "Partida guardada", idPlay: result.insertId });
  } catch (error) {
    console.error("Error al guardar partida:", error);
    res.status(500).json({ message: "Error al guardar partida" });
  }
};