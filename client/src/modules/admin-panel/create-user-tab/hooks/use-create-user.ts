import { useState } from 'react';
import { User } from '../../../shared/api/domain/user';
import { userRepository } from '../../../shared/api/repository/user.repository';

/**
 * useCreateUser hook
 *
 * Custom hook for creating a new user.
 * - Manages local state for loading, error, and success feedback.
 * - Provides a method to trigger the user creation via the user repository.
 *
 * @returns An object containing:
 * - `createUser`: Function to initiate user creation
 * - `error`: Error message if creation fails
 * - `success`: Boolean indicating if the creation was successful
 * - `loading`: Boolean indicating the current loading state
 */
const useCreateUser = () => {
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState<boolean>(true);

	/**
	 * createUser
	 *
	 * Attempts to create a new user by sending the provided data to the repository.
	 * Updates internal state to reflect success or failure.
	 *
	 * @param data - The user data to be created
	 */
	const createUser = async (data: User) => {
		setError(null);
		setSuccess(false);

		try {
			await userRepository.create(data);
			setSuccess(true);
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError('An unknown error occurred');
			}
		} finally {
			setLoading(false);
		}
	};

	return { createUser, error, success, loading };
};

export default useCreateUser;
