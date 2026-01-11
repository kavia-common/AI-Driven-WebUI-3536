import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { joinThreadNetwork } from '../../../services/api/thread';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const loading = ref(false);
const error = ref(null);
const showSuccess = ref(false);
const successMessage = ref('');
// Form data
const credentialType = ref('NetworkKey');
const credentialValue = ref('');
// Join network
const handleJoin = async () => {
    if (!credentialValue.value) {
        error.value = 'Please enter a credential value';
        return;
    }
    loading.value = true;
    error.value = null;
    try {
        const request = {
            ThreadJoinNetwork: {
                'Credential Type': credentialType.value,
                'Credential Value': credentialValue.value
            }
        };
        const response = await joinThreadNetwork(request);
        if (response.ThreadJoinNetwork.Status === 'Join Success') {
            showSuccessNotification(t('thread.joinSuccess'));
            credentialValue.value = '';
        }
        else {
            error.value = response.ThreadJoinNetwork.Status || t('thread.joinFailed');
        }
    }
    catch (err) {
        console.error('Error joining Thread network:', err);
        error.value = 'Failed to join Thread network';
    }
    finally {
        loading.value = false;
    }
};
// Show success notification
const showSuccessNotification = (message) => {
    successMessage.value = message;
    showSuccess.value = true;
    setTimeout(() => {
        showSuccess.value = false;
    }, 3000);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['thread-content']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['credential-type']} */ ;
/** @type {__VLS_StyleScopedClasses['credential-value']} */ ;
/** @type {__VLS_StyleScopedClasses['credential-label']} */ ;
/** @type {__VLS_StyleScopedClasses['credential-select']} */ ;
/** @type {__VLS_StyleScopedClasses['credential-input']} */ ;
/** @type {__VLS_StyleScopedClasses['join-button']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "thread-content" },
    'data-testid': (__VLS_ctx.qa('thread-join-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-section" },
    'data-testid': (__VLS_ctx.qa('thread-join-section')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-title" },
    'data-testid': (__VLS_ctx.qa('thread-join-title')),
});
(__VLS_ctx.t('thread.join'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "join-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "join-section" },
    'data-testid': (__VLS_ctx.qa('thread-join-form-section')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "credential-type" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "credential-label" },
    'data-testid': (__VLS_ctx.qa('thread-join-credential-type-label')),
});
(__VLS_ctx.t('thread.credentialType'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.credentialType),
    ...{ class: "credential-select" },
    'data-testid': (__VLS_ctx.qa('thread-join-credential-type-select')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "NetworkKey",
});
(__VLS_ctx.t('thread.networkKey'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "PSKd",
});
(__VLS_ctx.t('thread.pskc'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "credential-value" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "credential-label" },
    'data-testid': (__VLS_ctx.qa('thread-join-credential-value-label')),
});
(__VLS_ctx.credentialType);
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "text",
    'data-testid': (__VLS_ctx.qa('thread-join-credential-value-input')),
    value: (__VLS_ctx.credentialValue),
    ...{ class: "credential-input" },
    placeholder: (__VLS_ctx.credentialType === 'NetworkKey' ? '80DD708D25F4F8ED06285A11054A708C' : 'J01NME'),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "join-button-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleJoin) },
    ...{ class: "btn btn-primary join-button" },
    'data-testid': (__VLS_ctx.qa('thread-join-button')),
    disabled: (__VLS_ctx.loading || !__VLS_ctx.credentialValue),
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
}
(__VLS_ctx.t('thread.joinButton'));
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-message" },
        'data-testid': (__VLS_ctx.qa('thread-join-error')),
    });
    (__VLS_ctx.error);
}
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
        'data-testid': (__VLS_ctx.qa('thread-join-success-message')),
    });
    (__VLS_ctx.successMessage);
}
/** @type {__VLS_StyleScopedClasses['thread-content']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['join-container']} */ ;
/** @type {__VLS_StyleScopedClasses['join-section']} */ ;
/** @type {__VLS_StyleScopedClasses['credential-type']} */ ;
/** @type {__VLS_StyleScopedClasses['credential-label']} */ ;
/** @type {__VLS_StyleScopedClasses['credential-select']} */ ;
/** @type {__VLS_StyleScopedClasses['credential-value']} */ ;
/** @type {__VLS_StyleScopedClasses['credential-label']} */ ;
/** @type {__VLS_StyleScopedClasses['credential-input']} */ ;
/** @type {__VLS_StyleScopedClasses['join-button-container']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['join-button']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['success-message']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
            loading: loading,
            error: error,
            showSuccess: showSuccess,
            successMessage: successMessage,
            credentialType: credentialType,
            credentialValue: credentialValue,
            handleJoin: handleJoin,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
