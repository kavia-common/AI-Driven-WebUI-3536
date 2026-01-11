import { handleApiResponse } from '../../utils/apiUtils';
import { callApi } from '../apiClient';
const API_URL = '/API/info';
const isDevelopment = import.meta.env.DEV;
// Mock data for development
const mockThreadStatus = {
    ThreadStatus: {
        'Border Router': {
            Status: 'Running',
            BorderAgentID: '063A592A354F752CA8BB7CB56804FC5B',
            MLE: {
                ExtendedMAC: '36E76645C489A6A4',
                Role: 'Leader',
                Rloc16: 'E400',
                Interface: 'wpan0',
                FirmwareVersion: 'SL-OPENTHREAD/2.4.5.0_GitHub-797150858; EFR32; Dec  2 2024 17:53:27',
                Dataset: {
                    Channel: 16,
                    ChannelMask: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
                    ExtendedPanId: "67F20416EC661321",
                    MeshLocalPrefix: "fddc:e818:f601:8e09::/64",
                    NetworkKey: "80DD708D25F4F8ED06285A11054A708C",
                    NetworkName: "OpenThread-0e0e",
                    PSKc: "73CBAD3301792B5B16E277D2A96B4573",
                    PanId: "0e0e",
                    TimeStamp: "0001-01-01T00:00:00Z",
                    SecurityPolicy: "672 onrc",
                    'Hex-encoded': "0e08000000000001000000030000104a0300001335060004001fffe0020867f20416ec6613210708fddce818f6018e09051080dd708d25f4f8ed06285a11054a708c030f4f70656e5468726561642d3065306501020e0e041073cbad3301792b5b16e277d2a96b45730c0402a0f7f8"
                },
                LeaderData: {
                    DataVersion: 132,
                    LeaderRouterID: 41,
                    PartitionID: 1620377767,
                    StableDataVersion: 232,
                    Weighting: 65
                },
                Stats: {
                    'TX Bytes': 14,
                    'RX Bytes': 649,
                    'TX Packets': 67,
                    'RX Packets': 7328,
                    'TX Dropped': 0,
                    'RX Dropped': 3,
                    'TX Errors': 0,
                    'RX Errors': 0
                }
            }
        }
    }
};
const mockThreadScan = {
    ThreadScan: {
        PANs: [
            {
                PanId: "A284",
                ExtendedMAC: "7A873573732EBD66",
                Channel: 20,
                RSSI: -45,
                LQI: 210
            },
            {
                PanId: "A284",
                ExtendedMAC: "7A873573732EBD66",
                Channel: 20,
                RSSI: -47,
                LQI: 212
            }
        ]
    }
};
const mockThreadConfiguration = {
    ThreadConfiguration: {
        Enable: true,
        ActiveDataset: {
            'Active Timestamp': 1,
            NetworkName: '039537586D59A5CF04DFA1886EED22F3',
            NetworkKey: 'TestActive',
            Channel: 15,
            ChannelMask: 134215680,
            PanId: 'A284',
            ExtPanId: 'CD771262388E44D1',
            MeshLocalPrefix: 'fdc2:621:75cd:8085::/64',
            PSKc: '2221C2F164EE5338A75F1BCE070EF146',
            SecurityPolicy: {
                AutonomousEnrollment: true,
                CommercialCommissioning: false,
                ExternalCommissioning: false,
                NativeCommissioning: false,
                NetworkKeyProvisioning: true,
                NonCcmRouters: true,
                ObtainNetworkKey: true,
                RotationTime: 672,
                Routers: true,
                TobleLink: true
            }
        },
        PendingDataset: {
            'Pending Timestamp': 1,
            Delay: 30000,
            'Active Timestamp': 2,
            NetworkName: '039537586D59A5CF04DFA1886EED22F3',
            NetworkKey: 'TestPending',
            Channel: 16,
            ChannelMask: 134215680,
            PanId: 'A284',
            ExtPanId: 'CD771262388E44D1',
            MeshLocalPrefix: 'fdc2:621:75cd:8085::/64',
            PSKc: '2221C2F164EE5338A75F1BCE070EF146',
            SecurityPolicy: {
                AutonomousEnrollment: true,
                CommercialCommissioning: false,
                ExternalCommissioning: false,
                NativeCommissioning: false,
                NetworkKeyProvisioning: true,
                NonCcmRouters: true,
                ObtainNetworkKey: true,
                RotationTime: 672,
                Routers: true,
                TobleLink: true
            }
        }
    }
};
const mockThreadCommissioner = {
    ThreadCommissioner: {
        Enable: true,
        Joiners: [
            {
                JoinerId: '*',
                Pskd: '123456',
                Timeout: 95.7
            },
            {
                JoinerId: 'cd771262388e44d1',
                Pskd: 'J01NME',
                Timeout: 76.8
            }
        ]
    }
};
const mockThreadTopology = {
    ThreadTopology: {
        Links: {
            '021909B2143C98B5_7A873573732EBD66': {
                Quality: {
                    LinkQualityIn: 3,
                    LinkQualityOut: 3,
                    RouteCost: 1
                },
                type: 'RouterLink'
            }
        },
        Nodes: {
            '021909B2143C98B5': {
                ClientId: 0,
                IPv6AddressList: [
                    'fdc2:621:75cd:8085:0:ff:fe00:fc11',
                    'fdc2:621:75cd:8085:0:ff:fe00:fc38',
                    'fdc2:621:75cd:8085:0:ff:fe00:fc10',
                    'fdc2:621:75cd:8085:0:ff:fe00:e400',
                    'fd82:97a7:e374:1:f0be:5ccf:f3cf:37d8',
                    'fdc2:621:75cd:8085:d4a:2b5a:b4af:e6ef',
                    'fe80::19:9b2:143c:98b5'
                ],
                Mode: {
                    FullNetworkData: true,
                    FullThreadDevice: true,
                    RxOnWhenIdle: true
                },
                Rloc16: 'E400',
                Role: 'Router',
                RouterId: 57
            },
            '7A873573732EBD66': {
                ClientId: 0,
                IPv6AddressList: [
                    'fd82:97a7:e374:1:c405:e9a7:a51e:7fbe',
                    'fdc2:621:75cd:8085:0:ff:fe00:fc00',
                    'fdc2:621:75cd:8085:0:ff:fe00:9400',
                    'fdc2:621:75cd:8085:1c7:622b:78c5:a004',
                    'fe80::7887:3573:732e:bd66'
                ],
                Mode: {
                    FullNetworkData: true,
                    FullThreadDevice: true,
                    RxOnWhenIdle: true
                },
                Rloc16: '9400',
                Role: 'Leader',
                RouterId: 37
            }
        }
    }
};
// Thread Status API
export const getThreadStatus = async () => {
    if (isDevelopment) {
        return mockThreadStatus;
    }
    return callApi(`${API_URL}?list=ThreadStatus`);
};
// Thread Scan API
export const scanThreadNetworks = async () => {
    if (isDevelopment) {
        return mockThreadScan;
    }
    return callApi(`${API_URL}?list=ThreadScan`);
};
// Thread Configuration API
export const getThreadConfiguration = async () => {
    if (isDevelopment) {
        return mockThreadConfiguration;
    }
    return callApi(`${API_URL}?list=ThreadConfiguration`);
};
export const updateThreadConfiguration = async (data) => {
    if (isDevelopment) {
        console.log('Update Thread Configuration:', data);
        return mockThreadConfiguration;
    }
    const response = await fetch(`${API_URL}?list=ThreadConfiguration`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return handleApiResponse(response);
};
// Thread Join Network API
export const joinThreadNetwork = async (data) => {
    if (isDevelopment) {
        console.log('Join Thread Network:', data);
        return {
            ThreadJoinNetwork: {
                Status: 'Join Success'
            }
        };
    }
    const response = await fetch(`${API_URL}?list=ThreadJoinNetwork`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return handleApiResponse(response);
};
// Thread Commissioner API
export const getThreadCommissioner = async () => {
    if (isDevelopment) {
        return mockThreadCommissioner;
    }
    return callApi(`${API_URL}?list=ThreadCommissioner`);
};
export const updateThreadCommissioner = async (data) => {
    if (isDevelopment) {
        console.log('Update Thread Commissioner:', data);
        // Update mock data based on operation
        if (data.ThreadCommissioner.Operation === 'Add') {
            mockThreadCommissioner.ThreadCommissioner.Joiners.push({
                JoinerId: data.ThreadCommissioner.JoinerId,
                Pskd: data.ThreadCommissioner.Pskd,
                Timeout: data.ThreadCommissioner.Timeout
            });
        }
        else if (data.ThreadCommissioner.Operation === 'Delete') {
            mockThreadCommissioner.ThreadCommissioner.Joiners = mockThreadCommissioner.ThreadCommissioner.Joiners.filter(joiner => joiner.JoinerId !== data.ThreadCommissioner.JoinerId);
        }
        mockThreadCommissioner.ThreadCommissioner.Enable = data.ThreadCommissioner.Enable;
        return mockThreadCommissioner;
    }
    const response = await fetch(`${API_URL}?list=ThreadCommissioner`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return handleApiResponse(response);
};
// Thread Topology API
export const getThreadTopology = async () => {
    if (isDevelopment) {
        return mockThreadTopology;
    }
    return callApi(`${API_URL}?list=ThreadTopology`);
};
