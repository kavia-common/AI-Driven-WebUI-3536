import { defineProps, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQA } from '../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const __VLS_props = defineProps();
const __VLS_emit = defineEmits();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "edit-view" },
    'data-testid': (__VLS_ctx.qa('ddns-form-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    'data-testid': (__VLS_ctx.qa('ddns-form-title')),
});
(__VLS_ctx.service.ID ? __VLS_ctx.t('ddns.editService') : __VLS_ctx.t('ddns.addService'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (...[$event]) => {
            __VLS_ctx.$emit('save');
        } },
    'data-testid': (__VLS_ctx.qa('ddns-form')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('ddns-form-provider-label')),
});
(__VLS_ctx.t('ddns.provider'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.$emit('update:service', { ...__VLS_ctx.service, ServProv: $event.target.value });
        } },
    'data-testid': (__VLS_ctx.qa('ddns-form-provider-select')),
    value: (__VLS_ctx.service.ServProv),
});
for (const [provider] of __VLS_getVForSourceType((__VLS_ctx.supportedProviders))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (provider),
        value: (provider),
        'data-testid': (__VLS_ctx.qa(`ddns-form-provider-option-${__VLS_ctx.slug(provider)}`)),
    });
    (provider);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('ddns-form-domain-label')),
});
(__VLS_ctx.t('ddns.domain'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.$emit('update:service', { ...__VLS_ctx.service, DomainName: $event.target.value });
        } },
    type: "text",
    'data-testid': (__VLS_ctx.qa('ddns-form-domain-input')),
    value: (__VLS_ctx.service.DomainName),
    required: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('ddns-form-username-label')),
});
(__VLS_ctx.t('ddns.username'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.$emit('update:service', { ...__VLS_ctx.service, ServUsername: $event.target.value });
        } },
    type: "text",
    'data-testid': (__VLS_ctx.qa('ddns-form-username-input')),
    value: (__VLS_ctx.service.ServUsername),
    required: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('ddns-form-password-label')),
});
(__VLS_ctx.t('ddns.password'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.$emit('update:service', { ...__VLS_ctx.service, ServPassword: $event.target.value });
        } },
    type: "password",
    'data-testid': (__VLS_ctx.qa('ddns-form-password-input')),
    value: (__VLS_ctx.service.ServPassword),
    required: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('ddns-form-interface-label')),
});
(__VLS_ctx.t('ddns.wanInterface'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.$emit('update:service', { ...__VLS_ctx.service, UpdatedIP: $event.target.value });
        } },
    'data-testid': (__VLS_ctx.qa('ddns-form-interface-select')),
    value: (__VLS_ctx.service.UpdatedIP),
});
for (const [iface] of __VLS_getVForSourceType((__VLS_ctx.interfaces))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (iface),
        value: (iface),
        'data-testid': (__VLS_ctx.qa(`ddns-form-interface-option-${__VLS_ctx.slug(iface)}`)),
    });
    (iface);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "switch-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    'data-testid': (__VLS_ctx.qa('ddns-form-enable-label')),
});
(__VLS_ctx.t('common.enable'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "switch" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.$emit('update:service', { ...__VLS_ctx.service, HostEnable: $event.target.checked ? 1 : 0 });
        } },
    type: "checkbox",
    'data-testid': (__VLS_ctx.qa('ddns-form-enable-toggle')),
    checked: (__VLS_ctx.service.HostEnable === 1),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "slider" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "button-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('cancel');
        } },
    type: "button",
    ...{ class: "btn btn-secondary" },
    'data-testid': (__VLS_ctx.qa('ddns-form-cancel-button')),
});
(__VLS_ctx.t('ddns.cancel'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    ...{ class: "btn btn-primary" },
    'data-testid': (__VLS_ctx.qa('ddns-form-save-button')),
});
(__VLS_ctx.t('ddns.save'));
/** @type {__VLS_StyleScopedClasses['edit-view']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            slug: slug,
            t: t,
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
