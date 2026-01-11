import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getWlanWps, updateWlanWps } from '../../../services/api/wireless';
import WpsVapInfo from './wps/WpsVapInfo.vue';
import WpsActions from './wps/WpsActions.vue';
import ConfirmationDialog from '../../../components/ConfirmationDialog.vue';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const wpsData = ref(null);
const tempWpsEnabled = ref(0);
const loading = ref(false);
const pairingInProgress = ref(false);
const pairingResult = ref(null);
const pollingInterval = ref(null);
const showConfirmDialog = ref(false);
const showSuccess = ref(false);
const fetchWpsConfig = async () => {
    loading.value = true;
    try {
        const data = await getWlanWps();
        wpsData.value = data;
        tempWpsEnabled.value = data.WlanWps.Enable;
        // Check pairing result status
        if (data.WlanWps.PairingResult === "PairingInprogress") {
            pairingInProgress.value = true;
            startPolling();
        }
        else if (data.WlanWps.PairingResult === "Success" || data.WlanWps.PairingResult === "NotSuccess") {
            pairingInProgress.value = false;
            pairingResult.value = data.WlanWps.PairingResult;
        }
        else {
            pairingInProgress.value = false;
            pairingResult.value = null;
        }
    }
    catch (error) {
        console.error('Error fetching WPS config:', error);
    }
    finally {
        loading.value = false;
    }
};
const startPolling = () => {
    // Clear any existing interval
    if (pollingInterval.value) {
        clearInterval(pollingInterval.value);
    }
    // Start polling every 3 seconds
    pollingInterval.value = window.setInterval(async () => {
        try {
            const data = await getWlanWps();
            wpsData.value = data;
            if (data.WlanWps.PairingResult !== "PairingInprogress") {
                // Stop polling when pairing is no longer in progress
                pairingInProgress.value = false;
                if (data.WlanWps.PairingResult === "Success" || data.WlanWps.PairingResult === "NotSuccess") {
                    pairingResult.value = data.WlanWps.PairingResult;
                }
                else {
                    pairingResult.value = null;
                }
                if (pollingInterval.value) {
                    clearInterval(pollingInterval.value);
                    pollingInterval.value = null;
                }
            }
        }
        catch (error) {
            console.error('Error polling WPS status:', error);
            // Stop polling on error
            if (pollingInterval.value) {
                clearInterval(pollingInterval.value);
                pollingInterval.value = null;
            }
            pairingInProgress.value = false;
        }
    }, 3000);
};
const handleEnableToggle = (enabled) => {
    tempWpsEnabled.value = enabled ? 1 : 0;
};
const handleApply = () => {
    // If enabling WPS, show confirmation dialog
    if (tempWpsEnabled.value === 1 && wpsData.value?.WlanWps.Enable === 0) {
        showConfirmDialog.value = true;
    }
    else {
        applyWpsConfig();
    }
};
const applyWpsConfig = async () => {
    loading.value = true;
    try {
        await updateWlanWps({
            WlanWps: {
                Enable: tempWpsEnabled.value
            }
        });
        await fetchWpsConfig();
        showSuccessMessage();
    }
    catch (error) {
        console.error('Error updating WPS enable state:', error);
    }
    finally {
        loading.value = false;
        showConfirmDialog.value = false;
    }
};
const handleCancel = () => {
    if (wpsData.value) {
        tempWpsEnabled.value = wpsData.value.WlanWps.Enable;
    }
};
const handlePairingComplete = () => {
    pairingResult.value = null;
};
const showSuccessMessage = () => {
    showSuccess.value = true;
    setTimeout(() => {
        showSuccess.value = false;
    }, 3000);
};
// Clean up interval when component is unmounted
onUnmounted(() => {
    if (pollingInterval.value) {
        clearInterval(pollingInterval.value);
        pollingInterval.value = null;
    }
});
onMounted(fetchWpsConfig);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['pairing-content']} */ ;
/** @type {__VLS_StyleScopedClasses['success-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['error-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['success-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['error-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['wireless-wps-config']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wireless-wps-config" },
    'data-testid': (__VLS_ctx.qa('wireless-wps-config-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wps-enable" },
    'data-testid': (__VLS_ctx.qa('wireless-wps-config-enable-section')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "switch-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    'data-testid': (__VLS_ctx.qa('wireless-wps-config-enable-label')),
});
(__VLS_ctx.t('wireless.wpsConfiguration'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "switch" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.handleEnableToggle($event.target.checked);
        } },
    type: "checkbox",
    'data-testid': (__VLS_ctx.qa('wireless-wps-config-enable-toggle')),
    checked: (__VLS_ctx.tempWpsEnabled === 1),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "slider" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "button-group" },
    'data-testid': (__VLS_ctx.qa('wireless-wps-config-button-group')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleCancel) },
    type: "button",
    ...{ class: "btn btn-secondary" },
    'data-testid': (__VLS_ctx.qa('wireless-wps-config-cancel-button')),
});
(__VLS_ctx.t('common.cancel'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleApply) },
    type: "button",
    ...{ class: "btn btn-primary" },
    'data-testid': (__VLS_ctx.qa('wireless-wps-config-apply-button')),
    disabled: (__VLS_ctx.loading),
});
(__VLS_ctx.t('common.apply'));
if (__VLS_ctx.wpsData?.WlanWps.Enable === 1) {
    /** @type {[typeof WpsActions, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(WpsActions, new WpsActions({
        ...{ 'onRefresh': {} },
        dataTestid: (__VLS_ctx.qa('wireless-wps-config-actions')),
        pinCode: (__VLS_ctx.wpsData.WlanWps.PINCode),
    }));
    const __VLS_1 = __VLS_0({
        ...{ 'onRefresh': {} },
        dataTestid: (__VLS_ctx.qa('wireless-wps-config-actions')),
        pinCode: (__VLS_ctx.wpsData.WlanWps.PINCode),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_3;
    let __VLS_4;
    let __VLS_5;
    const __VLS_6 = {
        onRefresh: (__VLS_ctx.fetchWpsConfig)
    };
    var __VLS_2;
    /** @type {[typeof WpsVapInfo, ]} */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(WpsVapInfo, new WpsVapInfo({
        dataTestid: (__VLS_ctx.qa('wireless-wps-config-vap-info')),
        bands: (__VLS_ctx.wpsData.WlanWps.Band),
    }));
    const __VLS_8 = __VLS_7({
        dataTestid: (__VLS_ctx.qa('wireless-wps-config-vap-info')),
        bands: (__VLS_ctx.wpsData.WlanWps.Band),
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
}
if (__VLS_ctx.pairingInProgress) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "pairing-overlay" },
        'data-testid': (__VLS_ctx.qa('wireless-wps-config-pairing-overlay')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "pairing-content" },
        'data-testid': (__VLS_ctx.qa('wireless-wps-config-pairing-content')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "spinner" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        'data-testid': (__VLS_ctx.qa('wireless-wps-config-pairing-title')),
    });
    (__VLS_ctx.t('wireless.wpsStatus'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        'data-testid': (__VLS_ctx.qa('wireless-wps-config-pairing-text')),
    });
    (__VLS_ctx.t('diagnostics.processing'));
}
if (__VLS_ctx.pairingResult) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "pairing-overlay" },
        'data-testid': (__VLS_ctx.qa('wireless-wps-config-result-overlay')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "pairing-content result" },
        'data-testid': (__VLS_ctx.qa('wireless-wps-config-result-content')),
    });
    if (__VLS_ctx.pairingResult === 'Success') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "success-icon" },
            'data-testid': (__VLS_ctx.qa('wireless-wps-config-result-success-icon')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "error-icon" },
            'data-testid': (__VLS_ctx.qa('wireless-wps-config-result-error-icon')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        'data-testid': (__VLS_ctx.qa('wireless-wps-config-result-title')),
    });
    (__VLS_ctx.t('wireless.wpsStatus'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        'data-testid': (__VLS_ctx.qa('wireless-wps-config-result-text')),
    });
    (__VLS_ctx.pairingResult === 'Success' ? 'Connection successful' : 'Connection failed');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handlePairingComplete) },
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('wireless-wps-config-result-close-button')),
    });
    (__VLS_ctx.t('common.close'));
}
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
        'data-testid': (__VLS_ctx.qa('wireless-wps-config-success-message')),
    });
    (__VLS_ctx.t('common.apply'));
}
/** @type {[typeof ConfirmationDialog, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(ConfirmationDialog, new ConfirmationDialog({
    ...{ 'onConfirm': {} },
    ...{ 'onCancel': {} },
    dataTestid: (__VLS_ctx.qa('wireless-wps-config-confirmation-dialog')),
    isOpen: (__VLS_ctx.showConfirmDialog),
    title: (__VLS_ctx.t('wireless.enableWpsConfirm')),
    message: (__VLS_ctx.t('wireless.enableWpsMessage')),
}));
const __VLS_11 = __VLS_10({
    ...{ 'onConfirm': {} },
    ...{ 'onCancel': {} },
    dataTestid: (__VLS_ctx.qa('wireless-wps-config-confirmation-dialog')),
    isOpen: (__VLS_ctx.showConfirmDialog),
    title: (__VLS_ctx.t('wireless.enableWpsConfirm')),
    message: (__VLS_ctx.t('wireless.enableWpsMessage')),
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
let __VLS_13;
let __VLS_14;
let __VLS_15;
const __VLS_16 = {
    onConfirm: (__VLS_ctx.applyWpsConfig)
};
const __VLS_17 = {
    onCancel: (...[$event]) => {
        __VLS_ctx.showConfirmDialog = false;
    }
};
var __VLS_12;
/** @type {__VLS_StyleScopedClasses['wireless-wps-config']} */ ;
/** @type {__VLS_StyleScopedClasses['wps-enable']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['pairing-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['pairing-content']} */ ;
/** @type {__VLS_StyleScopedClasses['spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['pairing-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['pairing-content']} */ ;
/** @type {__VLS_StyleScopedClasses['result']} */ ;
/** @type {__VLS_StyleScopedClasses['success-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['error-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['success-message']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            WpsVapInfo: WpsVapInfo,
            WpsActions: WpsActions,
            ConfirmationDialog: ConfirmationDialog,
            qa: qa,
            t: t,
            wpsData: wpsData,
            tempWpsEnabled: tempWpsEnabled,
            loading: loading,
            pairingInProgress: pairingInProgress,
            pairingResult: pairingResult,
            showConfirmDialog: showConfirmDialog,
            showSuccess: showSuccess,
            fetchWpsConfig: fetchWpsConfig,
            handleEnableToggle: handleEnableToggle,
            handleApply: handleApply,
            applyWpsConfig: applyWpsConfig,
            handleCancel: handleCancel,
            handlePairingComplete: handlePairingComplete,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
