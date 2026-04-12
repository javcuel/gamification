import HttpClient from '../../../../api/http-client';
import { API_URLS } from '../../../../constants/apiUrls';
import { Subject, SubjectCreate, SubjectUpdate } from '../domain/subject';
import { ISubjectRepository } from '../interface/subject-repository.interface';
import { SubjectMapper } from '../mapper/subject.mapper';

/**
 * Implementation of the ISubjectRepository interface.
 * Responsible for handling subject-related operations with the backend API.
 */
class SubjectRepository implements ISubjectRepository {
	/**
	 * Fetches all subjects from the backend.
	 * @returns A promise resolving to an array of Subject domain objects.
	 */
	async getAll(): Promise<Subject[]> {
		try {
			const data = await HttpClient.get(API_URLS.GET_SUBJECTS);
			return data.map(SubjectMapper.toDomain);
		} catch (error) {
			console.error('Error fetching subjects', error);
			throw new Error('Failed to fetch subjects');
		}
	}

	/**
	 * Fetches subjects associated with a specific user.
	 * @param userId - The ID of the user.
	 * @returns A promise resolving to an array of Subject domain objects.
	 */
	async getByUser(userId: number): Promise<Subject[]> {
		try {
			// Usamos la ruta que crearemos en el backend
			const data = await HttpClient.get(`/subjects/user/${userId}`);
			return data.map(SubjectMapper.toDomain);
		} catch (error) {
			console.error(`Error fetching subjects for user ${userId}`, error);
			throw new Error('Failed to fetch subjects for user');
		}
	}

	/**
	 * Sends a request to create a new subject.
	 * @param data - SubjectCreate data to be sent in the request.
	 */
	async create(data: SubjectCreate): Promise<void> {
		const requestDTO = SubjectMapper.toCreateDTO(data);

		try {
			await HttpClient.post(API_URLS.CREATE_SUBJECT, requestDTO);
		} catch (error) {
			console.error('Error creating new subject:', error);
			throw new Error('Failed to create new subject');
		}
	}

	/**
	 * Sends a request to update an existing subject.
	 * @param id - The ID of the subject to update.
	 * @param data - The updated SubjectUpdate data.
	 */
	async update(id: number, data: SubjectUpdate): Promise<void> {
		const requestDTO = SubjectMapper.toUpdateDTO(data);

		try {
			await HttpClient.put(API_URLS.UPDATE_SUBJECT(id), requestDTO);
		} catch (error) {
			console.error(`Error updating subject (ID: ${id}):`, error);
			throw new Error('Failed to update subject');
		}
	}

	/**
	 * Updates the 'open' state of a subject.
	 * @param id - The ID of the subject to update.
	 * @param newState - Boolean indicating the new open state.
	 */
	async updateOpen(id: number, newState: boolean): Promise<void> {
		const requestDTO = SubjectMapper.toUpdateOpenDTO(newState);

		try {
			await HttpClient.put(API_URLS.UPDATE_SUBJECT_OPEN(id), requestDTO);
		} catch (error) {
			console.error(`Error updating subject (ID: ${id}):`, error);
			throw new Error('Failed to update open state.');
		}
	}

	/**
	 * Updates the 'visible' state of a subject.
	 * @param id - The ID of the subject to update.
	 * @param newState - Boolean indicating the new visibility state.
	 */
	async updateVisible(id: number, newState: boolean): Promise<void> {
		const requestDTO = SubjectMapper.toUpdateVisibleDTO(newState);

		try {
			await HttpClient.put(API_URLS.UPDATE_SUBJECT_VISIBLE(id), requestDTO);
		} catch (error) {
			console.error(`Error updating subject (ID: ${id}):`, error);
			throw new Error('Failed to update visible state.');
		}
	}

	/**
	 * Deletes a subject by its ID.
	 * @param id - The ID of the subject to delete.
	 */
	async delete(id: number): Promise<void> {
		try {
			await HttpClient.delete(API_URLS.DELETE_SUBJECT(id));
		} catch (error) {
			console.error(`Error deleting subject (ID: ${id}):`, error);
			throw new Error('Failed to delete subject');
		}
	}
}

// Exporting a singleton instance of the SubjectRepository.
export const subjectRepository = new SubjectRepository();
