import { ref, computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import ConfirmationDialog from '../../../../components/ConfirmationDialog.vue';
import { useQA } from '../../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const props = defineProps();
const emit = defineEmits();
// Sort entries by Path
const sortedEntries = computed(() => {
    return [...props.entries].sort((a, b) => {
        // Extract numbers from paths like "Device.WiFi.AccessPoint.3."
        const numA = parseInt(a.Path.match(/\d+(?=\.)/)?.[0] || '0', 10);
        const numB = parseInt(b.Path.match(/\d+(?=\.)/)?.[0] || '0', 10);
        return numA - numB;
    });
});
// Selected SSID and its corresponding entry
const selectedSSID = ref(sortedEntries.value.length > 0 ? sortedEntries.value[0].SSID : '');
const selectedEntry = computed(() => {
    const entry = sortedEntries.value.find(entry => entry.SSID === selectedSSID.value);
    return entry || sortedEntries.value[0] || null;
});
// Add a reactive flag to control MAC list visibility
const showMacList = computed(() => {
    if (!selectedEntry.value)
        return false;
    return selectedEntry.value.ACLMode !== 'Off';
});
// MAC address list management
const macAddresses = ref([]);
const newMacAddress = ref('');
const editingIndex = ref(null);
const error = ref('');
// Confirmation dialog state
const showConfirmDialog = ref(false);
const confirmDialogAction = ref(null);
const confirmDialogIndex = ref(null);
const pendingACLMode = ref(null);
// ACL mode mapping
const aclModeOptions = [
    { label: t('macfilter.disabled'), value: 'Off' },
    { label: t('macfilter.deny'), value: 'BlackList' },
    { label: t('macfilter.allow'), value: 'WhiteList' }
];
// Display ACL mode in user-friendly format
const displayACLMode = (mode) => {
    const option = aclModeOptions.find(opt => opt.value === mode);
    return option ? option.label : mode;
};
// Initialize MAC addresses from selected entry
const initializeMacAddresses = () => {
    if (selectedEntry.value && selectedEntry.value.MACList) {
        macAddresses.value = selectedEntry.value.MACList.split(',')
            .map(mac => mac.trim())
            .filter(mac => mac !== '');
    }
    else {
        macAddresses.value = [];
    }
};
// Watch for changes in selected entry
watch(selectedEntry, () => {
    initializeMacAddresses();
}, { deep: true, immediate: true });
// Watch for changes in selected SSID
watch(selectedSSID, () => {
    initializeMacAddresses();
});
// Validate MAC address format
const isValidMacAddress = (mac) => {
    return /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(mac);
};
// Add new MAC address
const addMacAddress = () => {
    if (!newMacAddress.value) {
        error.value = t('macfilter.emptyMacError');
        return;
    }
    if (!isValidMacAddress(newMacAddress.value)) {
        error.value = t('macfilter.invalidMacFormat');
        return;
    }
    if (macAddresses.value.includes(newMacAddress.value)) {
        error.value = t('macfilter.duplicateMacError');
        return;
    }
    macAddresses.value.push(newMacAddress.value);
    updateEntryMacList();
    newMacAddress.value = '';
    error.value = '';
};
// Edit MAC address
const startEditMac = (index) => {
    editingIndex.value = index;
    newMacAddress.value = macAddresses.value[index];
};
// Delete MAC address
const deleteMacAddress = (index) => {
    confirmDialogAction.value = 'delete';
    confirmDialogIndex.value = index;
    showConfirmDialog.value = true;
};
// Confirm delete MAC address
const confirmDeleteMac = () => {
    if (confirmDialogIndex.value !== null) {
        macAddresses.value.splice(confirmDialogIndex.value, 1);
        updateEntryMacList();
    }
    showConfirmDialog.value = false;
    confirmDialogAction.value = null;
    confirmDialogIndex.value = null;
};
// Save edited MAC address
const saveEditedMac = () => {
    if (editingIndex.value === null)
        return;
    if (!isValidMacAddress(newMacAddress.value)) {
        error.value = t('macfilter.invalidMacFormat');
        return;
    }
    const existingIndex = macAddresses.value.findIndex((mac, idx) => mac === newMacAddress.value && idx !== editingIndex.value);
    if (existingIndex !== -1) {
        error.value = t('macfilter.duplicateMacError');
        return;
    }
    macAddresses.value[editingIndex.value] = newMacAddress.value;
    updateEntryMacList();
    newMacAddress.value = '';
    editingIndex.value = null;
    error.value = '';
};
// Cancel editing
const cancelEdit = () => {
    newMacAddress.value = '';
    editingIndex.value = null;
    error.value = '';
};
// Update ACL mode
const updateACLMode = (mode) => {
    if (!selectedEntry.value)
        return;
    // 只有從 Off 改為 WhiteList 或 BlackList 時才顯示確認對話框
    // 但 6G 頻段不需要顯示確認對話框（因為沒有 WPS）
    if (props.band !== '6G' &&
        selectedEntry.value.ACLMode === 'Off' &&
        (mode === 'WhiteList' || mode === 'BlackList')) {
        pendingACLMode.value = mode;
        confirmDialogAction.value = 'mode';
        showConfirmDialog.value = true;
        return;
    }
    // 其他情況直接套用
    applyACLModeChange(mode);
};
// Apply ACL mode change after confirmation
const applyACLModeChange = (mode) => {
    if (!selectedEntry.value)
        return;
    const updatedEntries = props.entries.map(entry => {
        if (entry.SSID === selectedEntry.value.SSID) {
            return { ...entry, ACLMode: mode };
        }
        return entry;
    });
    emit('update:entries', updatedEntries);
};
// Confirm ACL mode change
const confirmACLModeChange = () => {
    if (pendingACLMode.value !== null) {
        applyACLModeChange(pendingACLMode.value);
    }
    showConfirmDialog.value = false;
    confirmDialogAction.value = null;
    pendingACLMode.value = null;
};
// Update MAC list in the entry
const updateEntryMacList = () => {
    if (!selectedEntry.value)
        return;
    const macList = macAddresses.value.join(',');
    const updatedEntries = props.entries.map(entry => {
        if (entry.SSID === selectedEntry.value.SSID) {
            return { ...entry, MACList: macList };
        }
        return entry;
    });
    emit('update:entries', updatedEntries);
};
// Initialize on component mount
onMounted(() => {
    if (sortedEntries.value.length > 0) {
        selectedSSID.value = sortedEntries.value[0].SSID;
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['mac-list-header']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['mac-filter-band']} */ ;
/** @type {__VLS_StyleScopedClasses['mac-list-header']} */ ;
/** @type {__VLS_StyleScopedClasses['add-mac-form']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mac-filter-band" },
    'data-testid': (__VLS_ctx.qa(`mac-filter-band-${__VLS_ctx.slug(__VLS_ctx.band)}`)),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa(`mac-filter-band-ssid-label-${__VLS_ctx.slug(__VLS_ctx.band)}`)),
});
(__VLS_ctx.t('macfilter.ssid'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.selectedSSID),
    ...{ class: "form-select" },
    'data-testid': (__VLS_ctx.qa(`mac-filter-band-ssid-select-${__VLS_ctx.slug(__VLS_ctx.band)}`)),
});
for (const [entry] of __VLS_getVForSourceType((__VLS_ctx.sortedEntries))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (entry.Path),
        value: (entry.SSID),
        'data-testid': (__VLS_ctx.qa(`mac-filter-band-ssid-option-${__VLS_ctx.slug(__VLS_ctx.band)}-${__VLS_ctx.slug(entry.SSID)}`)),
    });
    (entry.SSID);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa(`mac-filter-band-acl-mode-label-${__VLS_ctx.slug(__VLS_ctx.band)}`)),
});
(__VLS_ctx.t('macfilter.aclMode'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.updateACLMode($event.target.value);
        } },
    'data-testid': (__VLS_ctx.qa(`mac-filter-band-acl-mode-select-${__VLS_ctx.slug(__VLS_ctx.band)}`)),
    value: (__VLS_ctx.selectedEntry?.ACLMode),
    ...{ class: "form-select" },
});
for (const [option] of __VLS_getVForSourceType((__VLS_ctx.aclModeOptions))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (option.value),
        value: (option.value),
        'data-testid': (__VLS_ctx.qa(`mac-filter-band-acl-mode-option-${__VLS_ctx.slug(__VLS_ctx.band)}-${__VLS_ctx.slug(option.value)}`)),
    });
    (option.label);
}
if (__VLS_ctx.showMacList) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-list-${__VLS_ctx.slug(__VLS_ctx.band)}`)),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mac-list-header" },
        'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-list-header-${__VLS_ctx.slug(__VLS_ctx.band)}`)),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-list-title-${__VLS_ctx.slug(__VLS_ctx.band)}`)),
    });
    (__VLS_ctx.t('macfilter.macAddressList'));
    if (__VLS_ctx.editingIndex === null) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "add-mac-form" },
            'data-testid': (__VLS_ctx.qa(`mac-filter-band-add-mac-form-${__VLS_ctx.slug(__VLS_ctx.band)}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "text",
            'data-testid': (__VLS_ctx.qa(`mac-filter-band-add-mac-input-${__VLS_ctx.slug(__VLS_ctx.band)}`)),
            value: (__VLS_ctx.newMacAddress),
            placeholder: (__VLS_ctx.t('macfilter.enterMacAddress')),
            ...{ class: "mac-input" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.addMacAddress) },
            type: "button",
            'data-testid': (__VLS_ctx.qa(`mac-filter-band-add-mac-button-${__VLS_ctx.slug(__VLS_ctx.band)}`)),
            ...{ class: "btn btn-primary" },
        });
        (__VLS_ctx.t('macfilter.add'));
    }
    if (__VLS_ctx.error) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "error-message" },
            'data-testid': (__VLS_ctx.qa(`mac-filter-band-error-message-${__VLS_ctx.slug(__VLS_ctx.band)}`)),
        });
        (__VLS_ctx.error);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mac-list" },
        'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-list-container-${__VLS_ctx.slug(__VLS_ctx.band)}`)),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-container" },
        'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-table-container-${__VLS_ctx.slug(__VLS_ctx.band)}`)),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
        'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-table-${__VLS_ctx.slug(__VLS_ctx.band)}`)),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-header-no-${__VLS_ctx.slug(__VLS_ctx.band)}`)),
    });
    (__VLS_ctx.t('macfilter.no'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-header-address-${__VLS_ctx.slug(__VLS_ctx.band)}`)),
    });
    (__VLS_ctx.t('macfilter.macAddress'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-header-action-${__VLS_ctx.slug(__VLS_ctx.band)}`)),
    });
    (__VLS_ctx.t('macfilter.action'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [mac, index] of __VLS_getVForSourceType((__VLS_ctx.macAddresses))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: (index),
            'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-row-${__VLS_ctx.slug(__VLS_ctx.band)}-${index}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-no-${__VLS_ctx.slug(__VLS_ctx.band)}-${index}`)),
        });
        (index + 1);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        if (__VLS_ctx.editingIndex === index) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "edit-form" },
                'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-edit-form-${__VLS_ctx.slug(__VLS_ctx.band)}-${index}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "text",
                'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-edit-input-${__VLS_ctx.slug(__VLS_ctx.band)}-${index}`)),
                value: (__VLS_ctx.newMacAddress),
                ...{ class: "mac-input" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "edit-actions" },
                'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-edit-actions-${__VLS_ctx.slug(__VLS_ctx.band)}-${index}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (__VLS_ctx.saveEditedMac) },
                type: "button",
                'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-save-${__VLS_ctx.slug(__VLS_ctx.band)}-${index}`)),
                ...{ class: "btn-icon" },
                title: "Save",
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (__VLS_ctx.cancelEdit) },
                type: "button",
                'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-cancel-edit-${__VLS_ctx.slug(__VLS_ctx.band)}-${index}`)),
                ...{ class: "btn-icon" },
                title: "Cancel",
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
        }
        else {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-address-${__VLS_ctx.slug(__VLS_ctx.band)}-${index}`)),
            });
            (mac);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        if (__VLS_ctx.editingIndex !== index) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "action-buttons" },
                'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-actions-${__VLS_ctx.slug(__VLS_ctx.band)}-${index}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.showMacList))
                            return;
                        if (!(__VLS_ctx.editingIndex !== index))
                            return;
                        __VLS_ctx.startEditMac(index);
                    } },
                type: "button",
                'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-edit-${__VLS_ctx.slug(__VLS_ctx.band)}-${index}`)),
                ...{ class: "btn-icon" },
                title: "Edit",
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.showMacList))
                            return;
                        if (!(__VLS_ctx.editingIndex !== index))
                            return;
                        __VLS_ctx.deleteMacAddress(index);
                    } },
                type: "button",
                'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-delete-${__VLS_ctx.slug(__VLS_ctx.band)}-${index}`)),
                ...{ class: "btn-icon" },
                title: "Delete",
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
        }
    }
    if (__VLS_ctx.macAddresses.length === 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-no-data-row-${__VLS_ctx.slug(__VLS_ctx.band)}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            colspan: "3",
            ...{ class: "no-data" },
            'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-no-data-${__VLS_ctx.slug(__VLS_ctx.band)}`)),
        });
        (__VLS_ctx.t('macfilter.noMacAddresses'));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mobile-cards" },
        'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-mobile-${__VLS_ctx.slug(__VLS_ctx.band)}`)),
    });
    if (__VLS_ctx.macAddresses.length === 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "no-data-mobile" },
            'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-no-data-mobile-${__VLS_ctx.slug(__VLS_ctx.band)}`)),
        });
        (__VLS_ctx.t('macfilter.noMacAddresses'));
    }
    else {
        for (const [mac, index] of __VLS_getVForSourceType((__VLS_ctx.macAddresses))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "table-card" },
                key: (index),
                'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-card-${__VLS_ctx.slug(__VLS_ctx.band)}-${index}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-card-no-label-${__VLS_ctx.slug(__VLS_ctx.band)}-${index}`)),
            });
            (__VLS_ctx.t('macfilter.no'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-card-no-value-${__VLS_ctx.slug(__VLS_ctx.band)}-${index}`)),
            });
            (index + 1);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-card-address-label-${__VLS_ctx.slug(__VLS_ctx.band)}-${index}`)),
            });
            (__VLS_ctx.t('macfilter.macAddress'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
            });
            if (__VLS_ctx.editingIndex === index) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "edit-form" },
                    'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-card-edit-form-${__VLS_ctx.slug(__VLS_ctx.band)}-${index}`)),
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                    type: "text",
                    'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-card-edit-input-${__VLS_ctx.slug(__VLS_ctx.band)}-${index}`)),
                    value: (__VLS_ctx.newMacAddress),
                    ...{ class: "mac-input" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "edit-actions" },
                    'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-card-edit-actions-${__VLS_ctx.slug(__VLS_ctx.band)}-${index}`)),
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                    ...{ onClick: (__VLS_ctx.saveEditedMac) },
                    type: "button",
                    'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-card-save-${__VLS_ctx.slug(__VLS_ctx.band)}-${index}`)),
                    ...{ class: "btn-icon" },
                    title: "Save",
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "material-icons" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                    ...{ onClick: (__VLS_ctx.cancelEdit) },
                    type: "button",
                    'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-card-cancel-edit-${__VLS_ctx.slug(__VLS_ctx.band)}-${index}`)),
                    ...{ class: "btn-icon" },
                    title: "Cancel",
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "material-icons" },
                });
            }
            else {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-card-address-value-${__VLS_ctx.slug(__VLS_ctx.band)}-${index}`)),
                });
                (mac);
            }
            if (__VLS_ctx.editingIndex !== index) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "card-actions" },
                    'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-card-actions-${__VLS_ctx.slug(__VLS_ctx.band)}-${index}`)),
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                    ...{ onClick: (...[$event]) => {
                            if (!(__VLS_ctx.showMacList))
                                return;
                            if (!!(__VLS_ctx.macAddresses.length === 0))
                                return;
                            if (!(__VLS_ctx.editingIndex !== index))
                                return;
                            __VLS_ctx.startEditMac(index);
                        } },
                    type: "button",
                    'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-card-edit-${__VLS_ctx.slug(__VLS_ctx.band)}-${index}`)),
                    ...{ class: "btn-icon" },
                    title: "Edit",
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "material-icons" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                    ...{ onClick: (...[$event]) => {
                            if (!(__VLS_ctx.showMacList))
                                return;
                            if (!!(__VLS_ctx.macAddresses.length === 0))
                                return;
                            if (!(__VLS_ctx.editingIndex !== index))
                                return;
                            __VLS_ctx.deleteMacAddress(index);
                        } },
                    type: "button",
                    'data-testid': (__VLS_ctx.qa(`mac-filter-band-mac-card-delete-${__VLS_ctx.slug(__VLS_ctx.band)}-${index}`)),
                    ...{ class: "btn-icon" },
                    title: "Delete",
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "material-icons" },
                });
            }
        }
    }
}
/** @type {[typeof ConfirmationDialog, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(ConfirmationDialog, new ConfirmationDialog({
    ...{ 'onConfirm': {} },
    ...{ 'onCancel': {} },
    dataTestid: (__VLS_ctx.qa(`mac-filter-band-confirmation-dialog-${__VLS_ctx.slug(__VLS_ctx.band)}`)),
    isOpen: (__VLS_ctx.showConfirmDialog),
    title: (__VLS_ctx.confirmDialogAction === 'mode' ? __VLS_ctx.t('macfilter.changeModeTitle') : __VLS_ctx.t('macfilter.deleteMacTitle')),
    message: (__VLS_ctx.confirmDialogAction === 'mode'
        ? __VLS_ctx.t('macfilter.changeModeMessage')
        : __VLS_ctx.t('macfilter.deleteMacMessage')),
}));
const __VLS_1 = __VLS_0({
    ...{ 'onConfirm': {} },
    ...{ 'onCancel': {} },
    dataTestid: (__VLS_ctx.qa(`mac-filter-band-confirmation-dialog-${__VLS_ctx.slug(__VLS_ctx.band)}`)),
    isOpen: (__VLS_ctx.showConfirmDialog),
    title: (__VLS_ctx.confirmDialogAction === 'mode' ? __VLS_ctx.t('macfilter.changeModeTitle') : __VLS_ctx.t('macfilter.deleteMacTitle')),
    message: (__VLS_ctx.confirmDialogAction === 'mode'
        ? __VLS_ctx.t('macfilter.changeModeMessage')
        : __VLS_ctx.t('macfilter.deleteMacMessage')),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onConfirm: (...[$event]) => {
        __VLS_ctx.confirmDialogAction === 'mode' ? __VLS_ctx.confirmACLModeChange() : __VLS_ctx.confirmDeleteMac();
    }
};
const __VLS_7 = {
    onCancel: (...[$event]) => {
        __VLS_ctx.showConfirmDialog = false;
    }
};
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['mac-filter-band']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['mac-list-header']} */ ;
/** @type {__VLS_StyleScopedClasses['add-mac-form']} */ ;
/** @type {__VLS_StyleScopedClasses['mac-input']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['mac-list']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['edit-form']} */ ;
/** @type {__VLS_StyleScopedClasses['mac-input']} */ ;
/** @type {__VLS_StyleScopedClasses['edit-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['action-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['no-data']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['no-data-mobile']} */ ;
/** @type {__VLS_StyleScopedClasses['table-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['edit-form']} */ ;
/** @type {__VLS_StyleScopedClasses['mac-input']} */ ;
/** @type {__VLS_StyleScopedClasses['edit-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['card-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ConfirmationDialog: ConfirmationDialog,
            qa: qa,
            slug: slug,
            t: t,
            sortedEntries: sortedEntries,
            selectedSSID: selectedSSID,
            selectedEntry: selectedEntry,
            showMacList: showMacList,
            macAddresses: macAddresses,
            newMacAddress: newMacAddress,
            editingIndex: editingIndex,
            error: error,
            showConfirmDialog: showConfirmDialog,
            confirmDialogAction: confirmDialogAction,
            aclModeOptions: aclModeOptions,
            addMacAddress: addMacAddress,
            startEditMac: startEditMac,
            deleteMacAddress: deleteMacAddress,
            confirmDeleteMac: confirmDeleteMac,
            saveEditedMac: saveEditedMac,
            cancelEdit: cancelEdit,
            updateACLMode: updateACLMode,
            confirmACLModeChange: confirmACLModeChange,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
