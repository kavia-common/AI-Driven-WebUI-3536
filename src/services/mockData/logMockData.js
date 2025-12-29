const generateLogEntries = () => {
    const entries = [
        {
            host: 'prplOS',
            ts: '2025 Oct 7 10:15:23',
            program: 'tr181-dhcpv6client',
            severity: 'Warning',
            raw: '2025 Oct 7 10:15:23 prplOS tr181-dhcpv6client: nm_popu - [!]Waiting for app:start - (_mod_netmodel_main@mod_netmodel.c:538)',
            message: 'nm_popu - [!]Waiting for app:start - (_mod_netmodel_main@mod_netmodel.c:538)',
            module: 'nm_popu'
        },
        {
            host: 'prplOS',
            ts: '2025 Oct 7 10:14:18',
            program: 'dnsmasq-dhcp',
            severity: 'Info',
            raw: '2025 Oct 7 10:14:18 prplOS dnsmasq-dhcp[1234]: DHCPACK(br-lan) 192.168.1.105 aa:bb:cc:dd:ee:ff',
            message: 'DHCPACK(br-lan) 192.168.1.105 aa:bb:cc:dd:ee:ff',
            module: 'dnsmasq-dhcp'
        },
        {
            host: 'prplOS',
            ts: '2025 Oct 7 10:13:45',
            program: 'kernel',
            severity: 'Error',
            raw: '2025 Oct 7 10:13:45 prplOS kernel: [Firewall] [DROP] IN=eth0 OUT= MAC=00:11:22:33:44:55',
            message: '[Firewall] [DROP] IN=eth0 OUT= MAC=00:11:22:33:44:55',
            module: 'kernel'
        },
        {
            host: 'prplOS',
            ts: '2025 Oct 7 10:12:30',
            program: 'wlan-manager',
            severity: 'Info',
            raw: '2025 Oct 7 10:12:30 prplOS wlan-manager: Client connected: MAC=11:22:33:44:55:66 SSID=MyNetwork',
            message: 'Client connected: MAC=11:22:33:44:55:66 SSID=MyNetwork',
            module: 'wlan-manager'
        },
        {
            host: 'prplOS',
            ts: '2025 Oct 7 10:11:15',
            program: 'lcm',
            severity: 'Info',
            raw: '2025 Oct 7 10:11:15 prplOS lcm: System status update completed',
            message: 'System status update completed',
            module: 'lcm'
        },
        {
            host: 'prplOS',
            ts: '2025 Oct 7 10:10:05',
            program: 'dnsmasq-dhcp',
            severity: 'Info',
            raw: '2025 Oct 7 10:10:05 prplOS dnsmasq-dhcp[1234]: DHCPDISCOVER(br-lan) 192.168.1.106',
            message: 'DHCPDISCOVER(br-lan) 192.168.1.106',
            module: 'dnsmasq-dhcp'
        },
        {
            host: 'prplOS',
            ts: '2025 Oct 7 10:09:42',
            program: 'wld',
            severity: 'Warning',
            raw: '2025 Oct 7 10:09:42 prplOS wld: WiFi channel changed to 36',
            message: 'WiFi channel changed to 36',
            module: 'wld'
        },
        {
            host: 'prplOS',
            ts: '2025 Oct 7 10:08:20',
            program: 'kernel',
            severity: 'Warning',
            raw: '2025 Oct 7 10:08:20 prplOS kernel: [Firewall] [ACCEPT] IN=br-lan OUT=eth0',
            message: '[Firewall] [ACCEPT] IN=br-lan OUT=eth0',
            module: 'kernel'
        },
        {
            host: 'prplOS',
            ts: '2025 Oct 7 10:07:33',
            program: 'tr181-dhcpv6client',
            severity: 'Info',
            raw: '2025 Oct 7 10:07:33 prplOS tr181-dhcpv6client: DHCPv6 lease renewed',
            message: 'DHCPv6 lease renewed',
            module: 'tr181-dhcpv6client'
        },
        {
            host: 'prplOS',
            ts: '2025 Oct 7 10:06:18',
            program: 'wlan-manager',
            severity: 'Info',
            raw: '2025 Oct 7 10:06:18 prplOS wlan-manager: Client disconnected: MAC=11:22:33:44:55:66',
            message: 'Client disconnected: MAC=11:22:33:44:55:66',
            module: 'wlan-manager'
        }
    ];
    return entries;
};
export const logMockData = {
    StatusLog: {
        categories: {
            lcm: {
                alias: 'lcm',
                pattern: '[^a-zA-Z](lcm|cthulhu|timingila)[^a-zA-Z]'
            },
            dhcp: {
                alias: 'dhcp',
                pattern: '(o|tr181-|dnsmasq-)?dhcp'
            },
            firewall: {
                alias: 'firewall',
                pattern: '(tr181-firewall: |kernel: \\[ *[0-9]+(\\\\.[0-9]+)?\\] \\[Firewall\\]  \\[)'
            },
            wifi: {
                alias: 'wifi',
                pattern: '((wld|wlan(-manager)?|(gmap-mod-)?ssw|csm): |kernel: .*wlan)'
            },
            system: {
                alias: 'system',
                pattern: ''
            }
        },
        matchCount: 144,
        source: '/var/log/messages',
        entries: generateLogEntries(),
        limitDefault: 500,
        count: 10,
        more: true,
        serverTime: new Date().toISOString(),
        limitMax: 50000
    }
};
export const generateMockLogs = (request) => {
    let entries = generateLogEntries();
    if (request?.categories && Object.keys(request.categories).length > 0) {
        entries = entries.filter(entry => {
            if (request.categories?.dhcp && entry.program.includes('dhcp'))
                return true;
            if (request.categories?.wifi && (entry.program.includes('wlan') || entry.program.includes('wld')))
                return true;
            if (request.categories?.firewall && entry.message.includes('Firewall'))
                return true;
            if (request.categories?.lcm && entry.program === 'lcm')
                return true;
            return false;
        });
    }
    if (request?.contains) {
        const keyword = request.contains.toLowerCase();
        entries = entries.filter(entry => entry.message.toLowerCase().includes(keyword) ||
            entry.program.toLowerCase().includes(keyword));
    }
    const limit = request?.limit || 100;
    const limitedEntries = entries.slice(0, limit);
    return {
        StatusLog: {
            categories: logMockData.StatusLog.categories,
            matchCount: entries.length,
            source: '/var/log/messages',
            entries: limitedEntries,
            limitDefault: 500,
            count: limitedEntries.length,
            more: entries.length > limit,
            serverTime: new Date().toISOString(),
            limitMax: 50000
        }
    };
};
