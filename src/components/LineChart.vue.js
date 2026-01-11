import { Chart, registerables } from 'chart.js';
import { ref, onMounted, watch, defineProps } from 'vue';
import { useQA } from '../utils/qa';
const { isQAMode, qa, slug } = useQA();
Chart.register(...registerables);
const props = defineProps();
const chartRef = ref(null);
let chartInstance = null;
// 初始化圖表
const renderChart = () => {
    if (chartRef.value && props.chartData) {
        if (chartInstance) {
            chartInstance.destroy();
        }
        chartInstance = new Chart(chartRef.value, {
            type: 'line',
            data: props.chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
};
// 監聽 chartData 變化並重新繪製
watch(() => props.chartData, (newData) => {
    //    console.log('Chart data updated:', newData);
    renderChart();
}, { deep: true });
onMounted(() => {
    renderChart();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "chart-container" },
    'data-testid': (__VLS_ctx.qa('line-chart-container')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.canvas, __VLS_intrinsicElements.canvas)({
    ref: "chartRef",
    'data-testid': (__VLS_ctx.qa('line-chart-canvas')),
});
/** @type {typeof __VLS_ctx.chartRef} */ ;
/** @type {__VLS_StyleScopedClasses['chart-container']} */ ;
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
