// Convert bytes to appropriate unit
export const formatDataRate = (bytesPerSecond) => {
    const bits = bytesPerSecond * 8; // Convert bytes to bits
    if (bits < 1000) {
        return { value: bits, unit: 'bps' };
    }
    else if (bits < 1000000) {
        return { value: bits / 1000, unit: 'Kbps' };
    }
    else if (bits < 1000000000) {
        return { value: bits / 1000000, unit: 'Mbps' };
    }
    else {
        return { value: bits / 1000000000, unit: 'Gbps' };
    }
};
// Calculate data rate from cumulative bytes
export const calculateDataRate = (current, previous, intervalSeconds) => {
    if (!previous) {
        return { rx: 0, tx: 0 };
    }
    // Calculate delta, handling counter resets (when current < previous)
    const rxDelta = current.rx >= previous.rx ? current.rx - previous.rx : current.rx;
    const txDelta = current.tx >= previous.tx ? current.tx - previous.tx : current.tx;
    // Convert to rate per second
    return {
        rx: rxDelta / intervalSeconds,
        tx: txDelta / intervalSeconds
    };
};
// Format timestamp for chart labels
export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};
// Prepare chart data from time series
export const prepareChartData = (timeSeriesData, maxPoints = 30) => {
    // Take only the most recent data points up to maxPoints
    const recentData = timeSeriesData.slice(-maxPoints);
    const labels = recentData.map(point => formatTimestamp(point.timestamp));
    const txData = recentData.map(point => point.tx);
    const rxData = recentData.map(point => point.rx);
    return {
        labels,
        datasets: [
            {
                label: 'Tx',
                data: txData,
                borderColor: 'rgba(0, 112, 187, 1)',
                backgroundColor: 'rgba(0, 112, 187, 0.2)',
                fill: true,
                tension: 0.4
            },
            {
                label: 'Rx',
                data: rxData,
                borderColor: 'rgba(116, 119, 191, 1)',
                backgroundColor: 'rgba(116, 119, 191, 0.2)',
                fill: true,
                tension: 0.4
            }
        ]
    };
};
// Determine the appropriate unit for y-axis based on current data
export const determineYAxisUnit = (dataRates) => {
    const maxRate = Math.max(...dataRates.map(rate => Math.max(rate.rx, rate.tx)));
    const { unit } = formatDataRate(maxRate);
    return unit;
};
// Convert data rates to the specified unit for consistent display
export const convertToUnit = (bytesPerSecond, targetUnit) => {
    const bits = bytesPerSecond * 8; // Convert bytes to bits
    switch (targetUnit) {
        case 'bps':
            return bits;
        case 'Kbps':
            return bits / 1000;
        case 'Mbps':
            return bits / 1000000;
        case 'Gbps':
            return bits / 1000000000;
        default:
            return bits / 1000000; // Default to Mbps
    }
};
