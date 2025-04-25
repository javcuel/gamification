import jwt from "jsonwebtoken";
import db from "../config/db.js";

export const login = async (req, res) => {
  const { Nombre, Contrasena } = req.body;
  console.log("hola", Nombre);
  try {
    const [results] = await db.query(
      "SELECT * FROM usuarios WHERE Nombre = ? AND Contrasena = ?",
      [Nombre, Contrasena]
    );
    console.log(results);
    // JWT data
    if (results.length > 0) {
      const token = jwt.sign(
        {
          id: results[0].IDUsuario,
          nombre: results[0].Nombre,
          role: results[0].TipoUsuario,
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
