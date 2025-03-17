import { useState } from 'react';
import { updateGameVisibleState } from '../api/worldGamesService';

/**
 * Hook to toggle the visible state of a game.
 * @param {number} gameId - The ID of the game to toggle.
 * @param {boolean} initialState - The initial visible state of the game.
 * @returns {[boolean, () => void, boolean]} The current state, a toggle function, and a loading indicator.
 */
const useToggleGameVisibleState = (gameId: number, initialState: boolean) => {
  const [isVisible, setIsVisible] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const toggleVisibleState = async () => {
    setLoading(true);
    try {
      const newState = !isVisible;
      await updateGameVisibleState(gameId, newState);
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
