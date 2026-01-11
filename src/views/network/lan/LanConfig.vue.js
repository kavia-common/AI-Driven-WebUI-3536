import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import IPv4Configuration from './IPv4Config.vue';
import DeviceConnected from './DeviceList.vue';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const activeTab = ref('ipv4');
const tabs = computed(() => [
    { id: 'ipv4', label: t('lanBasic.ipv4Configuration') },
    { id: 'devices', label: t('lanBasic.deviceConnected') }
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
    'data-testid': (__VLS_ctx.qa('lan-settings-title')),
});
(__VLS_ctx.t('lanBasic.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('lan-settings-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-section" },
    'data-testid': (__VLS_ctx.qa('lan-settings-panel')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tab-navigation" },
    'data-testid': (__VLS_ctx.qa('lan-settings-tabs')),
});
for (const [tab] of __VLS_getVForSourceType((__VLS_ctx.tabs))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.activeTab = tab.id;
            } },
        key: (tab.id),
        ...{ class: "tab-button" },
        ...{ class: ({ active: __VLS_ctx.activeTab === tab.id }) },
        'data-testid': (__VLS_ctx.qa(`lan-settings-tab-${tab.id}`)),
    });
    (tab.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tab-content" },
    'data-testid': (__VLS_ctx.qa('lan-settings-tab-content')),
});
if (__VLS_ctx.activeTab === 'ipv4') {
    /** @type {[typeof IPv4Configuration, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(IPv4Configuration, new IPv4Configuration({
        dataTestid: (__VLS_ctx.qa('lan-ipv4-config')),
    }));
    const __VLS_1 = __VLS_0({
        dataTestid: (__VLS_ctx.qa('lan-ipv4-config')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
if (__VLS_ctx.activeTab === 'devices') {
    /** @type {[typeof DeviceConnected, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(DeviceConnected, new DeviceConnected({
        dataTestid: (__VLS_ctx.qa('lan-device-connected')),
    }));
    const __VLS_4 = __VLS_3({
        dataTestid: (__VLS_ctx.qa('lan-device-connected')),
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
            IPv4Configuration: IPv4Configuration,
            DeviceConnected: DeviceConnected,
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
