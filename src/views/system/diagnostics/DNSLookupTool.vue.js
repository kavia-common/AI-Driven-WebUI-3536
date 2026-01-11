import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getDiagnostics, startDNSLookup } from '../../../services/api/diagnostics';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const interfaces = ref([]);
const selectedInterface = ref('');
const dnsServer = ref('8.8.8.8');
const targetHost = ref('');
const loading = ref(false);
const error = ref(null);
const results = ref(null);
const ensureTrailingDot = (s) => {
    if (!s)
        return '';
    return s.endsWith('.') ? s : s + '.';
};
const fetchInterfaces = async () => {
    loading.value = true;
    error.value = null;
    try {
        const data = await getDiagnostics();
        interfaces.value = data.ManagementDiagnostic.Interfaces;
        results.value = data.ManagementDiagnostic.DNSLookup;
        if (interfaces.value.length > 0) {
            if (results.value && results.value.Interface) {
                selectedInterface.value = ensureTrailingDot(results.value.Interface); // 選擇 TraceRoute 目前的 Interface
            }
            else {
                const eth0Item = interfaces.value.find(it => {
                    const n = (it.Name ?? '').toLowerCase();
                    return n === 'eth0';
                });
                selectedInterface.value = eth0Item?.Interface ?? interfaces.value[0].Interface;
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
const handleDNSLookup = async () => {
    if (!selectedInterface.value || !targetHost.value || !dnsServer.value)
        return;
    loading.value = true;
    error.value = null;
    try {
        const request = {
            SetNSubscribe: {
                DM: "Device.DNS.Diagnostics.NSLookupDiagnostics.",
                filter: "notification in ['dm:object-changed'] and (parameters.DiagnosticsState.from == 'Requested')",
                Parameters: {
                    DiagnosticsState: "Requested",
                    Interface: selectedInterface.value,
                    HostName: targetHost.value,
                    DNSServer: dnsServer.value,
                    Timeout: 10000,
                    NumberOfRepetitions: 1
                }
            }
        };
        await startDNSLookup(request);
        // Add a 1-second delay before fetching results
        setTimeout(async () => {
            await fetchInterfaces(); // Refresh to get results
            loading.value = false;
        }, 1000);
    }
    catch (err) {
        console.error('Error starting DNS lookup:', err);
        error.value = 'Failed to start DNS lookup';
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
/** @type {__VLS_StyleScopedClasses['result-row']} */ ;
/** @type {__VLS_StyleScopedClasses['result-row']} */ ;
/** @type {__VLS_StyleScopedClasses['result-row']} */ ;
/** @type {__VLS_StyleScopedClasses['dns-lookup-tool']} */ ;
/** @type {__VLS_StyleScopedClasses['result-row']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "dns-lookup-tool" },
    'data-testid': (__VLS_ctx.qa('dns-lookup-tool-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.handleDNSLookup) },
    'data-testid': (__VLS_ctx.qa('dns-lookup-tool-form')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('dns-lookup-tool-interface-label')),
});
(__VLS_ctx.t('diagnostics.interface'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.selectedInterface),
    'data-testid': (__VLS_ctx.qa('dns-lookup-tool-interface-select')),
    required: true,
});
for (const [iface] of __VLS_getVForSourceType((__VLS_ctx.interfaces))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (iface.Interface),
        value: (iface.Interface),
        'data-testid': (__VLS_ctx.qa(`dns-lookup-tool-interface-option-${__VLS_ctx.slug(iface.Name)}`)),
    });
    (iface.Name);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('dns-lookup-tool-dns-server-label')),
});
(__VLS_ctx.t('diagnostics.dnsServer'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "text",
    value: (__VLS_ctx.dnsServer),
    'data-testid': (__VLS_ctx.qa('dns-lookup-tool-dns-server-input')),
    required: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('dns-lookup-tool-target-host-label')),
});
(__VLS_ctx.t('diagnostics.targetHost'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "text",
    value: (__VLS_ctx.targetHost),
    'data-testid': (__VLS_ctx.qa('dns-lookup-tool-target-host-input')),
    required: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "button-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    ...{ class: "btn btn-primary" },
    'data-testid': (__VLS_ctx.qa('dns-lookup-tool-start-button')),
    disabled: (__VLS_ctx.loading),
});
(__VLS_ctx.loading ? __VLS_ctx.t('diagnostics.processing') : __VLS_ctx.t('diagnostics.start'));
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-message" },
        'data-testid': (__VLS_ctx.qa('dns-lookup-tool-error')),
    });
    (__VLS_ctx.error);
}
if (__VLS_ctx.results && __VLS_ctx.results.DiagnosticsState !== 'None') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "results-section" },
        'data-testid': (__VLS_ctx.qa('dns-lookup-tool-results-section')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        'data-testid': (__VLS_ctx.qa('dns-lookup-tool-results-title')),
    });
    (__VLS_ctx.t('diagnostics.results'));
    if (__VLS_ctx.results.DiagnosticsState.startsWith('Error_')) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "error-state" },
            'data-testid': (__VLS_ctx.qa('dns-lookup-tool-results-error')),
        });
        (__VLS_ctx.t('diagnostics.errorState', { state: __VLS_ctx.results.DiagnosticsState }));
    }
    else if (__VLS_ctx.results.DiagnosticsState === 'Complete') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "dns-results" },
            'data-testid': (__VLS_ctx.qa('dns-lookup-tool-results-grid')),
        });
        for (const [result, index] of __VLS_getVForSourceType((__VLS_ctx.results.Result))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                key: (index),
                ...{ class: "result-card" },
                'data-testid': (__VLS_ctx.qa(`dns-lookup-tool-results-card-${index}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "result-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "label" },
                'data-testid': (__VLS_ctx.qa(`dns-lookup-tool-results-status-label-${index}`)),
            });
            (__VLS_ctx.t('diagnostics.status'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "value" },
                'data-testid': (__VLS_ctx.qa(`dns-lookup-tool-results-status-value-${index}`)),
            });
            (result.Status);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "result-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "label" },
                'data-testid': (__VLS_ctx.qa(`dns-lookup-tool-results-answer-type-label-${index}`)),
            });
            (__VLS_ctx.t('diagnostics.answerType'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "value" },
                'data-testid': (__VLS_ctx.qa(`dns-lookup-tool-results-answer-type-value-${index}`)),
            });
            (result.AnswerType);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "result-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "label" },
                'data-testid': (__VLS_ctx.qa(`dns-lookup-tool-results-hostname-label-${index}`)),
            });
            (__VLS_ctx.t('diagnostics.hostname'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "value" },
                'data-testid': (__VLS_ctx.qa(`dns-lookup-tool-results-hostname-value-${index}`)),
            });
            (result.HostNameReturned);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "result-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "label" },
                'data-testid': (__VLS_ctx.qa(`dns-lookup-tool-results-ip-addresses-label-${index}`)),
            });
            (__VLS_ctx.t('diagnostics.ipAddresses'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "value" },
                'data-testid': (__VLS_ctx.qa(`dns-lookup-tool-results-ip-addresses-value-${index}`)),
            });
            (result.IPAddresses);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "result-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "label" },
                'data-testid': (__VLS_ctx.qa(`dns-lookup-tool-results-response-time-label-${index}`)),
            });
            (__VLS_ctx.t('diagnostics.responseTime'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "value" },
                'data-testid': (__VLS_ctx.qa(`dns-lookup-tool-results-response-time-value-${index}`)),
            });
            (result.ResponseTime);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "result-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "label" },
                'data-testid': (__VLS_ctx.qa(`dns-lookup-tool-results-dns-server-ip-label-${index}`)),
            });
            (__VLS_ctx.t('diagnostics.dnsServerIp'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "value" },
                'data-testid': (__VLS_ctx.qa(`dns-lookup-tool-results-dns-server-ip-value-${index}`)),
            });
            (result.DNSServerIP);
        }
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "processing-state" },
            'data-testid': (__VLS_ctx.qa('dns-lookup-tool-results-processing')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "loading-spinner" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.t('diagnostics.processing'));
    }
}
/** @type {__VLS_StyleScopedClasses['dns-lookup-tool']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['results-section']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['dns-results']} */ ;
/** @type {__VLS_StyleScopedClasses['result-card']} */ ;
/** @type {__VLS_StyleScopedClasses['result-row']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['result-row']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['result-row']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['result-row']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['result-row']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['result-row']} */ ;
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
            dnsServer: dnsServer,
            targetHost: targetHost,
            loading: loading,
            error: error,
            results: results,
            handleDNSLookup: handleDNSLookup,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
