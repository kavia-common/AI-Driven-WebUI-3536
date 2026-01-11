export const wanManagementMockData = {
    WanModeManagement: [
        {
            WANMode: "demo_wanmode",
            Status: "Enabled",
            PhysicalType: "Ethernet",
            EnableSensing: 1,
            DNSMode: "Dynamic",
            IPv6DNSMode: "Dynamic",
            Interfaces: [
                {
                    Interface: "wan",
                    IPv4Mode: "dhcp4",
                    IPv6Mode: "dhcp6",
                    PPPoEUserName: "",
                    PPPoEPassword: "",
                    VLANType: "untagged",
                    VLANID: 100,
                    VLANPriority: 0
                }
            ]
        },
        {
            WANMode: "demo_ppp",
            Status: "Enabled",
            PhysicalType: "Ethernet",
            EnableSensing: 1,
            DNSMode: "Dynamic",
            IPv6DNSMode: "Dynamic",
            Interfaces: [
                {
                    Interface: "wan",
                    IPv4Mode: "ppp4",
                    IPv6Mode: "none",
                    PPPoEUserName: "username",
                    PPPoEPassword: "password",
                    VLANType: "untagged",
                    VLANID: 100,
                    VLANPriority: 0
                }
            ]
        },
        {
            WANMode: "demo_static",
            Status: "Enabled",
            PhysicalType: "Ethernet",
            EnableSensing: 1,
            DNSMode: "Static",
            IPv6DNSMode: "Dynamic",
            Interfaces: [
                {
                    Interface: "wan",
                    IPv4Mode: "static",
                    IPv6Mode: "none",
                    PPPoEUserName: "",
                    PPPoEPassword: "",
                    VLANType: "untagged",
                    VLANID: 100,
                    VLANPriority: 0,
                    StaticIPv4Address: {
                        DNSServers: "192.168.101.1",
                        DefaultRouter: "192.168.101.1",
                        IPv4Address: "192.168.101.1",
                        SubnetMask: "255.255.255.0"
                    },
                    StaticIPv6Address: {
                        DNSServers: "",
                        DefaultRouter: "",
                        IPv6Address: "",
                        PrefixLength: 0
                    }
                }
            ]
        },
        {
            WANMode: "demo_bridged",
            Status: "Enabled",
            PhysicalType: "Bridge",
            EnableSensing: 1,
            DNSMode: "Dynamic",
            IPv6DNSMode: "Dynamic",
            Interfaces: [
                {
                    Interface: "wan",
                    IPv4Mode: "none",
                    IPv6Mode: "none",
                    PPPoEUserName: "",
                    PPPoEPassword: "",
                    VLANType: "untagged",
                    VLANID: 100,
                    VLANPriority: 0
                }
            ]
        }
    ]
};
