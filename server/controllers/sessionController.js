import db from "../config/db.js";

// Create a new session record when a user logs IN
export const createSession = async (req, res) => {
    const { IDUser } = req.body;
    
    // We capture the User-Agent from the HTTP headers
    const userAgent = req.headers['user-agent'] || '';

    // Simple regular expression to detect mobile phones and tablets
    const isMobile = /mobile|android|iphone|ipad|tablet/i.test(userAgent);
    const deviceType = isMobile ? 'Mobile' : 'Desktop';

    try {
        // WE CLOSE ANY PREVIOUS OPEN SESSIONS OF THE SAME USER
        await db.query(
            "UPDATE session SET LogoutTime = NOW() WHERE IDUser = ? AND LogoutTime IS NULL",
            [IDUser]
        );

        // WE CREATE THE NEW SESSION
        const [result] = await db.query(
            "INSERT INTO session (IDUser, DeviceType) VALUES (?, ?)",
            [IDUser, deviceType]
        );

        res.status(201).json({ 
            message: "Session created", 
            IDSession: result.insertId 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update the LogoutTime for a specific session
export const closeSession = async (req, res) => {
  const { id } = req.params;

  try {
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

// Get all sessions (with User Name for better logs)
export const getAllSessions = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT s.*, u.Name 
      FROM session s 
      JOIN users u ON s.IDUser = u.IDUser
      ORDER BY s.LoginTime DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ message: "Error fetching sessions" });
  }
};