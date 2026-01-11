// Store cumulative values between calls
let lastValues = {
    bytesReceived: 1000000,
    bytesSent: 800000,
    lastTimestamp: Date.now()
};
export const getWanMockData = () => {
    const now = Date.now();
    const timeDiff = (now - lastValues.lastTimestamp) / 1000; // Convert to seconds
    // Simulate random fluctuations in transfer rate (100KB/s ~ 2MB/s)
    const rxRate = Math.floor(Math.random() * 1900 + 100) * 1024; // Convert to bytes
    const txRate = Math.floor(Math.random() * 1900 + 100) * 1024;
    // Calculate new cumulative values
    const newBytesReceived = lastValues.bytesReceived + (rxRate * timeDiff);
    const newBytesSent = lastValues.bytesSent + (txRate * timeDiff);
    // Update stored values
    lastValues = {
        bytesReceived: newBytesReceived,
        bytesSent: newBytesSent,
        lastTimestamp: now
    };
    return {
        BytesReceived: newBytesReceived,
        BytesSent: newBytesSent,
        PacketsReceived: Math.floor(newBytesReceived / 1500), // Assume average packet size of 1500 bytes
        PacketsSent: Math.floor(newBytesSent / 1500)
    };
};
