import { defineProps, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQA } from '../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const props = defineProps();
const sortedEthernet = computed(() => {
    return props.ethernetInfo
        ? [...props.ethernetInfo].sort((a, b) => a.Port.localeCompare(b.Port)) // 依照 Port 名稱排序
        : [];
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['port-item']} */ ;
/** @type {__VLS_StyleScopedClasses['port-icon']} */ ;
// CSS variable injection 
// CSS variable injection end 
if (__VLS_ctx.sortedEthernet.length) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "ethernet-status" },
        'data-testid': (__VLS_ctx.qa('dashboard-ethernet-status-content')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "card-title" },
        'data-testid': (__VLS_ctx.qa('dashboard-ethernet-status-title')),
    });
    (__VLS_ctx.t('dashboard.ethernet'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "ports-grid" },
        'data-testid': (__VLS_ctx.qa('dashboard-ethernet-status-grid')),
    });
    for (const [port, index] of __VLS_getVForSourceType((__VLS_ctx.sortedEthernet))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (port.Port),
            ...{ class: "port-item" },
            'data-testid': (__VLS_ctx.qa(`dashboard-ethernet-status-port-${index}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "port-icon" },
            'data-testid': (__VLS_ctx.qa(`dashboard-ethernet-status-port-icon-${index}`)),
            ...{ class: ({ active: port.Status === 'Up' }) },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
            'data-testid': (__VLS_ctx.qa(`dashboard-ethernet-status-port-icon-symbol-${index}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "port-info" },
            'data-testid': (__VLS_ctx.qa(`dashboard-ethernet-status-port-info-${index}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "port-name" },
            'data-testid': (__VLS_ctx.qa(`dashboard-ethernet-status-port-name-${index}`)),
        });
        (port.Port);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "port-role" },
            'data-testid': (__VLS_ctx.qa(`dashboard-ethernet-status-port-role-${index}`)),
        });
        (port.Role.toUpperCase());
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "port-speed" },
            'data-testid': (__VLS_ctx.qa(`dashboard-ethernet-status-port-speed-${index}`)),
        });
        (port.Speed);
    }
}
/** @type {__VLS_StyleScopedClasses['ethernet-status']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['ports-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['port-item']} */ ;
/** @type {__VLS_StyleScopedClasses['port-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['port-info']} */ ;
/** @type {__VLS_StyleScopedClasses['port-name']} */ ;
/** @type {__VLS_StyleScopedClasses['port-role']} */ ;
/** @type {__VLS_StyleScopedClasses['port-speed']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
            sortedEthernet: sortedEthernet,
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
