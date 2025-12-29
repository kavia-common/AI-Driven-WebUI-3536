import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getUpnpSettings, updateUpnpSettings } from '../../services/api/upnp';
import BlockingOverlay from '../../components/BlockingOverlay.vue';
import { useQA } from '../../utils/qa';
const { isQAMode, qa } = useQA();
const { t } = useI18n();
const loading = ref(false);
const saving = ref(false);
const error = ref(null);
const upnpEnable = ref(false);
const selectedInterface = ref('');
const interfaceOptions = ref([]);
const portMappings = ref([]);
const totalClients = ref(0);
const loadUpnpSettings = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await getUpnpSettings();
        upnpEnable.value = response.ApplicationUpnp.Enable;
        selectedInterface.value = response.ApplicationUpnp.Interface;
        if (response.ApplicationUpnp.InterfaceOptions) {
            interfaceOptions.value = response.ApplicationUpnp.InterfaceOptions;
        }
        if (response.ApplicationUpnp.PortMappings) {
            portMappings.value = response.ApplicationUpnp.PortMappings;
        }
        if (response.ApplicationUpnp.PortMappingStats) {
            totalClients.value = response.ApplicationUpnp.PortMappingStats.total;
        }
    }
    catch (err) {
        console.error('Failed to load UPnP settings:', err);
        error.value = t('upnp.loadError');
    }
    finally {
        loading.value = false;
    }
};
const handleApply = async () => {
    saving.value = true;
    error.value = null;
    try {
        const updateData = {
            ApplicationUpnp: {
                Enable: upnpEnable.value,
                Interface: selectedInterface.value
            }
        };
        const response = await updateUpnpSettings(updateData);
        if (response.ApplicationUpnp.status === 'success') {
            await loadUpnpSettings();
        }
        else {
            error.value = t('upnp.updateError');
        }
    }
    catch (err) {
        console.error('Failed to update UPnP settings:', err);
        error.value = t('upnp.updateError');
    }
    finally {
        saving.value = false;
    }
};
const handleRefresh = () => {
    loadUpnpSettings();
};
onMounted(() => {
    loadUpnpSettings();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['service-list-container']} */ ;
/** @type {__VLS_StyleScopedClasses['upnp-table']} */ ;
/** @type {__VLS_StyleScopedClasses['upnp-table']} */ ;
/** @type {__VLS_StyleScopedClasses['upnp-table']} */ ;
/** @type {__VLS_StyleScopedClasses['upnp-table']} */ ;
/** @type {__VLS_StyleScopedClasses['upnp-table']} */ ;
/** @type {__VLS_StyleScopedClasses['table-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['form-row']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['service-list-container']} */ ;
/** @type {__VLS_StyleScopedClasses['service-list-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header-row']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title-sp']} */ ;
/** @type {__VLS_StyleScopedClasses['service-list-content']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-container" },
});
/** @type {[typeof BlockingOverlay, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(BlockingOverlay, new BlockingOverlay({
    isVisible: (__VLS_ctx.saving),
    message: (__VLS_ctx.t('common.loading')),
}));
const __VLS_1 = __VLS_0({
    isVisible: (__VLS_ctx.saving),
    message: (__VLS_ctx.t('common.loading')),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
    'data-testid': (__VLS_ctx.qa('upnp-title')),
});
(__VLS_ctx.t('upnp.title'));
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-message" },
        'data-testid': (__VLS_ctx.qa('upnp-error')),
    });
    (__VLS_ctx.error);
}
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-container" },
        'data-testid': (__VLS_ctx.qa('upnp-loading')),
    });
    (__VLS_ctx.t('common.loading'));
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "status-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
        'data-testid': (__VLS_ctx.qa('upnp-panel')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "form-label" },
        'data-testid': (__VLS_ctx.qa('upnp-enable-label')),
    });
    (__VLS_ctx.t('upnp.enable'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-control" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch" },
        'data-testid': (__VLS_ctx.qa('upnp-enable-switch')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "checkbox",
        'data-testid': (__VLS_ctx.qa('upnp-enable-input')),
    });
    (__VLS_ctx.upnpEnable);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    if (0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-row" },
            'data-testid': (__VLS_ctx.qa('upnp-interface-row')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-label" },
            'data-testid': (__VLS_ctx.qa('upnp-interface-label')),
        });
        (__VLS_ctx.t('upnp.interfaceSelection'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-control" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
            value: (__VLS_ctx.selectedInterface),
            ...{ class: "form-select" },
            'data-testid': (__VLS_ctx.qa('upnp-interface-select')),
        });
        for (const [option] of __VLS_getVForSourceType((__VLS_ctx.interfaceOptions))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
                key: (option.value),
                value: (option.value),
                'data-testid': (__VLS_ctx.qa(`upnp-interface-option-${option.label}`)),
            });
            (option.label.toUpperCase());
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "service-list-container" },
        'data-testid': (__VLS_ctx.qa('upnp-service-list')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "header-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "section-title-sp" },
        'data-testid': (__VLS_ctx.qa('upnp-service-list-title')),
    });
    (__VLS_ctx.t('upnp.serviceList'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleRefresh) },
        ...{ class: "btn btn-primary" },
        disabled: (__VLS_ctx.loading),
        'data-testid': (__VLS_ctx.qa('upnp-refresh-button')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    (__VLS_ctx.t('upnp.refresh'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "service-list-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "clients-info" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "clients-count" },
    });
    (__VLS_ctx.t('upnp.totalClients'));
    (__VLS_ctx.totalClients);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-container" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
        ...{ class: "upnp-table" },
        'data-testid': (__VLS_ctx.qa('upnp-service-table')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    (__VLS_ctx.t('upnp.id'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    (__VLS_ctx.t('upnp.serviceDescription'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    (__VLS_ctx.t('upnp.externalPort'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    (__VLS_ctx.t('upnp.protocol'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    (__VLS_ctx.t('upnp.internalIpAddress'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    (__VLS_ctx.t('upnp.internalPort'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    if (__VLS_ctx.portMappings.length === 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            colspan: "6",
            ...{ class: "no-data" },
        });
        (__VLS_ctx.t('upnp.noServices'));
    }
    else {
        for (const [mapping] of __VLS_getVForSourceType((__VLS_ctx.portMappings))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
                key: (mapping.Id),
                'data-testid': (__VLS_ctx.qa(`upnp-service-row-${mapping.Id}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            (mapping.Id);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            (mapping.Description || '--');
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            (mapping.ExternalPort || '--');
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            (mapping.Protocol || '--');
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            (mapping.InternalClient || '--');
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            (mapping.InternalPort || '--');
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mobile-cards" },
        'data-testid': (__VLS_ctx.qa('upnp-mobile-cards')),
    });
    if (__VLS_ctx.portMappings.length === 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "no-data-mobile" },
            'data-testid': (__VLS_ctx.qa('upnp-no-data-mobile')),
        });
        (__VLS_ctx.t('upnp.noServices'));
    }
    else {
        for (const [mapping] of __VLS_getVForSourceType((__VLS_ctx.portMappings))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "table-card" },
                key: (mapping.Id),
                'data-testid': (__VLS_ctx.qa(`upnp-card-${mapping.Id}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
            });
            (__VLS_ctx.t('upnp.id'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
            });
            (mapping.Id);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
            });
            (__VLS_ctx.t('upnp.serviceDescription'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
            });
            (mapping.Description || '--');
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
            });
            (__VLS_ctx.t('upnp.externalPort'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
            });
            (mapping.ExternalPort || '--');
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
            });
            (__VLS_ctx.t('upnp.protocol'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
            });
            (mapping.Protocol || '--');
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
            });
            (__VLS_ctx.t('upnp.internalIpAddress'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
            });
            (mapping.InternalClient || '--');
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
            });
            (__VLS_ctx.t('upnp.internalPort'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
            });
            (mapping.InternalPort || '--');
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-actions" },
        'data-testid': (__VLS_ctx.qa('upnp-actions')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleApply) },
        ...{ class: "btn btn-primary" },
        disabled: (__VLS_ctx.saving),
        'data-testid': (__VLS_ctx.qa('upnp-apply-button')),
    });
    (__VLS_ctx.t('upnp.apply'));
}
/** @type {__VLS_StyleScopedClasses['page-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-container']} */ ;
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-row']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['service-list-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header-row']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title-sp']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['service-list-content']} */ ;
/** @type {__VLS_StyleScopedClasses['clients-info']} */ ;
/** @type {__VLS_StyleScopedClasses['clients-count']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['upnp-table']} */ ;
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
/** @type {__VLS_StyleScopedClasses['form-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            BlockingOverlay: BlockingOverlay,
            qa: qa,
            t: t,
            loading: loading,
            saving: saving,
            error: error,
            upnpEnable: upnpEnable,
            selectedInterface: selectedInterface,
            interfaceOptions: interfaceOptions,
            portMappings: portMappings,
            totalClients: totalClients,
            handleApply: handleApply,
            handleRefresh: handleRefresh,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
