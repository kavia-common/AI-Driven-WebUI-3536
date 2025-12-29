import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getSystemLog, exportLogs } from '../../services/api/log';
import LogViewer from '../../components/log/LogViewer.vue';
import { useQA } from '../../utils/qa';
const { qa } = useQA();
const { t } = useI18n();
const loading = ref(false);
const error = ref(null);
const logEntries = ref([]);
const matchCount = ref(0);
const hasMore = ref(false);
const serverTime = ref('');
const logSource = ref('');
const selectedCategories = ref(new Set(['all']));
const selectedSeverity = ref('All');
const searchKeyword = ref('');
const limitValue = ref(100);
const availableCategories = [
    'all',
    'dhcp',
    'lcm',
    'wifi',
    'firewall'
];
const availableSeverities = ['All', 'Error', 'Warning', 'Info'];
const toggleCategory = (category) => {
    if (category === 'all') {
        selectedCategories.value.clear();
        selectedCategories.value.add('all');
    }
    else {
        selectedCategories.value.delete('all');
        if (selectedCategories.value.has(category)) {
            selectedCategories.value.delete(category);
        }
        else {
            selectedCategories.value.add(category);
        }
        if (selectedCategories.value.size === 0) {
            selectedCategories.value.add('all');
        }
    }
};
const filteredEntries = computed(() => {
    let filtered = [...logEntries.value];
    if (selectedSeverity.value !== 'All') {
        filtered = filtered.filter(entry => entry.severity.toLowerCase() === selectedSeverity.value.toLowerCase());
    }
    return filtered;
});
const fetchLogs = async () => {
    loading.value = true;
    error.value = null;
    try {
        const categories = {};
        if (!selectedCategories.value.has('all')) {
            selectedCategories.value.forEach(cat => {
                if (cat !== 'all') {
                    categories[cat] = 1;
                }
            });
        }
        const hasCategories = Object.keys(categories).length > 0;
        const hasKeyword = searchKeyword.value.trim() !== '';
        const requestBody = {
            StatusLog: {
                limit: limitValue.value
            }
        };
        if (hasCategories) {
            requestBody.StatusLog.categories = categories;
        }
        if (hasKeyword) {
            requestBody.StatusLog.contains = searchKeyword.value.trim();
        }
        const response = await getSystemLog(requestBody);
        logEntries.value = response.StatusLog.entries;
        matchCount.value = response.StatusLog.matchCount;
        hasMore.value = response.StatusLog.more;
        serverTime.value = response.StatusLog.serverTime;
        logSource.value = response.StatusLog.source;
    }
    catch (e) {
        console.error('Failed to fetch logs:', e);
        error.value = 'Failed to fetch system logs';
    }
    finally {
        loading.value = false;
    }
};
const handleSearch = () => {
    fetchLogs();
};
const handleClear = () => {
    searchKeyword.value = '';
    selectedCategories.value.clear();
    selectedCategories.value.add('all');
    selectedSeverity.value = 'All';
    limitValue.value = 100;
    fetchLogs();
};
const exporting = ref(false);
const exportError = ref(null);
const handleExport = async () => {
    exporting.value = true;
    exportError.value = null;
    try {
        const categories = {};
        if (!selectedCategories.value.has('all')) {
            selectedCategories.value.forEach(cat => {
                if (cat !== 'all') {
                    categories[cat] = 1;
                }
            });
        }
        const response = await exportLogs(Object.keys(categories).length > 0 ? categories : undefined);
        if (response.StatusLog.url) {
            const link = document.createElement('a');
            link.href = response.StatusLog.url;
            link.download = response.StatusLog.filename || 'logs.tgz';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
    catch (e) {
        console.error('Failed to export logs:', e);
        exportError.value = 'Failed to export logs';
    }
    finally {
        exporting.value = false;
    }
};
onMounted(() => {
    fetchLogs();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['filter-group']} */ ;
/** @type {__VLS_StyleScopedClasses['category-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['category-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-select']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-input']} */ ;
/** @type {__VLS_StyleScopedClasses['search-input']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-export']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-export']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-section']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-row']} */ ;
/** @type {__VLS_StyleScopedClasses['search-row']} */ ;
/** @type {__VLS_StyleScopedClasses['category-filters']} */ ;
/** @type {__VLS_StyleScopedClasses['category-btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
    'data-testid': (__VLS_ctx.qa('log-status-title')),
});
(__VLS_ctx.t('logStatus.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('log-status-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-section" },
    'data-testid': (__VLS_ctx.qa('log-status-panel')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "filter-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "filter-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "filter-label" },
});
(__VLS_ctx.t('logStatus.categories'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "category-filters" },
});
for (const [category] of __VLS_getVForSourceType((__VLS_ctx.availableCategories))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.toggleCategory(category);
            } },
        key: (category),
        ...{ class: "category-btn" },
        ...{ class: ({ active: __VLS_ctx.selectedCategories.has(category) }) },
        'data-testid': (__VLS_ctx.qa(`log-category-${category}`)),
    });
    (__VLS_ctx.t(`logStatus.${category}`));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "filter-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "filter-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "filter-label" },
});
(__VLS_ctx.t('logStatus.severity'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.selectedSeverity),
    ...{ class: "filter-select" },
    'data-testid': (__VLS_ctx.qa('log-severity-select')),
});
for (const [severity] of __VLS_getVForSourceType((__VLS_ctx.availableSeverities))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (severity),
        value: (severity),
    });
    (severity);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "filter-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "filter-label" },
});
(__VLS_ctx.t('logStatus.limit'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "number",
    min: "1",
    max: "1000",
    ...{ class: "filter-input" },
    'data-testid': (__VLS_ctx.qa('log-limit-input')),
});
(__VLS_ctx.limitValue);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "search-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "filter-label" },
});
(__VLS_ctx.t('logStatus.search'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "search-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onKeyup: (__VLS_ctx.handleSearch) },
    value: (__VLS_ctx.searchKeyword),
    type: "text",
    placeholder: (__VLS_ctx.t('logStatus.searchPlaceholder')),
    ...{ class: "search-input" },
    'data-testid': (__VLS_ctx.qa('log-search-input')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleSearch) },
    ...{ class: "btn btn-primary" },
    'data-testid': (__VLS_ctx.qa('log-search-btn')),
});
(__VLS_ctx.t('logStatus.searchBtn'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleClear) },
    ...{ class: "btn btn-secondary" },
    'data-testid': (__VLS_ctx.qa('log-clear-btn')),
});
(__VLS_ctx.t('logStatus.clearBtn'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleExport) },
    ...{ class: "btn btn-export" },
    'data-testid': (__VLS_ctx.qa('log-export-btn')),
    disabled: (__VLS_ctx.exporting),
});
(__VLS_ctx.exporting ? __VLS_ctx.t('logStatus.exporting') : __VLS_ctx.t('logStatus.exportBtn'));
if (__VLS_ctx.exportError) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-message" },
        'data-testid': (__VLS_ctx.qa('log-export-error')),
    });
    (__VLS_ctx.exportError);
}
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-message" },
        'data-testid': (__VLS_ctx.qa('log-error')),
    });
    (__VLS_ctx.error);
}
/** @type {[typeof LogViewer, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(LogViewer, new LogViewer({
    entries: (__VLS_ctx.filteredEntries),
    loading: (__VLS_ctx.loading),
    showCount: (__VLS_ctx.filteredEntries.length),
    totalCount: (__VLS_ctx.matchCount),
    hasMore: (__VLS_ctx.hasMore),
    serverTime: (__VLS_ctx.serverTime),
    dataTestid: (__VLS_ctx.qa('log-viewer')),
}));
const __VLS_1 = __VLS_0({
    entries: (__VLS_ctx.filteredEntries),
    loading: (__VLS_ctx.loading),
    showCount: (__VLS_ctx.filteredEntries.length),
    totalCount: (__VLS_ctx.matchCount),
    hasMore: (__VLS_ctx.hasMore),
    serverTime: (__VLS_ctx.serverTime),
    dataTestid: (__VLS_ctx.qa('log-viewer')),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
/** @type {__VLS_StyleScopedClasses['page-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-section']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-group']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-label']} */ ;
/** @type {__VLS_StyleScopedClasses['category-filters']} */ ;
/** @type {__VLS_StyleScopedClasses['category-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-row']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-group']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-label']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-select']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-group']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-label']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-input']} */ ;
/** @type {__VLS_StyleScopedClasses['search-group']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-label']} */ ;
/** @type {__VLS_StyleScopedClasses['search-row']} */ ;
/** @type {__VLS_StyleScopedClasses['search-input']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-export']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            LogViewer: LogViewer,
            qa: qa,
            t: t,
            loading: loading,
            error: error,
            matchCount: matchCount,
            hasMore: hasMore,
            serverTime: serverTime,
            selectedCategories: selectedCategories,
            selectedSeverity: selectedSeverity,
            searchKeyword: searchKeyword,
            limitValue: limitValue,
            availableCategories: availableCategories,
            availableSeverities: availableSeverities,
            toggleCategory: toggleCategory,
            filteredEntries: filteredEntries,
            handleSearch: handleSearch,
            handleClear: handleClear,
            exporting: exporting,
            exportError: exportError,
            handleExport: handleExport,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
