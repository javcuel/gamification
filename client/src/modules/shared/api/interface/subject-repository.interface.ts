import { Subject } from '../domain/subject';

export interface ISubjectRepository {
  getAll(): Promise<Subject[]>;
  create(data: Subject): Promise<void>;
  update(id: number, data: Subject): Promise<void>;
  delete(id: number): Promise<void>;
}
