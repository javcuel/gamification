import { useState } from 'react';
import { updateGameVisibleState } from '../../../api/game';

const useToggleGameVisibleState = (gameId: number, initialState: boolean) => {
  const [isVisible, setIsVisible] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const toggleVisibleState = async () => {
    setLoading(true);
    try {
      const newState = !isVisible;
      const payload = { gameId, isVisible: newState };
      await updateGameVisibleState(payload);
      setIsVisible(newState);
    } catch (error) {
      console.error('Error toggling game open state:', error);
    } finally {
      setLoading(false);
    }
  };

  return [isVisible, toggleVisibleState, loading] as const;
};

export default useToggleGameVisibleState;
