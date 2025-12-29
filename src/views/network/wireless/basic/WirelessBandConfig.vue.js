import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQA } from '../../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const props = defineProps();
const emit = defineEmits();
const showPassword = ref(false);
const securityModes = computed(() => (props.modelValue.SecurityModeAvailable ?? '').split(','));
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
/** @type {__VLS_StyleScopedClasses['password-input']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-password']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-password']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['band-header']} */ ;
/** @type {__VLS_StyleScopedClasses['band-content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "band-config" },
    'data-testid': (__VLS_ctx.qa(`wireless-band-config-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "band-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-title-sp" },
    'data-testid': (__VLS_ctx.qa(`wireless-band-config-title-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
});
(__VLS_ctx.title);
(__VLS_ctx.t('wireless.settings'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "band-content" },
    'data-testid': (__VLS_ctx.qa(`wireless-band-config-content-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
});
if (__VLS_ctx.title !== 'MLO') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "switch-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        'data-testid': (__VLS_ctx.qa(`wireless-band-config-enable-label-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
    });
    (__VLS_ctx.t('common.enable'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        ...{ onChange: (...[$event]) => {
                if (!(__VLS_ctx.title !== 'MLO'))
                    return;
                __VLS_ctx.updateConfig('Enable', $event.target.checked ? 1 : 0);
            } },
        type: "checkbox",
        'data-testid': (__VLS_ctx.qa(`wireless-band-config-enable-toggle-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
        checked: (__VLS_ctx.modelValue.Enable === 1),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa(`wireless-band-config-ssid-label-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
});
(__VLS_ctx.t('wireless.ssid'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.updateConfig('SSID', $event.target.value);
        } },
    type: "text",
    'data-testid': (__VLS_ctx.qa(`wireless-band-config-ssid-input-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
    value: (__VLS_ctx.modelValue.SSID),
    disabled: (__VLS_ctx.title !== 'MLO' && __VLS_ctx.modelValue.Enable === 0),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa(`wireless-band-config-authentication-label-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
});
(__VLS_ctx.t('wireless.authentication'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.updateConfig('SecurityMode', $event.target.value);
        } },
    'data-testid': (__VLS_ctx.qa(`wireless-band-config-authentication-select-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
    value: (__VLS_ctx.modelValue.SecurityMode),
    disabled: (__VLS_ctx.title !== 'MLO' && __VLS_ctx.modelValue.Enable === 0),
});
for (const [mode] of __VLS_getVForSourceType((__VLS_ctx.securityModes))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (mode),
        value: (mode),
        'data-testid': (__VLS_ctx.qa(`wireless-band-config-authentication-option-${__VLS_ctx.slug(__VLS_ctx.title)}-${__VLS_ctx.slug(mode)}`)),
    });
    (mode);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa(`wireless-band-config-password-label-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
});
(__VLS_ctx.t('wireless.password'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "password-input" },
    'data-testid': (__VLS_ctx.qa(`wireless-band-config-password-container-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.updateConfig('Password', $event.target.value);
        } },
    type: (__VLS_ctx.showPassword ? 'text' : 'password'),
    'data-testid': (__VLS_ctx.qa(`wireless-band-config-password-input-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
    value: (__VLS_ctx.modelValue.Password),
    disabled: (__VLS_ctx.title !== 'MLO' && __VLS_ctx.modelValue.Enable === 0),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.showPassword = !__VLS_ctx.showPassword;
        } },
    type: "button",
    ...{ class: "toggle-password" },
    'data-testid': (__VLS_ctx.qa(`wireless-band-config-password-toggle-${__VLS_ctx.slug(__VLS_ctx.title)}`)),
    disabled: (__VLS_ctx.title !== 'MLO' && __VLS_ctx.modelValue.Enable === 0),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "material-icons" },
});
(__VLS_ctx.showPassword ? 'visibility_off' : 'visibility');
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
/** @type {__VLS_StyleScopedClasses['password-input']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-password']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            slug: slug,
            t: t,
            showPassword: showPassword,
            securityModes: securityModes,
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
