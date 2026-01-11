import { computed, watch, onMounted, onUnmounted } from 'vue';
const props = withDefaults(defineProps(), {
    size: 'md',
    closable: true,
    closeOnOverlay: true,
    closeOnEscape: true,
});
const emit = defineEmits();
const modalClasses = computed(() => {
    const classes = ['modal-dialog'];
    classes.push(`modal-${props.size}`);
    return classes;
});
const close = () => {
    emit('update:modelValue', false);
    emit('close');
};
const handleOverlayClick = () => {
    if (props.closeOnOverlay) {
        close();
    }
};
const handleEscape = (event) => {
    if (event.key === 'Escape' && props.closeOnEscape && props.modelValue) {
        close();
    }
};
watch(() => props.modelValue, (newValue) => {
    if (newValue) {
        document.body.style.overflow = 'hidden';
    }
    else {
        document.body.style.overflow = '';
    }
});
onMounted(() => {
    document.addEventListener('keydown', handleEscape);
});
onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape);
    document.body.style.overflow = '';
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    size: 'md',
    closable: true,
    closeOnOverlay: true,
    closeOnEscape: true,
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['modal-close']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-enter-active']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-dialog']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-leave-active']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-dialog']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-enter-from']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-dialog']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-leave-to']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-dialog']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-dialog']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-body']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-footer']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.Teleport;
/** @type {[typeof __VLS_components.Teleport, typeof __VLS_components.Teleport, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "body",
}));
const __VLS_2 = __VLS_1({
    to: "body",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.Transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.Transition, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    name: "modal",
}));
const __VLS_6 = __VLS_5({
    name: "modal",
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
if (__VLS_ctx.modelValue) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (__VLS_ctx.handleOverlayClick) },
        ...{ class: "modal-overlay" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: () => { } },
        ...{ class: (__VLS_ctx.modalClasses) },
    });
    if (__VLS_ctx.$slots.header || __VLS_ctx.title) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "modal-header" },
        });
        var __VLS_8 = {};
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
            ...{ class: "modal-title" },
        });
        (__VLS_ctx.title);
        if (__VLS_ctx.closable) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (__VLS_ctx.close) },
                ...{ class: "modal-close" },
                type: "button",
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "modal-body" },
    });
    var __VLS_10 = {};
    if (__VLS_ctx.$slots.footer) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "modal-footer" },
        });
        var __VLS_12 = {};
    }
}
var __VLS_7;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['modal-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-title']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-close']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-body']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-footer']} */ ;
// @ts-ignore
var __VLS_9 = __VLS_8, __VLS_11 = __VLS_10, __VLS_13 = __VLS_12;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            modalClasses: modalClasses,
            close: close,
            handleOverlayClick: handleOverlayClick,
        };
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
