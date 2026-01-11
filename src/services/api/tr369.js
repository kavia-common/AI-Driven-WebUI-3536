import { handleApiResponse } from '../../utils/apiUtils';
import { callApi } from '../apiClient';
import { tr369MockData } from '../mockData/tr369MockData';
const isDevelopment = import.meta.env.DEV;
export const getTR369Config = async () => {
    if (isDevelopment) {
        return tr369MockData;
    }
    return callApi('/API/info?list=TR369');
};
export const updateTR369Config = async (data) => {
    if (isDevelopment) {
        console.log('Update TR-369 config:', data);
        return getTR369Config();
    }
    const response = await fetch('/API/info?list=TR369', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return handleApiResponse(response);
};
