import db from "../config/db.js";

export const getUsers = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT IDUsuario, Nombre, TipoUsuario FROM Usuarios"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const addUser = async (req, res) => {
  const { name, password, role, group } = req.body;

  if (!name || !password || !role || !group) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await db.query(
      "INSERT INTO Usuarios (Nombre, Contrasena, TipoUsuario, Grupo) VALUES (?, ?, ?, ?)",
      [name, password, role, group]
    );
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Error adding user" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM Usuarios WHERE IDUsuario = ?", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
};
