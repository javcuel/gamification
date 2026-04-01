import db from "../config/db.js";

// Create a new session record when a user logs in
export const createSession = async (req, res) => {
  try {
    // LoginTime is handled by DEFAULT CURRENT_TIMESTAMP in MySQL
    const [result] = await db.query(
      "INSERT INTO session () VALUES ()"
    );

    // We return the generated IDSession so the frontend can store it
    // and use it later to close the session or link game sessions.
    res.status(201).json({ 
      message: "Session registered successfully", 
      IDSession: result.insertId 
    });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ message: "Error creating session" });
  }
};

// Update the LogoutTime for a specific session
export const closeSession = async (req, res) => {
  const { id } = req.params; // This is the IDSession

  try {
    // We use NOW() to set the current date and time in LogoutTime
    const [result] = await db.query(
      "UPDATE session SET LogoutTime = NOW() WHERE IDSession = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.json({ message: "Session closed successfully" });
  } catch (error) {
    console.error("Error closing session:", error);
    res.status(500).json({ message: "Error closing session" });
  }
};

// Optional: Get all sessions (for admin logs)
export const getAllSessions = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM session");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ message: "Error fetching sessions" });
  }
};

/**
 * SUMMARY OF HTTP CALLS FOR SESSION MANAGEMENT:
 * * 1. POST /api/sessions
 * - Action: Triggered during user login.
 * - Purpose: Creates a new record in the 'session' table.
 * - Key Data: Returns 'IDSession' to the frontend.
 * * 2. POST /api/game-sessions
 * - Action: Triggered when the user starts a game.
 * - Purpose: Links a specific game activity to the current session.
 * - Key Data: Frontend sends the stored 'IDSession' in the request body.
 * * 3. PUT /api/sessions/:id
 * - Action: Triggered when the user logs out or closes the app.
 * - Purpose: Updates 'LogoutTime' using the IDSession provided in the URL.
 * - Key Data: Uses 'id' from params to identify which session to close.
 */