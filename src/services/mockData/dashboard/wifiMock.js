let lastValues = {
    '2.4GHz': {
        bytesReceived: 1000000,
        bytesSent: 800000,
        lastTimestamp: Date.now() / 1000
    },
    '5GHz': {
        bytesReceived: 2000000,
        bytesSent: 1500000,
        lastTimestamp: Date.now() / 1000
    },
    '6GHz': {
        bytesReceived: 1500000,
        bytesSent: 1200000,
        lastTimestamp: Date.now() / 1000
    }
};
export const getWifiMockData = () => {
    const now = Date.now() / 1000;
    const response = [];
    Object.keys(lastValues).forEach((band, index) => {
        response.push({
            parameters: {
                OperatingFrequencyBand: band
            },
            path: `Device.WiFi.Radio.${index + 1}.`
        });
        const rxIncrement = Math.floor(Math.random() * 1900 + 100) * 1024;
        const txIncrement = Math.floor(Math.random() * 1900 + 100) * 1024;
        const timeDiff = now - lastValues[band].lastTimestamp;
        lastValues[band].bytesReceived += rxIncrement * timeDiff;
        lastValues[band].bytesSent += txIncrement * timeDiff;
        lastValues[band].lastTimestamp = now;
        response.push({
            parameters: {
                BytesReceived: Math.floor(lastValues[band].bytesReceived),
                BytesSent: Math.floor(lastValues[band].bytesSent)
            },
            path: `Device.WiFi.Radio.${index + 1}.Stats.`
        });
    });
    return response;
};
