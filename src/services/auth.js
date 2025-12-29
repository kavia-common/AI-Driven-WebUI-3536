import { loginMockData } from './mockData/authMockData';
import { wizardApi } from './api/wizard';
export class AuthService {
    static instance;
    sessionId = null;
    isDevelopment = import.meta.env.DEV;
    constructor() {
        // Try to restore session from localStorage
        this.sessionId = localStorage.getItem('sessionId');
    }
    static getInstance() {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }
    setSessionId(sessionId) {
        this.sessionId = sessionId;
        localStorage.setItem('sessionId', sessionId);
    }
    getSessionId() {
        return this.sessionId;
    }
    clearSession() {
        this.sessionId = null;
        localStorage.removeItem('sessionId');
        localStorage.removeItem('username');
    }
    isAuthenticated() {
        return !!this.sessionId;
    }
    async login(username, password) {
        try {
            // Use mock data in development
            if (this.isDevelopment) {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 500));
                // Simulate authentication check
                if (username === 'admin' && password === 'admin') {
                    this.setSessionId(loginMockData.sessionID);
                    localStorage.setItem('username', username);
                    // Check wizard status from wizard API
                    try {
                        const wizardData = await wizardApi.getWizardInfo();
                        if (wizardData.OpMode === 'Init') {
                            localStorage.setItem('wizardRequired', 'true');
                        }
                        else {
                            localStorage.removeItem('wizardRequired');
                        }
                    }
                    catch (err) {
                        console.warn('Failed to check wizard status:', err);
                    }
                    return true;
                }
                throw new Error('Invalid username or password');
            }
            // Production API call
            const response = await fetch('/session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            if (!response.ok) {
                throw new Error('Invalid username or password');
            }
            const data = await response.json();
            if (data.sessionID) {
                this.setSessionId(data.sessionID);
                localStorage.setItem('username', username);
                // Check wizard status from wizard API
                try {
                    const wizardData = await wizardApi.getWizardInfo();
                    if (wizardData.OpMode === 'Init') {
                        localStorage.setItem('wizardRequired', 'true');
                    }
                    else {
                        localStorage.removeItem('wizardRequired');
                    }
                }
                catch (err) {
                    console.warn('Failed to check wizard status:', err);
                }
                return true;
            }
            return false;
        }
        catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }
    needsWizard() {
        return localStorage.getItem('wizardRequired') === 'true';
    }
    clearWizardFlag() {
        localStorage.removeItem('wizardRequired');
    }
}
