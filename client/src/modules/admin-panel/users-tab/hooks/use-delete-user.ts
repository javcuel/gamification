import { useState } from 'react';
import { userRepository } from '../../../shared/api/repository/user.repository';

/**
 * Custom hook for deleting a user by ID.
 *
 * Provides loading and error state handling for the delete operation,
 * and invokes a success callback upon successful deletion.
 *
 * @param onDeleteSuccess - Callback function executed after successful deletion
 * @returns Object containing deleteUser function, loading and error state
 */
const useDeleteUser = (onDeleteSuccess: (id: number) => void) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	/**
	 * Deletes a user by their ID and handles error/loading states.
	 *
	 * @param id - ID of the user to be deleted
	 */
	const deleteUser = async (id: number) => {
		setLoading(true);
		setError(null);

		try {
			await userRepository.delete(id);
			onDeleteSuccess(id); // Notify parent of successful deletion
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError('An unknown error occurred');
			}
		}
	};

	return { deleteUser, loading, error };
};

export default useDeleteUser;
