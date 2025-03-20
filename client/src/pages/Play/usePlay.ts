import { useEffect, useState } from 'react';
import { Game, fetchGameById } from '../../api/game';

const usePlay = (gameId: number) => {
  const [game, setGame] = useState<Game>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGame = async (gameId: number) => {
      const data = await fetchGameById(gameId).catch(() => {
        setError('Failed to load game');
      });
      if (data) setGame(data);
    };

    loadGame(gameId);
  }, []);

  return { game, error };
};

export default usePlay;
