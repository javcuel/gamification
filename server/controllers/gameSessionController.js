import db from "../config/db.js";

// Iniciar una sesión de juego (clic en minijuego)
export const startGameSession = async (req, res) => {
  console.log("Datos recibidos en el controlador:", req.body); 
  // 1. Extraemos el nuevo campo IDSubject
  const { IDSession, IDGame, IDSubject } = req.body;

  try {
    // 2. Lo añadimos a la consulta SQL
    const [result] = await db.query(
      "INSERT INTO game_session (IDSession, IDGame, IDSubject) VALUES (?, ?, ?)",
      [IDSession, IDGame, IDSubject]
    );
    console.log("Inserción exitosa, ID:", result.insertId);
    res.status(201).json({ IDGameSession: result.insertId });
  } catch (error) {
    console.error("ERROR REAL EN BD:", error);
    res.status(500).json({ message: error.message });
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