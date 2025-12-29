import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getThreadStatus, scanThreadNetworks } from '../../../services/api/thread';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const threadStatus = ref(null);
const scanData = ref(null);
const loading = ref(true);
const scanLoading = ref(false);
const error = ref(null);
const scanError = ref(null);
const refreshInterval = ref(null);
const showNetworkKey = ref(false);
const showPSKc = ref(false);
const fetchThreadStatus = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await getThreadStatus();
        // Check if the response contains an error message
        if ('NOK' in response) {
            console.warn('Thread status API returned an error:', response.NOK);
            // Don't update threadStatus.value, keep the previous valid data
            // Only set error if we don't have any data yet
            if (!threadStatus.value) {
                error.value = 'Failed to fetch Thread status. Please try again later.';
            }
        }
        else {
            // Only update the UI with valid data
            threadStatus.value = response;
            error.value = null;
        }
    }
    catch (err) {
        console.error('Error fetching Thread status:', err);
        // Only set error if we don't have any data yet
        if (!threadStatus.value) {
            error.value = 'Failed to fetch Thread status';
        }
    }
    finally {
        loading.value = false;
    }
};
const handleRefresh = () => {
    fetchThreadStatus();
};
const handleScan = async () => {
    scanLoading.value = true;
    scanError.value = null;
    try {
        scanData.value = await scanThreadNetworks();
    }
    catch (err) {
        console.error('Error scanning for Thread networks:', err);
        scanError.value = 'Failed to scan for Thread networks';
    }
    finally {
        scanLoading.value = false;
    }
};
const toggleShowNetworkKey = () => {
    showNetworkKey.value = !showNetworkKey.value;
};
const toggleShowPSKc = () => {
    showPSKc.value = !showPSKc.value;
};
onMounted(() => {
    fetchThreadStatus();
    // Refresh every 30 seconds
    refreshInterval.value = window.setInterval(fetchThreadStatus, 30000);
});
onUnmounted(() => {
    if (refreshInterval.value) {
        clearInterval(refreshInterval.value);
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['toggle-password']} */ ;
/** @type {__VLS_StyleScopedClasses['thread-content']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title-sp']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "thread-content" },
    'data-testid': (__VLS_ctx.qa('thread-status-content')),
});
if (__VLS_ctx.loading && !__VLS_ctx.threadStatus) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('thread-status-loading')),
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
        'data-testid': (__VLS_ctx.qa('thread-status-error')),
    });
    (__VLS_ctx.error);
}
else if (__VLS_ctx.threadStatus) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
        'data-testid': (__VLS_ctx.qa('thread-status-border-router-section')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "section-title" },
        'data-testid': (__VLS_ctx.qa('thread-status-border-router-title')),
    });
    (__VLS_ctx.t('thread.borderRouter'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-grid" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-border-router-status-label')),
    });
    (__VLS_ctx.t('thread.status'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-border-router-status-value')),
        ...{ class: ({ 'status-running': __VLS_ctx.threadStatus.ThreadStatus['Border Router'].Status === 'Running' }) },
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].Status);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-border-agent-id-label')),
    });
    (__VLS_ctx.t('thread.borderAgentId'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-border-agent-id-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].BorderAgentID);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
        'data-testid': (__VLS_ctx.qa('thread-status-mle-section')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "section-title" },
        'data-testid': (__VLS_ctx.qa('thread-status-mle-title')),
    });
    (__VLS_ctx.t('thread.mle'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-grid" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-extended-mac-label')),
    });
    (__VLS_ctx.t('thread.extendedMac'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-extended-mac-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.ExtendedMAC);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-role-label')),
    });
    (__VLS_ctx.t('thread.role'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-role-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.Role || '-');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-rloc16-label')),
    });
    (__VLS_ctx.t('thread.rloc16'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-rloc16-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.Rloc16 || '-');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-interface-label')),
    });
    (__VLS_ctx.t('thread.interface'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-interface-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.Interface);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-firmware-version-label')),
    });
    (__VLS_ctx.t('thread.firmwareVersion'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-firmware-version-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.FirmwareVersion);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dataset-section" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "subsection-title" },
        'data-testid': (__VLS_ctx.qa('thread-status-dataset-title')),
    });
    (__VLS_ctx.t('thread.dataset'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-grid" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-channel-label')),
    });
    (__VLS_ctx.t('thread.channel'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-channel-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.Dataset.Channel || '-');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-channel-mask-label')),
    });
    (__VLS_ctx.t('thread.channelMask'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-channel-mask-value')),
    });
    (Array.isArray(__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.Dataset.ChannelMask)
        ? __VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.Dataset.ChannelMask.join(', ')
        : __VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.Dataset.ChannelMask || '-');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-extended-pan-id-label')),
    });
    (__VLS_ctx.t('thread.extendedPanId'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-extended-pan-id-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.Dataset.ExtendedPanId || '-');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-mesh-local-prefix-label')),
    });
    (__VLS_ctx.t('thread.meshLocalPrefix'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-mesh-local-prefix-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.Dataset.MeshLocalPrefix || '-');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-network-key-label')),
    });
    (__VLS_ctx.t('thread.networkKey'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "password-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-network-key-value')),
    });
    if (__VLS_ctx.showNetworkKey) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            'data-testid': (__VLS_ctx.qa('thread-status-network-key-text')),
        });
        (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.Dataset.NetworkKey || '-');
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.toggleShowNetworkKey) },
        type: "button",
        ...{ class: "toggle-password" },
        'data-testid': (__VLS_ctx.qa('thread-status-network-key-toggle')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    (__VLS_ctx.showNetworkKey ? 'visibility_off' : 'visibility');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-network-name-label')),
    });
    (__VLS_ctx.t('thread.networkName'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-network-name-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.Dataset.NetworkName || '-');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-pskc-label')),
    });
    (__VLS_ctx.t('thread.pskc'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "password-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-pskc-value')),
    });
    if (__VLS_ctx.showPSKc) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            'data-testid': (__VLS_ctx.qa('thread-status-pskc-text')),
        });
        (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.Dataset.PSKc || '-');
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.toggleShowPSKc) },
        type: "button",
        ...{ class: "toggle-password" },
        'data-testid': (__VLS_ctx.qa('thread-status-pskc-toggle')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    (__VLS_ctx.showPSKc ? 'visibility_off' : 'visibility');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-pan-id-label')),
    });
    (__VLS_ctx.t('thread.panId'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-pan-id-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.Dataset.PanId || '-');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-security-policy-label')),
    });
    (__VLS_ctx.t('thread.securityPolicy'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-security-policy-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.Dataset.SecurityPolicy || '-');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-hex-encoded-label')),
    });
    (__VLS_ctx.t('thread.hexEncodedTlv'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-value tlv-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-hex-encoded-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.Dataset['Hex-encoded'] || '-');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "leader-data-section" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "subsection-title" },
        'data-testid': (__VLS_ctx.qa('thread-status-leader-data-title')),
    });
    (__VLS_ctx.t('thread.leaderData'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-grid" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-data-version-label')),
    });
    (__VLS_ctx.t('thread.dataVersion'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-data-version-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.LeaderData.DataVersion);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-leader-router-id-label')),
    });
    (__VLS_ctx.t('thread.leaderRouterId'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-leader-router-id-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.LeaderData.LeaderRouterID);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-stable-data-version-label')),
    });
    (__VLS_ctx.t('thread.stableDataVersion'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-stable-data-version-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.LeaderData.StableDataVersion);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-partition-id-label')),
    });
    (__VLS_ctx.t('thread.partitionId'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-partition-id-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.LeaderData.PartitionID);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-weighting-label')),
    });
    (__VLS_ctx.t('thread.weighting'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-weighting-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.LeaderData.Weighting);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "stats-section" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "subsection-title" },
        'data-testid': (__VLS_ctx.qa('thread-status-stats-title')),
    });
    (__VLS_ctx.t('thread.stats'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "stats-grid" },
        'data-testid': (__VLS_ctx.qa('thread-status-stats-grid')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "stats-column" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "stats-header" },
        'data-testid': (__VLS_ctx.qa('thread-status-tx-header')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "stats-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "stats-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-tx-bytes-label')),
    });
    (__VLS_ctx.t('thread.txBytes'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "stats-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-tx-bytes-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.Stats['TX Bytes']);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "stats-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "stats-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-tx-packets-label')),
    });
    (__VLS_ctx.t('thread.txPackets'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "stats-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-tx-packets-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.Stats['TX Packets']);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "stats-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "stats-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-tx-dropped-label')),
    });
    (__VLS_ctx.t('thread.txDropped'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "stats-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-tx-dropped-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.Stats['TX Dropped']);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "stats-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "stats-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-tx-errors-label')),
    });
    (__VLS_ctx.t('thread.txErrors'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "stats-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-tx-errors-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.Stats['TX Errors']);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "stats-column" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "stats-header" },
        'data-testid': (__VLS_ctx.qa('thread-status-rx-header')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "stats-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "stats-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-rx-bytes-label')),
    });
    (__VLS_ctx.t('thread.rxBytes'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "stats-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-rx-bytes-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.Stats['RX Bytes']);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "stats-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "stats-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-rx-packets-label')),
    });
    (__VLS_ctx.t('thread.rxPackets'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "stats-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-rx-packets-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.Stats['RX Packets']);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "stats-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "stats-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-rx-dropped-label')),
    });
    (__VLS_ctx.t('thread.rxDropped'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "stats-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-rx-dropped-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.Stats['RX Dropped']);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "stats-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "stats-label" },
        'data-testid': (__VLS_ctx.qa('thread-status-rx-errors-label')),
    });
    (__VLS_ctx.t('thread.rxErrors'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "stats-value" },
        'data-testid': (__VLS_ctx.qa('thread-status-rx-errors-value')),
    });
    (__VLS_ctx.threadStatus.ThreadStatus['Border Router'].MLE.Stats['RX Errors']);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
        'data-testid': (__VLS_ctx.qa('thread-status-pans-section')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "header-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "section-title-sp" },
        'data-testid': (__VLS_ctx.qa('thread-status-pans-title')),
    });
    (__VLS_ctx.t('thread.availablePans'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleScan) },
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('thread-status-scan-button')),
        disabled: (__VLS_ctx.scanLoading),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    (__VLS_ctx.scanLoading ? __VLS_ctx.t('diagnostics.processing') : __VLS_ctx.t('thread.scan'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-content" },
    });
    if (__VLS_ctx.scanError) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "error-message" },
            'data-testid': (__VLS_ctx.qa('thread-status-scan-error')),
        });
        (__VLS_ctx.scanError);
    }
    if (__VLS_ctx.scanLoading) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "loading-state" },
            'data-testid': (__VLS_ctx.qa('thread-status-scan-loading')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "loading-spinner" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.t('diagnostics.processing'));
    }
    else if (__VLS_ctx.scanData && __VLS_ctx.scanData.ThreadScan.PANs.length > 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "table-container" },
            'data-testid': (__VLS_ctx.qa('thread-status-pans-table')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('thread-status-pans-header-no')),
        });
        (__VLS_ctx.t('thread.no'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('thread-status-pans-header-pan-id')),
        });
        (__VLS_ctx.t('thread.panId'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('thread-status-pans-header-extended-pan-id')),
        });
        (__VLS_ctx.t('thread.extendedPanId'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('thread-status-pans-header-channel')),
        });
        (__VLS_ctx.t('thread.channel'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('thread-status-pans-header-rssi')),
        });
        (__VLS_ctx.t('thread.rssi'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('thread-status-pans-header-lqi')),
        });
        (__VLS_ctx.t('thread.lqi'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
        for (const [pan, index] of __VLS_getVForSourceType((__VLS_ctx.scanData.ThreadScan.PANs))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
                key: (index),
                'data-testid': (__VLS_ctx.qa(`thread-status-pans-row-${index}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`thread-status-pans-no-${index}`)),
            });
            (index + 1);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`thread-status-pans-pan-id-${index}`)),
            });
            (pan.PanId);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`thread-status-pans-extended-mac-${index}`)),
            });
            (pan.ExtendedMAC);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`thread-status-pans-channel-${index}`)),
            });
            (pan.Channel);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`thread-status-pans-rssi-${index}`)),
            });
            (pan.RSSI);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`thread-status-pans-lqi-${index}`)),
            });
            (pan.LQI);
        }
    }
    else if (__VLS_ctx.scanData) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "no-data-mobile" },
            'data-testid': (__VLS_ctx.qa('thread-status-pans-no-data')),
        });
    }
    else if (!__VLS_ctx.scanLoading) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "no-data-mobile" },
            'data-testid': (__VLS_ctx.qa('thread-status-pans-scan-prompt')),
        });
    }
    if (__VLS_ctx.scanData && __VLS_ctx.scanData.ThreadScan.PANs.length > 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "mobile-cards" },
            'data-testid': (__VLS_ctx.qa('thread-status-pans-mobile')),
        });
        for (const [pan, index] of __VLS_getVForSourceType((__VLS_ctx.scanData.ThreadScan.PANs))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "table-card" },
                key: (index),
                'data-testid': (__VLS_ctx.qa(`thread-status-pans-card-${index}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`thread-status-pans-card-no-label-${index}`)),
            });
            (__VLS_ctx.t('thread.no'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`thread-status-pans-card-no-value-${index}`)),
            });
            (index + 1);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`thread-status-pans-card-pan-id-label-${index}`)),
            });
            (__VLS_ctx.t('thread.panId'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`thread-status-pans-card-pan-id-value-${index}`)),
            });
            (pan.PanId);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`thread-status-pans-card-extended-mac-label-${index}`)),
            });
            (__VLS_ctx.t('thread.extendedPanId'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`thread-status-pans-card-extended-mac-value-${index}`)),
            });
            (pan.ExtendedMAC);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`thread-status-pans-card-channel-label-${index}`)),
            });
            (__VLS_ctx.t('thread.channel'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`thread-status-pans-card-channel-value-${index}`)),
            });
            (pan.Channel);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`thread-status-pans-card-rssi-label-${index}`)),
            });
            (__VLS_ctx.t('thread.rssi'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`thread-status-pans-card-rssi-value-${index}`)),
            });
            (pan.RSSI);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`thread-status-pans-card-lqi-label-${index}`)),
            });
            (__VLS_ctx.t('thread.lqi'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`thread-status-pans-card-lqi-value-${index}`)),
            });
            (pan.LQI);
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "button-container" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleRefresh) },
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('thread-status-refresh-button')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    (__VLS_ctx.t('common.refresh'));
}
/** @type {__VLS_StyleScopedClasses['thread-content']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['info-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['info-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['dataset-section']} */ ;
/** @type {__VLS_StyleScopedClasses['subsection-title']} */ ;
/** @type {__VLS_StyleScopedClasses['info-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['password-value']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-password']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['password-value']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-password']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['tlv-value']} */ ;
/** @type {__VLS_StyleScopedClasses['leader-data-section']} */ ;
/** @type {__VLS_StyleScopedClasses['subsection-title']} */ ;
/** @type {__VLS_StyleScopedClasses['info-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-section']} */ ;
/** @type {__VLS_StyleScopedClasses['subsection-title']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-column']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-header']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-row']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-row']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-row']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-row']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-column']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-header']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-row']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-row']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-row']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-value']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-row']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-label']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-value']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['header-row']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title-sp']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['no-data-mobile']} */ ;
/** @type {__VLS_StyleScopedClasses['no-data-mobile']} */ ;
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
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['button-container']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
            threadStatus: threadStatus,
            scanData: scanData,
            loading: loading,
            scanLoading: scanLoading,
            error: error,
            scanError: scanError,
            showNetworkKey: showNetworkKey,
            showPSKc: showPSKc,
            handleRefresh: handleRefresh,
            handleScan: handleScan,
            toggleShowNetworkKey: toggleShowNetworkKey,
            toggleShowPSKc: toggleShowPSKc,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
