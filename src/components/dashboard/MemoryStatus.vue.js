import { defineProps, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQA } from '../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const props = defineProps();
const usedMemory = computed(() => {
    if (!props.memoryInfo)
        return 0;
    return props.memoryInfo.Total - props.memoryInfo.Free;
});
const usedPercentage = computed(() => {
    if (!props.memoryInfo?.Total)
        return 0;
    return ((usedMemory.value / props.memoryInfo.Total) * 100).toFixed(1);
});
const formatBytes = (bytes) => {
    const mb = bytes / 1024;
    return `${mb.toFixed(2)} MB`;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['detail-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-item']} */ ;
// CSS variable injection 
// CSS variable injection end 
if (__VLS_ctx.memoryInfo) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "memory-status" },
        'data-testid': (__VLS_ctx.qa('dashboard-memory-status-content')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "card-title" },
        'data-testid': (__VLS_ctx.qa('dashboard-memory-status-title')),
    });
    (__VLS_ctx.t('dashboard.memory'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "memory-container" },
        'data-testid': (__VLS_ctx.qa('dashboard-memory-status-container')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "donut-chart" },
        'data-testid': (__VLS_ctx.qa('dashboard-memory-status-chart')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
        viewBox: "0 0 36 36",
        ...{ class: "donut" },
        'data-testid': (__VLS_ctx.qa('dashboard-memory-status-svg')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.circle)({
        ...{ class: "donut-ring" },
        'data-testid': (__VLS_ctx.qa('dashboard-memory-status-ring')),
        cx: "18",
        cy: "18",
        r: "15.91549430918954",
        fill: "transparent",
        stroke: "#e6e6e6",
        'stroke-width': "3",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.circle)({
        ...{ class: "donut-segment" },
        'data-testid': (__VLS_ctx.qa('dashboard-memory-status-segment')),
        cx: "18",
        cy: "18",
        r: "15.91549430918954",
        fill: "transparent",
        stroke: "#0070BB",
        'stroke-width': "3",
        'stroke-dasharray': (`${__VLS_ctx.usedPercentage} ${100 - Number(__VLS_ctx.usedPercentage)}`),
        'stroke-dashoffset': "25",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "donut-text" },
        'data-testid': (__VLS_ctx.qa('dashboard-memory-status-text')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "percentage" },
        'data-testid': (__VLS_ctx.qa('dashboard-memory-status-percentage')),
    });
    (__VLS_ctx.usedPercentage);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "label" },
        'data-testid': (__VLS_ctx.qa('dashboard-memory-status-used-label')),
    });
    (__VLS_ctx.t('dashboard.used'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "memory-details" },
        'data-testid': (__VLS_ctx.qa('dashboard-memory-status-details')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "detail-item" },
        'data-testid': (__VLS_ctx.qa('dashboard-memory-status-total')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "label" },
        'data-testid': (__VLS_ctx.qa('dashboard-memory-status-total-label')),
    });
    (__VLS_ctx.t('dashboard.total'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "value" },
        'data-testid': (__VLS_ctx.qa('dashboard-memory-status-total-value')),
    });
    (__VLS_ctx.formatBytes(__VLS_ctx.memoryInfo.Total));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "detail-item" },
        'data-testid': (__VLS_ctx.qa('dashboard-memory-status-free')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "label" },
        'data-testid': (__VLS_ctx.qa('dashboard-memory-status-free-label')),
    });
    (__VLS_ctx.t('dashboard.free'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "value" },
        'data-testid': (__VLS_ctx.qa('dashboard-memory-status-free-value')),
    });
    (__VLS_ctx.formatBytes(__VLS_ctx.memoryInfo.Free));
}
/** @type {__VLS_StyleScopedClasses['memory-status']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['memory-container']} */ ;
/** @type {__VLS_StyleScopedClasses['donut-chart']} */ ;
/** @type {__VLS_StyleScopedClasses['donut']} */ ;
/** @type {__VLS_StyleScopedClasses['donut-ring']} */ ;
/** @type {__VLS_StyleScopedClasses['donut-segment']} */ ;
/** @type {__VLS_StyleScopedClasses['donut-text']} */ ;
/** @type {__VLS_StyleScopedClasses['percentage']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['memory-details']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
            usedPercentage: usedPercentage,
            formatBytes: formatBytes,
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
