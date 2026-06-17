import db from "../config/db.js";

// Start a game session (click on minigame)
export const startGameSession = async (req, res) => {
  const { IDSession, IDGame, IDSubject } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO game_session (IDSession, IDGame, IDSubject) VALUES (?, ?, ?)",
      [IDSession, IDGame, IDSubject]
    );
    res.status(201).json({ IDGameSession: result.insertId });
  } catch (error) {
    console.error("ERROR REAL EN BD:", error);
    res.status(500).json({ message: error.message });
  }
};

// End game session (exit to menu or close)
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