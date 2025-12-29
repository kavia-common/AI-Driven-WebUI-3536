import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getDiagnostics, startPing } from '../../../services/api/diagnostics';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const interfaces = ref([]);
const selectedInterface = ref('');
const protocolVersion = ref('IPv4');
const targetHost = ref('');
const repeatTimes = ref(3);
const loading = ref(false);
const error = ref(null);
const results = ref(null);
const fetchInterfaces = async () => {
    loading.value = true;
    error.value = null;
    try {
        const data = await getDiagnostics();
        interfaces.value = data.ManagementDiagnostic.Interfaces;
        results.value = data.ManagementDiagnostic.IPPing;
        if (interfaces.value.length > 0) {
            if (results.value && results.value.Interface) {
                selectedInterface.value = results.value.Interface; // 選擇 TraceRoute 目前的 Interface
            }
            else {
                selectedInterface.value = interfaces.value[0].Interface; // 預設選擇第一個 Interface
            }
        }
    }
    catch (err) {
        console.error('Error fetching interfaces:', err);
        error.value = 'Failed to fetch interfaces';
    }
    finally {
        loading.value = false;
    }
};
const handlePing = async () => {
    if (!selectedInterface.value || !targetHost.value)
        return;
    loading.value = true;
    error.value = null;
    try {
        const request = {
            SetNSubscribe: {
                DM: "Device.IP.Diagnostics.IPPing.",
                filter: "notification in ['dm:object-changed'] and (parameters.DiagnosticsState.from == 'Requested')",
                Parameters: {
                    DiagnosticsState: "Requested",
                    Interface: selectedInterface.value, // 直接使用完整路徑
                    ProtocolVersion: protocolVersion.value,
                    NumberOfRepetitions: repeatTimes.value,
                    Host: targetHost.value,
                    Timeout: 10000,
                    DataBlockSize: 16
                }
            }
        };
        await startPing(request);
        // Add a 1-second delay before fetching results
        setTimeout(async () => {
            await fetchInterfaces(); // Refresh to get results
            loading.value = false;
        }, 1000);
    }
    catch (err) {
        console.error('Error starting ping:', err);
        error.value = 'Failed to start ping';
        loading.value = false;
    }
};
onMounted(fetchInterfaces);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['results-section']} */ ;
/** @type {__VLS_StyleScopedClasses['result-item']} */ ;
/** @type {__VLS_StyleScopedClasses['result-item']} */ ;
/** @type {__VLS_StyleScopedClasses['ping-tool']} */ ;
/** @type {__VLS_StyleScopedClasses['result-item']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "ping-tool" },
    'data-testid': (__VLS_ctx.qa('ping-tool-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.handlePing) },
    'data-testid': (__VLS_ctx.qa('ping-tool-form')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('ping-tool-interface-label')),
});
(__VLS_ctx.t('diagnostics.interface'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.selectedInterface),
    'data-testid': (__VLS_ctx.qa('ping-tool-interface-select')),
    required: true,
});
for (const [iface] of __VLS_getVForSourceType((__VLS_ctx.interfaces))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (iface.Interface),
        value: (iface.Interface),
        'data-testid': (__VLS_ctx.qa(`ping-tool-interface-option-${__VLS_ctx.slug(iface.Name)}`)),
    });
    (iface.Name);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('ping-tool-protocol-label')),
});
(__VLS_ctx.t('diagnostics.protocol'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.protocolVersion),
    'data-testid': (__VLS_ctx.qa('ping-tool-protocol-select')),
    required: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "IPv4",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "IPv6",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('ping-tool-repeat-times-label')),
});
(__VLS_ctx.t('diagnostics.repeatTimes'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "number",
    'data-testid': (__VLS_ctx.qa('ping-tool-repeat-times-input')),
    min: "1",
    max: "10",
    required: true,
});
(__VLS_ctx.repeatTimes);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('ping-tool-target-host-label')),
});
(__VLS_ctx.t('diagnostics.targetHost'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "text",
    value: (__VLS_ctx.targetHost),
    'data-testid': (__VLS_ctx.qa('ping-tool-target-host-input')),
    required: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "button-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    ...{ class: "btn btn-primary" },
    'data-testid': (__VLS_ctx.qa('ping-tool-start-button')),
    disabled: (__VLS_ctx.loading),
});
(__VLS_ctx.loading ? __VLS_ctx.t('diagnostics.processing') : __VLS_ctx.t('diagnostics.start'));
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-message" },
        'data-testid': (__VLS_ctx.qa('ping-tool-error')),
    });
    (__VLS_ctx.error);
}
if (__VLS_ctx.results && __VLS_ctx.results.DiagnosticsState !== 'None') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "results-section" },
        'data-testid': (__VLS_ctx.qa('ping-tool-results-section')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        'data-testid': (__VLS_ctx.qa('ping-tool-results-title')),
    });
    (__VLS_ctx.t('diagnostics.results'));
    if (__VLS_ctx.results.DiagnosticsState.startsWith('Error_')) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "error-state" },
            'data-testid': (__VLS_ctx.qa('ping-tool-results-error')),
        });
        (__VLS_ctx.t('diagnostics.errorState', { state: __VLS_ctx.results.DiagnosticsState }));
    }
    else if (__VLS_ctx.results.DiagnosticsState === 'Complete') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "result-grid" },
            'data-testid': (__VLS_ctx.qa('ping-tool-results-grid')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "result-item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "label" },
            'data-testid': (__VLS_ctx.qa('ping-tool-results-host-label')),
        });
        (__VLS_ctx.t('diagnostics.hostAddress'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "value" },
            'data-testid': (__VLS_ctx.qa('ping-tool-results-host-value')),
        });
        (__VLS_ctx.results.Host);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "result-item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "label" },
            'data-testid': (__VLS_ctx.qa('ping-tool-results-packets-label')),
        });
        (__VLS_ctx.t('diagnostics.packetsInfo'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "value" },
            'data-testid': (__VLS_ctx.qa('ping-tool-results-packets-value')),
        });
        (__VLS_ctx.t('diagnostics.sent'));
        (__VLS_ctx.results.NumberOfRepetitions);
        (__VLS_ctx.t('diagnostics.received'));
        (__VLS_ctx.results.SuccessCount);
        (__VLS_ctx.t('diagnostics.lost'));
        (__VLS_ctx.results.FailureCount);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "result-item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "label" },
            'data-testid': (__VLS_ctx.qa('ping-tool-results-min-rtt-label')),
        });
        (__VLS_ctx.t('diagnostics.minRoundTrip'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "value" },
            'data-testid': (__VLS_ctx.qa('ping-tool-results-min-rtt-value')),
        });
        ((__VLS_ctx.results.MinimumResponseTimeDetailed / 1000).toFixed(2));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "result-item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "label" },
            'data-testid': (__VLS_ctx.qa('ping-tool-results-max-rtt-label')),
        });
        (__VLS_ctx.t('diagnostics.maxRoundTrip'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "value" },
            'data-testid': (__VLS_ctx.qa('ping-tool-results-max-rtt-value')),
        });
        ((__VLS_ctx.results.MaximumResponseTimeDetailed / 1000).toFixed(2));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "result-item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "label" },
            'data-testid': (__VLS_ctx.qa('ping-tool-results-avg-rtt-label')),
        });
        (__VLS_ctx.t('diagnostics.avgRoundTrip'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "value" },
            'data-testid': (__VLS_ctx.qa('ping-tool-results-avg-rtt-value')),
        });
        ((__VLS_ctx.results.AverageResponseTimeDetailed / 1000).toFixed(2));
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "processing-state" },
            'data-testid': (__VLS_ctx.qa('ping-tool-results-processing')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "loading-spinner" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.t('diagnostics.processing'));
    }
}
/** @type {__VLS_StyleScopedClasses['ping-tool']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['results-section']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['result-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['result-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['result-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['result-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['result-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['result-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['processing-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            slug: slug,
            t: t,
            interfaces: interfaces,
            selectedInterface: selectedInterface,
            protocolVersion: protocolVersion,
            targetHost: targetHost,
            repeatTimes: repeatTimes,
            loading: loading,
            error: error,
            results: results,
            handlePing: handlePing,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
