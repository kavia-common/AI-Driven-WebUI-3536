import { callApi } from '../apiClient';
import { handleApiResponse } from '../../utils/apiUtils';
const isDevelopment = import.meta.env.DEV;
const API_BASE_URL = '/API';
export async function getAccountSettings() {
    if (isDevelopment) {
        return {
            ManagementAccount: {
                Username: 'admin',
                MaxLength: 15,
                NoSpace: true,
                DMWritable: true,
                DMReadable: false
            }
        };
    }
    return callApi(`${API_BASE_URL}/info?list=ManagementAccount`);
}
export async function updateAccountPassword(data) {
    if (isDevelopment) {
        if (data.ManagementAccount.OldPassword === 'admin') {
            return {
                ManagementAccount: {
                    result: 'Success',
                    reason: ''
                }
            };
        }
        else {
            return {
                ManagementAccount: {
                    result: 'Fail',
                    reason: 'Old Password confirm fail'
                }
            };
        }
    }
    const response = await fetch(`${API_BASE_URL}/info?list=ManagementAccount`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return handleApiResponse(response);
}
