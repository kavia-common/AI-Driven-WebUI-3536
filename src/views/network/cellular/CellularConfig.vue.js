import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getCellularStatus, updateCellularConfig } from '../../../services/api/cellular';
import { useQA } from '../../../utils/qa';
import BaseButton from '../../../components/common/BaseButton.vue';
import BaseSelect from '../../../components/common/BaseSelect.vue';
import BaseInput from '../../../components/common/BaseInput.vue';
import BaseSpinner from '../../../components/common/BaseSpinner.vue';
const { qa } = useQA();
const { t } = useI18n();
const loading = ref(false);
const saving = ref(false);
const error = ref(null);
const successMessage = ref(null);
const formData = ref({
    roamingEnabled: false,
    interfaceEnable: true,
    ipType: 'ipv4v6',
    apn: 'internet',
    preferredAccessTechnology: '5g'
});
const ipTypeOptions = [
    { value: 'ipv4', label: 'IPv4' },
    { value: 'ipv6', label: 'IPv6' },
    { value: 'ipv4v6', label: 'IPv4/IPv6' }
];
const accessTechnologyOptions = [
    { value: '5g', label: '5G' },
    { value: '4g', label: '4G' },
    { value: '3g', label: '3G' },
    { value: 'Auto', label: 'Auto' }
];
const fetchCellularStatus = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await getCellularStatus();
        if (response.Cellular) {
            formData.value = {
                roamingEnabled: response.Cellular.RoamingEnabled === 1,
                interfaceEnable: response.Cellular.InterfaceEnable === 1,
                ipType: response.Cellular.X_PRPLWARE_COM_IPType || 'ipv4v6',
                apn: response.Cellular.APN || 'internet',
                preferredAccessTechnology: response.Cellular.PreferredAccessTechnology || '5g'
            };
        }
    }
    catch (err) {
        console.error('Error fetching Cellular status:', err);
        error.value = 'Failed to fetch Cellular configuration';
    }
    finally {
        loading.value = false;
    }
};
const handleSave = async () => {
    saving.value = true;
    error.value = null;
    successMessage.value = null;
    try {
        const config = {
            Cellular: {
                RoamingEnabled: formData.value.roamingEnabled,
                InterfaceEnable: formData.value.interfaceEnable,
                X_PRPLWARE_COM_IPType: formData.value.ipType,
                APN: formData.value.apn,
                PreferredAccessTechnology: formData.value.preferredAccessTechnology
            }
        };
        await updateCellularConfig(config);
        successMessage.value = 'Cellular configuration updated successfully';
        setTimeout(() => {
            successMessage.value = null;
        }, 3000);
    }
    catch (err) {
        console.error('Error updating Cellular configuration:', err);
        error.value = 'Failed to update Cellular configuration';
    }
    finally {
        saving.value = false;
    }
};
const handleCancel = () => {
    fetchCellularStatus();
};
onMounted(() => {
    fetchCellularStatus();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
    'data-testid': (__VLS_ctx.qa('cellular-config-title')),
});
(__VLS_ctx.t('cellular.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
    });
    /** @type {[typeof BaseSpinner, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(BaseSpinner, new BaseSpinner({
        size: "lg",
    }));
    const __VLS_1 = __VLS_0({
        size: "lg",
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('common.loading'));
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-content" },
    });
    if (__VLS_ctx.error) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "alert alert-error" },
        });
        (__VLS_ctx.error);
    }
    if (__VLS_ctx.successMessage) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "alert alert-success" },
        });
        (__VLS_ctx.successMessage);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
        ...{ onSubmit: (__VLS_ctx.handleSave) },
        ...{ class: "config-form" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "switch-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('cellular.interfaceEnable'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "checkbox",
        'data-testid': (__VLS_ctx.qa('cellular-interface-enable')),
    });
    (__VLS_ctx.formData.interfaceEnable);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "switch-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('cellular.roamingEnabled'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "checkbox",
        'data-testid': (__VLS_ctx.qa('cellular-roaming-enabled')),
    });
    (__VLS_ctx.formData.roamingEnabled);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "form-label" },
        for: "ip-type",
    });
    (__VLS_ctx.t('cellular.ipType'));
    /** @type {[typeof BaseSelect, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(BaseSelect, new BaseSelect({
        id: "ip-type",
        modelValue: (__VLS_ctx.formData.ipType),
        options: (__VLS_ctx.ipTypeOptions),
        dataTestid: (__VLS_ctx.qa('cellular-ip-type')),
    }));
    const __VLS_4 = __VLS_3({
        id: "ip-type",
        modelValue: (__VLS_ctx.formData.ipType),
        options: (__VLS_ctx.ipTypeOptions),
        dataTestid: (__VLS_ctx.qa('cellular-ip-type')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "form-label" },
        for: "apn",
    });
    (__VLS_ctx.t('cellular.apn'));
    /** @type {[typeof BaseInput, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
        id: "apn",
        modelValue: (__VLS_ctx.formData.apn),
        type: "text",
        placeholder: (__VLS_ctx.t('cellular.apn')),
        dataTestid: (__VLS_ctx.qa('cellular-apn')),
    }));
    const __VLS_7 = __VLS_6({
        id: "apn",
        modelValue: (__VLS_ctx.formData.apn),
        type: "text",
        placeholder: (__VLS_ctx.t('cellular.apn')),
        dataTestid: (__VLS_ctx.qa('cellular-apn')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "form-label" },
        for: "access-technology",
    });
    (__VLS_ctx.t('cellular.preferredAccessTechnology'));
    /** @type {[typeof BaseSelect, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(BaseSelect, new BaseSelect({
        id: "access-technology",
        modelValue: (__VLS_ctx.formData.preferredAccessTechnology),
        options: (__VLS_ctx.accessTechnologyOptions),
        dataTestid: (__VLS_ctx.qa('cellular-access-technology')),
    }));
    const __VLS_10 = __VLS_9({
        id: "access-technology",
        modelValue: (__VLS_ctx.formData.preferredAccessTechnology),
        options: (__VLS_ctx.accessTechnologyOptions),
        dataTestid: (__VLS_ctx.qa('cellular-access-technology')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-actions" },
    });
    /** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
        ...{ 'onClick': {} },
        type: "button",
        variant: "secondary",
        disabled: (__VLS_ctx.saving),
        dataTestid: (__VLS_ctx.qa('cellular-cancel-btn')),
    }));
    const __VLS_13 = __VLS_12({
        ...{ 'onClick': {} },
        type: "button",
        variant: "secondary",
        disabled: (__VLS_ctx.saving),
        dataTestid: (__VLS_ctx.qa('cellular-cancel-btn')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    let __VLS_15;
    let __VLS_16;
    let __VLS_17;
    const __VLS_18 = {
        onClick: (__VLS_ctx.handleCancel)
    };
    __VLS_14.slots.default;
    (__VLS_ctx.t('common.cancel'));
    var __VLS_14;
    /** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
        type: "submit",
        variant: "primary",
        loading: (__VLS_ctx.saving),
        disabled: (__VLS_ctx.saving),
        dataTestid: (__VLS_ctx.qa('cellular-save-btn')),
    }));
    const __VLS_20 = __VLS_19({
        type: "submit",
        variant: "primary",
        loading: (__VLS_ctx.saving),
        disabled: (__VLS_ctx.saving),
        dataTestid: (__VLS_ctx.qa('cellular-save-btn')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    __VLS_21.slots.default;
    (__VLS_ctx.t('common.apply'));
    var __VLS_21;
}
/** @type {__VLS_StyleScopedClasses['page-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['alert']} */ ;
/** @type {__VLS_StyleScopedClasses['alert-error']} */ ;
/** @type {__VLS_StyleScopedClasses['alert']} */ ;
/** @type {__VLS_StyleScopedClasses['alert-success']} */ ;
/** @type {__VLS_StyleScopedClasses['config-form']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-actions']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            BaseButton: BaseButton,
            BaseSelect: BaseSelect,
            BaseInput: BaseInput,
            BaseSpinner: BaseSpinner,
            qa: qa,
            t: t,
            loading: loading,
            saving: saving,
            error: error,
            successMessage: successMessage,
            formData: formData,
            ipTypeOptions: ipTypeOptions,
            accessTechnologyOptions: accessTechnologyOptions,
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
