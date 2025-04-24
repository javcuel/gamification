import { NavigateFunction } from 'react-router-dom';

import { API_URLS } from '../constants/apiUrls';
import { ROLES } from '../constants/roles';
import { ROUTES } from '../constants/routes';
import StorageService from '../services/storage-service';
import httpClient from './httpClient';

export class User implements IUser {
  constructor(
    public id: number,
    public name: string,
    public role: (typeof ROLES)[keyof typeof ROLES],
    public totalScore: number,
    public completedSubjects: number
  ) {}
}

interface IUser {
  id: number;
  name: string;
  role: (typeof ROLES)[keyof typeof ROLES];
  totalScore: number;
  completedSubjects: number;
}

interface UserApiResponse {
  IDUsuario: number;
  Nombre: string;
  TipoUsuario: (typeof ROLES)[keyof typeof ROLES];
  Puntuacion: number;
  Completado: number;
}

export interface UserApiPayload {
  name: string;
  passwd: string;
  role: (typeof ROLES)[keyof typeof ROLES];
  group: string;
}

interface UserApiLoginPayload {
  name: string;
  passwd: string;
}

interface UserScore {
  totalScore: number;
  completedSubjects: number;
}

interface UserScoreResponse {
  Puntacion: number;
  Completado: number;
}

export const UserApi = {
  getAll: async (): Promise<User[]> => {
    try {
      const data = await httpClient.get(API_URLS.GET_USERS);
      return data.map(
        (user: UserApiResponse) =>
          new User(
            user.IDUsuario,
            user.Nombre,
            user.TipoUsuario,
            user.Puntuacion,
            user.Completado
          )
      );
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  },
  getScore: async (userId: number): Promise<UserScore> => {
    try {
      const data = await httpClient.get(API_URLS.GET_USER_SCORE(userId));
      return data.map((user: UserScoreResponse) => ({
        totalScore: user.Puntacion,
        completedSubjects: user.Completado,
      }));
    } catch (error) {
      console.error(`Error fetching user (ID: ${userId}) score:`, error);
      throw new Error('Failed to fetch user score');
    }
  },

  /*TODO: UPDATE USER AQUI*/

  delete: async (userId: number): Promise<void> => {
    try {
      await httpClient.delete(API_URLS.DELETE_USER(userId));
    } catch (error) {
      console.error(`Error deleting user (ID: ${userId}):`, error);
      throw new Error('Failed to delete user');
    }
  },

  create: async (payload: UserApiPayload): Promise<void> => {
    try {
      await httpClient.post(API_URLS.CREATE_USER, payload);
    } catch (error) {
      console.error('Error creating new user:', error);
      throw new Error('Failed to create new user');
    }
  },

  login: async (
    payload: UserApiLoginPayload
  ): Promise<{
    success: boolean;
    token?: string;
    message?: string;
  }> => {
    try {
      const data = await httpClient.post(API_URLS.LOGIN, {
        name: payload.name,
        passwd: payload.passwd,
      });

      if (data && data.token) {
        StorageService.setItem('token', data.token);
        return { success: true, token: data.token };
      }

      return {
        success: false,
        message: data.message || 'Login Error',
      };
    } catch (error) {
      console.error('Login Request Error;', error);
      return { success: false, message: 'Server Error' };
    }
  },

  logout: (navigate: NavigateFunction): void => {
    StorageService.removeItem('token');
    navigate(ROUTES.LOGIN);
  },
};
