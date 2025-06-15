import { useState } from 'react';
import { Game } from '../../../shared/api/domain/game';
import { gameRepository } from '../../../shared/api/repository/game.repository';

/**
 * useToggleGameVisibleState hook
 *
 * Manages the `isVisible` state of a game and provides functionality to toggle it.
 * The change is persisted in the backend via the game repository.
 *
 * @param game - The game object whose visibility state is to be toggled
 * @returns An object containing:
 * - `isVisible`: Current visibility state of the game
 * - `error`: Error message if the update request fails
 * - `toggleVisibleState`: Function to toggle the game's visibility
 */
const useToggleGameVisibleState = (game: Game) => {
	const [isVisible, setIsVisible] = useState(game.isVisible);
	const [error, setError] = useState<string | null>(null);

	/**
	 * toggleVisibleState
	 *
	 * Toggles the game's `isVisible` status and persists the change via the repository.
	 */
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
