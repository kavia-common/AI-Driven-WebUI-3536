import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQA } from '../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const props = defineProps();
// Extract algorithm from the key
const getAlgorithm = (key) => {
    const parts = key.split(' ');
    return parts[0] || '';
};
// Extract algorithm from the key
const getPublicKey = (key) => {
    const parts = key.split(' ');
    return parts[1] || '';
};
// Extract comment from the key
const getComment = (key) => {
    const parts = key.trim().split(' ');
    return parts.length >= 3 ? parts[parts.length - 1] : '';
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "key-viewer-overlay" },
    'data-testid': (__VLS_ctx.qa('ssh-key-viewer-overlay')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "key-viewer" },
    'data-testid': (__VLS_ctx.qa('ssh-key-viewer-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "viewer-title" },
    'data-testid': (__VLS_ctx.qa('ssh-key-viewer-title')),
});
(__VLS_ctx.t('ssh.publicKey'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "key-content" },
    'data-testid': (__VLS_ctx.qa('ssh-key-viewer-key-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "info-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('ssh-key-viewer-algorithm-label')),
});
(__VLS_ctx.t('ssh.algorithm'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "value" },
    'data-testid': (__VLS_ctx.qa('ssh-key-viewer-algorithm-value')),
});
(__VLS_ctx.getAlgorithm(__VLS_ctx.publicKey.Key));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "info-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('ssh-key-viewer-public-key-label')),
});
(__VLS_ctx.t('ssh.publicKey'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "value key-text" },
    'data-testid': (__VLS_ctx.qa('ssh-key-viewer-public-key-value')),
});
(__VLS_ctx.getPublicKey(__VLS_ctx.publicKey.Key));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "info-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('ssh-key-viewer-comment-label')),
});
(__VLS_ctx.t('ssh.comment'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "value" },
    'data-testid': (__VLS_ctx.qa('ssh-key-viewer-comment-value')),
});
(__VLS_ctx.getComment(__VLS_ctx.publicKey.Key));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "button-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.onClose) },
    ...{ class: "btn btn-primary" },
    'data-testid': (__VLS_ctx.qa('ssh-key-viewer-close-button')),
});
(__VLS_ctx.t('common.close'));
/** @type {__VLS_StyleScopedClasses['key-viewer-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['key-viewer']} */ ;
/** @type {__VLS_StyleScopedClasses['viewer-title']} */ ;
/** @type {__VLS_StyleScopedClasses['key-content']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['key-text']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['button-row']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
            getAlgorithm: getAlgorithm,
            getPublicKey: getPublicKey,
            getComment: getComment,
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
