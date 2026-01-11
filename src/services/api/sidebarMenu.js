import { AuthService } from '../auth';
const isDevelopment = import.meta.env.DEV;
export const getSidebarMenu = async () => {
    if (isDevelopment) {
        return {
            SidebarMenu: {
                Apps: [
                    {
                        state: "active",
                        alias: "cpe-917362a3-86e8-5332-bcfd-a4223f0e65e6",
                        name: "arm32v7/streambow",
                        duid: "00000000-0000-5000-b000-000000000001"
                    }
                ],
                mode: "Gateway",
                language: {
                    available: ["en", "fr", "ja", "de", "zh-TW", "zh-CN", "ko"],
                    current: "en"
                },
                features: {
                    thread: true,
                    matter: false
                }
            }
        };
    }
    const auth = AuthService.getInstance();
    const sessionId = auth.getSessionId();
    try {
        const response = await fetch('/API/info?list=SidebarMenu', {
            headers: {
                ...(sessionId ? { 'Authorization': `bearer ${sessionId}` } : {})
            }
        });
        if (response.status === 401 || response.status === 403) {
            // Authentication error - redirect to login
            auth.clearSession();
            window.location.href = '/login';
            throw new Error(`Failed to fetch sidebar menu: ${response.status}`);
        }
        if (!response.ok) {
            throw new Error(`Failed to fetch sidebar menu: ${response.status}`);
        }
        return response.json();
    }
    catch (err) {
        console.error('Error fetching sidebar menu:', err);
        // Check if error message contains 403 or 401
        if (err instanceof Error &&
            (err.message.includes('403') ||
                err.message.includes('401') ||
                err.message.includes('Failed to fetch sidebar menu'))) {
            // Clear session and redirect to login
            auth.clearSession();
            window.location.href = '/login';
        }
        throw err;
    }
};
export const updateSidebarMenuLanguage = async (language) => {
    if (isDevelopment) {
        return {
            SidebarMenu: {
                Apps: [
                    {
                        state: "active",
                        alias: "cpe-917362a3-86e8-5332-bcfd-a4223f0e65e6",
                        name: "arm32v7/streambow",
                        duid: "00000000-0000-5000-b000-000000000001"
                    }
                ],
                mode: "Gateway",
                language: {
                    available: ["en", "fr", "ja", "de", "zh-TW", "zh-CN", "ko"],
                    current: language
                },
                features: {
                    thread: true,
                    matter: false
                }
            }
        };
    }
    const auth = AuthService.getInstance();
    const sessionId = auth.getSessionId();
    try {
        const response = await fetch('/API/info?list=SidebarMenu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(sessionId ? { 'Authorization': `bearer ${sessionId}` } : {})
            },
            body: JSON.stringify({
                SidebarMenu: {
                    language: {
                        current: language
                    }
                }
            })
        });
        if (response.status === 401 || response.status === 403) {
            // Authentication error - redirect to login
            auth.clearSession();
            window.location.href = '/login';
            throw new Error(`Failed to update sidebar menu language: ${response.status}`);
        }
        if (!response.ok) {
            throw new Error(`Failed to update sidebar menu language: ${response.status}`);
        }
        return response.json();
    }
    catch (err) {
        console.error('Error updating sidebar menu language:', err);
        // Check if error message contains 403 or 401
        if (err instanceof Error &&
            (err.message.includes('403') ||
                err.message.includes('401'))) {
            // Clear session and redirect to login
            auth.clearSession();
            window.location.href = '/login';
        }
        throw err;
    }
};
