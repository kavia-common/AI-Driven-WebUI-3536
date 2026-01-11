import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getWanModeManagement, updateWanModeManagement } from '../../../services/api/wanManagement';
import WanModeEdit from './WanModeEdit.vue';
import WanModeDetail from './WanModeDetail.vue';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const managementData = ref([]);
const tempManagementData = ref([]);
const loading = ref(false);
const showSuccess = ref(false);
const error = ref(null);
const isEditing = ref(false);
const editingMode = ref(null);
const viewingMode = ref(null);
const fetchManagementData = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await getWanModeManagement();
        managementData.value = response.WanModeManagement;
        tempManagementData.value = JSON.parse(JSON.stringify(response.WanModeManagement));
    }
    catch (err) {
        console.error('Error fetching WAN mode management:', err);
        error.value = 'Failed to fetch WAN mode management';
    }
    finally {
        loading.value = false;
    }
};
const handleAdd = () => {
    editingMode.value = {
        WANMode: '',
        Status: 'Enabled',
        PhysicalType: 'Ethernet',
        EnableSensing: 1,
        DNSMode: 'Dynamic',
        IPv6DNSMode: 'Dynamic',
        Interfaces: [{
                Interface: 'wan',
                IPv4Mode: 'dhcp4',
                IPv6Mode: 'none',
                PPPoEUserName: '',
                PPPoEPassword: '',
                VLANType: 'untagged',
                VLANID: 100,
                VLANPriority: 0,
                StaticIPv4Address: {
                    IPv4Address: '',
                    SubnetMask: '',
                    DNSServers: '',
                    DefaultRouter: ''
                },
                StaticIPv6Address: {
                    IPv6Address: '',
                    PrefixLength: 0,
                    DNSServers: '',
                    DefaultRouter: ''
                }
            }]
    };
    isEditing.value = true;
};
const handleEdit = (mode) => {
    editingMode.value = JSON.parse(JSON.stringify(mode));
    isEditing.value = true;
};
const handleDelete = async (mode) => {
    if (!confirm(t('wanManagement.confirmDelete')))
        return;
    try {
        const updatedModes = tempManagementData.value.filter(m => m.WANMode !== mode.WANMode);
        tempManagementData.value = updatedModes;
    }
    catch (err) {
        console.error('Error deleting WAN mode:', err);
        error.value = 'Failed to delete WAN mode';
    }
};
const handleDetail = (mode) => {
    viewingMode.value = mode;
};
const handleSave = async (mode) => {
    try {
        const updatedModes = editingMode.value?.WANMode
            ? tempManagementData.value.map(m => m.WANMode === editingMode.value?.WANMode ? mode : m)
            : [...tempManagementData.value, mode];
        tempManagementData.value = updatedModes;
        isEditing.value = false;
        editingMode.value = null;
    }
    catch (err) {
        console.error('Error saving WAN mode:', err);
        error.value = 'Failed to save WAN mode';
    }
};
const showSuccessMessage = () => {
    showSuccess.value = true;
    setTimeout(() => {
        showSuccess.value = false;
    }, 3000);
};
const handleApply = async () => {
    loading.value = true;
    try {
        await updateWanModeManagement({
            WanModeManagement: tempManagementData.value
        });
        managementData.value = JSON.parse(JSON.stringify(tempManagementData.value));
        showSuccessMessage();
    }
    catch (err) {
        console.error('Error applying WAN mode changes:', err);
        error.value = 'Failed to apply changes';
    }
    finally {
        loading.value = false;
    }
};
const handleCancel = () => {
    tempManagementData.value = JSON.parse(JSON.stringify(managementData.value));
};
onMounted(fetchManagementData);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wan-mode-management" },
    'data-testid': (__VLS_ctx.qa('wan-mode-management-content')),
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('wan-mode-management-loading')),
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
        'data-testid': (__VLS_ctx.qa('wan-mode-management-error')),
    });
    (__VLS_ctx.error);
}
else {
    if (!__VLS_ctx.isEditing && !__VLS_ctx.viewingMode) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "management-list" },
            'data-testid': (__VLS_ctx.qa('wan-mode-management-list')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "header-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-title-sp" },
            'data-testid': (__VLS_ctx.qa('wan-mode-management-title')),
        });
        (__VLS_ctx.t('wanSetup.modeManagement'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handleAdd) },
            ...{ class: "btn btn-primary" },
            'data-testid': (__VLS_ctx.qa('wan-mode-management-add-button')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
        (__VLS_ctx.t('wanManagement.addMode'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "table-container" },
            'data-testid': (__VLS_ctx.qa('wan-mode-management-table-container')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
            'data-testid': (__VLS_ctx.qa('wan-mode-management-table')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('wan-mode-management-header-name')),
        });
        (__VLS_ctx.t('wanManagement.name'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('wan-mode-management-header-enable-sensing')),
        });
        (__VLS_ctx.t('wanManagement.enableSensing'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('wan-mode-management-header-ipv4-dns-mode')),
        });
        (__VLS_ctx.t('wanManagement.ipv4DnsMode'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('wan-mode-management-header-ipv6-dns-mode')),
        });
        (__VLS_ctx.t('wanManagement.ipv6DnsMode'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('wan-mode-management-header-physical-type')),
        });
        (__VLS_ctx.t('wanManagement.physicalType'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('wan-mode-management-header-status')),
        });
        (__VLS_ctx.t('wanManagement.status'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('wan-mode-management-header-action')),
        });
        (__VLS_ctx.t('wanManagement.action'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
        for (const [mode, modeIndex] of __VLS_getVForSourceType((__VLS_ctx.tempManagementData))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
                key: (mode.WANMode),
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-row-${modeIndex}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-name-${modeIndex}`)),
            });
            (mode.WANMode);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-enable-sensing-${modeIndex}`)),
            });
            (mode.EnableSensing ? 'True' : 'False');
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-ipv4-dns-mode-${modeIndex}`)),
            });
            (mode.DNSMode);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-ipv6-dns-mode-${modeIndex}`)),
            });
            (mode.IPv6DNSMode);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-physical-type-${modeIndex}`)),
            });
            (mode.PhysicalType);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-status-${modeIndex}`)),
            });
            (mode.Status);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "action-buttons" },
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-actions-${modeIndex}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!(!__VLS_ctx.isEditing && !__VLS_ctx.viewingMode))
                            return;
                        __VLS_ctx.handleEdit(mode);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-edit-${modeIndex}`)),
                title: "Edit",
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!(!__VLS_ctx.isEditing && !__VLS_ctx.viewingMode))
                            return;
                        __VLS_ctx.handleDelete(mode);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-delete-${modeIndex}`)),
                title: "Delete",
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!(!__VLS_ctx.isEditing && !__VLS_ctx.viewingMode))
                            return;
                        __VLS_ctx.handleDetail(mode);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-detail-${modeIndex}`)),
                title: "Detail",
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "mobile-cards" },
            'data-testid': (__VLS_ctx.qa('wan-mode-management-mobile')),
        });
        for (const [mode, modeIndex] of __VLS_getVForSourceType((__VLS_ctx.tempManagementData))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "table-card" },
                key: (mode.WANMode),
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-card-${modeIndex}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-card-name-label-${modeIndex}`)),
            });
            (__VLS_ctx.t('wanManagement.name'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-card-name-value-${modeIndex}`)),
            });
            (mode.WANMode);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-card-enable-sensing-label-${modeIndex}`)),
            });
            (__VLS_ctx.t('wanManagement.enableSensing'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-card-enable-sensing-value-${modeIndex}`)),
            });
            (mode.EnableSensing ? 'True' : 'False');
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-card-ipv4-dns-mode-label-${modeIndex}`)),
            });
            (__VLS_ctx.t('wanManagement.ipv4DnsMode'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-card-ipv4-dns-mode-value-${modeIndex}`)),
            });
            (mode.DNSMode);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-card-ipv6-dns-mode-label-${modeIndex}`)),
            });
            (__VLS_ctx.t('wanManagement.ipv6DnsMode'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-card-ipv6-dns-mode-value-${modeIndex}`)),
            });
            (mode.IPv6DNSMode);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-card-physical-type-label-${modeIndex}`)),
            });
            (__VLS_ctx.t('wanManagement.physicalType'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-card-physical-type-value-${modeIndex}`)),
            });
            (mode.PhysicalType);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-card-status-label-${modeIndex}`)),
            });
            (__VLS_ctx.t('wanManagement.status'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-card-status-value-${modeIndex}`)),
            });
            (mode.Status);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-actions" },
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-card-actions-${modeIndex}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!(!__VLS_ctx.isEditing && !__VLS_ctx.viewingMode))
                            return;
                        __VLS_ctx.handleEdit(mode);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-card-edit-${modeIndex}`)),
                title: "Edit",
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!(!__VLS_ctx.isEditing && !__VLS_ctx.viewingMode))
                            return;
                        __VLS_ctx.handleDelete(mode);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-card-delete-${modeIndex}`)),
                title: "Delete",
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!(!__VLS_ctx.isEditing && !__VLS_ctx.viewingMode))
                            return;
                        __VLS_ctx.handleDetail(mode);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`wan-mode-management-card-detail-${modeIndex}`)),
                title: "Detail",
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "button-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handleCancel) },
            ...{ class: "btn btn-secondary" },
            'data-testid': (__VLS_ctx.qa('wan-mode-management-cancel-button')),
        });
        (__VLS_ctx.t('common.cancel'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handleApply) },
            ...{ class: "btn btn-primary" },
            'data-testid': (__VLS_ctx.qa('wan-mode-management-apply-button')),
        });
        (__VLS_ctx.t('common.apply'));
    }
    else if (__VLS_ctx.isEditing) {
        /** @type {[typeof WanModeEdit, ]} */ ;
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(WanModeEdit, new WanModeEdit({
            ...{ 'onSave': {} },
            ...{ 'onCancel': {} },
            dataTestid: (__VLS_ctx.qa('wan-mode-management-edit')),
            mode: (__VLS_ctx.editingMode),
        }));
        const __VLS_1 = __VLS_0({
            ...{ 'onSave': {} },
            ...{ 'onCancel': {} },
            dataTestid: (__VLS_ctx.qa('wan-mode-management-edit')),
            mode: (__VLS_ctx.editingMode),
        }, ...__VLS_functionalComponentArgsRest(__VLS_0));
        let __VLS_3;
        let __VLS_4;
        let __VLS_5;
        const __VLS_6 = {
            onSave: (__VLS_ctx.handleSave)
        };
        const __VLS_7 = {
            onCancel: (...[$event]) => {
                if (!!(__VLS_ctx.loading))
                    return;
                if (!!(__VLS_ctx.error))
                    return;
                if (!!(!__VLS_ctx.isEditing && !__VLS_ctx.viewingMode))
                    return;
                if (!(__VLS_ctx.isEditing))
                    return;
                __VLS_ctx.isEditing = false;
            }
        };
        var __VLS_2;
    }
    else if (__VLS_ctx.viewingMode) {
        /** @type {[typeof WanModeDetail, ]} */ ;
        // @ts-ignore
        const __VLS_8 = __VLS_asFunctionalComponent(WanModeDetail, new WanModeDetail({
            ...{ 'onBack': {} },
            dataTestid: (__VLS_ctx.qa('wan-mode-management-detail')),
            mode: (__VLS_ctx.viewingMode),
        }));
        const __VLS_9 = __VLS_8({
            ...{ 'onBack': {} },
            dataTestid: (__VLS_ctx.qa('wan-mode-management-detail')),
            mode: (__VLS_ctx.viewingMode),
        }, ...__VLS_functionalComponentArgsRest(__VLS_8));
        let __VLS_11;
        let __VLS_12;
        let __VLS_13;
        const __VLS_14 = {
            onBack: (...[$event]) => {
                if (!!(__VLS_ctx.loading))
                    return;
                if (!!(__VLS_ctx.error))
                    return;
                if (!!(!__VLS_ctx.isEditing && !__VLS_ctx.viewingMode))
                    return;
                if (!!(__VLS_ctx.isEditing))
                    return;
                if (!(__VLS_ctx.viewingMode))
                    return;
                __VLS_ctx.viewingMode = null;
            }
        };
        var __VLS_10;
    }
}
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
        'data-testid': (__VLS_ctx.qa('wan-mode-management-success-message')),
    });
    (__VLS_ctx.t('common.apply'));
}
/** @type {__VLS_StyleScopedClasses['wan-mode-management']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['management-list']} */ ;
/** @type {__VLS_StyleScopedClasses['header-row']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title-sp']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['action-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
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
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
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
            WanModeEdit: WanModeEdit,
            WanModeDetail: WanModeDetail,
            qa: qa,
            t: t,
            tempManagementData: tempManagementData,
            loading: loading,
            showSuccess: showSuccess,
            error: error,
            isEditing: isEditing,
            editingMode: editingMode,
            viewingMode: viewingMode,
            handleAdd: handleAdd,
            handleEdit: handleEdit,
            handleDelete: handleDelete,
            handleDetail: handleDetail,
            handleSave: handleSave,
            handleApply: handleApply,
            handleCancel: handleCancel,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
