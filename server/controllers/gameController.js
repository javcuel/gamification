import db from "../config/db.js";

import AdmZip from "adm-zip";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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

// Obtener un juego por su ID
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

// Get all games by the Subject ID
export const getGamesBySubject = async (req, res) => {
  const { subjectId } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT m.* FROM games m
       JOIN content c ON m.IDGame = c.IDGame
       WHERE c.IDSubject = ? 
       ORDER BY m.Name ASC`,
      [subjectId]
    );
    
    res.json(rows);
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ message: "Error fetching games" });
  }
};

// Creates a new game and extracts the uploaded .zip file
export const createGame = async (req, res) => {
  // Los datos de texto ahora vienen en req.body (porque usamos FormData en React)
  const { name, img } = req.body; 
  // El archivo viene en req.file
  const file = req.file;

  if (!name || !img ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Si decides hacer el archivo obligatorio para crear el juego, descomenta esto:
  // if (!file) {
  //   return res.status(400).json({ message: "Game .zip file is required" });
  // }

  try {
    // 1. Insertamos en la Base de Datos
    const [result] = await db.query(
      "INSERT INTO games (Name, UrlImagen, Abierto, Visible, Disponible) VALUES (?, ?, ?, ?, ?)",
      [name, img, 0, 0, 0] 
    );
    
    const newGameId = result.insertId;

    // 2. Si se subió un archivo, procedemos a descomprimirlo
    if (file) {
      const extractPath = path.join(__dirname, "..", "public", "games", String(newGameId));

      if (!fs.existsSync(extractPath)) {
        fs.mkdirSync(extractPath, { recursive: true });
      }

      const zip = new AdmZip(file.buffer);
      zip.extractAllTo(extractPath, true);
      
      // --- LÓGICA DE AUTO-CORRECCIÓN DE CARPETAS ---
      const indexPath = path.join(extractPath, "index.html");

      // Si index.html NO está en la raíz, comprobamos si hay una carpeta contenedora
      if (!fs.existsSync(indexPath)) {
        const items = fs.readdirSync(extractPath);

        // Si solo hay exactamente 1 elemento y resulta ser una carpeta (ej. "MiJuego")
        if (items.length === 1) {
          const subfolderPath = path.join(extractPath, items[0]);

          if (fs.statSync(subfolderPath).isDirectory()) {
            console.log(`Auto-corrigiendo carpeta contenedora: ${items[0]}`);
            
            // Movemos todos los archivos de la subcarpeta hacia arriba (la raíz de extractPath)
            const subItems = fs.readdirSync(subfolderPath);
            for (const item of subItems) {
              fs.renameSync(
                path.join(subfolderPath, item),
                path.join(extractPath, item)
              );
            }
            // Borramos la subcarpeta que ahora ha quedado vacía
            fs.rmdirSync(subfolderPath);
          }
        }
      }
      // ---------------------------------------------------

      // --- NUEVA LÓGICA DE AUTO-INYECCIÓN DEL SCRIPT ---
      // Volvemos a definir la ruta por si fue corregida en el paso anterior
      const finalIndexPath = path.join(extractPath, "index.html");

      if (fs.existsSync(finalIndexPath)) {
        let htmlContent = fs.readFileSync(finalIndexPath, 'utf8');

        // Verificamos si el script ya está inyectado para no duplicarlo
        if (!htmlContent.includes('IntegrationApi.js')) {
          console.log(`Inyectando IntegrationApi.js en el juego ${newGameId}...`);
          
          // El script que inyectamos apunta a la ruta del backend configurada en server.js
          const scriptTag = `\n  <script src="/ApiComunicacionPlataforma/IntegrationApi.js"></script>\n`;
          
          // Lo insertamos justo antes del cierre de la etiqueta </head> o al inicio del <body>
          if (htmlContent.includes('</head>')) {
            htmlContent = htmlContent.replace('</head>', `${scriptTag}</head>`);
          } else if (htmlContent.includes('<body>')) {
            htmlContent = htmlContent.replace('<body>', `<body>${scriptTag}`);
          }

          fs.writeFileSync(finalIndexPath, htmlContent, 'utf8');
        }
      } else {
        console.log(`Advertencia: No se encontró index.html para inyectar el script en el juego ${newGameId}`);
      }
      // ---------------------------------------------------

      console.log(`Juego ${newGameId} listo, auto-corregido e inyectado en ${extractPath}`);
    }

    res.status(201).json({ 
      message: "Game created and prepared successfully", 
      id: newGameId 
    });

  } catch (error) {
    console.error("Error creating game:", error);
    res.status(500).json({ message: "Error creating game or extracting file" });
  }
};

// Update game data
export const updateGame = async (req, res) => {
  const { id } = req.params;
  // const { IDSubject, Name, UrlImagen } = req.body; out
  const { Name, UrlImagen } = req.body; 
  try {
    await db.query(
      /*"UPDATE games SET Name = ?, IDSubject = ?, UrlImagen = ? WHERE IDGame = ?",
      [Name, IDSubject, UrlImagen, id]
    ); out */
    "UPDATE games SET Name = ?, UrlImagen = ? WHERE IDGame = ?",
      [Name , UrlImagen, id]
    );
    res.json({ message: "Game updated successfully" });
  } catch (error) {
    console.error("Error updating game:", error);
    res.status(500).json({ message: "Error updating game" });
  }
};

// Toggle open/closed game state
export const updateGameOpenState = async (req, res) => {
  const { id } = req.params;
  const { Abierto } = req.body;

  try {
    await db.query("UPDATE games SET Abierto = ? WHERE IDGame = ?", [
      Abierto ? 1 : 0,
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
  const { subjectId } = req.params;
  try {
    const [rows] = await db.query(
      `SELECT * FROM games 
       WHERE IDGame NOT IN (
         SELECT IDGame FROM content WHERE IDSubject = ?
       ) ORDER BY Name ASC`,
      [subjectId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener juegos disponibles" });
  }
};
