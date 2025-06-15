import { User, UserCreate, UserUpdate } from '../domain/user';

/**
 * Represents the aggregated score data for a user.
 * - totalScore: The cumulative score across all activities or subjects.
 * - completedSubjects: The number of subjects the user has completed.
 */
export type UserScore = {
	totalScore: number;
	completedSubjects: number;
};

/**
 * Interface defining the contract for a User repository.
 * This interface outlines methods for performing CRUD operations
 * on user entities in the data source.
 */
export interface IUserRepository {
	/**
	 * Retrieves all user entities from the data source.
	 * @returns A promise resolving to an array of User entities.
	 */
	getAll(): Promise<User[]>;

	/**
	 * Creates a new user entry.
	 * @param data - The data required to create a new user.
	 * @returns A promise that resolves when the operation is complete.
	 */
	create(data: UserCreate): Promise<void>;

	/**
	 * Updates an existing user's information.
	 * @param id - The ID of the user to update.
	 * @param data - The new data to apply to the user.
	 * @returns A promise that resolves once the update is complete.
	 */
	update(id: number, data: UserUpdate): Promise<void>;

	/**
	 * Deletes a user by their ID.
	 * @param id - The ID of the user to remove.
	 * @returns A promise that resolves when the user has been deleted.
	 */
	delete(id: number): Promise<void>;
}
