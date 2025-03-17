import { useState } from 'react';
import { updateWorldVisibleState } from '../api/worldGamesService';

/**
 * Hook to toggle the visible state of a world.
 * @param {number} worldId - The ID of the world to toggle.
 * @param {boolean} initialState - The initial visible state of the world.
 * @returns {[boolean, () => void, boolean]} The current state, a toggle function, and a loading indicator.
 */
const useToggleWorldVisibleState = (worldId: number, initialState: boolean) => {
  const [isVisible, setIsVisible] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const toggleVisibleState = async () => {
    setLoading(true);
    try {
      const newState = !isVisible;
      await updateWorldVisibleState(worldId, newState);
      setIsVisible(newState);
    } catch (error) {
      console.error('Error toggling world open state:', error);
    } finally {
      setLoading(false);
    }
  };

  return [isVisible, toggleVisibleState, loading] as const;
};

export default useToggleWorldVisibleState;
