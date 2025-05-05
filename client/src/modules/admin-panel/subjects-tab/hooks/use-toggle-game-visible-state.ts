import { useState } from 'react';
import { Game } from '../../../shared/api/domain/game';
import { gameRepository } from '../../../shared/api/repository/game.repository';

const useToggleGameVisibleState = (game: Game) => {
  const [isVisible, setIsVisible] = useState(game.isVisible);
  const [error, setError] = useState<string | null>(null);

  const toggleVisibleState = async () => {
    try {
      const newState = !isVisible;

      await gameRepository.updateVisible(game.id, newState);
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
