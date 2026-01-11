// Base nodes that will always be present
const baseNodes = [
    {
        Name: "Device-5d01",
        Mode: "Controller",
        ipv4: "192.168.1.1",
        MACAddress: "76:e2:f9:a5:5d:01",
        MediaType: "-",
        Upstream: "-",
        SupportedBand: "2.4G/5G/6G"
    },
    {
        Name: "Device-5d02",
        Mode: "Agent",
        ipv4: "192.168.1.2",
        MACAddress: "76:e2:f9:a5:5d:02",
        MediaType: "Wi-Fi",
        Upstream: "76:e2:f9:a5:5d:01",
        SupportedBand: "2.4G/5G"
    }
];
// Pool of potential dynamic nodes
const dynamicNodePool = [
    {
        Name: "Device-5d03",
        Mode: "Agent",
        ipv4: "192.168.1.3",
        MACAddress: "76:e2:f9:a5:5d:03",
        MediaType: "Ethernet",
        Upstream: "76:e2:f9:a5:5d:01",
        SupportedBand: "5G/6G"
    },
    {
        Name: "Device-5d04",
        Mode: "Agent",
        ipv4: "192.168.1.5",
        MACAddress: "76:e2:f9:a5:5d:04",
        MediaType: "Wi-Fi",
        Upstream: "76:e2:f9:a5:5d:03",
        SupportedBand: "5G/6G"
    },
    {
        Name: "Device-5da1",
        Mode: "Client",
        ipv4: "192.168.1.101",
        MACAddress: "76:e2:f9:a5:5d:a1",
        MediaType: "Wi-Fi",
        Upstream: "76:e2:f9:a5:5d:02"
    },
    {
        Name: "Device-5da2",
        Mode: "Client",
        ipv4: "192.168.1.102",
        MACAddress: "76:e2:f9:a5:5d:a2",
        MediaType: "Ethernet",
        Upstream: "76:e2:f9:a5:5d:02"
    },
    {
        Name: "Device-5da3",
        Mode: "Client",
        ipv4: "192.168.1.103",
        MACAddress: "76:e2:f9:a5:5d:a3",
        MediaType: "Wi-Fi",
        Upstream: "76:e2:f9:a5:5d:04"
    },
    {
        Name: "Device-5da4",
        Mode: "Client",
        ipv4: "192.168.1.104",
        MACAddress: "76:e2:f9:a5:5d:a4",
        MediaType: "Wi-Fi",
        Upstream: "76:e2:f9:a5:5d:02"
    },
    {
        Name: "Device-5da5",
        Mode: "Client",
        ipv4: "192.168.1.105",
        MACAddress: "76:e2:f9:a5:5d:a5",
        MediaType: "Wi-Fi",
        Upstream: "76:e2:f9:a5:5d:03"
    }
];
// Function to get random number of nodes from pool
const getRandomNodes = (pool, min, max) => {
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};
export const getMeshMockData = () => {
    // Always include base nodes
    const nodes = [...baseNodes];
    // Add 1-2 random agents
    const agents = getRandomNodes(dynamicNodePool.filter(node => node.Mode === 'Agent'), 1, 2);
    // Add 2-4 random clients
    const clients = getRandomNodes(dynamicNodePool.filter(node => node.Mode === 'Client'), 2, 4);
    return [...nodes, ...agents, ...clients];
};
