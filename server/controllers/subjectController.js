import db from "../config/db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función de ayuda para guardar imágenes localmente
const saveImage = (file) => {
  const imagesDir = path.join(__dirname, "..", "public", "images");
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  // Limpiamos el nombre original para evitar problemas con espacios
  const imageName = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
  const imagePath = path.join(imagesDir, imageName);
  fs.writeFileSync(imagePath, file.buffer);
  return `/images/${imageName}`;
};

// Get all subjects
export const getSubjects = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM subjects ORDER BY Posicion ASC");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ message: "Error fetching subjects" });
  }
};

export const getSubjectsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const query = `
      SELECT DISTINCT s.*
      FROM subjects s
      JOIN subjectGroups sg ON s.IDSubject = sg.IDSubject
      JOIN assignments a ON sg.IDGroup = a.IDGroup
      WHERE a.IDUser = ? AND s.Visible = 1
      ORDER BY s.Posicion ASC;
    `;
    const [rows] = await db.query(query, [userId]);
    res.json(rows);
  } catch (error) {
    console.error("Error obtaining user's subjects:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Obtiene las asignaturas de un profesor (ignora si están ocultas o cerradas)
export const getSubjectsByTeacher = async (req, res) => {
  const { userId } = req.params;
  try {
    const query = `
      SELECT DISTINCT s.*
      FROM subjects s
      JOIN subjectGroups sg ON s.IDSubject = sg.IDSubject
      JOIN assignments a ON sg.IDGroup = a.IDGroup
      WHERE a.IDUser = ? 
      ORDER BY s.Posicion ASC;
    `;
    const [rows] = await db.query(query, [userId]);
    res.json(rows);
  } catch (error) {
    console.error("Error obtaining teacher's subjects:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Creates a new subject (Y su grupo de profesores por defecto)
export const createSubject = async (req, res) => {
  const { Name, UrlImgMundo, UrlImgDentro } = req.body;

  const imageFile = req.files && req.files['imageFile'] ? req.files['imageFile'][0] : null;
  const bgImageFile = req.files && req.files['bgImageFile'] ? req.files['bgImageFile'][0] : null;

  if (!Name) {
    return res.status(400).json({ message: "Missing required field: Name" });
  }

  // CORRECCIÓN: Usar "" en lugar de null para evitar el crash de MySQL
  let finalImgMundo = UrlImgMundo || "";
  let finalImgDentro = UrlImgDentro || "";

  if (imageFile) finalImgMundo = saveImage(imageFile);
  if (bgImageFile) finalImgDentro = saveImage(bgImageFile);

  try {
    const [result] = await db.query(
      "INSERT INTO subjects (Name, UrlImgMundo, UrlImgDentro, Posicion, Abierto, Visible) VALUES (?, ?, ?, ?, ?, ?)",
      [Name, finalImgMundo, finalImgDentro, 0, 0, 0] 
    );
    
    const newSubjectId = result.insertId;

    await db.query(
      "INSERT INTO subjectGroups (Name, IDSubject, IsTeacherGroup) VALUES (?, ?, 1)",
      ['Profesores', newSubjectId]
    );

    res.status(201).json({ message: "Subject and Teacher Group created successfully", id: newSubjectId });
  } catch (error) {
    console.error("Error creating subject:", error);
    res.status(500).json({ message: "Error creating subject" });
  }
};

// Update subject data
export const updateSubject = async (req, res) => {
  const { id } = req.params;
  const { Name, UrlImgMundo, UrlImgDentro } = req.body;

  const imageFile = req.files && req.files['imageFile'] ? req.files['imageFile'][0] : null;
  const bgImageFile = req.files && req.files['bgImageFile'] ? req.files['bgImageFile'][0] : null;

  if (!Name) {
    return res.status(400).json({ message: "Missing required field: Name" });
  }

  // CORRECCIÓN: Usar "" en lugar de null
  let finalImgMundo = UrlImgMundo || "";
  let finalImgDentro = UrlImgDentro || "";

  if (imageFile) finalImgMundo = saveImage(imageFile);
  if (bgImageFile) finalImgDentro = saveImage(bgImageFile);

  try {
    await db.query(
      "UPDATE subjects SET Name = ?, UrlImgMundo = ?, UrlImgDentro = ? WHERE IDSubject = ?",
      [Name, finalImgMundo, finalImgDentro, id]
    );
    res.json({ message: "Subject updated successfully" });
  } catch (error) {
    console.error("Error updating subject:", error);
    res.status(500).json({ message: "Error updating subject" });
  }
};

// Toggle open/closed subject state
export const updateSubjectOpenState = async (req, res) => {
  const { id } = req.params;
  const { Abierto } = req.body;

  try {
    await db.query("UPDATE subjects SET Abierto = ? WHERE IDSubject = ?", [
      Abierto ? 1 : 0,
      id,
    ]);
    res.json({ message: "Subject open state updated successfully" });
  } catch (error) {
    console.error("Error updating subject open state:", error);
    res.status(500).json({ message: "Error updating subject open state" });
  }
};

// Toggle visible/hidden subject state
export const updateSubjectVisibleState = async (req, res) => {
  const { id } = req.params;
  const { Visible } = req.body;

  try {
    await db.query("UPDATE subjects SET Visible = ? WHERE IDSubject = ?", [
      Visible ? 1 : 0,
      id,
    ]);
    res.json({ message: "Subject Visible state updated successfully" });
  } catch (error) {
    console.error("Error updating subject Visible state:", error);
    res.status(500).json({ message: "Error updating subject Visible state" });
  }
};

// Delete subject
export const deleteSubject = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM subjects WHERE IDSubject = ?", [id]);
    res.json({ message: "Subject deleted successfully" });
  } catch (error) {
    console.error("Error deleting subject:", error);
    res.status(500).json({ message: "Error deleting subject" });
  }
};

// Importar usuarios (Se mantiene tu lógica intacta)
export const importUsersToSubject = async (req, res) => {
  const subjectId = req.params.id;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded. Please send a valid CSV file." });
  }

  // Comprobar que la asignatura existe por seguridad
  const [[subjectExists]] = await db.query("SELECT IDSubject FROM subjects WHERE IDSubject = ?", [subjectId]);
  if (!subjectExists) {
    return res.status(404).json({ error: "Subject not found." });
  }

  const fileContent = req.file.buffer.toString("utf-8");
  const lines = fileContent.split(/\r?\n/);

  // Nuevo formato de reporte adaptado a los nuevos requisitos
  const report = {
    totalProcessed: 0,
    users: { created: 0, updated: 0, errors: 0 },
    assignments: { created: 0, updated: 0, errors: 0 },
    errorDetails: [],
    updatedDetails: []
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const columns = line.split(/[,;]/).map(col => col.trim());
    const [userName, password, realName, labGroup] = columns;

    // Ignorar la primera línea si son las cabeceras del CSV
    if (i === 0 && userName.toLowerCase() === 'username') continue;

    try {
      // 1. Validaciones estrictas
      if (!userName || !password || !labGroup) {
        throw new Error("Missing required fields. UserName, Password and LabGroup. are required");
      }

      // 2. Gestión del Usuario (UPSERT)
      let userId;
      const [[existingUser]] = await db.query("SELECT IDUser FROM users WHERE Name = ?", [userName]);
      
      if (existingUser) {
        // Actualizamos contraseña, nombre real y FORZAMOS el rol a 'P'
        userId = existingUser.IDUser;
        await db.query(
          "UPDATE users SET Password = ?, UserType = 'P', RealName = ? WHERE IDUser = ?", 
          [password, realName || null, userId]
        );
        report.users.updated++;
        report.updatedDetails.push(`Row ${i + 1} (${userName}): Password/Data updated and assigned to '${labGroup}'.`);
      } else {
        // Creamos usuario nuevo con rol 'P'
        const [result] = await db.query(
          "INSERT INTO users (Name, Password, UserType, RealName) VALUES (?, ?, 'P', ?)", 
          [userName, password, realName || null]
        );
        userId = result.insertId;
        report.users.created++;
      }

      // 3. Gestión del Grupo (UPSERT)
      let groupId;
      const [[existingGroup]] = await db.query(
        "SELECT IDGroup FROM subjectGroups WHERE Name = ? AND IDSubject = ?", 
        [labGroup, subjectId]
      );

      if (existingGroup) {
        groupId = existingGroup.IDGroup;
      } else {
        const [groupResult] = await db.query(
          "INSERT INTO subjectGroups (Name, IDSubject) VALUES (?, ?)", 
          [labGroup, subjectId]
        );
        groupId = groupResult.insertId;
      }

      // 4. AUTO-MIGRACIÓN (Asignación)
      // Primero, borramos cualquier asignación previa de ESTE usuario en CUALQUIER grupo de ESTA asignatura
      await db.query(`
        DELETE a FROM assignments a
        JOIN subjectGroups sg ON a.IDGroup = sg.IDGroup
        WHERE a.IDUser = ? AND sg.IDSubject = ?
      `, [userId, subjectId]);

      // Segundo, insertamos la nueva asignación
      await db.query(
        "INSERT INTO assignments (IDUser, IDGroup) VALUES (?, ?)",
        [userId, groupId]
      );
      
      report.assignments.created++;
      report.totalProcessed++;

    } catch (err) {
      report.users.errors++;
      report.errorDetails.push(`Fila ${i + 1} (${userName || 'Desconocido'}): ${err.message}`);
      report.totalProcessed++;
    }
  }

  res.status(200).json(report);
};