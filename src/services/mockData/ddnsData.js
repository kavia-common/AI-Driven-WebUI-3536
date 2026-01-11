export const ddnsData = {
    Ddns: {
        ServNum: 3,
        SupServProv: ["no-ip.com", "dyn.com"],
        Interfaces: ["eth0"],
        Service: [
            {
                ID: "no-1",
                ServProv: "no-ip.com",
                ServUsername: "user1",
                ServPassword: "password1",
                DomainName: "ddns1-1.com",
                UpdatedIP: "eth0",
                Status: "Registered",
                LastUpdate: "0001-01-01T00:00:00Z",
                HostEnable: 1
            },
            {
                ID: "no-2",
                ServProv: "dyn.com",
                ServUsername: "user2",
                ServPassword: "password2",
                DomainName: "ddns2-1.com",
                UpdatedIP: "eth0",
                Status: "Registered",
                LastUpdate: "0001-01-01T00:00:00Z",
                HostEnable: 1
            },
            {
                ID: "no-3",
                ServProv: "no-ip.com",
                ServUsername: "user3",
                ServPassword: "password3",
                DomainName: "ddns2-2.com",
                UpdatedIP: "eth0",
                Status: "Registered",
                LastUpdate: "0001-01-01T00:00:00Z",
                HostEnable: 1
            }
        ]
    }
};
