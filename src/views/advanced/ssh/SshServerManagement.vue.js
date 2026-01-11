import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getSshServers, updateSshServers } from '../../../services/api/ssh';
import SshServerEditForm from '../../../components/ssh/SshServerEditForm.vue';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const servers = ref([]);
const interfaces = ref([]);
const isEditing = ref(false);
const editingServer = ref(null);
const loading = ref(true);
const fetchServers = async () => {
    loading.value = true;
    try {
        const response = await getSshServers();
        servers.value = response.SshServer.SshServers;
        interfaces.value = response.SshServer.Interfaces;
    }
    catch (error) {
        console.error('Error fetching SSH servers:', error);
    }
    finally {
        loading.value = false;
    }
};
const handleEdit = (server) => {
    editingServer.value = { ...server };
    isEditing.value = true;
};
const handleAdd = () => {
    editingServer.value = {
        ID: `server-${Date.now()}`,
        Interface: interfaces.value[0],
        Status: 'Disabled',
        AllowAllIPv4: 0,
        AllowAllIPv6: 0,
        AllowPasswordLogin: 1,
        AllowRootLogin: 0,
        AllowRootPasswordLogin: 0,
        AutoDisableDuration: 0,
        Enable: 1,
        IPv4AllowedSourcePrefix: '',
        IPv6AllowedSourcePrefix: '',
        IdleTimeout: 180,
        KeepAlive: 300,
        MaxAuthTries: 3,
        Port: 22
    };
    isEditing.value = true;
};
const handleSave = async () => {
    if (!editingServer.value)
        return;
    try {
        const updatedServers = editingServer.value.ID
            ? servers.value.map(s => s.ID === editingServer.value.ID ? editingServer.value : s)
            : [...servers.value, editingServer.value];
        await updateSshServers(updatedServers);
        await fetchServers();
        isEditing.value = false;
        editingServer.value = null;
    }
    catch (error) {
        console.error('Error saving SSH server:', error);
    }
};
const handleDelete = async (serverId) => {
    if (!confirm(t('ssh.confirmDelete')))
        return;
    try {
        const updatedServers = servers.value.filter(s => s.ID !== serverId);
        await updateSshServers(updatedServers);
        await fetchServers();
    }
    catch (error) {
        console.error('Error deleting SSH server:', error);
    }
};
onMounted(fetchServers);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title-sp']} */ ;
/** @type {__VLS_StyleScopedClasses['server-list']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "server-management" },
    'data-testid': (__VLS_ctx.qa('ssh-server-management-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-title-sp" },
    'data-testid': (__VLS_ctx.qa('ssh-server-management-title')),
});
(__VLS_ctx.t('ssh.serverManagement'));
if (!__VLS_ctx.isEditing) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleAdd) },
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('ssh-server-management-add-button')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    (__VLS_ctx.t('ssh.addServer'));
}
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('ssh-server-management-loading')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-spinner" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('common.loading'));
}
else if (!__VLS_ctx.isEditing) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "server-list" },
        'data-testid': (__VLS_ctx.qa('ssh-server-management-list')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-container" },
        'data-testid': (__VLS_ctx.qa('ssh-server-management-table')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('ssh-server-management-header-id')),
    });
    (__VLS_ctx.t('ssh.id'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('ssh-server-management-header-interface')),
    });
    (__VLS_ctx.t('ssh.interface'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('ssh-server-management-header-status')),
    });
    (__VLS_ctx.t('ssh.status'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('ssh-server-management-header-password-login')),
    });
    (__VLS_ctx.t('ssh.loginWithPassword'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('ssh-server-management-header-root-login')),
    });
    (__VLS_ctx.t('ssh.rootLogin'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('ssh-server-management-header-root-password-login')),
    });
    (__VLS_ctx.t('ssh.rootLoginWithPassword'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('ssh-server-management-header-action')),
    });
    (__VLS_ctx.t('ssh.action'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [server, index] of __VLS_getVForSourceType((__VLS_ctx.servers))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: (server.ID),
            'data-testid': (__VLS_ctx.qa(`ssh-server-management-row-${index}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`ssh-server-management-id-${index}`)),
        });
        (server.ID);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`ssh-server-management-interface-${index}`)),
        });
        (server.Interface);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`ssh-server-management-status-${index}`)),
        });
        (server.Status);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`ssh-server-management-password-login-${index}`)),
        });
        (server.AllowPasswordLogin ? __VLS_ctx.t('ssh.enabled') : __VLS_ctx.t('ssh.disabled'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`ssh-server-management-root-login-${index}`)),
        });
        (server.AllowRootLogin ? __VLS_ctx.t('ssh.enabled') : __VLS_ctx.t('ssh.disabled'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`ssh-server-management-root-password-login-${index}`)),
        });
        (server.AllowRootPasswordLogin ? __VLS_ctx.t('ssh.enabled') : __VLS_ctx.t('ssh.disabled'));
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
                    __VLS_ctx.handleEdit(server);
                } },
            ...{ class: "btn-action" },
            'data-testid': (__VLS_ctx.qa(`ssh-server-management-edit-${index}`)),
            title: "Edit",
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
                    __VLS_ctx.handleDelete(server.ID);
                } },
            ...{ class: "btn-action" },
            'data-testid': (__VLS_ctx.qa(`ssh-server-management-delete-${index}`)),
            title: "Delete",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
    }
    if (__VLS_ctx.servers.length === 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            'data-testid': (__VLS_ctx.qa('ssh-server-management-no-data-row')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            colspan: "7",
            ...{ class: "no-data" },
            'data-testid': (__VLS_ctx.qa('ssh-server-management-no-data')),
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mobile-cards" },
        'data-testid': (__VLS_ctx.qa('ssh-server-management-mobile')),
    });
    if (__VLS_ctx.servers.length === 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "no-data-mobile" },
            'data-testid': (__VLS_ctx.qa('ssh-server-management-no-data-mobile')),
        });
    }
    else {
        for (const [server, index] of __VLS_getVForSourceType((__VLS_ctx.servers))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "table-card" },
                key: (server.ID),
                'data-testid': (__VLS_ctx.qa(`ssh-server-management-card-${index}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`ssh-server-management-card-id-label-${index}`)),
            });
            (__VLS_ctx.t('ssh.id'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`ssh-server-management-card-id-value-${index}`)),
            });
            (server.ID);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`ssh-server-management-card-interface-label-${index}`)),
            });
            (__VLS_ctx.t('ssh.interface'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`ssh-server-management-card-interface-value-${index}`)),
            });
            (server.Interface);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`ssh-server-management-card-status-label-${index}`)),
            });
            (__VLS_ctx.t('ssh.status'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`ssh-server-management-card-status-value-${index}`)),
            });
            (server.Status);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`ssh-server-management-card-password-login-label-${index}`)),
            });
            (__VLS_ctx.t('ssh.loginWithPassword'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`ssh-server-management-card-password-login-value-${index}`)),
            });
            (server.AllowPasswordLogin ? __VLS_ctx.t('ssh.enabled') : __VLS_ctx.t('ssh.disabled'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`ssh-server-management-card-root-login-label-${index}`)),
            });
            (__VLS_ctx.t('ssh.rootLogin'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`ssh-server-management-card-root-login-value-${index}`)),
            });
            (server.AllowRootLogin ? __VLS_ctx.t('ssh.enabled') : __VLS_ctx.t('ssh.disabled'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`ssh-server-management-card-root-password-login-label-${index}`)),
            });
            (__VLS_ctx.t('ssh.rootLoginWithPassword'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`ssh-server-management-card-root-password-login-value-${index}`)),
            });
            (server.AllowRootPasswordLogin ? __VLS_ctx.t('ssh.enabled') : __VLS_ctx.t('ssh.disabled'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-actions" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!(!__VLS_ctx.isEditing))
                            return;
                        if (!!(__VLS_ctx.servers.length === 0))
                            return;
                        __VLS_ctx.handleEdit(server);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`ssh-server-management-card-edit-${index}`)),
                title: "Edit",
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
                        if (!!(__VLS_ctx.servers.length === 0))
                            return;
                        __VLS_ctx.handleDelete(server.ID);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`ssh-server-management-card-delete-${index}`)),
                title: "Delete",
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
        }
    }
}
else {
    if (__VLS_ctx.editingServer) {
        /** @type {[typeof SshServerEditForm, ]} */ ;
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(SshServerEditForm, new SshServerEditForm({
            ...{ 'onUpdate:server': {} },
            ...{ 'onSave': {} },
            ...{ 'onCancel': {} },
            dataTestid: (__VLS_ctx.qa('ssh-server-management-edit-form')),
            server: (__VLS_ctx.editingServer),
            interfaces: (__VLS_ctx.interfaces),
        }));
        const __VLS_1 = __VLS_0({
            ...{ 'onUpdate:server': {} },
            ...{ 'onSave': {} },
            ...{ 'onCancel': {} },
            dataTestid: (__VLS_ctx.qa('ssh-server-management-edit-form')),
            server: (__VLS_ctx.editingServer),
            interfaces: (__VLS_ctx.interfaces),
        }, ...__VLS_functionalComponentArgsRest(__VLS_0));
        let __VLS_3;
        let __VLS_4;
        let __VLS_5;
        const __VLS_6 = {
            'onUpdate:server': ((server) => __VLS_ctx.editingServer = server)
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
                if (!(__VLS_ctx.editingServer))
                    return;
                __VLS_ctx.isEditing = false;
            }
        };
        var __VLS_2;
    }
}
/** @type {__VLS_StyleScopedClasses['server-management']} */ ;
/** @type {__VLS_StyleScopedClasses['header-row']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title-sp']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['server-list']} */ ;
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
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            SshServerEditForm: SshServerEditForm,
            qa: qa,
            t: t,
            servers: servers,
            interfaces: interfaces,
            isEditing: isEditing,
            editingServer: editingServer,
            loading: loading,
            handleEdit: handleEdit,
            handleAdd: handleAdd,
            handleSave: handleSave,
            handleDelete: handleDelete,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
