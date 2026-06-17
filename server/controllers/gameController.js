import db from "../config/db.js";
import AdmZip from "adm-zip";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { STATIC_ROUTES } from '../config/constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all games
export const getGames = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM games ORDER BY Name ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ message: "Error fetching games" });
  }
};

export const getGameById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM games WHERE IDGame = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching game:", error);
    res.status(500).json({ message: "Error fetching game" });
  }
};

// Get all games by the Subject ID (Visible settings taken into account)
export const getGamesBySubject = async (req, res) => {
  const { idSubject } = req.params;

  try {
    const query = `
      SELECT 
        g.*, 
        c.IDSubject, 
        g.Open AS AdminOpen, 
        g.Visible AS AdminVisible,
        c.Open AS TeacherOpen, 
        c.Visible AS TeacherVisible,
        (g.Open AND c.Open) AS Open, 
        (g.Visible AND c.Visible) AS Visible
      FROM games g
      JOIN content c ON g.IDGame = c.IDGame
      WHERE c.IDSubject = ?
    `;
    const [rows] = await db.query(query, [idSubject]);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching games by subject:", error);
    res.status(500).json({ message: "Error fetching games by subject" });
  }
};


// Creates a new game and extracts the uploaded .zip file
export const createGame = async (req, res) => {
  const { name, img } = req.body; 
  
  // Extract the files from req.files
  const gameFiles = req.files && req.files['gameFile'] ? req.files['gameFile'] : null;
  const imageFiles = req.files && req.files['imageFile'] ? req.files['imageFile'] : null;

  const file = gameFiles ? gameFiles[0] : null; // .zip
  const imageFile = imageFiles ? imageFiles[0] : null; // Image (optional)

  if (!name) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (!file) {
    return res.status(400).json({ message: "Game .zip file is required" });
  }

  let finalImgUrl = img || ""; // By default, we use the text URL if it is sent

  // If the user has uploaded a real image file
  if (imageFile) {
    const imagesDir = path.join(__dirname, "..", "public", "images");
    
    // Make sure the folder exists
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    // We give it a unique name using the current date to avoid conflicts
    const imageName = `${Date.now()}-${imageFile.originalname.replace(/\\s+/g, '_')}`;
    const imagePath = path.join(imagesDir, imageName);

    // We write the physical file to the server's hard drive
    fs.writeFileSync(imagePath, imageFile.buffer);

    // We update the URL that will be saved in the database
    finalImgUrl = `${STATIC_ROUTES.IMAGES}/${imageName}`;
  }
  // ---------------------------------

  try {
    // We insert into the database using finalImgUrl
    const [result] = await db.query(
      "INSERT INTO games (Name, UrlImage, Open, Visible) VALUES (?, ?, ?, ?)",
      [name, finalImgUrl, 0, 0, 0] 
    );
    
    const newGameId = result.insertId;

    // Unzip the .zip file
    const extractPath = path.join(__dirname, "..", "public", "games", String(newGameId));

    if (!fs.existsSync(extractPath)) {
      fs.mkdirSync(extractPath, { recursive: true });
    }

    const zip = new AdmZip(file.buffer);
    zip.extractAllTo(extractPath, true);
    
    // --- FOLDER AUTO-CORRECT LOGIC ---
    const indexPath = path.join(extractPath, "index.html");

    if (!fs.existsSync(indexPath)) {
      const items = fs.readdirSync(extractPath);
      if (items.length === 1) {
        const subfolderPath = path.join(extractPath, items[0]);
        if (fs.statSync(subfolderPath).isDirectory()) {
          const subItems = fs.readdirSync(subfolderPath);
          for (const item of subItems) {
            fs.renameSync(
              path.join(subfolderPath, item),
              path.join(extractPath, item)
            );
          }
          fs.rmdirSync(subfolderPath);
        }
      }
    }
    // ---------------------------------------------------

    // --- SCRIPT SELF-INJECTION LOGIC ---
    const finalIndexPath = path.join(extractPath, "index.html");

    if (fs.existsSync(finalIndexPath)) {
      let htmlContent = fs.readFileSync(finalIndexPath, 'utf8');
      if (!htmlContent.includes('IntegrationApi.js')) {
        const scriptTag = `\n  <script src="${STATIC_ROUTES.COMMUNICATION_SCRIPT}/IntegrationApi.js"></script>\n`;
        if (htmlContent.includes('</head>')) {
          htmlContent = htmlContent.replace('</head>', `${scriptTag}</head>`);
        } else if (htmlContent.includes('<body>')) {
          htmlContent = htmlContent.replace('<body>', `<body>${scriptTag}`);
        }
        fs.writeFileSync(finalIndexPath, htmlContent, 'utf8');
      }
    } else {
      console.log(`Warning: Index.html file not found to inject the script into the game ${newGameId}`);
    }
    // ---------------------------------------------------

    console.log(`Game ${newGameId} ready, auto-corrected and injected into ${extractPath}`);

    res.status(201).json({ 
      message: "Game created and prepared successfully", 
      id: newGameId 
    });

  } catch (error) {
    console.error("Error creating game:", error);
    res.status(500).json({ message: "Error creating game or extracting file" });
  }
};

