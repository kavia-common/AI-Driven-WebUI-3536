import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getWanModeSetup, updateWanModeSetup } from '../../../services/api/wanSetup';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const setupData = ref(null);
const loading = ref(false);
const showSuccess = ref(false);
const error = ref(null);
const fetchSetupData = async () => {
    loading.value = true;
    error.value = null;
    try {
        setupData.value = await getWanModeSetup();
    }
    catch (err) {
        console.error('Error fetching WAN mode setup:', err);
        error.value = 'Failed to fetch WAN mode setup';
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
const handleSubmit = async () => {
    if (!setupData.value)
        return;
    loading.value = true;
    error.value = null;
    try {
        await updateWanModeSetup({
            WanModeSetup: {
                OperationMode: setupData.value.WanModeSetup.OperationMode,
                WANMode: setupData.value.WanModeSetup.WANMode
            }
        });
        showSuccessMessage();
        await fetchSetupData();
    }
    catch (err) {
        console.error('Error updating WAN mode setup:', err);
        error.value = 'Failed to update WAN mode setup';
    }
    finally {
        loading.value = false;
    }
};
onMounted(fetchSetupData);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['wan-mode-setup']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wan-mode-setup" },
    'data-testid': (__VLS_ctx.qa('wan-mode-setup-content')),
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('wan-mode-setup-loading')),
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
        'data-testid': (__VLS_ctx.qa('wan-mode-setup-error')),
    });
    (__VLS_ctx.error);
}
else if (__VLS_ctx.setupData) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
        ...{ onSubmit: (__VLS_ctx.handleSubmit) },
        'data-testid': (__VLS_ctx.qa('wan-mode-setup-form')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('wan-mode-setup-operation-mode-label')),
    });
    (__VLS_ctx.t('wanSetup.operationMode'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        value: (__VLS_ctx.setupData.WanModeSetup.OperationMode),
        'data-testid': (__VLS_ctx.qa('wan-mode-setup-operation-mode-select')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "Manual",
        'data-testid': (__VLS_ctx.qa('wan-mode-setup-operation-mode-manual')),
    });
    (__VLS_ctx.t('wanSetup.manual'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "Automatic",
        'data-testid': (__VLS_ctx.qa('wan-mode-setup-operation-mode-auto')),
    });
    (__VLS_ctx.t('wanSetup.auto'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('wan-mode-setup-wan-mode-label')),
    });
    (__VLS_ctx.t('wanSetup.wanMode'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        value: (__VLS_ctx.setupData.WanModeSetup.WANMode),
        'data-testid': (__VLS_ctx.qa('wan-mode-setup-wan-mode-select')),
        disabled: (__VLS_ctx.setupData.WanModeSetup.OperationMode === 'Automatic'),
    });
    for (const [mode] of __VLS_getVForSourceType((__VLS_ctx.setupData.WanModeSetup.WANModeList))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
            key: (mode),
            value: (mode),
            'data-testid': (__VLS_ctx.qa(`wan-mode-setup-wan-mode-option-${__VLS_ctx.slug(mode)}`)),
        });
        (mode);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "button-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.fetchSetupData) },
        type: "button",
        ...{ class: "btn btn-secondary" },
        'data-testid': (__VLS_ctx.qa('wan-mode-setup-cancel-button')),
        disabled: (__VLS_ctx.loading),
    });
    (__VLS_ctx.t('common.cancel'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        type: "submit",
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('wan-mode-setup-apply-button')),
        disabled: (__VLS_ctx.loading),
    });
    (__VLS_ctx.t('common.apply'));
}
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
        'data-testid': (__VLS_ctx.qa('wan-mode-setup-success-message')),
    });
    (__VLS_ctx.t('common.apply'));
}
/** @type {__VLS_StyleScopedClasses['wan-mode-setup']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
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
            slug: slug,
            t: t,
            setupData: setupData,
            loading: loading,
            showSuccess: showSuccess,
            error: error,
            fetchSetupData: fetchSetupData,
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
