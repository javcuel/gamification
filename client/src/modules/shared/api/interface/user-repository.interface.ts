import { User } from '../domain/user';

export interface IUserRepository {
  getAll(): Promise<User[]>;
  create(data: User): Promise<void>;
  update(id: number, data: User): Promise<void>;
  delete(id: number): Promise<void>;
}
