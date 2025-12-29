import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { getWlanBasic, updateWlanBasic } from '../../../services/api/wireless';
import WirelessBandConfig from './basic/WirelessBandConfig.vue';
import BlockingOverlay from '../../../components/BlockingOverlay.vue';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const router = useRouter();
const wlanBasicData = ref(null);
const loading = ref(false);
const showSuccess = ref(false);
const showPassword = ref(false);
const showBlockingOverlay = ref(false);
// Computed property to check if MLO is disabled by Mesh
const isMloDisabledByMesh = computed(() => {
    return wlanBasicData.value?.WlanBasic.MeshEnable === 1;
});
// Computed property to check if MLO is disabled by Common SSID
const isMloDisabledByCommonSsid = computed(() => {
    return wlanBasicData.value?.WlanBasic.CommonSSIDEnable === 0;
});
const fetchBasicConfig = async () => {
    loading.value = true;
    try {
        wlanBasicData.value = await getWlanBasic();
    }
    catch (error) {
        console.error('Error fetching wireless basic config:', error);
    }
    finally {
        loading.value = false;
    }
};
const showSuccessMessage = () => {
    showSuccess.value = true;
    setTimeout(() => {
        showSuccess.value = false;
    }, 3000);
};
const handleCommonSsidToggle = () => {
    if (!wlanBasicData.value)
        return;
    // When Common SSID is disabled, also disable MLO
    if (wlanBasicData.value.WlanBasic.CommonSSIDEnable === 0) {
        wlanBasicData.value.WlanBasic.MLOEnable = 0;
    }
};
const handleBlockingComplete = () => {
    showBlockingOverlay.value = false;
    // Redirect back to the current page to refresh data
    router.go(0);
};
const handleSubmit = async () => {
    if (!wlanBasicData.value)
        return;
    loading.value = true;
    try {
        // Create a new object without MeshEnable and SecurityModeAvailable for the POST request
        const postData = {
            WlanBasic: {
                MLOEnable: wlanBasicData.value.WlanBasic.MLOEnable,
                CommonSSIDEnable: wlanBasicData.value.WlanBasic.CommonSSIDEnable,
                wifi2g: {
                    Enable: wlanBasicData.value.WlanBasic.wifi2g.Enable,
                    SSID: wlanBasicData.value.WlanBasic.wifi2g.SSID,
                    SecurityMode: wlanBasicData.value.WlanBasic.wifi2g.SecurityMode,
                    Password: wlanBasicData.value.WlanBasic.wifi2g.Password
                },
                wifi5g: {
                    Enable: wlanBasicData.value.WlanBasic.wifi5g.Enable,
                    SSID: wlanBasicData.value.WlanBasic.wifi5g.SSID,
                    SecurityMode: wlanBasicData.value.WlanBasic.wifi5g.SecurityMode,
                    Password: wlanBasicData.value.WlanBasic.wifi5g.Password
                },
                wifi6g: {
                    Enable: wlanBasicData.value.WlanBasic.wifi6g.Enable,
                    SSID: wlanBasicData.value.WlanBasic.wifi6g.SSID,
                    SecurityMode: wlanBasicData.value.WlanBasic.wifi6g.SecurityMode,
                    Password: wlanBasicData.value.WlanBasic.wifi6g.Password
                },
                wifimlo: {
                    Enable: wlanBasicData.value.WlanBasic.wifimlo.Enable,
                    SSID: wlanBasicData.value.WlanBasic.wifimlo.SSID,
                    SecurityMode: wlanBasicData.value.WlanBasic.wifimlo.SecurityMode,
                    Password: wlanBasicData.value.WlanBasic.wifimlo.Password
                }
            }
        };
        await updateWlanBasic(postData);
        showSuccessMessage();
        // Show blocking overlay instead of immediate refresh
        showBlockingOverlay.value = true;
    }
    catch (error) {
        console.error('Error updating wireless basic config:', error);
    }
    finally {
        loading.value = false;
    }
};
onMounted(fetchBasicConfig);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['info-banner']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['password-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['password-input']} */ ;
/** @type {__VLS_StyleScopedClasses['password-input']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-password']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-password']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['band-sections']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wireless-basic-config" },
    'data-testid': (__VLS_ctx.qa('wireless-basic-config-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.handleSubmit) },
    ...{ class: ({ 'loading': __VLS_ctx.loading }) },
    'data-testid': (__VLS_ctx.qa('wireless-basic-config-form')),
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-overlay" },
        'data-testid': (__VLS_ctx.qa('wireless-basic-config-loading-overlay')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-spinner" },
    });
}
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
        'data-testid': (__VLS_ctx.qa('wireless-basic-config-success-message')),
    });
    (__VLS_ctx.t('common.apply'));
}
if (__VLS_ctx.wlanBasicData) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "band-sections" },
        'data-testid': (__VLS_ctx.qa('wireless-basic-config-band-sections')),
    });
    if (__VLS_ctx.isMloDisabledByMesh) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "mesh-status" },
            'data-testid': (__VLS_ctx.qa('wireless-basic-config-mesh-status')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "info-banner" },
            'data-testid': (__VLS_ctx.qa('wireless-basic-config-mesh-info-banner')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.t('wireless.meshMloDisabled'));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
        'data-testid': (__VLS_ctx.qa('wireless-basic-config-common-ssid-section')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "section-title" },
        'data-testid': (__VLS_ctx.qa('wireless-basic-config-common-ssid-title')),
    });
    (__VLS_ctx.t('wireless.commonSsidSettings'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-content" },
        'data-testid': (__VLS_ctx.qa('wireless-basic-config-common-ssid-content')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "switch-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        'data-testid': (__VLS_ctx.qa('wireless-basic-config-common-ssid-enable-label')),
    });
    (__VLS_ctx.t('wireless.commonSsidEnable'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        ...{ onChange: (__VLS_ctx.handleCommonSsidToggle) },
        type: "checkbox",
        'data-testid': (__VLS_ctx.qa('wireless-basic-config-common-ssid-enable-toggle')),
        'true-value': (1),
        'false-value': (0),
    });
    (__VLS_ctx.wlanBasicData.WlanBasic.CommonSSIDEnable);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
        'data-testid': (__VLS_ctx.qa('wireless-basic-config-mlo-section')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "section-title" },
        'data-testid': (__VLS_ctx.qa('wireless-basic-config-mlo-title')),
    });
    (__VLS_ctx.t('wireless.mloSettings'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-content" },
        'data-testid': (__VLS_ctx.qa('wireless-basic-config-mlo-content')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "switch-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        'data-testid': (__VLS_ctx.qa('wireless-basic-config-mlo-enable-label')),
    });
    (__VLS_ctx.t('wireless.mloEnable'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "checkbox",
        'data-testid': (__VLS_ctx.qa('wireless-basic-config-mlo-enable-toggle')),
        'true-value': (1),
        'false-value': (0),
        disabled: (__VLS_ctx.isMloDisabledByMesh || __VLS_ctx.wlanBasicData.WlanBasic.CommonSSIDEnable === 0),
    });
    (__VLS_ctx.wlanBasicData.WlanBasic.MLOEnable);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    if (__VLS_ctx.wlanBasicData.WlanBasic.CommonSSIDEnable === 1) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "panel-section" },
            'data-testid': (__VLS_ctx.qa('wireless-basic-config-common-ssid-band-section')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "band-header" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-title-sp" },
            'data-testid': (__VLS_ctx.qa('wireless-basic-config-common-ssid-band-title')),
        });
        (__VLS_ctx.t('wireless.commonSsidBandSettings'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "band-content" },
            'data-testid': (__VLS_ctx.qa('wireless-basic-config-common-ssid-band-content')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "switch-label" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            'data-testid': (__VLS_ctx.qa('wireless-basic-config-common-ssid-band-enable-label')),
        });
        (__VLS_ctx.t('common.enable'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "switch" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
            type: "checkbox",
            'data-testid': (__VLS_ctx.qa('wireless-basic-config-common-ssid-band-enable-toggle')),
            'true-value': (1),
            'false-value': (0),
        });
        (__VLS_ctx.wlanBasicData.WlanBasic.wifimlo.Enable);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "slider" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            'data-testid': (__VLS_ctx.qa('wireless-basic-config-common-ssid-band-ssid-label')),
        });
        (__VLS_ctx.t('wireless.ssid'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "text",
            'data-testid': (__VLS_ctx.qa('wireless-basic-config-common-ssid-band-ssid-input')),
            value: (__VLS_ctx.wlanBasicData.WlanBasic.wifimlo.SSID),
            disabled: (!__VLS_ctx.wlanBasicData.WlanBasic.wifimlo.Enable),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            'data-testid': (__VLS_ctx.qa('wireless-basic-config-common-ssid-band-authentication-label')),
        });
        (__VLS_ctx.t('wireless.authentication'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
            'data-testid': (__VLS_ctx.qa('wireless-basic-config-common-ssid-band-authentication-select')),
            value: (__VLS_ctx.wlanBasicData.WlanBasic.wifimlo.SecurityMode),
            disabled: (!__VLS_ctx.wlanBasicData.WlanBasic.wifimlo.Enable),
        });
        for (const [mode] of __VLS_getVForSourceType(((__VLS_ctx.wlanBasicData.WlanBasic.wifimlo.SecurityModeAvailable ?? '').split(',')))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
                key: (mode),
                'data-testid': (__VLS_ctx.qa(`wireless-basic-config-common-ssid-band-authentication-option-${__VLS_ctx.slug(mode)}`)),
                value: (mode),
            });
            (mode);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            'data-testid': (__VLS_ctx.qa('wireless-basic-config-common-ssid-band-password-label')),
        });
        (__VLS_ctx.t('wireless.password'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "password-input" },
            'data-testid': (__VLS_ctx.qa('wireless-basic-config-common-ssid-band-password-container')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: (__VLS_ctx.showPassword ? 'text' : 'password'),
            'data-testid': (__VLS_ctx.qa('wireless-basic-config-common-ssid-band-password-input')),
            disabled: (!__VLS_ctx.wlanBasicData.WlanBasic.wifimlo.Enable),
        });
        (__VLS_ctx.wlanBasicData.WlanBasic.wifimlo.Password);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.wlanBasicData))
                        return;
                    if (!(__VLS_ctx.wlanBasicData.WlanBasic.CommonSSIDEnable === 1))
                        return;
                    __VLS_ctx.showPassword = !__VLS_ctx.showPassword;
                } },
            type: "button",
            ...{ class: "toggle-password" },
            'data-testid': (__VLS_ctx.qa('wireless-basic-config-common-ssid-band-password-toggle')),
            disabled: (!__VLS_ctx.wlanBasicData.WlanBasic.wifimlo.Enable),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
        (__VLS_ctx.showPassword ? 'visibility_off' : 'visibility');
    }
    if (__VLS_ctx.wlanBasicData.WlanBasic.CommonSSIDEnable === 0) {
        /** @type {[typeof WirelessBandConfig, ]} */ ;
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(WirelessBandConfig, new WirelessBandConfig({
            dataTestid: (__VLS_ctx.qa('wireless-basic-config-2g-band')),
            title: "2.4GHz",
            modelValue: (__VLS_ctx.wlanBasicData.WlanBasic.wifi2g),
        }));
        const __VLS_1 = __VLS_0({
            dataTestid: (__VLS_ctx.qa('wireless-basic-config-2g-band')),
            title: "2.4GHz",
            modelValue: (__VLS_ctx.wlanBasicData.WlanBasic.wifi2g),
        }, ...__VLS_functionalComponentArgsRest(__VLS_0));
        /** @type {[typeof WirelessBandConfig, ]} */ ;
        // @ts-ignore
        const __VLS_3 = __VLS_asFunctionalComponent(WirelessBandConfig, new WirelessBandConfig({
            dataTestid: (__VLS_ctx.qa('wireless-basic-config-5g-band')),
            title: "5GHz",
            modelValue: (__VLS_ctx.wlanBasicData.WlanBasic.wifi5g),
        }));
        const __VLS_4 = __VLS_3({
            dataTestid: (__VLS_ctx.qa('wireless-basic-config-5g-band')),
            title: "5GHz",
            modelValue: (__VLS_ctx.wlanBasicData.WlanBasic.wifi5g),
        }, ...__VLS_functionalComponentArgsRest(__VLS_3));
        /** @type {[typeof WirelessBandConfig, ]} */ ;
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent(WirelessBandConfig, new WirelessBandConfig({
            dataTestid: (__VLS_ctx.qa('wireless-basic-config-6g-band')),
            title: "6GHz",
            modelValue: (__VLS_ctx.wlanBasicData.WlanBasic.wifi6g),
        }));
        const __VLS_7 = __VLS_6({
            dataTestid: (__VLS_ctx.qa('wireless-basic-config-6g-band')),
            title: "6GHz",
            modelValue: (__VLS_ctx.wlanBasicData.WlanBasic.wifi6g),
        }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "button-group" },
    'data-testid': (__VLS_ctx.qa('wireless-basic-config-button-group')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.fetchBasicConfig) },
    type: "button",
    ...{ class: "btn btn-secondary" },
    'data-testid': (__VLS_ctx.qa('wireless-basic-config-cancel-button')),
    disabled: (__VLS_ctx.loading),
});
(__VLS_ctx.t('common.cancel'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    ...{ class: "btn btn-primary" },
    'data-testid': (__VLS_ctx.qa('wireless-basic-config-apply-button')),
    disabled: (__VLS_ctx.loading),
});
(__VLS_ctx.t('common.apply'));
/** @type {[typeof BlockingOverlay, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(BlockingOverlay, new BlockingOverlay({
    ...{ 'onComplete': {} },
    dataTestid: (__VLS_ctx.qa('wireless-basic-config-blocking-overlay')),
    isVisible: (__VLS_ctx.showBlockingOverlay),
    message: "Applying WiFi Basic Settings...",
    duration: (30),
}));
const __VLS_10 = __VLS_9({
    ...{ 'onComplete': {} },
    dataTestid: (__VLS_ctx.qa('wireless-basic-config-blocking-overlay')),
    isVisible: (__VLS_ctx.showBlockingOverlay),
    message: "Applying WiFi Basic Settings...",
    duration: (30),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onComplete: (__VLS_ctx.handleBlockingComplete)
};
var __VLS_11;
/** @type {__VLS_StyleScopedClasses['wireless-basic-config']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['success-message']} */ ;
/** @type {__VLS_StyleScopedClasses['band-sections']} */ ;
/** @type {__VLS_StyleScopedClasses['mesh-status']} */ ;
/** @type {__VLS_StyleScopedClasses['info-banner']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['band-header']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title-sp']} */ ;
/** @type {__VLS_StyleScopedClasses['band-content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['password-input']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-password']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            WirelessBandConfig: WirelessBandConfig,
            BlockingOverlay: BlockingOverlay,
            qa: qa,
            slug: slug,
            t: t,
            wlanBasicData: wlanBasicData,
            loading: loading,
            showSuccess: showSuccess,
            showPassword: showPassword,
            showBlockingOverlay: showBlockingOverlay,
            isMloDisabledByMesh: isMloDisabledByMesh,
            fetchBasicConfig: fetchBasicConfig,
            handleCommonSsidToggle: handleCommonSsidToggle,
            handleBlockingComplete: handleBlockingComplete,
            handleSubmit: handleSubmit,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
