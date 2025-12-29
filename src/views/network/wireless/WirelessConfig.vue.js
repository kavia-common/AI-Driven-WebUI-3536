import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import WirelessBasicConfig from './BasicConfig.vue';
import WirelessAdvancedConfig from './AdvancedConfig.vue';
import WirelessWpsConfig from './WpsConfig.vue';
import WirelessMeshConfig from './MeshConfig.vue';
import WirelessExtenderTab from './ExtenderConfig.vue';
import GuestNetworkTab from './GuestNetwork.vue';
import TabInProgress from '../../../components/TabInProgress.vue';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const activeTab = ref('basic');
// 檢查是否啟用開發者模式（通過 URL 參數）
const isDeveloperMode = computed(() => {
    return route.query.dev === 'true' || sessionStorage.getItem('wirelessDevMode') === 'true';
});
// 如果 URL 有 dev=true，保存到 sessionStorage
watch(() => route.query.dev, (newValue) => {
    if (newValue === 'true') {
        sessionStorage.setItem('wirelessDevMode', 'true');
    }
}, { immediate: true });
// 使用 computed 來動態生成 tabs,這樣在語言改變時會自動更新
const tabs = computed(() => {
    const baseTabs = [
        { id: 'basic', label: t('wireless.basicConfig') },
        { id: 'advanced', label: t('wireless.advancedConfig') },
        { id: 'wps', label: t('wireless.wpsConfig') },
        { id: 'mesh', label: t('wireless.meshNetwork') }
    ];
    // 只有在開發者模式下才顯示這些 tab
    if (isDeveloperMode.value) {
        baseTabs.push({ id: 'guest', label: t('guest.title') }, { id: 'wlan', label: t('wireless.wlanExtender') });
    }
    baseTabs.push({ id: 'zones', label: t('wireless.wifiZones') });
    return baseTabs;
});
// 監聽路由參數變化來設定活動分頁
watch(() => route.query.tab, (newTab) => {
    if (newTab && typeof newTab === 'string' && tabs.value.some(tab => tab.id === newTab)) {
        activeTab.value = newTab;
    }
}, { immediate: true });
// 當分頁改變時更新 URL 參數
const handleTabChange = (tabId) => {
    activeTab.value = tabId;
    router.replace({
        path: route.path,
        query: { ...route.query, tab: tabId }
    });
};
// 初始化時檢查 URL 參數
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
    'data-testid': (__VLS_ctx.qa('wireless-title')),
});
(__VLS_ctx.t('wireless.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('wireless-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-section" },
    'data-testid': (__VLS_ctx.qa('wireless-panel')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tab-navigation" },
    'data-testid': (__VLS_ctx.qa('wireless-tabs')),
});
for (const [tab] of __VLS_getVForSourceType((__VLS_ctx.tabs))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.handleTabChange(tab.id);
            } },
        key: (tab.id),
        ...{ class: "tab-button" },
        ...{ class: ({ active: __VLS_ctx.activeTab === tab.id }) },
        'data-testid': (__VLS_ctx.qa(`wireless-tab-${tab.id}`)),
    });
    (tab.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tab-content" },
    'data-testid': (__VLS_ctx.qa('wireless-tab-content')),
});
if (__VLS_ctx.activeTab === 'basic') {
    /** @type {[typeof WirelessBasicConfig, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(WirelessBasicConfig, new WirelessBasicConfig({
        dataTestid: (__VLS_ctx.qa('wireless-basic-config')),
    }));
    const __VLS_1 = __VLS_0({
        dataTestid: (__VLS_ctx.qa('wireless-basic-config')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
if (__VLS_ctx.activeTab === 'advanced') {
    /** @type {[typeof WirelessAdvancedConfig, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(WirelessAdvancedConfig, new WirelessAdvancedConfig({
        dataTestid: (__VLS_ctx.qa('wireless-advanced-config')),
    }));
    const __VLS_4 = __VLS_3({
        dataTestid: (__VLS_ctx.qa('wireless-advanced-config')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
}
if (__VLS_ctx.activeTab === 'wps') {
    /** @type {[typeof WirelessWpsConfig, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(WirelessWpsConfig, new WirelessWpsConfig({
        dataTestid: (__VLS_ctx.qa('wireless-wps-config')),
    }));
    const __VLS_7 = __VLS_6({
        dataTestid: (__VLS_ctx.qa('wireless-wps-config')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
}
if (__VLS_ctx.activeTab === 'mesh') {
    /** @type {[typeof WirelessMeshConfig, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(WirelessMeshConfig, new WirelessMeshConfig({
        dataTestid: (__VLS_ctx.qa('wireless-mesh-config')),
    }));
    const __VLS_10 = __VLS_9({
        dataTestid: (__VLS_ctx.qa('wireless-mesh-config')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
}
if (__VLS_ctx.activeTab === 'guest' && __VLS_ctx.isDeveloperMode) {
    /** @type {[typeof GuestNetworkTab, ]} */ ;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(GuestNetworkTab, new GuestNetworkTab({
        dataTestid: (__VLS_ctx.qa('wireless-guest-network')),
    }));
    const __VLS_13 = __VLS_12({
        dataTestid: (__VLS_ctx.qa('wireless-guest-network')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
}
if (__VLS_ctx.activeTab === 'wlan' && __VLS_ctx.isDeveloperMode) {
    /** @type {[typeof WirelessExtenderTab, ]} */ ;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent(WirelessExtenderTab, new WirelessExtenderTab({
        dataTestid: (__VLS_ctx.qa('wireless-wlan-extender')),
    }));
    const __VLS_16 = __VLS_15({
        dataTestid: (__VLS_ctx.qa('wireless-wlan-extender')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
}
if (__VLS_ctx.activeTab === 'zones') {
    /** @type {[typeof TabInProgress, ]} */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(TabInProgress, new TabInProgress({
        dataTestid: (__VLS_ctx.qa('wireless-wifi-zones')),
    }));
    const __VLS_19 = __VLS_18({
        dataTestid: (__VLS_ctx.qa('wireless-wifi-zones')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
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
            WirelessBasicConfig: WirelessBasicConfig,
            WirelessAdvancedConfig: WirelessAdvancedConfig,
            WirelessWpsConfig: WirelessWpsConfig,
            WirelessMeshConfig: WirelessMeshConfig,
            WirelessExtenderTab: WirelessExtenderTab,
            GuestNetworkTab: GuestNetworkTab,
            TabInProgress: TabInProgress,
            qa: qa,
            t: t,
            activeTab: activeTab,
            isDeveloperMode: isDeveloperMode,
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
