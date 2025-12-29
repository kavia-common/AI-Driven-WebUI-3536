import { handleApiResponse } from '../../utils/apiUtils';
import { callApi } from '../apiClient';
import { sshServerData, sshAuthorizedKeyData, sshSessionData } from '../mockData/sshData';
const isDevelopment = import.meta.env.DEV;
export async function getSshServers() {
    if (isDevelopment) {
        return sshServerData;
    }
    return callApi('/API/info?list=SshServer');
}
export async function updateSshServers(servers) {
    if (isDevelopment) {
        sshServerData.SshServer.SshServers = servers;
        return sshServerData;
    }
    const response = await fetch('/API/info?list=SshServer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ SshServer: servers }),
    });
    return handleApiResponse(response);
}
export async function getSshAuthorizedKeys() {
    if (isDevelopment) {
        return sshAuthorizedKeyData;
    }
    return callApi('/API/info?list=SshAuthorizedKey');
}
export async function updateSshAuthorizedKeys(keys) {
    if (isDevelopment) {
        sshAuthorizedKeyData.SshAuthorizedKey = keys;
        return sshAuthorizedKeyData;
    }
    const response = await fetch('/API/info?list=SshAuthorizedKey', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ SshAuthorizedKey: keys }),
    });
    return handleApiResponse(response);
}
export async function getSshSessions() {
    if (isDevelopment) {
        return sshSessionData;
    }
    return callApi('/API/info?list=SshSession');
}
