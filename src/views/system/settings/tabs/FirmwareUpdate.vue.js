import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { getFirmwareStatus, uploadFirmware, upgradeFirmware, activateFirmware } from '../../../../services/api/firmware';
import { useQA } from '../../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const router = useRouter();
const selectedFile = ref(null);
const loading = ref(false);
const error = ref(null);
const fileInput = ref(null);
const isDragging = ref(false);
const firmwareBanks = ref([]);
const uploadedFileName = ref(null);
const isUpgrading = ref(false);
const countdown = ref(60);
const countdownTimer = ref(null);
const isActivating = ref(false);
const isRebootPhase = ref(false);
const upgradeError = ref(null);
const showUpgradeError = ref(false);
const fetchFirmwareStatus = async () => {
    try {
        const response = await getFirmwareStatus();
        firmwareBanks.value = Object.values(response.UpgradeFw.UpgradeFw);
    }
    catch (err) {
        //    console.error('Error fetching firmware status:', err);
        error.value = 'Failed to fetch firmware status';
    }
};
// Check if activate button should be disabled
const isActivateDisabled = (bank) => {
    return bank.Status === 'Active' ||
        bank.Status === 'NoImage' ||
        bank.Switch_Status !== 'Available';
};
// Get status display text
const getStatusDisplay = (bank) => {
    if (bank.Switch_Status && bank.Switch_Status !== 'Available') {
        return bank.Switch_Status;
    }
    return bank.Status;
};
// Check if there's an upgrade error to display
const checkUpgradeError = async () => {
    try {
        const response = await getFirmwareStatus();
        const banks = Object.values(response.UpgradeFw.UpgradeFw);
        // Check if any bank has FW_UG_Status indicating an error (not Available or Upgrading)
        const errorBank = banks.find(bank => bank.FW_UG_Status &&
            bank.FW_UG_Status !== 'Available' &&
            bank.FW_UG_Status !== 'Upgrading' &&
            bank.FW_UG_Status !== 'Success');
        if (errorBank && errorBank.FW_UG_Status) {
            //      console.log('Upgrade error detected:', errorBank.FW_UG_Status);
            upgradeError.value = errorBank.FW_UG_Status;
            showUpgradeError.value = true;
            // Don't call clearUpgradeState here as it will reset showUpgradeError
            // Just ensure we're not in upgrading state
            isUpgrading.value = false;
            isActivating.value = false;
            isRebootPhase.value = false;
            if (countdownTimer.value) {
                clearInterval(countdownTimer.value);
                countdownTimer.value = null;
            }
        }
        else {
            //      console.log('No upgrade error found, banks:', banks.map(b => ({ alias: b.Alias, fwStatus: b.FW_UG_Status })));
        }
    }
    catch (err) {
        //    console.error('Error checking upgrade status:', err);
    }
};
const handleFileSelect = (event) => {
    const input = event.target;
    if (input.files && input.files.length > 0) {
        selectedFile.value = input.files[0];
        uploadedFileName.value = null;
    }
};
const handleDrop = (event) => {
    event.preventDefault();
    isDragging.value = false;
    if (event.dataTransfer?.files.length) {
        selectedFile.value = event.dataTransfer.files[0];
        uploadedFileName.value = null;
    }
};
const handleDragOver = (event) => {
    event.preventDefault();
    isDragging.value = true;
};
const handleDragLeave = (event) => {
    event.preventDefault();
    isDragging.value = false;
};
const startUpgradeCountdown = () => {
    isUpgrading.value = true;
    // 如果是「啟用分割槽」流程，直接進入重開機階段；否則先跑升級階段
    isRebootPhase.value = isActivating.value;
    // 先清掉舊的計時器（避免多重計時）
    if (countdownTimer.value) {
        clearInterval(countdownTimer.value);
        countdownTimer.value = null;
    }
    // 第一階段 60s（升級）→ 第二階段 100s（重開機）
    countdown.value = isRebootPhase.value ? 100 : 60;
    const tick = () => {
        countdown.value--;
        if (countdown.value <= 0) {
            if (countdownTimer.value) {
                clearInterval(countdownTimer.value);
                countdownTimer.value = null;
            }
            if (!isRebootPhase.value) {
                // 第一段結束 → 進入「重開機」第二段 100 秒
                isRebootPhase.value = true;
                countdown.value = 100;
                countdownTimer.value = window.setInterval(tick, 1000);
            }
            else {
                // 第二段結束 → 導回登入（或你要的頁面）
                router.push('/login');
            }
        }
    };
    countdownTimer.value = window.setInterval(tick, 1000);
};
const clearUpgradeState = () => {
    isUpgrading.value = false;
    isActivating.value = false;
    isRebootPhase.value = false;
    upgradeError.value = null;
    showUpgradeError.value = false;
    if (countdownTimer.value) {
        clearInterval(countdownTimer.value);
        countdownTimer.value = null;
    }
};
const handleActivate = async (bank) => {
    if (isActivateDisabled(bank))
        return;
    loading.value = true;
    error.value = null;
    isActivating.value = true;
    try {
        const bankNumber = Object.entries(firmwareBanks.value).find(([_, b]) => b === bank)?.[0];
        if (!bankNumber) {
            throw new Error('Invalid firmware bank');
        }
        await activateFirmware(parseInt(bankNumber) + 1);
        startUpgradeCountdown();
        await fetchFirmwareStatus();
    }
    catch (err) {
        //    console.error('Error activating firmware:', err);
        error.value = err instanceof Error ? err.message : 'Failed to activate firmware';
        clearUpgradeState();
    }
    finally {
        loading.value = false;
    }
};
const handleUpgrade = async () => {
    if (!selectedFile.value)
        return;
    loading.value = true;
    error.value = null;
    upgradeError.value = null;
    showUpgradeError.value = false;
    isActivating.value = false;
    try {
        // First upload the firmware file
        if (!uploadedFileName.value) {
            uploadedFileName.value = await uploadFirmware(selectedFile.value);
        }
        // Then perform the upgrade with autoActivate always true
        await upgradeFirmware(uploadedFileName.value, true);
        //    console.log('Upgrade command sent, checking for errors...');
        // Check for upgrade errors after a short delay
        // Use a Promise-based approach to ensure proper sequencing
        await new Promise((resolve) => {
            setTimeout(async () => {
                await checkUpgradeError();
                // Only start countdown if no upgrade error
                if (!showUpgradeError.value) {
                    //          console.log('No upgrade error detected, starting countdown');
                    // Clear file selection after successful upgrade
                    selectedFile.value = null;
                    uploadedFileName.value = null;
                    startUpgradeCountdown();
                }
                else {
                    //          console.log('Upgrade error detected, not starting countdown');
                }
                resolve();
            }, 3000);
        });
    }
    catch (err) {
        //    console.error('Error processing firmware:', err);
        error.value = err instanceof Error ? err.message : 'Failed to process firmware';
        clearUpgradeState();
    }
    finally {
        loading.value = false;
        // Refresh firmware status after everything
        if (!isUpgrading.value) {
            await fetchFirmwareStatus();
        }
    }
};
onMounted(fetchFirmwareStatus);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['status-indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['drop-zone']} */ ;
/** @type {__VLS_StyleScopedClasses['drop-zone']} */ ;
/** @type {__VLS_StyleScopedClasses['selected-file']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-clear']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-activate']} */ ;
/** @type {__VLS_StyleScopedClasses['error-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['error-content']} */ ;
/** @type {__VLS_StyleScopedClasses['error-content']} */ ;
/** @type {__VLS_StyleScopedClasses['drop-zone']} */ ;
/** @type {__VLS_StyleScopedClasses['drop-zone']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['drop-text']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['selected-file']} */ ;
/** @type {__VLS_StyleScopedClasses['file-name']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('firmware-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-section" },
    'data-testid': (__VLS_ctx.qa('firmware-panel')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-title" },
    'data-testid': (__VLS_ctx.qa('firmware-bank-title')),
});
(__VLS_ctx.t('firmware.firmwareBank'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "table-container" },
    'data-testid': (__VLS_ctx.qa('firmware-bank-table')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('firmware-bank-header-bank')),
});
(__VLS_ctx.t('firmware.firmwareBank'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('firmware-bank-header-status')),
});
(__VLS_ctx.t('firmware.status'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('firmware-bank-header-version')),
});
(__VLS_ctx.t('firmware.firmwareVersion'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('firmware-bank-header-action')),
});
(__VLS_ctx.t('firmware.action'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
for (const [bank, bankIndex] of __VLS_getVForSourceType((__VLS_ctx.firmwareBanks))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
        key: (bank.Alias),
        'data-testid': (__VLS_ctx.qa(`firmware-bank-row-${bankIndex}`)),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`firmware-bank-alias-${bankIndex}`)),
    });
    (bank.Alias);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "status-wrapper" },
        'data-testid': (__VLS_ctx.qa(`firmware-bank-status-wrapper-${bankIndex}`)),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "status-indicator" },
        ...{ class: ({ active: bank.Status === 'Active' }) },
        'data-testid': (__VLS_ctx.qa(`firmware-bank-status-indicator-${bankIndex}`)),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        'data-testid': (__VLS_ctx.qa(`firmware-bank-status-text-${bankIndex}`)),
    });
    (__VLS_ctx.getStatusDisplay(bank));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`firmware-bank-version-${bankIndex}`)),
    });
    (bank.Version || 'N/A');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    if (!__VLS_ctx.isActivateDisabled(bank)) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(!__VLS_ctx.isActivateDisabled(bank)))
                        return;
                    __VLS_ctx.handleActivate(bank);
                } },
            ...{ class: "btn btn-primary btn-activate" },
            'data-testid': (__VLS_ctx.qa(`firmware-bank-activate-button-${bankIndex}`)),
            disabled: (__VLS_ctx.isActivateDisabled(bank)),
        });
        (__VLS_ctx.t('firmware.activate'));
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            'data-testid': (__VLS_ctx.qa(`firmware-bank-no-action-${bankIndex}`)),
        });
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mobile-cards" },
    'data-testid': (__VLS_ctx.qa('firmware-bank-mobile')),
});
for (const [bank, bankIndex] of __VLS_getVForSourceType((__VLS_ctx.firmwareBanks))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-card" },
        key: (bank.Alias),
        'data-testid': (__VLS_ctx.qa(`firmware-bank-card-${bankIndex}`)),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-label" },
        'data-testid': (__VLS_ctx.qa(`firmware-bank-card-bank-label-${bankIndex}`)),
    });
    (__VLS_ctx.t('firmware.firmwareBank'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-value" },
        'data-testid': (__VLS_ctx.qa(`firmware-bank-card-bank-value-${bankIndex}`)),
    });
    (bank.Alias);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-label" },
        'data-testid': (__VLS_ctx.qa(`firmware-bank-card-status-label-${bankIndex}`)),
    });
    (__VLS_ctx.t('firmware.status'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-value" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "status-wrapper" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "status-indicator" },
        ...{ class: ({ active: bank.Status === 'Active' }) },
        'data-testid': (__VLS_ctx.qa(`firmware-bank-card-status-indicator-${bankIndex}`)),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        'data-testid': (__VLS_ctx.qa(`firmware-bank-card-status-text-${bankIndex}`)),
    });
    (bank.Status);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-label" },
        'data-testid': (__VLS_ctx.qa(`firmware-bank-card-version-label-${bankIndex}`)),
    });
    (__VLS_ctx.t('firmware.firmwareVersion'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-value" },
        'data-testid': (__VLS_ctx.qa(`firmware-bank-card-version-value-${bankIndex}`)),
    });
    (bank.Version || 'N/A');
    if (!__VLS_ctx.isActivateDisabled(bank)) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-actions" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(!__VLS_ctx.isActivateDisabled(bank)))
                        return;
                    __VLS_ctx.handleActivate(bank);
                } },
            ...{ class: "btn btn-primary btn-activate" },
            'data-testid': (__VLS_ctx.qa(`firmware-bank-card-activate-button-${bankIndex}`)),
        });
        (__VLS_ctx.t('firmware.activate'));
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "upload-section" },
    'data-testid': (__VLS_ctx.qa('firmware-upload-section')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-title" },
    'data-testid': (__VLS_ctx.qa('firmware-upload-title')),
});
(__VLS_ctx.t('firmware.uploadFirmware'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onDrop: (__VLS_ctx.handleDrop) },
    ...{ onDragover: (__VLS_ctx.handleDragOver) },
    ...{ onDragleave: (__VLS_ctx.handleDragLeave) },
    ...{ class: "drop-zone" },
    ...{ class: ({ dragging: __VLS_ctx.isDragging }) },
    'data-testid': (__VLS_ctx.qa('firmware-upload-drop-zone')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "drop-zone-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "material-icons" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "drop-text" },
    'data-testid': (__VLS_ctx.qa('firmware-upload-drop-text')),
});
(__VLS_ctx.t('firmware.dragAndDrop'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "separator" },
    'data-testid': (__VLS_ctx.qa('firmware-upload-separator-text')),
});
(__VLS_ctx.t('firmware.selectFromComputer'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (() => __VLS_ctx.fileInput?.click()) },
    ...{ class: "btn btn-secondary" },
    'data-testid': (__VLS_ctx.qa('firmware-upload-choose-file-button')),
});
(__VLS_ctx.t('firmware.chooseFile'));
if (__VLS_ctx.selectedFile) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "selected-file" },
        'data-testid': (__VLS_ctx.qa('firmware-upload-selected-file')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "file-name" },
        'data-testid': (__VLS_ctx.qa('firmware-upload-selected-file-name')),
    });
    (__VLS_ctx.selectedFile.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.selectedFile))
                    return;
                __VLS_ctx.selectedFile = null;
            } },
        ...{ class: "btn-clear" },
        'data-testid': (__VLS_ctx.qa('firmware-upload-clear-file-button')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    ...{ onChange: (__VLS_ctx.handleFileSelect) },
    type: "file",
    ref: "fileInput",
    'data-testid': (__VLS_ctx.qa('firmware-upload-file-input')),
    ...{ style: {} },
    accept: ".bin,.img,.swu",
});
/** @type {typeof __VLS_ctx.fileInput} */ ;
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-message" },
        'data-testid': (__VLS_ctx.qa('firmware-upload-error-message')),
    });
    (__VLS_ctx.error);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "button-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleUpgrade) },
    ...{ class: "btn btn-primary" },
    'data-testid': (__VLS_ctx.qa('firmware-upload-button')),
    disabled: (!__VLS_ctx.selectedFile || __VLS_ctx.loading),
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.loading ? __VLS_ctx.t('firmware.processing') : __VLS_ctx.t('firmware.updateFirmware'));
if (__VLS_ctx.isUpgrading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "upgrade-overlay" },
        'data-testid': (__VLS_ctx.qa('firmware-upgrade-overlay')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "upgrade-content" },
        'data-testid': (__VLS_ctx.qa('firmware-upgrade-content')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "spinner" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        'data-testid': (__VLS_ctx.qa('firmware-upgrade-status-text')),
    });
    (__VLS_ctx.isRebootPhase ? __VLS_ctx.t('firmware.rebooting') : (__VLS_ctx.isActivating ? __VLS_ctx.t('firmware.activating') : __VLS_ctx.t('firmware.upgrading')));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        'data-testid': (__VLS_ctx.qa('firmware-upgrade-warning-text')),
    });
    (__VLS_ctx.t('firmware.powerOffWarning'));
    if (__VLS_ctx.isRebootPhase) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            'data-testid': (__VLS_ctx.qa('firmware-upgrade-reboot-warning')),
        });
        (__VLS_ctx.t('firmware.rebootWarning'));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "countdown" },
        'data-testid': (__VLS_ctx.qa('firmware-upgrade-countdown')),
    });
    (__VLS_ctx.countdown);
}
if (__VLS_ctx.showUpgradeError) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-overlay" },
        'data-testid': (__VLS_ctx.qa('firmware-upgrade-error-overlay')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-content" },
        'data-testid': (__VLS_ctx.qa('firmware-upgrade-error-content')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-icon" },
        'data-testid': (__VLS_ctx.qa('firmware-upgrade-error-icon')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        'data-testid': (__VLS_ctx.qa('firmware-upgrade-error-title')),
    });
    (__VLS_ctx.t('firmware.upgradeFail'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        'data-testid': (__VLS_ctx.qa('firmware-upgrade-error-message')),
    });
    (__VLS_ctx.upgradeError);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.showUpgradeError))
                    return;
                __VLS_ctx.showUpgradeError = false;
                __VLS_ctx.upgradeError = null;
            } },
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('firmware-upgrade-error-close-button')),
    });
    (__VLS_ctx.t('common.close'));
}
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['status-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['status-indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-activate']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['table-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['status-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['status-indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-activate']} */ ;
/** @type {__VLS_StyleScopedClasses['upload-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['drop-zone']} */ ;
/** @type {__VLS_StyleScopedClasses['drop-zone-content']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['drop-text']} */ ;
/** @type {__VLS_StyleScopedClasses['separator']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['selected-file']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['file-name']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-clear']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['upgrade-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['upgrade-content']} */ ;
/** @type {__VLS_StyleScopedClasses['spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['countdown']} */ ;
/** @type {__VLS_StyleScopedClasses['error-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['error-content']} */ ;
/** @type {__VLS_StyleScopedClasses['error-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
            selectedFile: selectedFile,
            loading: loading,
            error: error,
            fileInput: fileInput,
            isDragging: isDragging,
            firmwareBanks: firmwareBanks,
            isUpgrading: isUpgrading,
            countdown: countdown,
            isActivating: isActivating,
            isRebootPhase: isRebootPhase,
            upgradeError: upgradeError,
            showUpgradeError: showUpgradeError,
            isActivateDisabled: isActivateDisabled,
            getStatusDisplay: getStatusDisplay,
            handleFileSelect: handleFileSelect,
            handleDrop: handleDrop,
            handleDragOver: handleDragOver,
            handleDragLeave: handleDragLeave,
            handleActivate: handleActivate,
            handleUpgrade: handleUpgrade,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
