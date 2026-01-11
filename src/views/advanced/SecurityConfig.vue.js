import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import IpFilteringTab from './security/IpFilteringTab.vue';
import MacFilteringTab from './security/MacFilteringTab.vue';
import GeneralMacFilteringTab from './security/GeneralMacFilteringTab.vue';
import { useQA } from '../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const activeTab = ref('ipfiltering');
const isDevMode = computed(() => route.query.dev === 'true');
const tabs = computed(() => {
    const baseTabs = [
        { id: 'ipfiltering', label: t('menu.ipFiltering') },
        { id: 'general-macfiltering', label: t('menu.generalMacFiltering') }
    ];
    if (isDevMode.value) {
        baseTabs.push({ id: 'wifi-macfiltering', label: t('menu.wifiMacFiltering') });
    }
    return baseTabs;
});
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
    'data-testid': (__VLS_ctx.qa('security-title')),
});
(__VLS_ctx.t('menu.security'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('security-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-section" },
    'data-testid': (__VLS_ctx.qa('security-panel')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tab-navigation" },
    'data-testid': (__VLS_ctx.qa('security-tabs')),
});
for (const [tab] of __VLS_getVForSourceType((__VLS_ctx.tabs))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.handleTabChange(tab.id);
            } },
        key: (tab.id),
        ...{ class: "tab-button" },
        ...{ class: ({ active: __VLS_ctx.activeTab === tab.id }) },
        'data-testid': (__VLS_ctx.qa(`security-tab-${tab.id}`)),
    });
    (tab.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tab-content" },
    'data-testid': (__VLS_ctx.qa('security-tab-content')),
});
if (__VLS_ctx.activeTab === 'ipfiltering') {
    /** @type {[typeof IpFilteringTab, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(IpFilteringTab, new IpFilteringTab({
        dataTestid: (__VLS_ctx.qa('security-ipfiltering-content')),
    }));
    const __VLS_1 = __VLS_0({
        dataTestid: (__VLS_ctx.qa('security-ipfiltering-content')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
if (__VLS_ctx.activeTab === 'general-macfiltering') {
    /** @type {[typeof GeneralMacFilteringTab, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(GeneralMacFilteringTab, new GeneralMacFilteringTab({
        dataTestid: (__VLS_ctx.qa('security-general-macfiltering-content')),
    }));
    const __VLS_4 = __VLS_3({
        dataTestid: (__VLS_ctx.qa('security-general-macfiltering-content')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
}
if (__VLS_ctx.activeTab === 'wifi-macfiltering' && __VLS_ctx.isDevMode) {
    /** @type {[typeof MacFilteringTab, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(MacFilteringTab, new MacFilteringTab({
        dataTestid: (__VLS_ctx.qa('security-wifi-macfiltering-content')),
    }));
    const __VLS_7 = __VLS_6({
        dataTestid: (__VLS_ctx.qa('security-wifi-macfiltering-content')),
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
            IpFilteringTab: IpFilteringTab,
            MacFilteringTab: MacFilteringTab,
            GeneralMacFilteringTab: GeneralMacFilteringTab,
            qa: qa,
            t: t,
            activeTab: activeTab,
            isDevMode: isDevMode,
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
