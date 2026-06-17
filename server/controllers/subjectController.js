import db from "../config/db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { STATIC_ROUTES } from '../config/constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Get all subjects
export const getSubjects = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM subjects ORDER BY Position ASC");
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
      ORDER BY s.Position ASC;
    `;
    const [rows] = await db.query(query, [userId]);
    res.json(rows);
  } catch (error) {
    console.error("Error obtaining user's subjects:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Retrieves a professor's subjects (ignores if they are hidden or closed)
export const getSubjectsByTeacher = async (req, res) => {
  const { userId } = req.params;
  try {
    const query = `
      SELECT DISTINCT s.*
      FROM subjects s
      JOIN subjectGroups sg ON s.IDSubject = sg.IDSubject
      JOIN assignments a ON sg.IDGroup = a.IDGroup
      WHERE a.IDUser = ? 
      ORDER BY s.Position ASC;
    `;
    const [rows] = await db.query(query, [userId]);
    res.json(rows);
  } catch (error) {
    console.error("Error obtaining teacher's subjects:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Creates a new subject (and its default group of teachers)
export const createSubject = async (req, res) => {
  const { Name, UrlImgSubject, UrlImgInside } = req.body;

  const imageFile = req.files && req.files['imageFile'] ? req.files['imageFile'][0] : null;
  const bgImageFile = req.files && req.files['bgImageFile'] ? req.files['bgImageFile'][0] : null;

  if (!Name) {
    return res.status(400).json({ message: "Missing required field: Name" });
  }

  let finalImgMundo = UrlImgSubject || "";
  let finalImgDentro = UrlImgInside || "";

  if (imageFile) finalImgMundo = saveImage(imageFile);
  if (bgImageFile) finalImgDentro = saveImage(bgImageFile);

  try {
    const [result] = await db.query(
      "INSERT INTO subjects (Name, UrlImgSubject, UrlImgInside, Position, Open, Visible) VALUES (?, ?, ?, ?, ?, ?)",
      [Name, finalImgMundo, finalImgDentro, 0, 0, 0] 
    );
    
    const newSubjectId = result.insertId;

    await db.query(
      "INSERT INTO subjectGroups (Name, IDSubject, IsTeacherGroup) VALUES (?, ?, 1)",
      ['Teachers', newSubjectId]
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
  const { Name, UrlImgSubject, UrlImgInside } = req.body;

  const imageFile = req.files && req.files['imageFile'] ? req.files['imageFile'][0] : null;
  const bgImageFile = req.files && req.files['bgImageFile'] ? req.files['bgImageFile'][0] : null;

  if (!Name) {
    return res.status(400).json({ message: "Missing required field: Name" });
  }

  let finalImgMundo = UrlImgSubject || "";
  let finalImgDentro = UrlImgInside || "";

  if (imageFile) finalImgMundo = saveImage(imageFile);
  if (bgImageFile) finalImgDentro = saveImage(bgImageFile);

  try {
    await db.query(
      "UPDATE subjects SET Name = ?, UrlImgSubject = ?, UrlImgInside = ? WHERE IDSubject = ?",
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
  const { Open } = req.body;

  try {
    await db.query("UPDATE subjects SET Open = ? WHERE IDSubject = ?", [
      Open ? 1 : 0,
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


export const importUsersToSubject = async (req, res) => {
  const subjectId = req.params.id;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded. Please send a valid CSV file." });
  }

// Check that the subject exists for security purposes
  const [[subjectExists]] = await db.query("SELECT IDSubject FROM subjects WHERE IDSubject = ?", [subjectId]);
  if (!subjectExists) {
    return res.status(404).json({ error: "Subject not found." });
  }

  const fileContent = req.file.buffer.toString("utf-8");
  const lines = fileContent.split(/\r?\n/);

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

    // Ignore the first line if they are the CSV headers
    if (i === 0 && userName.toLowerCase() === 'username') continue;

    try {
      if (!userName || !password || !labGroup) {
        throw new Error("Missing required fields. UserName, Password and LabGroup are required.");
      }

      // 1. Determine the group context and the expected role
      const isTeacherGroup = labGroup.trim() === 'Teachers';
      const expectedRole = isTeacherGroup ? 'T' : 'P';

      // 2. User Management (UPSERT) with Business Rules validation
      let userId;
      const [[existingUser]] = await db.query("SELECT IDUser, UserType FROM users WHERE Name = ?", [userName]);
      
      if (existingUser) {
        // RULE A: The group is Teachers, but the user is not 'T'
        if (isTeacherGroup && existingUser.UserType !== 'T') {
          throw new Error(`Access denied: User is type '${existingUser.UserType}' and cannot be added to the Teachers group.`);
        }
        // RULE B: The group is NOT Teachers, but the user is 'T'
        if (!isTeacherGroup && existingUser.UserType === 'T') {
          throw new Error(`Access denied: User is a TEACHER and cannot be added to a student group.`);
        }

        userId = existingUser.IDUser;
        // We update password and real name, but respect their current UserType
        await db.query(
          "UPDATE users SET Password = ?, RealName = ? WHERE IDUser = ?", 
          [password, realName || null, userId]
        );
        report.users.updated++;
        report.updatedDetails.push(`Row ${i + 1} (${userName}): Password/Data updated and assigned to '${labGroup}'.`);
      } else {
        // We create a new user by dynamically assigning the expected role ('T' or 'P')
        const [result] = await db.query(
          "INSERT INTO users (Name, Password, UserType, RealName) VALUES (?, ?, ?, ?)", 
          [userName, password, expectedRole, realName || null]
        );
        userId = result.insertId;
        report.users.created++;
      }

      // 3. Group Management (UPSERT)
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

      // 4. SELF-MIGRATION (Assignment)
      // First, we delete any previous assignment of THIS user in ANY group of THIS subject
      await db.query(`
        DELETE a FROM assignments a
        JOIN subjectGroups sg ON a.IDGroup = sg.IDGroup
        WHERE a.IDUser = ? AND sg.IDSubject = ?
      `, [userId, subjectId]);

      // Second, we insert the new assignment
      await db.query(
        "INSERT INTO assignments (IDUser, IDGroup) VALUES (?, ?)",
        [userId, groupId]
      );
      
      report.assignments.created++;
      report.totalProcessed++;

    } catch (err) {
      report.users.errors++;
      report.errorDetails.push(`Row ${i + 1} (${userName || 'Unknown'}): ${err.message}`);
      report.totalProcessed++;
    }
  }

  res.status(200).json(report);
};

// Auxiliar function for saving images locally
const saveImage = (file) => {
  const imagesDir = path.join(__dirname, "..", "public", "images");
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  // We clean up the original name to avoid problems
  const imageName = `${Date.now()}-${file.originalname.replace(/\\s+/g, '_')}`;
  const imagePath = path.join(imagesDir, imageName);
  fs.writeFileSync(imagePath, file.buffer);
  
  return `${STATIC_ROUTES.IMAGES}/${imageName}`;
};