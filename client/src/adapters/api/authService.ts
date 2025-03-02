import StorageService from "../../services/storageService";
import HttpClient from "./httpClient";

/**
 * AuthService
 * @description Handles authentication-related API interactions.
 */
const AuthService = {
  /**
   * Sends a login request to the authentication API.
   * @async
   * @function loginRequest
   * @param {string} userName - The username entered by the user.
   * @param {string} userPasswd - The password entered by the user.
   * @returns {Promise<{success: boolean, token?: string, message?: string}>}
   * A promise that resolves to the login result.
   */
  loginRequest: async (
    userName: string,
    userPasswd: string
  ): Promise<{ success: boolean; token?: string; message?: string }> => {
    try {
      const response = await HttpClient.post(`/auth/login`, {
        userName,
        userPasswd,
      });

      if (response && response.token) {
        StorageService.setItem("token", response.token);
        return { success: true, token: response.token };
      }

      return {
        success: false,
        message: response.message || "Login Error",
      };
    } catch (error) {
      console.error("Login Request Error;", error);
      return { success: false, message: "Server Error" };
    }
  },

  /**
   * Logs the user out by clearing the JWT token.
   * @function logoutRequest
   */
  logoutRequest: (): void => {
    StorageService.removeItem("token");
  },
};

export default AuthService;
