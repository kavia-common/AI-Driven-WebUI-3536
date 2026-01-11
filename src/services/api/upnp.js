import { callApi } from '../apiClient';
import { handleApiResponse } from '../../utils/apiUtils';
const isDevelopment = import.meta.env.DEV;
const API_BASE_URL = '/API';
export async function getUpnpSettings() {
    if (isDevelopment) {
        return {
            ApplicationUpnp: {
                Enable: true,
                InterfaceOptions: [
                    { value: "Device.Logical.Interface.1.", label: "wan" },
                    { value: "Device.Logical.Interface.3.", label: "guest" },
                    { value: "Device.Logical.Interface.7.", label: "iptv" },
                    { value: "Device.Logical.Interface.2.", label: "lan" },
                    { value: "Device.Logical.Interface.4.", label: "lcm" },
                    { value: "Device.Logical.Interface.6.", label: "mgmt" },
                    { value: "Device.Logical.Interface.5.", label: "voip" },
                    { value: "Device.Logical.Interface.8.", label: "wan-cellular" }
                ],
                Interface: "Device.Logical.Interface.1.",
                PortMappings: [
                    {
                        Path: "Device.NAT.PortMapping.1.",
                        Description: "UPnP-Test",
                        ExternalPort: 18080,
                        Id: 1,
                        Origin: "UPnP",
                        InternalPort: 8080,
                        RemainingLeaseTime: 604199,
                        LeaseDuration: 604800,
                        RemoteHost: "",
                        Enable: true,
                        Interface: "Device.Logical.Interface.1",
                        Status: "Enabled",
                        InternalClient: "192.168.101.168",
                        Protocol: "TCP",
                        ExternalPortEnd: 0
                    }
                ],
                PortMappingStats: {
                    total: 1
                }
            }
        };
    }
    return callApi(`${API_BASE_URL}/info?list=ApplicationUpnp`);
}
export async function updateUpnpSettings(data) {
    if (isDevelopment) {
        return {
            ApplicationUpnp: {
                status: 'success'
            }
        };
    }
    const response = await fetch(`${API_BASE_URL}/info?list=ApplicationUpnp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return handleApiResponse(response);
}
