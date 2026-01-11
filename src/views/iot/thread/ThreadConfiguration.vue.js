import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getThreadConfiguration, updateThreadConfiguration } from '../../../services/api/thread';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const threadConfig = ref(null);
const loading = ref(true);
const error = ref(null);
const showSuccess = ref(false);
const successMessage = ref('');
// UI state
const threadEnabled = ref(false);
const tempThreadEnabled = ref(false); // Temporary state for enable toggle
const activeDataset = ref(null);
const pendingDataset = ref(null);
const showActiveNetworkKey = ref(false);
const showPendingNetworkKey = ref(false);
const showActivePSKc = ref(false);
const showPendingPSKc = ref(false);
const activeMode = ref('Auto');
const pendingMode = ref('Manual');
// Default dataset configuration
const defaultDatasetConfig = {
    'Active Timestamp': 1,
    NetworkName: '',
    NetworkKey: '',
    Channel: 1,
    ChannelMask: 0,
    PanId: '',
    ExtPanId: '',
    MeshLocalPrefix: '',
    PSKc: '',
    SecurityPolicy: {
        AutonomousEnrollment: false,
        CommercialCommissioning: false,
        ExternalCommissioning: false,
        NativeCommissioning: false,
        NetworkKeyProvisioning: false,
        NonCcmRouters: false,
        ObtainNetworkKey: false,
        RotationTime: 0,
        Routers: false,
        TobleLink: false
    }
};
const defaultPendingDatasetConfig = {
    ...defaultDatasetConfig,
    'Pending Timestamp': 1,
    Delay: 30000,
    'Active Timestamp': 2,
};
// Fetch thread configuration
const fetchThreadConfiguration = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await getThreadConfiguration();
        threadConfig.value = response;
        threadEnabled.value = response.ThreadConfiguration.Enable;
        tempThreadEnabled.value = response.ThreadConfiguration.Enable; // Initialize temp state
        // Handle case where ActiveDataset or PendingDataset are empty arrays
        if (Array.isArray(response.ThreadConfiguration.ActiveDataset) &&
            response.ThreadConfiguration.ActiveDataset.length === 0) {
            activeDataset.value = { ...defaultDatasetConfig };
        }
        else {
            activeDataset.value = { ...response.ThreadConfiguration.ActiveDataset };
        }
        if (Array.isArray(response.ThreadConfiguration.PendingDataset) &&
            response.ThreadConfiguration.PendingDataset.length === 0) {
            pendingDataset.value = { ...defaultPendingDatasetConfig };
        }
        else {
            pendingDataset.value = { ...response.ThreadConfiguration.PendingDataset };
        }
    }
    catch (err) {
        console.error('Error fetching Thread configuration:', err);
        error.value = 'Failed to fetch Thread configuration';
    }
    finally {
        loading.value = false;
    }
};
// Generate a random dataset
const generateDataset = async (type) => {
    loading.value = true;
    error.value = null;
    try {
        const request = {
            ThreadConfiguration: {
                Enable: threadEnabled.value,
                Type: type,
                Mode: 'Auto'
            }
        };
        await updateThreadConfiguration(request);
        await fetchThreadConfiguration();
        showSuccessNotification(`${type} dataset generated successfully`);
    }
    catch (err) {
        console.error(`Error generating ${type} dataset:`, err);
        error.value = `Failed to generate ${type} dataset`;
    }
    finally {
        loading.value = false;
    }
};
// Update active dataset
const updateActiveDataset = async () => {
    if (!activeDataset.value)
        return;
    loading.value = true;
    error.value = null;
    try {
        const request = {
            ThreadConfiguration: {
                Enable: threadEnabled.value,
                Type: 'Active',
                Mode: 'Manual',
                Dataset: activeDataset.value
            }
        };
        await updateThreadConfiguration(request);
        await fetchThreadConfiguration();
        showSuccessNotification('Active dataset updated successfully');
    }
    catch (err) {
        console.error('Error updating active dataset:', err);
        error.value = 'Failed to update active dataset';
    }
    finally {
        loading.value = false;
    }
};
// Update pending dataset
const updatePendingDataset = async () => {
    if (!pendingDataset.value)
        return;
    loading.value = true;
    error.value = null;
    try {
        const request = {
            ThreadConfiguration: {
                Enable: threadEnabled.value,
                Type: 'Pending',
                Mode: 'Manual',
                Dataset: pendingDataset.value
            }
        };
        await updateThreadConfiguration(request);
        await fetchThreadConfiguration();
        showSuccessNotification('Pending dataset updated successfully');
    }
    catch (err) {
        console.error('Error updating pending dataset:', err);
        error.value = 'Failed to update pending dataset';
    }
    finally {
        loading.value = false;
    }
};
// Update thread enabled state
const updateThreadEnabled = async () => {
    loading.value = true;
    error.value = null;
    try {
        const request = {
            ThreadConfiguration: {
                Enable: tempThreadEnabled.value
            }
        };
        await updateThreadConfiguration(request);
        await fetchThreadConfiguration();
        showSuccessNotification(`Thread ${tempThreadEnabled.value ? 'enabled' : 'disabled'} successfully`);
    }
    catch (err) {
        console.error('Error updating Thread enabled state:', err);
        error.value = 'Failed to update Thread enabled state';
    }
    finally {
        loading.value = false;
    }
};
// Cancel enable/disable changes
const cancelEnableChanges = () => {
    tempThreadEnabled.value = threadEnabled.value;
};
// Show success notification
const showSuccessNotification = (message) => {
    successMessage.value = message;
    showSuccess.value = true;
    setTimeout(() => {
        showSuccess.value = false;
    }, 3000);
};
// Format security policy for display
const formatSecurityPolicy = (policy) => {
    if (!policy)
        return '';
    const enabledOptions = [];
    if (policy.AutonomousEnrollment)
        enabledOptions.push('Autonomous Enrollment');
    if (policy.CommercialCommissioning)
        enabledOptions.push('Commercial Commissioning');
    if (policy.ExternalCommissioning)
        enabledOptions.push('External Commissioning');
    if (policy.NativeCommissioning)
        enabledOptions.push('Native Commissioning');
    if (policy.NetworkKeyProvisioning)
        enabledOptions.push('Network Key Provisioning');
    if (policy.NonCcmRouters)
        enabledOptions.push('Non CCM Routers');
    if (policy.ObtainNetworkKey)
        enabledOptions.push('Obtain Network Key');
    if (policy.Routers)
        enabledOptions.push('Routers');
    if (policy.TobleLink)
        enabledOptions.push('Toble Link');
    return `${policy.RotationTime} hours, ${enabledOptions.join(', ')}`;
};
onMounted(() => {
    fetchThreadConfiguration();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['generate-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check']} */ ;
/** @type {__VLS_StyleScopedClasses['password-input']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-password']} */ ;
/** @type {__VLS_StyleScopedClasses['thread-content']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "thread-content" },
    'data-testid': (__VLS_ctx.qa('thread-config-content')),
});
if (__VLS_ctx.loading && !__VLS_ctx.threadConfig) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('thread-config-loading')),
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
        'data-testid': (__VLS_ctx.qa('thread-config-error')),
    });
    (__VLS_ctx.error);
}
else if (__VLS_ctx.threadConfig) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
        'data-testid': (__VLS_ctx.qa('thread-config-enable-section')),
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
        'data-testid': (__VLS_ctx.qa('thread-config-enable-label')),
    });
    (__VLS_ctx.t('common.enable'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "checkbox",
        'data-testid': (__VLS_ctx.qa('thread-config-enable-toggle')),
    });
    (__VLS_ctx.tempThreadEnabled);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "button-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.cancelEnableChanges) },
        type: "button",
        ...{ class: "btn btn-secondary" },
        'data-testid': (__VLS_ctx.qa('thread-config-enable-cancel')),
    });
    (__VLS_ctx.t('common.cancel'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.updateThreadEnabled) },
        type: "button",
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('thread-config-enable-apply')),
    });
    (__VLS_ctx.t('common.apply'));
    if (__VLS_ctx.threadEnabled) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "panel-section" },
            'data-testid': (__VLS_ctx.qa('thread-config-active-dataset-section')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-title" },
            'data-testid': (__VLS_ctx.qa('thread-config-active-dataset-title')),
        });
        (__VLS_ctx.t('thread.activeDataset'));
        if (__VLS_ctx.activeDataset) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-content" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "dataset-header" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading && !__VLS_ctx.threadConfig))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!(__VLS_ctx.threadConfig))
                            return;
                        if (!(__VLS_ctx.threadEnabled))
                            return;
                        if (!(__VLS_ctx.activeDataset))
                            return;
                        __VLS_ctx.generateDataset('Active');
                    } },
                ...{ class: "btn btn-secondary generate-btn" },
                'data-testid': (__VLS_ctx.qa('thread-config-active-generate-button')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            (__VLS_ctx.t('thread.generateDataset'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('thread-config-active-timestamp-label')),
            });
            (__VLS_ctx.t('thread.activeTimestamp'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "number",
                'data-testid': (__VLS_ctx.qa('thread-config-active-timestamp-input')),
                ...{ class: "form-control" },
            });
            (__VLS_ctx.activeDataset['Active Timestamp']);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('thread-config-active-network-name-label')),
            });
            (__VLS_ctx.t('thread.networkName'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "text",
                'data-testid': (__VLS_ctx.qa('thread-config-active-network-name-input')),
                value: (__VLS_ctx.activeDataset.NetworkName),
                ...{ class: "form-control" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('thread-config-active-network-key-label')),
            });
            (__VLS_ctx.t('thread.networkKey'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "password-input" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: (__VLS_ctx.showActiveNetworkKey ? 'text' : 'password'),
                'data-testid': (__VLS_ctx.qa('thread-config-active-network-key-input')),
                ...{ class: "form-control" },
            });
            (__VLS_ctx.activeDataset.NetworkKey);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading && !__VLS_ctx.threadConfig))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!(__VLS_ctx.threadConfig))
                            return;
                        if (!(__VLS_ctx.threadEnabled))
                            return;
                        if (!(__VLS_ctx.activeDataset))
                            return;
                        __VLS_ctx.showActiveNetworkKey = !__VLS_ctx.showActiveNetworkKey;
                    } },
                type: "button",
                ...{ class: "toggle-password" },
                'data-testid': (__VLS_ctx.qa('thread-config-active-network-key-toggle')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
            (__VLS_ctx.showActiveNetworkKey ? 'visibility_off' : 'visibility');
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('thread-config-active-channel-label')),
            });
            (__VLS_ctx.t('thread.channel'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "number",
                'data-testid': (__VLS_ctx.qa('thread-config-active-channel-input')),
                ...{ class: "form-control" },
                min: "11",
                max: "26",
            });
            (__VLS_ctx.activeDataset.Channel);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('thread-config-active-channel-mask-label')),
            });
            (__VLS_ctx.t('thread.channelMask'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "number",
                'data-testid': (__VLS_ctx.qa('thread-config-active-channel-mask-input')),
                ...{ class: "form-control" },
            });
            (__VLS_ctx.activeDataset.ChannelMask);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('thread-config-active-pan-id-label')),
            });
            (__VLS_ctx.t('thread.panId'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "text",
                'data-testid': (__VLS_ctx.qa('thread-config-active-pan-id-input')),
                value: (__VLS_ctx.activeDataset.PanId),
                ...{ class: "form-control" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('thread-config-active-extended-pan-id-label')),
            });
            (__VLS_ctx.t('thread.extendedPanId'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "text",
                'data-testid': (__VLS_ctx.qa('thread-config-active-extended-pan-id-input')),
                value: (__VLS_ctx.activeDataset.ExtPanId),
                ...{ class: "form-control" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('thread-config-active-mesh-local-prefix-label')),
            });
            (__VLS_ctx.t('thread.meshLocalPrefix'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "text",
                'data-testid': (__VLS_ctx.qa('thread-config-active-mesh-local-prefix-input')),
                value: (__VLS_ctx.activeDataset.MeshLocalPrefix),
                ...{ class: "form-control" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('thread-config-active-pskc-label')),
            });
            (__VLS_ctx.t('thread.pskc'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "password-input" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: (__VLS_ctx.showActivePSKc ? 'text' : 'password'),
                'data-testid': (__VLS_ctx.qa('thread-config-active-pskc-input')),
                ...{ class: "form-control" },
            });
            (__VLS_ctx.activeDataset.PSKc);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading && !__VLS_ctx.threadConfig))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!(__VLS_ctx.threadConfig))
                            return;
                        if (!(__VLS_ctx.threadEnabled))
                            return;
                        if (!(__VLS_ctx.activeDataset))
                            return;
                        __VLS_ctx.showActivePSKc = !__VLS_ctx.showActivePSKc;
                    } },
                type: "button",
                ...{ class: "toggle-password" },
                'data-testid': (__VLS_ctx.qa('thread-config-active-pskc-toggle')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
            (__VLS_ctx.showActivePSKc ? 'visibility_off' : 'visibility');
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "security-policy-section" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('thread-config-active-security-policy-label')),
            });
            (__VLS_ctx.t('thread.securityPolicy'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "security-policy-grid" },
                'data-testid': (__VLS_ctx.qa('thread-config-active-security-policy-grid')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('thread-config-active-rotation-time-label')),
            });
            (__VLS_ctx.t('thread.rotationTime'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "number",
                'data-testid': (__VLS_ctx.qa('thread-config-active-rotation-time-input')),
                ...{ class: "form-control" },
            });
            (__VLS_ctx.activeDataset.SecurityPolicy.RotationTime);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "checkbox-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-check" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "checkbox",
                id: "active-autonomous-enrollment",
                'data-testid': (__VLS_ctx.qa('thread-config-active-autonomous-enrollment')),
            });
            (__VLS_ctx.activeDataset.SecurityPolicy.AutonomousEnrollment);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                for: "active-autonomous-enrollment",
            });
            (__VLS_ctx.t('thread.autonomousEnrollment'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-check" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "checkbox",
                id: "active-commercial-commissioning",
                'data-testid': (__VLS_ctx.qa('thread-config-active-commercial-commissioning')),
            });
            (__VLS_ctx.activeDataset.SecurityPolicy.CommercialCommissioning);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                for: "active-commercial-commissioning",
            });
            (__VLS_ctx.t('thread.commercialCommissioning'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-check" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "checkbox",
                id: "active-external-commissioning",
                'data-testid': (__VLS_ctx.qa('thread-config-active-external-commissioning')),
            });
            (__VLS_ctx.activeDataset.SecurityPolicy.ExternalCommissioning);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                for: "active-external-commissioning",
            });
            (__VLS_ctx.t('thread.externalCommissioning'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-check" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "checkbox",
                id: "active-native-commissioning",
                'data-testid': (__VLS_ctx.qa('thread-config-active-native-commissioning')),
            });
            (__VLS_ctx.activeDataset.SecurityPolicy.NativeCommissioning);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                for: "active-native-commissioning",
            });
            (__VLS_ctx.t('thread.nativeCommissioning'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-check" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "checkbox",
                id: "active-network-key-provisioning",
                'data-testid': (__VLS_ctx.qa('thread-config-active-network-key-provisioning')),
            });
            (__VLS_ctx.activeDataset.SecurityPolicy.NetworkKeyProvisioning);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                for: "active-network-key-provisioning",
            });
            (__VLS_ctx.t('thread.networkKeyProvisioning'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-check" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "checkbox",
                id: "active-non-ccm-routers",
                'data-testid': (__VLS_ctx.qa('thread-config-active-non-ccm-routers')),
            });
            (__VLS_ctx.activeDataset.SecurityPolicy.NonCcmRouters);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                for: "active-non-ccm-routers",
            });
            (__VLS_ctx.t('thread.nonCcmRouters'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-check" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "checkbox",
                id: "active-obtain-network-key",
                'data-testid': (__VLS_ctx.qa('thread-config-active-obtain-network-key')),
            });
            (__VLS_ctx.activeDataset.SecurityPolicy.ObtainNetworkKey);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                for: "active-obtain-network-key",
            });
            (__VLS_ctx.t('thread.obtainNetworkKey'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-check" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "checkbox",
                id: "active-routers",
                'data-testid': (__VLS_ctx.qa('thread-config-active-routers')),
            });
            (__VLS_ctx.activeDataset.SecurityPolicy.Routers);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                for: "active-routers",
            });
            (__VLS_ctx.t('thread.routers'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-check" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "checkbox",
                id: "active-toble-link",
                'data-testid': (__VLS_ctx.qa('thread-config-active-toble-link')),
            });
            (__VLS_ctx.activeDataset.SecurityPolicy.TobleLink);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                for: "active-toble-link",
            });
            (__VLS_ctx.t('thread.tobleLink'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "button-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (__VLS_ctx.fetchThreadConfiguration) },
                type: "button",
                ...{ class: "btn btn-secondary" },
                'data-testid': (__VLS_ctx.qa('thread-config-active-cancel')),
            });
            (__VLS_ctx.t('common.cancel'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (__VLS_ctx.updateActiveDataset) },
                type: "button",
                ...{ class: "btn btn-primary" },
                'data-testid': (__VLS_ctx.qa('thread-config-active-update')),
            });
            (__VLS_ctx.t('thread.update'));
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "panel-section" },
            'data-testid': (__VLS_ctx.qa('thread-config-pending-dataset-section')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-title" },
            'data-testid': (__VLS_ctx.qa('thread-config-pending-dataset-title')),
        });
        (__VLS_ctx.t('thread.pendingDataset'));
        if (__VLS_ctx.pendingDataset) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-content" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "dataset-header" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading && !__VLS_ctx.threadConfig))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!(__VLS_ctx.threadConfig))
                            return;
                        if (!(__VLS_ctx.threadEnabled))
                            return;
                        if (!(__VLS_ctx.pendingDataset))
                            return;
                        __VLS_ctx.generateDataset('Pending');
                    } },
                ...{ class: "btn btn-secondary generate-btn" },
                'data-testid': (__VLS_ctx.qa('thread-config-pending-generate-button')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            (__VLS_ctx.t('thread.generateDataset'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('thread-config-pending-timestamp-label')),
            });
            (__VLS_ctx.t('thread.pendingTimestamp'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "number",
                'data-testid': (__VLS_ctx.qa('thread-config-pending-timestamp-input')),
                ...{ class: "form-control" },
            });
            (__VLS_ctx.pendingDataset['Pending Timestamp']);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('thread-config-pending-delay-label')),
            });
            (__VLS_ctx.t('thread.delay'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "number",
                'data-testid': (__VLS_ctx.qa('thread-config-pending-delay-input')),
                ...{ class: "form-control" },
            });
            (__VLS_ctx.pendingDataset.Delay);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('thread-config-pending-active-timestamp-label')),
            });
            (__VLS_ctx.t('thread.activeTimestamp'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "number",
                'data-testid': (__VLS_ctx.qa('thread-config-pending-active-timestamp-input')),
                ...{ class: "form-control" },
            });
            (__VLS_ctx.pendingDataset['Active Timestamp']);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('thread-config-pending-network-name-label')),
            });
            (__VLS_ctx.t('thread.networkName'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "text",
                'data-testid': (__VLS_ctx.qa('thread-config-pending-network-name-input')),
                value: (__VLS_ctx.pendingDataset.NetworkName),
                ...{ class: "form-control" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('thread-config-pending-network-key-label')),
            });
            (__VLS_ctx.t('thread.networkKey'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "password-input" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: (__VLS_ctx.showPendingNetworkKey ? 'text' : 'password'),
                'data-testid': (__VLS_ctx.qa('thread-config-pending-network-key-input')),
                ...{ class: "form-control" },
            });
            (__VLS_ctx.pendingDataset.NetworkKey);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading && !__VLS_ctx.threadConfig))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!(__VLS_ctx.threadConfig))
                            return;
                        if (!(__VLS_ctx.threadEnabled))
                            return;
                        if (!(__VLS_ctx.pendingDataset))
                            return;
                        __VLS_ctx.showPendingNetworkKey = !__VLS_ctx.showPendingNetworkKey;
                    } },
                type: "button",
                ...{ class: "toggle-password" },
                'data-testid': (__VLS_ctx.qa('thread-config-pending-network-key-toggle')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
            (__VLS_ctx.showPendingNetworkKey ? 'visibility_off' : 'visibility');
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('thread-config-pending-channel-label')),
            });
            (__VLS_ctx.t('thread.channel'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "number",
                'data-testid': (__VLS_ctx.qa('thread-config-pending-channel-input')),
                ...{ class: "form-control" },
                min: "11",
                max: "26",
            });
            (__VLS_ctx.pendingDataset.Channel);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('thread-config-pending-channel-mask-label')),
            });
            (__VLS_ctx.t('thread.channelMask'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "number",
                'data-testid': (__VLS_ctx.qa('thread-config-pending-channel-mask-input')),
                ...{ class: "form-control" },
            });
            (__VLS_ctx.pendingDataset.ChannelMask);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('thread-config-pending-pan-id-label')),
            });
            (__VLS_ctx.t('thread.panId'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "text",
                'data-testid': (__VLS_ctx.qa('thread-config-pending-pan-id-input')),
                value: (__VLS_ctx.pendingDataset.PanId),
                ...{ class: "form-control" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('thread-config-pending-extended-pan-id-label')),
            });
            (__VLS_ctx.t('thread.extendedPanId'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "text",
                'data-testid': (__VLS_ctx.qa('thread-config-pending-extended-pan-id-input')),
                value: (__VLS_ctx.pendingDataset.ExtPanId),
                ...{ class: "form-control" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('thread-config-pending-mesh-local-prefix-label')),
            });
            (__VLS_ctx.t('thread.meshLocalPrefix'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "text",
                'data-testid': (__VLS_ctx.qa('thread-config-pending-mesh-local-prefix-input')),
                value: (__VLS_ctx.pendingDataset.MeshLocalPrefix),
                ...{ class: "form-control" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('thread-config-pending-pskc-label')),
            });
            (__VLS_ctx.t('thread.pskc'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "password-input" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: (__VLS_ctx.showPendingPSKc ? 'text' : 'password'),
                'data-testid': (__VLS_ctx.qa('thread-config-pending-pskc-input')),
                ...{ class: "form-control" },
            });
            (__VLS_ctx.pendingDataset.PSKc);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading && !__VLS_ctx.threadConfig))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!(__VLS_ctx.threadConfig))
                            return;
                        if (!(__VLS_ctx.threadEnabled))
                            return;
                        if (!(__VLS_ctx.pendingDataset))
                            return;
                        __VLS_ctx.showPendingPSKc = !__VLS_ctx.showPendingPSKc;
                    } },
                type: "button",
                ...{ class: "toggle-password" },
                'data-testid': (__VLS_ctx.qa('thread-config-pending-pskc-toggle')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
            (__VLS_ctx.showPendingPSKc ? 'visibility_off' : 'visibility');
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "security-policy-section" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('thread-config-pending-security-policy-label')),
            });
            (__VLS_ctx.t('thread.securityPolicy'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "security-policy-grid" },
                'data-testid': (__VLS_ctx.qa('thread-config-pending-security-policy-grid')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('thread-config-pending-rotation-time-label')),
            });
            (__VLS_ctx.t('thread.rotationTime'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "number",
                'data-testid': (__VLS_ctx.qa('thread-config-pending-rotation-time-input')),
                ...{ class: "form-control" },
            });
            (__VLS_ctx.pendingDataset.SecurityPolicy.RotationTime);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "checkbox-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-check" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "checkbox",
                id: "pending-autonomous-enrollment",
                'data-testid': (__VLS_ctx.qa('thread-config-pending-autonomous-enrollment')),
            });
            (__VLS_ctx.pendingDataset.SecurityPolicy.AutonomousEnrollment);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                for: "pending-autonomous-enrollment",
            });
            (__VLS_ctx.t('thread.autonomousEnrollment'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-check" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "checkbox",
                id: "pending-commercial-commissioning",
                'data-testid': (__VLS_ctx.qa('thread-config-pending-commercial-commissioning')),
            });
            (__VLS_ctx.pendingDataset.SecurityPolicy.CommercialCommissioning);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                for: "pending-commercial-commissioning",
            });
            (__VLS_ctx.t('thread.commercialCommissioning'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-check" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "checkbox",
                id: "pending-external-commissioning",
                'data-testid': (__VLS_ctx.qa('thread-config-pending-external-commissioning')),
            });
            (__VLS_ctx.pendingDataset.SecurityPolicy.ExternalCommissioning);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                for: "pending-external-commissioning",
            });
            (__VLS_ctx.t('thread.externalCommissioning'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-check" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "checkbox",
                id: "pending-native-commissioning",
                'data-testid': (__VLS_ctx.qa('thread-config-pending-native-commissioning')),
            });
            (__VLS_ctx.pendingDataset.SecurityPolicy.NativeCommissioning);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                for: "pending-native-commissioning",
            });
            (__VLS_ctx.t('thread.nativeCommissioning'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-check" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "checkbox",
                id: "pending-network-key-provisioning",
                'data-testid': (__VLS_ctx.qa('thread-config-pending-network-key-provisioning')),
            });
            (__VLS_ctx.pendingDataset.SecurityPolicy.NetworkKeyProvisioning);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                for: "pending-network-key-provisioning",
            });
            (__VLS_ctx.t('thread.networkKeyProvisioning'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-check" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "checkbox",
                id: "pending-non-ccm-routers",
                'data-testid': (__VLS_ctx.qa('thread-config-pending-non-ccm-routers')),
            });
            (__VLS_ctx.pendingDataset.SecurityPolicy.NonCcmRouters);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                for: "pending-non-ccm-routers",
            });
            (__VLS_ctx.t('thread.nonCcmRouters'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-check" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "checkbox",
                id: "pending-obtain-network-key",
                'data-testid': (__VLS_ctx.qa('thread-config-pending-obtain-network-key')),
            });
            (__VLS_ctx.pendingDataset.SecurityPolicy.ObtainNetworkKey);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                for: "pending-obtain-network-key",
            });
            (__VLS_ctx.t('thread.obtainNetworkKey'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-check" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "checkbox",
                id: "pending-routers",
                'data-testid': (__VLS_ctx.qa('thread-config-pending-routers')),
            });
            (__VLS_ctx.pendingDataset.SecurityPolicy.Routers);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                for: "pending-routers",
            });
            (__VLS_ctx.t('thread.routers'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-check" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "checkbox",
                id: "pending-toble-link",
                'data-testid': (__VLS_ctx.qa('thread-config-pending-toble-link')),
            });
            (__VLS_ctx.pendingDataset.SecurityPolicy.TobleLink);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                for: "pending-toble-link",
            });
            (__VLS_ctx.t('thread.tobleLink'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "button-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (__VLS_ctx.fetchThreadConfiguration) },
                type: "button",
                ...{ class: "btn btn-secondary" },
                'data-testid': (__VLS_ctx.qa('thread-config-pending-cancel')),
            });
            (__VLS_ctx.t('common.cancel'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (__VLS_ctx.updatePendingDataset) },
                type: "button",
                ...{ class: "btn btn-primary" },
                'data-testid': (__VLS_ctx.qa('thread-config-pending-update')),
            });
            (__VLS_ctx.t('thread.update'));
        }
    }
}
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
        'data-testid': (__VLS_ctx.qa('thread-config-success-message')),
    });
    (__VLS_ctx.successMessage);
}
/** @type {__VLS_StyleScopedClasses['thread-content']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['dataset-header']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['generate-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['password-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-password']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['password-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-password']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['security-policy-section']} */ ;
/** @type {__VLS_StyleScopedClasses['security-policy-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['dataset-header']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['generate-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['password-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-password']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['password-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-password']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['security-policy-section']} */ ;
/** @type {__VLS_StyleScopedClasses['security-policy-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['success-message']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
            threadConfig: threadConfig,
            loading: loading,
            error: error,
            showSuccess: showSuccess,
            successMessage: successMessage,
            threadEnabled: threadEnabled,
            tempThreadEnabled: tempThreadEnabled,
            activeDataset: activeDataset,
            pendingDataset: pendingDataset,
            showActiveNetworkKey: showActiveNetworkKey,
            showPendingNetworkKey: showPendingNetworkKey,
            showActivePSKc: showActivePSKc,
            showPendingPSKc: showPendingPSKc,
            fetchThreadConfiguration: fetchThreadConfiguration,
            generateDataset: generateDataset,
            updateActiveDataset: updateActiveDataset,
            updatePendingDataset: updatePendingDataset,
            updateThreadEnabled: updateThreadEnabled,
            cancelEnableChanges: cancelEnableChanges,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
