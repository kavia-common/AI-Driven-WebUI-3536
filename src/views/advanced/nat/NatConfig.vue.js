import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import PortForwardingTab from './PortForwardingTab.vue';
import DmzHostTab from './DmzHostTab.vue';
import TabInProgress from '../../../components/TabInProgress.vue';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const activeTab = ref('portforwarding');
const tabs = computed(() => [
    { id: 'portforwarding', label: t('nat.portForwarding') },
    { id: 'dmz', label: t('nat.dmzHost') },
    { id: 'alg', label: t('nat.alg') }
]);
watch(() => route.query.tab, (newTab) => {
    if (newTab && typeof newTab === 'string' && tabs.value.some(tab => tab.id === newTab)) {
        activeTab.value = newTab;
    }
}, { immediate: true });
const handleTabChange = (tabId) => {
    activeTab.value = tabId;
    router.replace({
        path: route.path,
        query: { ...route.query, tab: tabId }
    });
};
onMounted(() => {
    const tabFromQuery = route.query.tab;
    if (tabFromQuery && typeof tabFromQuery === 'string' && tabs.value.some(tab => tab.id === tabFromQuery)) {
        activeTab.value = tabFromQuery;
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
    'data-testid': (__VLS_ctx.qa('nat-title')),
});
(__VLS_ctx.t('nat.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('nat-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-section" },
    'data-testid': (__VLS_ctx.qa('nat-panel')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tab-navigation" },
    'data-testid': (__VLS_ctx.qa('nat-tabs')),
});
for (const [tab] of __VLS_getVForSourceType((__VLS_ctx.tabs))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.handleTabChange(tab.id);
            } },
        key: (tab.id),
        ...{ class: "tab-button" },
        ...{ class: ({ active: __VLS_ctx.activeTab === tab.id }) },
        'data-testid': (__VLS_ctx.qa(`nat-tab-${tab.id}`)),
    });
    (tab.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tab-content" },
    'data-testid': (__VLS_ctx.qa('nat-tab-content')),
});
if (__VLS_ctx.activeTab === 'portforwarding') {
    /** @type {[typeof PortForwardingTab, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(PortForwardingTab, new PortForwardingTab({
        dataTestid: (__VLS_ctx.qa('nat-portforwarding')),
    }));
    const __VLS_1 = __VLS_0({
        dataTestid: (__VLS_ctx.qa('nat-portforwarding')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
if (__VLS_ctx.activeTab === 'dmz') {
    /** @type {[typeof DmzHostTab, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(DmzHostTab, new DmzHostTab({
        dataTestid: (__VLS_ctx.qa('nat-dmz')),
    }));
    const __VLS_4 = __VLS_3({
        dataTestid: (__VLS_ctx.qa('nat-dmz')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
}
if (__VLS_ctx.activeTab === 'alg') {
    /** @type {[typeof TabInProgress, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(TabInProgress, new TabInProgress({
        dataTestid: (__VLS_ctx.qa('nat-alg')),
    }));
    const __VLS_7 = __VLS_6({
        dataTestid: (__VLS_ctx.qa('nat-alg')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
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
            PortForwardingTab: PortForwardingTab,
            DmzHostTab: DmzHostTab,
            TabInProgress: TabInProgress,
            qa: qa,
            t: t,
            activeTab: activeTab,
            tabs: tabs,
            handleTabChange: handleTabChange,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
