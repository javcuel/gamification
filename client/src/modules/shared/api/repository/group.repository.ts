import HttpClient from '../http-client';
import { API_URLS } from '../../../../constants/apiUrls';
import { IGroupRepository } from '../interface/group-repository.interface';
import { SubjectGroup, SubjectGroupCreate } from '../domain/group';
import { GroupMapper } from '../mapper/group.mapper';

class GroupRepository implements IGroupRepository {
	/**
	 * Retrieves all groups for a specific subject.
	 */
	async getBySubject(subjectId: number): Promise<SubjectGroup[]> {
		try {
			const data = await HttpClient.get(API_URLS.GET_SUBJECT_GROUPS(subjectId));
			return data.map(GroupMapper.toDomain);
		} catch (error) {
			console.error(`Error fetching groups for subject (ID: ${subjectId})`, error);
			throw new Error('Failed to fetch groups');
		}
	}

	/**
	 * Creates a new group for a subject.
	 */
	async create(data: SubjectGroupCreate): Promise<SubjectGroup> {
		const requestDTO = GroupMapper.toCreateDTO(data);

		try {
			const response = await HttpClient.post(API_URLS.CREATE_GROUP, requestDTO);
			return GroupMapper.toDomain(response);
		} catch (error) {
			console.error('Error creating group:', error);
			throw new Error('Failed to create group');
		}
	}

	/**
	 * Deletes a group by its ID.
	 */
	async delete(groupId: number): Promise<void> {
		try {
			await HttpClient.delete(API_URLS.DELETE_GROUP(groupId));
		} catch (error) {
			console.error(`Error deleting group (ID: ${groupId}):`, error);
			throw new Error('Failed to delete group');
		}
	}
}

export const groupRepository = new GroupRepository();

export { SubjectGroup };
