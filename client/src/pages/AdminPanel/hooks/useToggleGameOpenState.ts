import { useState } from "react";
import { updateGameOpenState } from "../adapters/api/worldGamesService";

/**
 * Hook to toggle the open state of a game.
 * @param {number} gameId - The ID of the game to toggle.
 * @param {boolean} initialState - The initial open state of the game.
 * @returns {[boolean, () => void, boolean]} The current state, a toggle function, and a loading indicator.
 */
const useToggleGameOpenState = (gameId: number, initialState: boolean) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const toggleOpenState = async () => {
    setLoading(true);
    try {
      const newState = !isOpen;
      await updateGameOpenState(gameId, newState);
      setIsOpen(newState);
    } catch (error) {
      console.error("Error toggling game open state:", error);
    } finally {
      setLoading(false);
    }
  };

  return [isOpen, toggleOpenState, loading] as const;
};

export default useToggleGameOpenState;