// Update game
export const updateGame = async (req, res) => {
  const { id } = req.params;
  const { name, img } = req.body;

  // We extract files if needed
  const gameFiles = req.files && req.files['gameFile'] ? req.files['gameFile'] : null;
  const imageFiles = req.files && req.files['imageFile'] ? req.files['imageFile'] : null;

  const file = gameFiles ? gameFiles[0] : null; //.zip (optional)
  const imageFile = imageFiles ? imageFiles[0] : null; // image (optional)

  if (!name) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  let finalImgUrl = img || "";

  // NEW IMAGE MANAGEMENT
  if (imageFile) {
    const imagesDir = path.join(__dirname, "..", "public", "images");
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }
    const imageName = `${Date.now()}-${imageFile.originalname.replace(/\s+/g, '_')}`;
    const imagePath = path.join(imagesDir, imageName);
    fs.writeFileSync(imagePath, imageFile.buffer);
    finalImgUrl = `${STATIC_ROUTES.IMAGES}/${imageName}`;
  }

  try {
    // DB UPDATE
    await db.query(
      "UPDATE games SET Name = ?, UrlImage = ? WHERE IDGame = ?",
      [name, finalImgUrl, id]
    );

    // 3. MANAGING THE NEW .ZIP FILE (ONLY IF UPLOADED)
    if (file) {
      const extractPath = path.join(__dirname, "..", "public", "games", String(id));

      // If the folder already exists, we empty it completely first to avoid ghost files
      if (fs.existsSync(extractPath)) {
        fs.rmSync(extractPath, { recursive: true, force: true });
      }
      fs.mkdirSync(extractPath, { recursive: true });

      const zip = new AdmZip(file.buffer);
      zip.extractAllTo(extractPath, true);

      // --- SELF-CORRECTING LOGIC ---
      const indexPath = path.join(extractPath, "index.html");
      if (!fs.existsSync(indexPath)) {
        const items = fs.readdirSync(extractPath);
        if (items.length === 1) {
          const subfolderPath = path.join(extractPath, items[0]);
          if (fs.statSync(subfolderPath).isDirectory()) {
            const subItems = fs.readdirSync(subfolderPath);
            for (const item of subItems) {
              fs.renameSync(
                path.join(subfolderPath, item),
                path.join(extractPath, item)
              );
            }
            fs.rmdirSync(subfolderPath);
          }
        }
      }

      // --- SCRIPT SELF-INJECTION ---
      const finalIndexPath = path.join(extractPath, "index.html");
      if (fs.existsSync(finalIndexPath)) {
        let htmlContent = fs.readFileSync(finalIndexPath, 'utf8');
        if (!htmlContent.includes('IntegrationApi.js')) {
          const scriptTag = `\n  <script src="/ApiPlataformComunication/IntegrationApi.js"></script>\n`;
          if (htmlContent.includes('</head>')) {
            htmlContent = htmlContent.replace('</head>', `${scriptTag}</head>`);
          } else if (htmlContent.includes('<body>')) {
            htmlContent = htmlContent.replace('<body>', `<body>${scriptTag}`);
          }
          fs.writeFileSync(finalIndexPath, htmlContent, 'utf8');
        }
      }
    }

    res.json({ message: "Game updated successfully" });
  } catch (error) {
    console.error("Error updating game:", error);
    res.status(500).json({ message: "Error updating game" });
  }
};

// Toggle open/closed game state
export const updateGameOpenState = async (req, res) => {
  const { id } = req.params;
  const { Open } = req.body;

  try {
    await db.query("UPDATE games SET Open = ? WHERE IDGame = ?", [
      Open ? 1 : 0,
      id,
    ]);
    res.json({ message: "Game open state updated successfully" });
  } catch (error) {
    console.error("Error updating Game open state:", error);
    res.status(500).json({ message: "Error updating Game open state" });
  }
};

// Toggle visible/hidden game state
export const updateGameVisibleState = async (req, res) => {
  const { id } = req.params;
  const { Visible } = req.body;

  try {
    await db.query("UPDATE games SET Visible = ? WHERE IDGame = ?", [
      Visible ? 1 : 0,
      id,
    ]);
    res.json({ message: "Game Visible state updated successfully" });
  } catch (error) {
    console.error("Error updating Game Visible state:", error);
    res.status(500).json({ message: "Error updating Game Visible state" });
  }
};

// Delete game
export const deleteGame = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM games WHERE IDGame = ?", [id]);
    res.json({ message: "Game deleted successfully" });
  } catch (error) {
    console.error("Error deleting game:", error);
    res.status(500).json({ message: "Error deleting game" });
  }
};


// added for showing the list of games available for adding to a subject
export const getAvailableGamesForSubject = async (req, res) => {
  const { idSubject } = req.params;
  try {
    const [rows] = await db.query(
      `SELECT * FROM games 
       WHERE IDGame NOT IN (
         SELECT IDGame FROM content WHERE IDSubject = ?
       ) ORDER BY Name ASC`,
      [idSubject]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving available games" });
  }
};