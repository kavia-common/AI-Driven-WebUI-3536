import { computed } from 'vue';
const props = withDefaults(defineProps(), {
    variant: 'default',
    hover: false,
    compact: false,
});
const cardClasses = computed(() => {
    const classes = ['card'];
    if (props.variant === 'flat') {
        classes.push('card-flat');
    }
    else if (props.variant === 'elevated') {
        classes.push('card-elevated');
    }
    if (props.hover) {
        classes.push('card-hover');
    }
    return classes;
});
const bodyClasses = computed(() => {
    return props.compact ? 'card-body card-body-compact' : 'card-body';
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    variant: 'default',
    hover: false,
    compact: false,
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: (__VLS_ctx.cardClasses) },
});
if (__VLS_ctx.$slots.header || __VLS_ctx.title) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-header" },
    });
    var __VLS_0 = {};
    if (__VLS_ctx.title) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
            ...{ class: "card-title" },
        });
        (__VLS_ctx.title);
    }
    if (__VLS_ctx.subtitle) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "card-subtitle" },
        });
        (__VLS_ctx.subtitle);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: (__VLS_ctx.bodyClasses) },
});
var __VLS_2 = {};
if (__VLS_ctx.$slots.footer) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-footer" },
    });
    var __VLS_4 = {};
}
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['card-footer']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_3 = __VLS_2, __VLS_5 = __VLS_4;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            cardClasses: cardClasses,
            bodyClasses: bodyClasses,
        };
    },
    __typeProps: {},
    props: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
    props: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
