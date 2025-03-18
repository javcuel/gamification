import { useState } from 'react';
import { fetchGames, Game } from '../api/GameService';

const useExpandWorld = (subjectId: number) => {
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
        const fetchedGames = await fetchGames(subjectId);
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
