/**
 * HTTPClient
 * @description A reusable client for making HTTP requests with consistent behavior.
 */

const API_BASE_URL = "http://localhost:5000/api";

interface HttpClientOptions {
  method: string; // HTTP method: GET, POST, PUT, DELETE, etc.
  headers?: Record<string, string>; // Optional headers for the request.
  body?: any; // Optional body for POST/PUT requests.
}

const httpClient = {
  /**
   * Makes an HTTP request.
   * @param {string} url - The endpoint to call (relative to API_BASE_URL).
   * @param {HttpClientOptions} options - Options for the request (method, headers, body).
   * @returns {Promise<any>} - The parsed JSON response.
   */
  request: async (url: string, options: HttpClientOptions) => {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: options.method,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "HTTP Request Failed");
      }

      // Parse the JSON response if the request is successful.
      return response.json();
    } catch (error) {
      console.error("HTTP Request Error:", error);
      throw error; // Re-throw to let the caller handle it.
    }
  },

  /**
   * Shorthand for a GET request.
   * @param {string} url - The endpoint to call.
   * @param {Record<string, string>} headers - Optional headers for the GET request.
   * @returns {Promise<any>} - The parsed JSON response.
   */
  get: (url: string, headers: Record<string, string> = {}) =>
    httpClient.request(url, { method: "GET", headers }),

  /**
   * Shorthand for a POST request.
   * @param {string} url - The endpoint to call.
   * @param {any} body - The body of the POST request.
   * @param {Record<string, string>} headers - Optional headers for the POST request.
   * @returns {Promise<any>} - The parsed JSON response.
   */
  post: (url: string, body: any, headers: Record<string, string> = {}) =>
    httpClient.request(url, { method: "POST", headers, body }),

  /**
   * Shorthand for a DELETE request.
   * @param {string} url - The endpoint to call.
   * @param {Record<string, string>} headers - Optional headers for the DELETE request.
   * @returns {Promise<any>} - The parsed JSON response.
   */
  delete: (url: string, headers: Record<string, string> = {}) =>
    httpClient.request(url, { method: "DELETE", headers }),

  /**
   * Shorthand for a PUT request.
   * @param {string} url - The endpoint to call.
   * @param {any} body - The body of the PUT request.
   * @param {Record<string, string>} headers - Optional headers for the PUT request.
   * @returns {Promise<any>} - The parsed JSON response.
   */
  put: (url: string, body: any, headers: Record<string, string> = {}) =>
    httpClient.request(url, { method: "PUT", headers, body }),
};

export default httpClient;
