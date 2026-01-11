import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getStatistics } from '../../services/api';
import { useQA } from '../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const statisticsData = ref(null);
const sortConfig = ref({
    ethernet: { key: 'Port', direction: 'asc' },
    wlan: { key: 'Port', direction: 'asc' }
});
const fetchStatistics = async () => {
    try {
        const response = await getStatistics();
        statisticsData.value = response;
    }
    catch (error) {
        console.error('Error fetching statistics:', error);
    }
};
const sortData = (data, key, direction, tableType) => {
    if (!data || !Array.isArray(data))
        return [];
    return [...data].sort((a, b) => {
        let aValue = a[key];
        let bValue = b[key];
        // Ethernet: 按 Port 數字排序 (Port0, Port1, Port2, ...)
        if (tableType === 'ethernet' && key === 'Port') {
            const numA = parseInt(aValue.replace('Port', ''), 10);
            const numB = parseInt(bValue.replace('Port', ''), 10);
            return direction === 'asc' ? numA - numB : numB - numA;
        }
        // WLAN: 按特定順序排序 (2G -> 5G -> 6G)
        if (tableType === 'wlan' && key === 'Port') {
            const wlanOrder = { '2G': 1, '5G': 2, '6G': 3 };
            const numA = wlanOrder[aValue] || 99; // 其他未知類型放最後
            const numB = wlanOrder[bValue] || 99;
            return direction === 'asc' ? numA - numB : numB - numA;
        }
        // 其他欄位: 若為數字，則數字排序
        if (!isNaN(Number(aValue)) && !isNaN(Number(bValue))) {
            return direction === 'asc' ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
        }
        // 預設字串排序
        return direction === 'asc' ? String(aValue).localeCompare(String(bValue)) : String(bValue).localeCompare(String(aValue));
    });
};
const handleSort = (tableType, key) => {
    if (sortConfig.value[tableType].key === key) {
        // Toggle direction if clicking the same column
        sortConfig.value[tableType].direction = sortConfig.value[tableType].direction === 'asc' ? 'desc' : 'asc';
    }
    else {
        // New column, default to ascending
        sortConfig.value[tableType].key = key;
        sortConfig.value[tableType].direction = 'asc';
    }
};
const getSortedData = (tableType) => {
    if (!statisticsData.value || !statisticsData.value.Statistics) {
        console.warn(`No data found for ${tableType} - statisticsData is null`);
        return [];
    }
    const key = tableType === 'ethernet' ? 'Ethernet' : 'Wlan'; // 統一大小寫
    if (!statisticsData.value.Statistics[key]) {
        console.warn(`No data found for ${key}`);
        return [];
    }
    const sortedData = sortData(statisticsData.value.Statistics[key], sortConfig.value[tableType].key, sortConfig.value[tableType].direction, tableType);
    return sortedData;
};
onMounted(() => {
    fetchStatistics();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['sortable']} */ ;
/** @type {__VLS_StyleScopedClasses['card-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-subtitle']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
    'data-testid': (__VLS_ctx.qa('statistics-title')),
});
(__VLS_ctx.t('statistics.title'));
if (__VLS_ctx.statisticsData) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "status-content" },
        'data-testid': (__VLS_ctx.qa('statistics-content')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
        'data-testid': (__VLS_ctx.qa('statistics-ethernet-section')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "section-title" },
        'data-testid': (__VLS_ctx.qa('statistics-ethernet-title')),
    });
    (__VLS_ctx.t('statistics.ethernet'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-container" },
        'data-testid': (__VLS_ctx.qa('statistics-ethernet-table')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    for (const [key] of __VLS_getVForSourceType((['Port', 'RxBytes', 'RxPackets', 'RxError', 'RxDiscard', 'TxBytes', 'TxPackets', 'TxError', 'TxDiscard']))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.statisticsData))
                        return;
                    __VLS_ctx.handleSort('ethernet', key);
                } },
            key: (key),
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-header-${__VLS_ctx.slug(key)}`)),
            ...{ class: ({
                    sortable: true,
                    sorted: __VLS_ctx.sortConfig.ethernet.key === key,
                    asc: __VLS_ctx.sortConfig.ethernet.key === key && __VLS_ctx.sortConfig.ethernet.direction === 'asc',
                    desc: __VLS_ctx.sortConfig.ethernet.key === key && __VLS_ctx.sortConfig.ethernet.direction === 'desc'
                }) },
        });
        (__VLS_ctx.t(`statistics.${key.toLowerCase()}`));
        if (__VLS_ctx.sortConfig.ethernet.key === key) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "sort-icon" },
            });
            (__VLS_ctx.sortConfig.ethernet.direction === 'asc' ? '▲' : '▼');
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [entry, entryIndex] of __VLS_getVForSourceType((__VLS_ctx.getSortedData('ethernet')))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: (entry.Port),
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-row-${__VLS_ctx.slug(entry.Port)}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-port-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.Port);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-rxbytes-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.RxBytes);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-rxpackets-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.RxPackets);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-rxerror-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.RxError);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-rxdiscard-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.RxDiscard);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-txbytes-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.TxBytes);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-txpackets-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.TxPackets);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-txerror-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.TxError);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-txdiscard-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.TxDiscard);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mobile-cards" },
        'data-testid': (__VLS_ctx.qa('statistics-ethernet-mobile')),
    });
    for (const [entry, entryIndex] of __VLS_getVForSourceType((__VLS_ctx.getSortedData('ethernet')))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "table-card" },
            key: (entry.Port),
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-card-${__VLS_ctx.slug(entry.Port)}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-card-port-label-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (__VLS_ctx.t('statistics.port'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-card-port-value-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.Port);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-section" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-subtitle" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-card-rxbytes-label-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (__VLS_ctx.t('statistics.rxbytes'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-card-rxbytes-value-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.RxBytes);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-card-rxpackets-label-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (__VLS_ctx.t('statistics.rxpackets'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-card-rxpackets-value-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.RxPackets);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-card-rxerror-label-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (__VLS_ctx.t('statistics.rxerror'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-card-rxerror-value-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.RxError);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-card-rxdiscard-label-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (__VLS_ctx.t('statistics.rxdiscard'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-card-rxdiscard-value-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.RxDiscard);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-section" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-subtitle" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-card-txbytes-label-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (__VLS_ctx.t('statistics.txbytes'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-card-txbytes-value-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.TxBytes);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-card-txpackets-label-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (__VLS_ctx.t('statistics.txpackets'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-card-txpackets-value-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.TxPackets);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-card-txerror-label-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (__VLS_ctx.t('statistics.txerror'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-card-txerror-value-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.TxError);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-card-txdiscard-label-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (__VLS_ctx.t('statistics.txdiscard'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`statistics-ethernet-card-txdiscard-value-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.TxDiscard);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
        'data-testid': (__VLS_ctx.qa('statistics-wlan-section')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "section-title" },
        'data-testid': (__VLS_ctx.qa('statistics-wlan-title')),
    });
    (__VLS_ctx.t('statistics.wlan'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-container" },
        'data-testid': (__VLS_ctx.qa('statistics-wlan-table')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    for (const [key] of __VLS_getVForSourceType((['Port', 'RxBytes', 'RxPackets', 'RxError', 'RxDiscard', 'TxBytes', 'TxPackets', 'TxError', 'TxDiscard']))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.statisticsData))
                        return;
                    __VLS_ctx.handleSort('wlan', key);
                } },
            key: (key),
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-header-${__VLS_ctx.slug(key)}`)),
            ...{ class: ({
                    sortable: true,
                    sorted: __VLS_ctx.sortConfig.wlan.key === key,
                    asc: __VLS_ctx.sortConfig.wlan.key === key && __VLS_ctx.sortConfig.wlan.direction === 'asc',
                    desc: __VLS_ctx.sortConfig.wlan.key === key && __VLS_ctx.sortConfig.wlan.direction === 'desc'
                }) },
        });
        (__VLS_ctx.t(`statistics.${key.toLowerCase()}`));
        if (__VLS_ctx.sortConfig.wlan.key === key) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "sort-icon" },
            });
            (__VLS_ctx.sortConfig.wlan.direction === 'asc' ? '▲' : '▼');
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [entry, entryIndex] of __VLS_getVForSourceType((__VLS_ctx.getSortedData('wlan')))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: (entry.Port),
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-row-${__VLS_ctx.slug(entry.Port)}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-port-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.Port);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-rxbytes-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.RxBytes);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-rxpackets-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.RxPackets);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-rxerror-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.RxError);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-rxdiscard-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.RxDiscard);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-txbytes-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.TxBytes);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-txpackets-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.TxPackets);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-txerror-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.TxError);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-txdiscard-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.TxDiscard);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mobile-cards" },
        'data-testid': (__VLS_ctx.qa('statistics-wlan-mobile')),
    });
    for (const [entry, entryIndex] of __VLS_getVForSourceType((__VLS_ctx.getSortedData('wlan')))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "table-card" },
            key: (entry.Port),
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-card-${__VLS_ctx.slug(entry.Port)}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-card-port-label-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (__VLS_ctx.t('statistics.port'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-card-port-value-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.Port);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-section" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-subtitle" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-card-rxbytes-label-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (__VLS_ctx.t('statistics.rxbytes'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-card-rxbytes-value-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.RxBytes);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-card-rxpackets-label-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (__VLS_ctx.t('statistics.rxpackets'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-card-rxpackets-value-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.RxPackets);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-card-rxerror-label-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (__VLS_ctx.t('statistics.rxerror'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-card-rxerror-value-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.RxError);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-card-rxdiscard-label-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (__VLS_ctx.t('statistics.rxdiscard'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-card-rxdiscard-value-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.RxDiscard);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-section" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-subtitle" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-card-txbytes-label-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (__VLS_ctx.t('statistics.txbytes'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-card-txbytes-value-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.TxBytes);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-card-txpackets-label-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (__VLS_ctx.t('statistics.txpackets'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-card-txpackets-value-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.TxPackets);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-card-txerror-label-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (__VLS_ctx.t('statistics.txerror'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-card-txerror-value-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.TxError);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-card-txdiscard-label-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (__VLS_ctx.t('statistics.txdiscard'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`statistics-wlan-card-txdiscard-value-${__VLS_ctx.slug(entry.Port)}`)),
        });
        (entry.TxDiscard);
    }
}
/** @type {__VLS_StyleScopedClasses['page-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['sort-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['table-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['sort-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['table-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            slug: slug,
            t: t,
            statisticsData: statisticsData,
            sortConfig: sortConfig,
            handleSort: handleSort,
            getSortedData: getSortedData,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
