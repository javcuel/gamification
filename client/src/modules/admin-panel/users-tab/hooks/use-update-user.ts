import { useState } from 'react';
import { UserUpdate } from '../../../shared/api/domain/user';
import { userRepository } from '../../../shared/api/repository/user.repository';

/**
 * Custom hook for updating user information.
 *
 * Manages loading and error states during the update process,
 * and optionally executes a callback function on success.
 *
 * @param onUpdateSuccess - Optional callback function executed after a successful update
 * @returns Object containing updateUser function, loading state, and error state
 */
const useUpdateUser = (onUpdateSuccess?: () => void) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	/**
	 * Sends an update request for a user by ID.
	 *
	 * @param id - The ID of the user to update
	 * @param data - The updated user data
	 */
	const updateUser = async (id: number, data: UserUpdate) => {
		setLoading(true);
		setError(null);

		try {
			await userRepository.update(id, data);
			if (onUpdateSuccess) onUpdateSuccess(); // Invoke callback if provided
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('An unknown error occurred');
			}
		} finally {
			setLoading(false);
		}
	};

	return { updateUser, loading, error };
};

export default useUpdateUser;
