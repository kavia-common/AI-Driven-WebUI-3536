import { computed } from 'vue';
const props = withDefaults(defineProps(), {
    size: 'md',
    variant: 'primary',
    centered: false,
    fullPage: false,
});
const containerClasses = computed(() => {
    const classes = ['spinner-container'];
    if (props.centered || props.fullPage) {
        classes.push('spinner-centered');
    }
    if (props.fullPage) {
        classes.push('spinner-fullpage');
    }
    return classes;
});
const spinnerClasses = computed(() => {
    const classes = ['spinner'];
    classes.push(`spinner-${props.size}`);
    classes.push(`spinner-${props.variant}`);
    return classes;
});
const textClasses = computed(() => {
    const classes = ['spinner-text'];
    classes.push(`text-${props.variant === 'white' ? 'inverse' : 'secondary'}`);
    return classes;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    size: 'md',
    variant: 'primary',
    centered: false,
    fullPage: false,
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: (__VLS_ctx.containerClasses) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: (__VLS_ctx.spinnerClasses) },
});
if (__VLS_ctx.text) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: (__VLS_ctx.textClasses) },
    });
    (__VLS_ctx.text);
}
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            containerClasses: containerClasses,
            spinnerClasses: spinnerClasses,
            textClasses: textClasses,
        };
    },
    __typeProps: {},
    props: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
    props: {},
});
; /* PartiallyEnd: #4569/main.vue */
