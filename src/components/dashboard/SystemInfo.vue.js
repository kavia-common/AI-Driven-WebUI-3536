import { defineProps } from 'vue';
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
if (__VLS_ctx.systemInfo) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "system-info" },
        'data-testid': (__VLS_ctx.qa('dashboard-system-info-content')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "card-title" },
        'data-testid': (__VLS_ctx.qa('dashboard-system-info-title')),
    });
    (__VLS_ctx.t('dashboard.system'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-grid" },
        'data-testid': (__VLS_ctx.qa('dashboard-system-info-grid')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-item" },
        'data-testid': (__VLS_ctx.qa('dashboard-system-info-software-version')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "label" },
        'data-testid': (__VLS_ctx.qa('dashboard-system-info-software-version-label')),
    });
    (__VLS_ctx.t('dashboard.softwareVersion'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "value" },
        'data-testid': (__VLS_ctx.qa('dashboard-system-info-software-version-value')),
    });
    (__VLS_ctx.systemInfo.SoftwareVersion);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-item" },
        'data-testid': (__VLS_ctx.qa('dashboard-system-info-hardware-version')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "label" },
        'data-testid': (__VLS_ctx.qa('dashboard-system-info-hardware-version-label')),
    });
    (__VLS_ctx.t('dashboard.hardwareVersion'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "value" },
        'data-testid': (__VLS_ctx.qa('dashboard-system-info-hardware-version-value')),
    });
    (__VLS_ctx.systemInfo.HardwareVersion);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-item" },
        'data-testid': (__VLS_ctx.qa('dashboard-system-info-model')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "label" },
        'data-testid': (__VLS_ctx.qa('dashboard-system-info-model-label')),
    });
    (__VLS_ctx.t('dashboard.model'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "value" },
        'data-testid': (__VLS_ctx.qa('dashboard-system-info-model-value')),
    });
    (__VLS_ctx.systemInfo.ModelName);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "info-item" },
        'data-testid': (__VLS_ctx.qa('dashboard-system-info-serial-number')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "label" },
        'data-testid': (__VLS_ctx.qa('dashboard-system-info-serial-number-label')),
    });
    (__VLS_ctx.t('dashboard.serialNumber'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "value" },
        'data-testid': (__VLS_ctx.qa('dashboard-system-info-serial-number-value')),
    });
    (__VLS_ctx.systemInfo.SerialNumber);
}
/** @type {__VLS_StyleScopedClasses['system-info']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['info-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
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
