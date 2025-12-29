import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import SshServerManagement from './ssh/SshServerManagement.vue';
import SshPublicKeyManagement from './ssh/SshPublicKeyManagement.vue';
import SshCurrentSessions from './ssh/SshCurrentSessions.vue';
import { useQA } from '../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const activeTab = ref('server');
// 使用 computed 來動態生成 tabs,這樣在語言改變時會自動更新
const tabs = computed(() => [
    { id: 'server', label: t('ssh.serverManagement') },
    { id: 'key', label: t('ssh.publicKeyManagement') },
    { id: 'sessions', label: t('ssh.currentSessions') }
]);
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
    'data-testid': (__VLS_ctx.qa('ssh-title')),
});
(__VLS_ctx.t('ssh.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('ssh-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-section" },
    'data-testid': (__VLS_ctx.qa('ssh-panel')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tab-navigation" },
    'data-testid': (__VLS_ctx.qa('ssh-tabs')),
});
for (const [tab] of __VLS_getVForSourceType((__VLS_ctx.tabs))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.activeTab = tab.id;
            } },
        key: (tab.id),
        ...{ class: "tab-button" },
        ...{ class: ({ active: __VLS_ctx.activeTab === tab.id }) },
        'data-testid': (__VLS_ctx.qa(`ssh-tab-${tab.id}`)),
    });
    (tab.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tab-content" },
    'data-testid': (__VLS_ctx.qa('ssh-tab-content')),
});
if (__VLS_ctx.activeTab === 'server') {
    /** @type {[typeof SshServerManagement, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(SshServerManagement, new SshServerManagement({
        dataTestid: (__VLS_ctx.qa('ssh-server-management')),
    }));
    const __VLS_1 = __VLS_0({
        dataTestid: (__VLS_ctx.qa('ssh-server-management')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
if (__VLS_ctx.activeTab === 'key') {
    /** @type {[typeof SshPublicKeyManagement, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(SshPublicKeyManagement, new SshPublicKeyManagement({
        dataTestid: (__VLS_ctx.qa('ssh-public-key-management')),
    }));
    const __VLS_4 = __VLS_3({
        dataTestid: (__VLS_ctx.qa('ssh-public-key-management')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
}
if (__VLS_ctx.activeTab === 'sessions') {
    /** @type {[typeof SshCurrentSessions, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(SshCurrentSessions, new SshCurrentSessions({
        dataTestid: (__VLS_ctx.qa('ssh-current-sessions')),
    }));
    const __VLS_7 = __VLS_6({
        dataTestid: (__VLS_ctx.qa('ssh-current-sessions')),
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
            SshServerManagement: SshServerManagement,
            SshPublicKeyManagement: SshPublicKeyManagement,
            SshCurrentSessions: SshCurrentSessions,
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
