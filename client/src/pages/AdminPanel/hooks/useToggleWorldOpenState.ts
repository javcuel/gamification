import { useState } from 'react';
import { updateWorldOpenState } from '../api/worldGamesService';

/**
 * Hook to toggle the open state of a world.
 * @param {number} worldId - The ID of the world to toggle.
 * @param {boolean} initialState - The initial open state of the world.
 * @returns {[boolean, () => void, boolean]} The current state, a toggle function, and a loading indicator.
 */
const useToggleWorldOpenState = (worldId: number, initialState: boolean) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const toggleOpenState = async () => {
    setLoading(true);
    try {
      const newState = !isOpen;
      await updateWorldOpenState(worldId, newState);
      setIsOpen(newState);
    } catch (error) {
      console.error('Error toggling world open state:', error);
    } finally {
      setLoading(false);
    }
  };

  return [isOpen, toggleOpenState, loading] as const;
};

export default useToggleWorldOpenState;
