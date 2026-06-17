import db from "../config/db.js";

export const getGameProgress = async (req, res) => {
  try {
    const { idGame } = req.params;
    
    const userId = req.user?.IDUser || req.user?.id || req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Token or user ID not found. Check that the route has the verifyToken middleware." });
    }

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
    
    const [rows] = await db.query(query, [idGame, userId]);
    res.json(rows);

  } catch (error) {
    console.error("Error obtaining progress:", error);
    res.status(500).json({ message: "Internal server error while obtaining progress" });
  }
};

// Save the data for a completed level
export const savePlay = async (req, res) => {
  try {
    // We capture both 'id' and 'idGameSession' in case the routes file uses one or the other
    const gameSessionId = req.params.idGameSession || req.params.id; 
    const { level, score, time, completed } = req.body;

    if (!gameSessionId) {
       return res.status(400).json({ message: "The game session ID is missing from the URL" });
    }

    const [result] = await db.query(
      "INSERT INTO play (IDGameSession, Level, Score, Time, Completed) VALUES (?, ?, ?, ?, ?)",
      [gameSessionId, level, score, time, completed ? 1 : 0]
    );

    res.status(201).json({ message: "Play saved successfully", id: result.insertId });

  } catch (error) {
    console.error("Error saving play:", error);
    res.status(500).json({ message: "Internal error saving the play" });
  }
};