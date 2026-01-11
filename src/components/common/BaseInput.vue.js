import { computed, ref } from 'vue';
const props = withDefaults(defineProps(), {
    type: 'text',
    placeholder: '',
    disabled: false,
    readonly: false,
    required: false,
    size: 'md',
    error: false,
});
const emit = defineEmits();
const inputRef = ref(null);
const inputId = computed(() => props.id || `input-${Math.random().toString(36).substring(7)}`);
const inputClasses = computed(() => {
    const classes = ['form-input'];
    if (props.size !== 'md') {
        classes.push(`form-input-${props.size}`);
    }
    if (props.error || props.errorMessage) {
        classes.push('is-invalid');
    }
    return classes;
});
const handleInput = (event) => {
    const target = event.target;
    const value = props.type === 'number' ? Number(target.value) : target.value;
    emit('update:modelValue', value);
};
const handleBlur = (event) => {
    emit('blur', event);
};
const handleFocus = (event) => {
    emit('focus', event);
};
const __VLS_exposed = {
    focus: () => inputRef.value?.focus(),
    blur: () => inputRef.value?.blur(),
};
defineExpose(__VLS_exposed);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    type: 'text',
    placeholder: '',
    disabled: false,
    readonly: false,
    required: false,
    size: 'md',
    error: false,
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['input-wrapper']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
if (__VLS_ctx.label) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: (__VLS_ctx.inputId),
        ...{ class: "form-label" },
        ...{ class: ({ 'form-label-required': __VLS_ctx.required }) },
    });
    (__VLS_ctx.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "input-wrapper" },
});
var __VLS_0 = {};
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onInput: (__VLS_ctx.handleInput) },
    ...{ onBlur: (__VLS_ctx.handleBlur) },
    ...{ onFocus: (__VLS_ctx.handleFocus) },
    id: (__VLS_ctx.inputId),
    ref: "inputRef",
    type: (__VLS_ctx.type),
    value: (__VLS_ctx.modelValue),
    placeholder: (__VLS_ctx.placeholder),
    disabled: (__VLS_ctx.disabled),
    readonly: (__VLS_ctx.readonly),
    required: (__VLS_ctx.required),
    ...{ class: (__VLS_ctx.inputClasses) },
});
/** @type {typeof __VLS_ctx.inputRef} */ ;
var __VLS_2 = {};
if (__VLS_ctx.helpText && !__VLS_ctx.errorMessage) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "form-help" },
    });
    (__VLS_ctx.helpText);
}
if (__VLS_ctx.errorMessage) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "invalid-feedback" },
    });
    (__VLS_ctx.errorMessage);
}
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['input-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['form-help']} */ ;
/** @type {__VLS_StyleScopedClasses['invalid-feedback']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_3 = __VLS_2;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            inputRef: inputRef,
            inputId: inputId,
            inputClasses: inputClasses,
            handleInput: handleInput,
            handleBlur: handleBlur,
            handleFocus: handleFocus,
        };
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
