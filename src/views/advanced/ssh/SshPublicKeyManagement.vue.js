import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getSshAuthorizedKeys, updateSshAuthorizedKeys } from '../../../services/api/ssh';
import { extractKeyComment, isValidSshKey } from '../../../utils/sshUtils';
import SshPublicKeyViewer from '../../../components/ssh/SshPublicKeyViewer.vue';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const keys = ref([]);
const loading = ref(true);
const showKeyModal = ref(false);
const selectedKey = ref(null);
const newKey = ref('');
const error = ref('');
const fetchKeys = async () => {
    loading.value = true;
    try {
        const response = await getSshAuthorizedKeys();
        keys.value = response.SshAuthorizedKey;
    }
    catch (error) {
        console.error('Error fetching SSH keys:', error);
    }
    finally {
        loading.value = false;
    }
};
const handleViewKey = (key) => {
    selectedKey.value = key;
    showKeyModal.value = true;
};
const handleCloseViewer = () => {
    showKeyModal.value = false;
    selectedKey.value = null;
};
const handleDelete = async (key) => {
    if (!confirm(t('ssh.confirmDeleteKey')))
        return;
    try {
        const updatedKeys = keys.value.filter(k => k.Key !== key.Key);
        await updateSshAuthorizedKeys(updatedKeys);
        await fetchKeys();
    }
    catch (error) {
        console.error('Error deleting SSH key:', error);
    }
};
const handleAddKey = async () => {
    const key = newKey.value.trim();
    if (!key)
        return;
    if (!isValidSshKey(key)) {
        error.value = 'Invalid SSH key format';
        return;
    }
    try {
        const newKeyObj = { Key: key };
        await updateSshAuthorizedKeys([...keys.value, newKeyObj]);
        await fetchKeys();
        newKey.value = '';
        error.value = '';
    }
    catch (error) {
        console.error('Error adding SSH key:', error);
    }
};
onMounted(fetchKeys);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title-sp']} */ ;
/** @type {__VLS_StyleScopedClasses['key-list']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "key-management" },
    'data-testid': (__VLS_ctx.qa('ssh-key-management-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-title-sp" },
    'data-testid': (__VLS_ctx.qa('ssh-key-management-title')),
});
(__VLS_ctx.t('ssh.publicKeyManagement'));
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('ssh-key-management-loading')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-spinner" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('common.loading'));
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "key-list" },
        'data-testid': (__VLS_ctx.qa('ssh-key-management-list')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-container" },
        'data-testid': (__VLS_ctx.qa('ssh-key-management-table')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('ssh-key-management-header-comment')),
    });
    (__VLS_ctx.t('ssh.comment'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('ssh-key-management-header-algorithm')),
    });
    (__VLS_ctx.t('ssh.algorithm'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('ssh-key-management-header-public-key')),
    });
    (__VLS_ctx.t('ssh.publicKey'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('ssh-key-management-header-action')),
    });
    (__VLS_ctx.t('ssh.action'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [key, index] of __VLS_getVForSourceType((__VLS_ctx.keys))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: (key.Key),
            'data-testid': (__VLS_ctx.qa(`ssh-key-management-row-${index}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`ssh-key-management-comment-${index}`)),
        });
        (__VLS_ctx.extractKeyComment(key.Key));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`ssh-key-management-algorithm-${index}`)),
        });
        (key.Key.split(' ')[0]);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    __VLS_ctx.handleViewKey(key);
                } },
            ...{ class: "btn btn-view" },
            'data-testid': (__VLS_ctx.qa(`ssh-key-management-view-${index}`)),
        });
        (__VLS_ctx.t('ssh.clickToView'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    __VLS_ctx.handleDelete(key);
                } },
            ...{ class: "btn-action" },
            'data-testid': (__VLS_ctx.qa(`ssh-key-management-delete-${index}`)),
            title: "Delete",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
    }
    if (__VLS_ctx.keys.length === 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            'data-testid': (__VLS_ctx.qa('ssh-key-management-no-data-row')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            colspan: "4",
            ...{ class: "no-data" },
            'data-testid': (__VLS_ctx.qa('ssh-key-management-no-data')),
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mobile-cards" },
        'data-testid': (__VLS_ctx.qa('ssh-key-management-mobile')),
    });
    if (__VLS_ctx.keys.length === 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "no-data-mobile" },
            'data-testid': (__VLS_ctx.qa('ssh-key-management-no-data-mobile')),
        });
    }
    else {
        for (const [key, index] of __VLS_getVForSourceType((__VLS_ctx.keys))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "table-card" },
                key: (key.Key),
                'data-testid': (__VLS_ctx.qa(`ssh-key-management-card-${index}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`ssh-key-management-card-comment-label-${index}`)),
            });
            (__VLS_ctx.t('ssh.comment'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`ssh-key-management-card-comment-value-${index}`)),
            });
            (__VLS_ctx.extractKeyComment(key.Key));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`ssh-key-management-card-algorithm-label-${index}`)),
            });
            (__VLS_ctx.t('ssh.algorithm'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`ssh-key-management-card-algorithm-value-${index}`)),
            });
            (key.Key.split(' ')[0]);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-actions" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.keys.length === 0))
                            return;
                        __VLS_ctx.handleViewKey(key);
                    } },
                ...{ class: "btn btn-view" },
                'data-testid': (__VLS_ctx.qa(`ssh-key-management-card-view-${index}`)),
            });
            (__VLS_ctx.t('ssh.clickToView'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.keys.length === 0))
                            return;
                        __VLS_ctx.handleDelete(key);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`ssh-key-management-card-delete-${index}`)),
                title: "Delete",
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "add-key-section" },
        'data-testid': (__VLS_ctx.qa('ssh-key-management-add-section')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "section-title" },
        'data-testid': (__VLS_ctx.qa('ssh-key-management-add-title')),
    });
    (__VLS_ctx.t('ssh.newSshKey'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({
        'data-testid': (__VLS_ctx.qa('ssh-key-management-add-textarea')),
        value: (__VLS_ctx.newKey),
        placeholder: (__VLS_ctx.t('ssh.enterNewSshKey')),
        rows: "4",
    });
    if (__VLS_ctx.error) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "error-message" },
            'data-testid': (__VLS_ctx.qa('ssh-key-management-add-error')),
        });
        (__VLS_ctx.error);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "button-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.loading))
                    return;
                __VLS_ctx.newKey = '';
            } },
        ...{ class: "btn btn-secondary" },
        'data-testid': (__VLS_ctx.qa('ssh-key-management-add-cancel')),
    });
    (__VLS_ctx.t('common.cancel'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleAddKey) },
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('ssh-key-management-add-create')),
    });
    (__VLS_ctx.t('common.create'));
}
if (__VLS_ctx.showKeyModal && __VLS_ctx.selectedKey) {
    /** @type {[typeof SshPublicKeyViewer, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(SshPublicKeyViewer, new SshPublicKeyViewer({
        dataTestid: (__VLS_ctx.qa('ssh-key-management-viewer')),
        publicKey: (__VLS_ctx.selectedKey),
        onClose: (__VLS_ctx.handleCloseViewer),
    }));
    const __VLS_1 = __VLS_0({
        dataTestid: (__VLS_ctx.qa('ssh-key-management-viewer')),
        publicKey: (__VLS_ctx.selectedKey),
        onClose: (__VLS_ctx.handleCloseViewer),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
/** @type {__VLS_StyleScopedClasses['key-management']} */ ;
/** @type {__VLS_StyleScopedClasses['header-row']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title-sp']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['key-list']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-view']} */ ;
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
/** @type {__VLS_StyleScopedClasses['card-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-view']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['add-key-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            extractKeyComment: extractKeyComment,
            SshPublicKeyViewer: SshPublicKeyViewer,
            qa: qa,
            t: t,
            keys: keys,
            loading: loading,
            showKeyModal: showKeyModal,
            selectedKey: selectedKey,
            newKey: newKey,
            error: error,
            handleViewKey: handleViewKey,
            handleCloseViewer: handleCloseViewer,
            handleDelete: handleDelete,
            handleAddKey: handleAddKey,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
