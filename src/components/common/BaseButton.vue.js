import { computed } from 'vue';
const props = withDefaults(defineProps(), {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    loading: false,
    block: false,
    icon: false,
});
const emit = defineEmits();
const buttonClasses = computed(() => {
    const classes = ['btn'];
    classes.push(`btn-${props.variant}`);
    if (props.size !== 'md') {
        classes.push(`btn-${props.size}`);
    }
    if (props.loading) {
        classes.push('btn-loading');
    }
    if (props.block) {
        classes.push('btn-block');
    }
    if (props.icon) {
        classes.push(`btn-icon`);
        if (props.size !== 'md') {
            classes.push(`btn-icon-${props.size}`);
        }
    }
    return classes;
});
const handleClick = (event) => {
    if (!props.disabled && !props.loading) {
        emit('click', event);
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    loading: false,
    block: false,
    icon: false,
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleClick) },
    type: (__VLS_ctx.type),
    ...{ class: (__VLS_ctx.buttonClasses) },
    disabled: (__VLS_ctx.disabled || __VLS_ctx.loading),
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "btn-spinner" },
    });
}
if (!__VLS_ctx.loading) {
    var __VLS_0 = {};
}
if (!__VLS_ctx.loading && __VLS_ctx.$slots.default) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "btn-text" },
    });
    var __VLS_2 = {};
}
if (!__VLS_ctx.loading) {
    var __VLS_4 = {};
}
/** @type {__VLS_StyleScopedClasses['btn-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-text']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_3 = __VLS_2, __VLS_5 = __VLS_4;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            buttonClasses: buttonClasses,
            handleClick: handleClick,
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
