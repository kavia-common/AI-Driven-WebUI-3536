export const sshServerData = {
    SshServer: {
        Interfaces: ["br-lan", "br-guest", "br-lcm", "eth0"],
        SshServers: [
            {
                ID: "lan",
                Interface: "br-lan",
                Status: "Enabled",
                AllowAllIPv4: 0,
                AllowAllIPv6: 1,
                AllowPasswordLogin: 1,
                AllowRootLogin: 1,
                AllowRootPasswordLogin: 1,
                AutoDisableDuration: 0,
                Enable: 1,
                IPv4AllowedSourcePrefix: "192.168.1.0/24",
                IPv6AllowedSourcePrefix: "",
                IdleTimeout: 0,
                KeepAlive: 0,
                MaxAuthTries: 10,
                Port: 22
            },
            {
                ID: "wan",
                Interface: "eth0",
                Status: "Disabled",
                AllowAllIPv4: 0,
                AllowAllIPv6: 0,
                AllowPasswordLogin: 0,
                AllowRootLogin: 0,
                AllowRootPasswordLogin: 0,
                AutoDisableDuration: 0,
                Enable: 0,
                IPv4AllowedSourcePrefix: "",
                IPv6AllowedSourcePrefix: "",
                IdleTimeout: 180,
                KeepAlive: 300,
                MaxAuthTries: 3,
                Port: 22
            }
        ]
    }
};
export const sshAuthorizedKeyData = {
    SshAuthorizedKey: [
        {
            Key: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC6vYrPvtYS4ZHAaBhgRtQYmu0fciB1Cbbp1a3rzVRdbVI+ANF7LDzU0BTMRhRH3Nzh+JhjjlCN0AOOBWVcksYZg2S9Ojzv/oAj/iXPlDhRL0zdFnB53NIeh7BMCiq/bf79162y/d2t0UQ5GAKRmVOY3Z4x+1KmtrdgCoX20At87vTYmeDleoxKqsjoxzVWcrm1yzxp9j/BKq8YybxvqhEROKUW60jqIdd7OCFxVInKYZ9Kv8v/e9qe6H6ZG7u/lo1kbLARVjkc8LJFBUl5AjU2dm82RAFpFjZOwHn2I1HVNfFq9q7BDNf7U0EMtFSBLxQq3EkHkj6guPO6Vci/G8Z3AJvVVO09hGVYuM3WCdIS49lbTFDlg/nXbHzbZEeoia1tC/4hyD2/8PdjCY7T37ZDzivs9crzu1Sve0aRgUOFZNCRxlcZ226lNkPYxiZ2UiWj7gv6NTQeFZyycobx5MZmzUCOjzRZJTyy9EtlHD5bbiyKa8rvRZOi/N/qx3GPpis= 23015421-NB01"
        },
        {
            Key: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCms0XZPEWSyjdFUjVqavN2yMipCkEWUwZKqPFhELb8EyOK4RJnTPAv/DbbyXKkKWzHyoJCjmPJm62JEOuqwJrNboikTK7o2KLFN8/6dWM4eCPwEE6wROL7zHIh5vLWHdlPmZgUik4aYHyHRypC2lkSssEGqJ7iQ+t4UXW9g+V5lp3v5jrt8oX1r2LlxS7uVXduKcetCRgzO+69Jj/TyT4tu68msfaD1qYzujQxyor+qApMSd9vt/AAmrUvEQfiEswazwow83bajlCJo1f7IUJyj4niWmUD7vdGrDWx4Dq7qFKVEuJHQQnNKE7JOlwZDj3FyRuz6Wh5kC5iv6nLkPf7 rsa-key-20240425"
        }
    ]
};
export const sshSessionData = {
    SshSession: [
        {
            User: "root",
            ClientIP: "192.168.1.122",
            ClientPort: 54567,
            ServerID: "lan",
            ServerPort: 22
        },
        {
            User: "root",
            ClientIP: "192.168.1.122",
            ClientPort: 55697,
            ServerID: "lan",
            ServerPort: 22
        }
    ]
};
