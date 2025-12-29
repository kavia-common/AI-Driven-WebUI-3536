import { handleApiResponse } from '../../utils/apiUtils';
import { callApi } from '../apiClient';
const isDevelopment = import.meta.env.DEV;
// Mock data for development
const mockExtenderData = {
    Extender: {
        ExtenderEnabled: {
            Enabled: 0
        },
        ExtenderRole: {
            Role: "Repeater"
        },
        ConnectionStatus: {
            "2.4GHz": {
                Status: "disconnected",
                SSID: "-",
                Security: "-"
            },
            "5GHz": {
                Status: "connected",
                SSID: "Gemtek_workshop_2025",
                Security: "WPA2-WPA3-Personal"
            },
            "6GHz": {
                Status: "disconnected",
                SSID: "-",
                Security: "-"
            }
        },
        Wps: {
            WpsPinCode: "12345678"
        }
    }
};
const mockScanResults = {
    ExtenderScan: [
        {
            SSID: "GJ1900_5G",
            Channel: 48,
            Band: "5GHz",
            Signal: "-54",
            Security: "WPA2-Personal"
        },
        {
            SSID: "GJ1900_2G",
            Channel: 1,
            Band: "2.4GHz",
            Signal: "-54",
            Security: "WPA2-Personal"
        },
        {
            SSID: "Gemtek_Wi-Fi7_6G_02918E",
            Channel: 1,
            Band: "6GHz",
            Signal: "-54",
            Security: "WPA3-Personal"
        }
    ]
};
export const getExtenderStatus = async () => {
    if (isDevelopment) {
        return mockExtenderData;
    }
    return callApi('/API/info?list=Extender');
};
export const updateExtenderSettings = async (data) => {
    if (isDevelopment) {
        // Update mock data based on the request
        if (data.Extender.Action === 'ExtenderEnable' && data.Extender.Enabled !== undefined) {
            mockExtenderData.Extender.ExtenderEnabled.Enabled = data.Extender.Enabled;
        }
        if (data.Extender.Role) {
            mockExtenderData.Extender.ExtenderRole.Role = data.Extender.Role;
        }
        return mockExtenderData;
    }
    const response = await fetch('/API/info?list=Extender', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return handleApiResponse(response);
};
export const scanNeighborAPs = async () => {
    if (isDevelopment) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return mockScanResults;
    }
    const response = await fetch('/API/info?list=ExtenderScan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ExtenderScan: {
                Action: "trigger_scan"
            }
        }),
    });
    return handleApiResponse(response);
};
export const connectToAP = async (data) => {
    if (isDevelopment) {
        // Update mock data based on the connection request
        const band = data.Extender.Band;
        if (band === "2.4GHz" || band === "5GHz" || band === "6GHz") {
            mockExtenderData.Extender.ConnectionStatus[band] = {
                Status: "connected",
                SSID: data.Extender.SSID,
                Security: data.Extender.Security
            };
        }
        return mockExtenderData;
    }
    const response = await fetch('/API/info?list=Extender', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return handleApiResponse(response);
};
export const triggerWPS = async () => {
    if (isDevelopment) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return mockExtenderData;
    }
    const response = await fetch('/API/info?list=Extender', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Extender: {
                Action: "WPSbtn"
            }
        }),
    });
    return handleApiResponse(response);
};
