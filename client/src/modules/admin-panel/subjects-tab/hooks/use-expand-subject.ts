import { useState } from 'react';
import { Game } from '../../../shared/api/domain/game';
import { gameRepository } from '../../../shared/api/repository/game.repository';

const useExpandSubject = (subjectID: number) => {
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
        const data = await gameRepository.getAll(subjectID);
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
