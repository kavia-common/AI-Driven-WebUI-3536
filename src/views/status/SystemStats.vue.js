import { ref, watchEffect, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getSystemStats } from '../../services/api/systemStats';
import ThroughputChart from '../../components/ThroughputChart.vue';
import { prepareChartData, determineYAxisUnit, convertToUnit } from '../../utils/throughputUtils';
import { useQA } from '../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
// ------------------ reactive state ------------------
const activeTab = ref('WAN');
const selectedWanInterface = ref('');
const selectedWifiBand = ref('2.4G');
const loading = ref(true);
const error = ref(null);
// Data storage for different interfaces
const wanData = ref(new Map());
const lanData = ref(new Map());
const wifiData = ref(new Map());
const wanInterfaces = ref([]);
// Configuration constants
const POLL_INTERVAL_MS = 2000;
const MAX_POINTS = 30;
let timer = null;
// Create empty chart data structure
function createEmptyChartData() {
    return {
        labels: [],
        datasets: [
            {
                label: 'Tx',
                data: [],
                borderColor: 'rgba(0, 112, 187, 1)',
                backgroundColor: 'rgba(0, 112, 187, 0.2)',
                fill: true,
                tension: 0.4
            },
            {
                label: 'Rx',
                data: [],
                borderColor: 'rgba(116, 119, 191, 1)',
                backgroundColor: 'rgba(116, 119, 191, 0.2)',
                fill: true,
                tension: 0.4
            }
        ]
    };
}
// Chart data for different interfaces
const wanChartData = ref(createEmptyChartData());
const lanChartData = ref(createEmptyChartData());
const wifiChartData = ref(createEmptyChartData());
// Units for different interfaces
const wanUnit = ref('Mbps');
const lanUnit = ref('Mbps');
const wifiUnit = ref('Mbps');
// Fetch data and update charts
async function fetchAndUpdate() {
    try {
        const resp = await getSystemStats();
        const now = Date.now();
        // Process WAN data
        for (const w of resp.StatusSystemStat.WAN) {
            const iface = w.interface || 'unknown';
            if (!wanData.value.has(iface))
                wanData.value.set(iface, []);
            const list = wanData.value.get(iface);
            const bytesRx = Number(w.Receive);
            const bytesTx = Number(w.Sent);
            const prev = list.at(-1);
            const dt = prev ? (now - prev.timestamp) / 1000 : POLL_INTERVAL_MS / 1000;
            const rateRx = prev ? Math.max(0, bytesRx - prev.counterRx) / dt : 0;
            const rateTx = prev ? Math.max(0, bytesTx - prev.counterTx) / dt : 0;
            list.push({ counterRx: bytesRx, counterTx: bytesTx, rateRx, rateTx, timestamp: now, interface: iface });
            if (list.length > MAX_POINTS)
                list.shift();
        }
        wanInterfaces.value = Array.from(wanData.value.keys());
        if (!selectedWanInterface.value && wanInterfaces.value.length)
            selectedWanInterface.value = wanInterfaces.value[0];
        // Process LAN data
        for (const l of resp.StatusSystemStat.LAN) {
            const iface = l.interface || 'unknown';
            if (!lanData.value.has(iface))
                lanData.value.set(iface, []);
            const list = lanData.value.get(iface);
            const bytesRx = Number(l.Receive);
            const bytesTx = Number(l.Sent);
            const prev = list.at(-1);
            const dt = prev ? (now - prev.timestamp) / 1000 : POLL_INTERVAL_MS / 1000;
            const rateRx = prev ? Math.max(0, bytesRx - prev.counterRx) / dt : 0;
            const rateTx = prev ? Math.max(0, bytesTx - prev.counterTx) / dt : 0;
            list.push({ counterRx: bytesRx, counterTx: bytesTx, rateRx, rateTx, timestamp: now, interface: iface });
            if (list.length > MAX_POINTS)
                list.shift();
        }
        // Process WiFi data
        const wifiList = [
            ['2.4G', resp.StatusSystemStat.WiFi.wifi2g],
            ['5G', resp.StatusSystemStat.WiFi.wifi5g],
            ['6G', resp.StatusSystemStat.WiFi.wifi6g]
        ];
        for (const [band, v] of wifiList) {
            if (!wifiData.value.has(band))
                wifiData.value.set(band, []);
            const list = wifiData.value.get(band);
            const bytesRx = Number(v.Receive);
            const bytesTx = Number(v.Sent);
            const prev = list.at(-1);
            const dt = prev ? (now - prev.timestamp) / 1000 : POLL_INTERVAL_MS / 1000;
            const rateRx = prev ? Math.max(0, bytesRx - prev.counterRx) / dt : 0;
            const rateTx = prev ? Math.max(0, bytesTx - prev.counterTx) / dt : 0;
            list.push({ counterRx: bytesRx, counterTx: bytesTx, rateRx, rateTx, timestamp: now, interface: band });
            if (list.length > MAX_POINTS)
                list.shift();
        }
        updateCharts();
        loading.value = false;
        error.value = null;
    }
    catch (e) {
        console.error(e);
        error.value = 'Failed to fetch system statistics';
        loading.value = false;
    }
}
// Convert data points to formatted throughput data
function convertToFormattedData(list, unit) {
    return list.map(p => ({
        timestamp: p.timestamp,
        rx: convertToUnit(p.rateRx, unit),
        tx: convertToUnit(p.rateTx, unit),
        interface: p.interface
    }));
}
// Update chart data
function updateCharts() {
    // Update WAN chart
    if (selectedWanInterface.value && wanData.value.has(selectedWanInterface.value)) {
        const list = wanData.value.get(selectedWanInterface.value);
        wanUnit.value = determineYAxisUnit(list.map(p => ({ rx: p.rateRx, tx: p.rateTx })));
        wanChartData.value = prepareChartData(convertToFormattedData(list, wanUnit.value));
    }
    // Update LAN chart (currently hidden in UI)
    if (lanData.value.size) {
        const first = Array.from(lanData.value.keys())[0];
        const list = lanData.value.get(first);
        lanUnit.value = determineYAxisUnit(list.map(p => ({ rx: p.rateRx, tx: p.rateTx })));
        lanChartData.value = prepareChartData(convertToFormattedData(list, lanUnit.value));
    }
    // Update WiFi chart
    if (wifiData.value.has(selectedWifiBand.value)) {
        const list = wifiData.value.get(selectedWifiBand.value);
        wifiUnit.value = determineYAxisUnit(list.map(p => ({ rx: p.rateRx, tx: p.rateTx })));
        wifiChartData.value = prepareChartData(convertToFormattedData(list, wifiUnit.value));
    }
}
// Watch for changes to update charts
watchEffect(updateCharts);
// Lifecycle hooks
onMounted(() => {
    fetchAndUpdate();
    timer = window.setInterval(fetchAndUpdate, POLL_INTERVAL_MS);
});
onUnmounted(() => {
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['chart-header']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-header']} */ ;
/** @type {__VLS_StyleScopedClasses['interface-select']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
    'data-testid': (__VLS_ctx.qa('system-stats-title')),
});
(__VLS_ctx.t('systemStats.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('system-stats-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-section" },
    'data-testid': (__VLS_ctx.qa('system-stats-panel')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tab-navigation" },
    'data-testid': (__VLS_ctx.qa('system-stats-tabs')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.activeTab = 'WAN';
        } },
    ...{ class: "tab-button" },
    ...{ class: ({ active: __VLS_ctx.activeTab === 'WAN' }) },
    'data-testid': (__VLS_ctx.qa('system-stats-wan-tab')),
});
(__VLS_ctx.t('systemStats.wanThroughput'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.activeTab = 'WiFi';
        } },
    ...{ class: "tab-button" },
    ...{ class: ({ active: __VLS_ctx.activeTab === 'WiFi' }) },
    'data-testid': (__VLS_ctx.qa('system-stats-wifi-tab')),
});
(__VLS_ctx.t('systemStats.wifiThroughput'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tab-content" },
    'data-testid': (__VLS_ctx.qa('system-stats-tab-content')),
});
if (__VLS_ctx.loading && !__VLS_ctx.wanData.size && !__VLS_ctx.wifiData.size) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('system-stats-loading')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-spinner" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('common.loading'));
}
else if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-state" },
        'data-testid': (__VLS_ctx.qa('system-stats-error')),
    });
    (__VLS_ctx.error);
}
else if (__VLS_ctx.activeTab === 'WAN') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "chart-header" },
        'data-testid': (__VLS_ctx.qa('system-stats-wan-header')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        'data-testid': (__VLS_ctx.qa('system-stats-wan-title')),
    });
    (__VLS_ctx.t('systemStats.wanThroughput'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        value: (__VLS_ctx.selectedWanInterface),
        ...{ class: "interface-select" },
        'data-testid': (__VLS_ctx.qa('system-stats-wan-interface-select')),
    });
    for (const [iface] of __VLS_getVForSourceType((__VLS_ctx.wanInterfaces))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
            key: (iface),
            value: (iface),
        });
        (iface);
    }
    /** @type {[typeof ThroughputChart, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(ThroughputChart, new ThroughputChart({
        dataTestid: (__VLS_ctx.qa('system-stats-wan-chart')),
        chartData: (__VLS_ctx.wanChartData),
        title: (__VLS_ctx.selectedWanInterface),
        labelTx: (__VLS_ctx.t('systemStats.tx')),
        labelRx: (__VLS_ctx.t('systemStats.rx')),
        unit: (__VLS_ctx.wanUnit),
    }));
    const __VLS_1 = __VLS_0({
        dataTestid: (__VLS_ctx.qa('system-stats-wan-chart')),
        chartData: (__VLS_ctx.wanChartData),
        title: (__VLS_ctx.selectedWanInterface),
        labelTx: (__VLS_ctx.t('systemStats.tx')),
        labelRx: (__VLS_ctx.t('systemStats.rx')),
        unit: (__VLS_ctx.wanUnit),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
else if (__VLS_ctx.activeTab === 'WiFi') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "chart-header" },
        'data-testid': (__VLS_ctx.qa('system-stats-wifi-header')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        'data-testid': (__VLS_ctx.qa('system-stats-wifi-title')),
    });
    (__VLS_ctx.t('systemStats.wifiThroughput'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        value: (__VLS_ctx.selectedWifiBand),
        ...{ class: "interface-select" },
        'data-testid': (__VLS_ctx.qa('system-stats-wifi-band-select')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "2.4G",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "5G",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "6G",
    });
    /** @type {[typeof ThroughputChart, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(ThroughputChart, new ThroughputChart({
        dataTestid: (__VLS_ctx.qa('system-stats-wifi-chart')),
        chartData: (__VLS_ctx.wifiChartData),
        title: (__VLS_ctx.selectedWifiBand),
        labelTx: (__VLS_ctx.t('systemStats.tx')),
        labelRx: (__VLS_ctx.t('systemStats.rx')),
        unit: (__VLS_ctx.wifiUnit),
    }));
    const __VLS_4 = __VLS_3({
        dataTestid: (__VLS_ctx.qa('system-stats-wifi-chart')),
        chartData: (__VLS_ctx.wifiChartData),
        title: (__VLS_ctx.selectedWifiBand),
        labelTx: (__VLS_ctx.t('systemStats.tx')),
        labelRx: (__VLS_ctx.t('systemStats.rx')),
        unit: (__VLS_ctx.wifiUnit),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
}
/** @type {__VLS_StyleScopedClasses['page-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-navigation']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-button']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-button']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-content']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-header']} */ ;
/** @type {__VLS_StyleScopedClasses['interface-select']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-header']} */ ;
/** @type {__VLS_StyleScopedClasses['interface-select']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ThroughputChart: ThroughputChart,
            qa: qa,
            t: t,
            activeTab: activeTab,
            selectedWanInterface: selectedWanInterface,
            selectedWifiBand: selectedWifiBand,
            loading: loading,
            error: error,
            wanData: wanData,
            wifiData: wifiData,
            wanInterfaces: wanInterfaces,
            wanChartData: wanChartData,
            wifiChartData: wifiChartData,
            wanUnit: wanUnit,
            wifiUnit: wifiUnit,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
