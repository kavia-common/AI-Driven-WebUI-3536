import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import GuestWiFi from './guest/GuestWiFi.vue';
import GuestLAN from './guest/GuestLAN.vue';
import GuestDeviceConnected from './guest/GuestDeviceConnected.vue';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const activeTab = ref('wifi');
// Use computed to dynamically generate tabs
const tabs = computed(() => [
    { id: 'wifi', label: t('guest.guestWiFi') },
    { id: 'lan', label: t('guest.guestLAN') },
    { id: 'devices', label: t('guest.deviceConnected') }
]);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('guest-access-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-section" },
    'data-testid': (__VLS_ctx.qa('guest-access-panel')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tab-navigation" },
    'data-testid': (__VLS_ctx.qa('guest-access-tabs')),
});
for (const [tab] of __VLS_getVForSourceType((__VLS_ctx.tabs))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.activeTab = tab.id;
            } },
        key: (tab.id),
        ...{ class: "tab-button" },
        ...{ class: ({ active: __VLS_ctx.activeTab === tab.id }) },
        'data-testid': (__VLS_ctx.qa(`guest-access-tab-${tab.id}`)),
    });
    (tab.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tab-content" },
    'data-testid': (__VLS_ctx.qa('guest-access-tab-content')),
});
if (__VLS_ctx.activeTab === 'wifi') {
    /** @type {[typeof GuestWiFi, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(GuestWiFi, new GuestWiFi({
        dataTestid: (__VLS_ctx.qa('guest-wifi')),
    }));
    const __VLS_1 = __VLS_0({
        dataTestid: (__VLS_ctx.qa('guest-wifi')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
if (__VLS_ctx.activeTab === 'lan') {
    /** @type {[typeof GuestLAN, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(GuestLAN, new GuestLAN({
        dataTestid: (__VLS_ctx.qa('guest-lan')),
    }));
    const __VLS_4 = __VLS_3({
        dataTestid: (__VLS_ctx.qa('guest-lan')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
}
if (__VLS_ctx.activeTab === 'devices') {
    /** @type {[typeof GuestDeviceConnected, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(GuestDeviceConnected, new GuestDeviceConnected({
        dataTestid: (__VLS_ctx.qa('guest-device-connected')),
    }));
    const __VLS_7 = __VLS_6({
        dataTestid: (__VLS_ctx.qa('guest-device-connected')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
}
/** @type {__VLS_StyleScopedClasses['page-container']} */ ;
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-navigation']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-button']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-content']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            GuestWiFi: GuestWiFi,
            GuestLAN: GuestLAN,
            GuestDeviceConnected: GuestDeviceConnected,
            qa: qa,
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
