import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getDmz, updateDmz } from '../../../services/api/dmz';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const dmzData = ref(null);
const loading = ref(false);
const showSuccess = ref(false);
const error = ref(null);
const fetchDmz = async () => {
    loading.value = true;
    error.value = null;
    try {
        dmzData.value = await getDmz();
    }
    catch (err) {
        console.error('Error fetching DMZ settings:', err);
        error.value = 'Failed to fetch DMZ settings';
    }
    finally {
        loading.value = false;
    }
};
// Validation function for IP address
const isValidIPv4 = (ip) => {
    if (ip === "0.0.0.0")
        return true;
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipv4Regex.test(ip))
        return false;
    const parts = ip.split('.');
    return parts.every(part => {
        const num = parseInt(part, 10);
        return num >= 0 && num <= 255;
    });
};
const showSuccessMessage = () => {
    showSuccess.value = true;
    setTimeout(() => {
        showSuccess.value = false;
    }, 3000);
};
const handleSubmit = async () => {
    if (!dmzData.value)
        return;
    error.value = null;
    // Validate IP address if DMZ is enabled
    if (dmzData.value.AdvancedDmz.Enable && !isValidIPv4(dmzData.value.AdvancedDmz.IPAddress)) {
        error.value = 'Invalid IP address format';
        return;
    }
    loading.value = true;
    try {
        await updateDmz({
            AdvancedDmz: {
                Enable: dmzData.value.AdvancedDmz.Enable,
                IPAddress: dmzData.value.AdvancedDmz.Enable ? dmzData.value.AdvancedDmz.IPAddress : "0.0.0.0"
            }
        });
        showSuccessMessage();
        await fetchDmz();
    }
    catch (err) {
        console.error('Error updating DMZ settings:', err);
        error.value = 'Failed to update DMZ settings';
    }
    finally {
        loading.value = false;
    }
};
onMounted(fetchDmz);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
    'data-testid': (__VLS_ctx.qa('dmz-title')),
});
(__VLS_ctx.t('dmz.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('dmz-content')),
});
if (__VLS_ctx.loading && !__VLS_ctx.dmzData) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('dmz-loading')),
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
        'data-testid': (__VLS_ctx.qa('dmz-error')),
    });
    (__VLS_ctx.error);
}
else if (__VLS_ctx.dmzData) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
        'data-testid': (__VLS_ctx.qa('dmz-panel')),
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
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        'data-testid': (__VLS_ctx.qa('dmz-enable-label')),
    });
    (__VLS_ctx.t('dmz.enable'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "checkbox",
        'data-testid': (__VLS_ctx.qa('dmz-enable-toggle')),
    });
    (__VLS_ctx.dmzData.AdvancedDmz.Enable);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    if (__VLS_ctx.dmzData.AdvancedDmz.Enable) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            'data-testid': (__VLS_ctx.qa('dmz-ip-address-label')),
        });
        (__VLS_ctx.t('dmz.ipAddress'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "text",
            'data-testid': (__VLS_ctx.qa('dmz-ip-address-input')),
            value: (__VLS_ctx.dmzData.AdvancedDmz.IPAddress),
            placeholder: "192.168.101.168",
            required: true,
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "button-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.fetchDmz) },
        type: "button",
        ...{ class: "btn btn-secondary" },
        'data-testid': (__VLS_ctx.qa('dmz-cancel-button')),
    });
    (__VLS_ctx.t('common.cancel'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleSubmit) },
        type: "button",
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('dmz-apply-button')),
    });
    (__VLS_ctx.t('common.apply'));
}
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
        'data-testid': (__VLS_ctx.qa('dmz-success-message')),
    });
    (__VLS_ctx.t('common.apply'));
}
/** @type {__VLS_StyleScopedClasses['page-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
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
            qa: qa,
            t: t,
            dmzData: dmzData,
            loading: loading,
            showSuccess: showSuccess,
            error: error,
            fetchDmz: fetchDmz,
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
