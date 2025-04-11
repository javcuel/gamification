import db from "../config/db.js";

/**
 * Ranking types:
 *
 * P : General Players ranking
 * G: General Groups ranking
 * PG: Players by game ranking
 * GG: Groups by game ranking
 *
 */

// Ranking Players
export const getRankingP = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT u.Nombre, u.Grupo, SUM(un.Completado) AS TotalEstrellas, SUM(un.Puntuacion) AS TotalPuntos FROM usuarios u JOIN usuariominijuego un ON u.IDUsuario = un.IDUsuario WHERE u.TipoUsuario = 'U' GROUP BY u.IDUsuario, u.Nombre, u.Grupo ORDER BY TotalPuntos DESC"
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ranking Groups
export const getRankingG = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT u.Grupo, SUM(un.Completado) AS TotalEstrellas, SUM(un.Puntuacion) AS TotalPuntos FROM usuarios u JOIN usuariominijuego un ON u.IDUsuario = un.IDUsuario WHERE u.TipoUsuario = 'U'GROUP BY u.Grupo ORDER BY TotalPuntos DESC"
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ranking Players by Game
export const getRankingPG = async (req, res) => {
  const { gameId } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT u.Nombre, u.Grupo, SUM(un.Completado) AS TotalEstrellas, SUM(un.Puntuacion) AS TotalPuntos FROM usuarios u JOIN usuariominijuego un ON u.IDUsuario = un.IDUsuario WHERE u.TipoUsuario = 'U' and un.IDMinijuego = ? GROUP BY un.IDMinijuego, u.IDUsuario, u.Nombre,u.Grupo ORDER BY TotalPuntos DESC",
      [gameId]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ranking Groups by Game
export const getRankingGG = async (req, res) => {
  const { gameId } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT u.Grupo, SUM(un.Completado) AS TotalEstrellas, SUM(un.Puntuacion) AS TotalPuntos FROM usuarios u JOIN usuariominijuego un ON u.IDUsuario = un.IDUsuario WHERE u.TipoUsuario = 'U' and un.IDMinijuego = ? GROUP BY u.Grupo ORDER BY TotalPuntos DESC",
      [gameId]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
