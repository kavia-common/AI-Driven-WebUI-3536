import { handleApiResponse } from '../../utils/apiUtils';
import { callApi } from '../apiClient';
import { wanModeSetupMockData } from '../mockData/wanSetupMockData';
const isDevelopment = import.meta.env.DEV;
export async function getWanModeSetup() {
    if (isDevelopment) {
        return wanModeSetupMockData;
    }
    return callApi('/API/info?list=WanModeSetup');
}
export async function updateWanModeSetup(data) {
    if (isDevelopment) {
        // Update mock data
        wanModeSetupMockData.WanModeSetup = {
            ...wanModeSetupMockData.WanModeSetup,
            ...data.WanModeSetup
        };
        return wanModeSetupMockData;
    }
    const response = await fetch('/API/info?list=WanModeSetup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return handleApiResponse(response);
}
