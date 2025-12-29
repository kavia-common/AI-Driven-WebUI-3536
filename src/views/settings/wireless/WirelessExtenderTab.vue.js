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
const connectionStatus = computed(() => {
    const status = extenderData.value?.Extender.ConnectionStatus;
    if (!status)
        return null;
    // Return the first available band status
    return status['2.4GHz'] || status['5GHz'] || status['6GHz'] || null;
});
// Fetch extender status
const fetchExtenderStatus = async () => {
    loading.value = true;
    error.value = null;
    try {
        extenderData.value = await getExtenderStatus();
        tempExtenderEnabled.value = extenderData.value.Extender.ExtenderEnabled.Enabled;
        tempExtenderRole.value = extenderData.value.Extender.ExtenderRole.Role;
    }
    catch (err) {
        console.error('Error fetching extender status:', err);
        error.value = err instanceof Error ? err.message : 'Failed to fetch extender status';
    }
    finally {
        loading.value = false;
    }
};
// Update extender settings
const handleSaveSettings = async () => {
    loading.value = true;
    error.value = null;
    try {
        await updateExtenderSettings({
            Extender: {
                Action: "ExtenderEnable",
                Enabled: tempExtenderEnabled.value,
                Role: tempExtenderRole.value
            }
        });
        await fetchExtenderStatus();
        showSuccess.value = true;
        successMessage.value = t('common.saveSuccess');
        setTimeout(() => {
            showSuccess.value = false;
        }, 3000);
    }
    catch (err) {
        console.error('Error updating extender settings:', err);
        error.value = err instanceof Error ? err.message : 'Failed to update settings';
    }
    finally {
        loading.value = false;
    }
};
// Scan for neighbor APs
const handleScan = async () => {
    scanning.value = true;
    error.value = null;
    try {
        const response = await scanNeighborAPs();
        scanResults.value = response.ExtenderScan || [];
    }
    catch (err) {
        console.error('Error scanning APs:', err);
        error.value = err instanceof Error ? err.message : 'Failed to scan APs';
    }
    finally {
        scanning.value = false;
    }
};
// Show connect modal
const showConnectDialog = (ap) => {
    selectedAP.value = ap;
    password.value = '';
    showConnectModal.value = true;
};
// Connect to AP
const handleConnect = async () => {
    if (!selectedAP.value)
        return;
    loading.value = true;
    error.value = null;
    try {
        const connectRequest = {
            Extender: {
                Action: "connection_setting",
                Band: selectedAP.value.Band,
                SSID: selectedAP.value.SSID,
                Security: selectedAP.value.Security,
                Password: password.value
            }
        };
        const response = await connectToAP(connectRequest);
        if (response.Extender.ip_address) {
            redirectUrl.value = `http://${response.Extender.ip_address}`;
            redirectCountdown.value = 60;
            startRedirectCountdown();
        }
        showConnectModal.value = false;
        showSuccess.value = true;
        successMessage.value = t('wirelessExtender.connectSuccess');
        setTimeout(() => {
            showSuccess.value = false;
            fetchExtenderStatus();
        }, 3000);
    }
    catch (err) {
        console.error('Error connecting to AP:', err);
        error.value = err instanceof Error ? err.message : 'Failed to connect to AP';
    }
    finally {
        loading.value = false;
    }
};
// WPS functionality
const handleWPS = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await triggerWPS();
        if (response.Extender.ip_address) {
            redirectUrl.value = `http://${response.Extender.ip_address}`;
            redirectCountdown.value = 60;
            startRedirectCountdown();
        }
        showSuccess.value = true;
        successMessage.value = t('wirelessExtender.wpsTriggered');
        setTimeout(() => {
            showSuccess.value = false;
        }, 3000);
    }
    catch (err) {
        console.error('Error triggering WPS:', err);
        error.value = err instanceof Error ? err.message : 'Failed to trigger WPS';
    }
    finally {
        loading.value = false;
    }
};
// Start redirect countdown
const startRedirectCountdown = () => {
    if (redirectTimer.value) {
        clearInterval(redirectTimer.value);
    }
    redirectTimer.value = window.setInterval(() => {
        if (redirectCountdown.value && redirectCountdown.value > 0) {
            redirectCountdown.value--;
        }
        else {
            if (redirectTimer.value) {
                clearInterval(redirectTimer.value);
            }
            if (redirectUrl.value) {
                window.location.href = redirectUrl.value;
            }
        }
    }, 1000);
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
/** @type {__VLS_StyleScopedClasses['modal-content']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-content']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('wireless-extender-tab-content')),
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
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.error);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.fetchExtenderStatus) },
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('wireless-extender-retry-button')),
    });
    (__VLS_ctx.t('common.retry'));
}
else if (__VLS_ctx.extenderData) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
        'data-testid': (__VLS_ctx.qa('wireless-extender-settings-section')),
    });
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
        'data-testid': (__VLS_ctx.qa('wireless-extender-enable-label')),
    });
    (__VLS_ctx.t('wirelessExtender.enabled'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        ...{ onChange: (...[$event]) => {
                if (!!(__VLS_ctx.loading && !__VLS_ctx.extenderData))
                    return;
                if (!!(__VLS_ctx.error))
                    return;
                if (!(__VLS_ctx.extenderData))
                    return;
                __VLS_ctx.tempExtenderEnabled = $event.target.checked ? 1 : 0;
            } },
        type: "checkbox",
        checked: (__VLS_ctx.tempExtenderEnabled === 1),
        'data-testid': (__VLS_ctx.qa('wireless-extender-enable-toggle')),
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
            value: (__VLS_ctx.tempExtenderRole),
            'data-testid': (__VLS_ctx.qa('wireless-extender-role-select')),
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
        ...{ onClick: (__VLS_ctx.fetchExtenderStatus) },
        type: "button",
        ...{ class: "btn btn-secondary" },
        disabled: (__VLS_ctx.loading),
        'data-testid': (__VLS_ctx.qa('wireless-extender-cancel-button')),
    });
    (__VLS_ctx.t('common.cancel'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleSaveSettings) },
        type: "button",
        ...{ class: "btn btn-primary" },
        disabled: (__VLS_ctx.loading),
        'data-testid': (__VLS_ctx.qa('wireless-extender-apply-button')),
    });
    (__VLS_ctx.t('common.apply'));
    if (__VLS_ctx.isExtenderEnabled && __VLS_ctx.connectionStatus) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "panel-section" },
            'data-testid': (__VLS_ctx.qa('wireless-extender-connection-section')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-title" },
            'data-testid': (__VLS_ctx.qa('wireless-extender-connection-title')),
        });
        (__VLS_ctx.t('wirelessExtender.connectionStatus'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-content" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "info-grid" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "info-item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "info-label" },
            'data-testid': (__VLS_ctx.qa('wireless-extender-connection-status-label')),
        });
        (__VLS_ctx.t('wirelessExtender.status'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "info-value" },
            'data-testid': (__VLS_ctx.qa('wireless-extender-connection-status-value')),
        });
        (__VLS_ctx.connectionStatus.Status);
        if (__VLS_ctx.connectionStatus.SSID) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "info-item" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "info-label" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-connection-ssid-label')),
            });
            (__VLS_ctx.t('wirelessExtender.connectedSSID'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "info-value" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-connection-ssid-value')),
            });
            (__VLS_ctx.connectionStatus.SSID);
        }
    }
    if (__VLS_ctx.isExtenderEnabled) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "panel-section" },
            'data-testid': (__VLS_ctx.qa('wireless-extender-scan-section')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-title" },
            'data-testid': (__VLS_ctx.qa('wireless-extender-scan-title')),
        });
        (__VLS_ctx.t('wirelessExtender.availableNetworks'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-content" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "action-buttons" },
            ...{ style: {} },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handleScan) },
            ...{ class: "btn btn-secondary" },
            disabled: (__VLS_ctx.scanning),
            'data-testid': (__VLS_ctx.qa('wireless-extender-scan-button')),
        });
        if (__VLS_ctx.scanning) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
        }
        (__VLS_ctx.scanning ? __VLS_ctx.t('wirelessExtender.scanning') : __VLS_ctx.t('wirelessExtender.scan'));
        if (__VLS_ctx.scanResults.length > 0) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "table-container" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-scan-results')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-scan-header-ssid')),
            });
            (__VLS_ctx.t('wirelessExtender.ssid'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-scan-header-bssid')),
            });
            (__VLS_ctx.t('wirelessExtender.bssid'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-scan-header-security')),
            });
            (__VLS_ctx.t('wirelessExtender.security'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-scan-header-signal')),
            });
            (__VLS_ctx.t('wirelessExtender.signal'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
                'data-testid': (__VLS_ctx.qa('wireless-extender-scan-header-action')),
            });
            (__VLS_ctx.t('common.action'));
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
                    'data-testid': (__VLS_ctx.qa(`wireless-extender-scan-bssid-${index}`)),
                });
                (ap.Band);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                    'data-testid': (__VLS_ctx.qa(`wireless-extender-scan-security-${index}`)),
                });
                (ap.Security);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                    'data-testid': (__VLS_ctx.qa(`wireless-extender-scan-signal-${index}`)),
                });
                (ap.Signal);
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
                            __VLS_ctx.showConnectDialog(ap);
                        } },
                    ...{ class: "btn btn-sm btn-primary" },
                    'data-testid': (__VLS_ctx.qa(`wireless-extender-scan-connect-${index}`)),
                });
                (__VLS_ctx.t('wirelessExtender.connect'));
            }
        }
        else if (!__VLS_ctx.scanning) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "empty-state" },
                'data-testid': (__VLS_ctx.qa('wireless-extender-scan-empty')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (__VLS_ctx.t('wirelessExtender.noNetworksFound'));
        }
    }
    if (__VLS_ctx.isExtenderEnabled) {
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
            ...{ class: "info-item" },
            ...{ style: {} },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "info-label" },
            'data-testid': (__VLS_ctx.qa('wireless-extender-wps-pin-label')),
        });
        (__VLS_ctx.t('wirelessExtender.wpsPinCode'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "info-value" },
            'data-testid': (__VLS_ctx.qa('wireless-extender-wps-pin-value')),
        });
        (__VLS_ctx.wpsPinCode);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "action-buttons" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handleWPS) },
            ...{ class: "btn btn-secondary" },
            disabled: (__VLS_ctx.loading),
            'data-testid': (__VLS_ctx.qa('wireless-extender-wps-button')),
        });
        (__VLS_ctx.t('wirelessExtender.triggerWPS'));
    }
}
if (__VLS_ctx.showConnectModal) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.showConnectModal))
                    return;
                __VLS_ctx.showConnectModal = false;
            } },
        ...{ class: "modal-overlay" },
        'data-testid': (__VLS_ctx.qa('wireless-extender-connect-modal')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: () => { } },
        ...{ class: "modal-content" },
        'data-testid': (__VLS_ctx.qa('wireless-extender-connect-modal-content')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        'data-testid': (__VLS_ctx.qa('wireless-extender-connect-modal-title')),
    });
    (__VLS_ctx.t('wirelessExtender.connectTo'));
    (__VLS_ctx.selectedAP?.SSID);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "form-label" },
        'data-testid': (__VLS_ctx.qa('wireless-extender-connect-password-label')),
    });
    (__VLS_ctx.t('wirelessExtender.password'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "password",
        ...{ class: "form-input" },
        'data-testid': (__VLS_ctx.qa('wireless-extender-connect-password-input')),
    });
    (__VLS_ctx.password);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "modal-actions" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.showConnectModal))
                    return;
                __VLS_ctx.showConnectModal = false;
            } },
        ...{ class: "btn btn-secondary" },
        'data-testid': (__VLS_ctx.qa('wireless-extender-connect-cancel-button')),
    });
    (__VLS_ctx.t('common.cancel'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleConnect) },
        ...{ class: "btn btn-primary" },
        disabled: (__VLS_ctx.loading),
        'data-testid': (__VLS_ctx.qa('wireless-extender-connect-confirm-button')),
    });
    if (__VLS_ctx.loading) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
    }
    (__VLS_ctx.t('wirelessExtender.connect'));
}
if (__VLS_ctx.redirectCountdown !== null) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "modal-overlay" },
        'data-testid': (__VLS_ctx.qa('wireless-extender-redirect-modal')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "modal-content" },
        'data-testid': (__VLS_ctx.qa('wireless-extender-redirect-modal-content')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        'data-testid': (__VLS_ctx.qa('wireless-extender-redirect-title')),
    });
    (__VLS_ctx.t('wirelessExtender.redirecting'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        'data-testid': (__VLS_ctx.qa('wireless-extender-redirect-message')),
    });
    (__VLS_ctx.t('wirelessExtender.redirectMessage', { seconds: __VLS_ctx.redirectCountdown }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-spinner" },
    });
}
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
        'data-testid': (__VLS_ctx.qa('wireless-extender-success-message')),
    });
    (__VLS_ctx.successMessage);
}
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['info-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['action-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['action-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-content']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['success-message']} */ ;
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
            fetchExtenderStatus: fetchExtenderStatus,
            handleSaveSettings: handleSaveSettings,
            handleScan: handleScan,
            showConnectDialog: showConnectDialog,
            handleConnect: handleConnect,
            handleWPS: handleWPS,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
