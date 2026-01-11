import { useI18n } from 'vue-i18n';
import { useQA } from '../../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const __VLS_props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['section-title-sp']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-cards']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "vap-info" },
    'data-testid': (__VLS_ctx.qa('wps-vap-info-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-title" },
    'data-testid': (__VLS_ctx.qa('wps-vap-info-title')),
});
(__VLS_ctx.t('wireless.vapInformation'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "table-container" },
    'data-testid': (__VLS_ctx.qa('wps-vap-info-table-container')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
    'data-testid': (__VLS_ctx.qa('wps-vap-info-table')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('wps-vap-info-header-band')),
});
(__VLS_ctx.t('wireless.band'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('wps-vap-info-header-ssid')),
});
(__VLS_ctx.t('wireless.ssid'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('wps-vap-info-header-authentication')),
});
(__VLS_ctx.t('wireless.authentication'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('wps-vap-info-header-encryption')),
});
(__VLS_ctx.t('wireless.encryption'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('wps-vap-info-header-wps-status')),
});
(__VLS_ctx.t('wireless.wpsStatus'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
for (const [band, bandIndex] of __VLS_getVForSourceType((__VLS_ctx.bands))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
        key: (band.Band),
        'data-testid': (__VLS_ctx.qa(`wps-vap-info-row-${bandIndex}`)),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`wps-vap-info-band-${bandIndex}`)),
    });
    (band.Band);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`wps-vap-info-ssid-${bandIndex}`)),
    });
    (band.SSID);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`wps-vap-info-authentication-${bandIndex}`)),
    });
    (band.AuthType);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`wps-vap-info-encryption-${bandIndex}`)),
    });
    (band.EncryType);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`wps-vap-info-wps-status-${bandIndex}`)),
    });
    (band.Configured);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mobile-cards" },
    'data-testid': (__VLS_ctx.qa('wps-vap-info-mobile')),
});
for (const [band, bandIndex] of __VLS_getVForSourceType((__VLS_ctx.bands))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-card" },
        key: (band.Band),
        'data-testid': (__VLS_ctx.qa(`wps-vap-info-card-${bandIndex}`)),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-label" },
        'data-testid': (__VLS_ctx.qa(`wps-vap-info-card-band-label-${bandIndex}`)),
    });
    (__VLS_ctx.t('wireless.band'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-value" },
        'data-testid': (__VLS_ctx.qa(`wps-vap-info-card-band-value-${bandIndex}`)),
    });
    (band.Band);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-label" },
        'data-testid': (__VLS_ctx.qa(`wps-vap-info-card-ssid-label-${bandIndex}`)),
    });
    (__VLS_ctx.t('wireless.ssid'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-value" },
        'data-testid': (__VLS_ctx.qa(`wps-vap-info-card-ssid-value-${bandIndex}`)),
    });
    (band.SSID);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-label" },
        'data-testid': (__VLS_ctx.qa(`wps-vap-info-card-authentication-label-${bandIndex}`)),
    });
    (__VLS_ctx.t('wireless.authentication'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-value" },
        'data-testid': (__VLS_ctx.qa(`wps-vap-info-card-authentication-value-${bandIndex}`)),
    });
    (band.AuthType);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-label" },
        'data-testid': (__VLS_ctx.qa(`wps-vap-info-card-encryption-label-${bandIndex}`)),
    });
    (__VLS_ctx.t('wireless.encryption'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-value" },
        'data-testid': (__VLS_ctx.qa(`wps-vap-info-card-encryption-value-${bandIndex}`)),
    });
    (band.EncryType);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-label" },
        'data-testid': (__VLS_ctx.qa(`wps-vap-info-card-wps-status-label-${bandIndex}`)),
    });
    (__VLS_ctx.t('wireless.wpsStatus'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-value" },
        'data-testid': (__VLS_ctx.qa(`wps-vap-info-card-wps-status-value-${bandIndex}`)),
    });
    (band.Configured);
}
/** @type {__VLS_StyleScopedClasses['vap-info']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['table-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
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
