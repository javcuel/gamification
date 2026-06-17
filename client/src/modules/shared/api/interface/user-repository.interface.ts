import { User, UserCreate, UserLogin, UserUpdate } from '../domain/user';
import { NavigateFunction } from 'react-router/dist';

/**
 * Represents the aggregated score data for a user.
 */
export type UserScore = {
	totalScore: number;
	completedSubjects: number;
};

/**
 * Interface defining the contract for a User repository.
 */
export interface IUserRepository {
	/**
	 * Retrieves all user entities.
	 */
	getAll(): Promise<User[]>;

	/**
	 * Retrieves score information for a specific user.
	 */
	getScore(id: number): Promise<UserScore>;

	/**
	 * Creates a new user entry.
	 */
	create(data: UserCreate): Promise<void>;

	/**
	 * Updates an existing user's information.
	 */
	update(id: number, data: UserUpdate): Promise<void>;

	/**
	 * Deletes a user by their ID.
	 */
	delete(id: number): Promise<void>;

	/**
	 * Attempts to authenticate a user.
	 */
	login(data: UserLogin): Promise<{ success: boolean; token?: string; message?: string }>;

	/**
	 * Logs out the user.
	 */
	logout(navigate: NavigateFunction): void;
}