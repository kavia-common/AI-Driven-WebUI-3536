import { tr069MockData } from '../mockData/deviceMockData';
const isDevelopment = import.meta.env.DEV;
// Helper function to escape forward slashes in URLs
const escapeUrl = (url) => {
    return url.replace(/\//g, '\\/');
};
export const getTR069Config = async () => {
    if (isDevelopment) {
        return { ManagementServer: { ...tr069MockData } };
    }
    const response = await fetch('/API/info?list=ManagementServer');
    if (!response.ok) {
        throw new Error('Failed to fetch TR-069 configuration');
    }
    return response.json();
};
export const updateTR069Config = async (config) => {
    if (isDevelopment) {
        // Update mock data
        Object.assign(tr069MockData, config);
        return { ManagementServer: 'OK' };
    }
    // Create a new object without ConnectionRequestURL and escape URLs
    const { ConnectionRequestURL, ...configToSend } = {
        ...config,
        URL: escapeUrl(config.URL)
    };
    const response = await fetch('/API/info?list=ManagementServer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ManagementServer: configToSend
        })
    });
    if (!response.ok) {
        throw new Error('Failed to update TR-069 configuration');
    }
    return response.json();
};
export const sendInformToACS = async () => {
    if (isDevelopment) {
        return {
            ManagementServer: {
                OK: "sendInformMessage executed successfully"
            }
        };
    }
    const response = await fetch('/API/info?list=ManagementServer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ManagementServer: {
                events: "6 CONNECTION REQUEST",
                immediately: true,
                source: "XMPP"
            }
        })
    });
    if (!response.ok) {
        throw new Error('Failed to send inform message');
    }
    return response.json();
};
