import { useEffect, useState } from 'react';
import Storage from '../../../services/storage-service';
import { decodeToken } from '../../../services/token';
import { userRepository } from '../api/repository/user.repository';

/**
 * Custom hook that retrieves and returns user information from local storage and backend.
 * It uses the JWT token to decode basic user details, and fetches additional stats like score.
 *
 * @returns An object containing user name, role, total score, and completed subjects.
 */
export const useUserInfo = () => {
	// Local state for storing user information.
	const [userInfo, setUserInfo] = useState({
		name: '',
		role: 'P',
		totalScore: 0,
		completedSubjects: 0
	});

	useEffect(() => {
		/**
		 * Loads user information by:
		 * 1. Retrieving and decoding the stored JWT token.
		 * 2. Updating local state with basic user info.
		 * 3. Fetching and applying score-related data from the backend.
		 */
		const loadUserInfo = async () => {
			const token = Storage.getItem('token');

			if (token) {
				const decoded = decodeToken(token);

				if (decoded) {
					// Update name and role from decoded token
					setUserInfo(prev => ({
						...prev,
						id: decoded.id, // Although not used here, 'id' is set in case needed elsewhere
						name: decoded.name,
						role: decoded.role
					}));

					// Fetch score-related user info from API
					const data = await userRepository.getScore(decoded.id);

					if (data) {
						setUserInfo(prev => ({
							...prev,
							name: decoded.name,
							role: decoded.role,
							totalScore: data.totalScore,
							completedSubjects: data.completedSubjects
						}));
					}
				}
			}
		};

		loadUserInfo();
	}, []);

	return userInfo;
};
