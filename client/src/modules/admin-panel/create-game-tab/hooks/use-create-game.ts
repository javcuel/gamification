import { useState } from 'react';
import { Game } from '../../../shared/api/domain/game';
import { gameRepository } from '../../../shared/api/repository/game.repository';

const useCreateGame = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const createGame = async (data: Game) => {
    setError(null);
    setSuccess(false);

    try {
      await gameRepository.create(data);
      setSuccess(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return { createGame, error, success, loading };
};

export default useCreateGame;
