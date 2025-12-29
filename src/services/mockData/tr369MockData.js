export const tr369MockData = {
    TR369: {
        AgentEndpointID: "gemtek::prplos-SN4CBA7DC75961",
        Controller: [
            {
                Enable: 1,
                Alias: "friendly-tech",
                Status: "Connected",
                ControllerEndpointID: "self:ft:1",
                ControllerTopic: "/controller",
                AgentTopic: "/agent",
                BrokerAddress: "acs-dev.genixnetworks.cloud",
                BrokerPort: 18881,
                Username: "gemtek",
                Password: "gemtek1",
                ClientID: "",
                PeriodicNotify: 300,
                KeepAliveTime: 60,
                ConnectRetryTime: 5,
                ConnectRetryMaxInterval: 60,
                ProtocolVersion: "3.1.1",
                TransportProtocol: "TCP/IP"
            },
            {
                Enable: 1,
                Alias: "dcms",
                Status: "Connected",
                ControllerEndpointID: "GenixController",
                ControllerTopic: "Genix/v1/controller",
                AgentTopic: "Genix/v1/agent/gemtek::prplos-SN4CBA7DC75961",
                BrokerAddress: "10.5.88.149",
                BrokerPort: 1883,
                Username: "mqttuser",
                Password: "",
                ClientID: "gemtek::prplos-SN4CBA7DC75961",
                PeriodicNotify: 30,
                KeepAliveTime: 5,
                ConnectRetryTime: 5,
                ConnectRetryMaxInterval: 60,
                ProtocolVersion: "5.0",
                TransportProtocol: "TCP/IP"
            }
        ]
    }
};
