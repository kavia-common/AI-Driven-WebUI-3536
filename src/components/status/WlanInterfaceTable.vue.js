import { useI18n } from 'vue-i18n';
import { useQA } from '../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const __VLS_props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "interface-section" },
    'data-testid': (__VLS_ctx.qa('wlan-interface-section')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-title" },
    'data-testid': (__VLS_ctx.qa('wlan-interface-title')),
});
(__VLS_ctx.t('wlan.interface'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "table-section" },
    'data-testid': (__VLS_ctx.qa('wlan-interface-table-section')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
    'data-testid': (__VLS_ctx.qa('wlan-interface-table')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('wlan-interface-header-name')),
});
(__VLS_ctx.t('wlan.name'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('wlan-interface-header-alias')),
});
(__VLS_ctx.t('wlan.alias'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('wlan-interface-header-status')),
});
(__VLS_ctx.t('wlan.status'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('wlan-interface-header-ssid')),
});
(__VLS_ctx.t('wlan.ssid'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('wlan-interface-header-authentication')),
});
(__VLS_ctx.t('wlan.authentication'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('wlan-interface-header-encryption')),
});
(__VLS_ctx.t('wlan.encryption'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('wlan-interface-header-password')),
});
(__VLS_ctx.t('wlan.password'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('wlan-interface-header-bssid')),
});
(__VLS_ctx.t('wlan.bssid'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
for (const [iface, index] of __VLS_getVForSourceType((__VLS_ctx.interfaces))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
        key: (iface.Name),
        'data-testid': (__VLS_ctx.qa(`wlan-interface-row-${index}`)),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`wlan-interface-name-${index}`)),
    });
    (iface.Name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`wlan-interface-alias-${index}`)),
    });
    (iface.Alias);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`wlan-interface-status-${index}`)),
    });
    (iface.Enable ? __VLS_ctx.t('wlan.enable') : __VLS_ctx.t('wlan.disable'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`wlan-interface-ssid-${index}`)),
    });
    (iface.SSID);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`wlan-interface-authentication-${index}`)),
    });
    (iface.Authentication);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`wlan-interface-encryption-${index}`)),
    });
    (iface.Encryption);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`wlan-interface-password-${index}`)),
    });
    (iface.Password);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`wlan-interface-bssid-${index}`)),
    });
    (iface.BSSID);
}
/** @type {__VLS_StyleScopedClasses['interface-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['table-section']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
