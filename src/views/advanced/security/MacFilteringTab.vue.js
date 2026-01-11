import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getMACFiltering, updateMACFiltering } from '../../../services/api/macFiltering';
import MacFilterBand from '../../network/wireless/macfilter/MacFilterBand.vue';
import ConfirmationDialog from '../../../components/ConfirmationDialog.vue';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const activeTab = ref('2.4G');
const macFilteringData = ref(null);
const loading = ref(false);
const showSuccess = ref(false);
const error = ref(null);
const showConfirmDialog = ref(false);
const wifi2gEntries = computed(() => macFilteringData.value?.MACFiltering.wifi2g || []);
const wifi5gEntries = computed(() => macFilteringData.value?.MACFiltering.wifi5g || []);
const wifi6gEntries = computed(() => macFilteringData.value?.MACFiltering.wifi6g || []);
const originalWifi2gEntries = ref([]);
const originalWifi5gEntries = ref([]);
const originalWifi6gEntries = ref([]);
const fetchMACFiltering = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await getMACFiltering();
        macFilteringData.value = response;
        originalWifi2gEntries.value = JSON.parse(JSON.stringify(response.MACFiltering.wifi2g));
        originalWifi5gEntries.value = JSON.parse(JSON.stringify(response.MACFiltering.wifi5g));
        originalWifi6gEntries.value = JSON.parse(JSON.stringify(response.MACFiltering.wifi6g));
    }
    catch (err) {
        console.error('Error fetching MAC filtering data:', err);
        error.value = 'Failed to fetch MAC filtering data';
    }
    finally {
        loading.value = false;
    }
};
const update2GEntries = (entries) => {
    if (!macFilteringData.value)
        return;
    macFilteringData.value.MACFiltering.wifi2g = entries;
};
const update5GEntries = (entries) => {
    if (!macFilteringData.value)
        return;
    macFilteringData.value.MACFiltering.wifi5g = entries;
};
const update6GEntries = (entries) => {
    if (!macFilteringData.value)
        return;
    macFilteringData.value.MACFiltering.wifi6g = entries;
};
const showSuccessMessage = () => {
    showSuccess.value = true;
    setTimeout(() => {
        showSuccess.value = false;
    }, 3000);
};
const handleApply = () => {
    const hasOffToOnTransition = checkOffToOnTransition();
    if (hasOffToOnTransition) {
        showConfirmDialog.value = true;
    }
    else {
        showConfirmDialog.value = false;
        confirmApply();
    }
};
const checkOffToOnTransition = () => {
    if (!macFilteringData.value)
        return false;
    const checkBandTransitions = (currentEntries, originalEntries) => {
        return currentEntries.some(currentEntry => {
            const originalEntry = originalEntries.find(orig => orig.Path === currentEntry.Path);
            if (!originalEntry)
                return false;
            return originalEntry.ACLMode === 'Off' &&
                (currentEntry.ACLMode === 'WhiteList' || currentEntry.ACLMode === 'BlackList');
        });
    };
    return checkBandTransitions(macFilteringData.value.MACFiltering.wifi2g, originalWifi2gEntries.value) ||
        checkBandTransitions(macFilteringData.value.MACFiltering.wifi5g, originalWifi5gEntries.value);
};
const confirmApply = async () => {
    if (!macFilteringData.value)
        return;
    loading.value = true;
    error.value = null;
    try {
        await updateMACFiltering({
            MACFiltering: macFilteringData.value.MACFiltering
        });
        showSuccessMessage();
        await fetchMACFiltering();
    }
    catch (err) {
        console.error('Error updating MAC filtering:', err);
        error.value = 'Failed to update MAC filtering';
    }
    finally {
        loading.value = false;
        showConfirmDialog.value = false;
    }
};
const handleCancel = async () => {
    await fetchMACFiltering();
};
onMounted(fetchMACFiltering);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('mac-filter-tab-content')),
});
if (__VLS_ctx.loading && !__VLS_ctx.macFilteringData) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('mac-filter-loading')),
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
        'data-testid': (__VLS_ctx.qa('mac-filter-error')),
    });
    (__VLS_ctx.error);
}
else if (__VLS_ctx.macFilteringData) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
        'data-testid': (__VLS_ctx.qa('mac-filter-panel')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "tab-navigation" },
        'data-testid': (__VLS_ctx.qa('mac-filter-tabs')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.loading && !__VLS_ctx.macFilteringData))
                    return;
                if (!!(__VLS_ctx.error))
                    return;
                if (!(__VLS_ctx.macFilteringData))
                    return;
                __VLS_ctx.activeTab = '2.4G';
            } },
        ...{ class: "tab-button" },
        ...{ class: ({ active: __VLS_ctx.activeTab === '2.4G' }) },
        'data-testid': (__VLS_ctx.qa('mac-filter-tab-2g')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.loading && !__VLS_ctx.macFilteringData))
                    return;
                if (!!(__VLS_ctx.error))
                    return;
                if (!(__VLS_ctx.macFilteringData))
                    return;
                __VLS_ctx.activeTab = '5G';
            } },
        ...{ class: "tab-button" },
        ...{ class: ({ active: __VLS_ctx.activeTab === '5G' }) },
        'data-testid': (__VLS_ctx.qa('mac-filter-tab-5g')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.loading && !__VLS_ctx.macFilteringData))
                    return;
                if (!!(__VLS_ctx.error))
                    return;
                if (!(__VLS_ctx.macFilteringData))
                    return;
                __VLS_ctx.activeTab = '6G';
            } },
        ...{ class: "tab-button" },
        ...{ class: ({ active: __VLS_ctx.activeTab === '6G' }) },
        'data-testid': (__VLS_ctx.qa('mac-filter-tab-6g')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "tab-content" },
        'data-testid': (__VLS_ctx.qa('mac-filter-tab-content')),
    });
    if (__VLS_ctx.activeTab === '2.4G') {
        /** @type {[typeof MacFilterBand, ]} */ ;
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(MacFilterBand, new MacFilterBand({
            ...{ 'onUpdate:entries': {} },
            entries: (__VLS_ctx.wifi2gEntries),
            band: "2.4G",
            dataTestid: (__VLS_ctx.qa('mac-filter-2g-band')),
        }));
        const __VLS_1 = __VLS_0({
            ...{ 'onUpdate:entries': {} },
            entries: (__VLS_ctx.wifi2gEntries),
            band: "2.4G",
            dataTestid: (__VLS_ctx.qa('mac-filter-2g-band')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_0));
        let __VLS_3;
        let __VLS_4;
        let __VLS_5;
        const __VLS_6 = {
            'onUpdate:entries': (__VLS_ctx.update2GEntries)
        };
        var __VLS_2;
    }
    if (__VLS_ctx.activeTab === '5G') {
        /** @type {[typeof MacFilterBand, ]} */ ;
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(MacFilterBand, new MacFilterBand({
            ...{ 'onUpdate:entries': {} },
            entries: (__VLS_ctx.wifi5gEntries),
            band: "5G",
            dataTestid: (__VLS_ctx.qa('mac-filter-5g-band')),
        }));
        const __VLS_8 = __VLS_7({
            ...{ 'onUpdate:entries': {} },
            entries: (__VLS_ctx.wifi5gEntries),
            band: "5G",
            dataTestid: (__VLS_ctx.qa('mac-filter-5g-band')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        let __VLS_10;
        let __VLS_11;
        let __VLS_12;
        const __VLS_13 = {
            'onUpdate:entries': (__VLS_ctx.update5GEntries)
        };
        var __VLS_9;
    }
    if (__VLS_ctx.activeTab === '6G') {
        /** @type {[typeof MacFilterBand, ]} */ ;
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent(MacFilterBand, new MacFilterBand({
            ...{ 'onUpdate:entries': {} },
            entries: (__VLS_ctx.wifi6gEntries),
            band: "6G",
            dataTestid: (__VLS_ctx.qa('mac-filter-6g-band')),
        }));
        const __VLS_15 = __VLS_14({
            ...{ 'onUpdate:entries': {} },
            entries: (__VLS_ctx.wifi6gEntries),
            band: "6G",
            dataTestid: (__VLS_ctx.qa('mac-filter-6g-band')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_14));
        let __VLS_17;
        let __VLS_18;
        let __VLS_19;
        const __VLS_20 = {
            'onUpdate:entries': (__VLS_ctx.update6GEntries)
        };
        var __VLS_16;
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "button-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleCancel) },
        type: "button",
        ...{ class: "btn btn-secondary" },
        'data-testid': (__VLS_ctx.qa('mac-filter-cancel-button')),
        disabled: (__VLS_ctx.loading),
    });
    (__VLS_ctx.t('common.cancel'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleApply) },
        type: "button",
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('mac-filter-apply-button')),
        disabled: (__VLS_ctx.loading),
    });
    (__VLS_ctx.t('common.apply'));
}
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
        'data-testid': (__VLS_ctx.qa('mac-filter-success-message')),
    });
    (__VLS_ctx.t('common.apply'));
}
/** @type {[typeof ConfirmationDialog, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(ConfirmationDialog, new ConfirmationDialog({
    ...{ 'onConfirm': {} },
    ...{ 'onCancel': {} },
    isOpen: (__VLS_ctx.showConfirmDialog),
    dataTestid: (__VLS_ctx.qa('mac-filter-confirm-dialog')),
    title: (__VLS_ctx.t('macfilter.applyChangesTitle')),
    message: (__VLS_ctx.t('macfilter.applyChangesMessage')),
}));
const __VLS_22 = __VLS_21({
    ...{ 'onConfirm': {} },
    ...{ 'onCancel': {} },
    isOpen: (__VLS_ctx.showConfirmDialog),
    dataTestid: (__VLS_ctx.qa('mac-filter-confirm-dialog')),
    title: (__VLS_ctx.t('macfilter.applyChangesTitle')),
    message: (__VLS_ctx.t('macfilter.applyChangesMessage')),
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
let __VLS_24;
let __VLS_25;
let __VLS_26;
const __VLS_27 = {
    onConfirm: (__VLS_ctx.confirmApply)
};
const __VLS_28 = {
    onCancel: (...[$event]) => {
        __VLS_ctx.showConfirmDialog = false;
    }
};
var __VLS_23;
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-navigation']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-button']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-button']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-button']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-content']} */ ;
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
            MacFilterBand: MacFilterBand,
            ConfirmationDialog: ConfirmationDialog,
            qa: qa,
            t: t,
            activeTab: activeTab,
            macFilteringData: macFilteringData,
            loading: loading,
            showSuccess: showSuccess,
            error: error,
            showConfirmDialog: showConfirmDialog,
            wifi2gEntries: wifi2gEntries,
            wifi5gEntries: wifi5gEntries,
            wifi6gEntries: wifi6gEntries,
            update2GEntries: update2GEntries,
            update5GEntries: update5GEntries,
            update6GEntries: update6GEntries,
            handleApply: handleApply,
            confirmApply: confirmApply,
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
