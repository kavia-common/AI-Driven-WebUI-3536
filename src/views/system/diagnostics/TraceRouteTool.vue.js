import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getDiagnostics, startTraceRoute } from '../../../services/api/diagnostics';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const interfaces = ref([]);
const selectedInterface = ref('');
const protocolVersion = ref('IPv4');
const targetHost = ref('');
const loading = ref(false);
const error = ref(null);
const results = ref(null);
const pollingInterval = ref(null);
const fetchInterfaces = async () => {
    loading.value = true;
    error.value = null;
    try {
        const data = await getDiagnostics();
        interfaces.value = data.ManagementDiagnostic.Interfaces;
        results.value = data.ManagementDiagnostic.TraceRoute;
        if (interfaces.value.length > 0) {
            if (results.value && results.value.Interface) {
                selectedInterface.value = results.value.Interface;
            }
            else {
                selectedInterface.value = interfaces.value[0].Interface;
            }
        }
        if (results.value?.DiagnosticsState === 'Not_Complete' && !pollingInterval.value) {
            pollingInterval.value = window.setInterval(pollTraceRouteStatus, 3000);
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
const pollTraceRouteStatus = async () => {
    try {
        const data = await getDiagnostics();
        results.value = data.ManagementDiagnostic.TraceRoute;
        // If state is no longer "Not_Complete", stop polling
        if (results.value.DiagnosticsState !== 'Not_Complete') {
            if (pollingInterval.value) {
                clearInterval(pollingInterval.value);
                pollingInterval.value = null;
            }
            loading.value = false;
        }
    }
    catch (err) {
        console.error('Error polling trace route status:', err);
        // Stop polling on error
        if (pollingInterval.value) {
            clearInterval(pollingInterval.value);
            pollingInterval.value = null;
        }
        loading.value = false;
    }
};
const handleTraceRoute = async () => {
    if (!selectedInterface.value || !targetHost.value)
        return;
    // Clear any existing polling interval
    if (pollingInterval.value) {
        clearInterval(pollingInterval.value);
        pollingInterval.value = null;
    }
    loading.value = true;
    error.value = null;
    try {
        const request = {
            ManagementDiagnostic: {
                DM: "Device.IP.Diagnostics.TraceRoute.",
                filter: "notification in ['dm:object-changed'] and (parameters.DiagnosticsState.from == 'Not_Complete')",
                Parameters: {
                    DiagnosticsState: "Requested",
                    Interface: selectedInterface.value,
                    ProtocolVersion: protocolVersion.value,
                    Host: targetHost.value,
                    Timeout: 3000,
                    MaxHopCount: 30,
                    DataBlockSize: 38,
                    NumberOfTries: 3
                }
            }
        };
        await startTraceRoute(request);
        // Add a 1-second delay before starting to poll
        setTimeout(async () => {
            await pollTraceRouteStatus();
            // Start polling every 3 seconds if state is "Not_Complete"
            if (results.value?.DiagnosticsState === 'Not_Complete' && !pollingInterval.value) {
                pollingInterval.value = window.setInterval(pollTraceRouteStatus, 3000);
            }
            else {
                loading.value = false;
            }
        }, 1000);
    }
    catch (err) {
        console.error('Error starting trace route:', err);
        error.value = 'Failed to start trace route';
        loading.value = false;
    }
};
// Clean up interval when component is unmounted
onUnmounted(() => {
    if (pollingInterval.value) {
        clearInterval(pollingInterval.value);
        pollingInterval.value = null;
    }
});
onMounted(fetchInterfaces);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['results-section']} */ ;
/** @type {__VLS_StyleScopedClasses['trace-row']} */ ;
/** @type {__VLS_StyleScopedClasses['traceroute-tool']} */ ;
/** @type {__VLS_StyleScopedClasses['trace-header']} */ ;
/** @type {__VLS_StyleScopedClasses['trace-row']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "traceroute-tool" },
    'data-testid': (__VLS_ctx.qa('traceroute-tool-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.handleTraceRoute) },
    'data-testid': (__VLS_ctx.qa('traceroute-tool-form')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('traceroute-tool-interface-label')),
});
(__VLS_ctx.t('diagnostics.interface'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.selectedInterface),
    'data-testid': (__VLS_ctx.qa('traceroute-tool-interface-select')),
    required: true,
});
for (const [iface] of __VLS_getVForSourceType((__VLS_ctx.interfaces))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (iface.Interface),
        value: (iface.Interface),
        'data-testid': (__VLS_ctx.qa(`traceroute-tool-interface-option-${__VLS_ctx.slug(iface.Name)}`)),
    });
    (iface.Name);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('traceroute-tool-protocol-label')),
});
(__VLS_ctx.t('diagnostics.protocol'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.protocolVersion),
    'data-testid': (__VLS_ctx.qa('traceroute-tool-protocol-select')),
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
    'data-testid': (__VLS_ctx.qa('traceroute-tool-target-host-label')),
});
(__VLS_ctx.t('diagnostics.targetHost'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "text",
    value: (__VLS_ctx.targetHost),
    'data-testid': (__VLS_ctx.qa('traceroute-tool-target-host-input')),
    required: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "button-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    ...{ class: "btn btn-primary" },
    'data-testid': (__VLS_ctx.qa('traceroute-tool-start-button')),
    disabled: (__VLS_ctx.loading),
});
(__VLS_ctx.loading ? __VLS_ctx.t('diagnostics.processing') : __VLS_ctx.t('diagnostics.start'));
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-message" },
        'data-testid': (__VLS_ctx.qa('traceroute-tool-error')),
    });
    (__VLS_ctx.error);
}
if (__VLS_ctx.results && __VLS_ctx.results.DiagnosticsState !== 'None') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "results-section" },
        'data-testid': (__VLS_ctx.qa('traceroute-tool-results-section')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        'data-testid': (__VLS_ctx.qa('traceroute-tool-results-title')),
    });
    (__VLS_ctx.t('diagnostics.results'));
    if (__VLS_ctx.results.DiagnosticsState.startsWith('Error_')) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "error-state" },
            'data-testid': (__VLS_ctx.qa('traceroute-tool-results-error')),
        });
        (__VLS_ctx.t('diagnostics.errorState', { state: __VLS_ctx.results.DiagnosticsState }));
    }
    else if (__VLS_ctx.results.DiagnosticsState === 'Not_Complete') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "processing-state" },
            'data-testid': (__VLS_ctx.qa('traceroute-tool-results-processing')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "loading-spinner" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.t('diagnostics.processing'));
    }
    else if (__VLS_ctx.results.DiagnosticsState === 'Complete') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "trace-results" },
            'data-testid': (__VLS_ctx.qa('traceroute-tool-results-table')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "trace-header" },
            'data-testid': (__VLS_ctx.qa('traceroute-tool-results-header')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "hop" },
            'data-testid': (__VLS_ctx.qa('traceroute-tool-results-header-hop')),
        });
        (__VLS_ctx.t('diagnostics.hop'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "host" },
            'data-testid': (__VLS_ctx.qa('traceroute-tool-results-header-host')),
        });
        (__VLS_ctx.t('diagnostics.host'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "address" },
            'data-testid': (__VLS_ctx.qa('traceroute-tool-results-header-address')),
        });
        (__VLS_ctx.t('diagnostics.address'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "rtt" },
            'data-testid': (__VLS_ctx.qa('traceroute-tool-results-header-rtt')),
        });
        (__VLS_ctx.t('diagnostics.rtt'));
        for (const [hop, index] of __VLS_getVForSourceType((__VLS_ctx.results.RouteHops))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                key: (index),
                ...{ class: "trace-row" },
                'data-testid': (__VLS_ctx.qa(`traceroute-tool-results-row-${index}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "hop" },
                'data-testid': (__VLS_ctx.qa(`traceroute-tool-results-hop-${index}`)),
            });
            (index + 1);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "host" },
                'data-testid': (__VLS_ctx.qa(`traceroute-tool-results-host-${index}`)),
            });
            (hop.Host);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "address" },
                'data-testid': (__VLS_ctx.qa(`traceroute-tool-results-address-${index}`)),
            });
            (hop.HostAddress);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "rtt" },
                'data-testid': (__VLS_ctx.qa(`traceroute-tool-results-rtt-${index}`)),
            });
            (hop.RTTimes);
        }
    }
}
/** @type {__VLS_StyleScopedClasses['traceroute-tool']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['results-section']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['processing-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['trace-results']} */ ;
/** @type {__VLS_StyleScopedClasses['trace-header']} */ ;
/** @type {__VLS_StyleScopedClasses['hop']} */ ;
/** @type {__VLS_StyleScopedClasses['host']} */ ;
/** @type {__VLS_StyleScopedClasses['address']} */ ;
/** @type {__VLS_StyleScopedClasses['rtt']} */ ;
/** @type {__VLS_StyleScopedClasses['trace-row']} */ ;
/** @type {__VLS_StyleScopedClasses['hop']} */ ;
/** @type {__VLS_StyleScopedClasses['host']} */ ;
/** @type {__VLS_StyleScopedClasses['address']} */ ;
/** @type {__VLS_StyleScopedClasses['rtt']} */ ;
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
            loading: loading,
            error: error,
            results: results,
            handleTraceRoute: handleTraceRoute,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
