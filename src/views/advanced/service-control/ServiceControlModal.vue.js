import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
const { t } = useI18n();
const props = defineProps();
const emit = defineEmits();
const editingRule = ref({
    ...props.rule,
    // 兼容舊資料：若沒有 InterfaceOriginal 就用目前的 Interface
    InterfaceOriginal: props.rule.InterfaceOriginal ?? props.rule.Interface,
});
const selectedPredefinedService = ref('');
const showSourceIPRange = ref(false);
// Enhanced protocol options that include combined protocols
const enhancedProtocolOptions = computed(() => {
    const baseProtocols = [...props.options.Protocols];
    // Add combined protocol options
    const combinedProtocols = [
        { value: "17,6", label: "UDP/TCP" },
        { value: "6,17", label: "TCP/UDP" },
        { value: "1,58", label: "ICMP (v4/v6)" },
        { value: "2", label: "IGMP" }
    ];
    // Only add combined protocols if they don't already exist
    combinedProtocols.forEach(combined => {
        if (!baseProtocols.find(p => p.value === combined.value)) {
            baseProtocols.push(combined);
        }
    });
    return baseProtocols;
});
// Enhanced IP version options
const enhancedIPVersionOptions = computed(() => {
    const baseOptions = [...props.options.IPVersions];
    // Add special IP version options if they don't exist
    const specialOptions = [
        { value: "0", label: "Both IPv4 & IPv6" }
    ];
    specialOptions.forEach(special => {
        if (!baseOptions.find(o => o.value === special.value)) {
            baseOptions.push(special);
        }
    });
    return baseOptions;
});
// Watch for changes in the predefined service selection
watch(selectedPredefinedService, (newValue) => {
    if (newValue) {
        const service = props.options.Services.find(s => s.value === newValue);
        if (service) {
            editingRule.value.Service = service.value;
            editingRule.value.DestPort = service.port;
            editingRule.value.Protocol = service.protocol;
        }
    }
});
// Initialize source IP range visibility
watch(() => editingRule.value, (newValue) => {
    showSourceIPRange.value = !!(newValue.SourceIPStart || newValue.SourceIPEnd);
}, { immediate: true });
// Handle form submission
const handleSubmit = () => {
    // Validate form
    if (!editingRule.value.Service) {
        alert('Service name is required');
        return;
    }
    if (!editingRule.value.DestPort && editingRule.value.Protocol !== '1' && editingRule.value.Protocol !== '58') {
        alert('Destination port is required for this protocol');
        return;
    }
    // If source IP range is not shown, remove those properties
    if (!showSourceIPRange.value) {
        delete editingRule.value.SourceIPStart;
        delete editingRule.value.SourceIPEnd;
    }
    // 送出時也保險補一次，避免在某些流程中被移除
    emit('save', {
        ...editingRule.value,
        InterfaceOriginal: editingRule.value.InterfaceOriginal ?? editingRule.value.Interface,
    });
};
// Toggle source IP range visibility
const toggleSourceIPRange = () => {
    showSourceIPRange.value = !showSourceIPRange.value;
    if (!showSourceIPRange.value) {
        editingRule.value.SourceIPStart = undefined;
        editingRule.value.SourceIPEnd = undefined;
    }
};
// Check if the protocol is ICMP (doesn't need port)
const isICMPProtocol = (protocol) => {
    return protocol === '1' || protocol === '58';
};
// Watch for protocol changes to handle ICMP special case
watch(() => editingRule.value.Protocol, (newProtocol) => {
    if (isICMPProtocol(newProtocol)) {
        editingRule.value.DestPort = '-1';
    }
    else if (editingRule.value.DestPort === '-1') {
        editingRule.value.DestPort = '';
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['ip-range-container']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "modal-overlay" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "modal-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "modal-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
(__VLS_ctx.editingRule.Service ? __VLS_ctx.t('serviceControl.editRule') : __VLS_ctx.t('serviceControl.addRule'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('cancel');
        } },
    ...{ class: "close-button" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "modal-body" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.handleSubmit) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "switch-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.t('common.enable'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "switch" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    type: "checkbox",
});
(__VLS_ctx.editingRule.Enable);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "slider" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
(__VLS_ctx.t('serviceControl.serviceType'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.selectedPredefinedService),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "",
});
for (const [service] of __VLS_getVForSourceType((__VLS_ctx.options.Services))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (service.value),
        value: (service.value),
    });
    (service.value);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
(__VLS_ctx.t('serviceControl.serviceType'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "text",
    value: (__VLS_ctx.editingRule.Service),
    required: true,
    disabled: (!!__VLS_ctx.selectedPredefinedService),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
(__VLS_ctx.t('serviceControl.protocol'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.editingRule.Protocol),
    required: true,
});
for (const [protocol] of __VLS_getVForSourceType((__VLS_ctx.enhancedProtocolOptions))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (protocol.value),
        value: (protocol.value),
    });
    (protocol.label);
}
if (!__VLS_ctx.isICMPProtocol(__VLS_ctx.editingRule.Protocol)) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    (__VLS_ctx.t('ssh.port'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "text",
        value: (__VLS_ctx.editingRule.DestPort),
        required: true,
        placeholder: "e.g., 80 or 80-90",
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
(__VLS_ctx.t('serviceControl.accessDirection'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.editingRule.Interface),
    required: true,
});
for (const [iface] of __VLS_getVForSourceType((__VLS_ctx.options.Interfaces))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (iface.value),
        value: (iface.value),
    });
    (iface.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
(__VLS_ctx.t('serviceControl.ipRange'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.editingRule.IPVersion),
    required: true,
});
for (const [ipVersion] of __VLS_getVForSourceType((__VLS_ctx.enhancedIPVersionOptions))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (ipVersion.value),
        value: (Number(ipVersion.value)),
    });
    (ipVersion.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "switch-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "switch" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    ...{ onChange: (__VLS_ctx.toggleSourceIPRange) },
    type: "checkbox",
    checked: (__VLS_ctx.showSourceIPRange),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "slider" },
});
if (__VLS_ctx.showSourceIPRange) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "ip-range-container" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "text",
        value: (__VLS_ctx.editingRule.SourceIPStart),
        placeholder: "e.g., 192.168.1.1",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "text",
        value: (__VLS_ctx.editingRule.SourceIPEnd),
        placeholder: "e.g., 192.168.1.255",
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
(__VLS_ctx.t('serviceControl.action'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.editingRule.Action),
    required: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "Accept",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "Drop",
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
});
(__VLS_ctx.t('common.cancel'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    ...{ class: "btn btn-primary" },
});
(__VLS_ctx.t('common.confirm'));
/** @type {__VLS_StyleScopedClasses['modal-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-content']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
/** @type {__VLS_StyleScopedClasses['close-button']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-body']} */ ;
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
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['ip-range-container']} */ ;
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
            t: t,
            editingRule: editingRule,
            selectedPredefinedService: selectedPredefinedService,
            showSourceIPRange: showSourceIPRange,
            enhancedProtocolOptions: enhancedProtocolOptions,
            enhancedIPVersionOptions: enhancedIPVersionOptions,
            handleSubmit: handleSubmit,
            toggleSourceIPRange: toggleSourceIPRange,
            isICMPProtocol: isICMPProtocol,
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
