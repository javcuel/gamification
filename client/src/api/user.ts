import { useNavigate } from 'react-router-dom';

import { API_URLS } from '../constants/apiUrls';
import { ROLES } from '../constants/roles';
import { ROUTES } from '../constants/routes';
import StorageService from '../services/storageService';
import { Token, decodeToken } from '../services/token';
import httpClient from './httpClient';

const navigate = useNavigate();

export class User implements IUser {
  constructor(
    public id: number,
    public name: string,
    public type: (typeof ROLES)[keyof typeof ROLES],
    public totalScore: number,
    public completedSubjects: number
  ) {}
}

interface IUser {
  id: number;
  name: string;
  type: (typeof ROLES)[keyof typeof ROLES];
  totalScore: number;
  completedSubjects: number;
}

interface UserApiResponse {
  IDUsuario: number;
  Nombre: string;
  TipoUsuario: (typeof ROLES)[keyof typeof ROLES];
}

interface UserApiPayload {
  name: string;
  passwd: string;
  type: (typeof ROLES)[keyof typeof ROLES];
  group: string;
}

interface UserApiLoginPayload {
  name: string;
  passwd: string;
}

/* 
interface UserScoreResponse {
  score: number;
  stars: number;
} */

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const data = await httpClient.get(API_URLS.GET_USERS);
    return data.map((user: UserApiResponse) => ({
      id: user.IDUsuario,
      name: user.Nombre,
      type: user.TipoUsuario,
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};

export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await httpClient.delete(API_URLS.DELETE_USER(userId));
  } catch (error) {
    console.error(`Error deleting user (ID: ${userId}):`, error);
    throw new Error('Failed to delete user');
  }
};

export const createUser = async (payload: UserApiPayload): Promise<void> => {
  try {
    await httpClient.post(API_URLS.CREATE_USER, payload);
  } catch (error) {
    console.error('Error adding user:', error);
    throw new Error('Failed to add user');
  }
};

export const login = async (
  payload: UserApiLoginPayload
): Promise<{
  success: boolean;
  token?: string;
  message?: string;
}> => {
  try {
    //TODO: ESTO POR QUE ES UN POST, ANTES ERA UN POST HE PUESTO GET PERO NO SE
    const data = await httpClient.get(API_URLS.LOGIN, {
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
};

export const logout = (): void => {
  StorageService.removeItem('token');
  navigate(ROUTES.LOGIN);
};

export const getUserInfo = (): Token | null => {
  const token = StorageService.getItem('token');
  if (!token) {
    console.error('No token found for decoding.');
    return null;
  }
  return decodeToken(token);
};

/* export const fetchUserScore = async (): Promise<UserScoreResponse | null> => {
  try {
    const token = StorageService.getItem('token');
    if (!token) {
      console.error('No token available for authentication.');
      return null;
    }

    const response = await httpClient.get<>('/score/totalScore', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error('Error fetching user score:', error);
    return null;
  }
}; */
