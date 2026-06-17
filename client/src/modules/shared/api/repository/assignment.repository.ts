import HttpClient from '../http-client';
import { API_URLS } from '../../../../constants/apiUrls';
import { IAssignmentRepository } from '../interface/assignment-repository.interface';
import { GroupUser, AssignmentCreate } from '../domain/assignment';
import { AssignmentMapper } from '../mapper/assignment.mapper';

class AssignmentRepository implements IAssignmentRepository {
	/**
	 * Retrieves all users assigned to a specific group.
	 */
	async getUsersByGroup(groupId: number): Promise<GroupUser[]> {
		try {
			const data = await HttpClient.get(API_URLS.GET_GROUP_USERS(groupId));
			// We transform the array of DTOs into an array of Domain models
			return data.map(AssignmentMapper.toDomain);
		} catch (error) {
			console.error(`Error fetching users for group (ID: ${groupId})`, error);
			throw new Error('Failed to fetch group users');
		}
	}

	/**
	 * Assigns a user to a group by their username.
	 */
	async assignUser(data: AssignmentCreate): Promise<void> {
		const requestDTO = AssignmentMapper.toCreateDTO(data);

		try {
			await HttpClient.post(API_URLS.ASSIGN_USER_TO_GROUP(data.groupId), requestDTO);
		} catch (error: any) {
			console.error('Error assigning user to group:', error);
			// We maintain error propagation so the frontend can display
			// messages like "User already belongs to this group" or role rules.
			throw new Error(error.response?.data?.message || 'Failed to assign user');
		}
	}

	/**
	 * Unassigns a user from a group.
	 */
	async unassignUser(userId: number, groupId: number): Promise<void> {
		try {
			await HttpClient.delete(API_URLS.UNASSIGN_USER_FROM_GROUP(groupId, userId));
		} catch (error) {
			console.error(`Error unassigning user (ID: ${userId}) from group (ID: ${groupId}):`, error);
			throw new Error('Failed to unassign user');
		}
	}
}

export const assignmentRepository = new AssignmentRepository();