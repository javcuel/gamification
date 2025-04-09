import db from "../config/db.js";

export const getTheme = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT primary_color, secondary_color, text_color, points_icon, completed_subjects_icon FROM theme ORDER BY created_at DESC LIMIT 1"
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "No hay temas guardados." });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener el tema:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const updateTheme = async (req, res) => {
  try {
    const { primary, secondary, text, pointsIcon, completedSubjectsIcon } =
      req.body;

    if (!primary || !secondary || !text) {
      return res
        .status(400)
        .json({ message: "Todos los colores son obligatorios" });
    }

    await db.execute(
      "INSERT INTO theme (primary_color, secondary_color, text_color, points_icon, completed_subjects_icon) VALUES (?, ?, ?, ?, ?)",
      [primary, secondary, text, pointsIcon, completedSubjectsIcon]
    );

    res.json({ message: "Tema actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el tema:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
