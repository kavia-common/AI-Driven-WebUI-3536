import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const props = defineProps();
const emit = defineEmits();
const editingController = ref({ ...props.controller });
const protocolVersions = ['3.1', '3.1.1', '5'];
const transportProtocols = ['TCP/IP', 'TLS', 'WebSocket', 'WebSocketTLS'];
const handleSubmit = () => {
    emit('save', editingController.value);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['controller-edit']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "controller-edit" },
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-title')),
});
(__VLS_ctx.controller.Alias ? __VLS_ctx.t('device.editController') : __VLS_ctx.t('device.addController'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.handleSubmit) },
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-form')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "switch-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-enable-label')),
});
(__VLS_ctx.t('common.enable'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "switch" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    type: "checkbox",
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-enable-toggle')),
    'true-value': (1),
    'false-value': (0),
});
(__VLS_ctx.editingController.Enable);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "slider" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-alias-label')),
});
(__VLS_ctx.t('device.alias'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "text",
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-alias-input')),
    value: (__VLS_ctx.editingController.Alias),
    required: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-endpoint-id-label')),
});
(__VLS_ctx.t('device.endpointId'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "text",
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-endpoint-id-input')),
    value: (__VLS_ctx.editingController.ControllerEndpointID),
    required: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-controller-topic-label')),
});
(__VLS_ctx.t('device.controllerTopic'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "text",
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-controller-topic-input')),
    value: (__VLS_ctx.editingController.ControllerTopic),
    required: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-agent-topic-label')),
});
(__VLS_ctx.t('device.agentTopic'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "text",
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-agent-topic-input')),
    value: (__VLS_ctx.editingController.AgentTopic),
    required: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-broker-address-label')),
});
(__VLS_ctx.t('device.brokerAddress'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "text",
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-broker-address-input')),
    value: (__VLS_ctx.editingController.BrokerAddress),
    required: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-broker-port-label')),
});
(__VLS_ctx.t('device.brokerPort'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "text",
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-broker-port-input')),
    value: (__VLS_ctx.editingController.BrokerPort),
    required: true,
    pattern: "[0-9]+",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-username-label')),
});
(__VLS_ctx.t('device.username'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "text",
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-username-input')),
    value: (__VLS_ctx.editingController.Username),
    required: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-password-label')),
});
(__VLS_ctx.t('device.password'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "password",
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-password-input')),
});
(__VLS_ctx.editingController.Password);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-client-id-label')),
});
(__VLS_ctx.t('device.clientId'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "text",
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-client-id-input')),
    value: (__VLS_ctx.editingController.ClientID),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-periodic-notify-label')),
});
(__VLS_ctx.t('device.periodicNotify'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "number",
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-periodic-notify-input')),
    required: true,
    min: "1",
});
(__VLS_ctx.editingController.PeriodicNotify);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-keep-alive-time-label')),
});
(__VLS_ctx.t('device.keepAliveTime'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "number",
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-keep-alive-time-input')),
    required: true,
    min: "1",
});
(__VLS_ctx.editingController.KeepAliveTime);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-connect-retry-time-label')),
});
(__VLS_ctx.t('device.connectRetryTime'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "number",
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-connect-retry-time-input')),
    required: true,
    min: "1",
});
(__VLS_ctx.editingController.ConnectRetryTime);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-connect-retry-max-interval-label')),
});
(__VLS_ctx.t('device.connectRetryMaxInterval'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "number",
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-connect-retry-max-interval-input')),
    required: true,
    min: "1",
});
(__VLS_ctx.editingController.ConnectRetryMaxInterval);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-protocol-version-label')),
});
(__VLS_ctx.t('device.protocolVersion'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.editingController.ProtocolVersion),
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-protocol-version-select')),
});
for (const [version] of __VLS_getVForSourceType((__VLS_ctx.protocolVersions))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (version),
        value: (version),
        'data-testid': (__VLS_ctx.qa(`tr369-controller-edit-protocol-version-option-${version}`)),
    });
    (version);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-transport-protocol-label')),
});
(__VLS_ctx.t('device.transportProtocol'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.editingController.TransportProtocol),
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-transport-protocol-select')),
});
for (const [protocol] of __VLS_getVForSourceType((__VLS_ctx.transportProtocols))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (protocol),
        value: (protocol),
        'data-testid': (__VLS_ctx.qa(`tr369-controller-edit-transport-protocol-option-${__VLS_ctx.slug(protocol)}`)),
    });
    (protocol);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "button-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('cancel');
        } },
    type: "button",
    ...{ class: "btn btn-secondary" },
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-cancel-button')),
});
(__VLS_ctx.t('common.cancel'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    ...{ class: "btn btn-primary" },
    'data-testid': (__VLS_ctx.qa('tr369-controller-edit-save-button')),
});
(__VLS_ctx.t('common.save'));
/** @type {__VLS_StyleScopedClasses['controller-edit']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
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
            editingController: editingController,
            protocolVersions: protocolVersions,
            transportProtocols: transportProtocols,
            handleSubmit: handleSubmit,
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
