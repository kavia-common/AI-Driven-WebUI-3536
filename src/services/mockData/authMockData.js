export const loginMockData = {
    absoluteTimeout: 3600,
    loginAttempts: 0,
    idleTimeout: 600,
    sessionID: "dfcyPRISVuLeKSiNSGeJyotChGxdIeSpM9fkHOWmqbfv7gUvKCAFqSufdcirgJwF",
    wizardCheck: true
};
export const wizardMockData = {
    WizardRouter: {
        ModelName: "WREQ-130BE-PRPL",
        OpMode: "Gateway",
        Wan: {
            WANMode: "demo_wanmode",
            WANModeList: [
                "Cellular",
                "Cellular_IPv4",
                "Ethernet_DHCP",
                "Ethernet_PPP",
                "Ethernet_PPP6",
                "Ethernet_bridged",
                "GPON_DHCP",
                "GPON_PPP6",
                "GPON_bridged",
                "demo_wanmode"
            ]
        },
        WiFi: {
            CommonSSIDEnable: 1,
            MLOEnable: 1,
            MeshEnable: 1,
            MFPConfig: 1,
            PSC6g: 1,
            wificommon: {
                Enable: 1,
                SSID: "prplOS_prplmesh",
                SecurityMode: "WPA3-Personal",
                SecurityModeAvailable: "WPA3-Personal,WPA2-WPA3-Personal",
                Password: "password"
            },
            wifi2g: {
                Enable: 1,
                SSID: "prplOS_prplmesh",
                SecurityMode: "WPA2-WPA3-Personal",
                SecurityModeAvailable: "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal",
                Password: "password"
            },
            wifi5g: {
                Enable: 1,
                SSID: "prplOS_prplmesh",
                SecurityMode: "WPA2-WPA3-Personal",
                SecurityModeAvailable: "None,WPA2-Personal,WPA3-Personal,WPA2-WPA3-Personal",
                Password: "password"
            },
            wifi6g: {
                Enable: 1,
                SSID: "prplOS_prplmesh",
                SecurityMode: "WPA3-Personal",
                SecurityModeAvailable: "WPA3-Personal",
                Password: "password"
            }
        }
    }
};
