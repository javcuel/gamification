import StorageService from '../../services/storageService';
import TokenService from '../../services/tokenService';
import { DecodedToken } from '../../types/DecodedToken';
import HttpClient from './httpClient';

interface UserScoreResponse {
  score: number;
  stars: number;
}

/**
 * UserService
 * @description Handles operations related to the user, such as fetching user-specific data
 * and interacting with the backend API.
 */
const UserService = {
  /**
   * Decodes a JWT token to extract user information using TokenService.
   * @returns {DecodedToken | null} Decoded user information or null if the token is invalid or missing.
   */
  getUserInfo: (): DecodedToken | null => {
    const token = StorageService.getItem('token');
    if (!token) {
      console.error('No token found for decoding.');
      return null;
    }
    return TokenService.decodeAndValidateToken(token); // TODO: Mirar si hay que hacer un tipo usuario o algo asi, por que ahora mismo username y usertype son dos strings sin ningun tipo de restricción
  },

  /**
   * Fetches the user's score and stars from the backend API.
   * @returns {Promise<UserScoreResponse | null>} The user's score and stars, or null if an error occurs.
   */
  fetchUserScore: async (): Promise<UserScoreResponse | null> => {
    try {
      const token = StorageService.getItem('token'); // Obtén el token desde localStorage
      if (!token) {
        console.error('No token available for authentication.');
        return null;
      }

      // Usa HttpClient para hacer la solicitud y pasa el token para autenticación
      const response = await HttpClient.get('/score/totalScore', {
        Authorization: `Bearer ${token}`,
      });

      return response; // HttpClient maneja el parsing de la respuesta
    } catch (error) {
      console.error('Error fetching user score:', error);
      return null;
    }
  },
};

export default UserService;
