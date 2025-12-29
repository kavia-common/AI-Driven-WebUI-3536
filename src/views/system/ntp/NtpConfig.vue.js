import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getNtpSettings, updateNtpSettings } from '../../../services/api';
import TimeZoneSelect from '../../../components/management/TimeZoneSelect.vue';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const ntpData = ref(null);
const timeZone = ref('16'); // Default timezone index
const selectedTimezone = ref(null);
const daylightSaving = ref(false);
const ntpEnabled = ref(true);
const ntpServers = ref(['', '', '', '', '']);
const loading = ref(false);
const showSuccess = ref(false);
const error = ref(null);
const fetchNtpSettings = async () => {
    loading.value = true;
    error.value = null;
    try {
        ntpData.value = await getNtpSettings();
        if (ntpData.value) {
            timeZone.value = ntpData.value.Ntp.TimeZones;
            daylightSaving.value = ntpData.value.Ntp.DstEnable === 1;
            ntpEnabled.value = ntpData.value.Ntp.NtpEnable === 1;
            ntpServers.value = [...ntpData.value.Ntp.NtpServers];
        }
    }
    catch (err) {
        console.error('Error fetching NTP settings:', err);
        error.value = 'Failed to fetch NTP settings';
    }
    finally {
        loading.value = false;
    }
};
const handleTimezoneChange = (timezone) => {
    selectedTimezone.value = timezone;
};
const showSuccessMessage = () => {
    showSuccess.value = true;
    setTimeout(() => {
        showSuccess.value = false;
    }, 3000);
};
const handleSubmit = async () => {
    if (!selectedTimezone.value)
        return;
    loading.value = true;
    try {
        const tz = selectedTimezone.value;
        const dstSupport = tz.DstSupport ?? tz.dst_support;
        const tzNDST = tz.tzNDST ?? tz.tz_ndst;
        const tzDST = tz.tzDST ?? tz.tz_dst;
        const tzValue = (() => {
            if (dstSupport === 0)
                return tzNDST;
            if (dstSupport === 1)
                return daylightSaving.value ? tzDST : tzNDST;
            if (dstSupport === 2)
                return tzDST || tzNDST;
            return tzNDST;
        })();
        const updateData = {
            Ntp: {
                SetTZ: tzValue,
                NtpServers: ntpServers.value.filter(Boolean).join(', '),
                NtpEnable: ntpEnabled.value ? 1 : 0,
                REGION: parseInt(timeZone.value, 10)
            }
        };
        if (!tzValue) {
            error.value = 'SetTZ is empty (timezone data not ready).';
            return;
        }
        const response = await updateNtpSettings(updateData);
        ntpData.value = response;
        showSuccessMessage();
        await fetchNtpSettings(); // Refresh data after successful update
    }
    catch (err) {
        console.error('Error updating NTP settings:', err);
        error.value = 'Failed to update NTP settings';
    }
    finally {
        loading.value = false;
    }
};
onMounted(fetchNtpSettings);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
    'data-testid': (__VLS_ctx.qa('ntp-title')),
});
(__VLS_ctx.t('ntp.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('ntp-content')),
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('ntp-loading')),
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
        'data-testid': (__VLS_ctx.qa('ntp-error')),
    });
    (__VLS_ctx.error);
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
        'data-testid': (__VLS_ctx.qa('ntp-panel')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('ntp-current-time-label')),
    });
    (__VLS_ctx.t('ntp.currentTime'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "current-time" },
        'data-testid': (__VLS_ctx.qa('ntp-current-time-value')),
    });
    (__VLS_ctx.ntpData?.Ntp.CurrentLocalTime.split('.')[0]);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('ntp-timezone-label')),
    });
    (__VLS_ctx.t('ntp.timeZoneSelect'));
    /** @type {[typeof TimeZoneSelect, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(TimeZoneSelect, new TimeZoneSelect({
        ...{ 'onTimezoneChange': {} },
        modelValue: (__VLS_ctx.timeZone),
        dataTestid: (__VLS_ctx.qa('ntp-timezone-select')),
    }));
    const __VLS_1 = __VLS_0({
        ...{ 'onTimezoneChange': {} },
        modelValue: (__VLS_ctx.timeZone),
        dataTestid: (__VLS_ctx.qa('ntp-timezone-select')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_3;
    let __VLS_4;
    let __VLS_5;
    const __VLS_6 = {
        onTimezoneChange: (__VLS_ctx.handleTimezoneChange)
    };
    var __VLS_2;
    if (__VLS_ctx.selectedTimezone?.DstSupport !== 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "switch-label" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            'data-testid': (__VLS_ctx.qa('ntp-daylight-saving-label')),
        });
        (__VLS_ctx.t('ntp.automaticDaylight'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "switch" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
            type: "checkbox",
            'data-testid': (__VLS_ctx.qa('ntp-daylight-saving-toggle')),
        });
        (__VLS_ctx.daylightSaving);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "slider" },
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "switch-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        'data-testid': (__VLS_ctx.qa('ntp-enable-label')),
    });
    (__VLS_ctx.t('ntp.enableNtp'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "checkbox",
        'data-testid': (__VLS_ctx.qa('ntp-enable-toggle')),
    });
    (__VLS_ctx.ntpEnabled);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    for (const [server, index] of __VLS_getVForSourceType((__VLS_ctx.ntpServers))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (index),
            ...{ class: "form-group" },
            'data-testid': (__VLS_ctx.qa(`ntp-server-group-${index}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            'data-testid': (__VLS_ctx.qa(`ntp-server-label-${index}`)),
        });
        (__VLS_ctx.t('ntp.ntpServer'));
        (index + 1);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
            type: "text",
            'data-testid': (__VLS_ctx.qa(`ntp-server-input-${index}`)),
            value: (__VLS_ctx.ntpServers[index]),
            placeholder: (__VLS_ctx.t('ntp.placeholder')),
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "button-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.fetchNtpSettings) },
        ...{ class: "btn btn-secondary" },
        'data-testid': (__VLS_ctx.qa('ntp-cancel-button')),
        disabled: (__VLS_ctx.loading),
    });
    (__VLS_ctx.t('ntp.cancel'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleSubmit) },
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('ntp-apply-button')),
        disabled: (__VLS_ctx.loading),
    });
    (__VLS_ctx.t('ntp.apply'));
}
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
        'data-testid': (__VLS_ctx.qa('ntp-success-message')),
    });
    (__VLS_ctx.t('common.apply'));
}
/** @type {__VLS_StyleScopedClasses['page-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['current-time']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['success-message']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            TimeZoneSelect: TimeZoneSelect,
            qa: qa,
            t: t,
            ntpData: ntpData,
            timeZone: timeZone,
            selectedTimezone: selectedTimezone,
            daylightSaving: daylightSaving,
            ntpEnabled: ntpEnabled,
            ntpServers: ntpServers,
            loading: loading,
            showSuccess: showSuccess,
            error: error,
            fetchNtpSettings: fetchNtpSettings,
            handleTimezoneChange: handleTimezoneChange,
            handleSubmit: handleSubmit,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
