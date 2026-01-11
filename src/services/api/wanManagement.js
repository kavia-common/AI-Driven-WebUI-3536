import { handleApiResponse } from '../../utils/apiUtils';
import { wanManagementMockData } from '../mockData/wanManagementMockData';
import { callApi } from '../apiClient';
const isDevelopment = import.meta.env.DEV;
export async function getWanModeManagement() {
    if (isDevelopment) {
        return wanManagementMockData;
    }
    return callApi('/API/info?list=WanModeManagement');
}
export async function updateWanModeManagement(data) {
    if (isDevelopment) {
        // Update mock data while preserving Status
        wanManagementMockData.WanModeManagement = data.WanModeManagement.map(newConfig => {
            const existingConfig = wanManagementMockData.WanModeManagement.find(config => config.WANMode === newConfig.WANMode);
            return {
                ...newConfig,
                Status: existingConfig?.Status || 'Enabled'
            };
        });
        return wanManagementMockData;
    }
    const response = await fetch('/API/info?list=WanModeManagement', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return handleApiResponse(response);
}
