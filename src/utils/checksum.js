import { sha256 } from 'js-sha256';
export class ChecksumService {
    static async calculateChecksum(data) {
        if (crypto?.subtle) {
            // Use Web Crypto API if available
            try {
                const hashBuffer = await crypto.subtle.digest('SHA-256', data);
                return new Uint8Array(hashBuffer);
            }
            catch (error) {
                console.error('Error using Web Crypto API:', error);
            }
        }
        // Fallback to js-sha256
        const uint8ArrayData = new Uint8Array(data);
        const hashHex = sha256(uint8ArrayData);
        return ChecksumService.hexToUint8Array(hashHex);
    }
    static hexToUint8Array(hex) {
        const bytes = [];
        for (let i = 0; i < hex.length; i += 2) {
            bytes.push(parseInt(hex.substr(i, 2), 16));
        }
        return new Uint8Array(bytes);
    }
    static async addChecksumToFile(blob) {
        const arrayBuffer = await blob.arrayBuffer();
        const checksum = await this.calculateChecksum(arrayBuffer);
        return new Blob([new Uint8Array(arrayBuffer), checksum], { type: blob.type });
    }
    static async trimChecksumFromFile(file) {
        const arrayBuffer = await file.arrayBuffer();
        if (arrayBuffer.byteLength <= 32) {
            throw new Error('File is too small to contain a valid checksum.');
        }
        const fileContentWithoutChecksum = arrayBuffer.slice(0, -32);
        return new Blob([fileContentWithoutChecksum], { type: file.type });
    }
    static async validateChecksum(blob) {
        const arrayBuffer = await blob.arrayBuffer();
        if (arrayBuffer.byteLength <= 32) {
            throw new Error('File is too small to have a valid checksum.');
        }
        const fileData = new Uint8Array(arrayBuffer.slice(0, -32));
        const actualChecksum = new Uint8Array(arrayBuffer.slice(-32));
        const expectedChecksum = await this.calculateChecksum(fileData.buffer);
        return actualChecksum.every((byte, index) => byte === expectedChecksum[index]);
    }
}
