import { useEffect, useState } from 'react';
import { Game, GameApi } from '../../../api/game';

const useGame = (subjectId: number) => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await GameApi.getAll(subjectId);
        setGames(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    loadGames();
  }, [subjectId]);

  return { games, error };
};

export default useGame;
