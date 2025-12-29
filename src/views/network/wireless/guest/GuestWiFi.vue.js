import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { getGuestWiFi, updateGuestWiFi } from '../../../../services/api/guestAccess';
import BlockingOverlay from '../../../../components/BlockingOverlay.vue';
import { useQA } from '../../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const router = useRouter();
const guestWiFiData = ref(null);
const loading = ref(false);
const showSuccess = ref(false);
const error = ref(null);
const showPassword = ref(false);
const showBlockingOverlay = ref(false);
// Computed property to check if MLO is disabled by Mesh
const isMLODisabledByMesh = computed(() => {
    return guestWiFiData.value?.GuestWiFi.MeshEnable === 1;
});
const fetchGuestWiFi = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await getGuestWiFi();
        guestWiFiData.value = response;
    }
    catch (err) {
        console.error('Error fetching Guest WiFi settings:', err);
        error.value = 'Failed to fetch Guest WiFi settings';
    }
    finally {
        loading.value = false;
    }
};
const securityModes = computed(() => {
    if (!guestWiFiData.value)
        return [];
    return guestWiFiData.value.GuestWiFi.SecurityModeAvailable.split(',');
});
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
    if (!guestWiFiData.value)
        return;
    loading.value = true;
    error.value = null;
    try {
        await updateGuestWiFi({
            GuestWiFi: {
                Enable: guestWiFiData.value.GuestWiFi.Enable,
                MLOEnable: guestWiFiData.value.GuestWiFi.MLOEnable,
                Password: guestWiFiData.value.GuestWiFi.Password,
                SecurityMode: guestWiFiData.value.GuestWiFi.SecurityMode,
                SSID: guestWiFiData.value.GuestWiFi.SSID
            }
        });
        showSuccessMessage();
        // Show blocking overlay instead of immediate refresh
        showBlockingOverlay.value = true;
    }
    catch (err) {
        console.error('Error updating Guest WiFi settings:', err);
        error.value = 'Failed to update Guest WiFi settings';
    }
    finally {
        loading.value = false;
    }
};
onMounted(fetchGuestWiFi);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['info-banner']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['password-input']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-password']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-password']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['guest-wifi']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "guest-wifi" },
    'data-testid': (__VLS_ctx.qa('guest-wifi-content')),
});
if (__VLS_ctx.loading && !__VLS_ctx.guestWiFiData) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('guest-wifi-loading')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-spinner" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('common.loading'));
}
else if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-state" },
        'data-testid': (__VLS_ctx.qa('guest-wifi-error')),
    });
    (__VLS_ctx.error);
}
else if (__VLS_ctx.guestWiFiData) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
        ...{ onSubmit: (__VLS_ctx.handleSubmit) },
        'data-testid': (__VLS_ctx.qa('guest-wifi-form')),
    });
    if (__VLS_ctx.isMLODisabledByMesh) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "mesh-status" },
            'data-testid': (__VLS_ctx.qa('guest-wifi-mesh-status')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "info-banner" },
            'data-testid': (__VLS_ctx.qa('guest-wifi-mesh-info-banner')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.t('wireless.meshMloDisabled'));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "switch-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        'data-testid': (__VLS_ctx.qa('guest-wifi-enable-label')),
    });
    (__VLS_ctx.t('guest.enable'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "checkbox",
        'data-testid': (__VLS_ctx.qa('guest-wifi-enable-toggle')),
        'true-value': (1),
        'false-value': (0),
    });
    (__VLS_ctx.guestWiFiData.GuestWiFi.Enable);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "switch-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        'data-testid': (__VLS_ctx.qa('guest-wifi-mlo-enable-label')),
    });
    (__VLS_ctx.t('guest.enable'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "checkbox",
        'data-testid': (__VLS_ctx.qa('guest-wifi-mlo-enable-toggle')),
        'true-value': (1),
        'false-value': (0),
        disabled: (__VLS_ctx.guestWiFiData.GuestWiFi.Enable === 0 || __VLS_ctx.isMLODisabledByMesh),
    });
    (__VLS_ctx.guestWiFiData.GuestWiFi.MLOEnable);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('guest-wifi-ssid-label')),
    });
    (__VLS_ctx.t('guest.ssid'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "text",
        'data-testid': (__VLS_ctx.qa('guest-wifi-ssid-input')),
        value: (__VLS_ctx.guestWiFiData.GuestWiFi.SSID),
        disabled: (__VLS_ctx.guestWiFiData.GuestWiFi.Enable === 0),
        required: true,
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('guest-wifi-authentication-label')),
    });
    (__VLS_ctx.t('guest.authentication'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        'data-testid': (__VLS_ctx.qa('guest-wifi-authentication-select')),
        value: (__VLS_ctx.guestWiFiData.GuestWiFi.SecurityMode),
        disabled: (__VLS_ctx.guestWiFiData.GuestWiFi.Enable === 0),
    });
    for (const [mode] of __VLS_getVForSourceType((__VLS_ctx.securityModes))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
            key: (mode),
            value: (mode),
            'data-testid': (__VLS_ctx.qa(`guest-wifi-authentication-option-${__VLS_ctx.slug(mode)}`)),
        });
        (mode);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('guest-wifi-password-label')),
    });
    (__VLS_ctx.t('guest.password'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "password-input" },
        'data-testid': (__VLS_ctx.qa('guest-wifi-password-container')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: (__VLS_ctx.showPassword ? 'text' : 'password'),
        'data-testid': (__VLS_ctx.qa('guest-wifi-password-input')),
        disabled: (__VLS_ctx.guestWiFiData.GuestWiFi.Enable === 0),
        required: true,
    });
    (__VLS_ctx.guestWiFiData.GuestWiFi.Password);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.loading && !__VLS_ctx.guestWiFiData))
                    return;
                if (!!(__VLS_ctx.error))
                    return;
                if (!(__VLS_ctx.guestWiFiData))
                    return;
                __VLS_ctx.showPassword = !__VLS_ctx.showPassword;
            } },
        type: "button",
        ...{ class: "toggle-password" },
        'data-testid': (__VLS_ctx.qa('guest-wifi-password-toggle')),
        disabled: (__VLS_ctx.guestWiFiData.GuestWiFi.Enable === 0),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    (__VLS_ctx.showPassword ? 'visibility_off' : 'visibility');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "button-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.fetchGuestWiFi) },
        type: "button",
        ...{ class: "btn btn-secondary" },
        disabled: (__VLS_ctx.loading),
        'data-testid': (__VLS_ctx.qa('guest-wifi-cancel-button')),
    });
    (__VLS_ctx.t('common.cancel'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        type: "submit",
        ...{ class: "btn btn-primary" },
        disabled: (__VLS_ctx.loading),
        'data-testid': (__VLS_ctx.qa('guest-wifi-apply-button')),
    });
    (__VLS_ctx.t('common.apply'));
}
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
        'data-testid': (__VLS_ctx.qa('guest-wifi-success-message')),
    });
    (__VLS_ctx.t('common.apply'));
}
/** @type {[typeof BlockingOverlay, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(BlockingOverlay, new BlockingOverlay({
    ...{ 'onComplete': {} },
    dataTestid: (__VLS_ctx.qa('guest-wifi-blocking-overlay')),
    isVisible: (__VLS_ctx.showBlockingOverlay),
    message: "Applying Guest WiFi Settings...",
    duration: (30),
}));
const __VLS_1 = __VLS_0({
    ...{ 'onComplete': {} },
    dataTestid: (__VLS_ctx.qa('guest-wifi-blocking-overlay')),
    isVisible: (__VLS_ctx.showBlockingOverlay),
    message: "Applying Guest WiFi Settings...",
    duration: (30),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onComplete: (__VLS_ctx.handleBlockingComplete)
};
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['guest-wifi']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['mesh-status']} */ ;
/** @type {__VLS_StyleScopedClasses['info-banner']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
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
/** @type {__VLS_StyleScopedClasses['success-message']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            BlockingOverlay: BlockingOverlay,
            qa: qa,
            slug: slug,
            t: t,
            guestWiFiData: guestWiFiData,
            loading: loading,
            showSuccess: showSuccess,
            error: error,
            showPassword: showPassword,
            showBlockingOverlay: showBlockingOverlay,
            isMLODisabledByMesh: isMLODisabledByMesh,
            fetchGuestWiFi: fetchGuestWiFi,
            securityModes: securityModes,
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
