const __VLS_props = defineProps();
const getSeverityClass = (severity) => {
    const severityLower = severity.toLowerCase();
    if (severityLower.includes('error'))
        return 'severity-error';
    if (severityLower.includes('warning') || severityLower.includes('warn'))
        return 'severity-warning';
    if (severityLower.includes('info'))
        return 'severity-info';
    return 'severity-default';
};
const formatTimestamp = (ts) => {
    return ts.replace(/^\d{4}\s+/, '');
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['log-table']} */ ;
/** @type {__VLS_StyleScopedClasses['log-table']} */ ;
/** @type {__VLS_StyleScopedClasses['log-table']} */ ;
/** @type {__VLS_StyleScopedClasses['log-table']} */ ;
/** @type {__VLS_StyleScopedClasses['log-table']} */ ;
/** @type {__VLS_StyleScopedClasses['log-table']} */ ;
/** @type {__VLS_StyleScopedClasses['col-timestamp']} */ ;
/** @type {__VLS_StyleScopedClasses['col-severity']} */ ;
/** @type {__VLS_StyleScopedClasses['col-module']} */ ;
/** @type {__VLS_StyleScopedClasses['col-process']} */ ;
/** @type {__VLS_StyleScopedClasses['log-header']} */ ;
/** @type {__VLS_StyleScopedClasses['log-info']} */ ;
/** @type {__VLS_StyleScopedClasses['log-table']} */ ;
/** @type {__VLS_StyleScopedClasses['log-table']} */ ;
/** @type {__VLS_StyleScopedClasses['log-table']} */ ;
/** @type {__VLS_StyleScopedClasses['log-table']} */ ;
/** @type {__VLS_StyleScopedClasses['log-table']} */ ;
/** @type {__VLS_StyleScopedClasses['log-table']} */ ;
/** @type {__VLS_StyleScopedClasses['log-table']} */ ;
/** @type {__VLS_StyleScopedClasses['log-table']} */ ;
/** @type {__VLS_StyleScopedClasses['col-timestamp']} */ ;
/** @type {__VLS_StyleScopedClasses['col-severity']} */ ;
/** @type {__VLS_StyleScopedClasses['col-module']} */ ;
/** @type {__VLS_StyleScopedClasses['col-process']} */ ;
/** @type {__VLS_StyleScopedClasses['col-message']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "log-viewer" },
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-spinner" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
}
else if (__VLS_ctx.entries.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "empty-state" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "log-container" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "log-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "log-title" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "log-count" },
    });
    (__VLS_ctx.showCount);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "log-info" },
    });
    if (__VLS_ctx.hasMore) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "more-indicator" },
        });
    }
    if (__VLS_ctx.serverTime) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "server-time" },
        });
        (__VLS_ctx.serverTime);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-wrapper" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
        ...{ class: "log-table" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ class: "col-timestamp" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ class: "col-severity" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ class: "col-module" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ class: "col-process" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ class: "col-message" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [entry, index] of __VLS_getVForSourceType((__VLS_ctx.entries))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: (index),
            ...{ class: "log-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            ...{ class: "col-timestamp" },
        });
        (__VLS_ctx.formatTimestamp(entry.ts));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            ...{ class: "col-severity" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "severity-badge" },
            ...{ class: (__VLS_ctx.getSeverityClass(entry.severity)) },
        });
        (entry.severity);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            ...{ class: "col-module" },
        });
        (entry.module || '-');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            ...{ class: "col-process" },
        });
        (entry.program);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            ...{ class: "col-message" },
        });
        (entry.message);
    }
}
/** @type {__VLS_StyleScopedClasses['log-viewer']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
/** @type {__VLS_StyleScopedClasses['log-container']} */ ;
/** @type {__VLS_StyleScopedClasses['log-header']} */ ;
/** @type {__VLS_StyleScopedClasses['log-title']} */ ;
/** @type {__VLS_StyleScopedClasses['log-count']} */ ;
/** @type {__VLS_StyleScopedClasses['log-info']} */ ;
/** @type {__VLS_StyleScopedClasses['more-indicator']} */ ;
/** @type {__VLS_StyleScopedClasses['server-time']} */ ;
/** @type {__VLS_StyleScopedClasses['table-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['log-table']} */ ;
/** @type {__VLS_StyleScopedClasses['col-timestamp']} */ ;
/** @type {__VLS_StyleScopedClasses['col-severity']} */ ;
/** @type {__VLS_StyleScopedClasses['col-module']} */ ;
/** @type {__VLS_StyleScopedClasses['col-process']} */ ;
/** @type {__VLS_StyleScopedClasses['col-message']} */ ;
/** @type {__VLS_StyleScopedClasses['log-row']} */ ;
/** @type {__VLS_StyleScopedClasses['col-timestamp']} */ ;
/** @type {__VLS_StyleScopedClasses['col-severity']} */ ;
/** @type {__VLS_StyleScopedClasses['severity-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['col-module']} */ ;
/** @type {__VLS_StyleScopedClasses['col-process']} */ ;
/** @type {__VLS_StyleScopedClasses['col-message']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            getSeverityClass: getSeverityClass,
            formatTimestamp: formatTimestamp,
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
