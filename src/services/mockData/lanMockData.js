export const lanMockData = {
    StatusLan: [
        {
            MACAddress: "AE:19:FF:BC:D1:4D",
            ipv6: [
                {
                    IPv6Address: "fe80::ac19:ffff:febc:d14d",
                    Name: "LLA",
                    Status: "Enabled"
                }
            ],
            Name: "br-lan",
            MTU: "1500",
            ipv4: [
                {
                    Status: "Enabled",
                    IPv4Netmask: "255.255.255.0",
                    IPv4Address: "192.168.101.1",
                    Name: "lan"
                }
            ]
        },
        {
            MACAddress: "AE:19:FF:BC:D1:4E",
            ipv6: [],
            Name: "br-guest",
            MTU: "1500",
            ipv4: [
                {
                    Status: "Enabled",
                    IPv4Netmask: "255.255.255.0",
                    IPv4Address: "192.168.2.1",
                    Name: "guest"
                }
            ]
        },
        {
            MACAddress: "AE:19:FF:BC:D1:4F",
            ipv6: [
                {
                    IPv6Address: "fe80::ac19:ffff:febc:d14f",
                    Name: "LLA",
                    Status: "Enabled"
                }
            ],
            Name: "br-lcm",
            MTU: "1500",
            ipv4: [
                {
                    Status: "Enabled",
                    IPv4Netmask: "255.255.255.0",
                    IPv4Address: "192.168.3.1",
                    Name: "lcm"
                }
            ]
        }
    ]
};
