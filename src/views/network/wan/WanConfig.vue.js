import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import WanModeSetup from './WanModeSetup.vue';
import WanModeManagement from './WanModeManagement.vue';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const activeTab = ref('setup');
const tabs = computed(() => [
    { id: 'setup', label: t('wanSetup.modeSetup') },
    { id: 'management', label: t('wanSetup.modeManagement') }
]);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
    'data-testid': (__VLS_ctx.qa('wan-settings-title')),
});
(__VLS_ctx.t('wanSetup.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('wan-settings-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-section" },
    'data-testid': (__VLS_ctx.qa('wan-settings-panel')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tab-navigation" },
    'data-testid': (__VLS_ctx.qa('wan-settings-tabs')),
});
for (const [tab] of __VLS_getVForSourceType((__VLS_ctx.tabs))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.activeTab = tab.id;
            } },
        key: (tab.id),
        ...{ class: "tab-button" },
        ...{ class: ({ active: __VLS_ctx.activeTab === tab.id }) },
        'data-testid': (__VLS_ctx.qa(`wan-settings-tab-${tab.id}`)),
    });
    (tab.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tab-content" },
    'data-testid': (__VLS_ctx.qa('wan-settings-tab-content')),
});
if (__VLS_ctx.activeTab === 'setup') {
    /** @type {[typeof WanModeSetup, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(WanModeSetup, new WanModeSetup({
        dataTestid: (__VLS_ctx.qa('wan-mode-setup')),
    }));
    const __VLS_1 = __VLS_0({
        dataTestid: (__VLS_ctx.qa('wan-mode-setup')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
if (__VLS_ctx.activeTab === 'management') {
    /** @type {[typeof WanModeManagement, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(WanModeManagement, new WanModeManagement({
        dataTestid: (__VLS_ctx.qa('wan-mode-management')),
    }));
    const __VLS_4 = __VLS_3({
        dataTestid: (__VLS_ctx.qa('wan-mode-management')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
}
/** @type {__VLS_StyleScopedClasses['page-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-navigation']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-button']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-content']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            WanModeSetup: WanModeSetup,
            WanModeManagement: WanModeManagement,
            qa: qa,
            t: t,
            activeTab: activeTab,
            tabs: tabs,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
