import { useI18n } from 'vue-i18n';
import { useQA } from '../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const __VLS_props = defineProps();
const __VLS_emit = defineEmits();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['dialog-content']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-buttons']} */ ;
// CSS variable injection 
// CSS variable injection end 
if (__VLS_ctx.isOpen) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dialog-overlay" },
        'data-testid': (__VLS_ctx.qa('confirmation-dialog-overlay')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dialog-content" },
        'data-testid': (__VLS_ctx.qa('confirmation-dialog-content')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "dialog-title" },
        'data-testid': (__VLS_ctx.qa('confirmation-dialog-title')),
    });
    (__VLS_ctx.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "dialog-message" },
        'data-testid': (__VLS_ctx.qa('confirmation-dialog-message')),
    });
    (__VLS_ctx.message);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dialog-buttons" },
        'data-testid': (__VLS_ctx.qa('confirmation-dialog-buttons')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    return;
                __VLS_ctx.$emit('cancel');
            } },
        ...{ class: "btn btn-secondary" },
        'data-testid': (__VLS_ctx.qa('confirmation-dialog-cancel-button')),
    });
    (__VLS_ctx.cancelText || __VLS_ctx.t('common.no'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    return;
                __VLS_ctx.$emit('confirm');
            } },
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('confirmation-dialog-confirm-button')),
    });
    (__VLS_ctx.confirmText || __VLS_ctx.t('common.yes'));
}
/** @type {__VLS_StyleScopedClasses['dialog-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-content']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-title']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-message']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
