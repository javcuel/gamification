import db from "../config/db.js";

// Create a new session record when a user logs IN
export const createSession = async (req, res) => {
    const { IDUser } = req.body;

    try {
        // 1. CERRAMOS CUALQUIER SESIÓN ABIERTA PREVIA DEL MISMO USUARIO
        // Esto limpia los "NULL" que quedaron por cerrar la pestaña
        await db.query(
            "UPDATE session SET LogoutTime = NOW() WHERE IDUser = ? AND LogoutTime IS NULL",
            [IDUser]
        );

        // 2. CREAMOS LA NUEVA SESIÓN
        const [result] = await db.query(
            "INSERT INTO session (IDUser) VALUES (?)",
            [IDUser]
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
  const { id } = req.params; // Este es el IDSession

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
    // Hacemos un JOIN con la tabla 'users' para saber de quién es cada sesión
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