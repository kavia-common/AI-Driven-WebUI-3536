import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getTR369Config, updateTR369Config } from '../../../services/api/tr369';
import TR369ControllerEdit from './TR369ControllerEdit.vue';
import TR369ControllerDetail from './TR369ControllerDetail.vue';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const agentEndpointID = ref('');
const controllers = ref([]);
const tempControllers = ref([]);
const loading = ref(false);
const error = ref(null);
const isEditing = ref(false);
const editingController = ref(null);
const viewingController = ref(null);
const showSuccess = ref(false);
const canAddController = computed(() => tempControllers.value.length < 5);
const fetchConfig = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await getTR369Config();
        agentEndpointID.value = response.TR369.AgentEndpointID;
        controllers.value = response.TR369.Controller;
        tempControllers.value = [...response.TR369.Controller];
    }
    catch (err) {
        console.error('Error fetching TR-369 config:', err);
        error.value = 'Failed to fetch TR-369 configuration';
    }
    finally {
        loading.value = false;
    }
};
const handleAdd = () => {
    if (!canAddController.value) {
        alert(t('device.maxControllersReached'));
        return;
    }
    editingController.value = {
        Enable: 1,
        Alias: '',
        ControllerEndpointID: '',
        ControllerTopic: '',
        AgentTopic: '',
        BrokerAddress: '',
        BrokerPort: 0,
        Username: '',
        Password: '',
        ClientID: '',
        PeriodicNotify: 30,
        KeepAliveTime: 60,
        ConnectRetryTime: 5,
        ConnectRetryMaxInterval: 60,
        ProtocolVersion: '3.1.1',
        TransportProtocol: 'TCP/IP'
    };
    isEditing.value = true;
};
const handleEdit = (controller) => {
    editingController.value = { ...controller };
    isEditing.value = true;
};
const handleDetail = (controller) => {
    viewingController.value = controller;
};
const handleSave = async (controller) => {
    const updatedControllers = editingController.value?.Alias
        ? tempControllers.value.map(c => c.Alias === editingController.value?.Alias ? controller : c)
        : [...tempControllers.value, controller];
    tempControllers.value = updatedControllers;
    isEditing.value = false;
    editingController.value = null;
};
const handleDelete = async (alias) => {
    if (!confirm(t('device.confirmDelete')))
        return;
    tempControllers.value = tempControllers.value.filter(c => c.Alias !== alias);
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
        const sanitizedControllers = tempControllers.value.map((c) => ({
            ...c,
            Enable: c.Enable ? 1 : 0, // 預設為啟用
            BrokerPort: Number(c.BrokerPort),
            ProtocolVersion: String(c.ProtocolVersion),
            Password: c.Password ?? "", // 防止 undefined
            ClientID: c.ClientID ?? "", // 防止 undefined
        }));
        await updateTR369Config({
            TR369: {
                AgentEndpointID: agentEndpointID.value,
                Controller: sanitizedControllers
            }
        });
        controllers.value = [...sanitizedControllers];
        showSuccessMessage();
    }
    catch (err) {
        console.error('Error updating TR-369 config:', err);
        error.value = 'Failed to update TR-369 configuration';
    }
    finally {
        loading.value = false;
    }
};
const handleCancel = () => {
    tempControllers.value = [...controllers.value];
};
onMounted(fetchConfig);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['agent-id-section']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['tr369-config']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tr369-config" },
    'data-testid': (__VLS_ctx.qa('tr369-config-content')),
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('tr369-config-loading')),
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
        'data-testid': (__VLS_ctx.qa('tr369-config-error')),
    });
    (__VLS_ctx.error);
}
else {
    if (!__VLS_ctx.isEditing && !__VLS_ctx.viewingController) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "agent-id-section" },
            'data-testid': (__VLS_ctx.qa('tr369-config-agent-endpoint-section')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            'data-testid': (__VLS_ctx.qa('tr369-config-agent-endpoint-label')),
        });
        (__VLS_ctx.t('device.agentEndpointId'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "text",
            'data-testid': (__VLS_ctx.qa('tr369-config-agent-endpoint-input')),
            value: (__VLS_ctx.agentEndpointID),
            disabled: true,
            ...{ class: "agent-id-input" },
        });
    }
    if (!__VLS_ctx.isEditing && !__VLS_ctx.viewingController) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "panel-section" },
            'data-testid': (__VLS_ctx.qa('tr369-config-controllers-section')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "header-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-title-sp" },
            'data-testid': (__VLS_ctx.qa('tr369-config-controllers-title')),
        });
        (__VLS_ctx.t('device.controller'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handleAdd) },
            ...{ class: "btn btn-primary" },
            'data-testid': (__VLS_ctx.qa('tr369-config-add-controller-button')),
            disabled: (!__VLS_ctx.canAddController),
            title: (!__VLS_ctx.canAddController ? __VLS_ctx.t('device.maxControllersReached') : ''),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
        (__VLS_ctx.t('device.addController'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-content" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "table-container" },
            'data-testid': (__VLS_ctx.qa('tr369-config-controllers-table')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('tr369-config-controllers-header-alias')),
        });
        (__VLS_ctx.t('device.alias'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('tr369-config-controllers-header-endpoint-id')),
        });
        (__VLS_ctx.t('device.endpointId'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('tr369-config-controllers-header-controller-topic')),
        });
        (__VLS_ctx.t('device.controllerTopic'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('tr369-config-controllers-header-status')),
        });
        (__VLS_ctx.t('device.status'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('tr369-config-controllers-header-action')),
        });
        (__VLS_ctx.t('device.action'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
        for (const [controller, index] of __VLS_getVForSourceType((__VLS_ctx.tempControllers))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
                key: (controller.Alias),
                'data-testid': (__VLS_ctx.qa(`tr369-config-controllers-row-${index}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`tr369-config-controllers-alias-${index}`)),
            });
            (controller.Alias);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`tr369-config-controllers-endpoint-id-${index}`)),
            });
            (controller.ControllerEndpointID);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`tr369-config-controllers-controller-topic-${index}`)),
            });
            (controller.ControllerTopic);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`tr369-config-controllers-status-${index}`)),
            });
            (controller.Status);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "action-buttons" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!(!__VLS_ctx.isEditing && !__VLS_ctx.viewingController))
                            return;
                        __VLS_ctx.handleEdit(controller);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`tr369-config-controllers-edit-${index}`)),
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
                        if (!(!__VLS_ctx.isEditing && !__VLS_ctx.viewingController))
                            return;
                        __VLS_ctx.handleDelete(controller.Alias);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`tr369-config-controllers-delete-${index}`)),
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
                        if (!(!__VLS_ctx.isEditing && !__VLS_ctx.viewingController))
                            return;
                        __VLS_ctx.handleDetail(controller);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`tr369-config-controllers-detail-${index}`)),
                title: "Detail",
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "mobile-cards" },
            'data-testid': (__VLS_ctx.qa('tr369-config-controllers-mobile')),
        });
        for (const [controller, index] of __VLS_getVForSourceType((__VLS_ctx.tempControllers))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "table-card" },
                key: (controller.Alias),
                'data-testid': (__VLS_ctx.qa(`tr369-config-controllers-card-${index}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`tr369-config-controllers-card-alias-label-${index}`)),
            });
            (__VLS_ctx.t('device.alias'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`tr369-config-controllers-card-alias-value-${index}`)),
            });
            (controller.Alias);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`tr369-config-controllers-card-endpoint-id-label-${index}`)),
            });
            (__VLS_ctx.t('device.endpointId'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`tr369-config-controllers-card-endpoint-id-value-${index}`)),
            });
            (controller.ControllerEndpointID);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`tr369-config-controllers-card-controller-topic-label-${index}`)),
            });
            (__VLS_ctx.t('device.controllerTopic'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`tr369-config-controllers-card-controller-topic-value-${index}`)),
            });
            (controller.ControllerTopic);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`tr369-config-controllers-card-status-label-${index}`)),
            });
            (__VLS_ctx.t('device.status'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`tr369-config-controllers-card-status-value-${index}`)),
            });
            (controller.Status);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-actions" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!(!__VLS_ctx.isEditing && !__VLS_ctx.viewingController))
                            return;
                        __VLS_ctx.handleEdit(controller);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`tr369-config-controllers-card-edit-${index}`)),
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
                        if (!(!__VLS_ctx.isEditing && !__VLS_ctx.viewingController))
                            return;
                        __VLS_ctx.handleDelete(controller.Alias);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`tr369-config-controllers-card-delete-${index}`)),
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
                        if (!(!__VLS_ctx.isEditing && !__VLS_ctx.viewingController))
                            return;
                        __VLS_ctx.handleDetail(controller);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`tr369-config-controllers-card-detail-${index}`)),
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
            'data-testid': (__VLS_ctx.qa('tr369-config-controllers-cancel-button')),
        });
        (__VLS_ctx.t('common.cancel'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handleApply) },
            ...{ class: "btn btn-primary" },
            'data-testid': (__VLS_ctx.qa('tr369-config-controllers-apply-button')),
        });
        (__VLS_ctx.t('common.apply'));
    }
    else if (__VLS_ctx.isEditing && __VLS_ctx.editingController) {
        /** @type {[typeof TR369ControllerEdit, ]} */ ;
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(TR369ControllerEdit, new TR369ControllerEdit({
            ...{ 'onSave': {} },
            ...{ 'onCancel': {} },
            dataTestid: (__VLS_ctx.qa('tr369-config-controller-edit')),
            controller: (__VLS_ctx.editingController),
        }));
        const __VLS_1 = __VLS_0({
            ...{ 'onSave': {} },
            ...{ 'onCancel': {} },
            dataTestid: (__VLS_ctx.qa('tr369-config-controller-edit')),
            controller: (__VLS_ctx.editingController),
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
                if (!!(!__VLS_ctx.isEditing && !__VLS_ctx.viewingController))
                    return;
                if (!(__VLS_ctx.isEditing && __VLS_ctx.editingController))
                    return;
                __VLS_ctx.isEditing = false;
            }
        };
        var __VLS_2;
    }
    else if (__VLS_ctx.viewingController) {
        /** @type {[typeof TR369ControllerDetail, ]} */ ;
        // @ts-ignore
        const __VLS_8 = __VLS_asFunctionalComponent(TR369ControllerDetail, new TR369ControllerDetail({
            ...{ 'onBack': {} },
            dataTestid: (__VLS_ctx.qa('tr369-config-controller-detail')),
            controller: (__VLS_ctx.viewingController),
        }));
        const __VLS_9 = __VLS_8({
            ...{ 'onBack': {} },
            dataTestid: (__VLS_ctx.qa('tr369-config-controller-detail')),
            controller: (__VLS_ctx.viewingController),
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
                if (!!(!__VLS_ctx.isEditing && !__VLS_ctx.viewingController))
                    return;
                if (!!(__VLS_ctx.isEditing && __VLS_ctx.editingController))
                    return;
                if (!(__VLS_ctx.viewingController))
                    return;
                __VLS_ctx.viewingController = null;
            }
        };
        var __VLS_10;
    }
}
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
        'data-testid': (__VLS_ctx.qa('tr369-config-success-message')),
    });
    (__VLS_ctx.t('common.apply'));
}
/** @type {__VLS_StyleScopedClasses['tr369-config']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['agent-id-section']} */ ;
/** @type {__VLS_StyleScopedClasses['agent-id-input']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['header-row']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title-sp']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
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
            TR369ControllerEdit: TR369ControllerEdit,
            TR369ControllerDetail: TR369ControllerDetail,
            qa: qa,
            t: t,
            agentEndpointID: agentEndpointID,
            tempControllers: tempControllers,
            loading: loading,
            error: error,
            isEditing: isEditing,
            editingController: editingController,
            viewingController: viewingController,
            showSuccess: showSuccess,
            canAddController: canAddController,
            handleAdd: handleAdd,
            handleEdit: handleEdit,
            handleDetail: handleDetail,
            handleSave: handleSave,
            handleDelete: handleDelete,
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
