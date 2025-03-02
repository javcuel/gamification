import jwt from "jsonwebtoken";
import db from "../config/db.js";

export const login = async (req, res) => {
  const { userName, userPasswd } = req.body;
  try {
    const [results] = await db.query(
      "SELECT * FROM usuarios WHERE Nombre = ? AND Contrasena = ?",
      [userName, userPasswd]
    );

    // JWT data
    if (results.length > 0) {
      const token = jwt.sign(
        {
          userId: results[0].IDUsuario,
          userName: results[0].Nombre,
          userType: results[0].TipoUsuario,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({ message: "Login exitoso", token });
    } else {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } catch (err) {
    console.error("Error en la consulta a la base de datos:", err);
    return res
      .status(500)
      .json({ message: "Error en la consulta a la base de datos" });
  }
};
