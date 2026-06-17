import db from "../config/db.js";

export const unlinkGameFromSubject = async (req, res) => {
  const { idSubject, idGame } = req.params; 

  try {
    const [result] = await db.query(
      "DELETE FROM content WHERE IDSubject = ? AND IDGame = ?",
      [idSubject, idGame]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Relation not found" });
    }

    res.json({ message: "Game unlinked from subject successfully" });
  } catch (error) {
    console.error("Error unlinking game:", error);
    res.status(500).json({ message: "Error unlinking game" });
  }
};

export const linkGameToSubject = async (req, res) => {
  const { idSubject, idGame } = req.params;

  if (!idSubject || !idGame) {
    return res.status(400).json({ message: "Subject or game IDs are missing" });
  }

  try {
    const [existing] = await db.query(
      "SELECT * FROM content WHERE IDSubject = ? AND IDGame = ?",
      [idSubject, idGame]
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: "This game is already linked to the subject" });
    }

    await db.query(
      "INSERT INTO content (IDSubject, IDGame) VALUES (?, ?)",
      [idSubject, idGame]
    );

    res.status(201).json({ message: "Game linked correctly" });
  } catch (error) {
    res.status(500).json({ message: "Internal error linking the game" });
  }
};

// Toggle Teacher's Open state (Open local)
export const updateGameLocalOpenState = async (req, res) => {
  const { idSubject, idGame } = req.params;
  const { Open } = req.body;

  try {
    await db.query(
      "UPDATE content SET Open = ? WHERE IDSubject = ? AND IDGame = ?",
      [Open ? 1 : 0, idSubject, idGame]
    );
    res.json({ message: "Teacher open state updated successfully" });
  } catch (error) {
    console.error("Error updating content open state:", error);
    res.status(500).json({ message: "Error updating content open state" });
  }
};

// Toggle Teacher's Visible state (Visible local)
export const updateGameLocalVisibleState = async (req, res) => {
  const { idSubject, idGame } = req.params;
  const { Visible } = req.body;

  try {
    await db.query(
      "UPDATE content SET Visible = ? WHERE IDSubject = ? AND IDGame = ?",
      [Visible ? 1 : 0, idSubject, idGame]
    );
    res.json({ message: "Teacher visible state updated successfully" });
  } catch (error) {
    console.error("Error updating content visible state:", error);
    res.status(500).json({ message: "Error updating content visible state" });
  }
};