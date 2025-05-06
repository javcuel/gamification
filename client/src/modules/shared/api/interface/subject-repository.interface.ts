import { Subject, SubjectUpdate, SubjectCreate } from '../domain/subject';

export interface ISubjectRepository {
  getAll(): Promise<Subject[]>;
  create(data: SubjectCreate): Promise<void>;
  update(id: number, data: SubjectUpdate): Promise<void>;
  updateOpen(id: number, newState: boolean): Promise<void>;
  updateVisible(id: number, newState: boolean): Promise<void>;
  delete(id: number): Promise<void>;
}
