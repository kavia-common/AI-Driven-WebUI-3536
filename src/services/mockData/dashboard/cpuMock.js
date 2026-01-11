export const getCpuMockData = () => ([
    {
        parameters: {
            CPUUsage: Math.floor(Math.random() * 100),
            ProcessNumberOfEntries: Math.floor(Math.random() * 150)
        },
        path: "Device.DeviceInfo.ProcessStatus."
    },
    {
        parameters: {
            Total: 256704512,
            Free: Math.floor(Math.random() * 256704512)
        },
        path: "Device.DeviceInfo.MemoryStatus."
    },
    {
        parameters: {
            Available: 1,
            Name: "active",
            Status: "Active"
        },
        path: "Device.DeviceInfo.FirmwareImage.1."
    }
]);
