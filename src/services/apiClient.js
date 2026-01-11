import { AuthService } from './auth';
export async function callApi(url, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };
    const auth = AuthService.getInstance();
    const sessionId = auth.getSessionId();
    if (sessionId) {
        headers.Authorization = `bearer ${sessionId}`;
    }
    try {
        const response = await fetch(url, {
            ...options,
            headers
        });
        if (response.status === 401 || response.status === 403) {
            // Authentication error - redirect to login
            auth.clearSession();
            window.location.href = '/login';
            throw new Error(`Authentication error: ${response.status}`);
        }
        if (!response.ok) {
            throw new Error(`API call failed: ${response.status}`);
        }
        return response.json();
    }
    catch (err) {
        // Check if error message contains 401 or 403
        if (err instanceof Error && (err.message.includes('401') || err.message.includes('403'))) {
            const auth = AuthService.getInstance();
            auth.clearSession();
            window.location.href = '/login';
        }
        throw err;
    }
}
const apiClient = {
    async get(url) {
        return callApi(url, { method: 'GET' });
    },
    async post(url, data) {
        return callApi(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },
    async put(url, data) {
        return callApi(url, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },
    async delete(url) {
        return callApi(url, { method: 'DELETE' });
    }
};
export { apiClient };
export default apiClient;
