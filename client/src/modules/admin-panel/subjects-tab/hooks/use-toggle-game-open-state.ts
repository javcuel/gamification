import { useState } from 'react';
import { Game } from '../../../shared/api/domain/game';
import { gameRepository } from '../../../shared/api/repository/game.repository';

const useToggleGameOpenState = (game: Game) => {
  const [isOpen, setIsOpen] = useState(game.isOpen);
  const [error, setError] = useState<string | null>(null);

  const toggleOpenState = async () => {
    try {
      const newState = !isOpen;

      await gameRepository.updateOpen(game.id, newState);
      setIsOpen(newState);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return { isOpen, error, toggleOpenState };
};

export default useToggleGameOpenState;
