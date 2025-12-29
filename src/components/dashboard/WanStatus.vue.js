import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQA } from '../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
if (__VLS_ctx.wanInfo) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "wan-status" },
        'data-testid': (__VLS_ctx.qa('dashboard-wan-status-content')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "card-title" },
        'data-testid': (__VLS_ctx.qa('dashboard-wan-status-title')),
    });
    (__VLS_ctx.t('dashboard.wan'));
    (__VLS_ctx.t('dashboard.status'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-grid" },
        'data-testid': (__VLS_ctx.qa('dashboard-wan-status-grid')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-item" },
        'data-testid': (__VLS_ctx.qa('dashboard-wan-status-protocol')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('dashboard-wan-status-protocol-label')),
    });
    (__VLS_ctx.t('dashboard.protocol'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "value" },
        'data-testid': (__VLS_ctx.qa('dashboard-wan-status-protocol-value')),
        title: (__VLS_ctx.wanInfo.Protocol),
    });
    (__VLS_ctx.wanInfo.Protocol);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-item" },
        'data-testid': (__VLS_ctx.qa('dashboard-wan-status-ipv4-address')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('dashboard-wan-status-ipv4-address-label')),
    });
    (__VLS_ctx.t('dashboard.ipv4Address'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "value" },
        'data-testid': (__VLS_ctx.qa('dashboard-wan-status-ipv4-address-value')),
        title: (__VLS_ctx.wanInfo.InternetAddress),
    });
    (__VLS_ctx.wanInfo.InternetAddress);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-item" },
        'data-testid': (__VLS_ctx.qa('dashboard-wan-status-subnet-mask')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('dashboard-wan-status-subnet-mask-label')),
    });
    (__VLS_ctx.t('dashboard.subnetMask'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "value" },
        'data-testid': (__VLS_ctx.qa('dashboard-wan-status-subnet-mask-value')),
        title: (__VLS_ctx.wanInfo.SubnetMask),
    });
    (__VLS_ctx.wanInfo.SubnetMask);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-item" },
        'data-testid': (__VLS_ctx.qa('dashboard-wan-status-default-gateway')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('dashboard-wan-status-default-gateway-label')),
    });
    (__VLS_ctx.t('dashboard.defaultGateway'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "value" },
        'data-testid': (__VLS_ctx.qa('dashboard-wan-status-default-gateway-value')),
        title: (__VLS_ctx.wanInfo.DefaultGateway),
    });
    (__VLS_ctx.wanInfo.DefaultGateway);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-item" },
        'data-testid': (__VLS_ctx.qa('dashboard-wan-status-primary-dns')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('dashboard-wan-status-primary-dns-label')),
    });
    (__VLS_ctx.t('dashboard.primaryDNS'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "value" },
        'data-testid': (__VLS_ctx.qa('dashboard-wan-status-primary-dns-value')),
        title: (__VLS_ctx.wanInfo.PrimaryDNS),
    });
    (__VLS_ctx.wanInfo.PrimaryDNS);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-item" },
        'data-testid': (__VLS_ctx.qa('dashboard-wan-status-secondary-dns')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('dashboard-wan-status-secondary-dns-label')),
    });
    (__VLS_ctx.t('dashboard.secondaryDNS'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "value" },
        'data-testid': (__VLS_ctx.qa('dashboard-wan-status-secondary-dns-value')),
        title: (__VLS_ctx.wanInfo.SecondaryDNS),
    });
    (__VLS_ctx.wanInfo.SecondaryDNS);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-item" },
        'data-testid': (__VLS_ctx.qa('dashboard-wan-status-mac-address')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "info-label" },
        'data-testid': (__VLS_ctx.qa('dashboard-wan-status-mac-address-label')),
    });
    (__VLS_ctx.t('dashboard.macAddress'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "value" },
        'data-testid': (__VLS_ctx.qa('dashboard-wan-status-mac-address-value')),
        title: (__VLS_ctx.wanInfo.MacAddress),
    });
    (__VLS_ctx.wanInfo.MacAddress);
}
/** @type {__VLS_StyleScopedClasses['wan-status']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['info-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
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
