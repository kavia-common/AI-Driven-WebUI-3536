/**
 * Extracts the comment from an SSH public key
 * @param key The full SSH public key string
 * @returns The extracted comment or empty string if no comment exists
 */
export function extractKeyComment(key) {
    const parts = key.trim().split(' ');
    return parts.length >= 3 ? parts[parts.length - 1] : '';
}
/**
 * Validates an SSH public key format
 * @param key The SSH public key string to validate
 * @returns boolean indicating if the key is valid
 */
export function isValidSshKey(key) {
    const parts = key.trim().split(' ');
    return parts.length >= 2 && parts[0].toLowerCase().includes('ssh-');
}
