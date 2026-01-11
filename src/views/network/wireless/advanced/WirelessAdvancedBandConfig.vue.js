import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQA } from '../../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const props = defineProps();
const emit = defineEmits();
const modes = computed(() => props.modelValue.ModeList?.split(',') || []);
const bandwidths = computed(() => props.modelValue.ChannelBandwidthList?.split(',') || []);
const channels = computed(() => props.modelValue.ChannelList?.split(',').map(Number) || []);
const updateConfig = (field, value) => {
    emit('update:modelValue', {
        ...props.modelValue,
        [field]: value
    });
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['band-config']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['band-header']} */ ;
/** @type {__VLS_StyleScopedClasses['band-content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['channel-header']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "band-config" },
    'data-testid': (__VLS_ctx.qa(`wireless-advanced-band-config-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "band-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-title-sp" },
    'data-testid': (__VLS_ctx.qa(`wireless-advanced-band-config-title-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
});
(__VLS_ctx.title);
(__VLS_ctx.t('wireless.settings'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "band-content" },
    'data-testid': (__VLS_ctx.qa(`wireless-advanced-band-config-content-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "switch-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    'data-testid': (__VLS_ctx.qa(`wireless-advanced-band-config-enable-label-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
});
(__VLS_ctx.t('common.enable'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "switch" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.updateConfig('RadioEnable', $event.target.checked ? 1 : 0);
        } },
    type: "checkbox",
    'data-testid': (__VLS_ctx.qa(`wireless-advanced-band-config-enable-toggle-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
    checked: (__VLS_ctx.modelValue.RadioEnable === 1),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "slider" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa(`wireless-advanced-band-config-mode-label-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
});
(__VLS_ctx.t('wireless.mode'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.updateConfig('Mode', $event.target.value);
        } },
    'data-testid': (__VLS_ctx.qa(`wireless-advanced-band-config-mode-select-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
    value: (__VLS_ctx.modelValue.Mode),
    disabled: (__VLS_ctx.modelValue.RadioEnable === 0 || __VLS_ctx.mloEnabled),
});
for (const [mode] of __VLS_getVForSourceType((__VLS_ctx.modes))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (mode),
        value: (mode),
        'data-testid': (__VLS_ctx.qa(`wireless-advanced-band-config-mode-option-${__VLS_ctx.slug(__VLS_ctx.title)}-${__VLS_ctx.slug(mode)}`)),
    });
    (mode.toUpperCase());
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa(`wireless-advanced-band-config-bandwidth-label-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
});
(__VLS_ctx.t('wireless.bandwidth'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.updateConfig('ChannelBandwidth', $event.target.value);
        } },
    'data-testid': (__VLS_ctx.qa(`wireless-advanced-band-config-bandwidth-select-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
    value: (__VLS_ctx.modelValue.ChannelBandwidth),
    disabled: (__VLS_ctx.modelValue.RadioEnable === 0),
});
for (const [bandwidth] of __VLS_getVForSourceType((__VLS_ctx.bandwidths))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (bandwidth),
        value: (bandwidth),
        'data-testid': (__VLS_ctx.qa(`wireless-advanced-band-config-bandwidth-option-${__VLS_ctx.slug(__VLS_ctx.title)}-${__VLS_ctx.slug(bandwidth)}`)),
    });
    (bandwidth);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "channel-header" },
    'data-testid': (__VLS_ctx.qa(`wireless-advanced-band-config-channel-header-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa(`wireless-advanced-band-config-channel-label-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
});
(__VLS_ctx.t('wireless.channel'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "switch-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    'data-testid': (__VLS_ctx.qa(`wireless-advanced-band-config-auto-channel-label-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
});
(__VLS_ctx.t('wireless.autoChannel'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "switch" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.updateConfig('AutoChannelEnable', $event.target.checked ? 1 : 0);
        } },
    type: "checkbox",
    'data-testid': (__VLS_ctx.qa(`wireless-advanced-band-config-auto-channel-toggle-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
    checked: (__VLS_ctx.modelValue.AutoChannelEnable === 1),
    disabled: (__VLS_ctx.modelValue.RadioEnable === 0),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "slider" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.updateConfig('Channel', $event.target.value);
        } },
    'data-testid': (__VLS_ctx.qa(`wireless-advanced-band-config-channel-select-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
    value: (__VLS_ctx.modelValue.Channel),
    disabled: (__VLS_ctx.modelValue.RadioEnable === 0 || __VLS_ctx.modelValue.AutoChannelEnable === 1),
});
for (const [channel] of __VLS_getVForSourceType((__VLS_ctx.channels))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (channel),
        value: (channel),
        'data-testid': (__VLS_ctx.qa(`wireless-advanced-band-config-channel-option-${__VLS_ctx.slug(__VLS_ctx.title)}-${channel}`)),
    });
    (channel);
}
/** @type {__VLS_StyleScopedClasses['band-config']} */ ;
/** @type {__VLS_StyleScopedClasses['band-header']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title-sp']} */ ;
/** @type {__VLS_StyleScopedClasses['band-content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['channel-header']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            slug: slug,
            t: t,
            modes: modes,
            bandwidths: bandwidths,
            channels: channels,
            updateConfig: updateConfig,
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
