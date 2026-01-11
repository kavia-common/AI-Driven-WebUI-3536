import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { getDashboardData } from '../services/api/dashboard';
import SystemInfo from '../components/dashboard/SystemInfo.vue';
import CpuUsage from '../components/dashboard/CpuUsage.vue';
import MemoryStatus from '../components/dashboard/MemoryStatus.vue';
import WanStatus from '../components/dashboard/WanStatus.vue';
import WifiStatus from '../components/dashboard/WifiStatus.vue';
import EthernetStatus from '../components/dashboard/EthernetStatus.vue';
import { useQA } from '../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const router = useRouter();
const dashboardData = ref(null);
const refreshInterval = ref(null);
const loading = ref(true);
const error = ref(null);
const fetchData = async () => {
    try {
        const data = await getDashboardData();
        dashboardData.value = data;
        error.value = null;
    }
    catch (err) {
        console.error('Error fetching dashboard data:', err);
        error.value = 'Failed to fetch dashboard data';
        if (err instanceof Error && (err.message.includes('401') || err.message.includes('403'))) {
            router.push('/login');
        }
    }
    finally {
        loading.value = false;
    }
};
onMounted(() => {
    fetchData();
    refreshInterval.value = window.setInterval(fetchData, 3000); // Refresh every 3 seconds
});
onUnmounted(() => {
    if (refreshInterval.value) {
        clearInterval(refreshInterval.value);
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['retry-button']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-grid']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
    'data-testid': (__VLS_ctx.qa('dashboard-title')),
});
(__VLS_ctx.t('menu.home'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('dashboard-content')),
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('dashboard-loading')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-spinner" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
else if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-state" },
        'data-testid': (__VLS_ctx.qa('dashboard-error')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.error);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.fetchData) },
        ...{ class: "retry-button" },
        'data-testid': (__VLS_ctx.qa('dashboard-retry-button')),
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "dashboard-grid" },
        'data-testid': (__VLS_ctx.qa('dashboard-grid')),
    });
    /** @type {[typeof SystemInfo, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(SystemInfo, new SystemInfo({
        ...{ class: "dashboard-item" },
        dataTestid: (__VLS_ctx.qa('dashboard-system-info')),
        systemInfo: (__VLS_ctx.dashboardData?.Dashboard.System),
    }));
    const __VLS_1 = __VLS_0({
        ...{ class: "dashboard-item" },
        dataTestid: (__VLS_ctx.qa('dashboard-system-info')),
        systemInfo: (__VLS_ctx.dashboardData?.Dashboard.System),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    /** @type {[typeof CpuUsage, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(CpuUsage, new CpuUsage({
        ...{ class: "dashboard-item" },
        dataTestid: (__VLS_ctx.qa('dashboard-cpu-usage')),
        cpuInfo: (__VLS_ctx.dashboardData?.Dashboard.CPU),
    }));
    const __VLS_4 = __VLS_3({
        ...{ class: "dashboard-item" },
        dataTestid: (__VLS_ctx.qa('dashboard-cpu-usage')),
        cpuInfo: (__VLS_ctx.dashboardData?.Dashboard.CPU),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
    /** @type {[typeof MemoryStatus, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(MemoryStatus, new MemoryStatus({
        ...{ class: "dashboard-item" },
        dataTestid: (__VLS_ctx.qa('dashboard-memory-status')),
        memoryInfo: (__VLS_ctx.dashboardData?.Dashboard.Memory),
    }));
    const __VLS_7 = __VLS_6({
        ...{ class: "dashboard-item" },
        dataTestid: (__VLS_ctx.qa('dashboard-memory-status')),
        memoryInfo: (__VLS_ctx.dashboardData?.Dashboard.Memory),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    /** @type {[typeof WanStatus, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(WanStatus, new WanStatus({
        ...{ class: "dashboard-item" },
        dataTestid: (__VLS_ctx.qa('dashboard-wan-status')),
        wanInfo: (__VLS_ctx.dashboardData?.Dashboard.WAN),
    }));
    const __VLS_10 = __VLS_9({
        ...{ class: "dashboard-item" },
        dataTestid: (__VLS_ctx.qa('dashboard-wan-status')),
        wanInfo: (__VLS_ctx.dashboardData?.Dashboard.WAN),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    /** @type {[typeof WifiStatus, ]} */ ;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(WifiStatus, new WifiStatus({
        ...{ class: "dashboard-item" },
        dataTestid: (__VLS_ctx.qa('dashboard-wifi-status')),
        wifiInfo: (__VLS_ctx.dashboardData?.Dashboard.WiFi),
    }));
    const __VLS_13 = __VLS_12({
        ...{ class: "dashboard-item" },
        dataTestid: (__VLS_ctx.qa('dashboard-wifi-status')),
        wifiInfo: (__VLS_ctx.dashboardData?.Dashboard.WiFi),
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    /** @type {[typeof EthernetStatus, ]} */ ;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent(EthernetStatus, new EthernetStatus({
        ...{ class: "dashboard-item" },
        dataTestid: (__VLS_ctx.qa('dashboard-ethernet-status')),
        ethernetInfo: (__VLS_ctx.dashboardData?.Dashboard.Ethernet),
    }));
    const __VLS_16 = __VLS_15({
        ...{ class: "dashboard-item" },
        dataTestid: (__VLS_ctx.qa('dashboard-ethernet-status')),
        ethernetInfo: (__VLS_ctx.dashboardData?.Dashboard.Ethernet),
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
}
/** @type {__VLS_StyleScopedClasses['page-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['retry-button']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-item']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-item']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-item']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-item']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-item']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-item']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            SystemInfo: SystemInfo,
            CpuUsage: CpuUsage,
            MemoryStatus: MemoryStatus,
            WanStatus: WanStatus,
            WifiStatus: WifiStatus,
            EthernetStatus: EthernetStatus,
            qa: qa,
            t: t,
            dashboardData: dashboardData,
            loading: loading,
            error: error,
            fetchData: fetchData,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
