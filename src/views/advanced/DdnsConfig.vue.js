import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getDdns, updateDdns } from '../../services/api';
import { useQA } from '../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const ddnsData = ref(null);
const isEditing = ref(false);
const editingService = ref(null);
const loading = ref(false);
const error = ref(null);
const showSuccess = ref(false);
const fetchDdns = async () => {
    loading.value = true;
    error.value = null;
    try {
        ddnsData.value = await getDdns();
    }
    catch (err) {
        console.error('Error fetching DDNS settings:', err);
        error.value = 'Failed to fetch DDNS settings';
    }
    finally {
        loading.value = false;
    }
};
const handleEdit = (service) => {
    editingService.value = { ...service };
    isEditing.value = true;
};
const handleDelete = async (serviceId) => {
    if (!ddnsData.value)
        return;
    if (!confirm(t('ddns.confirmDelete')))
        return;
    try {
        const updatedServices = ddnsData.value.Ddns.Service.filter(s => s.ID !== serviceId);
        await updateDdns({
            Ddns: {
                Service: updatedServices
            }
        });
        await fetchDdns();
    }
    catch (error) {
        console.error('Error deleting DDNS service:', error);
    }
};
const handleAdd = () => {
    if (!ddnsData.value)
        return;
    const newId = `no-${ddnsData.value.Ddns.ServNum + 1}`;
    editingService.value = {
        ID: newId,
        ServProv: ddnsData.value.Ddns.SupServProv[0],
        ServUsername: '',
        ServPassword: '',
        DomainName: '',
        UpdatedIP: ddnsData.value.Ddns.Interfaces[0],
        HostEnable: 1
    };
    isEditing.value = true;
};
const showSuccessMessage = () => {
    showSuccess.value = true;
    setTimeout(() => {
        showSuccess.value = false;
    }, 3000);
};
const handleSave = async (service) => {
    if (!ddnsData.value)
        return;
    try {
        const existingIndex = ddnsData.value.Ddns.Service.findIndex(s => s.ID === service.ID);
        let updatedServices;
        if (existingIndex >= 0) {
            updatedServices = [...ddnsData.value.Ddns.Service];
            updatedServices[existingIndex] = service;
        }
        else {
            updatedServices = [...ddnsData.value.Ddns.Service, service];
        }
        await updateDdns({
            Ddns: {
                Service: updatedServices
            }
        });
        showSuccessMessage();
        isEditing.value = false;
        editingService.value = null;
        await fetchDdns();
    }
    catch (error) {
        console.error('Error saving DDNS service:', error);
    }
};
const handleCancel = () => {
    isEditing.value = false;
    editingService.value = null;
};
onMounted(fetchDdns);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['edit-view']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
/** @type {__VLS_StyleScopedClasses['edit-view']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['card-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
    'data-testid': (__VLS_ctx.qa('ddns-title')),
});
(__VLS_ctx.t('ddns.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('ddns-content')),
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('ddns-loading')),
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
        'data-testid': (__VLS_ctx.qa('ddns-error')),
    });
    (__VLS_ctx.error);
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
        'data-testid': (__VLS_ctx.qa('ddns-panel')),
    });
    if (!__VLS_ctx.isEditing) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "management-view" },
            'data-testid': (__VLS_ctx.qa('ddns-management-view')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "header-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-title-sp" },
            'data-testid': (__VLS_ctx.qa('ddns-management-title')),
        });
        (__VLS_ctx.t('ddns.management'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "actions" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handleAdd) },
            ...{ class: "btn btn-primary" },
            'data-testid': (__VLS_ctx.qa('ddns-add-service-button')),
        });
        (__VLS_ctx.t('ddns.addService'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.fetchDdns) },
            ...{ class: "btn btn-secondary" },
            'data-testid': (__VLS_ctx.qa('ddns-refresh-button')),
        });
        (__VLS_ctx.t('ddns.refresh'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-content" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "table-container" },
            'data-testid': (__VLS_ctx.qa('ddns-table')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('ddns-header-no')),
        });
        (__VLS_ctx.t('ddns.no'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('ddns-header-provider')),
        });
        (__VLS_ctx.t('ddns.provider'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('ddns-header-domain')),
        });
        (__VLS_ctx.t('ddns.domain'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('ddns-header-status')),
        });
        (__VLS_ctx.t('ddns.status'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('ddns-header-last-update')),
        });
        (__VLS_ctx.t('ddns.lastUpdate'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('ddns-header-action')),
        });
        (__VLS_ctx.t('ddns.action'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
        for (const [service, index] of __VLS_getVForSourceType((__VLS_ctx.ddnsData?.Ddns.Service))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
                key: (service.ID),
                'data-testid': (__VLS_ctx.qa(`ddns-row-${index}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`ddns-no-${index}`)),
            });
            (index + 1);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`ddns-provider-${index}`)),
            });
            (service.ServProv);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`ddns-domain-${index}`)),
            });
            (service.DomainName);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`ddns-status-${index}`)),
            });
            (service.Status);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`ddns-last-update-${index}`)),
            });
            (service.LastUpdate);
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
                        if (!(!__VLS_ctx.isEditing))
                            return;
                        __VLS_ctx.handleEdit(service);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`ddns-edit-button-${index}`)),
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
                        if (!(!__VLS_ctx.isEditing))
                            return;
                        __VLS_ctx.handleDelete(service.ID);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`ddns-delete-button-${index}`)),
                title: "Delete",
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "mobile-cards" },
            'data-testid': (__VLS_ctx.qa('ddns-mobile')),
        });
        for (const [service, index] of __VLS_getVForSourceType((__VLS_ctx.ddnsData?.Ddns.Service))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "table-card" },
                key: (service.ID),
                'data-testid': (__VLS_ctx.qa(`ddns-card-${index}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`ddns-card-no-label-${index}`)),
            });
            (__VLS_ctx.t('ddns.no'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`ddns-card-no-value-${index}`)),
            });
            (index + 1);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`ddns-card-provider-label-${index}`)),
            });
            (__VLS_ctx.t('ddns.provider'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`ddns-card-provider-value-${index}`)),
            });
            (service.ServProv);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`ddns-card-domain-label-${index}`)),
            });
            (__VLS_ctx.t('ddns.domain'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`ddns-card-domain-value-${index}`)),
            });
            (service.DomainName);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`ddns-card-status-label-${index}`)),
            });
            (__VLS_ctx.t('ddns.status'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`ddns-card-status-value-${index}`)),
            });
            (service.Status);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`ddns-card-last-update-label-${index}`)),
            });
            (__VLS_ctx.t('ddns.lastUpdate'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`ddns-card-last-update-value-${index}`)),
            });
            (service.LastUpdate);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-actions" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!(!__VLS_ctx.isEditing))
                            return;
                        __VLS_ctx.handleEdit(service);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`ddns-card-edit-button-${index}`)),
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
                        if (!(!__VLS_ctx.isEditing))
                            return;
                        __VLS_ctx.handleDelete(service.ID);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`ddns-card-delete-button-${index}`)),
                title: "Delete",
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
        }
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "edit-view" },
            'data-testid': (__VLS_ctx.qa('ddns-edit-view')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
            'data-testid': (__VLS_ctx.qa('ddns-edit-title')),
        });
        (__VLS_ctx.editingService?.ID ? __VLS_ctx.t('ddns.editService') : __VLS_ctx.t('ddns.addService'));
        if (__VLS_ctx.editingService && __VLS_ctx.ddnsData) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
                ...{ onSubmit: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!!(!__VLS_ctx.isEditing))
                            return;
                        if (!(__VLS_ctx.editingService && __VLS_ctx.ddnsData))
                            return;
                        __VLS_ctx.handleSave(__VLS_ctx.editingService);
                    } },
                'data-testid': (__VLS_ctx.qa('ddns-edit-form')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('ddns-edit-provider-label')),
            });
            (__VLS_ctx.t('ddns.provider'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
                value: (__VLS_ctx.editingService.ServProv),
                'data-testid': (__VLS_ctx.qa('ddns-edit-provider-select')),
            });
            for (const [provider] of __VLS_getVForSourceType((__VLS_ctx.ddnsData.Ddns.SupServProv))) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
                    key: (provider),
                    value: (provider),
                });
                (provider);
            }
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('ddns-edit-domain-label')),
            });
            (__VLS_ctx.t('ddns.domain'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
                type: "text",
                'data-testid': (__VLS_ctx.qa('ddns-edit-domain-input')),
                value: (__VLS_ctx.editingService.DomainName),
                required: true,
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('ddns-edit-username-label')),
            });
            (__VLS_ctx.t('ddns.username'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
                type: "text",
                'data-testid': (__VLS_ctx.qa('ddns-edit-username-input')),
                value: (__VLS_ctx.editingService.ServUsername),
                required: true,
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('ddns-edit-password-label')),
            });
            (__VLS_ctx.t('ddns.password'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
                type: "password",
                'data-testid': (__VLS_ctx.qa('ddns-edit-password-input')),
                required: true,
            });
            (__VLS_ctx.editingService.ServPassword);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                'data-testid': (__VLS_ctx.qa('ddns-edit-interface-label')),
            });
            (__VLS_ctx.t('ddns.wanInterface'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
                value: (__VLS_ctx.editingService.UpdatedIP),
                'data-testid': (__VLS_ctx.qa('ddns-edit-interface-select')),
            });
            for (const [iface] of __VLS_getVForSourceType((__VLS_ctx.ddnsData.Ddns.Interfaces))) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
                    key: (iface),
                    value: (iface),
                });
                (iface);
            }
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "form-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "switch-label" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                'data-testid': (__VLS_ctx.qa('ddns-edit-enable-label')),
            });
            (__VLS_ctx.t('common.enable'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                ...{ class: "switch" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
                type: "checkbox",
                'data-testid': (__VLS_ctx.qa('ddns-edit-enable-toggle')),
                'true-value': (1),
                'false-value': (0),
            });
            (__VLS_ctx.editingService.HostEnable);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "slider" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "button-group" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (__VLS_ctx.handleCancel) },
                type: "button",
                ...{ class: "btn btn-secondary" },
                'data-testid': (__VLS_ctx.qa('ddns-edit-cancel-button')),
            });
            (__VLS_ctx.t('ddns.cancel'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                type: "submit",
                ...{ class: "btn btn-primary" },
                'data-testid': (__VLS_ctx.qa('ddns-edit-save-button')),
            });
            (__VLS_ctx.t('ddns.save'));
        }
    }
}
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
        'data-testid': (__VLS_ctx.qa('ddns-success-message')),
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
/** @type {__VLS_StyleScopedClasses['management-view']} */ ;
/** @type {__VLS_StyleScopedClasses['header-row']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title-sp']} */ ;
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['action-buttons']} */ ;
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
/** @type {__VLS_StyleScopedClasses['card-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['edit-view']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
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
            qa: qa,
            t: t,
            ddnsData: ddnsData,
            isEditing: isEditing,
            editingService: editingService,
            loading: loading,
            error: error,
            showSuccess: showSuccess,
            fetchDdns: fetchDdns,
            handleEdit: handleEdit,
            handleDelete: handleDelete,
            handleAdd: handleAdd,
            handleSave: handleSave,
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
