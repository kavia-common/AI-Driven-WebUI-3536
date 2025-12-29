import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { updateWlanWps } from '../../../../services/api/wireless';
import ConfirmationDialog from '../../../../components/ConfirmationDialog.vue';
import { useQA } from '../../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const props = defineProps();
const emit = defineEmits();
const clientPin = ref('');
const loading = ref(false);
const showConfirmDialog = ref(false);
const confirmAction = ref(null);
const handlePushButton = async () => {
    confirmAction.value = 'pushButton';
    showConfirmDialog.value = true;
};
const handlePinConnect = async () => {
    if (!clientPin.value)
        return;
    confirmAction.value = 'pinConnect';
    showConfirmDialog.value = true;
};
const confirmAction_execute = async () => {
    loading.value = true;
    try {
        if (confirmAction.value === 'pushButton') {
            await updateWlanWps({
                WlanWps: {
                    Action: 'PBCbtn'
                }
            });
        }
        else if (confirmAction.value === 'pinConnect') {
            await updateWlanWps({
                WlanWps: {
                    Action: 'PIN',
                    ClientPIN: parseInt(clientPin.value, 10)
                }
            });
            clientPin.value = '';
        }
        emit('refresh');
    }
    catch (error) {
        console.error('Error with WPS action:', error);
    }
    finally {
        loading.value = false;
        showConfirmDialog.value = false;
        confirmAction.value = null;
    }
};
const cancelConfirmation = () => {
    showConfirmDialog.value = false;
    confirmAction.value = null;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['wps-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['action-section']} */ ;
/** @type {__VLS_StyleScopedClasses['pin-input']} */ ;
/** @type {__VLS_StyleScopedClasses['pin-input']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wps-actions" },
    'data-testid': (__VLS_ctx.qa('wps-actions-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wps-section" },
    'data-testid': (__VLS_ctx.qa('wps-actions-push-button-section')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-title-sp" },
    'data-testid': (__VLS_ctx.qa('wps-actions-push-button-title')),
});
(__VLS_ctx.t('wireless.wpsPushButton'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "action-section" },
    'data-testid': (__VLS_ctx.qa('wps-actions-push-button-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "description-title" },
    'data-testid': (__VLS_ctx.qa('wps-actions-push-button-description-title')),
});
(__VLS_ctx.t('wireless.pushButtonTitle'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    'data-testid': (__VLS_ctx.qa('wps-actions-push-button-description')),
});
(__VLS_ctx.t('wireless.wpsPushButtonDesc'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handlePushButton) },
    ...{ class: "btn btn-primary" },
    'data-testid': (__VLS_ctx.qa('wps-actions-push-button')),
    disabled: (__VLS_ctx.loading),
});
(__VLS_ctx.t('wireless.pushButton'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wps-section" },
    'data-testid': (__VLS_ctx.qa('wps-actions-pin-connect-section')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-title-sp" },
    'data-testid': (__VLS_ctx.qa('wps-actions-pin-connect-title')),
});
(__VLS_ctx.t('wireless.wpsPinConnect'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "action-section" },
    'data-testid': (__VLS_ctx.qa('wps-actions-pin-connect-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "description-title" },
    'data-testid': (__VLS_ctx.qa('wps-actions-pin-connect-description-title')),
});
(__VLS_ctx.t('wireless.pinConnectTitle'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    'data-testid': (__VLS_ctx.qa('wps-actions-pin-connect-description')),
});
(__VLS_ctx.t('wireless.wpsPinConnectDesc'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "pin-section" },
    'data-testid': (__VLS_ctx.qa('wps-actions-pin-connect-pin-section')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "pin-label" },
    'data-testid': (__VLS_ctx.qa('wps-actions-pin-connect-pin-label')),
});
(__VLS_ctx.t('wireless.pinCodeOfClient'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "pin-input" },
    'data-testid': (__VLS_ctx.qa('wps-actions-pin-connect-pin-input-container')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "text",
    'data-testid': (__VLS_ctx.qa('wps-actions-pin-connect-pin-input')),
    value: (__VLS_ctx.clientPin),
    placeholder: (__VLS_ctx.t('wireless.enterPin')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handlePinConnect) },
    ...{ class: "btn btn-primary" },
    'data-testid': (__VLS_ctx.qa('wps-actions-pin-connect-button')),
    disabled: (__VLS_ctx.loading || !__VLS_ctx.clientPin),
});
(__VLS_ctx.t('wireless.connect'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wps-section" },
    'data-testid': (__VLS_ctx.qa('wps-actions-generate-pin-section')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-title-sp" },
    'data-testid': (__VLS_ctx.qa('wps-actions-generate-pin-title')),
});
(__VLS_ctx.t('wireless.generatePinCode'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "action-section" },
    'data-testid': (__VLS_ctx.qa('wps-actions-generate-pin-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "description-title" },
    'data-testid': (__VLS_ctx.qa('wps-actions-generate-pin-description-title')),
});
(__VLS_ctx.t('wireless.devicePinTitle'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    'data-testid': (__VLS_ctx.qa('wps-actions-generate-pin-description')),
});
(__VLS_ctx.t('wireless.devicePinDesc'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "pin-section" },
    'data-testid': (__VLS_ctx.qa('wps-actions-generate-pin-pin-section')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "pin-label" },
    'data-testid': (__VLS_ctx.qa('wps-actions-generate-pin-pin-label')),
});
(__VLS_ctx.t('wireless.pinCode'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "pin-display" },
    'data-testid': (__VLS_ctx.qa('wps-actions-generate-pin-pin-display')),
});
(props.pinCode);
/** @type {[typeof ConfirmationDialog, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(ConfirmationDialog, new ConfirmationDialog({
    ...{ 'onConfirm': {} },
    ...{ 'onCancel': {} },
    dataTestid: (__VLS_ctx.qa('wps-actions-confirmation-dialog')),
    isOpen: (__VLS_ctx.showConfirmDialog),
    title: (__VLS_ctx.t('wireless.enableWpsConfirm')),
    message: (__VLS_ctx.t('wireless.enableWpsMessage')),
}));
const __VLS_1 = __VLS_0({
    ...{ 'onConfirm': {} },
    ...{ 'onCancel': {} },
    dataTestid: (__VLS_ctx.qa('wps-actions-confirmation-dialog')),
    isOpen: (__VLS_ctx.showConfirmDialog),
    title: (__VLS_ctx.t('wireless.enableWpsConfirm')),
    message: (__VLS_ctx.t('wireless.enableWpsMessage')),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onConfirm: (__VLS_ctx.confirmAction_execute)
};
const __VLS_7 = {
    onCancel: (__VLS_ctx.cancelConfirmation)
};
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['wps-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['wps-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title-sp']} */ ;
/** @type {__VLS_StyleScopedClasses['action-section']} */ ;
/** @type {__VLS_StyleScopedClasses['description-title']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['wps-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title-sp']} */ ;
/** @type {__VLS_StyleScopedClasses['action-section']} */ ;
/** @type {__VLS_StyleScopedClasses['description-title']} */ ;
/** @type {__VLS_StyleScopedClasses['pin-section']} */ ;
/** @type {__VLS_StyleScopedClasses['pin-label']} */ ;
/** @type {__VLS_StyleScopedClasses['pin-input']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['wps-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title-sp']} */ ;
/** @type {__VLS_StyleScopedClasses['action-section']} */ ;
/** @type {__VLS_StyleScopedClasses['description-title']} */ ;
/** @type {__VLS_StyleScopedClasses['pin-section']} */ ;
/** @type {__VLS_StyleScopedClasses['pin-label']} */ ;
/** @type {__VLS_StyleScopedClasses['pin-display']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ConfirmationDialog: ConfirmationDialog,
            qa: qa,
            t: t,
            clientPin: clientPin,
            loading: loading,
            showConfirmDialog: showConfirmDialog,
            handlePushButton: handlePushButton,
            handlePinConnect: handlePinConnect,
            confirmAction_execute: confirmAction_execute,
            cancelConfirmation: cancelConfirmation,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
