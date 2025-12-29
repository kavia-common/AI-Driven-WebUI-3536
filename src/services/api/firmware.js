import { AuthService } from '../auth';
const isDevelopment = import.meta.env.DEV;
export async function getFirmwareStatus() {
    if (isDevelopment) {
        return {
            UpgradeFw: {
                UpgradeFw: {
                    "1": {
                        Min_Allowed_Ver: "3.0.0.0",
                        BootFailureLog: "",
                        Switch_Status: "Available",
                        FW_UG_Status: "Available",
                        PRPL_Ver: "prplOS4.0",
                        BSP_Ver: "ath13.0",
                        Rollback: 0,
                        Name: "",
                        Available: 1,
                        Version: "1.0.0",
                        GTK_FW_Ver: "3.8.5",
                        Alias: "active",
                        Status: "Active"
                    },
                    "2": {
                        Min_Allowed_Ver: "3.0.0.0",
                        BootFailureLog: "",
                        Switch_Status: "Downgrade_not_allowed",
                        FW_UG_Status: "Available",
                        PRPL_Ver: "prplOS4.0",
                        BSP_Ver: "ath13.0",
                        Rollback: 0,
                        Name: "",
                        Available: 0,
                        Version: "",
                        GTK_FW_Ver: "2.8.5",
                        Alias: "inactive",
                        Status: "Available"
                    }
                }
            }
        };
    }
    const response = await fetch('/API/info?list=UpgradeFw');
    if (!response.ok) {
        throw new Error('Failed to fetch firmware status');
    }
    return response.json();
}
export async function uploadFirmware(file) {
    if (isDevelopment) {
        console.log('Mock firmware upload:', file.name);
        return file.name;
    }
    const auth = AuthService.getInstance();
    const sessionId = auth.getSessionId();
    if (!sessionId) {
        throw new Error('No active session');
    }
    const url = `/upload/${file.name}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `bearer ${sessionId}`,
            'Accept': 'application/json,text/javascript',
        },
        body: file
    });
    if (response.status !== 202) {
        throw new Error(`Firmware upload failed (Status: ${response.status})`);
    }
    return file.name;
}
export async function activateFirmware(bankNumber) {
    if (isDevelopment) {
        console.log('Mock firmware activation for bank:', bankNumber);
        return;
    }
    const auth = AuthService.getInstance();
    const sessionId = auth.getSessionId();
    if (!sessionId) {
        throw new Error('No active session');
    }
    const response = await fetch('/API/info?list=UpgradeFw', {
        method: 'POST',
        headers: {
            'Authorization': `bearer ${sessionId}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            UpgradeFw: {
                BankNumber: bankNumber
            }
        })
    });
    if (!response.ok) {
        throw new Error('Firmware activation failed');
    }
}
export async function upgradeFirmware(firmwareFile, autoActivate) {
    if (isDevelopment) {
        console.log('Mock firmware upgrade:', { firmwareFile, autoActivate });
        return;
    }
    const auth = AuthService.getInstance();
    const sessionId = auth.getSessionId();
    if (!sessionId) {
        throw new Error('No active session');
    }
    const payload = {
        command: "Device.DeviceInfo.FirmwareImage.[Alias=='active'].Download()",
        commandKey: "",
        sendresp: true,
        inputArgs: {
            URL: `file:///tmp/upload/${firmwareFile}`,
            AutoActivate: true
        }
    };
    const response = await fetch('/commands', {
        method: 'POST',
        headers: {
            'Authorization': `bearer ${sessionId}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    // if (!response.ok) {
    //   throw new Error('Firmware upgrade failed');
    // }
    // const result = await response.json();
    // if (result[0]?.failure?.errcode) {
    //   throw new Error(`Firmware upgrade failed: ${result[0].failure.errcode}`);
    // }
}
