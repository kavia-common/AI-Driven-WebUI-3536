import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import PingTool from './PingTool.vue';
import TraceRouteTool from './TraceRouteTool.vue';
import DNSLookupTool from './DNSLookupTool.vue';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const activeTab = ref('ping');
const tabs = computed(() => [
    { id: 'ping', label: t('diagnostics.ping') },
    { id: 'traceroute', label: t('diagnostics.traceRoute') },
    { id: 'dnslookup', label: t('diagnostics.dnsLookup') }
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
    'data-testid': (__VLS_ctx.qa('diagnostics-title')),
});
(__VLS_ctx.t('diagnostics.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('diagnostics-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-section" },
    'data-testid': (__VLS_ctx.qa('diagnostics-panel')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tab-navigation" },
    'data-testid': (__VLS_ctx.qa('diagnostics-tabs')),
});
for (const [tab] of __VLS_getVForSourceType((__VLS_ctx.tabs))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.activeTab = tab.id;
            } },
        key: (tab.id),
        ...{ class: "tab-button" },
        ...{ class: ({ active: __VLS_ctx.activeTab === tab.id }) },
        'data-testid': (__VLS_ctx.qa(`diagnostics-tab-${tab.id}`)),
    });
    (tab.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tab-content" },
    'data-testid': (__VLS_ctx.qa('diagnostics-tab-content')),
});
if (__VLS_ctx.activeTab === 'ping') {
    /** @type {[typeof PingTool, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(PingTool, new PingTool({
        dataTestid: (__VLS_ctx.qa('diagnostics-ping-tool')),
    }));
    const __VLS_1 = __VLS_0({
        dataTestid: (__VLS_ctx.qa('diagnostics-ping-tool')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
if (__VLS_ctx.activeTab === 'traceroute') {
    /** @type {[typeof TraceRouteTool, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(TraceRouteTool, new TraceRouteTool({
        dataTestid: (__VLS_ctx.qa('diagnostics-traceroute-tool')),
    }));
    const __VLS_4 = __VLS_3({
        dataTestid: (__VLS_ctx.qa('diagnostics-traceroute-tool')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
}
if (__VLS_ctx.activeTab === 'dnslookup') {
    /** @type {[typeof DNSLookupTool, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(DNSLookupTool, new DNSLookupTool({
        dataTestid: (__VLS_ctx.qa('diagnostics-dnslookup-tool')),
    }));
    const __VLS_7 = __VLS_6({
        dataTestid: (__VLS_ctx.qa('diagnostics-dnslookup-tool')),
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
            PingTool: PingTool,
            TraceRouteTool: TraceRouteTool,
            DNSLookupTool: DNSLookupTool,
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
