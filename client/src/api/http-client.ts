import { API_URLS } from '../constants/apiUrls';

interface HttpClientOptions {
	method: string;
	headers?: Record<string, string>;
	body?: unknown;
}

const HttpClient = {
	request: async (url: string, options: HttpClientOptions) => {
		try {
            // 1. Detectamos si el body es un archivo/FormData
            const isFormData = options.body instanceof FormData;

            // 2. Preparamos las cabeceras base
            const headers: Record<string, string> = { ...options.headers };

            // 3. SOLO inyectamos 'application/json' si NO es un FormData
            // y si no se ha especificado otra cabecera manualmente.
            if (!isFormData && !headers['Content-Type']) {
                headers['Content-Type'] = 'application/json';
            }

            // 4. Preparamos el body: si es FormData va tal cual, si no, lo hacemos String
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
		HttpClient.request(url, { method: 'PUT', headers, body })
};

export default HttpClient;