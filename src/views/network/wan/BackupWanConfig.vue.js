import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { backupWanApi } from '../../../services/api/backupWan';
import { BaseButton, BaseInput, BaseSelect, BaseSpinner } from '../../../components/common';
const router = useRouter();
const loading = ref(false);
const originalData = ref(null);
const showSuccess = ref(false);
const showSuccessMessage = () => {
    showSuccess.value = true;
    setTimeout(() => {
        showSuccess.value = false;
    }, 3000);
};
const formData = ref({
    PhysicalInterface: 'lan1',
    SupportedEthernetInterface: ['lan1', 'eth0'],
    SupportedCellularInterface: ['eth1'],
    Enable: false,
    WHCEnable: false,
    PhysicalType: 'Ethernet',
    WANHealthCheck: [
        {
            Alias: 'primary_wan',
            CheckMethod: 'Ping',
            CheckPeriod: 3,
            Name: 'eth0',
            DNSAddress: 'www.google.com',
            PingAddress: '8.8.8.8',
            CheckCount: 3
        },
        {
            Alias: 'backup_wan',
            CheckMethod: 'Ping',
            CheckPeriod: 3,
            Name: 'lan1',
            DNSAddress: 'www.google.com',
            PingAddress: '8.8.8.8',
            CheckCount: 3
        }
    ]
});
const isCellularSupported = computed(() => {
    const cellularInterfaces = formData.value.SupportedCellularInterface;
    return cellularInterfaces.length > 0 && cellularInterfaces[0] !== '';
});
const physicalTypeOptions = computed(() => {
    const options = [{ label: 'Ethernet', value: 'Ethernet' }];
    if (isCellularSupported.value) {
        options.push({ label: 'Cellular', value: 'Cellular' });
    }
    return options;
});
const interfaceOptions = computed(() => {
    const interfaces = formData.value.PhysicalType === 'Ethernet'
        ? formData.value.SupportedEthernetInterface
        : formData.value.SupportedCellularInterface;
    return interfaces
        .filter(iface => iface !== '')
        .map(iface => ({
        label: iface,
        value: iface
    }));
});
const handleBackupWanToggle = () => {
    if (!formData.value.Enable) {
        formData.value.WHCEnable = false;
    }
};
watch(() => formData.value.PhysicalType, (newType) => {
    const interfaces = newType === 'Ethernet'
        ? formData.value.SupportedEthernetInterface
        : formData.value.SupportedCellularInterface;
    const availableInterfaces = interfaces.filter(iface => iface !== '');
    if (availableInterfaces.length > 0) {
        formData.value.PhysicalInterface = availableInterfaces[0];
    }
});
const loadConfig = async () => {
    loading.value = true;
    try {
        const response = await backupWanApi.getConfig();
        if (response?.BackupWAN) {
            const config = response.BackupWAN;
            formData.value = {
                ...config,
                Enable: Boolean(config.Enable),
                WHCEnable: Boolean(config.WHCEnable)
            };
            originalData.value = JSON.parse(JSON.stringify(formData.value));
        }
    }
    catch (error) {
        console.error('Failed to load Backup WAN config:', error);
    }
    finally {
        loading.value = false;
    }
};
const handleSubmit = async () => {
    loading.value = true;
    try {
        const requestData = {
            BackupWAN: {
                Enable: Boolean(formData.value.Enable),
                PhysicalType: formData.value.PhysicalType,
                PhysicalInterface: formData.value.PhysicalInterface,
                WHCEnable: Boolean(formData.value.Enable),
                WANHealthCheck: formData.value.WANHealthCheck.map(hc => ({
                    Alias: hc.Alias,
                    CheckMethod: hc.CheckMethod,
                    CheckCount: hc.CheckCount,
                    CheckPeriod: hc.CheckPeriod,
                    PingAddress: hc.PingAddress,
                    DNSAddress: hc.DNSAddress
                }))
            }
        };
        const res = await backupWanApi.updateConfig(requestData);
        const err = res?.BackupWAN?.NOK ?? res?.NOK;
        if (err) {
            console.warn('Failed to update Backup WAN config:', err);
            alert(err);
        }
        else {
            showSuccessMessage();
            await loadConfig();
        }
    }
    catch (error) {
        console.error('Failed to update Backup WAN config:', error);
        // alert('Failed to update Backup WAN configuration');
    }
    finally {
        loading.value = false;
    }
};
const handleCancel = () => {
    if (originalData.value) {
        formData.value = JSON.parse(JSON.stringify(originalData.value));
    }
    router.back();
};
onMounted(() => {
    loadConfig();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['help-text']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-group']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-label']} */ ;
