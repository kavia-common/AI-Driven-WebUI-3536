import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { restartDevice } from '../../../services/api/reset';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const router = useRouter();
const loading = ref(false);
const showCountdown = ref(false);
const countdown = ref(100);
const countdownTimer = ref(null);
const showSuccess = ref(false);
const handleRestart = async () => {
    if (!confirm(t('reset.restartConfirm')))
        return;
    loading.value = true;
    try {
        await restartDevice();
        showSuccess.value = true;
        setTimeout(() => {
            showSuccess.value = false;
        }, 3000);
        startCountdown();
    }
    catch (error) {
        console.error('Error restarting device:', error);
    }
    finally {
        loading.value = false;
    }
};
const startCountdown = () => {
    showCountdown.value = true;
    countdown.value = 100;
    if (countdownTimer.value) {
        clearInterval(countdownTimer.value);
    }
    countdownTimer.value = window.setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
            if (countdownTimer.value) {
                clearInterval(countdownTimer.value);
            }
            router.push('/login');
        }
    }, 1000);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['reboot-section']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
    'data-testid': (__VLS_ctx.qa('device-reboot-title')),
});
(__VLS_ctx.t('reset.restartTitle'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('device-reboot-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-section" },
    'data-testid': (__VLS_ctx.qa('device-reboot-section')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "reboot-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "description" },
    'data-testid': (__VLS_ctx.qa('device-reboot-description')),
});
(__VLS_ctx.t('reset.restartDescription'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleRestart) },
    ...{ class: "btn btn-primary" },
    'data-testid': (__VLS_ctx.qa('device-reboot-button')),
    disabled: (__VLS_ctx.loading || __VLS_ctx.showCountdown),
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
}
(__VLS_ctx.loading ? __VLS_ctx.t('diagnostics.processing') : __VLS_ctx.t('reset.restartButton'));
if (__VLS_ctx.showCountdown) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "countdown-overlay" },
        'data-testid': (__VLS_ctx.qa('device-reboot-countdown-overlay')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "countdown-content" },
        'data-testid': (__VLS_ctx.qa('device-reboot-countdown-content')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "spinner" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        'data-testid': (__VLS_ctx.qa('device-reboot-countdown-text')),
    });
    (__VLS_ctx.t('reset.countdown', { seconds: __VLS_ctx.countdown }));
}
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
        'data-testid': (__VLS_ctx.qa('device-reboot-success-message')),
    });
    (__VLS_ctx.t('reset.success'));
}
/** @type {__VLS_StyleScopedClasses['page-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['reboot-section']} */ ;
/** @type {__VLS_StyleScopedClasses['description']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['countdown-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['countdown-content']} */ ;
/** @type {__VLS_StyleScopedClasses['spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['success-message']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
            loading: loading,
            showCountdown: showCountdown,
            countdown: countdown,
            showSuccess: showSuccess,
            handleRestart: handleRestart,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
