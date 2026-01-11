import { defineProps, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQA } from '../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const props = defineProps();
// Map band keys to display names
const bandNames = {
    'wifi2g': '2.4GHz',
    'wifi5g': '5GHz',
    'wifi6g': '6GHz'
};
// Get enabled WiFi bands
const enabledBands = computed(() => {
    if (!props.wifiInfo)
        return [];
    return Object.entries(props.wifiInfo)
        .filter(([_, band]) => band && band.Enable === 1)
        .map(([key, band]) => ({
        key,
        displayName: bandNames[key],
        ...band
    }));
});
// Check if any WiFi is enabled
const hasEnabledWifi = computed(() => enabledBands.value.length > 0);
// Check if a security mode requires a password (is not "None")
const requiresPassword = (securityMode) => {
    return securityMode !== "None";
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['network-row']} */ ;
/** @type {__VLS_StyleScopedClasses['row-value']} */ ;
/** @type {__VLS_StyleScopedClasses['no-wifi-enabled']} */ ;
/** @type {__VLS_StyleScopedClasses['no-wifi-enabled']} */ ;
// CSS variable injection 
// CSS variable injection end 
if (__VLS_ctx.wifiInfo) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "wifi-status" },
        'data-testid': (__VLS_ctx.qa('dashboard-wifi-status-content')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "card-title" },
        'data-testid': (__VLS_ctx.qa('dashboard-wifi-status-title')),
    });
    (__VLS_ctx.t('dashboard.wifi'));
    if (__VLS_ctx.hasEnabledWifi) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "wifi-networks" },
            'data-testid': (__VLS_ctx.qa('dashboard-wifi-status-networks')),
        });
        for (const [band, index] of __VLS_getVForSourceType((__VLS_ctx.enabledBands))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                key: (band.key),
                ...{ class: "wifi-network" },
                'data-testid': (__VLS_ctx.qa(`dashboard-wifi-status-network-${index}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "network-row" },
                'data-testid': (__VLS_ctx.qa(`dashboard-wifi-status-network-ssid-row-${index}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "row-label" },
                'data-testid': (__VLS_ctx.qa(`dashboard-wifi-status-network-ssid-label-${index}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "row-value" },
                'data-testid': (__VLS_ctx.qa(`dashboard-wifi-status-network-ssid-value-${index}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "text-truncate" },
                'data-testid': (__VLS_ctx.qa(`dashboard-wifi-status-network-ssid-text-${index}`)),
                title: (band.SSID),
            });
            (band.SSID);
            if (__VLS_ctx.requiresPassword(band.SecurityMode)) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "security-icon material-icons" },
                    'data-testid': (__VLS_ctx.qa(`dashboard-wifi-status-network-security-icon-${index}`)),
                });
            }
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "network-row" },
                'data-testid': (__VLS_ctx.qa(`dashboard-wifi-status-network-band-row-${index}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "row-label" },
                'data-testid': (__VLS_ctx.qa(`dashboard-wifi-status-network-band-label-${index}`)),
            });
            (__VLS_ctx.t('wireless.band'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "row-value" },
                'data-testid': (__VLS_ctx.qa(`dashboard-wifi-status-network-band-value-${index}`)),
            });
            (band.displayName);
            if (__VLS_ctx.requiresPassword(band.SecurityMode)) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "network-row" },
                    'data-testid': (__VLS_ctx.qa(`dashboard-wifi-status-network-password-row-${index}`)),
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "row-label" },
                    'data-testid': (__VLS_ctx.qa(`dashboard-wifi-status-network-password-label-${index}`)),
                });
                (__VLS_ctx.t('dashboard.password'));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "row-value password text-truncate" },
                    'data-testid': (__VLS_ctx.qa(`dashboard-wifi-status-network-password-value-${index}`)),
                    title: (band.Password),
                });
                (band.Password);
            }
        }
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "no-wifi-enabled" },
            'data-testid': (__VLS_ctx.qa('dashboard-wifi-status-disabled')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
            'data-testid': (__VLS_ctx.qa('dashboard-wifi-status-disabled-icon')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            'data-testid': (__VLS_ctx.qa('dashboard-wifi-status-disabled-text')),
        });
    }
}
/** @type {__VLS_StyleScopedClasses['wifi-status']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['wifi-networks']} */ ;
/** @type {__VLS_StyleScopedClasses['wifi-network']} */ ;
/** @type {__VLS_StyleScopedClasses['network-row']} */ ;
/** @type {__VLS_StyleScopedClasses['row-label']} */ ;
/** @type {__VLS_StyleScopedClasses['row-value']} */ ;
/** @type {__VLS_StyleScopedClasses['text-truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['security-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['network-row']} */ ;
/** @type {__VLS_StyleScopedClasses['row-label']} */ ;
/** @type {__VLS_StyleScopedClasses['row-value']} */ ;
/** @type {__VLS_StyleScopedClasses['network-row']} */ ;
/** @type {__VLS_StyleScopedClasses['row-label']} */ ;
/** @type {__VLS_StyleScopedClasses['row-value']} */ ;
/** @type {__VLS_StyleScopedClasses['password']} */ ;
/** @type {__VLS_StyleScopedClasses['text-truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['no-wifi-enabled']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
            enabledBands: enabledBands,
            hasEnabledWifi: hasEnabledWifi,
            requiresPassword: requiresPassword,
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
