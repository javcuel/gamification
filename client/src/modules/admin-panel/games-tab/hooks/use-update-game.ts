import { useState } from 'react';
import { GameUpdate } from '../../../shared/api/domain/game';
import { gameRepository } from '../../../shared/api/repository/game.repository';

/**
 * useUpdateGame hook
 *
 * Provides functionality to update a game's data through the game repository.
 * Tracks loading and error states, and optionally executes a callback upon success.
 *
 * @param onUpdateSuccess - Optional callback to execute after a successful update
 * @returns An object containing:
 * - `updateGame`: Function to execute the update
 * - `loading`: Indicates whether the update is in progress
 * - `error`: Contains error message if the update fails
 */
const useUpdateGame = (onUpdateSuccess?: () => void) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	/**
	 * updateGame
	 *
	 * Sends the updated game data to the backend.
	 *
	 * @param id - The ID of the game to update
	 * @param data - The updated game data
	 */
	const updateGame = async (id: number, data: GameUpdate) => {
		try {
			setLoading(true);
			setError(null);

			await gameRepository.update(id, data);

			if (onUpdateSuccess) onUpdateSuccess();
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('An unknown error occurred');
			}
		} finally {
			setLoading(false);
		}
	};

	return {
		updateGame,
		loading,
		error
	};
};

export default useUpdateGame;
