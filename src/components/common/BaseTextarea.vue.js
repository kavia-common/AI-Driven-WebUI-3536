import { computed, ref } from 'vue';
const props = withDefaults(defineProps(), {
    placeholder: '',
    disabled: false,
    readonly: false,
    required: false,
    rows: 4,
    error: false,
});
const emit = defineEmits();
const textareaRef = ref(null);
const textareaId = computed(() => props.id || `textarea-${Math.random().toString(36).substring(7)}`);
const textareaClasses = computed(() => {
    const classes = ['form-textarea'];
    if (props.error || props.errorMessage) {
        classes.push('is-invalid');
    }
    return classes;
});
const handleInput = (event) => {
    const target = event.target;
    emit('update:modelValue', target.value);
};
const handleBlur = (event) => {
    emit('blur', event);
};
const handleFocus = (event) => {
    emit('focus', event);
};
const __VLS_exposed = {
    focus: () => textareaRef.value?.focus(),
    blur: () => textareaRef.value?.blur(),
};
defineExpose(__VLS_exposed);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    placeholder: '',
    disabled: false,
    readonly: false,
    required: false,
    rows: 4,
    error: false,
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
if (__VLS_ctx.label) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: (__VLS_ctx.textareaId),
        ...{ class: "form-label" },
        ...{ class: ({ 'form-label-required': __VLS_ctx.required }) },
    });
    (__VLS_ctx.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({
    ...{ onInput: (__VLS_ctx.handleInput) },
    ...{ onBlur: (__VLS_ctx.handleBlur) },
    ...{ onFocus: (__VLS_ctx.handleFocus) },
    id: (__VLS_ctx.textareaId),
    ref: "textareaRef",
    value: (__VLS_ctx.modelValue),
    placeholder: (__VLS_ctx.placeholder),
    disabled: (__VLS_ctx.disabled),
    readonly: (__VLS_ctx.readonly),
    required: (__VLS_ctx.required),
    rows: (__VLS_ctx.rows),
    ...{ class: (__VLS_ctx.textareaClasses) },
});
/** @type {typeof __VLS_ctx.textareaRef} */ ;
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
/** @type {__VLS_StyleScopedClasses['form-help']} */ ;
/** @type {__VLS_StyleScopedClasses['invalid-feedback']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            textareaRef: textareaRef,
            textareaId: textareaId,
            textareaClasses: textareaClasses,
            handleInput: handleInput,
            handleBlur: handleBlur,
            handleFocus: handleFocus,
        };
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
; /* PartiallyEnd: #4569/main.vue */
