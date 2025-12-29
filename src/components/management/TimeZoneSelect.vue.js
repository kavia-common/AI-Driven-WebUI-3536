import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { getTimezones } from '../../services/api';
import { useQA } from '../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const props = defineProps();
const emit = defineEmits();
const timezones = ref([]);
const loading = ref(true);
const emitSelectedTimezone = () => {
    const idx = parseInt(props.modelValue, 10);
    if (!Number.isFinite(idx) || idx <= 0)
        return;
    const tz = timezones.value[idx - 1];
    if (tz)
        emit('timezone-change', tz);
};
const fetchTimezones = async () => {
    try {
        const response = await getTimezones();
        timezones.value = response.Timezone;
    }
    catch (error) {
        console.error('Error fetching timezones:', error);
    }
    finally {
        loading.value = false;
        emitSelectedTimezone();
    }
};
const handleChange = (event) => {
    const index = parseInt(event.target.value);
    const timezone = timezones.value[index - 1];
    emit('update:modelValue', index.toString());
    if (timezone)
        emit('timezone-change', timezone);
};
onMounted(() => {
    fetchTimezones();
});
// If parent updates modelValue (e.g. after calling NTP API), sync it too
watch(() => props.modelValue, () => {
    if (!loading.value)
        emitSelectedTimezone();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['time-zone-select']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    ...{ onChange: (__VLS_ctx.handleChange) },
    ...{ class: "time-zone-select" },
    'data-testid': (__VLS_ctx.qa('timezone-select')),
    value: (__VLS_ctx.modelValue),
    disabled: (__VLS_ctx.loading),
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "",
        'data-testid': (__VLS_ctx.qa('timezone-select-loading-option')),
    });
    (__VLS_ctx.t('common.loading'));
}
else {
    for (const [timezone, index] of __VLS_getVForSourceType((__VLS_ctx.timezones))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
            key: (index),
            value: (index + 1),
            'data-testid': (__VLS_ctx.qa(`timezone-select-option-${index}`)),
        });
        (timezone.region);
    }
}
/** @type {__VLS_StyleScopedClasses['time-zone-select']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
            timezones: timezones,
            loading: loading,
            handleChange: handleChange,
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
