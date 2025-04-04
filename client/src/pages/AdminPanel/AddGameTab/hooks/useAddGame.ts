import { useState } from 'react';
import { GameApi, GameApiPayload } from '../../../../api/game';

const useAddGame = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const addGame = async (payload: GameApiPayload) => {
    setError(null);
    setSuccess(false);

    try {
      await GameApi.create(payload);
      setSuccess(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return { addGame, error, success };
};

export default useAddGame;
