import db from "../config/db.js";

// Ranking Jugador - General
export const getRankingJG = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT u.Nombre, u.Grupo, SUM(un.Completado) AS TotalEstrellas, SUM(un.Puntuacion) AS TotalPuntos FROM usuarios u JOIN usuariominijuego un ON u.IDUsuario = un.IDUsuario WHERE u.TipoUsuario = 'U' GROUP BY u.IDUsuario, u.Nombre, u.Grupo ORDER BY TotalPuntos DESC"
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ranking Grupo - General
export const getRankingGG = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT u.Grupo, SUM(un.Completado) AS TotalEstrellas, SUM(un.Puntuacion) AS TotalPuntos FROM usuarios u JOIN usuariominijuego un ON u.IDUsuario = un.IDUsuario WHERE u.TipoUsuario = 'U'GROUP BY u.Grupo ORDER BY TotalPuntos DESC"
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ranking Jugador - Juego
export const getRankingJJ = async (req, res) => {
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

// Ranking Grupo - Juego
export const getRankingGJ = async (req, res) => {
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
