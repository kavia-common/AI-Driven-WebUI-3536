import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQA } from '../../utils/qa';
const { isQAMode, qa, slug } = useQA();
ChartJS.register(ArcElement, Tooltip, Legend);
const { t } = useI18n();
const props = defineProps();
const usage = computed(() => props.cpuInfo?.CPUUsage ?? 0);
const colorByUsage = (value) => {
    if (value < 40)
        return '#0070BB'; // 藍色（低）
    if (value < 80)
        return '#FFA500'; // 橙色（中）
    return '#D32F2F'; // 紅色（高）
};
const chartData = computed(() => ({
    labels: ['Used', 'Free'],
    datasets: [
        {
            data: [usage.value, 100 - usage.value],
            backgroundColor: [colorByUsage(usage.value), '#e0e0e0'],
            borderWidth: 0
        }
    ]
}));
const chartOptions = {
    cutout: '70%',
    plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
if (__VLS_ctx.cpuInfo) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "memory-status" },
        'data-testid': (__VLS_ctx.qa('dashboard-cpu-usage-content')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "card-title" },
        'data-testid': (__VLS_ctx.qa('dashboard-cpu-usage-title')),
    });
    (__VLS_ctx.t('dashboard.cpu'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "cpu-chart-container" },
        'data-testid': (__VLS_ctx.qa('dashboard-cpu-usage-chart-container')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "chart-wrapper" },
        'data-testid': (__VLS_ctx.qa('dashboard-cpu-usage-chart-wrapper')),
    });
    const __VLS_0 = {}.Doughnut;
    /** @type {[typeof __VLS_components.Doughnut, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        data: (__VLS_ctx.chartData),
        options: (__VLS_ctx.chartOptions),
        dataTestid: (__VLS_ctx.qa('dashboard-cpu-usage-chart')),
    }));
    const __VLS_2 = __VLS_1({
        data: (__VLS_ctx.chartData),
        options: (__VLS_ctx.chartOptions),
        dataTestid: (__VLS_ctx.qa('dashboard-cpu-usage-chart')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "center-label" },
        'data-testid': (__VLS_ctx.qa('dashboard-cpu-usage-percentage')),
    });
    (__VLS_ctx.usage);
}
/** @type {__VLS_StyleScopedClasses['memory-status']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['cpu-chart-container']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['center-label']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Doughnut: Doughnut,
            qa: qa,
            t: t,
            usage: usage,
            chartData: chartData,
            chartOptions: chartOptions,
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
