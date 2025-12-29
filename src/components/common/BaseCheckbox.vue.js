import { computed } from 'vue';
const props = withDefaults(defineProps(), {
    disabled: false,
    required: false,
});
const emit = defineEmits();
const checkboxId = computed(() => props.id || `checkbox-${Math.random().toString(36).substring(7)}`);
const handleChange = (event) => {
    const target = event.target;
    emit('update:modelValue', target.checked);
    emit('change', target.checked);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    disabled: false,
    required: false,
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-check" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onChange: (__VLS_ctx.handleChange) },
    id: (__VLS_ctx.checkboxId),
    type: "checkbox",
    checked: (__VLS_ctx.modelValue),
    disabled: (__VLS_ctx.disabled),
    required: (__VLS_ctx.required),
    ...{ class: "form-check-input" },
});
if (__VLS_ctx.label || __VLS_ctx.$slots.default) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: (__VLS_ctx.checkboxId),
        ...{ class: "form-check-label" },
    });
    var __VLS_0 = {};
    (__VLS_ctx.label);
}
/** @type {__VLS_StyleScopedClasses['form-check']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check-label']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            checkboxId: checkboxId,
            handleChange: handleChange,
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
