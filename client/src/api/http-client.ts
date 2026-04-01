import { API_URLS } from '../constants/apiUrls';

/**
 * Interface representing the options of a HttpRequest.
 *
 * @interface
 */
interface HttpClientOptions {
	method: string;
	headers?: Record<string, string>;
	body?: unknown;
}

/**
 * Performs an HTTP request.
 *
 * @param {string} url - The endpoint URL (relative to the base API URL).
 * @param {HttpClientOptions} options - The request options (method, headers, body).
 * @returns {Promise<any>} A promise that resolves with the response data.
 * @throws {Error} Throws an error if the request fails.
 */
const HttpClient = {
	request: async (url: string, options: HttpClientOptions) => {
		try {
			const response = await fetch(`${API_URLS.BASE_URL}${url}`, {
				method: options.method,
				headers: {
					'Content-Type': 'application/json',
					...options.headers
				},
				body: options.body ? JSON.stringify(options.body) : undefined
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'HTTP Request Failed');
			}

			return response.json(); // Here: Debug 
		} catch (error) {
			console.error('HTTP Request Error:', error);
			throw error;
		}
	},

	/**
	 * Sends a GET request.
	 *
	 * @param {string} url - The endpoint URL.
	 * @param {Record<string, string>} [headers={}] - Optional request headers.
	 * @returns {Promise<any>} A promise that resolves with the response data.
	 */
	get: (url: string, headers: Record<string, string> = {}) =>
		HttpClient.request(url, { method: 'GET', headers }),

	/**
	 * Sends a POST request.
	 *
	 * @param {string} url - The endpoint URL.
	 * @param {unknown} body - The request payload.
	 * @param {Record<string, string>} [headers={}] - Optional request headers.
	 * @returns {Promise<any>} A promise that resolves with the response data.
	 */
	post: (url: string, body: unknown, headers: Record<string, string> = {}) =>
		HttpClient.request(url, { method: 'POST', headers, body }), // Here: Debug

	/**
	 * Sends a DELETE request.
	 *
	 * @param {string} url - The endpoint URL.
	 * @param {Record<string, string>} [headers={}] - Optional request headers.
	 * @returns {Promise<any>} A promise that resolves when the deletion is successful.
	 */
	delete: (url: string, headers: Record<string, string> = {}) =>
		HttpClient.request(url, { method: 'DELETE', headers }),

	/**
	 * Sends a PUT request.
	 *
	 * @param {string} url - The endpoint URL.
	 * @param {unknown} body - The request payload.
	 * @param {Record<string, string>} [headers={}] - Optional request headers.
	 * @returns {Promise<any>} A promise that resolves with the updated response data.
	 */
	put: (url: string, body: unknown, headers: Record<string, string> = {}) =>
		HttpClient.request(url, { method: 'PUT', headers, body })
};

export default HttpClient;
