import { useEffect, useState } from 'react';
import { Game } from '../../../entities/game';
import { fetchGames } from '../adapters/api/gameService';

const useFetchGames = (subjectId: number) => {
  // State to store the fetched games
  const [games, setGames] = useState<Game[]>([]);

  // State to store an error message if the fetch fails
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const gameData = await fetchGames(subjectId);
        setGames(gameData);
      } catch (error) {
        console.error('Error fetching games:', error);
        setError('Failed to load games');
      }
    };

    loadGames();
  }, [subjectId]); // Empty dependency array ensures this runs only once

  return { games, error };
};

export default useFetchGames;
