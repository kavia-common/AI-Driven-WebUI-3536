import { AuthService } from '../auth';
import { ChecksumService } from '../../utils/checksum';
const isDevelopment = import.meta.env.DEV;
export const backupConfiguration = async () => {
    if (isDevelopment) {
        return [
            {
                outputArgs: {
                    FileName: `${new Date().toISOString()}_user_backup.tar`,
                    CreationDate: new Date().toISOString(),
                    Alias: 'cpe-BackupFile-1',
                },
                executed: 'Device.X_PRPLWARE-COM_PersistentConfiguration.Backup()',
            },
        ];
    }
    const auth = AuthService.getInstance();
    const sessionId = auth.getSessionId();
    if (!sessionId)
        throw new Error('No active session');
    const modelResponse = await fetch('/API/dm?list=DeviceInfo.ModelName', {
        headers: {
            Authorization: `bearer ${sessionId}`,
        },
    });
    if (!modelResponse.ok)
        throw new Error('Failed to get device model name');
    const modelData = await modelResponse.json();
    const modelName = modelData['DeviceInfo.ModelName']?.ModelName || 'Unknown';
    const backupResponse = await fetch('/commands', {
        method: 'POST',
        headers: {
            Authorization: `bearer ${sessionId}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            command: 'Device.X_PRPLWARE-COM_PersistentConfiguration.Backup()',
            commandKey: '',
            sendresp: true,
            inputArgs: {
                Type: 'export',
            },
        }),
    });
    if (!backupResponse.ok)
        throw new Error('Failed to backup configuration');
    const backupData = await backupResponse.json();
    if (!backupData[0]?.outputArgs?.FileName)
        throw new Error('Invalid backup response');
    const downloadResponse = await fetch(`/download/${backupData[0].outputArgs.FileName}`, {
        headers: {
            Authorization: `bearer ${sessionId}`,
        },
    });
    if (!downloadResponse.ok)
        throw new Error('Failed to download backup file');
    const blob = await downloadResponse.blob();
    const fileWithChecksum = await ChecksumService.addChecksumToFile(blob);
    const backupFileName = `Gemtek_${modelName}.bin`;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(fileWithChecksum);
    link.download = backupFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    return [backupData[0]];
};
export const restoreConfiguration = async (file) => {
    if (!file.name.match(/^Gemtek_[\w\-]+(?: \(\d+\))?\.bin$/)) {
        throw new Error('Invalid file format! Expected format: Gemtek_<ModelName>.bin');
    }
    const isValid = await ChecksumService.validateChecksum(file);
    if (!isValid) {
        throw new Error('Invalid checksum! Configuration file is corrupted or tampered with.');
    }
    const fileWithoutChecksum = await ChecksumService.trimChecksumFromFile(file);
    if (isDevelopment) {
        console.log('Mock restore configuration:', file.name);
        return {
            outputArgs: {
                Status: 'Success',
            },
            executed: 'Device.X_PRPLWARE-COM_PersistentConfiguration.AddBackupFile()',
        };
    }
    const auth = AuthService.getInstance();
    const sessionId = auth.getSessionId();
    if (!sessionId)
        throw new Error('No active session');
    const addResponse = await fetch('/commands', {
        method: 'POST',
        headers: {
            Authorization: `bearer ${sessionId}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            command: 'Device.X_PRPLWARE-COM_PersistentConfiguration.AddBackupFile()',
            commandKey: '',
            sendresp: true,
            inputArgs: {
                FileName: 'user_backup.tar',
                Tag: 'Manual',
            },
        }),
    });
    if (!addResponse.ok) {
        const text = await addResponse.text();
        console.error('AddBackupFile() response:', text);
        throw new Error('Failed to add backup file');
    }
    const addData = await addResponse.json();
    const remoteFileName = addData[0]?.outputArgs?.FileName;
    const fileAlias = addData[0]?.outputArgs?.Alias;
    if (!remoteFileName || !fileAlias) {
        throw new Error('Invalid response from add backup file');
    }
    const formData = new FormData();
    formData.append('file', fileWithoutChecksum, remoteFileName);
    const uploadUrl = `/upload/${encodeURIComponent(remoteFileName)}`;
    const uploadResponse = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
            Authorization: `bearer ${sessionId}`,
        },
        body: formData,
    });
    if (!uploadResponse.ok) {
        throw new Error('Failed to upload backup file');
    }
    const restoreResponse = await fetch('/commands', {
        method: 'POST',
        headers: {
            Authorization: `bearer ${sessionId}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            command: 'Device.X_PRPLWARE-COM_PersistentConfiguration.Restore()',
            commandKey: '',
            sendresp: true,
            inputArgs: {
                Type: 'export',
                FileRef: fileAlias,
            },
        }),
    });
    if (!restoreResponse.ok) {
        throw new Error('Failed to restore configuration');
    }
    else {
        alert("Restore configuration Success");
    }
    setTimeout(() => {
        auth.clearSession();
        window.location.href = '/login';
    }, 1000);
    return restoreResponse.json();
};
