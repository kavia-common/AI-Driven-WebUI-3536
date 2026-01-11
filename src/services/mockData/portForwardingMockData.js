export const portForwardingMockData = {
    PortForwarding: {
        WanList: ["eth0", "eth1", "ppp0"],
        ProtoList: ["Both", "TCP", "UDP"],
        PortForwardList: [
            {
                No: 1,
                Enable: true,
                Description: "Web Server",
                Protocol: "Both",
                Interface: "eth0",
                ExternalPortRange: "8888-8890",
                InternalPort: "8888",
                InternalIPAdress: "192.168.1.100"
            },
            {
                No: 2,
                Enable: true,
                Description: "FTP Server",
                Protocol: "TCP",
                Interface: "eth0",
                ExternalPortRange: "9000",
                InternalPort: "9002",
                InternalIPAdress: "192.168.1.150"
            },
            {
                No: 3,
                Enable: false,
                Description: "Game Server",
                Protocol: "UDP",
                Interface: "eth0",
                ExternalPortRange: "19999",
                InternalPort: "19999",
                InternalIPAdress: "192.168.1.200"
            },
            {
                No: 4,
                Enable: true,
                Description: "Remote Desktop",
                Protocol: "TCP",
                Interface: "eth1",
                ExternalPortRange: "3389",
                InternalPort: "3389",
                InternalIPAdress: "192.168.1.120"
            },
            {
                No: 5,
                Enable: true,
                Description: "SSH Access",
                Protocol: "TCP",
                Interface: "eth0",
                ExternalPortRange: "22",
                InternalPort: "22",
                InternalIPAdress: "192.168.1.110"
            }
        ]
    }
};
