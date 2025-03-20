import { useEffect, useState } from 'react';
import { fetchGames, Game } from '../../../api/game';

const useGame = (subjectId: number) => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGames = async () => {
      const data = await fetchGames(subjectId).catch(() => {
        setError('Failed to load Games');
      });
      if (data) setGames(data);
    };

    loadGames();
  }, [subjectId]);

  return { games, error };
};

export default useGame;
