import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQA } from '../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const props = defineProps();
const emit = defineEmits();
const countdown = ref(props.duration || 30);
const timer = ref(null);
const startCountdown = () => {
    countdown.value = props.duration || 30;
    timer.value = window.setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
            if (timer.value) {
                clearInterval(timer.value);
                timer.value = null;
            }
            emit('complete');
        }
    }, 1000);
};
const stopCountdown = () => {
    if (timer.value) {
        clearInterval(timer.value);
        timer.value = null;
    }
};
// Watch for visibility changes
watch(() => props.isVisible, (newValue) => {
    if (newValue) {
        startCountdown();
    }
    else {
        stopCountdown();
    }
});
onMounted(() => {
    if (props.isVisible) {
        startCountdown();
    }
});
onUnmounted(() => {
    stopCountdown();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['blocking-content']} */ ;
/** @type {__VLS_StyleScopedClasses['countdown']} */ ;
// CSS variable injection 
// CSS variable injection end 
if (__VLS_ctx.isVisible) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "blocking-overlay" },
        'data-testid': (__VLS_ctx.qa('blocking-overlay')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "blocking-content" },
        'data-testid': (__VLS_ctx.qa('blocking-overlay-content')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "spinner" },
        'data-testid': (__VLS_ctx.qa('blocking-overlay-spinner')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        'data-testid': (__VLS_ctx.qa('blocking-overlay-title')),
    });
    (__VLS_ctx.message || 'Applying WiFi Settings...');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        'data-testid': (__VLS_ctx.qa('blocking-overlay-description-1')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        'data-testid': (__VLS_ctx.qa('blocking-overlay-description-2')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "countdown" },
        'data-testid': (__VLS_ctx.qa('blocking-overlay-countdown')),
    });
    (__VLS_ctx.countdown);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "progress-bar" },
        'data-testid': (__VLS_ctx.qa('blocking-overlay-progress-bar')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "progress-fill" },
        'data-testid': (__VLS_ctx.qa('blocking-overlay-progress-fill')),
        ...{ style: ({ width: `${((__VLS_ctx.duration || 30) - __VLS_ctx.countdown) / (__VLS_ctx.duration || 30) * 100}%` }) },
    });
}
/** @type {__VLS_StyleScopedClasses['blocking-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['blocking-content']} */ ;
/** @type {__VLS_StyleScopedClasses['spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['countdown']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-fill']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            countdown: countdown,
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
