import httpClient from '../../../api/httpClient';
import { ROLES } from '../../../constants/roles';
import { API_URLS } from '../../../constants/apiUrls';

interface User {
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
