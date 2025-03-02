import db from "../config/db.js";

/**
 * Fetch all worlds.
 * @function getWorlds
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
export const getWorlds = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Mundos ORDER BY Posicion ASC");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching worlds:", error);
    res.status(500).json({ message: "Error fetching worlds" });
  }
};

/**
 * Update a world.
 * @function updateWorld
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
export const updateWorld = async (req, res) => {
  const { id } = req.params;
  const { name, imgWorldUrl, imgBackgroundUrl } = req.body;

  try {
    await db.query(
      "UPDATE Mundos SET Nombre = ?, UrlImgMundo = ?, UrlImgDentro = ? WHERE IDMundo = ?",
      [name, imgWorldUrl, imgBackgroundUrl, id]
    );
    res.json({ message: "World updated successfully" });
  } catch (error) {
    console.error("Error updating world:", error);
    res.status(500).json({ message: "Error updating world" });
  }
};

/**
 * Delete a world.
 * @function deleteWorld
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
export const deleteWorld = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM Mundos WHERE IDMundo = ?", [id]);
    res.json({ message: "World deleted successfully" });
  } catch (error) {
    console.error("Error deleting world:", error);
    res.status(500).json({ message: "Error deleting world" });
  }
};

/**
 * Add a new world to the database.
 * @function addWorld
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
export const addWorld = async (req, res) => {
  const { name } = req.body;
  const worldImage = req.files["worldImage"]?.[0]?.filename;
  const backgroundImage = req.files["backgroundImage"]?.[0]?.filename;

  if (!name || !worldImage || !backgroundImage) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO Mundos (Nombre, UrlImgMundo, UrlImgDentro, Posicion, Abierto, Visible) VALUES (?, ?, ?, ?, ?, ?)",
      [name, worldImage, backgroundImage, 0, 0, 0] // Defaults: position = 0, open = false, visible = false
    );
    res
      .status(201)
      .json({ message: "World added successfully", id: result.insertId });
  } catch (error) {
    console.error("Error adding world:", error);
    res.status(500).json({ message: "Error adding world" });
  }
};

/**
 * Toggle open/closed state of a world.
 * @function updateWorldOpenState
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
export const updateWorldOpenState = async (req, res) => {
  const { id } = req.params; // Extract world ID from the request parameters
  const { isOpen } = req.body; // Extract the new "open" state from the request body

  try {
    // Update the "Abierto" field in the database based on the provided state
    await db.query("UPDATE Mundos SET Abierto = ? WHERE IDMundo = ?", [
      isOpen ? 1 : 0, // Convert boolean to integer (1 for true, 0 for false)
      id,
    ]);
    res.json({ message: "World open state updated successfully" });
  } catch (error) {
    console.error("Error updating world open state:", error);
    res.status(500).json({ message: "Error updating world open state" });
  }
};

/**
 * Toggle visible/invisible state of a world.
 * @function updateWorldVisibleState
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
export const updateWorldVisibleState = async (req, res) => {
  const { id } = req.params; // Extract world ID from the request parameters
  const { isVisible } = req.body; // Extract the new "open" state from the request body

  try {
    // Update the "Abierto" field in the database based on the provided state
    await db.query("UPDATE Mundos SET Visible = ? WHERE IDMundo = ?", [
      isVisible ? 1 : 0, // Convert boolean to integer (1 for true, 0 for false)
      id,
    ]);
    res.json({ message: "World Visible state updated successfully" });
  } catch (error) {
    console.error("Error updating world Visible state:", error);
    res.status(500).json({ message: "Error updating world Visible state" });
  }
};
