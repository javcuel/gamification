import db from "../config/db.js";

// Get all games
export const getGames = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM games ORDER BY Name ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ message: "Error fetching games" });
  }
};

// Get all games by the Subject ID
export const getGamesBySubject = async (req, res) => {
  const { subjectId } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT m.* FROM games m
       JOIN content c ON m.IDGame = c.IDGame
       WHERE c.IDSubject = ? 
       ORDER BY m.Name ASC`,
      [subjectId]
    );
    
    res.json(rows);
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ message: "Error fetching games" });
  }
};

// Creates a new game
export const createGame = async (req, res) => {
  const { Name, UrlImagen, PuntuacionMaxima } = req.body;
  // const { IDSubject, Name, UrlImagen, PuntuacionMaxima } = req.body; out

  //if ((!IDSubject, !Name || !UrlImagen || !PuntuacionMaxima)) { out
  if ((!Name || !UrlImagen || !PuntuacionMaxima)) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const [result] = await db.query(
      // "INSERT INTO games (IDSubject, Name, UrlImagen, PuntuacionMaxima, Abierto, Visible) VALUES (?, ?, ?, ?, ?, ?)", out
      "INSERT INTO games (Name, UrlImagen, PuntuacionMaxima, Abierto, Visible, Disponible) VALUES ( ?, ?, ?, ?, ?, ?)",
      [Name, UrlImagen, PuntuacionMaxima, 0, 0, 0] // Defaults: position = 0, open = false, visible = false
      // [IDSubject, Name, UrlImagen, PuntuacionMaxima, 0, 0, 0] // Defaults: position = 0, open = false, visible = false out
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
  // const { IDSubject, Name, UrlImagen, PuntuacionMaxima } = req.body; out
  const { Name, UrlImagen, PuntuacionMaxima } = req.body; 
  try {
    await db.query(
      /*"UPDATE games SET Name = ?, PuntuacionMaxima = ?, IDSubject = ?, UrlImagen = ? WHERE IDGame = ?",
      [Name, PuntuacionMaxima, IDSubject, UrlImagen, id]
    ); out */
    "UPDATE games SET Name = ?, PuntuacionMaxima = ?, UrlImagen = ? WHERE IDGame = ?",
      [Name, PuntuacionMaxima, UrlImagen, id]
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
  const { Abierto } = req.body;

  try {
    await db.query("UPDATE games SET Abierto = ? WHERE IDGame = ?", [
      Abierto ? 1 : 0,
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
  const { Visible } = req.body;

  try {
    await db.query("UPDATE games SET Visible = ? WHERE IDGame = ?", [
      Visible ? 1 : 0,
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
    await db.query("DELETE FROM games WHERE IDGame = ?", [id]);
    res.json({ message: "Game deleted successfully" });
  } catch (error) {
    console.error("Error deleting game:", error);
    res.status(500).json({ message: "Error deleting game" });
  }
};


// added for showing the list of games available for adding to a subject
export const getAvailableGamesForSubject = async (req, res) => {
  const { subjectId } = req.params;
  try {
    const [rows] = await db.query(
      `SELECT * FROM games 
       WHERE IDGame NOT IN (
         SELECT IDGame FROM content WHERE IDSubject = ?
       ) ORDER BY Name ASC`,
      [subjectId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener juegos disponibles" });
  }
};
