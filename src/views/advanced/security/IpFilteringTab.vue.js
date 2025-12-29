import { ref, computed, watch, onMounted } from 'vue';
import { ipFilteringApi } from '../../../services/api/ipFiltering';
const config = ref({
    Enable: false,
    ProtoList: ['TCP', 'UDP', 'Both'],
    BlackList: [],
    WhiteList: []
});
const filterMode = ref('Blacklist');
const ipVersion = ref('IPv4');
const newEntry = ref({
    IPStart: '',
    IPEnd: '',
    Protocol: 'Both',
    Comment: ''
});
const errorMessage = ref('');
const originalConfig = ref(null);
const showSuccess = ref(false);
const currentList = computed(() => {
    return filterMode.value === 'Blacklist' ? config.value.BlackList : config.value.WhiteList;
});
const showSuccessMessage = () => {
    showSuccess.value = true;
    setTimeout(() => {
        showSuccess.value = false;
    }, 3000);
};
const loadConfig = async () => {
    try {
        const response = await ipFilteringApi.getConfig();
        config.value = response.IPFiltering;
        originalConfig.value = JSON.parse(JSON.stringify(response.IPFiltering));
    }
    catch (error) {
        console.error('Failed to load IP filtering config:', error);
    }
};
const isValidIPv4 = (ip) => {
    const ipv4Regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Regex.test(ip);
};
const isValidIPv6 = (ip) => {
    const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
    return ipv6Regex.test(ip);
};
const onEnableChange = () => {
    if (!config.value.Enable) {
        filterMode.value = 'Blacklist';
        ipVersion.value = 'IPv4';
    }
    errorMessage.value = '';
};
const addEntry = () => {
    errorMessage.value = '';
    if (!newEntry.value.IPStart || !newEntry.value.IPEnd) {
        errorMessage.value = 'Please enter both start and end IP addresses';
        return;
    }
    // Validate IP format based on selected version
    if (ipVersion.value === 'IPv4') {
        if (!isValidIPv4(newEntry.value.IPStart) || !isValidIPv4(newEntry.value.IPEnd)) {
            errorMessage.value = 'The local IP start format is incorrect.';
            return;
        }
    }
    else {
        if (!isValidIPv6(newEntry.value.IPStart) || !isValidIPv6(newEntry.value.IPEnd)) {
            errorMessage.value = 'The local IP start format is incorrect.';
            return;
        }
    }
    const list = filterMode.value === 'Blacklist' ? config.value.BlackList : config.value.WhiteList;
    const nextNo = list.length > 0 ? Math.max(...list.map(e => e.No)) + 1 : 1;
    const entry = {
        No: nextNo,
        IPStart: newEntry.value.IPStart,
        IPEnd: newEntry.value.IPEnd,
        Protocol: newEntry.value.Protocol,
        Comment: newEntry.value.Comment
    };
    if (filterMode.value === 'Blacklist') {
        config.value.BlackList.push(entry);
    }
    else {
        config.value.WhiteList.push(entry);
    }
    newEntry.value = {
        IPStart: '',
        IPEnd: '',
        Protocol: 'Both',
        Comment: ''
    };
};
const deleteEntry = (no) => {
    if (filterMode.value === 'Blacklist') {
        config.value.BlackList = config.value.BlackList.filter(e => e.No !== no);
    }
    else {
        config.value.WhiteList = config.value.WhiteList.filter(e => e.No !== no);
    }
};
const apply = async () => {
    try {
        await ipFilteringApi.updateConfig({
            IPFiltering: {
                Enable: config.value.Enable,
                BlackList: config.value.BlackList,
                WhiteList: config.value.WhiteList
            }
        });
        originalConfig.value = JSON.parse(JSON.stringify(config.value));
        showSuccessMessage();
    }
    catch (error) {
        console.error('Failed to update IP filtering config:', error);
    }
};
const cancel = () => {
    if (originalConfig.value) {
        config.value = JSON.parse(JSON.stringify(originalConfig.value));
    }
    newEntry.value = {
        IPStart: '',
        IPEnd: '',
        Protocol: 'Both',
        Comment: ''
    };
    errorMessage.value = '';
};
watch(ipVersion, () => {
    errorMessage.value = '';
    newEntry.value.IPStart = '';
    newEntry.value.IPEnd = '';
});
watch([() => newEntry.value.IPStart, () => newEntry.value.IPEnd], () => {
    errorMessage.value = '';
});
onMounted(() => {
    loadConfig();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['toggle-group']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['form-textarea']} */ ;
/** @type {__VLS_StyleScopedClasses['form-textarea']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-add']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-add']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-table-section']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-table']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-table']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-table']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-table']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-table']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['input-error']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "ip-filtering-tab" },
});
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
    });
    (__VLS_ctx.$t('common.saveSuccess'));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group toggle-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
(__VLS_ctx.$t('ipFiltering.enableIpFiltering'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "switch" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    ...{ onChange: (__VLS_ctx.onEnableChange) },
    type: "checkbox",
});
(__VLS_ctx.config.Enable);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "slider" },
});
if (__VLS_ctx.config.Enable) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group radio-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    (__VLS_ctx.$t('ipFiltering.ipFilteringMode'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "radio-options" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "radio-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "radio",
        value: "Blacklist",
    });
    (__VLS_ctx.filterMode);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.$t('ipFiltering.blacklist'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "radio-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "radio",
        value: "Whitelist",
    });
    (__VLS_ctx.filterMode);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.$t('ipFiltering.whitelist'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group radio-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    (__VLS_ctx.$t('ipFiltering.filterMode'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "radio-options" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "radio-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "radio",
        value: "IPv4",
    });
    (__VLS_ctx.ipVersion);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.$t('ipFiltering.enableIpv4'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "radio-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "radio",
        value: "IPv6",
    });
    (__VLS_ctx.ipVersion);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.$t('ipFiltering.enableIpv6'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    (__VLS_ctx.ipVersion === 'IPv4' ? __VLS_ctx.$t('ipFiltering.localIpv4AddressStart') : __VLS_ctx.$t('ipFiltering.localIpv6AddressStart'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "text",
        value: (__VLS_ctx.newEntry.IPStart),
        placeholder: (__VLS_ctx.ipVersion === 'IPv4' ? '192.168.1.1' : '2001:db8::1'),
        ...{ class: "form-input" },
        ...{ class: ({ 'input-error': __VLS_ctx.errorMessage }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    (__VLS_ctx.ipVersion === 'IPv4' ? __VLS_ctx.$t('ipFiltering.localIpv4AddressEnd') : __VLS_ctx.$t('ipFiltering.localIpv6AddressEnd'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "text",
        value: (__VLS_ctx.newEntry.IPEnd),
        placeholder: (__VLS_ctx.ipVersion === 'IPv4' ? '192.168.1.10' : '2001:db8::10'),
        ...{ class: "form-input" },
        ...{ class: ({ 'input-error': __VLS_ctx.errorMessage }) },
    });
    if (__VLS_ctx.errorMessage) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "error-message" },
        });
        (__VLS_ctx.errorMessage);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    (__VLS_ctx.$t('ipFiltering.protocol'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        value: (__VLS_ctx.newEntry.Protocol),
        ...{ class: "form-select" },
    });
    for (const [proto] of __VLS_getVForSourceType((__VLS_ctx.config.ProtoList))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
            key: (proto),
            value: (proto),
        });
        (proto);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    (__VLS_ctx.$t('ipFiltering.comment'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({
        value: (__VLS_ctx.newEntry.Comment),
        placeholder: (__VLS_ctx.$t('ipFiltering.placeholder')),
        ...{ class: "form-textarea" },
        rows: "3",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-actions" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.addEntry) },
        ...{ class: "btn btn-add" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    (__VLS_ctx.$t('ipFiltering.add'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "filter-table-section" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (__VLS_ctx.filterMode === 'Blacklist' ? __VLS_ctx.$t('ipFiltering.currentBlacklistFilterTable') : __VLS_ctx.$t('ipFiltering.currentWhitelistFilterTable'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
        ...{ class: "filter-table" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    (__VLS_ctx.$t('ipFiltering.number'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    (__VLS_ctx.$t('ipFiltering.localIpAddressStart'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    (__VLS_ctx.$t('ipFiltering.localIpAddressEnd'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    (__VLS_ctx.$t('ipFiltering.protocol'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    (__VLS_ctx.$t('ipFiltering.comment'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    (__VLS_ctx.$t('ipFiltering.active'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [entry] of __VLS_getVForSourceType((__VLS_ctx.currentList))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: (entry.No),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (entry.No);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (entry.IPStart);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (entry.IPEnd);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (entry.Protocol.toLowerCase());
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (entry.Comment);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.config.Enable))
                        return;
                    __VLS_ctx.deleteEntry(entry.No);
                } },
            ...{ class: "btn-icon" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
    }
    if (__VLS_ctx.currentList.length === 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            colspan: "6",
            ...{ class: "empty-message" },
        });
        (__VLS_ctx.$t('ipFiltering.noEntries'));
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-footer" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.cancel) },
    ...{ class: "btn btn-outline" },
});
(__VLS_ctx.$t('common.cancel'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.apply) },
    ...{ class: "btn btn-primary" },
});
(__VLS_ctx.$t('common.apply'));
/** @type {__VLS_StyleScopedClasses['ip-filtering-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['success-message']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-group']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-options']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-label']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-group']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-options']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-label']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-row']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-textarea']} */ ;
/** @type {__VLS_StyleScopedClasses['form-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-add']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-table-section']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-table']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-message']} */ ;
/** @type {__VLS_StyleScopedClasses['form-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            config: config,
            filterMode: filterMode,
            ipVersion: ipVersion,
            newEntry: newEntry,
            errorMessage: errorMessage,
            showSuccess: showSuccess,
            currentList: currentList,
            onEnableChange: onEnableChange,
            addEntry: addEntry,
            deleteEntry: deleteEntry,
            apply: apply,
            cancel: cancel,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
