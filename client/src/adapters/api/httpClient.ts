const API_BASE_URL = 'http://localhost:5000/api';

interface HttpClientOptions {
  method: string;
  headers?: Record<string, string>;
  body?: any;
}

const httpClient = {
  request: async (url: string, options: HttpClientOptions) => {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: options.method,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
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
    httpClient.request(url, { method: 'GET', headers }),

  post: (url: string, body: any, headers: Record<string, string> = {}) =>
    httpClient.request(url, { method: 'POST', headers, body }),

  delete: (url: string, headers: Record<string, string> = {}) =>
    httpClient.request(url, { method: 'DELETE', headers }),

  put: (url: string, body: any, headers: Record<string, string> = {}) =>
    httpClient.request(url, { method: 'PUT', headers, body }),
};

export default httpClient;
