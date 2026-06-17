import { GroupUser, AssignmentCreate } from '../domain/assignment';

export interface IAssignmentRepository {
	getUsersByGroup(groupId: number): Promise<GroupUser[]>;
	assignUser(data: AssignmentCreate): Promise<void>;
	unassignUser(userId: number, groupId: number): Promise<void>;
}