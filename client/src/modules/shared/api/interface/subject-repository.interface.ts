import { Subject, SubjectCreate, SubjectUpdate } from '../domain/subject';

/**
 * Interface that defines the contract for a Subject repository.
 * This repository handles data operations related to Subject entities.
 */
export interface ISubjectRepository {
	/**
	 * Retrieves all subject entries from the data source.
	 * @returns A promise resolving to an array of Subject entities.
	 */
	getAll(): Promise<Subject[]>;

	/**
	 * Creates a new subject entry.
	 * @param data - The data required to create a new subject.
	 * @returns A promise that resolves when the operation is complete.
	 */
	create(data: SubjectCreate): Promise<void>;

	/**
	 * Updates an existing subject with new information.
	 * @param id - The ID of the subject to update.
	 * @param data - The updated data for the subject.
	 * @returns A promise that resolves once the update is completed.
	 */
	update(id: number, data: SubjectUpdate): Promise<void>;

	/**
	 * Updates the 'open' state of a specific subject.
	 * @param id - The ID of the subject to be updated.
	 * @param newState - The new boolean value indicating whether the subject is open.
	 * @returns A promise that resolves when the state has been updated.
	 */
	updateOpen(id: number, newState: boolean): Promise<void>;

	/**
	 * Updates the 'visible' state of a specific subject.
	 * @param id - The ID of the subject to be updated.
	 * @param newState - The new boolean value indicating visibility.
	 * @returns A promise that resolves when the visibility status has been updated.
	 */
	updateVisible(id: number, newState: boolean): Promise<void>;

	/**
	 * Deletes a subject by its ID.
	 * @param id - The ID of the subject to delete.
	 * @returns A promise that resolves when the subject has been successfully removed.
	 */
	delete(id: number): Promise<void>;
}
