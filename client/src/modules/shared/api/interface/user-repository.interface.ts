import { User, UserCreate, UserUpdate } from '../domain/user';

export type UserScore = {
  totalScore: number;
  completedSubjects: number;
};

export interface IUserRepository {
  getAll(): Promise<User[]>;
  create(data: UserCreate): Promise<void>;
  update(id: number, data: UserUpdate): Promise<void>;
  delete(id: number): Promise<void>;
}
