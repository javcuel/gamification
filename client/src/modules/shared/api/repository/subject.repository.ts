import HttpClient from '../http-client';
import { API_URLS } from '../../../../constants/apiUrls';
import { Subject, SubjectCreate, SubjectUpdate } from '../domain/subject';
import { ISubjectRepository } from '../interface/subject-repository.interface';
import { SubjectMapper } from '../mapper/subject.mapper';

class SubjectRepository implements ISubjectRepository {
	async getAll(): Promise<Subject[]> {
		try {
			const data = await HttpClient.get(API_URLS.GET_SUBJECTS);
			return data.map(SubjectMapper.toDomain);
		} catch (error) {
			console.error('Error fetching subjects', error);
			throw new Error('Failed to fetch subjects');
		}
	}

	async getByUser(userId: number): Promise<Subject[]> {
		try {
			const data = await HttpClient.get(API_URLS.GET_USER_SUBJECTS(userId));
			return data.map(SubjectMapper.toDomain);
		} catch (error) {
			console.error(`Error fetching subjects for user ${userId}`, error);
			throw new Error('Failed to fetch subjects for user');
		}
	}

	async getByTeacher(userId: number): Promise<Subject[]> {
		try {
			const data = await HttpClient.get(API_URLS.GET_TEACHER_SUBJECTS(userId));
			return data.map(SubjectMapper.toDomain);
		} catch (error) {
			console.error(`Error fetching subjects for teacher ${userId}`, error);
			throw new Error('Failed to fetch subjects for teacher');
		}
	}

	async create(subjectData: SubjectCreate): Promise<void> {
		try {
			const formData = new FormData();
			formData.append('Name', subjectData.name);
			formData.append('UrlImgSubject', subjectData.img);
			formData.append('UrlImgInside', subjectData.imgBackground);

			if (subjectData.imageFile !== null && subjectData.imageFile !== undefined) {
				formData.append('imageFile', subjectData.imageFile);
			}
			if (subjectData.bgImageFile !== null && subjectData.bgImageFile !== undefined) {
				formData.append('bgImageFile', subjectData.bgImageFile);
			}

			await HttpClient.post(API_URLS.CREATE_SUBJECT, formData);
		} catch (error) {
			console.error('Error creating subject:', error);
			throw new Error('Failed to create subject');
		}
	}

	async update(id: number, subjectData: SubjectUpdate): Promise<void> {
		try {
			const formData = new FormData();
			formData.append('Name', subjectData.name);
			formData.append('UrlImgSubject', subjectData.img);
			formData.append('UrlImgInside', subjectData.imgBackground);

			if (subjectData.imageFile !== null && subjectData.imageFile !== undefined) {
				formData.append('imageFile', subjectData.imageFile);
			}
			if (subjectData.bgImageFile !== null && subjectData.bgImageFile !== undefined) {
				formData.append('bgImageFile', subjectData.bgImageFile);
			}

			await HttpClient.put(API_URLS.UPDATE_SUBJECT(id), formData);
		} catch (error) {
			console.error(`Error updating subject (ID: ${id}):`, error);
			throw new Error('Failed to update subject');
		}
	}

	async updateOpen(id: number, newState: boolean): Promise<void> {
		const requestDTO = SubjectMapper.toUpdateOpenDTO(newState);
		try {
			await HttpClient.put(API_URLS.UPDATE_SUBJECT_OPEN(id), requestDTO);
		} catch (error) {
			console.error(`Error updating subject (ID: ${id}):`, error);
			throw new Error('Failed to update open state.');
		}
	}

	async updateVisible(id: number, newState: boolean): Promise<void> {
		const requestDTO = SubjectMapper.toUpdateVisibleDTO(newState);
		try {
			await HttpClient.put(API_URLS.UPDATE_SUBJECT_VISIBLE(id), requestDTO);
		} catch (error) {
			console.error(`Error updating subject (ID: ${id}):`, error);
			throw new Error('Failed to update visible state.');
		}
	}

	async delete(id: number): Promise<void> {
		try {
			await HttpClient.delete(API_URLS.DELETE_SUBJECT(id));
		} catch (error) {
			console.error(`Error deleting subject (ID: ${id}):`, error);
			throw new Error('Failed to delete subject');
		}
	}

	async importUsersFromCsv(subjectId: number, file: File): Promise<any> {
		const formData = new FormData();
		formData.append('csvFile', file);
		try {
			const response = await HttpClient.post(API_URLS.IMPORT_SUBJECT_USERS(subjectId), formData);
			return response;
		} catch (error) {
			console.error('Error importing users from CSV:', error);
			throw new Error('No se pudo procesar el archivo CSV. Revisa la conexión o el formato del archivo.');
		}
	}
}

export const subjectRepository = new SubjectRepository();