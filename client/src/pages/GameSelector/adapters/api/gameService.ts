import { Game } from "../../types/game";

/**
 * Fetches the list of games available.
 *
 * **NOTE**: This is a placeholder function that currently returns a hardcoded list of games.
 * In the future, it should be replaced with an actual API call to fetch games from the database.
 *
 * @async
 * @function fetchGames
 * @returns {Promise<Game[]>} A promise that resolves to an array of games.
 * @example
 * // Example usage:
 * fetchGames()
 *   .then((games) => {
 *     console.log("Fetched games:", games);
 *   })
 *   .catch((error) => {
 *     console.error("Failed to fetch games:", error);
 *   });
 *
 * @see Game - The type definition for the game objects.
 */

// FUTURE IMPLEMENTATION: Replace with this version to fetch from the actual API.
/*
export const fetchGames = async (): Promise<Game[]> => {
  const response = await fetch("/api/games");
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  return response.json();
};
*/

export const fetchGames = async (): Promise<Game[]> => {
  // Simulates fetching games from a database by returning a hardcoded list.
  return [
    {
      gameId: 94,
      gameImg: "src/assets/images/imagesGames/apuntados.png",
      gameName: "Apuntados",
      gameDesc: "Creación, concatenación, extracción de nodos y reordenación.",
      gameFolder: "94",
    },
    {
      gameId: 109,
      gameImg: "src/assets/images/imagesGames/caidaDatos.png",
      gameName: "Caída de Datos",
      gameDesc: "Para aprender sobre tipos de datos.",
      gameFolder: "109",
    },
    {
      gameId: 110,
      gameImg: "src/assets/images/imagesGames/caidaDatos.png",
      gameName: "Caída de Datos",
      gameDesc: "Para aprender sobre tipos de datos.",
      gameFolder: "110",
    },
    {
      gameId: 130,
      gameImg: "src/assets/images/imagesGames/caidaDatos.png",
      gameName: "Caída de Datos",
      gameDesc: "Para aprender sobre tipos de datos.",
      gameFolder: "130",
    },

    // Add more games here as needed
  ];
};
