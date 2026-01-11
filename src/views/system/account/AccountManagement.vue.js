import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { getAccountSettings, updateAccountPassword } from '../../../services/api/account';
import { useQA } from '../../../utils/qa';
const { qa } = useQA();
const { t } = useI18n();
const accountData = ref(null);
const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const showOldPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
const loading = ref(false);
const showSuccess = ref(false);
const error = ref(null);
const maxLength = computed(() => accountData.value?.ManagementAccount.MaxLength || 15);
const noSpace = computed(() => accountData.value?.ManagementAccount.NoSpace || true);
const fetchAccountSettings = async () => {
    loading.value = true;
    error.value = null;
    try {
        accountData.value = await getAccountSettings();
    }
    catch (err) {
        console.error('Error fetching account settings:', err);
        error.value = t('account.errorFetchSettings');
    }
    finally {
        loading.value = false;
    }
};
const validatePasswords = () => {
    if (!oldPassword.value || !newPassword.value || !confirmPassword.value) {
        return t('account.errorAllFieldsRequired');
    }
    if (noSpace.value && (oldPassword.value.includes(' ') || newPassword.value.includes(' ') || confirmPassword.value.includes(' '))) {
        return t('account.errorPasswordSpace');
    }
    if (newPassword.value.length > maxLength.value) {
        return t('account.errorPasswordLength', { maxLength: maxLength.value });
    }
    if (newPassword.value !== confirmPassword.value) {
        return t('account.errorPasswordMismatch');
    }
    return null;
};
const showSuccessMessage = () => {
    showSuccess.value = true;
    setTimeout(() => {
        showSuccess.value = false;
    }, 3000);
};
const handleCancel = () => {
    oldPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
    error.value = null;
    showOldPassword.value = false;
    showNewPassword.value = false;
    showConfirmPassword.value = false;
};
const handleApply = async () => {
    error.value = null;
    const validationError = validatePasswords();
    if (validationError) {
        error.value = validationError;
        return;
    }
    loading.value = true;
    try {
        const response = await updateAccountPassword({
            ManagementAccount: {
                OldPassword: oldPassword.value,
                NewPassword: newPassword.value
            }
        });
        if (response.ManagementAccount.result === 'Success') {
            showSuccessMessage();
            handleCancel();
        }
        else {
            error.value = response.ManagementAccount.reason || t('account.errorUpdateFailed');
        }
    }
    catch (err) {
        console.error('Error updating password:', err);
        error.value = t('account.errorUpdateFailed');
    }
    finally {
        loading.value = false;
    }
};
onMounted(fetchAccountSettings);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['info-box']} */ ;
/** @type {__VLS_StyleScopedClasses['info-box']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['password-input-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['password-input-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['password-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['password-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
    'data-testid': (__VLS_ctx.qa('account-title')),
});
(__VLS_ctx.t('account.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('account-content')),
});
if (__VLS_ctx.loading && !__VLS_ctx.accountData) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('account-loading')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-spinner" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('common.loading'));
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
        'data-testid': (__VLS_ctx.qa('account-panel')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-box" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.t('account.infoMessage', { maxLength: __VLS_ctx.maxLength }));
    if (__VLS_ctx.noSpace) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "note" },
        });
        (__VLS_ctx.t('account.noteMessage'));
    }
    if (__VLS_ctx.error) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "error-message" },
            'data-testid': (__VLS_ctx.qa('account-error')),
        });
        (__VLS_ctx.error);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('account-old-password-label')),
    });
    (__VLS_ctx.t('account.oldPassword'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "password-input-wrapper" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: (__VLS_ctx.showOldPassword ? 'text' : 'password'),
        'data-testid': (__VLS_ctx.qa('account-old-password-input')),
        placeholder: (__VLS_ctx.t('account.passwordPlaceholder')),
        maxlength: (__VLS_ctx.maxLength),
        disabled: (__VLS_ctx.loading),
    });
    (__VLS_ctx.oldPassword);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.loading && !__VLS_ctx.accountData))
                    return;
                __VLS_ctx.showOldPassword = !__VLS_ctx.showOldPassword;
            } },
        type: "button",
        ...{ class: "password-toggle" },
        'data-testid': (__VLS_ctx.qa('account-old-password-toggle')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    (__VLS_ctx.showOldPassword ? 'visibility_off' : 'visibility');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('account-new-password-label')),
    });
    (__VLS_ctx.t('account.newPassword'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "password-input-wrapper" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: (__VLS_ctx.showNewPassword ? 'text' : 'password'),
        'data-testid': (__VLS_ctx.qa('account-new-password-input')),
        placeholder: (__VLS_ctx.t('account.passwordPlaceholder')),
        maxlength: (__VLS_ctx.maxLength),
        disabled: (__VLS_ctx.loading),
    });
    (__VLS_ctx.newPassword);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.loading && !__VLS_ctx.accountData))
                    return;
                __VLS_ctx.showNewPassword = !__VLS_ctx.showNewPassword;
            } },
        type: "button",
        ...{ class: "password-toggle" },
        'data-testid': (__VLS_ctx.qa('account-new-password-toggle')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    (__VLS_ctx.showNewPassword ? 'visibility_off' : 'visibility');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('account-confirm-password-label')),
    });
    (__VLS_ctx.t('account.confirmPassword'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "password-input-wrapper" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: (__VLS_ctx.showConfirmPassword ? 'text' : 'password'),
        'data-testid': (__VLS_ctx.qa('account-confirm-password-input')),
        placeholder: (__VLS_ctx.t('account.passwordPlaceholder')),
        maxlength: (__VLS_ctx.maxLength),
        disabled: (__VLS_ctx.loading),
    });
    (__VLS_ctx.confirmPassword);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.loading && !__VLS_ctx.accountData))
                    return;
                __VLS_ctx.showConfirmPassword = !__VLS_ctx.showConfirmPassword;
            } },
        type: "button",
        ...{ class: "password-toggle" },
        'data-testid': (__VLS_ctx.qa('account-confirm-password-toggle')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    (__VLS_ctx.showConfirmPassword ? 'visibility_off' : 'visibility');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "button-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleCancel) },
        ...{ class: "btn btn-secondary" },
        'data-testid': (__VLS_ctx.qa('account-cancel-button')),
        disabled: (__VLS_ctx.loading),
    });
    (__VLS_ctx.t('common.cancel'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleApply) },
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('account-apply-button')),
        disabled: (__VLS_ctx.loading),
    });
    (__VLS_ctx.t('common.apply'));
}
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
        'data-testid': (__VLS_ctx.qa('account-success-message')),
    });
    (__VLS_ctx.t('account.successUpdate'));
}
/** @type {__VLS_StyleScopedClasses['page-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['info-box']} */ ;
/** @type {__VLS_StyleScopedClasses['note']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['password-input-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['password-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['password-input-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['password-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['password-input-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['password-toggle']} */ ;
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
            qa: qa,
            t: t,
            accountData: accountData,
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
            showOldPassword: showOldPassword,
            showNewPassword: showNewPassword,
            showConfirmPassword: showConfirmPassword,
            loading: loading,
            showSuccess: showSuccess,
            error: error,
            maxLength: maxLength,
            noSpace: noSpace,
            handleCancel: handleCancel,
            handleApply: handleApply,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
