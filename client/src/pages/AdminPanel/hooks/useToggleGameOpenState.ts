import { useState } from 'react';
import { updateGameOpenState } from '../../../api/game';

const useToggleGameOpenState = (gameId: number, initialState: boolean) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const toggleOpenState = async () => {
    setLoading(true);
    try {
      const newState = !isOpen;
      const payload = { gameId, isOpen: newState };

      await updateGameOpenState(payload);
      setIsOpen(newState);
    } catch (error) {
      console.error('Error toggling game open state:', error);
    } finally {
      setLoading(false);
    }
  };

  return [isOpen, toggleOpenState, loading] as const;
};

export default useToggleGameOpenState;
