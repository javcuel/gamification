import { API_URLS } from '../constants/apiUrls';
import { ROLES } from '../constants/roles';
import StorageService from '../services/storageService';
import TokenService from '../services/tokenService';
import { DecodedToken } from '../types/DecodedToken';
import httpClient from './httpClient';

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

interface UserScoreResponse {
  score: number;
  stars: number;
}

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

export const getUserInfo = (): DecodedToken | null => {
  const token = StorageService.getItem('token');
  if (!token) {
    console.error('No token found for decoding.');
    return null;
  }
  return TokenService.decodeAndValidateToken(token);
};

export const fetchUserScore = async (): Promise<UserScoreResponse | null> => {
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
