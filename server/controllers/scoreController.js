import db from "../config/db.js";

export const getTotalScore = async (req, res) => {
  const { userName } = req.user;

  const query =
    "SELECT SUM(um.Puntuacion) AS total_puntuacion, SUM(um.Completado) AS total_estrellas FROM usuarios u JOIN usuariominijuego um ON u.IDUsuario = um.IDUsuario WHERE u.Nombre = ?";

  try {
    const [result] = await db.query(query, [userName]);

    if (result.length > 0) {
      const totalScore = result[0].total_puntuacion || 0;
      const totalStars = result[0].total_estrellas || 0;
      res.json({ score: totalScore, stars: totalStars });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener la puntuación" });
  }
};
