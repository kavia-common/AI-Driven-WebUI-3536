import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import PortForwardingForm from '../../../components/nat/PortForwardingForm.vue';
import ConfirmationDialog from '../../../components/ConfirmationDialog.vue';
import { portForwardingApi } from '../../../services/api/portForwarding';
const { t } = useI18n();
const rules = ref([]);
const wanList = ref([]);
const protoList = ref([]);
const isEditing = ref(false);
const editingRule = ref(null);
const showDeleteDialog = ref(false);
const ruleToDelete = ref(null);
const loading = ref(true);
const errorMessage = ref('');
const fetchRules = async () => {
    loading.value = true;
    try {
        const response = await portForwardingApi.getConfig();
        rules.value = response.PortForwarding.PortForwardList || [];
        wanList.value = response.PortForwarding.WanList || [];
        protoList.value = response.PortForwarding.ProtoList || [];
    }
    catch (error) {
        console.error('Failed to load port forwarding config:', error);
    }
    finally {
        loading.value = false;
    }
};
const handleAdd = () => {
    const maxNo = rules.value.length > 0
        ? Math.max(...rules.value.map(r => r.No))
        : 0;
    editingRule.value = {
        No: maxNo + 1,
        Enable: true,
        Description: '',
        Protocol: protoList.value[0] || 'Both',
        Interface: wanList.value[0] || '',
        ExternalPortRange: '',
        InternalPort: '',
        InternalIPAdress: ''
    };
    isEditing.value = true;
};
const handleEdit = (rule) => {
    editingRule.value = { ...rule };
    isEditing.value = true;
};
const handleDelete = (rule) => {
    ruleToDelete.value = rule;
    showDeleteDialog.value = true;
};
const handleRuleUpdate = (rule) => {
    editingRule.value = rule;
};
const handleSave = async () => {
    if (!editingRule.value)
        return;
    try {
        loading.value = true;
        errorMessage.value = '';
        const existingRule = rules.value.find(r => r.No === editingRule.value.No);
        let updatedRules;
        if (existingRule) {
            updatedRules = rules.value.map(r => r.No === editingRule.value.No ? editingRule.value : r);
        }
        else {
            updatedRules = [...rules.value, editingRule.value];
        }
        const response = await portForwardingApi.updateConfig({
            PortForwarding: {
                PortForwardList: updatedRules
            }
        });
        if (response.PortForwarding.NOK) {
            errorMessage.value = response.PortForwarding.NOK;
            return;
        }
        await fetchRules();
        isEditing.value = false;
        editingRule.value = null;
    }
    catch (error) {
        console.error('Failed to save port forwarding rule:', error);
        errorMessage.value = error instanceof Error ? error.message : 'Failed to save port forwarding rule';
    }
    finally {
        loading.value = false;
    }
};
const confirmDelete = async () => {
    if (!ruleToDelete.value)
        return;
    try {
        loading.value = true;
        errorMessage.value = '';
        const updatedRules = rules.value.filter(r => r.No !== ruleToDelete.value.No);
        const response = await portForwardingApi.updateConfig({
            PortForwarding: {
                PortForwardList: updatedRules
            }
        });
        if (response.PortForwarding.NOK) {
            errorMessage.value = response.PortForwarding.NOK;
            showDeleteDialog.value = false;
            return;
        }
        await fetchRules();
        showDeleteDialog.value = false;
        ruleToDelete.value = null;
    }
    catch (error) {
        console.error('Failed to delete port forwarding rule:', error);
        errorMessage.value = error instanceof Error ? error.message : 'Failed to delete port forwarding rule';
    }
    finally {
        loading.value = false;
    }
};
onMounted(fetchRules);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['status-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['status-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['error-banner']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['error-banner']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['error-banner']} */ ;
/** @type {__VLS_StyleScopedClasses['error-banner']} */ ;
/** @type {__VLS_StyleScopedClasses['close-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['error-banner']} */ ;
/** @type {__VLS_StyleScopedClasses['close-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title-sp']} */ ;
/** @type {__VLS_StyleScopedClasses['rule-list']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['error-banner']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-cards']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "port-forwarding-management" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-title-sp" },
});
(__VLS_ctx.$t('portForwarding.title'));
if (!__VLS_ctx.isEditing) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleAdd) },
        ...{ class: "btn btn-primary" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    (__VLS_ctx.$t('common.add'));
}
if (__VLS_ctx.errorMessage) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-banner" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.errorMessage);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.errorMessage))
                    return;
                __VLS_ctx.errorMessage = '';
            } },
        ...{ class: "close-btn" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
}
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-spinner" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.$t('common.loading'));
}
else if (!__VLS_ctx.isEditing) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "rule-list" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-container" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    (__VLS_ctx.$t('portForwarding.number'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    (__VLS_ctx.$t('portForwarding.enable'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    (__VLS_ctx.$t('portForwarding.description'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    (__VLS_ctx.$t('portForwarding.protocol'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    (__VLS_ctx.$t('portForwarding.externalPortRange'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    (__VLS_ctx.$t('portForwarding.internalPortRange'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    (__VLS_ctx.$t('portForwarding.internalIPAddress'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    (__VLS_ctx.$t('portForwarding.active'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [rule, index] of __VLS_getVForSourceType((__VLS_ctx.rules))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: (rule.No),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (rule.No);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "status-badge" },
            ...{ class: (rule.Enable ? 'enabled' : 'disabled') },
        });
        (rule.Enable ? '1' : '0');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (rule.Description || '-');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (rule.Protocol.toLowerCase());
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (rule.ExternalPortRange);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (rule.InternalPort);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (rule.InternalIPAdress);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "action-buttons" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!(!__VLS_ctx.isEditing))
                        return;
                    __VLS_ctx.handleEdit(rule);
                } },
            ...{ class: "btn-action" },
            title: (__VLS_ctx.$t('common.edit')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!(!__VLS_ctx.isEditing))
                        return;
                    __VLS_ctx.handleDelete(rule);
                } },
            ...{ class: "btn-action" },
            title: (__VLS_ctx.$t('common.delete')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
    }
    if (__VLS_ctx.rules.length === 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            colspan: "8",
            ...{ class: "no-data" },
        });
        (__VLS_ctx.$t('portForwarding.noRules'));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mobile-cards" },
    });
    if (__VLS_ctx.rules.length === 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "no-data-mobile" },
        });
        (__VLS_ctx.$t('portForwarding.noRules'));
    }
    else {
        for (const [rule] of __VLS_getVForSourceType((__VLS_ctx.rules))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "table-card" },
                key: (rule.No),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
            });
            (__VLS_ctx.$t('portForwarding.number'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
            });
            (rule.No);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
            });
            (__VLS_ctx.$t('portForwarding.enable'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "status-badge" },
                ...{ class: (rule.Enable ? 'enabled' : 'disabled') },
            });
            (rule.Enable ? '1' : '0');
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
            });
            (__VLS_ctx.$t('portForwarding.description'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
            });
            (rule.Description || '-');
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
            });
            (__VLS_ctx.$t('portForwarding.protocol'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
            });
            (rule.Protocol.toLowerCase());
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
            });
            (__VLS_ctx.$t('portForwarding.externalPortRange'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
            });
            (rule.ExternalPortRange);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
            });
            (__VLS_ctx.$t('portForwarding.internalPortRange'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
            });
            (rule.InternalPort);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
            });
            (__VLS_ctx.$t('portForwarding.internalIPAddress'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
            });
            (rule.InternalIPAdress);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-actions" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!(!__VLS_ctx.isEditing))
                            return;
                        if (!!(__VLS_ctx.rules.length === 0))
                            return;
                        __VLS_ctx.handleEdit(rule);
                    } },
                ...{ class: "btn-action" },
                title: (__VLS_ctx.$t('common.edit')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!(!__VLS_ctx.isEditing))
                            return;
                        if (!!(__VLS_ctx.rules.length === 0))
                            return;
                        __VLS_ctx.handleDelete(rule);
                    } },
                ...{ class: "btn-action" },
                title: (__VLS_ctx.$t('common.delete')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
        }
    }
}
else {
    if (__VLS_ctx.editingRule) {
        /** @type {[typeof PortForwardingForm, ]} */ ;
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(PortForwardingForm, new PortForwardingForm({
            ...{ 'onUpdate:rule': {} },
            ...{ 'onSave': {} },
            ...{ 'onCancel': {} },
            rule: (__VLS_ctx.editingRule),
            wanList: (__VLS_ctx.wanList),
            protoList: (__VLS_ctx.protoList),
        }));
        const __VLS_1 = __VLS_0({
            ...{ 'onUpdate:rule': {} },
            ...{ 'onSave': {} },
            ...{ 'onCancel': {} },
            rule: (__VLS_ctx.editingRule),
            wanList: (__VLS_ctx.wanList),
            protoList: (__VLS_ctx.protoList),
        }, ...__VLS_functionalComponentArgsRest(__VLS_0));
        let __VLS_3;
        let __VLS_4;
        let __VLS_5;
        const __VLS_6 = {
            'onUpdate:rule': (__VLS_ctx.handleRuleUpdate)
        };
        const __VLS_7 = {
            onSave: (__VLS_ctx.handleSave)
        };
        const __VLS_8 = {
            onCancel: (...[$event]) => {
                if (!!(__VLS_ctx.loading))
                    return;
                if (!!(!__VLS_ctx.isEditing))
                    return;
                if (!(__VLS_ctx.editingRule))
                    return;
                __VLS_ctx.isEditing = false;
            }
        };
        var __VLS_2;
    }
}
/** @type {[typeof ConfirmationDialog, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(ConfirmationDialog, new ConfirmationDialog({
    ...{ 'onConfirm': {} },
    ...{ 'onCancel': {} },
    isOpen: (__VLS_ctx.showDeleteDialog),
    title: (__VLS_ctx.$t('portForwarding.deleteRule')),
    message: (__VLS_ctx.$t('portForwarding.deleteConfirmMessage')),
}));
const __VLS_10 = __VLS_9({
    ...{ 'onConfirm': {} },
    ...{ 'onCancel': {} },
    isOpen: (__VLS_ctx.showDeleteDialog),
    title: (__VLS_ctx.$t('portForwarding.deleteRule')),
    message: (__VLS_ctx.$t('portForwarding.deleteConfirmMessage')),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onConfirm: (__VLS_ctx.confirmDelete)
};
const __VLS_16 = {
    onCancel: (...[$event]) => {
        __VLS_ctx.showDeleteDialog = false;
    }
};
var __VLS_11;
/** @type {__VLS_StyleScopedClasses['port-forwarding-management']} */ ;
/** @type {__VLS_StyleScopedClasses['header-row']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title-sp']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['error-banner']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['close-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['rule-list']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['status-badge']} */ ;
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
/** @type {__VLS_StyleScopedClasses['status-badge']} */ ;
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
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            PortForwardingForm: PortForwardingForm,
            ConfirmationDialog: ConfirmationDialog,
            rules: rules,
            wanList: wanList,
            protoList: protoList,
            isEditing: isEditing,
            editingRule: editingRule,
            showDeleteDialog: showDeleteDialog,
            loading: loading,
            errorMessage: errorMessage,
            handleAdd: handleAdd,
            handleEdit: handleEdit,
            handleDelete: handleDelete,
            handleRuleUpdate: handleRuleUpdate,
            handleSave: handleSave,
            confirmDelete: confirmDelete,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
