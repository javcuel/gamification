import db from "../config/db.js";

// Get app theme
export const getTheme = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT primary_color, secondary_color, text_color, points_icon, completed_subjects_icon FROM theme ORDER BY created_at DESC LIMIT 1"
    );
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching theme: ", error);
    res.status(500).json({ message: "Error fetching theme" });
  }
};

// Creates a new theme
export const createTheme = async (req, res) => {
  const { primary, secondary, text, pointsIcon, completedSubjectsIcon } =
    req.body;

  if (
    !primary ||
    !secondary ||
    !text ||
    !pointsIcon ||
    !completedSubjectsIcon
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO theme (primary_color, secondary_color, text_color, points_icon, completed_subjects_icon) VALUES (?, ?, ?, ?, ?)",
      [primary, secondary, text, pointsIcon, completedSubjectsIcon]
    );
    res
      .status(201)
      .json({ message: "Theme created successfully", id: result.insertId });
  } catch (error) {
    console.error("Error creating theme:", error);
    res.status(500).json({ message: "Error creating theme" });
  }
};
