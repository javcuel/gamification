import { useState } from 'react';
import { GameUpdate } from '../../../shared/api/domain/game';
import { gameRepository } from '../../../shared/api/repository/game.repository';

const useUpdateGame = (onUpdateSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateGame = async (id: number, data: GameUpdate) => {
    try {
      setLoading(true);
      setError(null);

      await gameRepository.update(id, data);

      if (onUpdateSuccess) onUpdateSuccess();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    updateGame,
    loading,
    error,
  };
};

export default useUpdateGame;
