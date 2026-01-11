import { AuthService } from '../auth';
const isDevelopment = import.meta.env.DEV;
export const restartDevice = async () => {
    if (isDevelopment) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { ManagementDeviceReset: 'OK' };
    }
    const auth = AuthService.getInstance();
    const sessionId = auth.getSessionId();
    if (!sessionId) {
        throw new Error('No active session');
    }
    const response = await fetch('/API/info?list=ManagementDeviceReset', {
        method: 'POST',
        headers: {
            'Authorization': `bearer ${sessionId}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "ManagementDeviceReset": {
                "Action": "Reboot",
                "Cause": "UserInitiated",
                "Reason": "Reboot triggered via Web UI"
            }
        })
    });
    if (!response.ok) {
        throw new Error('Failed to restart device');
    }
    return response.json();
};
export const factoryResetDevice = async () => {
    if (isDevelopment) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { ManagementDeviceReset: 'OK' };
    }
    const auth = AuthService.getInstance();
    const sessionId = auth.getSessionId();
    if (!sessionId) {
        throw new Error('No active session');
    }
    const response = await fetch('/API/info?list=ManagementDeviceReset', {
        method: 'POST',
        headers: {
            'Authorization': `bearer ${sessionId}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "ManagementDeviceReset": {
                "Action": "FactoryReset",
                "Cause": "UserInitiated",
                "Reason": "Factory Reset triggered via Web UI"
            }
        })
    });
    if (!response.ok) {
        throw new Error('Failed to factory reset device');
    }
    return response.json();
};
