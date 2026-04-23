import db from "../config/db.js";

export const processBulkUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded. Please send a valid CSV file." });
  }

  const fileContent = req.file.buffer.toString("utf-8");
  const lines = fileContent.split(/\r?\n/);

  const report = {
    totalProcessed: 0,
    users: { created: 0, ignored: 0, errors: 0 },
    subjects: { created: 0, ignored: 0, errors: 0 },
    assignments: { created: 0, ignored: 0, errors: 0 },
    gamesLinked: { created: 0, ignored: 0, errors: 0 },
    errorDetails: []
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const columns = line.split(";").map(col => col.trim());
    const action = columns[0].toUpperCase();

    try {
      if (action === "USER") {
        const [_, name, password, userType, realName] = columns;
        if (!name || !password || !userType) throw new Error("Missing mandatory fields for USER.");

        // 1. Buscamos explícitamente si existe
        const [[existingUser]] = await db.query("SELECT IDUser FROM users WHERE Name = ?", [name]);
        
        if (existingUser) {
          // 2a. Si existe, actualizamos y contamos como 'ignored/updated'
          await db.query(
            "UPDATE users SET Password = ?, UserType = ?, RealName = ? WHERE IDUser = ?", 
            [password, userType, realName || null, existingUser.IDUser]
          );
          report.users.ignored++;
        } else {
          // 2b. Si no existe, insertamos y contamos como 'created'
          await db.query(
            "INSERT INTO users (Name, Password, UserType, RealName) VALUES (?, ?, ?, ?)", 
            [name, password, userType, realName || null]
          );
          report.users.created++;
        }

      } else if (action === "SUBJECT") {
        const [_, name, imgMundo, imgDentro] = columns;
        if (!name || !imgMundo || !imgDentro) throw new Error("Missing mandatory fields for SUBJECT.");

        const [[existingSubject]] = await db.query("SELECT IDSubject FROM subjects WHERE Name = ?", [name]);
        
        if (existingSubject) {
          await db.query(
            "UPDATE subjects SET UrlImgMundo = ?, UrlImgDentro = ? WHERE IDSubject = ?", 
            [imgMundo, imgDentro, existingSubject.IDSubject]
          );
          report.subjects.ignored++;
        } else {
          await db.query(
            "INSERT INTO subjects (Name, UrlImgMundo, UrlImgDentro, Posicion, Abierto, Visible) VALUES (?, ?, ?, 0, 0, 1)", 
            [name, imgMundo, imgDentro]
          );
          report.subjects.created++;
        }

      } else if (action === "ASSIGN") {
        const [_, subjectName, groupName, userName] = columns;
        if (!subjectName || !groupName || !userName) throw new Error("Missing mandatory fields for ASSIGN.");

        const [[subject]] = await db.query("SELECT IDSubject FROM subjects WHERE Name = ?", [subjectName]);
        if (!subject) throw new Error(`Subject '${subjectName}' not found.`);

        const [[user]] = await db.query("SELECT IDUser FROM users WHERE Name = ?", [userName]);
        if (!user) throw new Error(`User '${userName}' not found.`);

        await db.query(
          `INSERT IGNORE INTO subjectGroups (Name, IDSubject) VALUES (?, ?)`,
          [groupName, subject.IDSubject]
        );
        const [[group]] = await db.query(
          "SELECT IDGroup FROM subjectGroups WHERE Name = ? AND IDSubject = ?", 
          [groupName, subject.IDSubject]
        );

        // Para INSERT IGNORE, affectedRows funciona con total precisión
        const [result] = await db.query(
          `INSERT IGNORE INTO assignments (IDUser, IDGroup) VALUES (?, ?)`,
          [user.IDUser, group.IDGroup]
        );

        if (result.affectedRows === 1) report.assignments.created++;
        else report.assignments.ignored++;

      } else if (action === "GAME_LINK") {
        const [_, subjectName, gameName] = columns;
        if (!subjectName || !gameName) throw new Error("Missing mandatory fields for GAME_LINK.");

        const [[subject]] = await db.query("SELECT IDSubject FROM subjects WHERE Name = ?", [subjectName]);
        if (!subject) throw new Error(`Subject '${subjectName}' not found.`);

        const [[game]] = await db.query("SELECT IDGame FROM games WHERE Name = ?", [gameName]);
        if (!game) throw new Error(`Game '${gameName}' not found.`);

        const [result] = await db.query(
          `INSERT IGNORE INTO content (IDSubject, IDGame) VALUES (?, ?)`,
          [subject.IDSubject, game.IDGame]
        );

        if (result.affectedRows === 1) report.gamesLinked.created++;
        else report.gamesLinked.ignored++;

      } else {
        throw new Error(`Unknown action: ${action}`);
      }

    } catch (err) {
      if (action === "USER") report.users.errors++;
      else if (action === "SUBJECT") report.subjects.errors++;
      else if (action === "ASSIGN") report.assignments.errors++;
      else if (action === "GAME_LINK") report.gamesLinked.errors++;
      
      report.errorDetails.push(`Row ${i + 1} (${action || 'UNKNOWN'}): ${err.message}`);
    }
    
    report.totalProcessed++;
  }

  res.status(200).json(report);
};