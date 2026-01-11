export const qosBandwidthMockData = {
    QosBandwidth: {
        Enable: true,
        Bandwidth: {
            Download: 1000,
            Upload: 1000,
            Priority: {
                High: {
                    Min: 20,
                    Max: 60
                },
                Medium: {
                    Min: 60,
                    Max: 100
                },
                Low: {
                    Min: 5,
                    Max: 40
                },
                'Low-latency': {
                    Min: 15,
                    Max: 100
                }
            }
        }
    }
};
export const qosRuleMockData = {
    QosRule: {
        ApplicationTypeList: [
            {
                ApplicationType: 'HTTP',
                Port: '80',
                Protocol: 'TCP'
            },
            {
                ApplicationType: 'HTTPS',
                Port: '443',
                Protocol: 'TCP,UDP'
            },
            {
                ApplicationType: 'DNS',
                Port: '53',
                Protocol: 'TCP,UDP'
            },
            {
                ApplicationType: 'NTP',
                Port: '123',
                Protocol: 'UDP'
            },
            {
                ApplicationType: 'SMTP',
                Port: '25,465,587',
                Protocol: 'TCP'
            },
            {
                ApplicationType: 'POP3',
                Port: '110',
                Protocol: 'TCP'
            },
            {
                ApplicationType: 'POP3S',
                Port: '995',
                Protocol: 'TCP'
            },
            {
                ApplicationType: 'IMAP',
                Port: '143',
                Protocol: 'TCP'
            },
            {
                ApplicationType: 'IMAPS',
                Port: '993',
                Protocol: 'TCP'
            },
            {
                ApplicationType: 'SSH/SFTP',
                Port: '22',
                Protocol: 'TCP'
            },
            {
                ApplicationType: 'Telnet',
                Port: '23',
                Protocol: 'TCP'
            },
            {
                ApplicationType: 'RDP',
                Port: '3389',
                Protocol: 'TCP,UDP'
            },
            {
                ApplicationType: 'FTP',
                Port: '20,21',
                Protocol: 'TCP'
            },
            {
                ApplicationType: 'SIP',
                Port: '5060,5061',
                Protocol: 'TCP,UDP'
            },
            {
                ApplicationType: 'MQTT',
                Port: '1883',
                Protocol: 'TCP'
            },
            {
                ApplicationType: 'MQTTS',
                Port: '8883',
                Protocol: 'TCP'
            },
            {
                ApplicationType: 'LDAP',
                Port: '389',
                Protocol: 'TCP,UDP'
            },
            {
                ApplicationType: 'LDAPS',
                Port: '636',
                Protocol: 'TCP'
            },
            {
                ApplicationType: 'SNMP',
                Port: '161,162',
                Protocol: 'UDP'
            },
            {
                ApplicationType: 'Syslog',
                Port: '514,6514',
                Protocol: 'TCP,UDP'
            },
            {
                ApplicationType: 'Self-defined',
                Port: '',
                Protocol: 'TCP,UDP'
            }
        ],
        DeviceList: [
            {
                DeviceName: 'HOST-1',
                MACAddress: '00:11:22:33:44:55'
            },
            {
                DeviceName: 'HOST-2',
                MACAddress: '00:11:22:33:44:66'
            }
        ],
        ProtocolList: ['TCP', 'UDP', 'TCP,UDP'],
        PriorityList: ['High', 'Medium', 'Low', 'Low-latency'],
        RuleList: [
            {
                Order: 1,
                Type: 'Application',
                ApplicationName: 'HTTP',
                DeviceName: '',
                MACAddress: '',
                Port: '80',
                Protocol: 'TCP',
                Priority: 'High'
            },
            {
                Order: 2,
                Type: 'Application',
                ApplicationName: 'Web',
                DeviceName: '',
                MACAddress: '',
                Port: '80,443',
                Protocol: 'UDP',
                Priority: 'High'
            },
            {
                Order: 3,
                Type: 'Device',
                ApplicationName: '',
                DeviceName: 'HOST-2',
                MACAddress: '00:11:22:33:44:66',
                Port: '',
                Protocol: '',
                Priority: 'Low-latency'
            },
            {
                Order: 4,
                Type: 'Application',
                ApplicationName: 'Game',
                DeviceName: '',
                MACAddress: '',
                Port: '100-200',
                Protocol: 'TCP,UDP',
                Priority: 'Low'
            }
        ]
    }
};
