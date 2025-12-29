import apiClient from '../apiClient';
import { portForwardingMockData } from '../mockData/portForwardingMockData';
const isDevelopment = import.meta.env.DEV;
export const portForwardingApi = {
    async getConfig() {
        if (isDevelopment) {
            return Promise.resolve(portForwardingMockData);
        }
        return apiClient.get('/API/info?list=PortForwarding');
    },
    async updateConfig(data) {
        if (isDevelopment) {
            portForwardingMockData.PortForwarding.PortForwardList = data.PortForwarding.PortForwardList;
            return Promise.resolve({ PortForwarding: { OK: 'Success' } });
        }
        return apiClient.post('/API/info?list=PortForwarding', data);
    }
};
