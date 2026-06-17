import { API_URLS } from '../../../constants/apiUrls';
import { TokenService } from '../../../services/token'; 

interface HttpClientOptions {
	method: string;
	headers?: Record<string, string>;
	body?: unknown;
}

const HttpClient = {
	request: async (url: string, options: HttpClientOptions) => {
		try {
            // 1. We detect if the body is a file/FormData
            const isFormData = options.body instanceof FormData;

            // 2. We prepare the base headers
            const headers: Record<string, string> = { ...options.headers };

            // --- AUTOMATIC REFACTORED TOKEN INJECTION ---
			// We use the abstraction of our service
            const token = TokenService.getToken(); 
            if (token) {
                // If it exists, we add it using the standard "Bearer" format
                headers['Authorization'] = `Bearer ${token}`;
            }
            // ----------------------------------------------------

			// 3. We ONLY inject 'application/json' if it is NOT a FormData
			// and if no other header has been manually specified.
            if (!isFormData && !headers['Content-Type']) {
                headers['Content-Type'] = 'application/json';
            }

            // 4. We prepare the body: if it's FormData it goes as is, otherwise, we make it a String
            const finalBody = isFormData 
                ? (options.body as FormData) 
                : (options.body ? JSON.stringify(options.body) : undefined);

			const response = await fetch(`${API_URLS.BASE_URL}${url}`, {
				method: options.method,
				headers: headers,
				body: finalBody
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'HTTP Request Failed');
			}

			return response.json(); 
		} catch (error) {
			console.error('HTTP Request Error:', error);
			throw error;
		}
	},

	get: (url: string, headers: Record<string, string> = {}) =>
		HttpClient.request(url, { method: 'GET', headers }),

	post: (url: string, body: unknown, headers: Record<string, string> = {}) =>
		HttpClient.request(url, { method: 'POST', headers, body }), 

	delete: (url: string, headers: Record<string, string> = {}) =>
		HttpClient.request(url, { method: 'DELETE', headers }),

	put: (url: string, body: unknown, headers: Record<string, string> = {}) =>
		HttpClient.request(url, { method: 'PUT', headers, body }),
};
export default HttpClient;