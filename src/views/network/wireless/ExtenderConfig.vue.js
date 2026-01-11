import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { getExtenderStatus, updateExtenderSettings, scanNeighborAPs, connectToAP, triggerWPS } from '../../../services/api/extender';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const extenderData = ref(null);
const tempExtenderEnabled = ref(0);
const tempExtenderRole = ref("MeshAgent");
const scanResults = ref([]);
const loading = ref(false);
const scanning = ref(false);
const error = ref(null);
const showConnectModal = ref(false);
const selectedAP = ref(null);
const password = ref('');
const showSuccess = ref(false);
const successMessage = ref('');
const redirectCountdown = ref(null);
const redirectTimer = ref(null);
const redirectUrl = ref(null);
// Computed properties
const isExtenderEnabled = computed(() => extenderData.value?.Extender.ExtenderEnabled.Enabled === 1);
const extenderRole = computed(() => extenderData.value?.Extender.ExtenderRole.Role || 'MeshAgent');
const wpsPinCode = computed(() => extenderData.value?.Extender.Wps.WpsPinCode || '');
const connectionStatus = computed(() => extenderData.value?.Extender.ConnectionStatus || null);
// Fetch extender status
const fetchExtenderStatus = async () => {
    loading.value = true;
    error.value = null;
    try {
        extenderData.value = await getExtenderStatus();
        // Initialize temp values with current values
        tempExtenderEnabled.value = extenderData.value.Extender.ExtenderEnabled.Enabled;
        if (tempExtenderEnabled.value == 1) {
            tempExtenderRole.value = extenderData.value.Extender.ExtenderRole.Role;
        }
        else {
            tempExtenderRole.value = "MeshAgent"; // Add for init the Extender Role
        }
    }
    catch (err) {
        console.error('Error fetching extender status:', err);
        error.value = 'Failed to fetch extender status';
    }
    finally {
        loading.value = false;
    }
};
// Handle toggle extender enabled state (just updates the temp value)
const handleExtenderEnabledChange = (event) => {
    tempExtenderEnabled.value = event.target.checked ? 1 : 0;
};
// Handle role change (just updates the temp value)
const handleRoleChange = (event) => {
    tempExtenderRole.value = event.target.value;
};
// Apply configuration changes
const applyConfigChanges = async () => {
    loading.value = true;
    try {
        const response = await updateExtenderSettings({
            Extender: {
                Action: 'ExtenderEnable',
                Enabled: tempExtenderEnabled.value,
                Role: tempExtenderRole.value
            }
        });
        // Check if we need to redirect (mode switch)
        if (response.Extender && 'ip_address' in response.Extender && response.Extender.ip_address) {
            redirectUrl.value = `http://${response.Extender.ip_address}`;
            redirectCountdown.value = 10;
            // Start countdown for redirect
            if (redirectTimer.value) {
                clearInterval(redirectTimer.value);
            }
            redirectTimer.value = window.setInterval(() => {
                if (redirectCountdown.value !== null) {
                    redirectCountdown.value--;
                    if (redirectCountdown.value <= 0) {
                        clearInterval(redirectTimer.value);
                        window.location.href = redirectUrl.value;
                    }
                }
            }, 1000);
            showSuccessNotification(`${response.Extender.message}. Redirecting in ${redirectCountdown.value} seconds...`);
        }
        else {
            await fetchExtenderStatus();
            showSuccessNotification('Configuration updated successfully');
        }
    }
    catch (err) {
        console.error('Error updating extender configuration:', err);
        error.value = 'Failed to update extender configuration';
    }
    finally {
        loading.value = false;
    }
};
// Cancel configuration changes
const cancelConfigChanges = () => {
    if (extenderData.value) {
        tempExtenderEnabled.value = extenderData.value.Extender.ExtenderEnabled.Enabled;
        tempExtenderRole.value = extenderData.value.Extender.ExtenderRole.Role;
    }
};
// Scan for neighbor APs
const handleScan = async () => {
    scanning.value = true;
    error.value = null;
    try {
        const response = await scanNeighborAPs();
        scanResults.value = response.ExtenderScan;
    }
    catch (err) {
        console.error('Error scanning for neighbor APs:', err);
        error.value = 'Failed to scan for neighbor APs';
    }
    finally {
        scanning.value = false;
    }
};
// Trigger WPS pairing
const handleWPSPairing = async () => {
    loading.value = true;
    error.value = null;
    try {
        await triggerWPS();
        showSuccessNotification('WPS pairing initiated');
    }
    catch (err) {
        console.error('Error triggering WPS pairing:', err);
        error.value = 'Failed to trigger WPS pairing';
    }
    finally {
        loading.value = false;
    }
};
// Open connect modal for a specific AP
const openConnectModal = (ap) => {
    selectedAP.value = ap;
    password.value = '';
    showConnectModal.value = true;
};
// Close connect modal
const closeConnectModal = () => {
    showConnectModal.value = false;
    selectedAP.value = null;
    password.value = '';
};
// Connect to selected AP
const handleConnect = async () => {
    if (!selectedAP.value)
        return;
    loading.value = true;
    error.value = null;
    // 先解構出需要用的欄位
    const { Band, SSID, Security } = selectedAP.value;
    try {
        const connectRequest = {
            Extender: {
                Action: 'connection_setting',
                Band,
                SSID,
                Security,
                Password: password.value
            }
        };
        await connectToAP(connectRequest);
        await fetchExtenderStatus(); // 跟裝置拿最新狀態
        showSuccessNotification(`Connected to ${SSID} successfully`);
        closeConnectModal(); // 最後再關閉 modal，清掉 selectedAP
    }
    catch (err) {
        console.error('Error connecting to AP:', err);
        error.value = 'Failed to connect to AP';
    }
    finally {
        loading.value = false;
    }
};
// Show success notification
const showSuccessNotification = (message) => {
    successMessage.value = message;
    showSuccess.value = true;
    setTimeout(() => {
        if (!redirectCountdown.value) { // Don't hide if we're redirecting
            showSuccess.value = false;
        }
    }, 3000);
};
// Get status class based on connection status
const getStatusClass = (status) => {
    return status === 'connected' ? 'status-connected' : 'status-disconnected';
};
// Cancel redirect
const cancelRedirect = () => {
    if (redirectTimer.value) {
        clearInterval(redirectTimer.value);
        redirectTimer.value = null;
    }
    redirectCountdown.value = null;
    redirectUrl.value = null;
    showSuccess.value = false;
};
onMounted(() => {
    fetchExtenderStatus();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-select']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-cancel-redirect']} */ ;
