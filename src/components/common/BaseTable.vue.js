import { computed, ref } from 'vue';
const props = withDefaults(defineProps(), {
    hover: false,
    striped: false,
    bordered: false,
    compact: false,
    responsive: true,
    emptyText: 'No data available',
    rowKey: 'id',
});
const sortKey = ref('');
const sortOrder = ref('asc');
const tableClasses = computed(() => {
    const classes = ['table'];
    if (props.hover)
        classes.push('table-hover');
    if (props.striped)
        classes.push('table-striped');
    if (props.bordered)
        classes.push('table-bordered');
    if (props.compact)
        classes.push('table-compact');
    if (sortKey.value)
        classes.push('table-sortable');
    return classes;
});
const sortedData = computed(() => {
    if (!sortKey.value) {
        return props.data;
    }
    return [...props.data].sort((a, b) => {
        const aVal = getCellValue(a, sortKey.value);
        const bVal = getCellValue(b, sortKey.value);
        let comparison = 0;
        if (aVal > bVal)
            comparison = 1;
        if (aVal < bVal)
            comparison = -1;
        return sortOrder.value === 'asc' ? comparison : -comparison;
    });
});
const handleSort = (key) => {
    if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    }
    else {
        sortKey.value = key;
        sortOrder.value = 'asc';
    }
};
const getCellValue = (row, key) => {
    return key.split('.').reduce((obj, k) => obj?.[k], row) ?? '';
};
const getColumnClass = (column) => {
    const classes = [];
    if (column.align) {
        classes.push(`text-${column.align}`);
    }
    if (column.sortable) {
        classes.push('cursor-pointer');
    }
    if (sortKey.value === column.key) {
        classes.push('sorted');
    }
    return classes;
};
const getRowKey = (row, index) => {
    return row[props.rowKey] ?? index;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    hover: false,
    striped: false,
    bordered: false,
    compact: false,
    responsive: true,
    emptyText: 'No data available',
    rowKey: 'id',
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['table-sort-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['table-sortable']} */ ;
/** @type {__VLS_StyleScopedClasses['table-sort-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-cards']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "table-wrapper" },
});
if (__VLS_ctx.$slots.header || __VLS_ctx.title) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-header-actions" },
    });
    var __VLS_0 = {};
    if (__VLS_ctx.title) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
            ...{ class: "table-header-title" },
        });
        (__VLS_ctx.title);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-header-controls" },
    });
    var __VLS_2 = {};
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "table-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
    ...{ class: (__VLS_ctx.tableClasses) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
for (const [column] of __VLS_getVForSourceType((__VLS_ctx.columns))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ onClick: (...[$event]) => {
                column.sortable ? __VLS_ctx.handleSort(column.key) : null;
            } },
        key: (column.key),
        ...{ class: (__VLS_ctx.getColumnClass(column)) },
    });
    (column.label);
    if (column.sortable) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "table-sort-icon" },
        });
        (__VLS_ctx.sortKey === column.key ? (__VLS_ctx.sortOrder === 'asc' ? '↑' : '↓') : '↕');
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
if (__VLS_ctx.sortedData.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        colspan: (__VLS_ctx.columns.length),
        ...{ class: "table-empty" },
    });
    var __VLS_4 = {};
    (__VLS_ctx.emptyText);
}
for (const [row, index] of __VLS_getVForSourceType((__VLS_ctx.sortedData))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
        key: (__VLS_ctx.getRowKey(row, index)),
    });
    for (const [column] of __VLS_getVForSourceType((__VLS_ctx.columns))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            key: (column.key),
            ...{ class: (__VLS_ctx.getColumnClass(column)) },
        });
        var __VLS_6 = {
            row: (row),
            column: (column),
            index: (index),
        };
        var __VLS_7 = __VLS_tryAsConstant(`cell-${column.key}`);
        (__VLS_ctx.getCellValue(row, column.key));
    }
}
if (__VLS_ctx.responsive) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mobile-cards" },
    });
    if (__VLS_ctx.sortedData.length === 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "table-empty" },
        });
        var __VLS_10 = {};
        (__VLS_ctx.emptyText);
    }
    else {
        for (const [row, index] of __VLS_getVForSourceType((__VLS_ctx.sortedData))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                key: (__VLS_ctx.getRowKey(row, index)),
                ...{ class: "table-card" },
            });
            for (const [column] of __VLS_getVForSourceType((__VLS_ctx.columns))) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    key: (column.key),
                    ...{ class: "card-row" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-label" },
                });
                (column.label);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-value" },
                });
                var __VLS_12 = {
                    row: (row),
                    column: (column),
                    index: (index),
                };
                var __VLS_13 = __VLS_tryAsConstant(`cell-${column.key}`);
                (__VLS_ctx.getCellValue(row, column.key));
            }
        }
    }
}
/** @type {__VLS_StyleScopedClasses['table-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['table-header-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['table-header-title']} */ ;
/** @type {__VLS_StyleScopedClasses['table-header-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['table-sort-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['table-empty']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['table-empty']} */ ;
/** @type {__VLS_StyleScopedClasses['table-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_3 = __VLS_2, __VLS_5 = __VLS_4, __VLS_8 = __VLS_7, __VLS_9 = __VLS_6, __VLS_11 = __VLS_10, __VLS_14 = __VLS_13, __VLS_15 = __VLS_12;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            sortKey: sortKey,
            sortOrder: sortOrder,
            tableClasses: tableClasses,
            sortedData: sortedData,
            handleSort: handleSort,
            getCellValue: getCellValue,
            getColumnClass: getColumnClass,
            getRowKey: getRowKey,
        };
    },
    __typeProps: {},
    props: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
    props: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
