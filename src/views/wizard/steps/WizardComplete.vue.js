import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import iconResultSucceedImage from '../../../assets/icons/wizard/ico-result-succeed.svg';
const props = defineProps();
const emit = defineEmits(['finish']);
const { t } = useI18n();
const displaySsid = computed(() => props.ssid || 'WNRFQQ-9d93-WPA3');
const displayModel = computed(() => props.deviceModel || '');
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['message']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-finish']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-finish']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "complete-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "complete-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "success-icon" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: (__VLS_ctx.iconResultSucceedImage),
    alt: "Updating",
    ...{ class: "mode-image" },
});
if (__VLS_ctx.displayModel) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: "device-name" },
    });
    (__VLS_ctx.displayModel);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
(__VLS_ctx.t('wizard.completeTitle'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "message" },
});
(__VLS_ctx.t('wizard.message', { ssid: __VLS_ctx.displaySsid }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('finish');
        } },
    ...{ class: "btn-finish" },
});
(__VLS_ctx.t('wizard.goToDashboard'));
/** @type {__VLS_StyleScopedClasses['complete-container']} */ ;
/** @type {__VLS_StyleScopedClasses['complete-card']} */ ;
/** @type {__VLS_StyleScopedClasses['success-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['mode-image']} */ ;
/** @type {__VLS_StyleScopedClasses['device-name']} */ ;
/** @type {__VLS_StyleScopedClasses['message']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-finish']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            iconResultSucceedImage: iconResultSucceedImage,
            t: t,
            displaySsid: displaySsid,
            displayModel: displayModel,
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
