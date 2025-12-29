import apiClient from '../apiClient';
import { cellularMockData } from '../mockData/cellularMockData';
const isDevelopment = import.meta.env.DEV;
export async function getCellularStatus() {
    if (isDevelopment) {
        return cellularMockData;
    }
    const response = await apiClient.get('/API/info?list=Cellular');
    return response;
}
export async function updateCellularConfig(config) {
    if (isDevelopment) {
        console.log('Mock: Updating cellular config', config);
        return;
    }
    await apiClient.post('/API/system', config);
}
