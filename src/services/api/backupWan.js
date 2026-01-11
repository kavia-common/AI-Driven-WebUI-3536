import { apiClient } from '../apiClient';
export const backupWanApi = {
    getConfig: () => apiClient.get('/API/info?list=BackupWAN'),
    updateConfig: (data) => apiClient.post('/API/info?list=BackupWAN', data)
};
