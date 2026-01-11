import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const __VLS_props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wan-status-summary" },
    'data-testid': (__VLS_ctx.qa('wan-status-summary-container')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-title" },
    'data-testid': (__VLS_ctx.qa('wan-status-summary-title')),
});
(__VLS_ctx.t('wan.status'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card-content" },
    'data-testid': (__VLS_ctx.qa('wan-status-summary-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "info-grid" },
    'data-testid': (__VLS_ctx.qa('wan-status-summary-grid')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "info-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-label" },
    'data-testid': (__VLS_ctx.qa('wan-status-summary-operation-mode-label')),
});
(__VLS_ctx.t('wan.operationMode'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-value" },
    'data-testid': (__VLS_ctx.qa('wan-status-summary-operation-mode-value')),
});
(__VLS_ctx.status.OperationMode);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "info-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-label" },
    'data-testid': (__VLS_ctx.qa('wan-status-summary-sensing-policy-label')),
});
(__VLS_ctx.t('wan.sensingPolicy'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-value" },
    'data-testid': (__VLS_ctx.qa('wan-status-summary-sensing-policy-value')),
});
(__VLS_ctx.status.SensingPolicy);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "info-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-label" },
    'data-testid': (__VLS_ctx.qa('wan-status-summary-sensing-timeout-label')),
});
(__VLS_ctx.t('wan.sensingTimeout'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-value" },
    'data-testid': (__VLS_ctx.qa('wan-status-summary-sensing-timeout-value')),
});
(__VLS_ctx.status.SensingTimeout);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "info-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-label" },
    'data-testid': (__VLS_ctx.qa('wan-status-summary-wan-mode-label')),
});
(__VLS_ctx.t('wan.wanMode'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-value" },
    'data-testid': (__VLS_ctx.qa('wan-status-summary-wan-mode-value')),
});
(__VLS_ctx.status.WANMode);
/** @type {__VLS_StyleScopedClasses['wan-status-summary']} */ ;
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
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
