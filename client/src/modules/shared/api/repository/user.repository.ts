import { User } from '../domain/user';

import { NavigateFunction } from 'react-router/dist';
import HttpClient from '../../../../api/http-client';
import { API_URLS } from '../../../../constants/apiUrls';
import { ROUTES } from '../../../../constants/routes';
import { IUserRepository } from '../interface/user-repository.interface';
import { UserMapper } from '../mapper/user.mapper';

export class UserRepository implements IUserRepository {
  async getAll(): Promise<User[]> {
    try {
      const data = await HttpClient.get(API_URLS.GET_USERS);
      return data.map(UserMapper.toDomain);
    } catch (error) {
      console.error('Error fetching users', error);
      throw new Error('Failed to fetch users');
    }
  }

  async create(data: User): Promise<void> {
    const requestDTO = UserMapper.toCreateDTO(data);

    try {
      await HttpClient.post(API_URLS.CREATE_USER, requestDTO);
    } catch (error) {
      console.error('Error creating new user:', error);
      throw new Error('Failed to create new user');
    }
  }

  async update(id: number, data: User): Promise<void> {
    const requestDTO = UserMapper.toUpdateDTO(data);

    try {
      await HttpClient.put(API_URLS.UPDATE_USER(id), requestDTO);
    } catch (error) {
      console.error(`Error updating user (ID: ${id}):`, error);
      throw new Error('Failed to update user');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await HttpClient.delete(API_URLS.DELETE_USER(id));
    } catch (error) {
      console.error(`Error deleting user (ID: ${id}):`, error);
      throw new Error('Failed to delete user');
    }
  }

  async login(
    data: User
  ): Promise<{ success: boolean; token?: string; message?: string }> {
    const requestLoginDTO = UserMapper.toRequestLoginDTO(data);

    try {
      const response = await HttpClient.post(API_URLS.LOGIN, requestLoginDTO);
      return { success: true, token: response.token };
    } catch (error) {
      console.error('Error logging in:', error);
      return {
        success: false,
        message: 'Failed to log in',
      };
    }
  }

  logout(navigate: NavigateFunction): void {
    localStorage.removeItem('token');
    navigate(ROUTES.LOGIN);
  }
}

export const userRepository = new UserRepository();
