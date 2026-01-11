import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { wizardApi } from '../../../services/api/wizard';
import iconResultSucceedImage from '../../../assets/icons/wizard/ico-result-succeed.svg';
const props = defineProps();
const { t } = useI18n();
const isRedirecting = ref(false);
const handleFinish = async () => {
    if (isRedirecting.value)
        return;
    try {
        isRedirecting.value = true;
        await wizardApi.completeAgentSetup();
        // Redirect to 192.168.101.1
        window.location.href = 'http://192.168.101.1';
    }
    catch (error) {
        console.error('Failed to complete agent setup:', error);
        isRedirecting.value = false;
    }
};
const deviceModel = props.wizardData?.ModelName || '';
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['instructions']} */ ;
/** @type {__VLS_StyleScopedClasses['finish-button']} */ ;
/** @type {__VLS_StyleScopedClasses['finish-button']} */ ;
/** @type {__VLS_StyleScopedClasses['step-card']} */ ;
/** @type {__VLS_StyleScopedClasses['device-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['device-model']} */ ;
/** @type {__VLS_StyleScopedClasses['finish-title']} */ ;
/** @type {__VLS_StyleScopedClasses['instructions']} */ ;
/** @type {__VLS_StyleScopedClasses['finish-button']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "step-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "step-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "success-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "device-icon" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: (__VLS_ctx.iconResultSucceedImage),
    alt: "Updating",
    ...{ class: "mode-image" },
});
if (__VLS_ctx.deviceModel) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: "device-model" },
    });
    (__VLS_ctx.deviceModel);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "finish-title" },
});
(__VLS_ctx.t('wizard.agentCompleteTitle'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "instructions" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.t('wizard.instruction1'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.t('wizard.instruction2'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleFinish) },
    ...{ class: "finish-button" },
    disabled: (__VLS_ctx.isRedirecting),
});
(__VLS_ctx.isRedirecting ? __VLS_ctx.t('wizard.redirecting') : __VLS_ctx.t('wizard.finishButton'));
/** @type {__VLS_StyleScopedClasses['step-container']} */ ;
/** @type {__VLS_StyleScopedClasses['step-card']} */ ;
/** @type {__VLS_StyleScopedClasses['success-content']} */ ;
/** @type {__VLS_StyleScopedClasses['device-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['mode-image']} */ ;
/** @type {__VLS_StyleScopedClasses['device-model']} */ ;
/** @type {__VLS_StyleScopedClasses['finish-title']} */ ;
/** @type {__VLS_StyleScopedClasses['instructions']} */ ;
/** @type {__VLS_StyleScopedClasses['finish-button']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            iconResultSucceedImage: iconResultSucceedImage,
            t: t,
            isRedirecting: isRedirecting,
            handleFinish: handleFinish,
            deviceModel: deviceModel,
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
