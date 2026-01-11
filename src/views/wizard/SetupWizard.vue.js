import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { wizardApi } from '../../services/api/wizard';
import PrivacyPolicy from './steps/PrivacyPolicy.vue';
import ModeSelect from './steps/ModeSelect.vue';
import AgentSetup from './steps/AgentSetup.vue';
import AgentProcessing from './steps/AgentProcessing.vue';
import AgentComplete from './steps/AgentComplete.vue';
import RouterEnvironment from './steps/RouterEnvironment.vue';
import WanModeSelect from './steps/WanModeSelect.vue';
import MeshSetup from './steps/MeshSetup.vue';
import WifiSetup from './steps/WifiSetup.vue';
import AdminPassword from './steps/AdminPassword.vue';
import ReviewSettings from './steps/ReviewSettings.vue';
import ApplyingSettings from './steps/ApplyingSettings.vue';
import WizardComplete from './steps/WizardComplete.vue';
const { locale, t } = useI18n();
const availableLanguages = ref([
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'ja', label: '日本語' },
    { code: 'de', label: 'Deutsch' },
    { code: 'zh_TW', label: '繁體中文' },
    { code: 'zh_CN', label: '简体中文' },
    { code: 'ko', label: '한국어' }
]);
const username = ref(localStorage.getItem('username') || 'admin');
const handleLanguageChange = (event) => {
    const newLocale = event.target.value;
    locale.value = newLocale;
};
const handleLogout = async () => {
    const authService = (await import('../../services/auth')).AuthService.getInstance();
    authService.clearSession();
    router.push('/login');
};
const router = useRouter();
const currentStep = ref(1);
const wizardData = ref(null);
const loading = ref(true);
const isApplying = ref(false);
const isComplete = ref(false);
const isAgentComplete = ref(false);
const etaSeconds = ref(120);
const config = ref({
    mode: 'router',
    wan: {
        wanMode: ''
    },
    wifi: {
        smartConnect: true,
        mloEnable: true,
        psc: true,
        pmf: false,
        common: {
            ssid: '',
            security: 'WPA3-Personal',
            password: '',
            securityOptions: []
        },
        bands: {
            '2g': { enabled: true, ssid: '', security: 'WPA3-Personal', password: '', securityOptions: [] },
            '5g': { enabled: true, ssid: '', security: 'WPA3-Personal', password: '', securityOptions: [] },
            '6g': { enabled: true, ssid: '', security: 'WPA3-Personal', password: '', securityOptions: [] }
        }
    },
    mesh: {
        enable: true
    },
    admin: {
        username: 'admin',
        password: ''
    }
});
const agentSetupMode = ref('wps');
const maxSteps = computed(() => {
    if (config.value.mode === 'agent') {
        return 4;
    }
    return 8;
});
onMounted(async () => {
    try {
        wizardData.value = await wizardApi.getWizardInfo();
        const autoFillConfig = wizardApi.transformWizardDataToConfig(wizardData.value);
        if (autoFillConfig.wan) {
            config.value.wan = autoFillConfig.wan;
        }
        if (autoFillConfig.wifi) {
            config.value.wifi = autoFillConfig.wifi;
        }
        if (autoFillConfig.mesh) {
            config.value.mesh = autoFillConfig.mesh;
        }
    }
    catch (error) {
        console.error('Failed to load wizard data:', error);
    }
    finally {
        loading.value = false;
    }
});
const nextStep = () => {
    if (currentStep.value < maxSteps.value) {
        currentStep.value++;
    }
};
const prevStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--;
    }
};
const backToAgentSetup = () => {
    currentStep.value = 3;
};
const handleAgentSuccess = () => {
    isAgentComplete.value = true;
};
const handleModeChange = (mode) => {
    config.value.mode = mode;
    currentStep.value = 2;
};
const handleAgentSetupModeChange = (mode) => {
    agentSetupMode.value = mode;
};
const submitWizard = async () => {
    try {
        isApplying.value = true;
        const response = await wizardApi.submitWizardConfig(config.value);
        if (response.WizardRouter.ok) {
            etaSeconds.value = response.WizardRouter.eta_seconds;
        }
        else {
            isApplying.value = false;
            throw new Error(response.WizardRouter.message);
        }
    }
    catch (error) {
        console.error('Failed to submit wizard configuration:', error);
        alert('Failed to save configuration. Please try again.');
        isApplying.value = false;
    }
};
const handleApplyComplete = () => {
    isApplying.value = false;
    isComplete.value = true;
};
const handleFinish = async () => {
    const authService = (await import('../../services/auth')).AuthService.getInstance();
    authService.clearWizardFlag();
    router.push('/dashboard');
};
const getStepComponent = () => {
    if (currentStep.value === 1)
        return PrivacyPolicy;
    if (currentStep.value === 2)
        return ModeSelect;
    if (config.value.mode === 'router') {
        switch (currentStep.value) {
            case 3: return RouterEnvironment;
            case 4: return WanModeSelect;
            case 5: return MeshSetup;
            case 6: return WifiSetup;
            case 7: return AdminPassword;
            case 8: return ReviewSettings;
            default: return PrivacyPolicy;
        }
    }
    else {
        switch (currentStep.value) {
            case 3: return AgentSetup;
            case 4: return AgentProcessing;
            default: return PrivacyPolicy;
        }
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['language-select']} */ ;
/** @type {__VLS_StyleScopedClasses['header-btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wizard-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
    ...{ class: "wizard-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "logo" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-controls" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "language-select-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "material-icons" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    ...{ onChange: (__VLS_ctx.handleLanguageChange) },
    ...{ class: "language-select" },
    value: (__VLS_ctx.locale),
});
for (const [lang] of __VLS_getVForSourceType((__VLS_ctx.availableLanguages))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (lang.code),
        value: (lang.code),
    });
    (lang.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ class: "header-btn" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "material-icons" },
});
(__VLS_ctx.username);
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleLogout) },
    ...{ class: "header-btn" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "material-icons" },
});
(__VLS_ctx.t('header.logout'));
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading" },
    });
}
else if (__VLS_ctx.isApplying) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "wizard-content" },
    });
    /** @type {[typeof ApplyingSettings, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(ApplyingSettings, new ApplyingSettings({
        ...{ 'onComplete': {} },
        etaSeconds: (__VLS_ctx.etaSeconds),
    }));
    const __VLS_1 = __VLS_0({
        ...{ 'onComplete': {} },
        etaSeconds: (__VLS_ctx.etaSeconds),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_3;
    let __VLS_4;
    let __VLS_5;
    const __VLS_6 = {
        onComplete: (__VLS_ctx.handleApplyComplete)
    };
    var __VLS_2;
}
else if (__VLS_ctx.isAgentComplete) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "wizard-content" },
    });
    /** @type {[typeof AgentComplete, ]} */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(AgentComplete, new AgentComplete({
        wizardData: (__VLS_ctx.wizardData),
    }));
    const __VLS_8 = __VLS_7({
        wizardData: (__VLS_ctx.wizardData),
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
}
else if (__VLS_ctx.isComplete) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "wizard-content" },
    });
    /** @type {[typeof WizardComplete, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(WizardComplete, new WizardComplete({
        ...{ 'onFinish': {} },
        ssid: (__VLS_ctx.config.wifi.smartConnect ? __VLS_ctx.config.wifi.common.ssid : __VLS_ctx.config.wifi.bands['2g'].ssid),
        deviceModel: (__VLS_ctx.wizardData?.ModelName),
    }));
    const __VLS_11 = __VLS_10({
        ...{ 'onFinish': {} },
        ssid: (__VLS_ctx.config.wifi.smartConnect ? __VLS_ctx.config.wifi.common.ssid : __VLS_ctx.config.wifi.bands['2g'].ssid),
        deviceModel: (__VLS_ctx.wizardData?.ModelName),
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    let __VLS_13;
    let __VLS_14;
    let __VLS_15;
    const __VLS_16 = {
        onFinish: (__VLS_ctx.handleFinish)
    };
    var __VLS_12;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "wizard-content" },
    });
    const __VLS_17 = ((__VLS_ctx.getStepComponent()));
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
        ...{ 'onNext': {} },
        ...{ 'onPrev': {} },
        ...{ 'onModeChange': {} },
        ...{ 'onAgentModeChange': {} },
        ...{ 'onBackToAgentSetup': {} },
        ...{ 'onAgentSuccess': {} },
        ...{ 'onSubmit': {} },
        config: (__VLS_ctx.config),
        wizardData: (__VLS_ctx.wizardData),
        agentSetupMode: (__VLS_ctx.agentSetupMode),
        currentStep: (__VLS_ctx.currentStep),
        maxSteps: (__VLS_ctx.maxSteps),
    }));
    const __VLS_19 = __VLS_18({
        ...{ 'onNext': {} },
        ...{ 'onPrev': {} },
        ...{ 'onModeChange': {} },
        ...{ 'onAgentModeChange': {} },
        ...{ 'onBackToAgentSetup': {} },
        ...{ 'onAgentSuccess': {} },
        ...{ 'onSubmit': {} },
        config: (__VLS_ctx.config),
        wizardData: (__VLS_ctx.wizardData),
        agentSetupMode: (__VLS_ctx.agentSetupMode),
        currentStep: (__VLS_ctx.currentStep),
        maxSteps: (__VLS_ctx.maxSteps),
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    let __VLS_21;
    let __VLS_22;
    let __VLS_23;
    const __VLS_24 = {
        onNext: (__VLS_ctx.nextStep)
    };
    const __VLS_25 = {
        onPrev: (__VLS_ctx.prevStep)
    };
    const __VLS_26 = {
        onModeChange: (__VLS_ctx.handleModeChange)
    };
    const __VLS_27 = {
        onAgentModeChange: (__VLS_ctx.handleAgentSetupModeChange)
    };
    const __VLS_28 = {
        onBackToAgentSetup: (__VLS_ctx.backToAgentSetup)
    };
    const __VLS_29 = {
        onAgentSuccess: (__VLS_ctx.handleAgentSuccess)
    };
    const __VLS_30 = {
        onSubmit: (__VLS_ctx.submitWizard)
    };
    var __VLS_20;
}
/** @type {__VLS_StyleScopedClasses['wizard-container']} */ ;
/** @type {__VLS_StyleScopedClasses['wizard-header']} */ ;
/** @type {__VLS_StyleScopedClasses['logo']} */ ;
/** @type {__VLS_StyleScopedClasses['header-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['language-select-container']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['language-select']} */ ;
/** @type {__VLS_StyleScopedClasses['header-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['header-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['loading']} */ ;
/** @type {__VLS_StyleScopedClasses['wizard-content']} */ ;
/** @type {__VLS_StyleScopedClasses['wizard-content']} */ ;
/** @type {__VLS_StyleScopedClasses['wizard-content']} */ ;
/** @type {__VLS_StyleScopedClasses['wizard-content']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            AgentComplete: AgentComplete,
            ApplyingSettings: ApplyingSettings,
            WizardComplete: WizardComplete,
            locale: locale,
            t: t,
            availableLanguages: availableLanguages,
            username: username,
            handleLanguageChange: handleLanguageChange,
            handleLogout: handleLogout,
            currentStep: currentStep,
            wizardData: wizardData,
            loading: loading,
            isApplying: isApplying,
            isComplete: isComplete,
            isAgentComplete: isAgentComplete,
            etaSeconds: etaSeconds,
            config: config,
            agentSetupMode: agentSetupMode,
            maxSteps: maxSteps,
            nextStep: nextStep,
            prevStep: prevStep,
            backToAgentSetup: backToAgentSetup,
            handleAgentSuccess: handleAgentSuccess,
            handleModeChange: handleModeChange,
            handleAgentSetupModeChange: handleAgentSetupModeChange,
            submitWizard: submitWizard,
            handleApplyComplete: handleApplyComplete,
            handleFinish: handleFinish,
            getStepComponent: getStepComponent,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
