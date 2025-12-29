import { defineProps, defineEmits, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQA } from '../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const props = defineProps();
const emit = defineEmits();
const autoDisableOptions = [
    { value: 0, label: 'Never disable' },
    { value: 300, label: '5 minutes' },
    { value: 600, label: '10 minutes' },
    { value: 1800, label: '30 minutes' },
    { value: 3600, label: '1 hour' }
];
const connectionTimeoutOptions = [
    { value: 0, label: 'Never timeout when idling' },
    { value: -1, label: 'Close connection when idling over' }
];
const keepAliveOptions = [
    { value: 0, label: 'Never send KeepAlive message' },
    { value: -1, label: 'Send KeepAlive message every' }
];
const selectedTimeoutOption = ref(props.server.IdleTimeout === 0 ? 0 : -1);
const customTimeoutValue = ref(props.server.IdleTimeout === 0 ? 10 : Math.min(60, Math.max(1, props.server.IdleTimeout / 60)));
const selectedKeepAliveOption = ref(props.server.KeepAlive === 0 ? 0 : -1);
const customKeepAliveValue = ref(props.server.KeepAlive === 0 ? 5 : Math.min(60, Math.max(1, props.server.KeepAlive / 60)));
const updateServer = (field, value) => {
    emit('update:server', { ...props.server, [field]: value });
};
const handleTimeoutChange = (event) => {
    const value = parseInt(event.target.value);
    selectedTimeoutOption.value = value;
    if (value === 0) {
        updateServer('IdleTimeout', 0);
    }
    else {
        // When selecting "Close connection when idling over", use the custom value
        updateServer('IdleTimeout', customTimeoutValue.value * 60);
    }
};
const handleCustomTimeoutChange = (event) => {
    const input = event.target;
    let value = parseInt(input.value);
    // Enforce range 1-60
    value = Math.min(60, Math.max(1, value));
    input.value = value.toString();
    customTimeoutValue.value = value;
    updateServer('IdleTimeout', value * 60);
};
const handleKeepAliveChange = (event) => {
    const value = parseInt(event.target.value);
    selectedKeepAliveOption.value = value;
    if (value === 0) {
        updateServer('KeepAlive', 0);
    }
    else {
        // When selecting "Send KeepAlive message every", use the custom value
        updateServer('KeepAlive', customKeepAliveValue.value * 60);
    }
};
const handleCustomKeepAliveChange = (event) => {
    const input = event.target;
    let value = parseInt(input.value);
    // Enforce range 1-60
    value = Math.min(60, Math.max(1, value));
    input.value = value.toString();
    customKeepAliveValue.value = value;
    updateServer('KeepAlive', value * 60);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-label']} */ ;
/** @type {__VLS_StyleScopedClasses['ssh-server-edit']} */ ;
/** @type {__VLS_StyleScopedClasses['form-section']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "ssh-server-edit" },
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-title')),
});
(__VLS_ctx.t('ssh.editServer'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (...[$event]) => {
            __VLS_ctx.$emit('save');
        } },
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-form')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-section" },
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-settings-section')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-interface-label')),
});
(__VLS_ctx.t('ssh.interface'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.updateServer('Interface', $event.target.value);
        } },
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-interface-select')),
    value: (__VLS_ctx.server.Interface),
});
for (const [iface] of __VLS_getVForSourceType((__VLS_ctx.interfaces))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (iface),
        value: (iface),
        'data-testid': (__VLS_ctx.qa(`ssh-server-edit-interface-option-${__VLS_ctx.slug(iface)}`)),
    });
    (iface);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-port-label')),
});
(__VLS_ctx.t('ssh.port'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.updateServer('Port', parseInt($event.target.value));
        } },
    type: "number",
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-port-input')),
    value: (__VLS_ctx.server.Port),
    min: "1",
    max: "65535",
    required: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "switch-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-enable-label')),
});
(__VLS_ctx.t('ssh.enable'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "switch" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.updateServer('Enable', $event.target.checked ? 1 : 0);
        } },
    type: "checkbox",
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-enable-toggle')),
    checked: (__VLS_ctx.server.Enable === 1),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "slider" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-section" },
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-connection-section')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-auto-disable-label')),
});
(__VLS_ctx.t('ssh.autoDisableServer'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.updateServer('AutoDisableDuration', parseInt($event.target.value));
        } },
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-auto-disable-select')),
    value: (__VLS_ctx.server.AutoDisableDuration),
});
for (const [option] of __VLS_getVForSourceType((__VLS_ctx.autoDisableOptions))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (option.value),
        value: (option.value),
        'data-testid': (__VLS_ctx.qa(`ssh-server-edit-auto-disable-option-${option.value}`)),
    });
    (option.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-connection-timeout-label')),
});
(__VLS_ctx.t('ssh.connectionTimeout'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    ...{ onChange: (__VLS_ctx.handleTimeoutChange) },
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-connection-timeout-select')),
    value: (__VLS_ctx.selectedTimeoutOption),
});
for (const [option] of __VLS_getVForSourceType((__VLS_ctx.connectionTimeoutOptions))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (option.value),
        value: (option.value),
        'data-testid': (__VLS_ctx.qa(`ssh-server-edit-connection-timeout-option-${option.value}`)),
    });
    (option.label);
}
if (__VLS_ctx.selectedTimeoutOption === -1) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "custom-input-wrapper" },
        'data-testid': (__VLS_ctx.qa('ssh-server-edit-connection-timeout-custom')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        ...{ onInput: (__VLS_ctx.handleCustomTimeoutChange) },
        type: "number",
        'data-testid': (__VLS_ctx.qa('ssh-server-edit-connection-timeout-custom-input')),
        value: (__VLS_ctx.customTimeoutValue),
        min: "1",
        max: "60",
        ...{ class: "custom-input" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "input-unit" },
        'data-testid': (__VLS_ctx.qa('ssh-server-edit-connection-timeout-custom-unit')),
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-keep-alive-label')),
});
(__VLS_ctx.t('ssh.keepAliveMessage'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    ...{ onChange: (__VLS_ctx.handleKeepAliveChange) },
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-keep-alive-select')),
    value: (__VLS_ctx.selectedKeepAliveOption),
});
for (const [option] of __VLS_getVForSourceType((__VLS_ctx.keepAliveOptions))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (option.value),
        value: (option.value),
        'data-testid': (__VLS_ctx.qa(`ssh-server-edit-keep-alive-option-${option.value}`)),
    });
    (option.label);
}
if (__VLS_ctx.selectedKeepAliveOption === -1) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "custom-input-wrapper" },
        'data-testid': (__VLS_ctx.qa('ssh-server-edit-keep-alive-custom')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        ...{ onInput: (__VLS_ctx.handleCustomKeepAliveChange) },
        type: "number",
        'data-testid': (__VLS_ctx.qa('ssh-server-edit-keep-alive-custom-input')),
        value: (__VLS_ctx.customKeepAliveValue),
        min: "1",
        max: "60",
        ...{ class: "custom-input" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "input-unit" },
        'data-testid': (__VLS_ctx.qa('ssh-server-edit-keep-alive-custom-unit')),
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "switch-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-allow-all-ipv4-label')),
});
(__VLS_ctx.t('ssh.allowAllIPv4'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "switch" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.updateServer('AllowAllIPv4', $event.target.checked ? 1 : 0);
        } },
    type: "checkbox",
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-allow-all-ipv4-toggle')),
    checked: (__VLS_ctx.server.AllowAllIPv4 === 1),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "slider" },
});
if (!__VLS_ctx.server.AllowAllIPv4) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('ssh-server-edit-ipv4-prefix-label')),
    });
    (__VLS_ctx.t('ssh.ipv4Prefix'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!(!__VLS_ctx.server.AllowAllIPv4))
                    return;
                __VLS_ctx.updateServer('IPv4AllowedSourcePrefix', $event.target.value);
            } },
        type: "text",
        'data-testid': (__VLS_ctx.qa('ssh-server-edit-ipv4-prefix-input')),
        value: (__VLS_ctx.server.IPv4AllowedSourcePrefix),
        placeholder: "e.g., 192.168.1.0/24",
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "switch-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-allow-all-ipv6-label')),
});
(__VLS_ctx.t('ssh.allowAllIPv6'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "switch" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.updateServer('AllowAllIPv6', $event.target.checked ? 1 : 0);
        } },
    type: "checkbox",
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-allow-all-ipv6-toggle')),
    checked: (__VLS_ctx.server.AllowAllIPv6 === 1),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "slider" },
});
if (!__VLS_ctx.server.AllowAllIPv6) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('ssh-server-edit-ipv6-prefix-label')),
    });
    (__VLS_ctx.t('ssh.ipv6Prefix'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!(!__VLS_ctx.server.AllowAllIPv6))
                    return;
                __VLS_ctx.updateServer('IPv6AllowedSourcePrefix', $event.target.value);
            } },
        type: "text",
        'data-testid': (__VLS_ctx.qa('ssh-server-edit-ipv6-prefix-input')),
        value: (__VLS_ctx.server.IPv6AllowedSourcePrefix),
        placeholder: "e.g., 2001:db8::/32",
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-section" },
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-auth-section')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "switch-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-allow-password-login-label')),
});
(__VLS_ctx.t('ssh.allowPasswordLogin'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "switch" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.updateServer('AllowPasswordLogin', $event.target.checked ? 1 : 0);
        } },
    type: "checkbox",
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-allow-password-login-toggle')),
    checked: (__VLS_ctx.server.AllowPasswordLogin === 1),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "slider" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "switch-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-allow-root-login-label')),
});
(__VLS_ctx.t('ssh.allowRootLogin'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "switch" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.updateServer('AllowRootLogin', $event.target.checked ? 1 : 0);
        } },
    type: "checkbox",
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-allow-root-login-toggle')),
    checked: (__VLS_ctx.server.AllowRootLogin === 1),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "slider" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "switch-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-root-password-login-label')),
});
(__VLS_ctx.t('ssh.rootLoginWithPassword'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "switch" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.updateServer('AllowRootPasswordLogin', $event.target.checked ? 1 : 0);
        } },
    type: "checkbox",
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-root-password-login-toggle')),
    checked: (__VLS_ctx.server.AllowRootPasswordLogin === 1),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "slider" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-max-auth-tries-label')),
});
(__VLS_ctx.t('ssh.maxAuthTries'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.updateServer('MaxAuthTries', parseInt($event.target.value));
        } },
    type: "number",
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-max-auth-tries-input')),
    value: (__VLS_ctx.server.MaxAuthTries),
    min: "1",
    max: "20",
    required: true,
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
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-cancel-button')),
});
(__VLS_ctx.t('common.cancel'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    ...{ class: "btn btn-primary" },
    'data-testid': (__VLS_ctx.qa('ssh-server-edit-save-button')),
});
(__VLS_ctx.t('common.save'));
/** @type {__VLS_StyleScopedClasses['ssh-server-edit']} */ ;
/** @type {__VLS_StyleScopedClasses['form-section']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-section']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-input-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-input']} */ ;
/** @type {__VLS_StyleScopedClasses['input-unit']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-input-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-input']} */ ;
/** @type {__VLS_StyleScopedClasses['input-unit']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-section']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
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
            autoDisableOptions: autoDisableOptions,
            connectionTimeoutOptions: connectionTimeoutOptions,
            keepAliveOptions: keepAliveOptions,
            selectedTimeoutOption: selectedTimeoutOption,
            customTimeoutValue: customTimeoutValue,
            selectedKeepAliveOption: selectedKeepAliveOption,
            customKeepAliveValue: customKeepAliveValue,
            updateServer: updateServer,
            handleTimeoutChange: handleTimeoutChange,
            handleCustomTimeoutChange: handleCustomTimeoutChange,
            handleKeepAliveChange: handleKeepAliveChange,
            handleCustomKeepAliveChange: handleCustomKeepAliveChange,
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
