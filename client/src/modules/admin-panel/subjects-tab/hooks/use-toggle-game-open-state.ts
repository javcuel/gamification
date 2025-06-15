import { useState } from 'react';
import { Game } from '../../../shared/api/domain/game';
import { gameRepository } from '../../../shared/api/repository/game.repository';

/**
 * useToggleGameOpenState hook
 *
 * Manages the `isOpen` state of a game and provides functionality to toggle it.
 * This hook updates the game state both locally and in the backend via the game repository.
 *
 * @param game - The game object whose open state is to be toggled
 * @returns An object containing:
 * - `isOpen`: Current open state of the game
 * - `error`: Error message if the update request fails
 * - `toggleOpenState`: Function to toggle the game's open state
 */
const useToggleGameOpenState = (game: Game) => {
	const [isOpen, setIsOpen] = useState(game.isOpen);
	const [error, setError] = useState<string | null>(null);

	/**
	 * toggleOpenState
	 *
	 * Toggles the game's `isOpen` status and persists the change via the repository.
	 */
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
