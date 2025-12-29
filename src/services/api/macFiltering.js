import { handleApiResponse } from '../../utils/apiUtils';
import { callApi } from '../apiClient';
const isDevelopment = import.meta.env.DEV;
// Mock data for development
const mockMACFilteringData = {
    MACFiltering: {
        wifi2g: [
            {
                Path: "WiFi.AccessPoint.1.",
                SSID: "Gemtek_prplmesh",
                ACLMode: "Off",
                MACList: "00:11:22:33:44:55, 00:11:22:33:44:66"
            },
            {
                Path: "WiFi.AccessPoint.2.",
                SSID: "prplOS-guest",
                ACLMode: "BlackList",
                MACList: ""
            }
        ],
        wifi5g: [
            {
                Path: "WiFi.AccessPoint.3.",
                SSID: "Gemtek_prplmesh_5GHz",
                ACLMode: "WhiteList",
                MACList: "AA:BB:CC:DD:EE:FF"
            },
            {
                Path: "WiFi.AccessPoint.4.",
                SSID: "prplOS-guest",
                ACLMode: "Off",
                MACList: ""
            }
        ],
        wifi6g: [
            {
                Path: "WiFi.AccessPoint.5.",
                SSID: "Gemtek_prplmesh_6GHz",
                ACLMode: "Off",
                MACList: ""
            },
            {
                Path: "WiFi.AccessPoint.6.",
                SSID: "prplOS-guest",
                ACLMode: "Off",
                MACList: ""
            }
        ]
    }
};
export const getMACFiltering = async () => {
    if (isDevelopment) {
        return mockMACFilteringData;
    }
    return callApi('/API/info?list=MACFiltering');
};
export const updateMACFiltering = async (data) => {
    if (isDevelopment) {
        console.log('Update MAC Filtering:', data);
        // Update mock data
        mockMACFilteringData.MACFiltering = {
            wifi2g: [...data.MACFiltering.wifi2g],
            wifi5g: [...data.MACFiltering.wifi5g],
            wifi6g: [...data.MACFiltering.wifi6g]
        };
        return mockMACFilteringData;
    }
    const response = await fetch('/API/info?list=MACFiltering', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return handleApiResponse(response);
};
