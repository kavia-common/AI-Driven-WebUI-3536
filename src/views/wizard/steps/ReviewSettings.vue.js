import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const __VLS_props = defineProps();
const __VLS_emit = defineEmits(['prev', 'submit']);
const { t } = useI18n();
const showCommonPassword = ref(false);
const showAdminPassword = ref(false);
const showBandPasswords = ref({
    '2g': false,
    '5g': false,
    '6g': false
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['progress-step']} */ ;
/** @type {__VLS_StyleScopedClasses['review-section']} */ ;
/** @type {__VLS_StyleScopedClasses['review-item']} */ ;
/** @type {__VLS_StyleScopedClasses['review-item']} */ ;
/** @type {__VLS_StyleScopedClasses['password-toggle-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['password-toggle-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['band-info']} */ ;
/** @type {__VLS_StyleScopedClasses['info-box']} */ ;
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
(__VLS_ctx.t('wizard.reviewTitle'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "step-subtitle" },
});
(__VLS_ctx.t('wizard.reviewSubtitle'));
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
    ...{ class: "progress-step active" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "progress-step active" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "review-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "review-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
(__VLS_ctx.t('wizard.reviewDeviceMode'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "review-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "label" },
});
(__VLS_ctx.t('wizard.reviewMode'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "value" },
});
(__VLS_ctx.config.mode === 'router' ? __VLS_ctx.t('wizard.routerModeTitle') : __VLS_ctx.t('wizard.agentModeTitle'));
if (__VLS_ctx.config.mode === 'router') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "review-section" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (__VLS_ctx.t('wizard.reviewWanConnection'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "review-item" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "label" },
    });
    (__VLS_ctx.t('wizard.reviewConnectionType'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "value" },
    });
    (__VLS_ctx.config.wan.wanMode.replace(/_/g, ' '));
}
if (__VLS_ctx.config.mode === 'router') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "review-section" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (__VLS_ctx.t('wizard.reviewSmartMesh'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "review-item" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "label" },
    });
    (__VLS_ctx.t('wizard.reviewStatus'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "value" },
    });
    (__VLS_ctx.config.mesh.enable ? __VLS_ctx.t('wizard.reviewEnabled') : __VLS_ctx.t('wizard.reviewDisabled'));
}
if (__VLS_ctx.config.mode === 'router') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "review-section" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (__VLS_ctx.t('wizard.reviewWifiConfiguration'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "review-item" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "label" },
    });
    (__VLS_ctx.t('wizard.smartConnect'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "value" },
    });
    (__VLS_ctx.config.wifi.smartConnect ? __VLS_ctx.t('wizard.reviewEnabled') : __VLS_ctx.t('wizard.reviewDisabled'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "review-item" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "label" },
    });
    (__VLS_ctx.t('wizard.reviewMloNetwork'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "value" },
    });
    (__VLS_ctx.config.wifi.mloEnable ? __VLS_ctx.t('wizard.reviewEnabled') : __VLS_ctx.t('wizard.reviewDisabled'));
    if (__VLS_ctx.config.wifi.smartConnect) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "review-item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "label" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "value" },
        });
        (__VLS_ctx.config.wifi.common.ssid);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "review-item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "label" },
        });
        (__VLS_ctx.t('wizard.reviewSecurityType'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "value" },
        });
        (__VLS_ctx.config.wifi.common.security);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "review-item password-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "label" },
        });
        (__VLS_ctx.t('wizard.reviewPassword'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "value" },
        });
        (__VLS_ctx.showCommonPassword ? __VLS_ctx.config.wifi.common.password : '•'.repeat(__VLS_ctx.config.wifi.common.password.length));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.config.mode === 'router'))
                        return;
                    if (!(__VLS_ctx.config.wifi.smartConnect))
                        return;
                    __VLS_ctx.showCommonPassword = !__VLS_ctx.showCommonPassword;
                } },
            type: "button",
            ...{ class: "password-toggle-btn" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
        (__VLS_ctx.showCommonPassword ? 'visibility_off' : 'visibility');
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "review-item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "label" },
        });
        (__VLS_ctx.t('wizard.reviewPsc'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "value" },
        });
        (__VLS_ctx.config.wifi.psc ? __VLS_ctx.t('wizard.reviewEnabled') : __VLS_ctx.t('wizard.reviewDisabled'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "review-item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "label" },
        });
        (__VLS_ctx.t('wizard.reviewPmf'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "value" },
        });
        (__VLS_ctx.config.wifi.pmf ? __VLS_ctx.t('wizard.reviewEnabled') : __VLS_ctx.t('wizard.reviewDisabled'));
        if (__VLS_ctx.config.wifi.bands['2g'].enabled) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "band-info" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "review-item" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "label" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "value" },
            });
            (__VLS_ctx.config.wifi.bands['2g'].ssid);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "review-item" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "label" },
            });
            (__VLS_ctx.t('wizard.reviewSecurityType'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "value" },
            });
            (__VLS_ctx.config.wifi.bands['2g'].security);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "review-item password-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "label" },
            });
            (__VLS_ctx.t('wizard.reviewPassword'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "value" },
            });
            (__VLS_ctx.showBandPasswords['2g'] ? __VLS_ctx.config.wifi.bands['2g'].password : '•'.repeat(__VLS_ctx.config.wifi.bands['2g'].password.length));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.config.mode === 'router'))
                            return;
                        if (!!(__VLS_ctx.config.wifi.smartConnect))
                            return;
                        if (!(__VLS_ctx.config.wifi.bands['2g'].enabled))
                            return;
                        __VLS_ctx.showBandPasswords['2g'] = !__VLS_ctx.showBandPasswords['2g'];
                    } },
                type: "button",
                ...{ class: "password-toggle-btn" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
            (__VLS_ctx.showBandPasswords['2g'] ? 'visibility_off' : 'visibility');
        }
        if (__VLS_ctx.config.wifi.bands['5g'].enabled) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "band-info" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "review-item" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "label" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "value" },
            });
            (__VLS_ctx.config.wifi.bands['5g'].ssid);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "review-item" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "label" },
            });
            (__VLS_ctx.t('wizard.reviewSecurityType'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "value" },
            });
            (__VLS_ctx.config.wifi.bands['5g'].security);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "review-item password-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "label" },
            });
            (__VLS_ctx.t('wizard.reviewPassword'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "value" },
            });
            (__VLS_ctx.showBandPasswords['5g'] ? __VLS_ctx.config.wifi.bands['5g'].password : '•'.repeat(__VLS_ctx.config.wifi.bands['5g'].password.length));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.config.mode === 'router'))
                            return;
                        if (!!(__VLS_ctx.config.wifi.smartConnect))
                            return;
                        if (!(__VLS_ctx.config.wifi.bands['5g'].enabled))
                            return;
                        __VLS_ctx.showBandPasswords['5g'] = !__VLS_ctx.showBandPasswords['5g'];
                    } },
                type: "button",
                ...{ class: "password-toggle-btn" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
            (__VLS_ctx.showBandPasswords['5g'] ? 'visibility_off' : 'visibility');
        }
        if (__VLS_ctx.config.wifi.bands['6g'].enabled) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "band-info" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "review-item" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "label" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "value" },
            });
            (__VLS_ctx.config.wifi.bands['6g'].ssid);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "review-item" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "label" },
            });
            (__VLS_ctx.t('wizard.reviewSecurityType'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "value" },
            });
            (__VLS_ctx.config.wifi.bands['6g'].security);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "review-item password-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "label" },
            });
            (__VLS_ctx.t('wizard.reviewPassword'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "value" },
            });
            (__VLS_ctx.showBandPasswords['6g'] ? __VLS_ctx.config.wifi.bands['6g'].password : '•'.repeat(__VLS_ctx.config.wifi.bands['6g'].password.length));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.config.mode === 'router'))
                            return;
                        if (!!(__VLS_ctx.config.wifi.smartConnect))
                            return;
                        if (!(__VLS_ctx.config.wifi.bands['6g'].enabled))
                            return;
                        __VLS_ctx.showBandPasswords['6g'] = !__VLS_ctx.showBandPasswords['6g'];
                    } },
                type: "button",
                ...{ class: "password-toggle-btn" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
            (__VLS_ctx.showBandPasswords['6g'] ? 'visibility_off' : 'visibility');
        }
    }
}
if (__VLS_ctx.config.mode === 'router') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "review-section" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (__VLS_ctx.t('wizard.reviewAdministrator'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "review-item" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "label" },
    });
    (__VLS_ctx.t('wizard.username'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "value" },
    });
    (__VLS_ctx.config.admin.username);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "review-item password-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "label" },
    });
    (__VLS_ctx.t('wizard.reviewPassword'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "value" },
    });
    (__VLS_ctx.showAdminPassword ? __VLS_ctx.config.admin.password : '•'.repeat(__VLS_ctx.config.admin.password.length));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.config.mode === 'router'))
                    return;
                __VLS_ctx.showAdminPassword = !__VLS_ctx.showAdminPassword;
            } },
        type: "button",
        ...{ class: "password-toggle-btn" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    (__VLS_ctx.showAdminPassword ? 'visibility_off' : 'visibility');
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "info-box" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.t('wizard.reviewApplyMessage'));
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
            __VLS_ctx.$emit('submit');
        } },
    ...{ class: "btn-primary" },
});
(__VLS_ctx.t('common.apply'));
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
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-step']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['review-container']} */ ;
/** @type {__VLS_StyleScopedClasses['review-section']} */ ;
/** @type {__VLS_StyleScopedClasses['review-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['review-section']} */ ;
/** @type {__VLS_StyleScopedClasses['review-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['review-section']} */ ;
/** @type {__VLS_StyleScopedClasses['review-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['review-section']} */ ;
/** @type {__VLS_StyleScopedClasses['review-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['review-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['review-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['review-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['review-item']} */ ;
/** @type {__VLS_StyleScopedClasses['password-row']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['password-toggle-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['review-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['review-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['band-info']} */ ;
/** @type {__VLS_StyleScopedClasses['review-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['review-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['review-item']} */ ;
/** @type {__VLS_StyleScopedClasses['password-row']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['password-toggle-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['band-info']} */ ;
/** @type {__VLS_StyleScopedClasses['review-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['review-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['review-item']} */ ;
/** @type {__VLS_StyleScopedClasses['password-row']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['password-toggle-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['band-info']} */ ;
/** @type {__VLS_StyleScopedClasses['review-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['review-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['review-item']} */ ;
/** @type {__VLS_StyleScopedClasses['password-row']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['password-toggle-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['review-section']} */ ;
/** @type {__VLS_StyleScopedClasses['review-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['review-item']} */ ;
/** @type {__VLS_StyleScopedClasses['password-row']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['password-toggle-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['info-box']} */ ;
/** @type {__VLS_StyleScopedClasses['button-container']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            t: t,
            showCommonPassword: showCommonPassword,
            showAdminPassword: showAdminPassword,
            showBandPasswords: showBandPasswords,
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
