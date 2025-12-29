import { handleApiResponse } from '../../utils/apiUtils';
import { callApi } from '../apiClient';
const isDevelopment = import.meta.env.DEV;
const mockGeneralMacFilteringData = {
    MACFiltering: {
        Enable: true,
        WhiteList: [
            {
                No: 1,
                Comment: "012349",
                MACAddress: "00:11:22:33:44:99"
            },
            {
                No: 2,
                Comment: "88",
                MACAddress: "00:11:22:33:44:88"
            }
        ],
        BlackList: [
            {
                No: 1,
                Comment: "012345",
                MACAddress: "00:11:22:33:44:55"
            }
        ]
    }
};
export const getGeneralMacFiltering = async () => {
    if (isDevelopment) {
        return mockGeneralMacFilteringData;
    }
    return callApi('/API/info?list=MACFiltering');
};
export const updateGeneralMacFiltering = async (data) => {
    if (isDevelopment) {
        console.log('Update General MAC Filtering:', data);
        mockGeneralMacFilteringData.MACFiltering = {
            Enable: data.MACFiltering.Enable,
            WhiteList: [...data.MACFiltering.WhiteList],
            BlackList: [...data.MACFiltering.BlackList]
        };
        return mockGeneralMacFilteringData;
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
