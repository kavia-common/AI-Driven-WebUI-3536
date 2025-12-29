import apiClient from '../apiClient';
export const ipFilteringApi = {
    getConfig: async () => {
        return await apiClient.get('/API/info?list=IPFiltering');
    },
    updateConfig: async (config) => {
        await apiClient.post('/API/info?list=IPFiltering', config);
    }
};
