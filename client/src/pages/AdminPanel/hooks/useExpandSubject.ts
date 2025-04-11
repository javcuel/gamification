import { useState } from 'react';
import { Game, GameApi } from '../../../api/game';

const useExpandSubject = (subjectId: number) => {
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
        const data = await GameApi.getAll(subjectId);
        setGames(data);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    }
  };

  return { games, isExpanded, loading, error, toggleExpand };
};

export default useExpandSubject;
