import { useState } from 'react';
import { gameRepository } from '../../../shared/api/repository/game.repository';

const useDeleteGame = (onDeleteSuccess: (id: number) => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteGame = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await gameRepository.delete(id);
      onDeleteSuccess(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return { deleteGame, loading, error };
};

export default useDeleteGame;
