import { User } from '../domain/user';

import httpClient from '../../../../api/httpClient';
import { API_URLS } from '../../../../constants/apiUrls';
import { IUserRepository } from '../interface/user-repository.interface';
import { UserMapper } from '../mapper/user.mapper';

export class UserRepository implements IUserRepository {
  async getAll(): Promise<User[]> {
    try {
      const data = await httpClient.get(API_URLS.GET_USERS);
      return data.map(UserMapper.toDomain);
    } catch (error) {
      console.error('Error fetching users', error);
      throw new Error('Failed to fetch users');
    }
  }

  async create(data: User): Promise<void> {
    const requestDTO = UserMapper.toRequestDTO(data);

    try {
      await httpClient.post(API_URLS.CREATE_USER, requestDTO);
    } catch (error) {
      console.error('Error creating new user:', error);
      throw new Error('Failed to create new user');
    }
  }

  async update(id: number, data: User): Promise<void> {
    const requestDTO = UserMapper.toRequestDTO(data);

    try {
      await httpClient.put(API_URLS.UPDATE_USER(id), requestDTO);
    } catch (error) {
      console.error(`Error updating user (ID: ${id}):`, error);
      throw new Error('Failed to update user');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await httpClient.delete(API_URLS.DELETE_USER(id));
    } catch (error) {
      console.error(`Error deleting user (ID: ${id}):`, error);
      throw new Error('Failed to delete user');
    }
  }

  async login(data: User): Promise<void> {
    const requestLoginDTO = UserMapper.toRequestLoginDTO(data);

    try {
      await httpClient.post(API_URLS.LOGIN, requestLoginDTO);
    } catch (error) {
      console.error('Error loggin in:', error);
      throw new Error('Failed to log in');
    }
  }
}

export const userRepository = new UserRepository();
