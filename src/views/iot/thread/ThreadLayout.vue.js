import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import ThreadStatus from './ThreadStatus.vue';
import ThreadConfiguration from './ThreadConfiguration.vue';
import ThreadJoin from './ThreadJoin.vue';
import ThreadCommissioner from './ThreadCommissioner.vue';
import ThreadTopology from './ThreadTopology.vue';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const activeTab = ref('status');
// Tab navigation
const tabs = computed(() => [
    { id: 'status', label: t('thread.status') },
    { id: 'configuration', label: t('thread.configuration') },
    { id: 'join', label: t('thread.join') },
    { id: 'commissioner', label: t('thread.commissioner') },
    { id: 'topology', label: t('thread.topology') }
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
    'data-testid': (__VLS_ctx.qa('thread-title')),
});
(__VLS_ctx.t('thread.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('thread-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-section" },
    'data-testid': (__VLS_ctx.qa('thread-panel')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tab-navigation" },
    'data-testid': (__VLS_ctx.qa('thread-tabs')),
});
for (const [tab] of __VLS_getVForSourceType((__VLS_ctx.tabs))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.activeTab = tab.id;
            } },
        key: (tab.id),
        ...{ class: "tab-button" },
        ...{ class: ({ active: __VLS_ctx.activeTab === tab.id }) },
        'data-testid': (__VLS_ctx.qa(`thread-tab-${tab.id}`)),
    });
    (tab.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tab-content" },
    'data-testid': (__VLS_ctx.qa('thread-tab-content')),
});
if (__VLS_ctx.activeTab === 'status') {
    /** @type {[typeof ThreadStatus, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(ThreadStatus, new ThreadStatus({
        dataTestid: (__VLS_ctx.qa('thread-status')),
    }));
    const __VLS_1 = __VLS_0({
        dataTestid: (__VLS_ctx.qa('thread-status')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
if (__VLS_ctx.activeTab === 'configuration') {
    /** @type {[typeof ThreadConfiguration, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(ThreadConfiguration, new ThreadConfiguration({
        dataTestid: (__VLS_ctx.qa('thread-configuration')),
    }));
    const __VLS_4 = __VLS_3({
        dataTestid: (__VLS_ctx.qa('thread-configuration')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
}
if (__VLS_ctx.activeTab === 'join') {
    /** @type {[typeof ThreadJoin, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(ThreadJoin, new ThreadJoin({
        dataTestid: (__VLS_ctx.qa('thread-join')),
    }));
    const __VLS_7 = __VLS_6({
        dataTestid: (__VLS_ctx.qa('thread-join')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
}
if (__VLS_ctx.activeTab === 'commissioner') {
    /** @type {[typeof ThreadCommissioner, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(ThreadCommissioner, new ThreadCommissioner({
        dataTestid: (__VLS_ctx.qa('thread-commissioner')),
    }));
    const __VLS_10 = __VLS_9({
        dataTestid: (__VLS_ctx.qa('thread-commissioner')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
}
if (__VLS_ctx.activeTab === 'topology') {
    /** @type {[typeof ThreadTopology, ]} */ ;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(ThreadTopology, new ThreadTopology({
        dataTestid: (__VLS_ctx.qa('thread-topology')),
    }));
    const __VLS_13 = __VLS_12({
        dataTestid: (__VLS_ctx.qa('thread-topology')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
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
            ThreadStatus: ThreadStatus,
            ThreadConfiguration: ThreadConfiguration,
            ThreadJoin: ThreadJoin,
            ThreadCommissioner: ThreadCommissioner,
            ThreadTopology: ThreadTopology,
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
