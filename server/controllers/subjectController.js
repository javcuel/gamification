import db from "../config/db.js";

// Get all subjects
export const getSubjects = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM subjects ORDER BY Posicion ASC");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ message: "Error fetching subjects" });
  }
};

// Creates a new subject
export const createSubject = async (req, res) => {
  const { Nombre, UrlImgMundo, UrlImgDentro } = req.body;

  if (!Nombre || !UrlImgMundo || !UrlImgDentro) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO subjects (Nombre, UrlImgMundo, UrlImgDentro, Posicion, Abierto, Visible) VALUES (?, ?, ?, ?, ?, ?)",
      [Nombre, UrlImgMundo, UrlImgDentro, 0, 0, 0] // Defaults: position = 0, open = false, visible = false
    );
    res
      .status(201)
      .json({ message: "Subject created successfully", id: result.insertId });
  } catch (error) {
    console.error("Error creating subject:", error);
    res.status(500).json({ message: "Error creating subject" });
  }
};

// Update subject data
export const updateSubject = async (req, res) => {
  const { id } = req.params;
  const { Nombre, UrlImgMundo, UrlImgDentro } = req.body;

  if (!Nombre || !UrlImgMundo || !UrlImgDentro) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await db.query(
      "UPDATE subjects SET Nombre = ?, UrlImgMundo = ?, UrlImgDentro = ? WHERE IDSubject = ?",
      [Nombre, UrlImgMundo, UrlImgDentro, id]
    );
    res.json({ message: "Subject updated successfully" });
  } catch (error) {
    console.error("Error updating subject:", error);
    res.status(500).json({ message: "Error updating subject" });
  }
};

// Toggle open/closed subject state
export const updateSubjectOpenState = async (req, res) => {
  const { id } = req.params;
  const { Abierto } = req.body;

  try {
    await db.query("UPDATE subjects SET Abierto = ? WHERE IDSubject = ?", [
      Abierto ? 1 : 0,
      id,
    ]);
    res.json({ message: "Subject open state updated successfully" });
  } catch (error) {
    console.error("Error updating subject open state:", error);
    res.status(500).json({ message: "Error updating subject open state" });
  }
};

// Toggle visible/hidden subject state
export const updateSubjectVisibleState = async (req, res) => {
  const { id } = req.params;
  const { Visible } = req.body;

  try {
    await db.query("UPDATE subjects SET Visible = ? WHERE IDSubject = ?", [
      Visible ? 1 : 0,
      id,
    ]);
    res.json({ message: "Subject Visible state updated successfully" });
  } catch (error) {
    console.error("Error updating subject Visible state:", error);
    res.status(500).json({ message: "Error updating subject Visible state" });
  }
};

// Delete subject
export const deleteSubject = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM subjects WHERE IDSubject = ?", [id]);
    res.json({ message: "Subject deleted successfully" });
  } catch (error) {
    console.error("Error deleting subject:", error);
    res.status(500).json({ message: "Error deleting subject" });
  }
};
