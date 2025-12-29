import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getDeviceConnected } from '../../../services/api/lanBasic';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const deviceData = ref(null);
const loading = ref(false);
const error = ref(null);
const fetchDeviceConnected = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await getDeviceConnected();
        deviceData.value = response;
    }
    catch (err) {
        console.error('Error fetching connected devices:', err);
        error.value = 'Failed to fetch connected devices';
    }
    finally {
        loading.value = false;
    }
};
onMounted(fetchDeviceConnected);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['device-connected']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "device-connected" },
    'data-testid': (__VLS_ctx.qa('device-connected-content')),
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('device-connected-loading')),
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
        'data-testid': (__VLS_ctx.qa('device-connected-error')),
    });
    (__VLS_ctx.error);
}
else if (__VLS_ctx.deviceData) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-container" },
        'data-testid': (__VLS_ctx.qa('device-connected-table-container')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
        'data-testid': (__VLS_ctx.qa('device-connected-table')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('device-connected-header-hostname')),
    });
    (__VLS_ctx.t('lanBasic.hostName'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('device-connected-header-mac')),
    });
    (__VLS_ctx.t('lanBasic.macAddress'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('device-connected-header-ip')),
    });
    (__VLS_ctx.t('lanBasic.ipAddress'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [device, deviceIndex] of __VLS_getVForSourceType((__VLS_ctx.deviceData.LanDeviceConnected))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: (device.MACAddress),
            'data-testid': (__VLS_ctx.qa(`device-connected-row-${deviceIndex}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`device-connected-hostname-${deviceIndex}`)),
        });
        (device.Host);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`device-connected-mac-${deviceIndex}`)),
        });
        (device.MACAddress);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`device-connected-ip-${deviceIndex}`)),
        });
        (device.IPAddress);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mobile-cards" },
        'data-testid': (__VLS_ctx.qa('device-connected-mobile')),
    });
    for (const [device, deviceIndex] of __VLS_getVForSourceType((__VLS_ctx.deviceData.LanDeviceConnected))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "table-card" },
            key: (device.MACAddress),
            'data-testid': (__VLS_ctx.qa(`device-connected-card-${deviceIndex}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`device-connected-card-hostname-label-${deviceIndex}`)),
        });
        (__VLS_ctx.t('lanBasic.hostName'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`device-connected-card-hostname-value-${deviceIndex}`)),
        });
        (device.Host);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`device-connected-card-mac-label-${deviceIndex}`)),
        });
        (__VLS_ctx.t('lanBasic.macAddress'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`device-connected-card-mac-value-${deviceIndex}`)),
        });
        (device.MACAddress);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`device-connected-card-ip-label-${deviceIndex}`)),
        });
        (__VLS_ctx.t('lanBasic.ipAddress'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`device-connected-card-ip-value-${deviceIndex}`)),
        });
        (device.IPAddress);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "button-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.fetchDeviceConnected) },
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('device-connected-refresh-button')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    (__VLS_ctx.t('lanBasic.refresh'));
}
/** @type {__VLS_StyleScopedClasses['device-connected']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['table-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
            deviceData: deviceData,
            loading: loading,
            error: error,
            fetchDeviceConnected: fetchDeviceConnected,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
