export const wlanBasicMockData = {
    WlanBasic: {
        MLOEnable: 0,
        CommonSSIDEnable: 0,
        MeshEnable: 0,
        wifi2g: {
            Password: "password",
            SecurityMode: "WPA2-Personal",
            SSID: "prplOS",
            Enable: 1,
            SecurityModeAvailable: "None,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise"
        },
        wifi5g: {
            Password: "password",
            SecurityMode: "WPA2-Personal",
            SSID: "prplOS",
            Enable: 1,
            SecurityModeAvailable: "None,WPA-Personal,WPA2-Personal,WPA-WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal,WPA-Enterprise,WPA2-Enterprise,WPA-WPA2-Enterprise"
        },
        wifi6g: {
            Password: "password",
            SecurityMode: "WPA3-Personal",
            SSID: "prplOS",
            Enable: 1,
            SecurityModeAvailable: "None,WPA3-Personal"
        },
        wifimlo: {
            Password: "password",
            SecurityMode: "WPA3-Personal",
            SSID: "prplOS-MLO",
            Enable: 1,
            SecurityModeAvailable: "None,WPA3-Personal"
        }
    }
};
export const wlanAdvancedMockData = {
    WlanAdvanced: {
        MLOEnable: 1,
        wifi2g: {
            RadioEnable: 1,
            Mode: "n",
            Channel: "6",
            ChannelBandwidth: "20MHz",
            AutoChannelEnable: 0,
            ModeList: "b,g,n,bg,gn,bgn,ax",
            ChannelBandwidthList: "20MHz,40MHz",
            ChannelList: "1,2,3,4,5,6,7,8,9,10,11",
            Band: "2.4GHz"
        },
        wifi5g: {
            RadioEnable: 1,
            Mode: "ac",
            Channel: "128",
            ChannelBandwidth: "80MHz",
            AutoChannelEnable: 0,
            ModeList: "a,n,an,ac,ax",
            ChannelBandwidthList: "20MHz,40MHz,80MHz,160MHz",
            ChannelList: "36,40,44,48,52,56,60,64,100,104,108,112,116,120,124,128,132,136,140,144,149,153,157,161,165",
            Band: "5GHz"
        },
        wifi6g: {
            RadioEnable: 1,
            Mode: "ax",
            Channel: "37",
            ChannelBandwidth: "80MHz",
            AutoChannelEnable: 1,
            ModeList: "ax",
            ChannelBandwidthList: "20MHz,40MHz,80MHz,160MHz,320MHz",
            ChannelList: "1,187,5,9,13,17,21,25,29,33,37,41,45,49,53,57,61,65,69,73,77,81,85,89,93,97,101,105,109,113,117,121,125,129,133,137,141,145,149,153,157,161,165,169,173,177,181,185,189,193,197,201,205,209,213,217,221,225,229,233",
            Band: "6GHz"
        }
    }
};
// Simulate WPS pairing state
let wpsPairingState = "NotExecute";
let wpsPairingTimer = null;
export const wlanWpsMockData = {
    WlanWps: {
        Enable: 1,
        PINCode: "60668011",
        PairingResult: wpsPairingState,
        Band: [
            {
                Band: "2.4GHz",
                SSID: "prplOS-2G",
                AuthType: "WPA2-Personal",
                ConnectStatus: "Disabled",
                EncryType: "AES",
                Configured: "Not Configured"
            },
            {
                Band: "5GHz",
                SSID: "prplOS-5G",
                AuthType: "WPA2-Personal",
                ConnectStatus: "Disabled",
                EncryType: "AES",
                Configured: "Configured"
            }
        ]
    }
};
// Function to simulate WPS pairing process
export const simulateWpsPairing = (action) => {
    // Clear any existing timer
    if (wpsPairingTimer) {
        clearTimeout(wpsPairingTimer);
        wpsPairingTimer = null;
    }
    // Set state to in progress
    wpsPairingState = "PairingInprogress";
    wlanWpsMockData.WlanWps.PairingResult = wpsPairingState;
    // Simulate pairing completion after random time (5-10 seconds)
    const pairingTime = Math.floor(Math.random() * 5000) + 5000;
    wpsPairingTimer = window.setTimeout(() => {
        // 80% chance of success
        wpsPairingState = Math.random() < 0.8 ? "Success" : "NotSuccess";
        wlanWpsMockData.WlanWps.PairingResult = wpsPairingState;
        // Reset state after 30 seconds
        wpsPairingTimer = window.setTimeout(() => {
            wpsPairingState = "NotExecute";
            wlanWpsMockData.WlanWps.PairingResult = wpsPairingState;
            wpsPairingTimer = null;
        }, 30000);
    }, pairingTime);
    return { ...wlanWpsMockData };
};
// Update the getWlanWps function to return the current state
export const getWlanWpsMock = () => {
    return { ...wlanWpsMockData };
};
// Update the updateWlanWps function to handle actions
export const updateWlanWpsMock = (data) => {
    if (data.WlanWps.Enable !== undefined) {
        wlanWpsMockData.WlanWps.Enable = data.WlanWps.Enable;
    }
    if (data.WlanWps.Action) {
        return simulateWpsPairing(data.WlanWps.Action);
    }
    return { ...wlanWpsMockData };
};
export const wlanMeshMockData = {
    WlanMesh: {
        MeshEnable: 0,
        MLOEnable: 1,
        CommonSSID: "prplOS"
    }
};
