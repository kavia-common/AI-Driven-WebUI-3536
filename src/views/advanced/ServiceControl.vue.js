import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getServiceControl, updateServiceControl } from '../../services/api/serviceControl';
import ServiceControlModal from './service-control/ServiceControlModal.vue';
import ConfirmationDialog from '../../components/ConfirmationDialog.vue';
import { useQA } from '../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const serviceControlData = ref(null);
const loading = ref(false);
const error = ref(null);
const showModal = ref(false);
const editingRule = ref(null);
const originalServiceName = ref(null);
const showSuccess = ref(false);
const showConfirmDialog = ref(false);
const ruleToDelete = ref(null);
// Computed properties for display
const protocolMap = computed(() => {
    if (!serviceControlData.value)
        return {};
    const map = Object.fromEntries(serviceControlData.value.AdvancedServiceControl.ACLAvailableOptions.Protocols.map(p => [p.value, p.label]));
    // Add support for combined protocols
    map['17,6'] = 'UDP/TCP';
    map['6,17'] = 'TCP/UDP';
    map['1,58'] = 'ICMP (v4/v6)';
    map['2'] = 'IGMP';
    return map;
});
const interfaceMap = computed(() => {
    if (!serviceControlData.value)
        return {};
    const map = Object.fromEntries(serviceControlData.value.AdvancedServiceControl.ACLAvailableOptions.Interfaces.map(i => [i.value, i.label]));
    return map;
});
const ipVersionMap = computed(() => {
    if (!serviceControlData.value)
        return {};
    const map = Object.fromEntries(serviceControlData.value.AdvancedServiceControl.ACLAvailableOptions.IPVersions.map(i => [i.value, i.label]));
    // Handle special cases for "Both" IP versions
    map['0'] = 'Both IPv4 & IPv6';
    return map;
});
// Fetch service control data
const fetchServiceControl = async () => {
    loading.value = true;
    error.value = null;
    try {
        serviceControlData.value = await getServiceControl();
        // 保險：補上 InterfaceOriginal（舊資料或舊後端時）
        const rules = serviceControlData.value.AdvancedServiceControl.Rules || [];
        serviceControlData.value.AdvancedServiceControl.Rules = rules.map(r => ({
            ...r,
            InterfaceOriginal: r.InterfaceOriginal ?? r.Interface,
        }));
    }
    catch (err) {
        console.error('Error fetching service control data:', err);
        error.value = 'Failed to fetch service control data';
    }
    finally {
        loading.value = false;
    }
};
// Handle adding a new rule
const handleAddRule = () => {
    if (!serviceControlData.value)
        return;
    const defaultProtocol = serviceControlData.value.AdvancedServiceControl.ACLAvailableOptions.Protocols[0].value;
    const defaultInterface = serviceControlData.value.AdvancedServiceControl.ACLAvailableOptions.Interfaces.find(i => i.label === 'wan')?.value ||
        serviceControlData.value.AdvancedServiceControl.ACLAvailableOptions.Interfaces[0].value;
    editingRule.value = {
        DestPort: "",
        Protocol: defaultProtocol,
        Action: "Accept",
        Enable: true,
        Service: "",
        Interface: defaultInterface,
        InterfaceOriginal: defaultInterface,
        IPVersion: 4
    };
    originalServiceName.value = null;
    showModal.value = true;
};
// Handle editing an existing rule
const handleEditRule = (rule) => {
    editingRule.value = { ...rule };
    originalServiceName.value = rule.Service;
    showModal.value = true;
};
// Handle deleting a rule
const handleDeleteRule = async (service) => {
    ruleToDelete.value = service;
    showConfirmDialog.value = true;
};
// Confirm delete rule
const confirmDeleteRule = async () => {
    if (!ruleToDelete.value || !serviceControlData.value)
        return;
    try {
        const updatedRules = serviceControlData.value.AdvancedServiceControl.Rules.filter(rule => rule.Service !== ruleToDelete.value);
        await updateServiceControl({
            AdvancedServiceControl: {
                Rules: updatedRules
            }
        });
        await fetchServiceControl();
        showSuccessMessage();
    }
    catch (err) {
        console.error('Error deleting rule:', err);
        error.value = 'Failed to delete rule';
    }
    finally {
        showConfirmDialog.value = false;
        ruleToDelete.value = null;
    }
};
// Handle saving a rule
const handleSaveRule = async (rule) => {
    if (!serviceControlData.value)
        return;
    const isNewRule = !originalServiceName.value;
    let updatedRules;
    if (isNewRule) {
        // Adding a new rule
        updatedRules = [...serviceControlData.value.AdvancedServiceControl.Rules, rule];
    }
    else {
        // Editing an existing rule
        updatedRules = serviceControlData.value.AdvancedServiceControl.Rules.filter(r => r.Service !== originalServiceName.value);
        updatedRules.push(rule);
    }
    try {
        await updateServiceControl({
            AdvancedServiceControl: {
                Rules: updatedRules
            }
        });
        await fetchServiceControl();
        showModal.value = false;
        editingRule.value = null;
        originalServiceName.value = null;
        showSuccessMessage();
    }
    catch (err) {
        console.error('Error saving rule:', err);
        error.value = 'Failed to save rule';
    }
};
// Show success message
const showSuccessMessage = () => {
    showSuccess.value = true;
    setTimeout(() => {
        showSuccess.value = false;
    }, 3000);
};
// Format IP version for display
const formatIPVersion = (version) => {
    if (version === -1 || version === 0)
        return 'Both IPv4 & IPv6';
    return `IPv${version}`;
};
onMounted(fetchServiceControl);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['add-rule-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title-sp']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
    'data-testid': (__VLS_ctx.qa('service-control-title')),
});
(__VLS_ctx.t('serviceControl.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('service-control-content')),
});
if (__VLS_ctx.loading && !__VLS_ctx.serviceControlData) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('service-control-loading')),
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
        'data-testid': (__VLS_ctx.qa('service-control-error')),
    });
    (__VLS_ctx.error);
}
else if (__VLS_ctx.serviceControlData) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
        'data-testid': (__VLS_ctx.qa('service-control-panel')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "header-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "section-title-sp" },
        'data-testid': (__VLS_ctx.qa('service-control-management-title')),
    });
    (__VLS_ctx.t('serviceControl.management'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleAddRule) },
        ...{ class: "btn btn-primary add-rule-btn" },
        'data-testid': (__VLS_ctx.qa('service-control-add-rule-button')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('serviceControl.addRule'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-container" },
        'data-testid': (__VLS_ctx.qa('service-control-table')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('service-control-header-service-type')),
    });
    (__VLS_ctx.t('serviceControl.serviceType'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('service-control-header-port')),
    });
    (__VLS_ctx.t('ssh.port'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('service-control-header-access-direction')),
    });
    (__VLS_ctx.t('serviceControl.accessDirection'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('service-control-header-protocol')),
    });
    (__VLS_ctx.t('serviceControl.protocol'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('service-control-header-ip-range')),
    });
    (__VLS_ctx.t('serviceControl.ipRange'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('service-control-header-status')),
    });
    (__VLS_ctx.t('serviceControl.status'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('service-control-header-action')),
    });
    (__VLS_ctx.t('serviceControl.action'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [rule, ruleIndex] of __VLS_getVForSourceType((__VLS_ctx.serviceControlData.AdvancedServiceControl.Rules))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: (rule.Service),
            'data-testid': (__VLS_ctx.qa(`service-control-row-${ruleIndex}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`service-control-service-${ruleIndex}`)),
        });
        (rule.Service);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`service-control-port-${ruleIndex}`)),
        });
        (rule.DestPort);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`service-control-access-direction-${ruleIndex}`)),
        });
        (__VLS_ctx.interfaceMap[rule.Interface] || rule.Interface);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`service-control-protocol-${ruleIndex}`)),
        });
        (__VLS_ctx.protocolMap[rule.Protocol] || rule.Protocol);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (__VLS_ctx.ipVersionMap[rule.IPVersion.toString()] || __VLS_ctx.formatIPVersion(rule.IPVersion));
        if (rule.SourceIPStart && rule.SourceIPEnd) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            (rule.SourceIPStart);
            (rule.SourceIPEnd);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: (rule.Enable ? 'status-enabled' : 'status-disabled') },
            'data-testid': (__VLS_ctx.qa(`service-control-status-${ruleIndex}`)),
        });
        (rule.Enable ? __VLS_ctx.t('serviceControl.enabled') : __VLS_ctx.t('serviceControl.disabled'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "action-buttons" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading && !__VLS_ctx.serviceControlData))
                        return;
                    if (!!(__VLS_ctx.error))
                        return;
                    if (!(__VLS_ctx.serviceControlData))
                        return;
                    __VLS_ctx.handleEditRule(rule);
                } },
            ...{ class: "btn-action" },
            'data-testid': (__VLS_ctx.qa(`service-control-edit-button-${ruleIndex}`)),
            title: "Edit",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading && !__VLS_ctx.serviceControlData))
                        return;
                    if (!!(__VLS_ctx.error))
                        return;
                    if (!(__VLS_ctx.serviceControlData))
                        return;
                    __VLS_ctx.handleDeleteRule(rule.Service);
                } },
            ...{ class: "btn-action" },
            'data-testid': (__VLS_ctx.qa(`service-control-delete-button-${ruleIndex}`)),
            title: "Delete",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
    }
    if (__VLS_ctx.serviceControlData.AdvancedServiceControl.Rules.length === 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            'data-testid': (__VLS_ctx.qa('service-control-no-data-row')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            colspan: "7",
            ...{ class: "no-data" },
            'data-testid': (__VLS_ctx.qa('service-control-no-data')),
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mobile-cards" },
        'data-testid': (__VLS_ctx.qa('service-control-mobile')),
    });
    if (__VLS_ctx.serviceControlData.AdvancedServiceControl.Rules.length === 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "no-data-mobile" },
            'data-testid': (__VLS_ctx.qa('service-control-no-data-mobile')),
        });
    }
    for (const [rule, ruleIndex] of __VLS_getVForSourceType((__VLS_ctx.serviceControlData.AdvancedServiceControl.Rules))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "table-card" },
            key: (rule.Service),
            'data-testid': (__VLS_ctx.qa(`service-control-card-${ruleIndex}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`service-control-card-service-label-${ruleIndex}`)),
        });
        (__VLS_ctx.t('serviceControl.serviceType'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`service-control-card-service-value-${ruleIndex}`)),
        });
        (rule.Service);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`service-control-card-port-label-${ruleIndex}`)),
        });
        (__VLS_ctx.t('ssh.port'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`service-control-card-port-value-${ruleIndex}`)),
        });
        (rule.DestPort);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`service-control-card-access-direction-label-${ruleIndex}`)),
        });
        (__VLS_ctx.t('serviceControl.accessDirection'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`service-control-card-access-direction-value-${ruleIndex}`)),
        });
        (__VLS_ctx.interfaceMap[rule.Interface] || rule.Interface);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`service-control-card-protocol-label-${ruleIndex}`)),
        });
        (__VLS_ctx.t('serviceControl.protocol'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`service-control-card-protocol-value-${ruleIndex}`)),
        });
        (__VLS_ctx.protocolMap[rule.Protocol] || rule.Protocol);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`service-control-card-ip-range-label-${ruleIndex}`)),
        });
        (__VLS_ctx.t('serviceControl.ipRange'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
        });
        (__VLS_ctx.formatIPVersion(rule.IPVersion));
        if (rule.SourceIPStart && rule.SourceIPEnd) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            (rule.SourceIPStart);
            (rule.SourceIPEnd);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`service-control-card-status-label-${ruleIndex}`)),
        });
        (__VLS_ctx.t('serviceControl.status'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            ...{ class: (rule.Enable ? 'status-enabled' : 'status-disabled') },
            'data-testid': (__VLS_ctx.qa(`service-control-card-status-value-${ruleIndex}`)),
        });
        (rule.Enable ? __VLS_ctx.t('serviceControl.enabled') : __VLS_ctx.t('serviceControl.disabled'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-actions" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading && !__VLS_ctx.serviceControlData))
                        return;
                    if (!!(__VLS_ctx.error))
                        return;
                    if (!(__VLS_ctx.serviceControlData))
                        return;
                    __VLS_ctx.handleEditRule(rule);
                } },
            ...{ class: "btn-action" },
            'data-testid': (__VLS_ctx.qa(`service-control-card-edit-button-${ruleIndex}`)),
            title: "Edit",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading && !__VLS_ctx.serviceControlData))
                        return;
                    if (!!(__VLS_ctx.error))
                        return;
                    if (!(__VLS_ctx.serviceControlData))
                        return;
                    __VLS_ctx.handleDeleteRule(rule.Service);
                } },
            ...{ class: "btn-action" },
            'data-testid': (__VLS_ctx.qa(`service-control-card-delete-button-${ruleIndex}`)),
            title: "Delete",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
    }
}
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
        'data-testid': (__VLS_ctx.qa('service-control-success-message')),
    });
}
if (__VLS_ctx.showModal && __VLS_ctx.editingRule && __VLS_ctx.serviceControlData) {
    /** @type {[typeof ServiceControlModal, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(ServiceControlModal, new ServiceControlModal({
        ...{ 'onSave': {} },
        ...{ 'onCancel': {} },
        dataTestid: (__VLS_ctx.qa('service-control-modal')),
        rule: (__VLS_ctx.editingRule),
        options: (__VLS_ctx.serviceControlData.AdvancedServiceControl.ACLAvailableOptions),
    }));
    const __VLS_1 = __VLS_0({
        ...{ 'onSave': {} },
        ...{ 'onCancel': {} },
        dataTestid: (__VLS_ctx.qa('service-control-modal')),
        rule: (__VLS_ctx.editingRule),
        options: (__VLS_ctx.serviceControlData.AdvancedServiceControl.ACLAvailableOptions),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_3;
    let __VLS_4;
    let __VLS_5;
    const __VLS_6 = {
        onSave: (__VLS_ctx.handleSaveRule)
    };
    const __VLS_7 = {
        onCancel: (...[$event]) => {
            if (!(__VLS_ctx.showModal && __VLS_ctx.editingRule && __VLS_ctx.serviceControlData))
                return;
            __VLS_ctx.showModal = false;
        }
    };
    var __VLS_2;
}
/** @type {[typeof ConfirmationDialog, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(ConfirmationDialog, new ConfirmationDialog({
    ...{ 'onConfirm': {} },
    ...{ 'onCancel': {} },
    isOpen: (__VLS_ctx.showConfirmDialog),
    dataTestid: (__VLS_ctx.qa('service-control-confirm-dialog')),
    title: (__VLS_ctx.t('serviceControl.confirmDelete')),
    message: (__VLS_ctx.t('serviceControl.confirmDelete')),
}));
const __VLS_9 = __VLS_8({
    ...{ 'onConfirm': {} },
    ...{ 'onCancel': {} },
    isOpen: (__VLS_ctx.showConfirmDialog),
    dataTestid: (__VLS_ctx.qa('service-control-confirm-dialog')),
    title: (__VLS_ctx.t('serviceControl.confirmDelete')),
    message: (__VLS_ctx.t('serviceControl.confirmDelete')),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
let __VLS_11;
let __VLS_12;
let __VLS_13;
const __VLS_14 = {
    onConfirm: (__VLS_ctx.confirmDeleteRule)
};
const __VLS_15 = {
    onCancel: (...[$event]) => {
        __VLS_ctx.showConfirmDialog = false;
    }
};
var __VLS_10;
/** @type {__VLS_StyleScopedClasses['page-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['header-row']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title-sp']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['add-rule-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['action-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
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
/** @type {__VLS_StyleScopedClasses['success-message']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ServiceControlModal: ServiceControlModal,
            ConfirmationDialog: ConfirmationDialog,
            qa: qa,
            t: t,
            serviceControlData: serviceControlData,
            loading: loading,
            error: error,
            showModal: showModal,
            editingRule: editingRule,
            showSuccess: showSuccess,
            showConfirmDialog: showConfirmDialog,
            protocolMap: protocolMap,
            interfaceMap: interfaceMap,
            ipVersionMap: ipVersionMap,
            handleAddRule: handleAddRule,
            handleEditRule: handleEditRule,
            handleDeleteRule: handleDeleteRule,
            confirmDeleteRule: confirmDeleteRule,
            handleSaveRule: handleSaveRule,
            formatIPVersion: formatIPVersion,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
