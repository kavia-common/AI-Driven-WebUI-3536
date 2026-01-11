import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getTR069Config, updateTR069Config, sendInformToACS } from '../../../services/api/device';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const config = ref(null);
const loading = ref(false);
const error = ref(null);
const showPassword = ref({
    acs: false,
    connection: false
});
const fetchConfig = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await getTR069Config();
        config.value = response.ManagementServer;
    }
    catch (err) {
        console.error('Error fetching TR-069 config:', err);
        error.value = 'Failed to fetch TR-069 configuration';
    }
    finally {
        loading.value = false;
    }
};
const handleApply = async () => {
    if (!config.value)
        return;
    loading.value = true;
    error.value = null;
    try {
        const response = await updateTR069Config(config.value);
        if (response.ManagementServer === 'OK') {
            await fetchConfig();
        }
        else {
            throw new Error('Failed to update configuration');
        }
    }
    catch (err) {
        console.error('Error updating TR-069 config:', err);
        error.value = 'Failed to update TR-069 configuration';
    }
    finally {
        loading.value = false;
    }
};
const handleSendInform = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await sendInformToACS();
        if (!response.ManagementServer?.OK) {
            throw new Error('Failed to send inform message');
        }
    }
    catch (err) {
        console.error('Error sending inform:', err);
        error.value = 'Failed to send inform to ACS server';
    }
    finally {
        loading.value = false;
    }
};
onMounted(fetchConfig);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['credentials-section']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['password-input']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-password']} */ ;
/** @type {__VLS_StyleScopedClasses['tr069-config']} */ ;
/** @type {__VLS_StyleScopedClasses['credentials-section']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tr069-config" },
    'data-testid': (__VLS_ctx.qa('tr069-config-content')),
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('tr069-config-loading')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-spinner" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('common.loading'));
}
else if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-state" },
        'data-testid': (__VLS_ctx.qa('tr069-config-error')),
    });
    (__VLS_ctx.error);
}
else if (__VLS_ctx.config) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
        ...{ onSubmit: (__VLS_ctx.handleApply) },
        'data-testid': (__VLS_ctx.qa('tr069-config-form')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "switch-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        'data-testid': (__VLS_ctx.qa('tr069-config-enable-cwmp-label')),
    });
    (__VLS_ctx.t('device.enableCWMP'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "checkbox",
        'data-testid': (__VLS_ctx.qa('tr069-config-enable-cwmp-toggle')),
        'true-value': (1),
        'false-value': (0),
    });
    (__VLS_ctx.config.EnableCWMP);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('tr069-config-acs-url-label')),
    });
    (__VLS_ctx.t('device.acsUrl'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "text",
        'data-testid': (__VLS_ctx.qa('tr069-config-acs-url-input')),
        value: (__VLS_ctx.config.URL),
        required: true,
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('tr069-config-connection-request-url-label')),
    });
    (__VLS_ctx.t('device.connectionRequestUrl'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "text",
        'data-testid': (__VLS_ctx.qa('tr069-config-connection-request-url-input')),
        value: (__VLS_ctx.config.ConnectionRequestURL),
        disabled: true,
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "credentials-section" },
        'data-testid': (__VLS_ctx.qa('tr069-config-acs-credentials-section')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        'data-testid': (__VLS_ctx.qa('tr069-config-acs-credentials-title')),
    });
    (__VLS_ctx.t('device.acsCredentials'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('tr069-config-acs-username-label')),
    });
    (__VLS_ctx.t('device.username'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "text",
        'data-testid': (__VLS_ctx.qa('tr069-config-acs-username-input')),
        value: (__VLS_ctx.config.Username),
        required: true,
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('tr069-config-acs-password-label')),
    });
    (__VLS_ctx.t('device.password'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "password-input" },
        'data-testid': (__VLS_ctx.qa('tr069-config-acs-password-container')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: (__VLS_ctx.showPassword.acs ? 'text' : 'password'),
        'data-testid': (__VLS_ctx.qa('tr069-config-acs-password-input')),
        required: true,
    });
    (__VLS_ctx.config.Password);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.loading))
                    return;
                if (!!(__VLS_ctx.error))
                    return;
                if (!(__VLS_ctx.config))
                    return;
                __VLS_ctx.showPassword.acs = !__VLS_ctx.showPassword.acs;
            } },
        type: "button",
        ...{ class: "toggle-password" },
        'data-testid': (__VLS_ctx.qa('tr069-config-acs-password-toggle')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    (__VLS_ctx.showPassword.acs ? 'visibility_off' : 'visibility');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "credentials-section" },
        'data-testid': (__VLS_ctx.qa('tr069-config-connection-credentials-section')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        'data-testid': (__VLS_ctx.qa('tr069-config-connection-credentials-title')),
    });
    (__VLS_ctx.t('device.connectionRequestCredentials'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('tr069-config-connection-username-label')),
    });
    (__VLS_ctx.t('device.username'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "text",
        'data-testid': (__VLS_ctx.qa('tr069-config-connection-username-input')),
        value: (__VLS_ctx.config.ConnectionRequestUsername),
        required: true,
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('tr069-config-connection-password-label')),
    });
    (__VLS_ctx.t('device.password'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "password-input" },
        'data-testid': (__VLS_ctx.qa('tr069-config-connection-password-container')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: (__VLS_ctx.showPassword.connection ? 'text' : 'password'),
        'data-testid': (__VLS_ctx.qa('tr069-config-connection-password-input')),
        required: true,
    });
    (__VLS_ctx.config.ConnectionRequestPassword);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.loading))
                    return;
                if (!!(__VLS_ctx.error))
                    return;
                if (!(__VLS_ctx.config))
                    return;
                __VLS_ctx.showPassword.connection = !__VLS_ctx.showPassword.connection;
            } },
        type: "button",
        ...{ class: "toggle-password" },
        'data-testid': (__VLS_ctx.qa('tr069-config-connection-password-toggle')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    (__VLS_ctx.showPassword.connection ? 'visibility_off' : 'visibility');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "switch-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        'data-testid': (__VLS_ctx.qa('tr069-config-periodic-inform-enable-label')),
    });
    (__VLS_ctx.t('device.enablePeriodicInform'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "checkbox",
        'data-testid': (__VLS_ctx.qa('tr069-config-periodic-inform-enable-toggle')),
        'true-value': (1),
        'false-value': (0),
    });
    (__VLS_ctx.config.PeriodicInformEnable);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    if (__VLS_ctx.config.PeriodicInformEnable) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            'data-testid': (__VLS_ctx.qa('tr069-config-periodic-inform-interval-label')),
        });
        (__VLS_ctx.t('device.periodicInformInterval'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "number",
            'data-testid': (__VLS_ctx.qa('tr069-config-periodic-inform-interval-input')),
            required: true,
            min: "1",
        });
        (__VLS_ctx.config.PeriodicInformInterval);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "button-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.fetchConfig) },
        type: "button",
        ...{ class: "btn btn-secondary" },
        'data-testid': (__VLS_ctx.qa('tr069-config-cancel-button')),
    });
    (__VLS_ctx.t('common.cancel'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        type: "submit",
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('tr069-config-apply-button')),
        disabled: (__VLS_ctx.loading),
    });
    (__VLS_ctx.t('common.apply'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleSendInform) },
        type: "button",
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('tr069-config-send-inform-button')),
        disabled: (__VLS_ctx.loading || !__VLS_ctx.config.EnableCWMP),
    });
    (__VLS_ctx.t('device.sendInform'));
}
/** @type {__VLS_StyleScopedClasses['tr069-config']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['credentials-section']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['password-input']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-password']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['credentials-section']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['password-input']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-password']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
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
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
            config: config,
            loading: loading,
            error: error,
            showPassword: showPassword,
            fetchConfig: fetchConfig,
            handleApply: handleApply,
            handleSendInform: handleSendInform,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
