import { AuthService } from '../auth';
const isDevelopment = import.meta.env.DEV;
export const runSpeedTest = async () => {
    if (isDevelopment) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Return mock data with new format
        return {
            AppXperienceControl: {
                status_code: 300,
                data: {
                    download_udp: {
                        throughput: Math.floor(Math.random() * 1000) + 500
                    },
                    upload_udp: {
                        throughput: Math.floor(Math.random() * 500) + 200
                    },
                    ping: {
                        packet_loss: Math.random() < 0.8 ? 0 : Math.floor(Math.random() * 5),
                        min_echo_time: Math.floor(Math.random() * 10) + 10,
                        mean_echo_time: Math.floor(Math.random() * 10) + 15,
                        max_echo_time: Math.floor(Math.random() * 10) + 20
                    }
                }
            }
        };
    }
    const auth = AuthService.getInstance();
    const sessionId = auth.getSessionId();
    const response = await fetch('/API/info?list=AppXperienceControl', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(sessionId ? { 'Authorization': `bearer ${sessionId}` } : {})
        },
        body: JSON.stringify({ AppXperienceControl: "" })
    });
    if (response.status === 401 || response.status === 403) {
        // Authentication error - redirect to login
        auth.clearSession();
        window.location.href = '/login';
        throw new Error(`Authentication error: ${response.status}`);
    }
    if (!response.ok) {
        throw new Error(`Speed test failed with status: ${response.status}`);
    }
    return response.json();
};
