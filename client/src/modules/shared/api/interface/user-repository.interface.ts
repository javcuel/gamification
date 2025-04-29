import { User } from '../domain/user';

export type UserScore = {
  totalScore: number;
  completedSubjects: number;
};

export interface IUserRepository {
  getAll(): Promise<User[]>;
  create(data: User): Promise<void>;
  update(id: number, data: User): Promise<void>;
  delete(id: number): Promise<void>;
}
