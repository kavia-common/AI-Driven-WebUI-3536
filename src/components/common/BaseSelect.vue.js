import { computed } from 'vue';
const props = withDefaults(defineProps(), {
    placeholder: '',
    disabled: false,
    required: false,
    size: 'md',
    error: false,
});
const emit = defineEmits();
const selectId = computed(() => props.id || `select-${Math.random().toString(36).substring(7)}`);
const selectClasses = computed(() => {
    const classes = ['form-select'];
    if (props.size !== 'md') {
        classes.push(`form-input-${props.size}`);
    }
    if (props.error || props.errorMessage) {
        classes.push('is-invalid');
    }
    return classes;
});
const getOptionValue = (option) => {
    return typeof option === 'object' ? option.value : option;
};
const getOptionLabel = (option) => {
    return typeof option === 'object' ? option.label : String(option);
};
const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    emit('update:modelValue', value);
    emit('change', value);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    placeholder: '',
    disabled: false,
    required: false,
    size: 'md',
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
        for: (__VLS_ctx.selectId),
        ...{ class: "form-label" },
        ...{ class: ({ 'form-label-required': __VLS_ctx.required }) },
    });
    (__VLS_ctx.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    ...{ onChange: (__VLS_ctx.handleChange) },
    id: (__VLS_ctx.selectId),
    value: (__VLS_ctx.modelValue),
    disabled: (__VLS_ctx.disabled),
    required: (__VLS_ctx.required),
    ...{ class: (__VLS_ctx.selectClasses) },
});
if (__VLS_ctx.placeholder) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "",
        disabled: true,
    });
    (__VLS_ctx.placeholder);
}
for (const [option] of __VLS_getVForSourceType((__VLS_ctx.options))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (__VLS_ctx.getOptionValue(option)),
        value: (__VLS_ctx.getOptionValue(option)),
    });
    (__VLS_ctx.getOptionLabel(option));
}
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
            selectId: selectId,
            selectClasses: selectClasses,
            getOptionValue: getOptionValue,
            getOptionLabel: getOptionLabel,
            handleChange: handleChange,
        };
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
; /* PartiallyEnd: #4569/main.vue */
