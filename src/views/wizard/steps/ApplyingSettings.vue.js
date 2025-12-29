import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import iconUpdatingImage from '../../../assets/icons/wizard/ico_updating.svg';
const props = defineProps();
const emit = defineEmits(['complete']);
const { t } = useI18n();
const remainingTime = ref(props.etaSeconds);
let timer = null;
const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
onMounted(() => {
    timer = window.setInterval(() => {
        remainingTime.value--;
        if (remainingTime.value <= 0) {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
            emit('complete');
        }
    }, 1000);
});
onUnmounted(() => {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['gear']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "applying-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "applying-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "loading-icon" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.object, __VLS_intrinsicElements.object)({
    data: (__VLS_ctx.iconUpdatingImage),
    type: "image/svg+xml",
    ...{ class: "mode-image" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "countdown" },
});
(__VLS_ctx.formatTime(__VLS_ctx.remainingTime));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
(__VLS_ctx.t('wizard.applyingTitle'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "message" },
});
(__VLS_ctx.t('wizard.applyingMessage'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "warning" },
});
(__VLS_ctx.t('wizard.applyingWarning'));
/** @type {__VLS_StyleScopedClasses['applying-container']} */ ;
/** @type {__VLS_StyleScopedClasses['applying-card']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['mode-image']} */ ;
/** @type {__VLS_StyleScopedClasses['countdown']} */ ;
/** @type {__VLS_StyleScopedClasses['message']} */ ;
/** @type {__VLS_StyleScopedClasses['warning']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            iconUpdatingImage: iconUpdatingImage,
            t: t,
            remainingTime: remainingTime,
            formatTime: formatTime,
        };
    },
    emits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
