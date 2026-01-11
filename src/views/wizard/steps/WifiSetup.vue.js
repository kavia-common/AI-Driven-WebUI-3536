import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
const props = defineProps();
const __VLS_emit = defineEmits(['next', 'prev']);
const { t } = useI18n();
const showPassword = ref(false);
const savedBandPasswords = ref({
    '2g': '',
    '5g': '',
    '6g': ''
});
const commonSecurityOptions = computed(() => {
    if (props.config.wifi.common.securityOptions.length > 0) {
        return props.config.wifi.common.securityOptions.map(opt => ({ value: opt, label: opt }));
    }
    return [
        { value: 'WPA3-Personal', label: 'WPA3-Personal' },
        { value: 'WPA2-Personal', label: 'WPA2-Personal' },
        { value: 'WPA2/WPA3-Personal', label: 'WPA2/WPA3-Personal' }
    ];
});
const band2gSecurityOptions = computed(() => {
    if (props.config.wifi.bands['2g'].securityOptions.length > 0) {
        return props.config.wifi.bands['2g'].securityOptions.map(opt => ({ value: opt, label: opt }));
    }
    return commonSecurityOptions.value;
});
const band5gSecurityOptions = computed(() => {
    if (props.config.wifi.bands['5g'].securityOptions.length > 0) {
        return props.config.wifi.bands['5g'].securityOptions.map(opt => ({ value: opt, label: opt }));
    }
    return commonSecurityOptions.value;
});
const band6gSecurityOptions = computed(() => {
    if (props.config.wifi.bands['6g'].securityOptions.length > 0) {
        return props.config.wifi.bands['6g'].securityOptions.map(opt => ({ value: opt, label: opt }));
    }
    return commonSecurityOptions.value;
});
watch(() => props.config.wifi.smartConnect, (isEnabled) => {
    if (isEnabled) {
        savedBandPasswords.value['2g'] = props.config.wifi.bands['2g'].password;
        savedBandPasswords.value['5g'] = props.config.wifi.bands['5g'].password;
        savedBandPasswords.value['6g'] = props.config.wifi.bands['6g'].password;
        props.config.wifi.bands['2g'].ssid = props.config.wifi.common.ssid;
        props.config.wifi.bands['5g'].ssid = props.config.wifi.common.ssid;
        props.config.wifi.bands['6g'].ssid = props.config.wifi.common.ssid;
        props.config.wifi.bands['2g'].security = props.config.wifi.common.security;
        props.config.wifi.bands['5g'].security = props.config.wifi.common.security;
        props.config.wifi.bands['6g'].security = props.config.wifi.common.security;
        props.config.wifi.bands['2g'].password = savedBandPasswords.value['2g'];
        props.config.wifi.bands['5g'].password = savedBandPasswords.value['5g'];
        props.config.wifi.bands['6g'].password = savedBandPasswords.value['6g'];
    }
    else {
        props.config.wifi.mloEnable = false;
        if (savedBandPasswords.value['2g']) {
            props.config.wifi.bands['2g'].password = savedBandPasswords.value['2g'];
        }
        if (savedBandPasswords.value['5g']) {
            props.config.wifi.bands['5g'].password = savedBandPasswords.value['5g'];
        }
        if (savedBandPasswords.value['6g']) {
            props.config.wifi.bands['6g'].password = savedBandPasswords.value['6g'];
        }
    }
});
watch(() => props.config.wifi.common.ssid, (newSsid) => {
    if (props.config.wifi.smartConnect) {
        props.config.wifi.bands['2g'].ssid = newSsid;
        props.config.wifi.bands['5g'].ssid = newSsid;
        props.config.wifi.bands['6g'].ssid = newSsid;
    }
});
watch(() => props.config.wifi.common.security, (newSecurity) => {
    if (props.config.wifi.smartConnect) {
        props.config.wifi.bands['2g'].security = newSecurity;
        props.config.wifi.bands['5g'].security = newSecurity;
        props.config.wifi.bands['6g'].security = newSecurity;
    }
});
watch(() => props.config.wifi.bands['2g'].enabled, (enabled) => {
    if (!enabled && props.config.wifi.bands['2g'].password) {
        savedBandPasswords.value['2g'] = props.config.wifi.bands['2g'].password;
    }
    else if (enabled && savedBandPasswords.value['2g']) {
        props.config.wifi.bands['2g'].password = savedBandPasswords.value['2g'];
    }
});
watch(() => props.config.wifi.bands['5g'].enabled, (enabled) => {
    if (!enabled && props.config.wifi.bands['5g'].password) {
        savedBandPasswords.value['5g'] = props.config.wifi.bands['5g'].password;
    }
    else if (enabled && savedBandPasswords.value['5g']) {
        props.config.wifi.bands['5g'].password = savedBandPasswords.value['5g'];
    }
});
watch(() => props.config.wifi.bands['6g'].enabled, (enabled) => {
    if (!enabled && props.config.wifi.bands['6g'].password) {
        savedBandPasswords.value['6g'] = props.config.wifi.bands['6g'].password;
    }
    else if (enabled && savedBandPasswords.value['6g']) {
        props.config.wifi.bands['6g'].password = savedBandPasswords.value['6g'];
    }
});
const showWpa3Warning = computed(() => {
    return props.config.wifi.smartConnect &&
        props.config.wifi.common.security &&
        (props.config.wifi.common.security.indexOf('WPA2') !== -1);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['progress-step']} */ ;
/** @type {__VLS_StyleScopedClasses['info-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['info-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['info-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-box']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-box']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-box']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['band-section']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "step-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "step-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "step-title" },
});
(__VLS_ctx.t('wizard.wifiTitle'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "step-subtitle" },
});
(__VLS_ctx.t('wizard.wifiSubtitle'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "progress-bar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "progress-step active" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "progress-step active" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "progress-step active" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "progress-step active" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "progress-step active" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "progress-step active" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "progress-step" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "progress-step" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "settings-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "toggle-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "toggle-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.t('wizard.smartConnect'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "tooltip-wrapper" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-icon" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "tooltip-box" },
});
(__VLS_ctx.t('wizard.smartConnectTooltip'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "toggle-switch" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "checkbox",
});
(__VLS_ctx.config.wifi.smartConnect);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "slider" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "toggle-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "toggle-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.t('wizard.mloNetwork'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "tooltip-wrapper" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-icon" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "tooltip-box" },
});
(__VLS_ctx.t('wizard.mloTooltip'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "toggle-switch" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "checkbox",
    disabled: (!__VLS_ctx.config.wifi.smartConnect),
});
(__VLS_ctx.config.wifi.mloEnable);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "slider" },
});
if (__VLS_ctx.config.wifi.smartConnect) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-container" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    (__VLS_ctx.t('wizard.ssid'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "required" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "text",
        value: (__VLS_ctx.config.wifi.common.ssid),
        placeholder: (__VLS_ctx.t('wizard.ssidPlaceholder')),
        ...{ class: "form-input" },
        required: true,
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    (__VLS_ctx.t('wizard.securityType'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "required" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        value: (__VLS_ctx.config.wifi.common.security),
        ...{ class: "form-select" },
    });
    for (const [option] of __VLS_getVForSourceType((__VLS_ctx.commonSecurityOptions))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
            key: (option.value),
            value: (option.value),
        });
        (option.label);
    }
    if (__VLS_ctx.showWpa3Warning) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "warning-text" },
        });
        (__VLS_ctx.t('wizard.wpa3Warning'));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    (__VLS_ctx.t('wizard.passwordLabel'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "required" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "password-input" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: (__VLS_ctx.showPassword ? 'text' : 'password'),
        placeholder: (__VLS_ctx.t('wizard.passwordPlaceholderWifi')),
        ...{ class: "form-input" },
        minlength: "8",
        maxlength: "63",
        required: true,
    });
    (__VLS_ctx.config.wifi.common.password);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.config.wifi.smartConnect))
                    return;
                __VLS_ctx.showPassword = !__VLS_ctx.showPassword;
            } },
        type: "button",
        ...{ class: "password-toggle" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    (__VLS_ctx.showPassword ? 'visibility_off' : 'visibility');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "help-text" },
    });
    (__VLS_ctx.t('wizard.passwordHelpText'));
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "bands-container" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "band-section" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (__VLS_ctx.t('wizard.band24ghz'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "band-toggle" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    (__VLS_ctx.t('wizard.enable24ghz'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "toggle-switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "checkbox",
    });
    (__VLS_ctx.config.wifi.bands['2g'].enabled);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    if (__VLS_ctx.config.wifi.bands['2g'].enabled) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "band-fields" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        (__VLS_ctx.t('wizard.ssid'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "text",
            value: (__VLS_ctx.config.wifi.bands['2g'].ssid),
            ...{ class: "form-input" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        (__VLS_ctx.t('wizard.securityType'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
            value: (__VLS_ctx.config.wifi.bands['2g'].security),
            ...{ class: "form-select" },
        });
        for (const [option] of __VLS_getVForSourceType((__VLS_ctx.band2gSecurityOptions))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
                key: (option.value),
                value: (option.value),
            });
            (option.label);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        (__VLS_ctx.t('wizard.passwordLabel'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "password",
            ...{ class: "form-input" },
            placeholder: (__VLS_ctx.t('wizard.passwordPlaceholderShort')),
        });
        (__VLS_ctx.config.wifi.bands['2g'].password);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "band-section" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (__VLS_ctx.t('wizard.band5ghz'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "band-toggle" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    (__VLS_ctx.t('wizard.enable5ghz'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "toggle-switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "checkbox",
    });
    (__VLS_ctx.config.wifi.bands['5g'].enabled);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    if (__VLS_ctx.config.wifi.bands['5g'].enabled) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "band-fields" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        (__VLS_ctx.t('wizard.ssid'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "text",
            value: (__VLS_ctx.config.wifi.bands['5g'].ssid),
            ...{ class: "form-input" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        (__VLS_ctx.t('wizard.securityType'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
            value: (__VLS_ctx.config.wifi.bands['5g'].security),
            ...{ class: "form-select" },
        });
        for (const [option] of __VLS_getVForSourceType((__VLS_ctx.band5gSecurityOptions))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
                key: (option.value),
                value: (option.value),
            });
            (option.label);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        (__VLS_ctx.t('wizard.passwordLabel'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "password",
            ...{ class: "form-input" },
            placeholder: (__VLS_ctx.t('wizard.passwordPlaceholderShort')),
        });
        (__VLS_ctx.config.wifi.bands['5g'].password);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "band-section" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (__VLS_ctx.t('wizard.band6ghz'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "band-toggle" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    (__VLS_ctx.t('wizard.enable6ghz'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "toggle-switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "checkbox",
    });
    (__VLS_ctx.config.wifi.bands['6g'].enabled);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    if (__VLS_ctx.config.wifi.bands['6g'].enabled) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "band-fields" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        (__VLS_ctx.t('wizard.ssid'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "text",
            value: (__VLS_ctx.config.wifi.bands['6g'].ssid),
            ...{ class: "form-input" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        (__VLS_ctx.t('wizard.securityType'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
            value: (__VLS_ctx.config.wifi.bands['6g'].security),
            ...{ class: "form-select" },
        });
        for (const [option] of __VLS_getVForSourceType((__VLS_ctx.band6gSecurityOptions))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
                key: (option.value),
                value: (option.value),
            });
            (option.label);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        (__VLS_ctx.t('wizard.passwordLabel'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "password",
            ...{ class: "form-input" },
            placeholder: (__VLS_ctx.t('wizard.passwordPlaceholderShort')),
        });
        (__VLS_ctx.config.wifi.bands['6g'].password);
    }
}
if (!__VLS_ctx.config.wifi.smartConnect) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "settings-section" },
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "toggle-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "toggle-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('wizard.psc'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "tooltip-wrapper" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-icon" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "tooltip-box" },
    });
    (__VLS_ctx.t('wizard.pscTooltip'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "toggle-switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "checkbox",
    });
    (__VLS_ctx.config.wifi.psc);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "toggle-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "toggle-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('wizard.pmf'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "tooltip-wrapper" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-icon" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "tooltip-box" },
    });
    (__VLS_ctx.t('wizard.pmfTooltip'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "toggle-switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "checkbox",
    });
    (__VLS_ctx.config.wifi.pmf);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "button-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('prev');
        } },
    ...{ class: "btn-secondary" },
});
(__VLS_ctx.t('common.back'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('next');
        } },
    ...{ class: "btn-primary" },
});
(__VLS_ctx.t('common.next'));
/** @type {__VLS_StyleScopedClasses['step-container']} */ ;
/** @type {__VLS_StyleScopedClasses['step-card']} */ ;
/** @type {__VLS_StyleScopedClasses['step-title']} */ ;
/** @type {__VLS_StyleScopedClasses['step-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-step']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-step']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-step']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-step']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-step']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-step']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-step']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-step']} */ ;
/** @type {__VLS_StyleScopedClasses['settings-section']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-row']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-label']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['info-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-box']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-row']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-label']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['info-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-box']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-container']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['required']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['required']} */ ;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['warning-text']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['required']} */ ;
/** @type {__VLS_StyleScopedClasses['password-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['password-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['help-text']} */ ;
/** @type {__VLS_StyleScopedClasses['bands-container']} */ ;
/** @type {__VLS_StyleScopedClasses['band-section']} */ ;
/** @type {__VLS_StyleScopedClasses['band-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['band-fields']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-row']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['band-section']} */ ;
/** @type {__VLS_StyleScopedClasses['band-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['band-fields']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-row']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['band-section']} */ ;
/** @type {__VLS_StyleScopedClasses['band-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['band-fields']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-row']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['settings-section']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-row']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-label']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['info-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-box']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-row']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-label']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['info-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-box']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['button-container']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            t: t,
            showPassword: showPassword,
            commonSecurityOptions: commonSecurityOptions,
            band2gSecurityOptions: band2gSecurityOptions,
            band5gSecurityOptions: band5gSecurityOptions,
            band6gSecurityOptions: band6gSecurityOptions,
            showWpa3Warning: showWpa3Warning,
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
