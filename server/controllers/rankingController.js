import db from "../config/db.js";

const baseCTE = `
  WITH RankedPlays AS (
    SELECT 
        s.IDUser, 
        gs.IDGame, 
        p.Level, 
        p.Score, 
        p.Time,
        ROW_NUMBER() OVER(
            PARTITION BY s.IDUser, gs.IDGame, p.Level 
            ORDER BY p.Score DESC, p.Time ASC
        ) as rn
    FROM play p
    JOIN game_session gs ON p.IDGameSession = gs.IDGameSession
    JOIN session s ON gs.IDSession = s.IDSession
    JOIN users u ON s.IDUser = u.IDUser
    WHERE u.UserType = 'P'
  ),
  BestPlays AS (
    SELECT IDUser, IDGame, Score, Time 
    FROM RankedPlays 
    WHERE rn = 1
  ),
  PlayerGameTotals AS (
    SELECT 
        IDUser, 
        IDGame, 
        SUM(Score) as TotalScore, 
        SUM(Time) as TotalTime
    FROM BestPlays
    GROUP BY IDUser, IDGame
  )
`;

// 1. Player Ranking (General by Subject)
export const getRankingP = async (req, res) => {
  const { idSubject } = req.params; 
  try {
    const query = `
      ${baseCTE}
      SELECT 
          u.Name, 
          SUM(pgt.TotalScore) as TotalScore, 
          SUM(pgt.TotalTime) as TotalTime
      FROM PlayerGameTotals pgt
      JOIN users u ON pgt.IDUser = u.IDUser
      JOIN content c ON pgt.IDGame = c.IDGame
      JOIN assignments a ON u.IDUser = a.IDUser
      JOIN subjectGroups sg ON a.IDGroup = sg.IDGroup AND sg.IDSubject = c.IDSubject
      WHERE c.IDSubject = ?
      GROUP BY u.IDUser, u.Name
      ORDER BY TotalScore DESC, TotalTime ASC;
    `;
    const [rows] = await db.query(query, [idSubject]);
    res.json(rows);
  } catch (error) {
    console.error("MySQL error in getRankingP: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

// 2. Group Ranking (General by Subject)
export const getRankingG = async (req, res) => {
  const { idSubject } = req.params; 
  try {
    const query = `
      ${baseCTE}
      SELECT 
          sg.Name as \`Group\`, 
          SUM(pgt.TotalScore) as TotalScore, 
          SUM(pgt.TotalTime) as TotalTime
      FROM PlayerGameTotals pgt
      JOIN content c ON pgt.IDGame = c.IDGame
      JOIN assignments a ON pgt.IDUser = a.IDUser
      JOIN subjectGroups sg ON a.IDGroup = sg.IDGroup AND sg.IDSubject = c.IDSubject
      WHERE c.IDSubject = ? AND sg.IsTeacherGroup = 0 -- Ocultar grupo de profesores
      GROUP BY sg.IDGroup, sg.Name
      ORDER BY TotalScore DESC, TotalTime ASC;
    `;
    const [rows] = await db.query(query, [idSubject]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Player Ranking (By Game within Subject)
export const getRankingPG = async (req, res) => {
  const { idSubject, idGame } = req.params; 
  try {
    const query = `
      ${baseCTE}
      SELECT 
          u.Name, 
          pgt.TotalScore, 
          pgt.TotalTime
      FROM PlayerGameTotals pgt
      JOIN users u ON pgt.IDUser = u.IDUser
      JOIN content c ON pgt.IDGame = c.IDGame
      JOIN assignments a ON u.IDUser = a.IDUser
      JOIN subjectGroups sg ON a.IDGroup = sg.IDGroup AND sg.IDSubject = c.IDSubject
      WHERE c.IDSubject = ? AND pgt.IDGame = ?
      ORDER BY pgt.TotalScore DESC, pgt.TotalTime ASC;
    `;
    const [rows] = await db.query(query, [idSubject, idGame]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Group Ranking (By Game within Subject)
export const getRankingGG = async (req, res) => {
  const { idSubject, idGame } = req.params; 
  try {
    const query = `
      ${baseCTE}
      SELECT 
          sg.Name as \`Group\`, 
          SUM(pgt.TotalScore) as TotalScore, 
          SUM(pgt.TotalTime) as TotalTime
      FROM PlayerGameTotals pgt
      JOIN content c ON pgt.IDGame = c.IDGame
      JOIN assignments a ON pgt.IDUser = a.IDUser
      JOIN subjectGroups sg ON a.IDGroup = sg.IDGroup AND sg.IDSubject = c.IDSubject
      WHERE c.IDSubject = ? AND pgt.IDGame = ? AND sg.IsTeacherGroup = 0 -- Ocultar grupo de profesores
      GROUP BY sg.IDGroup, sg.Name
      ORDER BY TotalScore DESC, TotalTime ASC;
    `;
    const [rows] = await db.query(query, [idSubject, idGame]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};