import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getGeneralMacFiltering, updateGeneralMacFiltering } from '../../../services/api/generalMacFiltering';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const loading = ref(false);
const error = ref(null);
const showSuccess = ref(false);
const macFilteringEnabled = ref(false);
const filterMode = ref('blacklist');
const newMacAddress = ref('');
const newComment = ref('');
const whiteList = ref([]);
const blackList = ref([]);
const currentList = computed(() => {
    return filterMode.value === 'blacklist' ? blackList.value : whiteList.value;
});
const currentTableTitle = computed(() => {
    return filterMode.value === 'blacklist'
        ? t('generalMacFiltering.currentBlacklistFilterTable')
        : t('generalMacFiltering.currentWhitelistFilterTable');
});
const validateMacAddress = (mac) => {
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    return macRegex.test(mac);
};
const fetchMacFiltering = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await getGeneralMacFiltering();
        macFilteringEnabled.value = response.MACFiltering.Enable;
        whiteList.value = [...response.MACFiltering.WhiteList];
        blackList.value = [...response.MACFiltering.BlackList];
    }
    catch (err) {
        console.error('Error fetching MAC filtering data:', err);
        error.value = 'Failed to fetch MAC filtering data';
    }
    finally {
        loading.value = false;
    }
};
const addMacAddress = () => {
    if (!newMacAddress.value.trim()) {
        error.value = t('generalMacFiltering.emptyMacError');
        return;
    }
    if (!validateMacAddress(newMacAddress.value)) {
        error.value = t('generalMacFiltering.invalidMacFormat');
        return;
    }
    const targetList = filterMode.value === 'blacklist' ? blackList.value : whiteList.value;
    const exists = targetList.some(entry => entry.MACAddress.toLowerCase() === newMacAddress.value.toLowerCase());
    if (exists) {
        error.value = t('generalMacFiltering.duplicateMacError');
        return;
    }
    const newNo = targetList.length > 0 ? Math.max(...targetList.map(e => e.No)) + 1 : 1;
    const newEntry = {
        No: newNo,
        MACAddress: newMacAddress.value,
        Comment: newComment.value || ''
    };
    if (filterMode.value === 'blacklist') {
        blackList.value.push(newEntry);
    }
    else {
        whiteList.value.push(newEntry);
    }
    newMacAddress.value = '';
    newComment.value = '';
    error.value = null;
};
const removeMacAddress = (no) => {
    if (filterMode.value === 'blacklist') {
        blackList.value = blackList.value.filter(entry => entry.No !== no);
    }
    else {
        whiteList.value = whiteList.value.filter(entry => entry.No !== no);
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
    error.value = null;
    try {
        await updateGeneralMacFiltering({
            MACFiltering: {
                Enable: macFilteringEnabled.value,
                WhiteList: whiteList.value,
                BlackList: blackList.value
            }
        });
        showSuccessMessage();
        await fetchMacFiltering();
    }
    catch (err) {
        console.error('Error updating MAC filtering:', err);
        error.value = 'Failed to update MAC filtering';
    }
    finally {
        loading.value = false;
    }
};
const handleCancel = async () => {
    await fetchMacFiltering();
    newMacAddress.value = '';
    newComment.value = '';
    error.value = null;
};
onMounted(fetchMacFiltering);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['toggle-group']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-add']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-add']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-table-section']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-table']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-table']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-table']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-table']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-table']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "general-mac-filtering" },
    'data-testid': (__VLS_ctx.qa('general-mac-filtering')),
});
if (__VLS_ctx.loading && !__VLS_ctx.macFilteringEnabled) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('general-mac-loading')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-spinner" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('common.loading'));
}
else if (__VLS_ctx.error && !__VLS_ctx.macFilteringEnabled) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-state" },
        'data-testid': (__VLS_ctx.qa('general-mac-error')),
    });
    (__VLS_ctx.error);
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group toggle-group" },
        'data-testid': (__VLS_ctx.qa('general-mac-enable')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    (__VLS_ctx.t('generalMacFiltering.enableMacFiltering'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "checkbox",
        'data-testid': (__VLS_ctx.qa('general-mac-enable-checkbox')),
    });
    (__VLS_ctx.macFilteringEnabled);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    if (__VLS_ctx.macFilteringEnabled) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group radio-group" },
            'data-testid': (__VLS_ctx.qa('general-mac-filter-mode')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        (__VLS_ctx.t('generalMacFiltering.filterMode'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "radio-options" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "radio-label" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "radio",
            value: "blacklist",
            'data-testid': (__VLS_ctx.qa('general-mac-blacklist-radio')),
        });
        (__VLS_ctx.filterMode);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.t('generalMacFiltering.blacklist'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "radio-label" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "radio",
            value: "whitelist",
            'data-testid': (__VLS_ctx.qa('general-mac-whitelist-radio')),
        });
        (__VLS_ctx.filterMode);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.t('generalMacFiltering.whitelist'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
            'data-testid': (__VLS_ctx.qa('general-mac-address-input')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        (__VLS_ctx.t('generalMacFiltering.sourceMacAddress'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "text",
            value: (__VLS_ctx.newMacAddress),
            ...{ class: "form-input" },
            placeholder: (__VLS_ctx.t('generalMacFiltering.macPlaceholder')),
            'data-testid': (__VLS_ctx.qa('general-mac-address-field')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
            'data-testid': (__VLS_ctx.qa('general-mac-comment-input')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        (__VLS_ctx.t('generalMacFiltering.comment'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "text",
            value: (__VLS_ctx.newComment),
            ...{ class: "form-input" },
            placeholder: (__VLS_ctx.t('generalMacFiltering.commentPlaceholder')),
            'data-testid': (__VLS_ctx.qa('general-mac-comment-field')),
        });
        if (__VLS_ctx.error) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "error-message" },
                'data-testid': (__VLS_ctx.qa('general-mac-error-message')),
            });
            (__VLS_ctx.error);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-actions" },
            'data-testid': (__VLS_ctx.qa('general-mac-add-button-group')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.addMacAddress) },
            type: "button",
            ...{ class: "btn-add" },
            disabled: (__VLS_ctx.loading),
            'data-testid': (__VLS_ctx.qa('general-mac-add-button')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
        (__VLS_ctx.t('generalMacFiltering.add'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "filter-table-section" },
            'data-testid': (__VLS_ctx.qa('general-mac-table')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        (__VLS_ctx.currentTableTitle);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
            ...{ class: "filter-table" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
        (__VLS_ctx.t('generalMacFiltering.number'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
        (__VLS_ctx.t('generalMacFiltering.sourceMacAddress'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
        (__VLS_ctx.t('generalMacFiltering.comment'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
        (__VLS_ctx.t('generalMacFiltering.active'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
        for (const [entry] of __VLS_getVForSourceType((__VLS_ctx.currentList))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
                key: (entry.No),
                'data-testid': (__VLS_ctx.qa(`general-mac-entry-${entry.No}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            (entry.No);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            (entry.MACAddress);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            (entry.Comment);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading && !__VLS_ctx.macFilteringEnabled))
                            return;
                        if (!!(__VLS_ctx.error && !__VLS_ctx.macFilteringEnabled))
                            return;
                        if (!(__VLS_ctx.macFilteringEnabled))
                            return;
                        __VLS_ctx.removeMacAddress(entry.No);
                    } },
                type: "button",
                ...{ class: "btn-icon" },
                'data-testid': (__VLS_ctx.qa(`general-mac-delete-${entry.No}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
        }
        if (__VLS_ctx.currentList.length === 0) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                colspan: "4",
                ...{ class: "empty-message" },
            });
            (__VLS_ctx.t('generalMacFiltering.noEntries'));
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-footer" },
        'data-testid': (__VLS_ctx.qa('general-mac-actions')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleCancel) },
        type: "button",
        ...{ class: "btn btn-outline" },
        disabled: (__VLS_ctx.loading),
        'data-testid': (__VLS_ctx.qa('general-mac-cancel-button')),
    });
    (__VLS_ctx.t('common.cancel'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleApply) },
        type: "button",
        ...{ class: "btn btn-primary" },
        disabled: (__VLS_ctx.loading),
        'data-testid': (__VLS_ctx.qa('general-mac-apply-button')),
    });
    (__VLS_ctx.t('common.apply'));
}
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
        'data-testid': (__VLS_ctx.qa('general-mac-success-message')),
    });
    (__VLS_ctx.t('common.saveSuccess'));
}
/** @type {__VLS_StyleScopedClasses['general-mac-filtering']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-group']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-options']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-label']} */ ;
/** @type {__VLS_StyleScopedClasses['radio-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-input']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['form-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-add']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-table-section']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-table']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-message']} */ ;
/** @type {__VLS_StyleScopedClasses['form-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['success-message']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
            loading: loading,
            error: error,
            showSuccess: showSuccess,
            macFilteringEnabled: macFilteringEnabled,
            filterMode: filterMode,
            newMacAddress: newMacAddress,
            newComment: newComment,
            currentList: currentList,
            currentTableTitle: currentTableTitle,
            addMacAddress: addMacAddress,
            removeMacAddress: removeMacAddress,
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
