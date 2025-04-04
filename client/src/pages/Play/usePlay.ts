import { useEffect, useState } from 'react';
import { Game, GameApi } from '../../api/game';

const usePlay = (gameId: number) => {
  const [game, setGame] = useState<Game>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGame = async (gameId: number) => {
      try {
        const data = await GameApi.getById(gameId);
        setGame(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    loadGame(gameId);
  }, [gameId]);

  return { game, error };
};

export default usePlay;
