import { ref, onMounted, watch, defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import { Chart, registerables } from 'chart.js';
import { useQA } from '../utils/qa';
const { isQAMode, qa, slug } = useQA();
Chart.register(...registerables);
const { t } = useI18n();
const props = defineProps();
const chartRef = ref(null);
let chartInstance = null;
// Initialize chart
const renderChart = () => {
    if (chartRef.value && props.chartData) {
        if (chartInstance) {
            chartInstance.destroy();
        }
        const ctx = chartRef.value.getContext('2d');
        if (!ctx)
            return;
        chartInstance = new Chart(ctx, {
            type: 'line',
            data: props.chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 300 // Faster animation for smoother updates
                },
                scales: {
                    x: {
                        grid: {
                            display: true,
                            color: '#f0f0f0'
                        },
                        ticks: {
                            maxRotation: 0,
                            autoSkip: true,
                            maxTicksLimit: 6
                        }
                    },
                    y: {
                        grid: {
                            display: true,
                            color: '#f0f0f0'
                        },
                        ticks: {
                            callback: function (value) {
                                return value + ' ' + props.unit;
                            }
                        },
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function (context) {
                                const value = context.parsed.y ?? 0;
                                return context.dataset.label + ': ' + value.toFixed(2) + ' ' + props.unit;
                            }
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                elements: {
                    point: {
                        radius: 0,
                        hoverRadius: 5
                    },
                    line: {
                        tension: 0.4
                    }
                }
            }
        });
    }
};
// Watch for changes in chartData and redraw
watch(() => props.chartData, () => {
    renderChart();
}, { deep: true });
// Watch for unit changes
watch(() => props.unit, () => {
    renderChart();
});
onMounted(() => {
    renderChart();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['throughput-chart']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-container']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "throughput-chart" },
    'data-testid': (__VLS_ctx.qa('throughput-chart')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "chart-title" },
    'data-testid': (__VLS_ctx.qa('throughput-chart-title')),
});
(__VLS_ctx.title);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "chart-container" },
    'data-testid': (__VLS_ctx.qa('throughput-chart-container')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.canvas, __VLS_intrinsicElements.canvas)({
    ref: "chartRef",
    'data-testid': (__VLS_ctx.qa('throughput-chart-canvas')),
});
/** @type {typeof __VLS_ctx.chartRef} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "chart-legend" },
    'data-testid': (__VLS_ctx.qa('throughput-chart-legend')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "legend-item" },
    'data-testid': (__VLS_ctx.qa('throughput-chart-legend-tx')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "legend-color tx-color" },
    'data-testid': (__VLS_ctx.qa('throughput-chart-legend-tx-color')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "legend-label" },
    'data-testid': (__VLS_ctx.qa('throughput-chart-legend-tx-label')),
});
(__VLS_ctx.labelTx);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "legend-item" },
    'data-testid': (__VLS_ctx.qa('throughput-chart-legend-rx')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "legend-color rx-color" },
    'data-testid': (__VLS_ctx.qa('throughput-chart-legend-rx-color')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "legend-label" },
    'data-testid': (__VLS_ctx.qa('throughput-chart-legend-rx-label')),
});
(__VLS_ctx.labelRx);
/** @type {__VLS_StyleScopedClasses['throughput-chart']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-title']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-container']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-legend']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-color']} */ ;
/** @type {__VLS_StyleScopedClasses['tx-color']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-label']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-color']} */ ;
/** @type {__VLS_StyleScopedClasses['rx-color']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-label']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            chartRef: chartRef,
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
