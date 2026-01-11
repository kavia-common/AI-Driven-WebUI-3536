import { useI18n } from 'vue-i18n';
import { useQA } from '../../utils/qa';
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
    ...{ class: "band-info" },
    'data-testid': (__VLS_ctx.qa('wlan-band-info-container')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "info-grid" },
    'data-testid': (__VLS_ctx.qa('wlan-band-info-grid')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "info-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-label" },
    'data-testid': (__VLS_ctx.qa('wlan-band-info-status-label')),
});
(__VLS_ctx.t('wlan.status'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-value" },
    'data-testid': (__VLS_ctx.qa('wlan-band-info-status-value')),
});
(__VLS_ctx.band.Enable ? __VLS_ctx.t('wlan.enable') : __VLS_ctx.t('wlan.disable'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "info-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-label" },
    'data-testid': (__VLS_ctx.qa('wlan-band-info-channel-label')),
});
(__VLS_ctx.t('wlan.channel'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-value" },
    'data-testid': (__VLS_ctx.qa('wlan-band-info-channel-value')),
});
(__VLS_ctx.band.Channel);
(__VLS_ctx.band.AutoChannel ? __VLS_ctx.t('wlan.auto') : '');
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "info-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-label" },
    'data-testid': (__VLS_ctx.qa('wlan-band-info-bandwidth-label')),
});
(__VLS_ctx.t('wlan.bandwidth'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-value" },
    'data-testid': (__VLS_ctx.qa('wlan-band-info-bandwidth-value')),
});
(__VLS_ctx.band.Bandwidth);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "info-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-label" },
    'data-testid': (__VLS_ctx.qa('wlan-band-info-mac-label')),
});
(__VLS_ctx.t('wlan.macAddress'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-value" },
    'data-testid': (__VLS_ctx.qa('wlan-band-info-mac-value')),
});
(__VLS_ctx.band.MACAddress);
/** @type {__VLS_StyleScopedClasses['band-info']} */ ;
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
