import db from "../config/db.js";

// Iniciar una sesión de juego (clic en minijuego)
export const startGameSession = async (req, res) => {
  const { IDSession, IDGame } = req.body;

  if (!IDSession || !IDGame) {
    return res.status(400).json({ message: "IDSession and IDGame are required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO game_session (IDSession, IDGame) VALUES (?, ?)",
      [IDSession, IDGame]
    );

    res.status(201).json({ 
      message: "Game session started", 
      IDGameSession: result.insertId 
    });
  } catch (error) {
    console.error("Error starting game session:", error);
    res.status(500).json({ message: "Error starting game session" });
  }
};

// Finalizar sesión de juego (salir al menú o cerrar)
export const endGameSession = async (req, res) => {
  const { id } = req.params; // IDGameSession

  try {
    const [result] = await db.query(
      "UPDATE game_session SET GameEndTime = NOW() WHERE IDGameSession = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Game session not found" });
    }

    res.json({ message: "Game session ended successfully" });
  } catch (error) {
    console.error("Error ending game session:", error);
    res.status(500).json({ message: "Error ending game session" });
  }
};