import type {
  WlanBasicResponse,
  WlanAdvancedResponse,
  WlanWpsResponse,
  WlanMeshResponse
} from '../../types/wireless';
import type { WlanBasicMultiGetResponse, WlanBasicMultiPostRequest } from '../../types/wlanBasicMulti';
import { handleApiResponse } from '../../utils/apiUtils';
import { callApi } from '../apiClient';
import {
  wlanBasicMockData,
  wlanAdvancedMockData,
  getWlanWpsMock,
  updateWlanWpsMock,
  wlanMeshMockData
} from '../mockData/wirelessMockData';

const API_URL = '/API/info';

const isDevelopment = import.meta.env.DEV;

export async function getWlanBasic(): Promise<WlanBasicResponse> {
  if (isDevelopment) {
    return wlanBasicMockData;
  }
  // const response = await fetch(`${API_URL}?list=WlanBasic`);
  // return handleApiResponse<WlanBasicResponse>(response);
  return callApi<WlanBasicResponse>(`${API_URL}?list=WlanBasic`);
}

export async function updateWlanBasic(data: Partial<WlanBasicResponse>): Promise<WlanBasicResponse> {
  if (isDevelopment) {
    return wlanBasicMockData;
  }
  const response = await fetch(`${API_URL}?list=WlanBasic`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleApiResponse<WlanBasicResponse>(response);
}

/**
 * PUBLIC_INTERFACE
 * Fetch Basic WLAN configuration in the new multi-SSID WlanGroup schema.
 */
export async function getWlanBasicMulti(): Promise<WlanBasicMultiGetResponse> {
  if (isDevelopment) {
    // Reuse legacy mock if multi mock isn't present; UI will normalize.
    return (wlanBasicMockData as unknown) as WlanBasicMultiGetResponse;
  }
  return callApi<WlanBasicMultiGetResponse>(`${API_URL}?list=WlanBasic`);
}

/**
 * PUBLIC_INTERFACE
 * Update Basic WLAN configuration in the new multi-SSID WlanGroup schema.
 */
export async function updateWlanBasicMulti(data: WlanBasicMultiPostRequest): Promise<unknown> {
  if (isDevelopment) {
    return data;
  }
  const response = await fetch(`${API_URL}?list=WlanBasic`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return handleApiResponse(response);
}

export async function getWlanAdvanced(): Promise<WlanAdvancedResponse> {
  if (isDevelopment) {
    return wlanAdvancedMockData;
  }
  return callApi<WlanAdvancedResponse>(`${API_URL}?list=WlanAdvanced`);
}

export async function updateWlanAdvanced(data: WlanAdvancedResponse): Promise<WlanAdvancedResponse> {
  if (isDevelopment) {
    // Transform the data to match the required format
    const transformedData = {
      WlanAdvanced: {
        wifi2g: {
          Mode: data.WlanAdvanced.wifi2g.Mode,
          Channel: data.WlanAdvanced.wifi2g.Channel.toString(),
          ChannelBandwidth: data.WlanAdvanced.wifi2g.ChannelBandwidth,
          AutoChannelEnable: data.WlanAdvanced.wifi2g.AutoChannelEnable.toString()
        },
        wifi5g: {
          Mode: data.WlanAdvanced.wifi5g.Mode,
          Channel: data.WlanAdvanced.wifi5g.Channel.toString(),
          ChannelBandwidth: data.WlanAdvanced.wifi5g.ChannelBandwidth,
          AutoChannelEnable: data.WlanAdvanced.wifi5g.AutoChannelEnable.toString()
        },
        wifi6g: {
          Mode: data.WlanAdvanced.wifi6g.Mode,
          Channel: data.WlanAdvanced.wifi6g.Channel.toString(),
          ChannelBandwidth: data.WlanAdvanced.wifi6g.ChannelBandwidth,
          AutoChannelEnable: data.WlanAdvanced.wifi6g.AutoChannelEnable.toString()
        }
      }
    };
    
    return wlanAdvancedMockData;
  }
  
  const response = await fetch(`${API_URL}?list=WlanAdvanced`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleApiResponse<WlanAdvancedResponse>(response);
}

export async function getWlanWps(): Promise<WlanWpsResponse> {
  if (isDevelopment) {
    return getWlanWpsMock();
  }

  return callApi<WlanWpsResponse>(`${API_URL}?list=WlanWps`);
}

export async function updateWlanWps(data: { WlanWps: { Enable?: number; Action?: string; ClientPIN?: number } }): Promise<WlanWpsResponse> {
  if (isDevelopment) {
    return updateWlanWpsMock(data);
  }
  const response = await fetch(`${API_URL}?list=WlanWps`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleApiResponse<WlanWpsResponse>(response);
}

export async function getWlanMesh(): Promise<WlanMeshResponse> {
  if (isDevelopment) {
    return wlanMeshMockData;
  }
  return callApi<WlanMeshResponse>(`${API_URL}?list=WlanMesh`);
}

export async function updateWlanMesh(data: WlanMeshResponse): Promise<WlanMeshResponse> {
  if (isDevelopment) {
    return wlanMeshMockData;
  }
  const response = await fetch(`${API_URL}?list=WlanMesh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleApiResponse<WlanMeshResponse>(response);
}