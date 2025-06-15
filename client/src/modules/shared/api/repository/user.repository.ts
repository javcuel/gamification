import {
	User,
	UserCreate,
	UserLogin,
	UserScore,
	UserUpdate
} from '../domain/user';

import { NavigateFunction } from 'react-router/dist';
import HttpClient from '../../../../api/http-client';
import { API_URLS } from '../../../../constants/apiUrls';
import { ROUTES } from '../../../../constants/routes';
import { IUserRepository } from '../interface/user-repository.interface';
import { UserMapper } from '../mapper/user.mapper';

/**
 * Implementation of the IUserRepository interface.
 * Responsible for handling API communication for user-related operations.
 */
class UserRepository implements IUserRepository {
	/**
	 * Retrieves all users from the backend.
	 * @returns A promise resolving to an array of User domain objects.
	 */
	async getAll(): Promise<User[]> {
		try {
			const data = await HttpClient.get(API_URLS.GET_USERS);
			return data.map(UserMapper.toDomain);
		} catch (error) {
			console.error('Error fetching users', error);
			throw new Error('Failed to fetch users');
		}
	}

	/**
	 * Retrieves score information for a specific user.
	 * @param id - The ID of the user.
	 * @returns A promise resolving to a UserScore domain object.
	 */
	async getScore(id: number): Promise<UserScore> {
		try {
			const data = await HttpClient.get(API_URLS.GET_USER_SCORE(id));
			const dto = Array.isArray(data) ? data[0] : data;

			// Ensure score values are properly parsed as numbers.
			dto.totalScore = Number(dto.totalScore);
			dto.completedSubjects = Number(dto.completedSubjects);

			return UserMapper.toScoreDomain(dto);
		} catch (error) {
			console.error('Error fetching user score', error);
			throw new Error('Failed to fetch user score');
		}
	}

	/**
	 * Sends a request to create a new user.
	 * @param data - The user creation data.
	 */
	async create(data: UserCreate): Promise<void> {
		const requestDTO = UserMapper.toCreateDTO(data);

		try {
			await HttpClient.post(API_URLS.CREATE_USER, requestDTO);
		} catch (error) {
			console.error('Error creating new user:', error);
			throw new Error('Failed to create new user');
		}
	}

	/**
	 * Updates an existing user's data.
	 * @param id - The ID of the user to update.
	 * @param data - The updated user data.
	 */
	async update(id: number, data: UserUpdate): Promise<void> {
		const requestDTO = UserMapper.toUpdateDTO(data);

		try {
			await HttpClient.put(API_URLS.UPDATE_USER(id), requestDTO);
		} catch (error) {
			console.error(`Error updating user (ID: ${id}):`, error);
			throw new Error('Failed to update user');
		}
	}

	/**
	 * Deletes a user by their ID.
	 * @param id - The ID of the user to delete.
	 */
	async delete(id: number): Promise<void> {
		try {
			await HttpClient.delete(API_URLS.DELETE_USER(id));
		} catch (error) {
			console.error(`Error deleting user (ID: ${id}):`, error);
			throw new Error('Failed to delete user');
		}
	}

	/**
	 * Attempts to authenticate a user.
	 * @param data - The user's login credentials.
	 * @returns An object indicating success, and optionally a token or error message.
	 */
	async login(
		data: UserLogin
	): Promise<{ success: boolean; token?: string; message?: string }> {
		const requestLoginDTO = UserMapper.toLoginDTO(data);

		try {
			const response = await HttpClient.post(API_URLS.LOGIN, requestLoginDTO);
			return { success: true, token: response.token };
		} catch (error) {
			console.error('Error logging in:', error);
			return {
				success: false,
				message: 'Wrong Credentials'
			};
		}
	}

	/**
	 * Logs out the user by clearing authentication token and navigating to the login route.
	 * @param navigate - React Router navigation function.
	 */
	logout(navigate: NavigateFunction): void {
		localStorage.removeItem('token');
		navigate(ROUTES.LOGIN);
	}
}

// Exporting a singleton instance of the UserRepository for use across the application.
export const userRepository = new UserRepository();
