import { useState } from 'react';
import { Game } from '../../../entities/game';
import { fetchGamesByWorld } from '../adapters/api/worldGamesService';

/**
 * Custom Hook: useExpandableWorld
 * Handles expansion logic and fetching games for a world.
 * @param worldId - The ID of the world to fetch games for.
 * @returns State and functions for managing expansion and games.
 */
const useExpandWorld = (worldId: number) => {
  const [games, setGames] = useState<Game[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleExpand = async () => {
    setIsExpanded((prev) => !prev);

    if (!isExpanded && games.length === 0) {
      setLoading(true);
      setError(null);
      try {
        const fetchedGames = await fetchGamesByWorld(worldId);
        setGames(fetchedGames);
      } catch (err) {
        console.error(err);
        setError('Failed to load games');
      } finally {
        setLoading(false);
      }
    }
  };

  return { games, isExpanded, loading, error, toggleExpand };
};

export default useExpandWorld;
