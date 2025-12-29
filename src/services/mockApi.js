import { wanMockData } from './mockData/wanMockData';
import { lanMockData } from './mockData/lanMockData';
import { wlanMockData } from './mockData/wlanMockData';
import { statisticsMockData } from './mockData/statisticsMockData';
import { ntpMockData } from './mockData/ntpMockData';
import { getMeshMockData } from './mockData/dashboard/meshMock';
import { generateMockLogs } from './mockData/logMockData';
import { qosBandwidthMockData, qosRuleMockData } from './mockData/qosMockData';
import { mockBackupWANData } from './mockData/backupWanMockData';
export const getMockWanStatus = () => wanMockData;
export const getMockLanStatus = () => lanMockData;
export const getMockWlanStatus = () => wlanMockData;
export const getMockStatistics = () => statisticsMockData;
export const getMockNtp = () => ntpMockData;
export const getMockMeshMap = () => ({ MeshMap: getMeshMockData() });
export const getMockLogs = (request) => generateMockLogs(request?.StatusLog);
export const getMockQosBandwidth = () => qosBandwidthMockData;
export const getMockQosRule = () => qosRuleMockData;
export const getMockBackupWAN = () => mockBackupWANData;
export const updateMockNtp = (data) => {
    const servers = data.Ntp.NtpServers.split(',').map(s => s.trim());
    while (servers.length < 5)
        servers.push('');
    return {
        Ntp: {
            NtpServers: servers,
            NtpEnable: data.Ntp.NtpEnable,
            TimeZones: String(data.Ntp.REGION),
            DstEnable: 0,
            CurrentLocalTime: new Date().toISOString()
        }
    };
};
export const updateMockBackupWAN = (data) => {
    return {
        BackupWAN: {
            ...mockBackupWANData.BackupWAN,
            Enable: data.BackupWAN.Enable ? 1 : 0,
            WHCEnable: data.BackupWAN.WHCEnable ? 1 : 0,
            PhysicalType: data.BackupWAN.PhysicalType,
            WANHealthCheck: data.BackupWAN.WANHealthCheck.map(hc => ({
                ...hc,
                CheckMethod: hc.CheckMethod,
                Status: 'Disabled'
            }))
        }
    };
};
