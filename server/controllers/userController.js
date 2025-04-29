import jwt from "jsonwebtoken";
import db from "../config/db.js";

// Login user
export const loginUser = async (req, res) => {
  const { name, passwd } = req.body;

  if (!name || !passwd) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE Nombre = ? AND Contrasena = ?",
      [name, passwd]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: rows[0].IDUsuario,
        name: rows[0].Nombre,
        role: rows[0].TipoUsuario,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({ message: "Login successfull", token });
  } catch (error) {
    console.error("Error login in:", error);
    res.status(500).json({ message: "Error login in" });
  }
};

// Get all users
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

// Get user total score
export const getScore = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT SUM(um.Puntuacion) AS totalScore, SUM(um.Completado) AS completedSubjects FROM usuarios u JOIN usuariominijuego um ON u.IDUsuario = um.IDUsuario WHERE u.IDUsuario = ?",
      [id]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching score:", error);
    res.status(500).json({ error: "Error fetching score" });
  }
};

// Creates a new user
export const createUser = async (req, res) => {
  const { name, password, role, group } = req.body;

  if (!name || !password || !role || !group) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await db.query(
      "INSERT INTO Usuarios (Nombre, Contrasena, TipoUsuario, Grupo) VALUES (?, ?, ?, ?)",
      [name, password, role, group]
    );
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

// Update subject data
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, password, role, group } = req.body;

  if (!name || !password || !role || !group) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await db.query(
      "UPDATE Mundos SET Nombre = ?, Contrasena = ?, TipoUsuario = ? Grupo = ? WHERE IDUsuario = ",
      [name, password, role, group, id]
    );
    res.json({ message: "USer updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
};

// Delete user
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
