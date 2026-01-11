import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { getWlanAdvanced, updateWlanAdvanced } from '../../../services/api/wireless';
import WirelessAdvancedBandConfig from './advanced/WirelessAdvancedBandConfig.vue';
import BlockingOverlay from '../../../components/BlockingOverlay.vue';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const router = useRouter();
const advancedData = ref(null);
const loading = ref(false);
const showSuccess = ref(false);
const showBlockingOverlay = ref(false);
const fetchAdvancedConfig = async () => {
    loading.value = true;
    try {
        advancedData.value = await getWlanAdvanced();
    }
    catch (error) {
        console.error('Error fetching wireless advanced config:', error);
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
const handleBlockingComplete = () => {
    showBlockingOverlay.value = false;
    // Redirect back to the current page to refresh data
    router.go(0);
};
const handleSubmit = async () => {
    if (!advancedData.value)
        return;
    loading.value = true;
    try {
        const postData = {
            WlanAdvanced: {
                wifi2g: {
                    RadioEnable: advancedData.value.WlanAdvanced.wifi2g.RadioEnable,
                    Mode: advancedData.value.WlanAdvanced.wifi2g.Mode,
                    Channel: advancedData.value.WlanAdvanced.wifi2g.Channel.toString(),
                    ChannelBandwidth: advancedData.value.WlanAdvanced.wifi2g.ChannelBandwidth,
                    AutoChannelEnable: Number(advancedData.value.WlanAdvanced.wifi2g.AutoChannelEnable)
                },
                wifi5g: {
                    RadioEnable: advancedData.value.WlanAdvanced.wifi5g.RadioEnable,
                    Mode: advancedData.value.WlanAdvanced.wifi5g.Mode,
                    Channel: advancedData.value.WlanAdvanced.wifi5g.Channel.toString(),
                    ChannelBandwidth: advancedData.value.WlanAdvanced.wifi5g.ChannelBandwidth,
                    AutoChannelEnable: Number(advancedData.value.WlanAdvanced.wifi5g.AutoChannelEnable)
                },
                wifi6g: {
                    RadioEnable: advancedData.value.WlanAdvanced.wifi6g.RadioEnable,
                    Mode: advancedData.value.WlanAdvanced.wifi6g.Mode,
                    Channel: advancedData.value.WlanAdvanced.wifi6g.Channel.toString(),
                    ChannelBandwidth: advancedData.value.WlanAdvanced.wifi6g.ChannelBandwidth,
                    AutoChannelEnable: Number(advancedData.value.WlanAdvanced.wifi6g.AutoChannelEnable)
                }
            }
        };
        await updateWlanAdvanced(postData);
        showSuccessMessage();
        // Show blocking overlay instead of immediate refresh
        showBlockingOverlay.value = true;
    }
    catch (error) {
        console.error('Error updating wireless advanced config:', error);
    }
    finally {
        loading.value = false;
    }
};
onMounted(fetchAdvancedConfig);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['info-banner']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wireless-advanced-config" },
    'data-testid': (__VLS_ctx.qa('wireless-advanced-config-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.handleSubmit) },
    ...{ class: ({ 'loading': __VLS_ctx.loading }) },
    'data-testid': (__VLS_ctx.qa('wireless-advanced-config-form')),
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-overlay" },
        'data-testid': (__VLS_ctx.qa('wireless-advanced-config-loading-overlay')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-spinner" },
    });
}
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
        'data-testid': (__VLS_ctx.qa('wireless-advanced-config-success-message')),
    });
    (__VLS_ctx.t('common.apply'));
}
if (__VLS_ctx.advancedData) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "band-sections" },
        'data-testid': (__VLS_ctx.qa('wireless-advanced-config-band-sections')),
    });
    if (__VLS_ctx.advancedData.WlanAdvanced.MLOEnable === 1) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "mlo-status" },
            'data-testid': (__VLS_ctx.qa('wireless-advanced-config-mlo-status')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "info-banner" },
            'data-testid': (__VLS_ctx.qa('wireless-advanced-config-mlo-info-banner')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.t('wireless.mloModeDisabled'));
    }
    /** @type {[typeof WirelessAdvancedBandConfig, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(WirelessAdvancedBandConfig, new WirelessAdvancedBandConfig({
        dataTestid: (__VLS_ctx.qa('wireless-advanced-config-2g-band')),
        title: "2.4GHz",
        modelValue: (__VLS_ctx.advancedData.WlanAdvanced.wifi2g),
        mloEnabled: (__VLS_ctx.advancedData.WlanAdvanced.MLOEnable === 1),
    }));
    const __VLS_1 = __VLS_0({
        dataTestid: (__VLS_ctx.qa('wireless-advanced-config-2g-band')),
        title: "2.4GHz",
        modelValue: (__VLS_ctx.advancedData.WlanAdvanced.wifi2g),
        mloEnabled: (__VLS_ctx.advancedData.WlanAdvanced.MLOEnable === 1),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    /** @type {[typeof WirelessAdvancedBandConfig, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(WirelessAdvancedBandConfig, new WirelessAdvancedBandConfig({
        dataTestid: (__VLS_ctx.qa('wireless-advanced-config-5g-band')),
        title: "5GHz",
        modelValue: (__VLS_ctx.advancedData.WlanAdvanced.wifi5g),
        mloEnabled: (__VLS_ctx.advancedData.WlanAdvanced.MLOEnable === 1),
    }));
    const __VLS_4 = __VLS_3({
        dataTestid: (__VLS_ctx.qa('wireless-advanced-config-5g-band')),
        title: "5GHz",
        modelValue: (__VLS_ctx.advancedData.WlanAdvanced.wifi5g),
        mloEnabled: (__VLS_ctx.advancedData.WlanAdvanced.MLOEnable === 1),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
    /** @type {[typeof WirelessAdvancedBandConfig, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(WirelessAdvancedBandConfig, new WirelessAdvancedBandConfig({
        dataTestid: (__VLS_ctx.qa('wireless-advanced-config-6g-band')),
        title: "6GHz",
        modelValue: (__VLS_ctx.advancedData.WlanAdvanced.wifi6g),
        mloEnabled: (__VLS_ctx.advancedData.WlanAdvanced.MLOEnable === 1),
    }));
    const __VLS_7 = __VLS_6({
        dataTestid: (__VLS_ctx.qa('wireless-advanced-config-6g-band')),
        title: "6GHz",
        modelValue: (__VLS_ctx.advancedData.WlanAdvanced.wifi6g),
        mloEnabled: (__VLS_ctx.advancedData.WlanAdvanced.MLOEnable === 1),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "button-group" },
    'data-testid': (__VLS_ctx.qa('wireless-advanced-config-button-group')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.fetchAdvancedConfig) },
    type: "button",
    ...{ class: "btn btn-secondary" },
    'data-testid': (__VLS_ctx.qa('wireless-advanced-config-cancel-button')),
    disabled: (__VLS_ctx.loading),
});
(__VLS_ctx.t('common.cancel'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    ...{ class: "btn btn-primary" },
    'data-testid': (__VLS_ctx.qa('wireless-advanced-config-apply-button')),
    disabled: (__VLS_ctx.loading),
});
(__VLS_ctx.t('common.apply'));
/** @type {[typeof BlockingOverlay, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(BlockingOverlay, new BlockingOverlay({
    ...{ 'onComplete': {} },
    dataTestid: (__VLS_ctx.qa('wireless-advanced-config-blocking-overlay')),
    isVisible: (__VLS_ctx.showBlockingOverlay),
    message: "Applying WiFi Advanced Settings...",
    duration: (30),
}));
const __VLS_10 = __VLS_9({
    ...{ 'onComplete': {} },
    dataTestid: (__VLS_ctx.qa('wireless-advanced-config-blocking-overlay')),
    isVisible: (__VLS_ctx.showBlockingOverlay),
    message: "Applying WiFi Advanced Settings...",
    duration: (30),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onComplete: (__VLS_ctx.handleBlockingComplete)
};
var __VLS_11;
/** @type {__VLS_StyleScopedClasses['wireless-advanced-config']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['success-message']} */ ;
/** @type {__VLS_StyleScopedClasses['band-sections']} */ ;
/** @type {__VLS_StyleScopedClasses['mlo-status']} */ ;
/** @type {__VLS_StyleScopedClasses['info-banner']} */ ;
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
            WirelessAdvancedBandConfig: WirelessAdvancedBandConfig,
            BlockingOverlay: BlockingOverlay,
            qa: qa,
            t: t,
            advancedData: advancedData,
            loading: loading,
            showSuccess: showSuccess,
            showBlockingOverlay: showBlockingOverlay,
            fetchAdvancedConfig: fetchAdvancedConfig,
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
