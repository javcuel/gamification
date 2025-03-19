import { API_URLS } from '../constants/apiUrls';
import StorageService from '../services/storageService';
import HttpClient from './httpClient';

export interface Auth {
  userName: string;
  userPasswd: string;
}

const AuthApi = {
  loginRequest: async ({
    userName,
    userPasswd,
  }: Auth): Promise<{
    success: boolean;
    token?: string;
    message?: string;
  }> => {
    try {
      const response = await HttpClient.post(API_URLS.LOGIN, {
        userName,
        userPasswd,
      });

      if (response && response.token) {
        StorageService.setItem('token', response.token);
        return { success: true, token: response.token };
      }

      return {
        success: false,
        message: response.message || 'Login Error',
      };
    } catch (error) {
      console.error('Login Request Error;', error);
      return { success: false, message: 'Server Error' };
    }
  },

  logoutRequest: (): void => {
    StorageService.removeItem('token');
  },
};

export default AuthApi;
