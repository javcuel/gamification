import { useEffect, useState } from "react";
import { fetchGames } from "../adapters/api/gameService";
import { Game } from "../types/game";

/**
 * Custom Hook: useFetchGames
 * @description
 * Handles the fetching of game data from an external service or API.
 * Manages the loading state, the list of games, and any errors that may occur during the fetch operation.
 *
 * @returns {Object} An object containing:
 * - `games` {Game[]} - The list of games fetched.
 * - `error` {string | null} - An error message if the fetch operation fails.
 *
 * @example
 * // Usage in a React component
 * import useFetchGames from "../hooks/useFetchGames";
 *
 * const GameComponent = () => {
 *   const { games, error } = useFetchGames();
 *
 *   if (error) {
 *     return <div>Error loading games: {error}</div>;
 *   }
 *
 *   return (
 *     <ul>
 *       {games.map((game) => (
 *         <li key={game.gameId}>{game.gameName}</li>
 *       ))}
 *     </ul>
 *   );
 * };
 *
 * @see fetchGames - Fetches game data from the API.
 * @see Game - Type definition for game objects.
 */
const useFetchGames = () => {
  // State to store the fetched games
  const [games, setGames] = useState<Game[]>([]);

  // State to store an error message if the fetch fails
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches game data and updates the state.
   * @async
   * @function loadGames
   * @throws Will set an error state if fetching games fails.
   */
  useEffect(() => {
    const loadGames = async () => {
      try {
        const gameData = await fetchGames();
        setGames(gameData);
      } catch (error) {
        console.error("Error fetching games:", error);
        setError("Failed to load games");
      }
    };

    loadGames();
  }, []); // Empty dependency array ensures this runs only once

  return { games, error };
};

export default useFetchGames;
