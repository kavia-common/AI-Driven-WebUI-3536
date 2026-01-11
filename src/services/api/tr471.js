import { AuthService } from '../auth';
const isDevelopment = import.meta.env.DEV;
export const getTR471Config = async () => {
    if (isDevelopment) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            TR471: {
                Server: "192.168.99.100",
                Port: "25000",
                Role: "Receiver",
                MTU: "1500",
                DSCP: "0",
                Interface: "eth0",
                ProtocolVersion: "Any",
                RateAdjAlgorithm: "B",
                JumboFramesPermitted: 0,
                LocalInterfaceRateIncluded: 1,
                IPDVEnable: 0,
                FlowCount: "0",
                MaximumFlows: "0",
                EthernetPriority: "0",
                UDPPayloadContent: "zeroes",
                MaximumTestBandwidth: "0",
                StartSendingRate: "500",
                StartSendingRateIndex: "0",
                NumberTestSubIntervals: "5",
                NumberFirstModeTestSubIntervals: "0",
                TestSubInterval: "1000",
                StatusFeedbackInterval: "50",
                RetryThresh: "5",
                TestType: "Search",
                SeqErrThresh: "10",
                ReordDupIgnoreEnable: 1,
                LowerThresh: "30",
                UpperThresh: "90",
                SlowAdjThresh: "3",
                HighSpeedDelta: "10",
                AuthenticationEnabled: 1,
                AuthenticationCode: "",
                DiagnosticsState: "None",
                MaxIPLayerCapacity: "976.560000",
                LossRatioSummary: "0.007069",
                RTTRangeSummary: "0.005000",
                PDVRangeSummary: "0.040000",
                ListUDPPayloadContent: ["zeroes", "ones", "alternates0and1", "random"],
                ListTestType: ["Search", "Fixed"],
                ListProtocolVersion: ["Any", "IPv4", "IPv6"],
                ListInterface: ["eth0", "br-lan", "br-guest", "br-lcm", "lo", "lan1"],
                ListRateAdjAlgorithm: ["B", "C"],
                IncrementalResult: [
                    {
                        Index: 1,
                        IPLayerCapacity: "94.570000",
                        RTTRange: "0.001000",
                        PDVRange: "0.000000",
                        LossRatio: "0.000000"
                    },
                    {
                        Index: 2,
                        IPLayerCapacity: "294.000000",
                        RTTRange: "0.000000",
                        PDVRange: "0.000000",
                        LossRatio: "0.000000"
                    },
                    {
                        Index: 3,
                        IPLayerCapacity: "493.200000",
                        RTTRange: "0.000000",
                        PDVRange: "0.000000",
                        LossRatio: "0.000000"
                    },
                    {
                        Index: 4,
                        IPLayerCapacity: "692.400000",
                        RTTRange: "0.001000",
                        PDVRange: "0.001000",
                        LossRatio: "0.000000"
                    },
                    {
                        Index: 5,
                        IPLayerCapacity: "891.600000",
                        RTTRange: "0.002000",
                        PDVRange: "0.002000",
                        LossRatio: "0.000000"
                    }
                ]
            }
        };
    }
    const auth = AuthService.getInstance();
    const sessionId = auth.getSessionId();
    const response = await fetch('/API/info?list=TR471', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(sessionId ? { 'Authorization': `bearer ${sessionId}` } : {})
        }
    });
    if (response.status === 401 || response.status === 403) {
        auth.clearSession();
        window.location.href = '/login';
        throw new Error(`Authentication error: ${response.status}`);
    }
    if (!response.ok) {
        throw new Error(`Failed to fetch TR471 config: ${response.status}`);
    }
    return response.json();
};
export const runTR471Test = async (config) => {
    if (isDevelopment) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const mockResult = {
            TR471: {
                ...config,
                DiagnosticsState: "Complete",
                MaxIPLayerCapacity: (Math.random() * 100 + 900).toFixed(6),
                LossRatioSummary: (Math.random() * 0.05).toFixed(6),
                RTTRangeSummary: (Math.random() * 0.03).toFixed(6),
                PDVRangeSummary: (Math.random() * 0.05).toFixed(6),
                IncrementalResult: Array.from({ length: 5 }, (_, i) => ({
                    Index: i + 1,
                    IPLayerCapacity: ((i + 1) * 200 + Math.random() * 50).toFixed(6),
                    RTTRange: (Math.random() * 0.005).toFixed(6),
                    PDVRange: (Math.random() * 0.005).toFixed(6),
                    LossRatio: (Math.random() * 0.01).toFixed(6)
                }))
            }
        };
        return mockResult;
    }
    const auth = AuthService.getInstance();
    const sessionId = auth.getSessionId();
    const response = await fetch('/API/info?list=TR471', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(sessionId ? { 'Authorization': `bearer ${sessionId}` } : {})
        },
        body: JSON.stringify({ TR471: config })
    });
    if (response.status === 401 || response.status === 403) {
        auth.clearSession();
        window.location.href = '/login';
        throw new Error(`Authentication error: ${response.status}`);
    }
    if (!response.ok) {
        throw new Error(`TR471 test failed: ${response.status}`);
    }
    return response.json();
};
