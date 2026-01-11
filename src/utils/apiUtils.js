export class ApiError extends Error {
    status;
    statusText;
    constructor(message, status, statusText) {
        super(message);
        this.status = status;
        this.statusText = statusText;
        this.name = 'ApiError';
    }
}
export async function handleApiResponse(response) {
    if (!response.ok) {
        throw new ApiError('API request failed', response.status, response.statusText);
    }
    try {
        return await response.json();
    }
    catch (error) {
        throw new ApiError('Invalid JSON response');
    }
}
