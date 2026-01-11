import { handleApiResponse } from '../../utils/apiUtils';
import { getMockMeshMap } from '../mockApi';
import { callApi } from '../apiClient';
const isDevelopment = import.meta.env.DEV;
export async function getMeshMap() {
    if (isDevelopment) {
        return getMockMeshMap();
    }
    return callApi('/API/info?list=MeshMap');
}
export async function applySteeringControl(data) {
    const payload = {
        MeshMap: {
            StationMac: data.stationMac,
            TargetBssid: data.targetBssid,
            Band: data.band
        }
    };
    if (isDevelopment) {
        console.log('Steering control payload:', payload);
        return Promise.resolve();
    }
    const response = await fetch('/API/info?list=MeshMap', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    return handleApiResponse(response);
}
