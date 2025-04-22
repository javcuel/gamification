import { useState } from 'react';
import { GameApi } from '../../../api/game';

const useToggleGameVisibleState = (gameId: number, initialState: boolean) => {
  const [isVisible, setIsVisible] = useState(initialState);

  const [error, setError] = useState<string | null>(null);

  const toggleVisibleState = async () => {
    try {
      const newState = !isVisible;
      const payload = { gameId, isVisible: newState };

      await GameApi.updateVisibleState(payload);
      setIsVisible(newState);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return { isVisible, error, toggleVisibleState };
};

export default useToggleGameVisibleState;
