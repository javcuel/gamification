import { SubjectGroup, SubjectGroupCreate } from '../domain/group';

export interface IGroupRepository {
	getBySubject(subjectId: number): Promise<SubjectGroup[]>;
	create(data: SubjectGroupCreate): Promise<SubjectGroup>;
	delete(groupId: number): Promise<void>;
}