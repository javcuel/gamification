import StorageService from '../services/storageService';
import TokenService from '../services/tokenService';
import { DecodedToken } from '../types/DecodedToken';
import HttpClient from './httpClient';

interface UserScoreResponse {
  score: number;
  stars: number;
}

const UserService = {
  getUserInfo: (): DecodedToken | null => {
    const token = StorageService.getItem('token');
    if (!token) {
      console.error('No token found for decoding.');
      return null;
    }
    return TokenService.decodeAndValidateToken(token);
  },

  fetchUserScore: async (): Promise<UserScoreResponse | null> => {
    try {
      const token = StorageService.getItem('token');
      if (!token) {
        console.error('No token available for authentication.');
        return null;
      }

      const response = await HttpClient.get('/score/totalScore', {
        Authorization: `Bearer ${token}`,
      });

      return response;
    } catch (error) {
      console.error('Error fetching user score:', error);
      return null;
    }
  },
};

export default UserService;
