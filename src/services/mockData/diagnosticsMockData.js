export const diagnosticsMockData = {
    ManagementDiagnostic: {
        IPPing: {
            AverageResponseTimeDetailed: 5842,
            DataBlockSize: "64",
            DiagnosticsState: "Complete",
            FailureCount: "0",
            Host: "8.8.8.8",
            Interface: "eth0",
            MaximumResponseTimeDetailed: 6542,
            MinimumResponseTimeDetailed: 5383,
            NumberOfRepetitions: "5",
            ProtocolVersion: "IPv4",
            SuccessCount: "5",
            Timeout: "2"
        },
        TraceRoute: {
            DataBlockSize: "46",
            DiagnosticsState: "Complete",
            Host: "8.8.8.8",
            IPAddressUsed: "192.168.1.1",
            Interface: "eth0",
            MaxHopCount: "30",
            NumberOfTries: "3",
            ProtocolVersion: "IPv4",
            RouteHopsNumberOfEntries: "2",
            Timeout: "5000",
            RouteHops: [
                {
                    HostAddress: "192.168.1.1",
                    RTTimes: "10,12,15",
                    Host: "router.local",
                    ErrorCode: "0"
                },
                {
                    HostAddress: "8.8.8.8",
                    RTTimes: "50,52,49",
                    Host: "google-public-dns-a.google.com",
                    ErrorCode: "0"
                }
            ]
        },
        DNSLookup: {
            DNSServer: "8.8.8.8",
            DiagnosticsState: "Complete",
            HostName: "www.google.com",
            Interface: "eth0",
            NumberOfRepetitions: "1",
            ResultNumberOfEntries: "1",
            SuccessCount: "1",
            Timeout: "5",
            Result: [
                {
                    Status: "Success",
                    AnswerType: "A",
                    IPAddresses: "142.250.72.68",
                    HostNameReturned: "www.google.com",
                    ResponseTime: "50",
                    DNSServerIP: "8.8.8.8"
                }
            ]
        },
        Interfaces: [
            {
                Name: "eth0",
                IPv4Enable: true,
                IPv6Enable: false,
                Interface: "Device.IP.Interface.3."
            },
            {
                Name: "br-lan",
                IPv4Enable: true,
                IPv6Enable: true,
                Interface: "Device.IP.Interface.5."
            }
        ]
    }
};
