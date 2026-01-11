import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getWanStatus } from '../../services/api';
import WanStatusSummary from '../../components/status/wan/WanStatusSummary.vue';
import WanModeConfig from '../../components/status/wan/WanModeConfig.vue';
import WanInterface from '../../components/status/wan/WanInterface.vue';
import { useQA } from '../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const wanData = ref(null);
const fetchWanStatus = async () => {
    try {
        wanData.value = await getWanStatus();
    }
    catch (error) {
        console.error('Error fetching WAN status:', error);
    }
};
onMounted(() => {
    fetchWanStatus();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
    'data-testid': (__VLS_ctx.qa('wan-title')),
});
(__VLS_ctx.t('wan.title'));
if (__VLS_ctx.wanData?.StatusWan) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "status-content" },
        'data-testid': (__VLS_ctx.qa('wan-content')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
    });
    /** @type {[typeof WanStatusSummary, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(WanStatusSummary, new WanStatusSummary({
        status: (__VLS_ctx.wanData.StatusWan),
    }));
    const __VLS_1 = __VLS_0({
        status: (__VLS_ctx.wanData.StatusWan),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
    });
    /** @type {[typeof WanModeConfig, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(WanModeConfig, new WanModeConfig({
        config: (__VLS_ctx.wanData.StatusWan.WANModeConfig),
    }));
    const __VLS_4 = __VLS_3({
        config: (__VLS_ctx.wanData.StatusWan.WANModeConfig),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
    for (const [iface] of __VLS_getVForSourceType((__VLS_ctx.wanData.StatusWan.WANModeConfig.Interfaces))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "panel-section" },
            key: (iface.Name),
            'data-testid': (__VLS_ctx.qa(`wan-interface-${__VLS_ctx.slug(iface.Name)}`)),
        });
        /** @type {[typeof WanInterface, ]} */ ;
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent(WanInterface, new WanInterface({
            interface: (iface),
        }));
        const __VLS_7 = __VLS_6({
            interface: (iface),
        }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    }
}
/** @type {__VLS_StyleScopedClasses['page-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            WanStatusSummary: WanStatusSummary,
            WanModeConfig: WanModeConfig,
            WanInterface: WanInterface,
            qa: qa,
            slug: slug,
            t: t,
            wanData: wanData,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
