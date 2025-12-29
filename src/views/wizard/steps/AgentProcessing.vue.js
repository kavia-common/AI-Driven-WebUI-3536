import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { wizardApi } from '../../../services/api/wizard';
const props = defineProps();
const emit = defineEmits(['back-to-agent-setup', 'agent-success']);
const { t } = useI18n();
const countdown = ref(120);
const linkStatus = ref(undefined);
const onboardingStatus = ref('Inprogress');
const statusMessage = ref('');
let countdownTimer = null;
let statusPollTimer = null;
const startOnboarding = async () => {
    try {
        await wizardApi.startAgentOnboarding(props.agentSetupMode);
        startPolling();
    }
    catch (error) {
        console.error('Failed to start agent onboarding:', error);
        statusMessage.value = 'Failed to start setup. Please try again.';
    }
};
const pollStatus = async () => {
    try {
        const response = await wizardApi.getAgentStatus();
        linkStatus.value = response.WizardAgent.LinkStatus;
        onboardingStatus.value = response.WizardAgent.OnboardingStatus;
        if (onboardingStatus.value === 'Success') {
            stopPolling();
            emit('agent-success');
        }
        else if (props.agentSetupMode === 'ethernet' && linkStatus.value === 'Down') {
            stopPolling();
            statusMessage.value = 'Connection failed. Returning to setup.';
            setTimeout(() => {
                emit('back-to-agent-setup');
            }, 2000);
        }
        else {
            updateStatusMessage();
        }
    }
    catch (error) {
        console.error('Failed to poll agent status:', error);
    }
};
const updateStatusMessage = () => {
    if (linkStatus.value === undefined) {
        statusMessage.value = t('wizard.connectingMessage');
    }
    else if (linkStatus.value === 'Up') {
        statusMessage.value = t('wizard.connectionEstablished');
    }
    else if (linkStatus.value === 'Down') {
        statusMessage.value = t('wizard.connectionFailed');
    }
};
const startPolling = () => {
    statusPollTimer = window.setInterval(() => {
        pollStatus();
    }, 2000);
};
const stopPolling = () => {
    if (statusPollTimer) {
        clearInterval(statusPollTimer);
        statusPollTimer = null;
    }
    if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
    }
};
onMounted(() => {
    statusMessage.value = t('wizard.connectingMessage');
    countdownTimer = window.setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
            stopPolling();
            statusMessage.value = 'Setup timed out. Returning to setup.';
            setTimeout(() => {
                emit('back-to-agent-setup');
            }, 2000);
        }
    }, 1000);
    startOnboarding();
});
onUnmounted(() => {
    stopPolling();
});
const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['progress-step']} */ ;
/** @type {__VLS_StyleScopedClasses['processing-container']} */ ;
/** @type {__VLS_StyleScopedClasses['processing-container']} */ ;
/** @type {__VLS_StyleScopedClasses['countdown']} */ ;
/** @type {__VLS_StyleScopedClasses['countdown']} */ ;
/** @type {__VLS_StyleScopedClasses['status-info']} */ ;
/** @type {__VLS_StyleScopedClasses['info-box']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "step-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "step-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "step-title" },
});
(__VLS_ctx.t('wizard.processingTitle'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "step-subtitle" },
});
(__VLS_ctx.t('wizard.processingSubtitle'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "progress-bar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "progress-step active" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "progress-step active" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "progress-step active" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "progress-step active" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "processing-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "spinner" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
(__VLS_ctx.statusMessage);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "status-info" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
(__VLS_ctx.linkStatus);
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
(__VLS_ctx.onboardingStatus);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "countdown" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.t('wizard.timeoutIn'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
(__VLS_ctx.formatTime(__VLS_ctx.countdown));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "info-box" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.t('wizard.timeoutMessage'));
/** @type {__VLS_StyleScopedClasses['step-container']} */ ;
/** @type {__VLS_StyleScopedClasses['step-card']} */ ;
/** @type {__VLS_StyleScopedClasses['step-title']} */ ;
/** @type {__VLS_StyleScopedClasses['step-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-step']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-step']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-step']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-step']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['processing-container']} */ ;
/** @type {__VLS_StyleScopedClasses['spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['status-info']} */ ;
/** @type {__VLS_StyleScopedClasses['countdown']} */ ;
/** @type {__VLS_StyleScopedClasses['info-box']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            t: t,
            countdown: countdown,
            linkStatus: linkStatus,
            onboardingStatus: onboardingStatus,
            statusMessage: statusMessage,
            formatTime: formatTime,
        };
    },
    emits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
