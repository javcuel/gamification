import db from "../config/db.js";

// Get all games by the Subject ID
export const getGamesBySubject = async (req, res) => {
  const { subjectId } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT * FROM Minijuegos WHERE IDMundo = ? ORDER BY Posicion ASC",
      [subjectId]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ message: "Error fetching games" });
  }
};

// Creates a new subject
export const createGame = async (req, res) => {
  const { idSubject, name, img, maxScore } = req.body;

  if ((!idSubject, !name || !img || !maxScore)) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO Minijuegos (IDMundo, Nombre, imgUrl, Puntuacion, Abierto, Visible) VALUES (?, ?, ?, ?, ?, ?)",
      [idSubject, name, img, maxScore, 0, 0] // Defaults: position = 0, open = false, visible = false
    );
    res
      .status(201)
      .json({ message: "Game created successfully", id: result.insertId });
  } catch (error) {
    console.error("Error creating game:", error);
    res.status(500).json({ message: "Error creating game" });
  }
};

// Update game data
export const updateGame = async (req, res) => {
  const { id } = req.params;
  const { idSubject, name, img, maxScore } = req.body;

  try {
    await db.query(
      "UPDATE Minijuegos SET Nombre = ?, PuntuacionMaxima = ?, IDMundo = ?, UrlImagen = ? WHERE IDMinijuego = ?",
      [name, maxScore, idSubject, img, id]
    );
    res.json({ message: "Game updated successfully" });
  } catch (error) {
    console.error("Error updating game:", error);
    res.status(500).json({ message: "Error updating game" });
  }
};

// Toggle open/closed game state
export const updateGameOpenState = async (req, res) => {
  const { id } = req.params;
  const { isOpen } = req.body;

  try {
    await db.query("UPDATE Minijuegos SET Abierto = ? WHERE IDMinijuego = ?", [
      isOpen ? 1 : 0,
      id,
    ]);
    res.json({ message: "Game open state updated successfully" });
  } catch (error) {
    console.error("Error updating Game open state:", error);
    res.status(500).json({ message: "Error updating Game open state" });
  }
};

// Toggle visible/hidden game state
export const updateGameVisibleState = async (req, res) => {
  const { id } = req.params;
  const { isVisible } = req.body;

  try {
    await db.query("UPDATE Minijuegos SET Visible = ? WHERE IDMinijuego = ?", [
      isVisible ? 1 : 0,
      id,
    ]);
    res.json({ message: "Game Visible state updated successfully" });
  } catch (error) {
    console.error("Error updating Game Visible state:", error);
    res.status(500).json({ message: "Error updating Game Visible state" });
  }
};

// Delete game
export const deleteGame = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM Minijuegos WHERE IDMinijuego = ?", [id]);
    res.json({ message: "Game deleted successfully" });
  } catch (error) {
    console.error("Error deleting game:", error);
    res.status(500).json({ message: "Error deleting game" });
  }
};