/** @type {__VLS_StyleScopedClasses['nested-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['form-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['nested-field']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
});
(__VLS_ctx.$t('backupWan.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-content" },
});
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
    });
    (__VLS_ctx.$t('common.saveSuccess'));
}
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-container" },
    });
    const __VLS_0 = {}.BaseSpinner;
    /** @type {[typeof __VLS_components.BaseSpinner, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
        ...{ onSubmit: (__VLS_ctx.handleSubmit) },
        ...{ class: "backup-wan-form" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "switch-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.$t('backupWan.backupWan'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onChange: (__VLS_ctx.handleBackupWanToggle) },
        type: "checkbox",
    });
    (__VLS_ctx.formData.Enable);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    (__VLS_ctx.$t('backupWan.physicalType'));
    const __VLS_4 = {}.BaseSelect;
    /** @type {[typeof __VLS_components.BaseSelect, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        modelValue: (__VLS_ctx.formData.PhysicalType),
        options: (__VLS_ctx.physicalTypeOptions),
        disabled: (!__VLS_ctx.formData.Enable),
    }));
    const __VLS_6 = __VLS_5({
        modelValue: (__VLS_ctx.formData.PhysicalType),
        options: (__VLS_ctx.physicalTypeOptions),
        disabled: (!__VLS_ctx.formData.Enable),
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    (__VLS_ctx.$t('backupWan.interface'));
    const __VLS_8 = {}.BaseSelect;
    /** @type {[typeof __VLS_components.BaseSelect, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        modelValue: (__VLS_ctx.formData.PhysicalInterface),
        options: (__VLS_ctx.interfaceOptions),
        disabled: (!__VLS_ctx.formData.Enable),
    }));
    const __VLS_10 = __VLS_9({
        modelValue: (__VLS_ctx.formData.PhysicalInterface),
        options: (__VLS_ctx.interfaceOptions),
        disabled: (!__VLS_ctx.formData.Enable),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    if (0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "switch-label" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.$t('backupWan.wanHealthCheck'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "switch" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "checkbox",
        });
        (__VLS_ctx.formData.WHCEnable);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "slider" },
        });
    }
    if (__VLS_ctx.formData.Enable) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "health-check-configs" },
        });
        for (const [healthCheck, index] of __VLS_getVForSourceType((__VLS_ctx.formData.WANHealthCheck))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                key: (index),
                ...{ class: "panel-section" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "section-title" },
            });
            (index === 0 ? __VLS_ctx.$t('backupWan.primaryWan') : __VLS_ctx.$t('backupWan.backupWanLabel'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-content" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
            (__VLS_ctx.$t('backupWan.checkCount'));
            const __VLS_12 = {}.BaseInput;
            /** @type {[typeof __VLS_components.BaseInput, ]} */ ;
            // @ts-ignore
            const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
                modelValue: (healthCheck.CheckCount),
                modelModifiers: { number: true, },
                type: "number",
                min: (3),
                max: (9999),
            }));
            const __VLS_14 = __VLS_13({
                modelValue: (healthCheck.CheckCount),
                modelModifiers: { number: true, },
                type: "number",
                min: (3),
                max: (9999),
            }, ...__VLS_functionalComponentArgsRest(__VLS_13));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "help-text" },
            });
            (__VLS_ctx.$t('backupWan.checkCountHint'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
            (__VLS_ctx.$t('backupWan.checkPeriod'));
            const __VLS_16 = {}.BaseInput;
            /** @type {[typeof __VLS_components.BaseInput, ]} */ ;
            // @ts-ignore
            const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
                modelValue: (healthCheck.CheckPeriod),
                modelModifiers: { number: true, },
                type: "number",
                min: (3),
                max: (9999999),
            }));
            const __VLS_18 = __VLS_17({
                modelValue: (healthCheck.CheckPeriod),
                modelModifiers: { number: true, },
                type: "number",
                min: (3),
                max: (9999999),
            }, ...__VLS_functionalComponentArgsRest(__VLS_17));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "help-text" },
            });
            (__VLS_ctx.$t('backupWan.checkPeriodHint'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "radio-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                ...{ class: "radio-label" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "radio",
                name: (`checkMethod${index}`),
                value: "Ping",
            });
            (healthCheck.CheckMethod);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            (__VLS_ctx.$t('backupWan.pingDetection'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "nested-field" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
            (__VLS_ctx.$t('backupWan.ipAddress'));
            const __VLS_20 = {}.BaseInput;
            /** @type {[typeof __VLS_components.BaseInput, ]} */ ;
            // @ts-ignore
            const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
                modelValue: (healthCheck.PingAddress),
                placeholder: "8.8.8.8",
            }));
            const __VLS_22 = __VLS_21({
                modelValue: (healthCheck.PingAddress),
                placeholder: "8.8.8.8",
            }, ...__VLS_functionalComponentArgsRest(__VLS_21));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "radio-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                ...{ class: "radio-label" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "radio",
                name: (`checkMethod${index}`),
                value: "DNS",
            });
            (healthCheck.CheckMethod);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            (__VLS_ctx.$t('backupWan.dnsDetection'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "nested-field" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
            (__VLS_ctx.$t('backupWan.dnsServer'));
            const __VLS_24 = {}.BaseInput;
            /** @type {[typeof __VLS_components.BaseInput, ]} */ ;
            // @ts-ignore
            const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
                modelValue: (healthCheck.DNSAddress),
                placeholder: "www.google.com",
            }));
            const __VLS_26 = __VLS_25({
                modelValue: (healthCheck.DNSAddress),
                placeholder: "www.google.com",
            }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-actions" },
    });
    const __VLS_28 = {}.BaseButton;
    /** @type {[typeof __VLS_components.BaseButton, typeof __VLS_components.BaseButton, ]} */ ;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        ...{ 'onClick': {} },
        type: "button",
        variant: "secondary",
    }));
    const __VLS_30 = __VLS_29({
        ...{ 'onClick': {} },
        type: "button",
        variant: "secondary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    let __VLS_32;
    let __VLS_33;
    let __VLS_34;
    const __VLS_35 = {
        onClick: (__VLS_ctx.handleCancel)
    };
    __VLS_31.slots.default;
    (__VLS_ctx.$t('common.cancel'));
    var __VLS_31;
    const __VLS_36 = {}.BaseButton;
    /** @type {[typeof __VLS_components.BaseButton, typeof __VLS_components.BaseButton, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        type: "submit",
        variant: "primary",
        disabled: (__VLS_ctx.loading),
    }));
    const __VLS_38 = __VLS_37({
        type: "submit",
        variant: "primary",
        disabled: (__VLS_ctx.loading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    __VLS_39.slots.default;
    (__VLS_ctx.$t('common.apply'));
    var __VLS_39;
}
/** @type {__VLS_StyleScopedClasses['page-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['page-content']} */ ;
/** @type {__VLS_StyleScopedClasses['success-message']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-container']} */ ;
/** @type {__VLS_StyleScopedClasses['backup-wan-form']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['health-check-configs']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['help-text']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['help-text']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-group']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-label']} */ ;
/** @type {__VLS_StyleScopedClasses['nested-field']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-group']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-label']} */ ;
/** @type {__VLS_StyleScopedClasses['nested-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-actions']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            BaseButton: BaseButton,
            BaseInput: BaseInput,
            BaseSelect: BaseSelect,
            BaseSpinner: BaseSpinner,
            loading: loading,
            showSuccess: showSuccess,
            formData: formData,
            physicalTypeOptions: physicalTypeOptions,
            interfaceOptions: interfaceOptions,
            handleBackupWanToggle: handleBackupWanToggle,
            handleSubmit: handleSubmit,
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
