import db from "../config/db.js";

export const unlinkGameFromSubject = async (req, res) => {
  const { subjectId, gameId } = req.params; 

  try {
    const [result] = await db.query(
      "DELETE FROM content WHERE IDSubject = ? AND IDGame = ?",
      [subjectId, gameId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Relation not found" });
    }

    res.json({ message: "Game unlinked from subject successfully" });
  } catch (error) {
    console.error("Error unlinking game:", error);
    res.status(500).json({ message: "Error unlinking game" });
  }
};

// server/controllers/contentController.js

export const linkGameToSubject = async (req, res) => {
  // 1. PRIMERO declaramos las variables
  const { subjectId, gameId } = req.body;

  // 2. DESPUÉS podemos usarlas en el log
  console.log("Recibido en Backend -> subjectId:", subjectId, "gameId:", gameId);

  if (!subjectId || !gameId) {
    return res.status(400).json({ message: "Faltan IDs de asignatura o juego" });
  }

  try {
    // Comprobar si ya existe la relación
    const [existing] = await db.query(
      "SELECT * FROM content WHERE IDSubject = ? AND IDGame = ?",
      [subjectId, gameId]
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: "Este juego ya está vinculado a la asignatura" });
    }

    // Insertar la nueva relación
    await db.query(
      "INSERT INTO content (IDSubject, IDGame) VALUES (?, ?)",
      [subjectId, gameId]
    );

    res.status(201).json({ message: "Juego vinculado correctamente" });
  } catch (error) {
    console.error("Error en el INSERT de content:", error);
    res.status(500).json({ message: "Error interno al vincular el juego" });
  }
};