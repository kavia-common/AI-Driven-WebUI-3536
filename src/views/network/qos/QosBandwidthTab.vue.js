import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseCard from '../../../components/common/BaseCard.vue';
import BaseInput from '../../../components/common/BaseInput.vue';
import BaseButton from '../../../components/common/BaseButton.vue';
import { qosApi } from '../../../services/api/qos';
const { t } = useI18n();
const formData = ref({
    Enable: false,
    Bandwidth: {
        Download: 1000,
        Upload: 1000,
        Priority: {
            High: { Min: 20, Max: 60 },
            Medium: { Min: 60, Max: 100 },
            Low: { Min: 5, Max: 40 },
            'Low-latency': { Min: 15, Max: 100 }
        }
    }
});
const originalData = ref(null);
const loading = ref(false);
const validationErrors = ref({});
const calculateSpeed = (priority) => {
    const upload = formData.value.Bandwidth.Upload;
    const config = formData.value.Bandwidth.Priority[priority];
    const min = Math.round(upload * config.Min / 100);
    const max = Math.round(upload * config.Max / 100);
    return `${min}-${max} Mbps`;
};
const validateMinMax = (priorityKey, field) => {
    const priority = formData.value.Bandwidth.Priority[priorityKey];
    const priorityName = priorityKey === 'High' ? t('qos.high') :
        priorityKey === 'Medium' ? t('qos.medium') :
            priorityKey === 'Low' ? t('qos.low') :
                t('qos.lowLatency');
    if (!validationErrors.value[priorityKey]) {
        validationErrors.value[priorityKey] = {};
    }
    if (field === 'Min') {
        if (priority.Min > 100) {
            priority.Min = 100;
            validationErrors.value[priorityKey].min = t('qos.validation2');
        }
        else if (priority.Min > priority.Max) {
            priority.Min = priority.Max;
            validationErrors.value[priorityKey].min = `${t('qos.minimumReserve')} <= ${t('qos.maximumAllowed')}`;
        }
        else {
            validationErrors.value[priorityKey].min = undefined;
        }
    }
    else {
        if (priority.Max > 100) {
            priority.Max = 100;
            validationErrors.value[priorityKey].max = 'Cannot exceed 100%';
        }
        else if (priority.Min > priority.Max) {
            validationErrors.value[priorityKey].max = `${t('qos.minimumReserve')} <= ${t('qos.maximumAllowed')}`;
        }
        else {
            validationErrors.value[priorityKey].max = undefined;
        }
    }
    if (!validationErrors.value[priorityKey].min && !validationErrors.value[priorityKey].max) {
        delete validationErrors.value[priorityKey];
    }
};
const validateForm = () => {
    if (!formData.value.Enable) {
        return true;
    }
    validationErrors.value = {};
    let hasError = false;
    const priorityKeys = ['High', 'Medium', 'Low', 'Low-latency'];
    for (const key of priorityKeys) {
        const priority = formData.value.Bandwidth.Priority[key];
        if (priority.Min > 100) {
            if (!validationErrors.value[key])
                validationErrors.value[key] = {};
            validationErrors.value[key].min = t('qos.validation2');
            hasError = true;
        }
        if (priority.Max > 100) {
            if (!validationErrors.value[key])
                validationErrors.value[key] = {};
            validationErrors.value[key].max = 'Cannot exceed 100%';
            hasError = true;
        }
        if (priority.Min > priority.Max) {
            if (!validationErrors.value[key])
                validationErrors.value[key] = {};
            validationErrors.value[key].min = `${t('qos.minimumReserve')} <= ${t('qos.maximumAllowed')}`;
            hasError = true;
        }
    }
    if (hasError) {
        alert(t('qos.validation1'));
        return false;
    }
    return true;
};
const handleSave = async () => {
    if (!validateForm()) {
        return;
    }
    try {
        loading.value = true;
        await qosApi.updateBandwidth({ QosBandwidth: formData.value });
        originalData.value = JSON.parse(JSON.stringify(formData.value));
        alert(t('common.saveSuccess'));
    }
    catch (error) {
        console.error('Failed to save QoS bandwidth:', error);
        alert(t('common.saveFailed'));
    }
    finally {
        loading.value = false;
    }
};
const handleCancel = () => {
    if (originalData.value) {
        formData.value = JSON.parse(JSON.stringify(originalData.value));
    }
};
const loadData = async () => {
    try {
        loading.value = true;
        const response = await qosApi.getBandwidth();
        formData.value = response.QosBandwidth;
        originalData.value = JSON.parse(JSON.stringify(response.QosBandwidth));
    }
    catch (error) {
        console.error('Failed to load QoS bandwidth:', error);
    }
    finally {
        loading.value = false;
    }
};
onMounted(() => {
    loadData();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['priority-table']} */ ;
/** @type {__VLS_StyleScopedClasses['priority-table']} */ ;
/** @type {__VLS_StyleScopedClasses['priority-table']} */ ;
/** @type {__VLS_StyleScopedClasses['percent-input']} */ ;
/** @type {__VLS_StyleScopedClasses['bandwidth-inputs']} */ ;
/** @type {__VLS_StyleScopedClasses['priority-table']} */ ;
/** @type {__VLS_StyleScopedClasses['priority-table']} */ ;
/** @type {__VLS_StyleScopedClasses['priority-table']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "qos-bandwidth-tab" },
});
/** @type {[typeof BaseCard, typeof BaseCard, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(BaseCard, new BaseCard({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_2.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "switch-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-label" },
});
(__VLS_ctx.t('qos.enableQos'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "switch" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "checkbox",
});
(__VLS_ctx.formData.Enable);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "slider" },
});
if (__VLS_ctx.formData.Enable) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "bandwidth-inputs" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "bandwidth-field" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "form-label" },
    });
    (__VLS_ctx.t('qos.downloadBandwidth'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "input-group" },
    });
    /** @type {[typeof BaseInput, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
        modelValue: (__VLS_ctx.formData.Bandwidth.Download),
        type: "number",
        min: (1),
    }));
    const __VLS_4 = __VLS_3({
        modelValue: (__VLS_ctx.formData.Bandwidth.Download),
        type: "number",
        min: (1),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "unit" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "bandwidth-field" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "form-label" },
    });
    (__VLS_ctx.t('qos.uploadBandwidth'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "input-group" },
    });
    /** @type {[typeof BaseInput, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
        modelValue: (__VLS_ctx.formData.Bandwidth.Upload),
        type: "number",
        min: (1),
    }));
    const __VLS_7 = __VLS_6({
        modelValue: (__VLS_ctx.formData.Bandwidth.Upload),
        type: "number",
        min: (1),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "unit" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "priority-table-container" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
        ...{ class: "priority-table" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    (__VLS_ctx.t('qos.priority'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    (__VLS_ctx.t('qos.minimumReserve'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    (__VLS_ctx.t('qos.maximumAllowed'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    (__VLS_ctx.t('qos.actualSpeedRange'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    (__VLS_ctx.t('qos.whatThisDoes'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "priority-label" },
    });
    (__VLS_ctx.t('qos.high'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "percent-input" },
        ...{ class: ({ 'has-error': __VLS_ctx.validationErrors.High?.min }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('qos.atLeast'));
    /** @type {[typeof BaseInput, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
        ...{ 'onBlur': {} },
        ...{ 'onInput': {} },
        modelValue: (__VLS_ctx.formData.Bandwidth.Priority.High.Min),
        modelModifiers: { number: true, },
        type: "number",
        min: (0),
        max: (100),
        ...{ class: "small-input" },
    }));
    const __VLS_10 = __VLS_9({
        ...{ 'onBlur': {} },
        ...{ 'onInput': {} },
        modelValue: (__VLS_ctx.formData.Bandwidth.Priority.High.Min),
        modelModifiers: { number: true, },
        type: "number",
        min: (0),
        max: (100),
        ...{ class: "small-input" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    let __VLS_12;
    let __VLS_13;
    let __VLS_14;
    const __VLS_15 = {
        onBlur: (...[$event]) => {
            if (!(__VLS_ctx.formData.Enable))
                return;
            __VLS_ctx.validateMinMax('High', 'Min');
        }
    };
    const __VLS_16 = {
        onInput: (...[$event]) => {
            if (!(__VLS_ctx.formData.Enable))
                return;
            __VLS_ctx.validateMinMax('High', 'Min');
        }
    };
    var __VLS_11;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    if (__VLS_ctx.validationErrors.High?.min) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "error-message" },
        });
        (__VLS_ctx.validationErrors.High.min);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "percent-input" },
        ...{ class: ({ 'has-error': __VLS_ctx.validationErrors.High?.max }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('qos.upTo'));
    /** @type {[typeof BaseInput, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
        ...{ 'onBlur': {} },
        ...{ 'onInput': {} },
        modelValue: (__VLS_ctx.formData.Bandwidth.Priority.High.Max),
        modelModifiers: { number: true, },
        type: "number",
        min: (0),
        max: (100),
        ...{ class: "small-input" },
    }));
    const __VLS_18 = __VLS_17({
        ...{ 'onBlur': {} },
        ...{ 'onInput': {} },
        modelValue: (__VLS_ctx.formData.Bandwidth.Priority.High.Max),
        modelModifiers: { number: true, },
        type: "number",
        min: (0),
        max: (100),
        ...{ class: "small-input" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    let __VLS_20;
    let __VLS_21;
    let __VLS_22;
    const __VLS_23 = {
        onBlur: (...[$event]) => {
            if (!(__VLS_ctx.formData.Enable))
                return;
            __VLS_ctx.validateMinMax('High', 'Max');
        }
    };
    const __VLS_24 = {
        onInput: (...[$event]) => {
            if (!(__VLS_ctx.formData.Enable))
                return;
            __VLS_ctx.validateMinMax('High', 'Max');
        }
    };
    var __VLS_19;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    if (__VLS_ctx.validationErrors.High?.max) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "error-message" },
        });
        (__VLS_ctx.validationErrors.High.max);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (__VLS_ctx.calculateSpeed('High'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (__VLS_ctx.t('qos.goesFirst'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "priority-label" },
    });
    (__VLS_ctx.t('qos.medium'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "percent-input" },
        ...{ class: ({ 'has-error': __VLS_ctx.validationErrors.Medium?.min }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('qos.atLeast'));
    /** @type {[typeof BaseInput, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
        ...{ 'onBlur': {} },
        ...{ 'onInput': {} },
        modelValue: (__VLS_ctx.formData.Bandwidth.Priority.Medium.Min),
        modelModifiers: { number: true, },
        type: "number",
        min: (0),
        max: (100),
        ...{ class: "small-input" },
    }));
    const __VLS_26 = __VLS_25({
        ...{ 'onBlur': {} },
        ...{ 'onInput': {} },
        modelValue: (__VLS_ctx.formData.Bandwidth.Priority.Medium.Min),
        modelModifiers: { number: true, },
        type: "number",
        min: (0),
        max: (100),
        ...{ class: "small-input" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    let __VLS_28;
    let __VLS_29;
    let __VLS_30;
    const __VLS_31 = {
        onBlur: (...[$event]) => {
            if (!(__VLS_ctx.formData.Enable))
                return;
            __VLS_ctx.validateMinMax('Medium', 'Min');
        }
    };
    const __VLS_32 = {
        onInput: (...[$event]) => {
            if (!(__VLS_ctx.formData.Enable))
                return;
            __VLS_ctx.validateMinMax('Medium', 'Min');
        }
    };
    var __VLS_27;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    if (__VLS_ctx.validationErrors.Medium?.min) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "error-message" },
        });
        (__VLS_ctx.validationErrors.Medium.min);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "percent-input" },
        ...{ class: ({ 'has-error': __VLS_ctx.validationErrors.Medium?.max }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('qos.upTo'));
    /** @type {[typeof BaseInput, ]} */ ;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
        ...{ 'onBlur': {} },
        ...{ 'onInput': {} },
        modelValue: (__VLS_ctx.formData.Bandwidth.Priority.Medium.Max),
        modelModifiers: { number: true, },
        type: "number",
        min: (0),
        max: (100),
        ...{ class: "small-input" },
    }));
    const __VLS_34 = __VLS_33({
        ...{ 'onBlur': {} },
        ...{ 'onInput': {} },
        modelValue: (__VLS_ctx.formData.Bandwidth.Priority.Medium.Max),
        modelModifiers: { number: true, },
        type: "number",
        min: (0),
        max: (100),
        ...{ class: "small-input" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    let __VLS_36;
    let __VLS_37;
    let __VLS_38;
    const __VLS_39 = {
        onBlur: (...[$event]) => {
            if (!(__VLS_ctx.formData.Enable))
                return;
            __VLS_ctx.validateMinMax('Medium', 'Max');
        }
    };
    const __VLS_40 = {
        onInput: (...[$event]) => {
            if (!(__VLS_ctx.formData.Enable))
                return;
            __VLS_ctx.validateMinMax('Medium', 'Max');
        }
    };
    var __VLS_35;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    if (__VLS_ctx.validationErrors.Medium?.max) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "error-message" },
        });
        (__VLS_ctx.validationErrors.Medium.max);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (__VLS_ctx.calculateSpeed('Medium'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (__VLS_ctx.t('qos.normalLane'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "priority-label" },
    });
    (__VLS_ctx.t('qos.low'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "percent-input" },
        ...{ class: ({ 'has-error': __VLS_ctx.validationErrors.Low?.min }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('qos.atLeast'));
    /** @type {[typeof BaseInput, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
        ...{ 'onBlur': {} },
        ...{ 'onInput': {} },
        modelValue: (__VLS_ctx.formData.Bandwidth.Priority.Low.Min),
        modelModifiers: { number: true, },
        type: "number",
        min: (0),
        max: (100),
        ...{ class: "small-input" },
    }));
    const __VLS_42 = __VLS_41({
        ...{ 'onBlur': {} },
        ...{ 'onInput': {} },
        modelValue: (__VLS_ctx.formData.Bandwidth.Priority.Low.Min),
        modelModifiers: { number: true, },
        type: "number",
        min: (0),
        max: (100),
        ...{ class: "small-input" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    let __VLS_44;
    let __VLS_45;
    let __VLS_46;
    const __VLS_47 = {
        onBlur: (...[$event]) => {
            if (!(__VLS_ctx.formData.Enable))
                return;
            __VLS_ctx.validateMinMax('Low', 'Min');
        }
    };
    const __VLS_48 = {
        onInput: (...[$event]) => {
            if (!(__VLS_ctx.formData.Enable))
                return;
            __VLS_ctx.validateMinMax('Low', 'Min');
        }
    };
    var __VLS_43;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    if (__VLS_ctx.validationErrors.Low?.min) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "error-message" },
        });
        (__VLS_ctx.validationErrors.Low.min);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "percent-input" },
        ...{ class: ({ 'has-error': __VLS_ctx.validationErrors.Low?.max }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('qos.upTo'));
    /** @type {[typeof BaseInput, ]} */ ;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
        ...{ 'onBlur': {} },
        ...{ 'onInput': {} },
        modelValue: (__VLS_ctx.formData.Bandwidth.Priority.Low.Max),
        modelModifiers: { number: true, },
        type: "number",
        min: (0),
        max: (100),
        ...{ class: "small-input" },
    }));
    const __VLS_50 = __VLS_49({
        ...{ 'onBlur': {} },
        ...{ 'onInput': {} },
        modelValue: (__VLS_ctx.formData.Bandwidth.Priority.Low.Max),
        modelModifiers: { number: true, },
        type: "number",
        min: (0),
        max: (100),
        ...{ class: "small-input" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    let __VLS_52;
    let __VLS_53;
    let __VLS_54;
    const __VLS_55 = {
        onBlur: (...[$event]) => {
            if (!(__VLS_ctx.formData.Enable))
                return;
            __VLS_ctx.validateMinMax('Low', 'Max');
        }
    };
    const __VLS_56 = {
        onInput: (...[$event]) => {
            if (!(__VLS_ctx.formData.Enable))
                return;
            __VLS_ctx.validateMinMax('Low', 'Max');
        }
    };
    var __VLS_51;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    if (__VLS_ctx.validationErrors.Low?.max) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "error-message" },
        });
        (__VLS_ctx.validationErrors.Low.max);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (__VLS_ctx.calculateSpeed('Low'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (__VLS_ctx.t('qos.yieldsWhenBusy'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "priority-label" },
    });
    (__VLS_ctx.t('qos.lowLatency'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "percent-input" },
        ...{ class: ({ 'has-error': __VLS_ctx.validationErrors['Low-latency']?.min }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('qos.atLeast'));
    /** @type {[typeof BaseInput, ]} */ ;
    // @ts-ignore
    const __VLS_57 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
        ...{ 'onBlur': {} },
        ...{ 'onInput': {} },
        modelValue: (__VLS_ctx.formData.Bandwidth.Priority['Low-latency'].Min),
        modelModifiers: { number: true, },
        type: "number",
        min: (0),
        max: (100),
        ...{ class: "small-input" },
    }));
    const __VLS_58 = __VLS_57({
        ...{ 'onBlur': {} },
        ...{ 'onInput': {} },
        modelValue: (__VLS_ctx.formData.Bandwidth.Priority['Low-latency'].Min),
        modelModifiers: { number: true, },
        type: "number",
        min: (0),
        max: (100),
        ...{ class: "small-input" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_57));
    let __VLS_60;
    let __VLS_61;
    let __VLS_62;
    const __VLS_63 = {
        onBlur: (...[$event]) => {
            if (!(__VLS_ctx.formData.Enable))
                return;
            __VLS_ctx.validateMinMax('Low-latency', 'Min');
        }
    };
    const __VLS_64 = {
        onInput: (...[$event]) => {
            if (!(__VLS_ctx.formData.Enable))
                return;
            __VLS_ctx.validateMinMax('Low-latency', 'Min');
        }
    };
    var __VLS_59;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    if (__VLS_ctx.validationErrors['Low-latency']?.min) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "error-message" },
        });
        (__VLS_ctx.validationErrors['Low-latency'].min);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "percent-input" },
        ...{ class: ({ 'has-error': __VLS_ctx.validationErrors['Low-latency']?.max }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('qos.upTo'));
    /** @type {[typeof BaseInput, ]} */ ;
    // @ts-ignore
    const __VLS_65 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
        ...{ 'onBlur': {} },
        ...{ 'onInput': {} },
        modelValue: (__VLS_ctx.formData.Bandwidth.Priority['Low-latency'].Max),
        modelModifiers: { number: true, },
        type: "number",
        min: (0),
        max: (100),
        ...{ class: "small-input" },
    }));
    const __VLS_66 = __VLS_65({
        ...{ 'onBlur': {} },
        ...{ 'onInput': {} },
        modelValue: (__VLS_ctx.formData.Bandwidth.Priority['Low-latency'].Max),
        modelModifiers: { number: true, },
        type: "number",
        min: (0),
        max: (100),
        ...{ class: "small-input" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_65));
    let __VLS_68;
    let __VLS_69;
    let __VLS_70;
    const __VLS_71 = {
        onBlur: (...[$event]) => {
            if (!(__VLS_ctx.formData.Enable))
                return;
            __VLS_ctx.validateMinMax('Low-latency', 'Max');
        }
    };
    const __VLS_72 = {
        onInput: (...[$event]) => {
            if (!(__VLS_ctx.formData.Enable))
                return;
            __VLS_ctx.validateMinMax('Low-latency', 'Max');
        }
    };
    var __VLS_67;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    if (__VLS_ctx.validationErrors['Low-latency']?.max) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "error-message" },
        });
        (__VLS_ctx.validationErrors['Low-latency'].max);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (__VLS_ctx.calculateSpeed('Low-latency'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (__VLS_ctx.t('qos.lowDelayFirst'));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "button-group" },
});
/** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
    ...{ 'onClick': {} },
    variant: "secondary",
}));
const __VLS_74 = __VLS_73({
    ...{ 'onClick': {} },
    variant: "secondary",
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
let __VLS_76;
let __VLS_77;
let __VLS_78;
const __VLS_79 = {
    onClick: (__VLS_ctx.handleCancel)
};
__VLS_75.slots.default;
(__VLS_ctx.t('common.cancel'));
var __VLS_75;
/** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
// @ts-ignore
const __VLS_80 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
    ...{ 'onClick': {} },
    variant: "primary",
}));
const __VLS_81 = __VLS_80({
    ...{ 'onClick': {} },
    variant: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_80));
let __VLS_83;
let __VLS_84;
let __VLS_85;
const __VLS_86 = {
    onClick: (__VLS_ctx.handleSave)
};
__VLS_82.slots.default;
(__VLS_ctx.t('common.apply'));
var __VLS_82;
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['qos-bandwidth-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['bandwidth-inputs']} */ ;
/** @type {__VLS_StyleScopedClasses['bandwidth-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['input-group']} */ ;
/** @type {__VLS_StyleScopedClasses['unit']} */ ;
/** @type {__VLS_StyleScopedClasses['bandwidth-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['input-group']} */ ;
/** @type {__VLS_StyleScopedClasses['unit']} */ ;
/** @type {__VLS_StyleScopedClasses['priority-table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['priority-table']} */ ;
/** @type {__VLS_StyleScopedClasses['priority-label']} */ ;
/** @type {__VLS_StyleScopedClasses['percent-input']} */ ;
/** @type {__VLS_StyleScopedClasses['small-input']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['percent-input']} */ ;
/** @type {__VLS_StyleScopedClasses['small-input']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['priority-label']} */ ;
/** @type {__VLS_StyleScopedClasses['percent-input']} */ ;
/** @type {__VLS_StyleScopedClasses['small-input']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['percent-input']} */ ;
/** @type {__VLS_StyleScopedClasses['small-input']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['priority-label']} */ ;
/** @type {__VLS_StyleScopedClasses['percent-input']} */ ;
/** @type {__VLS_StyleScopedClasses['small-input']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['percent-input']} */ ;
/** @type {__VLS_StyleScopedClasses['small-input']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['priority-label']} */ ;
/** @type {__VLS_StyleScopedClasses['percent-input']} */ ;
/** @type {__VLS_StyleScopedClasses['small-input']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['percent-input']} */ ;
/** @type {__VLS_StyleScopedClasses['small-input']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            BaseCard: BaseCard,
            BaseInput: BaseInput,
            BaseButton: BaseButton,
            t: t,
            formData: formData,
            validationErrors: validationErrors,
            calculateSpeed: calculateSpeed,
            validateMinMax: validateMinMax,
            handleSave: handleSave,
            handleCancel: handleCancel,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
