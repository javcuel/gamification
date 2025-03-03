import db from "../config/db.js";

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

export const updateGame = async (req, res) => {
  const { id } = req.params;
  const { name, maxScore, subjectId, imgUrl } = req.body;

  try {
    await db.query(
      "UPDATE Minijuegos SET Nombre = ?, PuntuacionMaxima = ?, IDMundo = ?, UrlImagen = ? WHERE IDMinijuego = ?",
      [name, maxScore, subjectId, imgUrl, id]
    );
    res.json({ message: "Game updated successfully" });
  } catch (error) {
    console.error("Error updating game:", error);
    res.status(500).json({ message: "Error updating game" });
  }
};

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

/**
 * Toggle open/closed state of a Game.
 * @function updateGameOpenState
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
export const updateGameOpenState = async (req, res) => {
  const { id } = req.params; // Extract Game ID from the request parameters
  const { isOpen } = req.body; // Extract the new "open" state from the request body

  try {
    // Update the "Abierto" field in the database based on the provided state
    await db.query("UPDATE Minijuegos SET Abierto = ? WHERE IDMinijuego = ?", [
      isOpen ? 1 : 0, // Convert boolean to integer (1 for true, 0 for false)
      id,
    ]);
    res.json({ message: "Game open state updated successfully" });
  } catch (error) {
    console.error("Error updating Game open state:", error);
    res.status(500).json({ message: "Error updating Game open state" });
  }
};

/**
 * Toggle visible/invisible state of a Game.
 * @function updateGameVisibleState
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
export const updateGameVisibleState = async (req, res) => {
  const { id } = req.params; // Extract Game ID from the request parameters
  const { isVisible } = req.body; // Extract the new "open" state from the request body

  try {
    // Update the "Abierto" field in the database based on the provided state
    await db.query("UPDATE Minijuegos SET Visible = ? WHERE IDMinijuego = ?", [
      isVisible ? 1 : 0, // Convert boolean to integer (1 for true, 0 for false)
      id,
    ]);
    res.json({ message: "Game Visible state updated successfully" });
  } catch (error) {
    console.error("Error updating Game Visible state:", error);
    res.status(500).json({ message: "Error updating Game Visible state" });
  }
};
