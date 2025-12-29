import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { runSpeedTest } from '../../services/api/speedtest';
import streambowLogo from '/src/assets/Logo_Streambow_Primary-Black-Positive SB.png';
import { useQA } from '../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const loading = ref(false);
const error = ref(null);
const testResults = ref(null);
const handleSpeedTest = async () => {
    loading.value = true;
    error.value = null;
    testResults.value = null;
    try {
        const response = await runSpeedTest();
        if (response.AppXperienceControl.status_code === 300) {
            testResults.value = response;
        }
        else {
            error.value = t('xperienceControl.testFailed');
        }
    }
    catch (err) {
        console.error('Speed test error:', err);
        error.value = t('xperienceControl.testFailed');
    }
    finally {
        loading.value = false;
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['result-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['ping-row']} */ ;
/** @type {__VLS_StyleScopedClasses['results-container']} */ ;
/** @type {__VLS_StyleScopedClasses['button-container']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title flex items-center gap-3" },
    'data-testid': (__VLS_ctx.qa('xperience-control-title')),
});
(__VLS_ctx.t('xperienceControl.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "text-base font-normal text-gray-600" },
});
(__VLS_ctx.t('xperienceControl.tagline'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('xperience-control-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-section" },
    'data-testid': (__VLS_ctx.qa('xperience-control-panel')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-title flex items-center gap-2 flex-wrap" },
    'data-testid': (__VLS_ctx.qa('xperience-control-section-title')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.t('xperienceControl.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "text-sm text-gray-500 whitespace-nowrap" },
});
(__VLS_ctx.t('xperienceControl.poweredBy'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: (__VLS_ctx.streambowLogo),
    alt: "Streambow",
    ...{ class: "logo-streambow ml-auto" },
    'data-testid': (__VLS_ctx.qa('xperience-control-streambow-logo')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "description" },
    'data-testid': (__VLS_ctx.qa('xperience-control-description')),
});
(__VLS_ctx.t('xperienceControl.description'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "button-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleSpeedTest) },
    ...{ class: "btn btn-primary" },
    'data-testid': (__VLS_ctx.qa('xperience-control-start-test-button')),
    disabled: (__VLS_ctx.loading),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "material-icons" },
});
(__VLS_ctx.loading ? __VLS_ctx.t('xperienceControl.testing') : __VLS_ctx.t('xperienceControl.startTest'));
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-message" },
        'data-testid': (__VLS_ctx.qa('xperience-control-error-message')),
    });
    (__VLS_ctx.error);
}
if (__VLS_ctx.testResults && !__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "results-container" },
        'data-testid': (__VLS_ctx.qa('xperience-control-results')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "result-card" },
        'data-testid': (__VLS_ctx.qa('xperience-control-download-card')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "result-icon" },
        'data-testid': (__VLS_ctx.qa('xperience-control-download-icon')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "result-title" },
        'data-testid': (__VLS_ctx.qa('xperience-control-download-title')),
    });
    (__VLS_ctx.t('xperienceControl.downloadSpeed'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "result-value" },
        'data-testid': (__VLS_ctx.qa('xperience-control-download-value')),
    });
    (__VLS_ctx.testResults.AppXperienceControl.data.download_udp.throughput);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "result-unit" },
    });
    (__VLS_ctx.t('xperienceControl.mbps'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "result-card" },
        'data-testid': (__VLS_ctx.qa('xperience-control-upload-card')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "result-icon" },
        'data-testid': (__VLS_ctx.qa('xperience-control-upload-icon')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "result-title" },
        'data-testid': (__VLS_ctx.qa('xperience-control-upload-title')),
    });
    (__VLS_ctx.t('xperienceControl.uploadSpeed'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "result-value" },
        'data-testid': (__VLS_ctx.qa('xperience-control-upload-value')),
    });
    (__VLS_ctx.testResults.AppXperienceControl.data.upload_udp.throughput);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "result-unit" },
    });
    (__VLS_ctx.t('xperienceControl.mbps'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "result-card" },
        'data-testid': (__VLS_ctx.qa('xperience-control-ping-card')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "result-icon" },
        'data-testid': (__VLS_ctx.qa('xperience-control-ping-icon')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "result-title" },
        'data-testid': (__VLS_ctx.qa('xperience-control-ping-title')),
    });
    (__VLS_ctx.t('xperienceControl.pingInfo'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "ping-details" },
        'data-testid': (__VLS_ctx.qa('xperience-control-ping-details')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "ping-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "ping-label" },
        'data-testid': (__VLS_ctx.qa('xperience-control-ping-packet-loss-label')),
    });
    (__VLS_ctx.t('xperienceControl.packetLoss'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "ping-value" },
        'data-testid': (__VLS_ctx.qa('xperience-control-ping-packet-loss-value')),
    });
    (__VLS_ctx.testResults.AppXperienceControl.data.ping.packet_loss);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "ping-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "ping-label" },
        'data-testid': (__VLS_ctx.qa('xperience-control-ping-min-echo-label')),
    });
    (__VLS_ctx.t('xperienceControl.minEchoTime'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "ping-value" },
        'data-testid': (__VLS_ctx.qa('xperience-control-ping-min-echo-value')),
    });
    (__VLS_ctx.testResults.AppXperienceControl.data.ping.min_echo_time);
    (__VLS_ctx.t('xperienceControl.ms'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "ping-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "ping-label" },
        'data-testid': (__VLS_ctx.qa('xperience-control-ping-mean-echo-label')),
    });
    (__VLS_ctx.t('xperienceControl.meanEchoTime'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "ping-value" },
        'data-testid': (__VLS_ctx.qa('xperience-control-ping-mean-echo-value')),
    });
    (__VLS_ctx.testResults.AppXperienceControl.data.ping.mean_echo_time);
    (__VLS_ctx.t('xperienceControl.ms'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "ping-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "ping-label" },
        'data-testid': (__VLS_ctx.qa('xperience-control-ping-max-echo-label')),
    });
    (__VLS_ctx.t('xperienceControl.maxEchoTime'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "ping-value" },
        'data-testid': (__VLS_ctx.qa('xperience-control-ping-max-echo-value')),
    });
    (__VLS_ctx.testResults.AppXperienceControl.data.ping.max_echo_time);
    (__VLS_ctx.t('xperienceControl.ms'));
}
/** @type {__VLS_StyleScopedClasses['page-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['logo-streambow']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['description']} */ ;
/** @type {__VLS_StyleScopedClasses['button-container']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['results-container']} */ ;
/** @type {__VLS_StyleScopedClasses['result-card']} */ ;
/** @type {__VLS_StyleScopedClasses['result-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['result-title']} */ ;
/** @type {__VLS_StyleScopedClasses['result-value']} */ ;
/** @type {__VLS_StyleScopedClasses['result-unit']} */ ;
/** @type {__VLS_StyleScopedClasses['result-card']} */ ;
/** @type {__VLS_StyleScopedClasses['result-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['result-title']} */ ;
/** @type {__VLS_StyleScopedClasses['result-value']} */ ;
/** @type {__VLS_StyleScopedClasses['result-unit']} */ ;
/** @type {__VLS_StyleScopedClasses['result-card']} */ ;
/** @type {__VLS_StyleScopedClasses['result-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['result-title']} */ ;
/** @type {__VLS_StyleScopedClasses['ping-details']} */ ;
/** @type {__VLS_StyleScopedClasses['ping-row']} */ ;
/** @type {__VLS_StyleScopedClasses['ping-label']} */ ;
/** @type {__VLS_StyleScopedClasses['ping-value']} */ ;
/** @type {__VLS_StyleScopedClasses['ping-row']} */ ;
/** @type {__VLS_StyleScopedClasses['ping-label']} */ ;
/** @type {__VLS_StyleScopedClasses['ping-value']} */ ;
/** @type {__VLS_StyleScopedClasses['ping-row']} */ ;
/** @type {__VLS_StyleScopedClasses['ping-label']} */ ;
/** @type {__VLS_StyleScopedClasses['ping-value']} */ ;
/** @type {__VLS_StyleScopedClasses['ping-row']} */ ;
/** @type {__VLS_StyleScopedClasses['ping-label']} */ ;
/** @type {__VLS_StyleScopedClasses['ping-value']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            streambowLogo: streambowLogo,
            qa: qa,
            t: t,
            loading: loading,
            error: error,
            testResults: testResults,
            handleSpeedTest: handleSpeedTest,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
