import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getThreadCommissioner, updateThreadCommissioner } from '../../../services/api/thread';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const commissionerData = ref(null);
const loading = ref(true);
const error = ref(null);
const showSuccess = ref(false);
const successMessage = ref('');
const showAddJoinerModal = ref(false);
// Commissioner enabled state
const commissionerEnabled = ref(false);
// New joiner form data
const newJoiner = ref({
    joinerId: '*',
    pskd: '',
    timeout: 60
});
// Fetch commissioner data
const fetchCommissionerData = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await getThreadCommissioner();
        commissionerData.value = response;
        commissionerEnabled.value = response.ThreadCommissioner.Enable;
    }
    catch (err) {
        console.error('Error fetching Thread commissioner data:', err);
        error.value = 'Failed to fetch Thread commissioner data';
    }
    finally {
        loading.value = false;
    }
};
// Update commissioner enabled state
const updateCommissionerEnabled = async () => {
    loading.value = true;
    error.value = null;
    try {
        const request = {
            ThreadCommissioner: {
                Enable: commissionerEnabled.value,
                Operation: 'Add', // Dummy operation, not used for enable/disable
                JoinerId: '*',
                Pskd: '',
                Timeout: 60
            }
        };
        await updateThreadCommissioner(request);
        await fetchCommissionerData();
        showSuccessNotification(`Commissioner ${commissionerEnabled.value ? 'enabled' : 'disabled'} successfully`);
    }
    catch (err) {
        console.error('Error updating commissioner enabled state:', err);
        error.value = 'Failed to update commissioner enabled state';
    }
    finally {
        loading.value = false;
    }
};
// Add joiner
const addJoiner = async () => {
    if (!newJoiner.value.pskd) {
        error.value = 'PSKd is required';
        return;
    }
    loading.value = true;
    error.value = null;
    try {
        const request = {
            ThreadCommissioner: {
                Enable: commissionerEnabled.value,
                Operation: 'Add',
                JoinerId: newJoiner.value.joinerId,
                Pskd: newJoiner.value.pskd,
                Timeout: newJoiner.value.timeout
            }
        };
        await updateThreadCommissioner(request);
        await fetchCommissionerData();
        showSuccessNotification('Joiner added successfully');
        showAddJoinerModal.value = false;
        resetNewJoiner();
    }
    catch (err) {
        console.error('Error adding joiner:', err);
        error.value = 'Failed to add joiner';
    }
    finally {
        loading.value = false;
    }
};
// Delete joiner
const deleteJoiner = async (joinerId) => {
    loading.value = true;
    error.value = null;
    try {
        const request = {
            ThreadCommissioner: {
                Enable: commissionerEnabled.value,
                Operation: 'Delete',
                JoinerId: joinerId,
                Pskd: '',
                Timeout: 0
            }
        };
        await updateThreadCommissioner(request);
        await fetchCommissionerData();
        showSuccessNotification('Joiner deleted successfully');
    }
    catch (err) {
        console.error('Error deleting joiner:', err);
        error.value = 'Failed to delete joiner';
    }
    finally {
        loading.value = false;
    }
};
// Reset new joiner form
const resetNewJoiner = () => {
    newJoiner.value = {
        joinerId: '*',
        pskd: '',
        timeout: 60
    };
};
// Show success notification
const showSuccessNotification = (message) => {
    successMessage.value = message;
    showSuccess.value = true;
    setTimeout(() => {
        showSuccess.value = false;
    }, 3000);
};
// Open add joiner modal
const openAddJoinerModal = () => {
    resetNewJoiner();
    showAddJoinerModal.value = true;
};
// Close add joiner modal
const closeAddJoinerModal = () => {
    showAddJoinerModal.value = false;
};
onMounted(() => {
    fetchCommissionerData();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-delete']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
/** @type {__VLS_StyleScopedClasses['thread-content']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['header-row']} */ ;
/** @type {__VLS_StyleScopedClasses['action-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['action-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "thread-content" },
    'data-testid': (__VLS_ctx.qa('thread-commissioner-content')),
});
if (__VLS_ctx.loading && !__VLS_ctx.commissionerData) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('thread-commissioner-loading')),
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
        'data-testid': (__VLS_ctx.qa('thread-commissioner-error')),
    });
    (__VLS_ctx.error);
}
else if (__VLS_ctx.commissionerData) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
        'data-testid': (__VLS_ctx.qa('thread-commissioner-section')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "section-title" },
        'data-testid': (__VLS_ctx.qa('thread-commissioner-title')),
    });
    (__VLS_ctx.t('thread.commissioner'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "switch-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        'data-testid': (__VLS_ctx.qa('thread-commissioner-enable-label')),
    });
    (__VLS_ctx.t('thread.commissionerEnable'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        ...{ onChange: (__VLS_ctx.updateCommissionerEnabled) },
        type: "checkbox",
        'data-testid': (__VLS_ctx.qa('thread-commissioner-enable-toggle')),
    });
    (__VLS_ctx.commissionerEnabled);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    if (__VLS_ctx.commissionerEnabled) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "joiners-section" },
            'data-testid': (__VLS_ctx.qa('thread-commissioner-joiners-section')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "header-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-title-sp" },
            'data-testid': (__VLS_ctx.qa('thread-commissioner-joiners-title')),
        });
        (__VLS_ctx.t('thread.availableJoiner'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "action-buttons" },
            'data-testid': (__VLS_ctx.qa('thread-commissioner-action-buttons')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.openAddJoinerModal) },
            ...{ class: "btn btn-primary" },
            'data-testid': (__VLS_ctx.qa('thread-commissioner-add-joiner-button')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
        (__VLS_ctx.t('thread.add'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.fetchCommissionerData) },
            ...{ class: "btn btn-secondary" },
            'data-testid': (__VLS_ctx.qa('thread-commissioner-refresh-button')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
        (__VLS_ctx.t('thread.refresh'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "table-container" },
            'data-testid': (__VLS_ctx.qa('thread-commissioner-joiners-table')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('thread-commissioner-joiners-header-no')),
        });
        (__VLS_ctx.t('thread.no'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('thread-commissioner-joiners-header-eui64')),
        });
        (__VLS_ctx.t('thread.eui64OrDiscerner'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('thread-commissioner-joiners-header-pskd')),
        });
        (__VLS_ctx.t('thread.pskd'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('thread-commissioner-joiners-header-timeout')),
        });
        (__VLS_ctx.t('thread.timeout'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('thread-commissioner-joiners-header-operation')),
        });
        (__VLS_ctx.t('thread.operation'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
        for (const [joiner, index] of __VLS_getVForSourceType((__VLS_ctx.commissionerData.ThreadCommissioner.Joiners))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
                key: (index),
                'data-testid': (__VLS_ctx.qa(`thread-commissioner-joiners-row-${index}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`thread-commissioner-joiners-no-${index}`)),
            });
            (index + 1);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`thread-commissioner-joiners-eui64-${index}`)),
            });
            (joiner.JoinerId);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`thread-commissioner-joiners-pskd-${index}`)),
            });
            (joiner.Pskd);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`thread-commissioner-joiners-timeout-${index}`)),
            });
            (joiner.Timeout);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading && !__VLS_ctx.commissionerData))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!(__VLS_ctx.commissionerData))
                            return;
                        if (!(__VLS_ctx.commissionerEnabled))
                            return;
                        __VLS_ctx.deleteJoiner(joiner.JoinerId);
                    } },
                ...{ class: "btn-delete" },
                'data-testid': (__VLS_ctx.qa(`thread-commissioner-joiners-delete-${index}`)),
            });
            (__VLS_ctx.t('common.delete'));
        }
        if (__VLS_ctx.commissionerData.ThreadCommissioner.Joiners.length === 0) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
                'data-testid': (__VLS_ctx.qa('thread-commissioner-joiners-no-data-row')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                colspan: "5",
                ...{ class: "no-data" },
                'data-testid': (__VLS_ctx.qa('thread-commissioner-joiners-no-data')),
            });
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "mobile-cards" },
            'data-testid': (__VLS_ctx.qa('thread-commissioner-joiners-mobile')),
        });
        if (__VLS_ctx.commissionerData.ThreadCommissioner.Joiners.length === 0) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "no-data-mobile" },
                'data-testid': (__VLS_ctx.qa('thread-commissioner-joiners-no-data-mobile')),
            });
        }
        else {
            for (const [joiner, index] of __VLS_getVForSourceType((__VLS_ctx.commissionerData.ThreadCommissioner.Joiners))) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "table-card" },
                    key: (index),
                    'data-testid': (__VLS_ctx.qa(`thread-commissioner-joiners-card-${index}`)),
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "card-row" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-label" },
                    'data-testid': (__VLS_ctx.qa(`thread-commissioner-joiners-card-no-label-${index}`)),
                });
                (__VLS_ctx.t('thread.no'));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-value" },
                    'data-testid': (__VLS_ctx.qa(`thread-commissioner-joiners-card-no-value-${index}`)),
                });
                (index + 1);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "card-row" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-label" },
                    'data-testid': (__VLS_ctx.qa(`thread-commissioner-joiners-card-eui64-label-${index}`)),
                });
                (__VLS_ctx.t('thread.eui64OrDiscerner'));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-value" },
                    'data-testid': (__VLS_ctx.qa(`thread-commissioner-joiners-card-eui64-value-${index}`)),
                });
                (joiner.JoinerId);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "card-row" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-label" },
                    'data-testid': (__VLS_ctx.qa(`thread-commissioner-joiners-card-pskd-label-${index}`)),
                });
                (__VLS_ctx.t('thread.pskd'));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-value" },
                    'data-testid': (__VLS_ctx.qa(`thread-commissioner-joiners-card-pskd-value-${index}`)),
                });
                (joiner.Pskd);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "card-row" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-label" },
                    'data-testid': (__VLS_ctx.qa(`thread-commissioner-joiners-card-timeout-label-${index}`)),
                });
                (__VLS_ctx.t('thread.timeout'));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-value" },
                    'data-testid': (__VLS_ctx.qa(`thread-commissioner-joiners-card-timeout-value-${index}`)),
                });
                (joiner.Timeout);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "card-actions" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                    ...{ onClick: (...[$event]) => {
                            if (!!(__VLS_ctx.loading && !__VLS_ctx.commissionerData))
                                return;
                            if (!!(__VLS_ctx.error))
                                return;
                            if (!(__VLS_ctx.commissionerData))
                                return;
                            if (!(__VLS_ctx.commissionerEnabled))
                                return;
                            if (!!(__VLS_ctx.commissionerData.ThreadCommissioner.Joiners.length === 0))
                                return;
                            __VLS_ctx.deleteJoiner(joiner.JoinerId);
                        } },
                    ...{ class: "btn-delete" },
                    'data-testid': (__VLS_ctx.qa(`thread-commissioner-joiners-card-delete-${index}`)),
                });
                (__VLS_ctx.t('common.delete'));
            }
        }
    }
}
if (__VLS_ctx.showAddJoinerModal) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "modal-overlay" },
        'data-testid': (__VLS_ctx.qa('thread-commissioner-add-joiner-modal')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "modal-content" },
        'data-testid': (__VLS_ctx.qa('thread-commissioner-add-joiner-modal-content')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "modal-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        'data-testid': (__VLS_ctx.qa('thread-commissioner-add-joiner-modal-title')),
    });
    (__VLS_ctx.t('thread.add'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.closeAddJoinerModal) },
        ...{ class: "close-button" },
        'data-testid': (__VLS_ctx.qa('thread-commissioner-add-joiner-modal-close')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "modal-body" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('thread-commissioner-add-joiner-eui64-label')),
    });
    (__VLS_ctx.t('thread.eui64OrDiscerner'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "text",
        'data-testid': (__VLS_ctx.qa('thread-commissioner-add-joiner-eui64-input')),
        value: (__VLS_ctx.newJoiner.joinerId),
        ...{ class: "form-control" },
        placeholder: "* (any joiner)",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-hint" },
        'data-testid': (__VLS_ctx.qa('thread-commissioner-add-joiner-eui64-hint')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('thread-commissioner-add-joiner-pskd-label')),
    });
    (__VLS_ctx.t('thread.pskd'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "text",
        'data-testid': (__VLS_ctx.qa('thread-commissioner-add-joiner-pskd-input')),
        value: (__VLS_ctx.newJoiner.pskd),
        ...{ class: "form-control" },
        placeholder: "J01NME",
        required: true,
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('thread-commissioner-add-joiner-timeout-label')),
    });
    (__VLS_ctx.t('thread.timeout'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "number",
        'data-testid': (__VLS_ctx.qa('thread-commissioner-add-joiner-timeout-input')),
        ...{ class: "form-control" },
        min: "1",
        required: true,
    });
    (__VLS_ctx.newJoiner.timeout);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-hint" },
        'data-testid': (__VLS_ctx.qa('thread-commissioner-add-joiner-timeout-hint')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "modal-footer" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.closeAddJoinerModal) },
        ...{ class: "btn btn-secondary" },
        'data-testid': (__VLS_ctx.qa('thread-commissioner-add-joiner-cancel')),
    });
    (__VLS_ctx.t('common.cancel'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.addJoiner) },
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('thread-commissioner-add-joiner-save')),
        disabled: (!__VLS_ctx.newJoiner.pskd),
    });
    (__VLS_ctx.t('thread.add'));
}
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
        'data-testid': (__VLS_ctx.qa('thread-commissioner-success-message')),
    });
    (__VLS_ctx.successMessage);
}
/** @type {__VLS_StyleScopedClasses['thread-content']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['joiners-section']} */ ;
/** @type {__VLS_StyleScopedClasses['header-row']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title-sp']} */ ;
/** @type {__VLS_StyleScopedClasses['action-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-delete']} */ ;
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
/** @type {__VLS_StyleScopedClasses['card-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-delete']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-content']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
/** @type {__VLS_StyleScopedClasses['close-button']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-body']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-hint']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['form-hint']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-footer']} */ ;
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
            commissionerData: commissionerData,
            loading: loading,
            error: error,
            showSuccess: showSuccess,
            successMessage: successMessage,
            showAddJoinerModal: showAddJoinerModal,
            commissionerEnabled: commissionerEnabled,
            newJoiner: newJoiner,
            fetchCommissionerData: fetchCommissionerData,
            updateCommissionerEnabled: updateCommissionerEnabled,
            addJoiner: addJoiner,
            deleteJoiner: deleteJoiner,
            openAddJoinerModal: openAddJoinerModal,
            closeAddJoinerModal: closeAddJoinerModal,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
