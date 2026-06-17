import { Subject, SubjectCreate, SubjectUpdate } from '../domain/subject';

export interface ISubjectRepository {
	getAll(): Promise<Subject[]>;
	getByUser(userId: number): Promise<Subject[]>;
	getByTeacher(userId: number): Promise<Subject[]>;
	create(subjectData: SubjectCreate): Promise<void>;
	update(id: number, subjectData: SubjectUpdate): Promise<void>;
	updateOpen(id: number, newState: boolean): Promise<void>;
	updateVisible(id: number, newState: boolean): Promise<void>;
	delete(id: number): Promise<void>;
	importUsersFromCsv(subjectId: number, file: File): Promise<any>;
}