/** @type {__VLS_StyleScopedClasses['wps-info']} */ ;
/** @type {__VLS_StyleScopedClasses['wps-button']} */ ;
/** @type {__VLS_StyleScopedClasses['scan-button-container']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
    'data-testid': (__VLS_ctx.qa('wireless-extender-title')),
});
(__VLS_ctx.t('wirelessExtender.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('wireless-extender-content')),
});
if (__VLS_ctx.loading && !__VLS_ctx.extenderData) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('wireless-extender-loading')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-spinner" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('common.loading'));
}
else if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-state" },
        'data-testid': (__VLS_ctx.qa('wireless-extender-error')),
    });
    (__VLS_ctx.error);
}
else if (__VLS_ctx.extenderData) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
        'data-testid': (__VLS_ctx.qa('wireless-extender-config-section')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "section-title" },
        'data-testid': (__VLS_ctx.qa('wireless-extender-config-title')),
    });
    (__VLS_ctx.t('wirelessExtender.configuration'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "switch-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        'data-testid': (__VLS_ctx.qa('wireless-extender-enabled-label')),
    });
    (__VLS_ctx.t('wirelessExtender.enabled'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        ...{ onChange: (__VLS_ctx.handleExtenderEnabledChange) },
        type: "checkbox",
        'data-testid': (__VLS_ctx.qa('wireless-extender-enabled-toggle')),
        checked: (__VLS_ctx.tempExtenderEnabled === 1),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    if (__VLS_ctx.tempExtenderEnabled === 1) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            'data-testid': (__VLS_ctx.qa('wireless-extender-role-label')),
        });
        (__VLS_ctx.t('wirelessExtender.role'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
            ...{ onChange: (__VLS_ctx.handleRoleChange) },
            value: (__VLS_ctx.tempExtenderRole),
            'data-testid': (__VLS_ctx.qa('wireless-extender-role-select')),
            ...{ class: "role-select" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
            value: "MeshAgent",
        });
        (__VLS_ctx.t('wirelessExtender.meshAgent'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
            value: "Repeater",
        });
        (__VLS_ctx.t('wirelessExtender.repeater'));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "button-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.cancelConfigChanges) },
        type: "button",
        ...{ class: "btn btn-secondary" },
        'data-testid': (__VLS_ctx.qa('wireless-extender-config-cancel-button')),
        disabled: (__VLS_ctx.loading),
    });
    (__VLS_ctx.t('common.cancel'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.applyConfigChanges) },
        type: "button",
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('wireless-extender-config-apply-button')),
        disabled: (__VLS_ctx.loading),
    });
    (__VLS_ctx.t('common.apply'));
    if (__VLS_ctx.isExtenderEnabled) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "panel-section" },
            'data-testid': (__VLS_ctx.qa('wireless-extender-status-section')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-title" },
            'data-testid': (__VLS_ctx.qa('wireless-extender-status-title')),
        });
        (__VLS_ctx.t('wirelessExtender.connectionStatus'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-content" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "table-container" },
            'data-testid': (__VLS_ctx.qa('wireless-extender-status-table')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('wireless-extender-status-header-band')),
        });
        (__VLS_ctx.t('wirelessExtender.band'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('wireless-extender-status-header-status')),
        });
        (__VLS_ctx.t('wirelessExtender.status'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('wireless-extender-status-header-ssid')),
        });
        (__VLS_ctx.t('wirelessExtender.ssid'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('wireless-extender-status-header-security')),
        });
        (__VLS_ctx.t('wirelessExtender.security'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
        if (__VLS_ctx.connectionStatus) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-row-2g')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-band-2g')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: (__VLS_ctx.getStatusClass(__VLS_ctx.connectionStatus['2.4GHz'].Status)) },
            });
            (__VLS_ctx.connectionStatus['2.4GHz'].Status === 'connected' ?
                __VLS_ctx.t('wirelessExtender.connected') : __VLS_ctx.t('wirelessExtender.disconnected'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-ssid-2g')),
            });
            (__VLS_ctx.connectionStatus['2.4GHz'].SSID);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-security-2g')),
            });
            (__VLS_ctx.connectionStatus['2.4GHz'].Security);
        }
        if (__VLS_ctx.connectionStatus) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-row-5g')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-band-5g')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: (__VLS_ctx.getStatusClass(__VLS_ctx.connectionStatus['5GHz'].Status)) },
            });
            (__VLS_ctx.connectionStatus['5GHz'].Status === 'connected' ?
                __VLS_ctx.t('wirelessExtender.connected') : __VLS_ctx.t('wirelessExtender.disconnected'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-ssid-5g')),
            });
            (__VLS_ctx.connectionStatus['5GHz'].SSID);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-security-5g')),
            });
            (__VLS_ctx.connectionStatus['5GHz'].Security);
        }
        if (__VLS_ctx.connectionStatus) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-row-6g')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-band-6g')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: (__VLS_ctx.getStatusClass(__VLS_ctx.connectionStatus['6GHz'].Status)) },
            });
            (__VLS_ctx.connectionStatus['6GHz'].Status === 'connected' ?
                __VLS_ctx.t('wirelessExtender.connected') : __VLS_ctx.t('wirelessExtender.disconnected'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-ssid-6g')),
            });
            (__VLS_ctx.connectionStatus['6GHz'].SSID);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-security-6g')),
            });
            (__VLS_ctx.connectionStatus['6GHz'].Security);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "mobile-cards" },
            'data-testid': (__VLS_ctx.qa('wireless-extender-status-mobile')),
        });
        if (__VLS_ctx.connectionStatus) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "table-card" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-2g')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-band-label-2g')),
            });
            (__VLS_ctx.t('wirelessExtender.band'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-band-value-2g')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-status-label-2g')),
            });
            (__VLS_ctx.t('wirelessExtender.status'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                ...{ class: (__VLS_ctx.getStatusClass(__VLS_ctx.connectionStatus['2.4GHz'].Status)) },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-status-value-2g')),
            });
            (__VLS_ctx.connectionStatus['2.4GHz'].Status === 'connected' ?
                __VLS_ctx.t('wirelessExtender.connected') : __VLS_ctx.t('wirelessExtender.disconnected'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-ssid-label-2g')),
            });
            (__VLS_ctx.t('wirelessExtender.ssid'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-ssid-value-2g')),
            });
            (__VLS_ctx.connectionStatus['2.4GHz'].SSID);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-security-label-2g')),
            });
            (__VLS_ctx.t('wirelessExtender.security'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-security-value-2g')),
            });
            (__VLS_ctx.connectionStatus['2.4GHz'].Security);
        }
        if (__VLS_ctx.connectionStatus) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "table-card" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-5g')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-band-label-5g')),
            });
            (__VLS_ctx.t('wirelessExtender.band'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-band-value-5g')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-status-label-5g')),
            });
            (__VLS_ctx.t('wirelessExtender.status'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                ...{ class: (__VLS_ctx.getStatusClass(__VLS_ctx.connectionStatus['5GHz'].Status)) },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-status-value-5g')),
            });
            (__VLS_ctx.connectionStatus['5GHz'].Status === 'connected' ?
                __VLS_ctx.t('wirelessExtender.connected') : __VLS_ctx.t('wirelessExtender.disconnected'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-ssid-label-5g')),
            });
            (__VLS_ctx.t('wirelessExtender.ssid'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-ssid-value-5g')),
            });
            (__VLS_ctx.connectionStatus['5GHz'].SSID);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-security-label-5g')),
            });
            (__VLS_ctx.t('wirelessExtender.security'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-security-value-5g')),
            });
            (__VLS_ctx.connectionStatus['5GHz'].Security);
        }
        if (__VLS_ctx.connectionStatus) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "table-card" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-6g')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-band-label-6g')),
            });
            (__VLS_ctx.t('wirelessExtender.band'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-band-value-6g')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-status-label-6g')),
            });
            (__VLS_ctx.t('wirelessExtender.status'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                ...{ class: (__VLS_ctx.getStatusClass(__VLS_ctx.connectionStatus['6GHz'].Status)) },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-status-value-6g')),
            });
            (__VLS_ctx.connectionStatus['6GHz'].Status === 'connected' ?
                __VLS_ctx.t('wirelessExtender.connected') : __VLS_ctx.t('wirelessExtender.disconnected'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-ssid-label-6g')),
            });
            (__VLS_ctx.t('wirelessExtender.ssid'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-ssid-value-6g')),
            });
            (__VLS_ctx.connectionStatus['6GHz'].SSID);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-security-label-6g')),
            });
            (__VLS_ctx.t('wirelessExtender.security'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-status-card-security-value-6g')),
            });
            (__VLS_ctx.connectionStatus['6GHz'].Security);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "panel-section" },
            'data-testid': (__VLS_ctx.qa('wireless-extender-wps-section')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-title" },
            'data-testid': (__VLS_ctx.qa('wireless-extender-wps-title')),
        });
        (__VLS_ctx.t('wirelessExtender.wps'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-content" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "wps-info" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "wps-pin" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "pin-label" },
            'data-testid': (__VLS_ctx.qa('wireless-extender-wps-pin-label')),
        });
        (__VLS_ctx.t('wirelessExtender.pinCode'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "pin-value" },
            'data-testid': (__VLS_ctx.qa('wireless-extender-wps-pin-value')),
        });
        (__VLS_ctx.wpsPinCode);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handleWPSPairing) },
            ...{ class: "btn btn-primary wps-button" },
            'data-testid': (__VLS_ctx.qa('wireless-extender-wps-pairing-button')),
            disabled: (__VLS_ctx.loading),
        });
        (__VLS_ctx.t('wirelessExtender.pairing'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "panel-section" },
            'data-testid': (__VLS_ctx.qa('wireless-extender-scan-section')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-title" },
            'data-testid': (__VLS_ctx.qa('wireless-extender-scan-title')),
        });
        (__VLS_ctx.t('wirelessExtender.neighborScan'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-content" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "scan-button-container" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handleScan) },
            ...{ class: "btn btn-primary" },
            'data-testid': (__VLS_ctx.qa('wireless-extender-scan-button')),
            disabled: (__VLS_ctx.scanning),
        });
        (__VLS_ctx.scanning ? __VLS_ctx.t('wirelessExtender.scanning') : __VLS_ctx.t('wirelessExtender.scan'));
        if (__VLS_ctx.scanResults.length > 0) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "scan-results" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-scan-results')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "table-container" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-scan-table')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-scan-header-ssid')),
            });
            (__VLS_ctx.t('wirelessExtender.ssid'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-scan-header-band')),
            });
            (__VLS_ctx.t('wirelessExtender.band'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-scan-header-channel')),
            });
            (__VLS_ctx.t('wifiNeighbor.channel'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-scan-header-signal')),
            });
            (__VLS_ctx.t('wifiNeighbor.signal'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-scan-header-security')),
            });
            (__VLS_ctx.t('wirelessExtender.security'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-scan-header-select')),
            });
            (__VLS_ctx.t('wirelessExtender.select'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
            for (const [ap, index] of __VLS_getVForSourceType((__VLS_ctx.scanResults))) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
                    key: (index),
                    'data-testid': (__VLS_ctx.qa(`wireless-extender-scan-row-${index}`)),
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                    'data-testid': (__VLS_ctx.qa(`wireless-extender-scan-ssid-${index}`)),
                });
                (ap.SSID);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                    'data-testid': (__VLS_ctx.qa(`wireless-extender-scan-band-${index}`)),
                });
                (ap.Band);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                    'data-testid': (__VLS_ctx.qa(`wireless-extender-scan-channel-${index}`)),
                });
                (ap.Channel);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                    'data-testid': (__VLS_ctx.qa(`wireless-extender-scan-signal-${index}`)),
                });
                (ap.Signal);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                    'data-testid': (__VLS_ctx.qa(`wireless-extender-scan-security-${index}`)),
                });
                (ap.Security);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
                __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                    ...{ onClick: (...[$event]) => {
                            if (!!(__VLS_ctx.loading && !__VLS_ctx.extenderData))
                                return;
                            if (!!(__VLS_ctx.error))
                                return;
                            if (!(__VLS_ctx.extenderData))
                                return;
                            if (!(__VLS_ctx.isExtenderEnabled))
                                return;
                            if (!(__VLS_ctx.scanResults.length > 0))
                                return;
                            __VLS_ctx.openConnectModal(ap);
                        } },
                    ...{ class: "btn btn-select" },
                    'data-testid': (__VLS_ctx.qa(`wireless-extender-scan-select-button-${index}`)),
                });
                (__VLS_ctx.t('wirelessExtender.select'));
            }
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "mobile-cards" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-scan-mobile')),
            });
            for (const [ap, index] of __VLS_getVForSourceType((__VLS_ctx.scanResults))) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "table-card" },
                    key: (index),
                    'data-testid': (__VLS_ctx.qa(`wireless-extender-scan-card-${index}`)),
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "card-row" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-label" },
                    'data-testid': (__VLS_ctx.qa(`wireless-extender-scan-card-ssid-label-${index}`)),
                });
                (__VLS_ctx.t('wirelessExtender.ssid'));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-value" },
                    'data-testid': (__VLS_ctx.qa(`wireless-extender-scan-card-ssid-value-${index}`)),
                });
                (ap.SSID);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "card-row" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-label" },
                    'data-testid': (__VLS_ctx.qa(`wireless-extender-scan-card-band-label-${index}`)),
                });
                (__VLS_ctx.t('wirelessExtender.band'));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-value" },
                    'data-testid': (__VLS_ctx.qa(`wireless-extender-scan-card-band-value-${index}`)),
                });
                (ap.Band);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "card-row" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-label" },
                    'data-testid': (__VLS_ctx.qa(`wireless-extender-scan-card-channel-label-${index}`)),
                });
                (__VLS_ctx.t('wifiNeighbor.channel'));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-value" },
                    'data-testid': (__VLS_ctx.qa(`wireless-extender-scan-card-channel-value-${index}`)),
                });
                (ap.Channel);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "card-row" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-label" },
                    'data-testid': (__VLS_ctx.qa(`wireless-extender-scan-card-signal-label-${index}`)),
                });
                (__VLS_ctx.t('wifiNeighbor.signal'));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-value" },
                    'data-testid': (__VLS_ctx.qa(`wireless-extender-scan-card-signal-value-${index}`)),
                });
                (ap.Signal);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "card-row" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-label" },
                    'data-testid': (__VLS_ctx.qa(`wireless-extender-scan-card-security-label-${index}`)),
                });
                (__VLS_ctx.t('wirelessExtender.security'));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-value" },
                    'data-testid': (__VLS_ctx.qa(`wireless-extender-scan-card-security-value-${index}`)),
                });
                (ap.Security);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "card-actions" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                    ...{ onClick: (...[$event]) => {
                            if (!!(__VLS_ctx.loading && !__VLS_ctx.extenderData))
                                return;
                            if (!!(__VLS_ctx.error))
                                return;
                            if (!(__VLS_ctx.extenderData))
                                return;
                            if (!(__VLS_ctx.isExtenderEnabled))
                                return;
                            if (!(__VLS_ctx.scanResults.length > 0))
                                return;
                            __VLS_ctx.openConnectModal(ap);
                        } },
                    ...{ class: "btn btn-primary" },
                    'data-testid': (__VLS_ctx.qa(`wireless-extender-scan-card-select-button-${index}`)),
                });
                (__VLS_ctx.t('wirelessExtender.select'));
            }
        }
        if (__VLS_ctx.showConnectModal && __VLS_ctx.selectedAP) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "modal-overlay" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-connect-modal')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "modal-content" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-connect-modal-content')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "modal-header" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-connect-modal-title')),
            });
            (__VLS_ctx.t('wirelessExtender.connectToAP'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (__VLS_ctx.closeConnectModal) },
                ...{ class: "close-button" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-connect-modal-close')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "modal-body" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-connect-band-label')),
            });
            (__VLS_ctx.t('wirelessExtender.radioBand'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "info-value" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-connect-band-value')),
            });
            (__VLS_ctx.selectedAP.Band);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-connect-ssid-label')),
            });
            (__VLS_ctx.t('wirelessExtender.ssid'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "info-value" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-connect-ssid-value')),
            });
            (__VLS_ctx.selectedAP.SSID);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-connect-wifi-mode-label')),
            });
            (__VLS_ctx.t('wirelessExtender.wifiMode'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "info-value" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-connect-wifi-mode-value')),
            });
            (__VLS_ctx.selectedAP.Band === '2.4GHz' ? '11NG' : __VLS_ctx.selectedAP.Band === '5GHz' ? '11AC' : '11AX');
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-connect-security-label')),
            });
            (__VLS_ctx.t('wirelessExtender.security'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "info-value" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-connect-security-value')),
            });
            (__VLS_ctx.selectedAP.Security);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-connect-password-label')),
            });
            (__VLS_ctx.t('wirelessExtender.wpaPreshareKey'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "password",
                'data-testid': (__VLS_ctx.qa('wireless-extender-connect-password-input')),
                placeholder: (__VLS_ctx.t('ntp.placeholder')),
                required: true,
            });
            (__VLS_ctx.password);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "modal-footer" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (__VLS_ctx.closeConnectModal) },
                ...{ class: "btn btn-secondary" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-connect-cancel-button')),
            });
            (__VLS_ctx.t('common.cancel'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (__VLS_ctx.handleConnect) },
                ...{ class: "btn btn-primary" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-connect-submit-button')),
                disabled: (!__VLS_ctx.password || __VLS_ctx.loading),
            });
            (__VLS_ctx.t('wirelessExtender.connect'));
        }
    }
}
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
        'data-testid': (__VLS_ctx.qa('wireless-extender-success-message')),
    });
    (__VLS_ctx.successMessage);
    if (__VLS_ctx.redirectCountdown !== null) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "redirect-info" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        (__VLS_ctx.redirectCountdown);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.cancelRedirect) },
            ...{ class: "btn-cancel-redirect" },
            'data-testid': (__VLS_ctx.qa('wireless-extender-cancel-redirect-button')),
        });
    }
}
/** @type {__VLS_StyleScopedClasses['page-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['role-select']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['table-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['table-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['table-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['wps-info']} */ ;
/** @type {__VLS_StyleScopedClasses['wps-pin']} */ ;
/** @type {__VLS_StyleScopedClasses['pin-label']} */ ;
/** @type {__VLS_StyleScopedClasses['pin-value']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['wps-button']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['scan-button-container']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['scan-results']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-select']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['table-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-content']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
/** @type {__VLS_StyleScopedClasses['close-button']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-body']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['success-message']} */ ;
/** @type {__VLS_StyleScopedClasses['redirect-info']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-cancel-redirect']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
            extenderData: extenderData,
            tempExtenderEnabled: tempExtenderEnabled,
            tempExtenderRole: tempExtenderRole,
            scanResults: scanResults,
            loading: loading,
            scanning: scanning,
            error: error,
            showConnectModal: showConnectModal,
            selectedAP: selectedAP,
            password: password,
            showSuccess: showSuccess,
            successMessage: successMessage,
            redirectCountdown: redirectCountdown,
            isExtenderEnabled: isExtenderEnabled,
            wpsPinCode: wpsPinCode,
            connectionStatus: connectionStatus,
            handleExtenderEnabledChange: handleExtenderEnabledChange,
            handleRoleChange: handleRoleChange,
            applyConfigChanges: applyConfigChanges,
            cancelConfigChanges: cancelConfigChanges,
            handleScan: handleScan,
            handleWPSPairing: handleWPSPairing,
            openConnectModal: openConnectModal,
            closeConnectModal: closeConnectModal,
            handleConnect: handleConnect,
            getStatusClass: getStatusClass,
            cancelRedirect: cancelRedirect,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
