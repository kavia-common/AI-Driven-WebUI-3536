import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import agentModeWpsImage from '../../../assets/icons/wizard/pict_agent_mode_wps_client_wireless.svg';
import agentModeEthernetImage from '../../../assets/icons/wizard/pict_agent_mode_ethernet_client_wireless.svg';
const props = defineProps();
const emit = defineEmits(['next', 'prev', 'agent-mode-change']);
const { t } = useI18n();
const selectedMode = ref(props.agentSetupMode);
const selectMode = (mode) => {
    selectedMode.value = mode;
    emit('agent-mode-change', mode);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['progress-step']} */ ;
/** @type {__VLS_StyleScopedClasses['wifi-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-router']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-agent']} */ ;
/** @type {__VLS_StyleScopedClasses['mode-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['mode-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['instruction-content']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
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
(__VLS_ctx.t('wizard.agentSetupTitle'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "step-subtitle" },
});
(__VLS_ctx.t('wizard.agentSetupSubtitle'));
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
    ...{ class: "progress-step" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "setup-diagram" },
});
if (__VLS_ctx.selectedMode == 'wps') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (__VLS_ctx.agentModeWpsImage),
        alt: "Agent Mode WPS Diagram",
        ...{ class: "mode-image" },
    });
}
if (__VLS_ctx.selectedMode == 'ethernet') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (__VLS_ctx.agentModeEthernetImage),
        alt: "Agent Mode WPS Diagram",
        ...{ class: "mode-image" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mode-selection" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.selectMode('wps');
        } },
    ...{ class: "mode-btn" },
    ...{ class: ({ active: __VLS_ctx.selectedMode === 'wps' }) },
});
(__VLS_ctx.t('wizard.agentSetupViaWps'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.selectMode('ethernet');
        } },
    ...{ class: "mode-btn" },
    ...{ class: ({ active: __VLS_ctx.selectedMode === 'ethernet' }) },
});
(__VLS_ctx.t('wizard.agentSetupViaEthernet'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "instructions" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "instruction-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "instruction-number" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "instruction-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
(__VLS_ctx.t('wizard.agentStep1Title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.t('wizard.agentStep1Description'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "instruction-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "instruction-number" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "instruction-content" },
});
if (__VLS_ctx.selectedMode === 'wps') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    (__VLS_ctx.t('wizard.agentStep2Title'));
}
if (__VLS_ctx.selectedMode === 'wps') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.t('wizard.agentStep2Description'));
}
if (__VLS_ctx.selectedMode === 'ethernet') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    (__VLS_ctx.t('wizard.agentStep2EthernetTitle'));
}
if (__VLS_ctx.selectedMode === 'ethernet') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.t('wizard.agentStep2EthernetDescription'));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "instruction-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "instruction-number" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "instruction-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
(__VLS_ctx.t('wizard.agentStep3Title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.t('wizard.agentStep3Description'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "button-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('prev');
        } },
    ...{ class: "btn-secondary" },
});
(__VLS_ctx.t('common.back'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('next');
        } },
    ...{ class: "btn-primary" },
});
(__VLS_ctx.t('common.next'));
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
/** @type {__VLS_StyleScopedClasses['setup-diagram']} */ ;
/** @type {__VLS_StyleScopedClasses['mode-image']} */ ;
/** @type {__VLS_StyleScopedClasses['mode-image']} */ ;
/** @type {__VLS_StyleScopedClasses['mode-selection']} */ ;
/** @type {__VLS_StyleScopedClasses['mode-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['mode-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['instructions']} */ ;
/** @type {__VLS_StyleScopedClasses['instruction-item']} */ ;
/** @type {__VLS_StyleScopedClasses['instruction-number']} */ ;
/** @type {__VLS_StyleScopedClasses['instruction-content']} */ ;
/** @type {__VLS_StyleScopedClasses['instruction-item']} */ ;
/** @type {__VLS_StyleScopedClasses['instruction-number']} */ ;
/** @type {__VLS_StyleScopedClasses['instruction-content']} */ ;
/** @type {__VLS_StyleScopedClasses['instruction-item']} */ ;
/** @type {__VLS_StyleScopedClasses['instruction-number']} */ ;
/** @type {__VLS_StyleScopedClasses['instruction-content']} */ ;
/** @type {__VLS_StyleScopedClasses['button-container']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            agentModeWpsImage: agentModeWpsImage,
            agentModeEthernetImage: agentModeEthernetImage,
            t: t,
            selectedMode: selectedMode,
            selectMode: selectMode,
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
