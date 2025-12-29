export const wanMockData = {
    StatusWan: {
        SensingPolicy: "AtBoot",
        OperationMode: "Manual",
        WANModeConfig: {
            Interfaces: [{
                    Duplex: "Full",
                    Type: "untagged",
                    PPPoEUserName: "",
                    VlanPriority: "0",
                    MACAddress: "86:D5:7F:63:17:98",
                    ipv6: [{
                            IPv6Address: "fe80::84d5:7fff:fe63:1798",
                            Prefix: "",
                            Gateway: "",
                            IPv6Type: "LLA",
                            Status: "Enabled",
                            DNSServer: ""
                        }, {
                            IPv6Address: "",
                            Prefix: "",
                            Gateway: "",
                            IPv6Type: "GUA_STATIC",
                            Status: "Error",
                            DNSServer: ""
                        }],
                    Name: "eth0",
                    ipv4: [{
                            DNSServer: "192.168.11.1",
                            Gateway: "192.168.11.1",
                            Status: "Enabled",
                            SubnetMask: "255.255.255.0",
                            IPv4Address: "192.168.11.3",
                            IPv4Mode: "DHCP"
                        }],
                    Speed: "1000",
                    VlanID: "100",
                    PPPoEPassword: "",
                    WanPort: "wan"
                }],
            DNSMode: "Dynamic",
            Status: "Enabled",
            PhysicalType: "Ethernet",
            Origin: "user",
            EnableSensing: "1"
        },
        WANMode: "demo_wanmode",
        SensingTimeout: "8"
    }
};
