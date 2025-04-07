import { useEffect, useState } from 'react';
import { Game } from '../../api/game';

const usePlay = (gameId: number) => {
  const [game, setGame] = useState<Game>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGame = async (gameId: number) => {
      try {
        /*  const data = await GameApi.getById(gameId); */
        const data = {
          id: 1,
          idSubject: 1,
          img: '',
          name: 'Juego',
          maxScore: 8000,
          isOpen: true,
          isVisible: true,
          position: 1,
          idUser: 2,
          isNew: true,
          uploaded: true,
        };
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
