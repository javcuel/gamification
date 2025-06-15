import { useState } from 'react';
import { gameRepository } from '../../../shared/api/repository/game.repository';

/**
 * useDeleteGame hook
 *
 * Handles the deletion of a game and manages associated UI state.
 * - Triggers a callback on successful deletion.
 * - Manages loading and error state during the request lifecycle.
 *
 * @param onDeleteSuccess - Callback to execute after successful deletion
 * @returns An object with:
 * - `deleteGame`: Function to delete a game by ID
 * - `loading`: Boolean indicating the deletion request is in progress
 * - `error`: Error message if the request fails
 */
const useDeleteGame = (onDeleteSuccess: (id: number) => void) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	/**
	 * deleteGame
	 *
	 * Sends a request to delete the game with the specified ID.
	 * Calls the onDeleteSuccess callback if the request succeeds.
	 *
	 * @param id - ID of the game to be deleted
	 */
	const deleteGame = async (id: number) => {
		setLoading(true);
		setError(null);

		try {
			await gameRepository.delete(id);
			onDeleteSuccess(id);
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError('An unknown error occurred');
			}
		}
	};

	return { deleteGame, loading, error };
};

export default useDeleteGame;
