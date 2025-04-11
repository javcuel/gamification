import db from "../config/db.js";

export const getSubjects = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Mundos ORDER BY Posicion ASC");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching worlds:", error);
    res.status(500).json({ message: "Error fetching worlds" });
  }
};

export const updateSubject = async (req, res) => {
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

export const deleteSubject = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM Mundos WHERE IDMundo = ?", [id]);
    res.json({ message: "World deleted successfully" });
  } catch (error) {
    console.error("Error deleting world:", error);
    res.status(500).json({ message: "Error deleting world" });
  }
};

export const addSubject = async (req, res) => {
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

export const updateSubjectOpenState = async (req, res) => {
  const { id } = req.params;
  const { isOpen } = req.body;

  try {
    await db.query("UPDATE Mundos SET Abierto = ? WHERE IDMundo = ?", [
      isOpen ? 1 : 0,
      id,
    ]);
    res.json({ message: "World open state updated successfully" });
  } catch (error) {
    console.error("Error updating world open state:", error);
    res.status(500).json({ message: "Error updating world open state" });
  }
};

export const updateSubjectVisibleState = async (req, res) => {
  const { id } = req.params;
  const { isVisible } = req.body;

  try {
    await db.query("UPDATE Mundos SET Visible = ? WHERE IDMundo = ?", [
      isVisible ? 1 : 0,
      id,
    ]);
    res.json({ message: "World Visible state updated successfully" });
  } catch (error) {
    console.error("Error updating world Visible state:", error);
    res.status(500).json({ message: "Error updating world Visible state" });
  }
};
