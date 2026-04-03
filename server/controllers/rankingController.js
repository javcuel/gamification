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

// Get Ranking Players
export const getRankingP = async (req, res) => {
  try {
    const [rows] = await db.query(
      //"SELECT u.Nombre, u.Grupo, SUM(un.Completado) AS TotalEstrellas, SUM(un.Puntuacion) AS TotalPuntos FROM users u JOIN usuariominijuego un ON u.IDUser = un.IDUser WHERE u.TipoUsuario = 'U' GROUP BY u.IDUser, u.Nombre, u.Grupo ORDER BY TotalPuntos DESC"
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Ranking Groups
export const getRankingG = async (req, res) => {
  try {
    const [rows] = await db.query(
      //"SELECT u.Grupo, SUM(un.Completado) AS TotalEstrellas, SUM(un.Puntuacion) AS TotalPuntos FROM users u JOIN usuariominijuego un ON u.IDUser = un.IDUser WHERE u.TipoUsuario = 'U'GROUP BY u.Grupo ORDER BY TotalPuntos DESC"
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Ranking Players by Game
export const getRankingPG = async (req, res) => {
  const { gameId } = req.params;

  try {
    const [rows] = await db.query(
      //"SELECT u.Nombre, u.Grupo, SUM(un.Completado) AS TotalEstrellas, SUM(un.Puntuacion) AS TotalPuntos FROM users u JOIN usuariominijuego un ON u.IDUser = un.IDUser WHERE u.TipoUsuario = 'U' and un.IDGame = ? GROUP BY un.IDGame, u.IDUser, u.Nombre,u.Grupo ORDER BY TotalPuntos DESC",
      [gameId]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Ranking Groups by Game
export const getRankingGG = async (req, res) => {
  const { gameId } = req.params;

  try {
    const [rows] = await db.query(
      //"SELECT u.Grupo, SUM(un.Completado) AS TotalEstrellas, SUM(un.Puntuacion) AS TotalPuntos FROM users u JOIN usuariominijuego un ON u.IDUser = un.IDUser WHERE u.TipoUsuario = 'U' and un.IDGame = ? GROUP BY u.Grupo ORDER BY TotalPuntos DESC",
      [gameId]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
