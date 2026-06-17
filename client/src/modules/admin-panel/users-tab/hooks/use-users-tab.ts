import { useEffect, useState } from 'react';
import { User } from '../../../shared/api/domain/user';
import { userRepository } from '../../../shared/api/repository/user.repository';

/**
 * Custom hook to manage the list of users displayed in the Users tab.
 *
 * Fetches all users from the repository on initial render and handles
 * state management for user data and potential errors.
 *
 * @returns An object containing the user list, setter for users, error message, and a reload function
 */
const useUsersTab = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [error, setError] = useState<string | null>(null);

	/**
	 * Loads the list of users from the API.
	 */
	const loadUsers = async () => {
		try {
			const data = await userRepository.getAll();
			setUsers(data);
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError('An unknown error occurred');
			}
		}
	};

	useEffect(() => {
		loadUsers();
	}, []);

	// Export the loadUsers function as reloadUsers
	return { users, setUsers, error, reloadUsers: loadUsers };
};

export default useUsersTab;