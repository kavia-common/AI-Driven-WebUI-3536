import { computed, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import BlockingOverlay from '../../../components/BlockingOverlay.vue';
import BaseButton from '../../../components/common/BaseButton.vue';
import BaseCard from '../../../components/common/BaseCard.vue';
import BaseInput from '../../../components/common/BaseInput.vue';
import BaseSelect from '../../../components/common/BaseSelect.vue';
import { useQA } from '../../../utils/qa';
import { getWlanBasicMulti, updateWlanBasicMulti } from '../../../services/api/wireless';
const { t } = useI18n();
const router = useRouter();
const { qa, slug } = useQA();
const loading = ref(false);
const showSuccess = ref(false);
const showBlockingOverlay = ref(false);
const data = ref(null);
/**
 * Snapshot of the last successful GET response.
 * Used by non-edit-mode "Cancel" to restore UI to the backend state.
 */
const lastGetSnapshot = ref(null);
const editIndex = ref(null);
const draft = ref(null);
const showPassphrase = reactive({});
const bands = ['2.4GHz', '5GHz', '6GHz'];
const normalizeGroup = (group) => {
    const copy = JSON.parse(JSON.stringify(group));
    // Ensure CommonSSIDBandSetting exists with 2.4/5/6 entries
    if (!copy.CommonSSIDBandSetting || copy.CommonSSIDBandSetting.length === 0) {
        copy.CommonSSIDBandSetting = bands.map((b) => ({ Band: b, Enable: 1 }));
    }
    else {
        // ensure all bands exist
        for (const b of bands) {
            if (!copy.CommonSSIDBandSetting.some((x) => x.Band === b)) {
                copy.CommonSSIDBandSetting.push({ Band: b, Enable: 1 });
            }
        }
    }
    // Ensure Interface array has per-band entries
    if (!copy.Interface)
        copy.Interface = [];
    for (const b of bands) {
        if (!copy.Interface.some((i) => i.Band === b)) {
            copy.Interface.push({
                Band: b,
                Enable: 1,
                SSID: copy.SSIDGroupName || '',
                SecurityMode: '',
                SecurityModeAvailable: '',
                KeyPassPhrase: '',
                MFPConfig: ''
            });
        }
    }
    return copy;
};
const fetchConfig = async () => {
    loading.value = true;
    try {
        const resp = await getWlanBasicMulti();
        // Defensive: if backend still returns legacy schema, try to map into WlanGroup list
        if (resp?.WlanBasic?.WlanGroup) {
            data.value = resp;
        }
        else {
            // legacy -> wrap single "Home" group from previous schema
            const legacy = resp;
            const modes2g = legacy?.WlanBasic?.wifi2g?.SecurityModeAvailable ?? '';
            const modes5g = legacy?.WlanBasic?.wifi5g?.SecurityModeAvailable ?? '';
            const modes6g = legacy?.WlanBasic?.wifi6g?.SecurityModeAvailable ?? '';
            data.value = {
                WlanBasic: {
                    WlanGroup: [
                        {
                            SSIDGroupName: t('wireless.groupDefaultName'),
                            CommonSSIDEnable: legacy?.WlanBasic?.CommonSSIDEnable ?? 0,
                            MLOEnable: legacy?.WlanBasic?.MLOEnable ?? 0,
                            CommonSSIDBandSetting: bands.map((b) => ({ Band: b, Enable: 1 })),
                            Interface: [
                                {
                                    Band: '2.4GHz',
                                    Enable: legacy?.WlanBasic?.wifi2g?.Enable ?? 1,
                                    SSID: legacy?.WlanBasic?.wifi2g?.SSID ?? '',
                                    SecurityMode: legacy?.WlanBasic?.wifi2g?.SecurityMode ?? '',
                                    SecurityModeAvailable: modes2g,
                                    KeyPassPhrase: legacy?.WlanBasic?.wifi2g?.Password ?? '',
                                    MFPConfig: ''
                                },
                                {
                                    Band: '5GHz',
                                    Enable: legacy?.WlanBasic?.wifi5g?.Enable ?? 1,
                                    SSID: legacy?.WlanBasic?.wifi5g?.SSID ?? '',
                                    SecurityMode: legacy?.WlanBasic?.wifi5g?.SecurityMode ?? '',
                                    SecurityModeAvailable: modes5g,
                                    KeyPassPhrase: legacy?.WlanBasic?.wifi5g?.Password ?? '',
                                    MFPConfig: ''
                                },
                                {
                                    Band: '6GHz',
                                    Enable: legacy?.WlanBasic?.wifi6g?.Enable ?? 1,
                                    SSID: legacy?.WlanBasic?.wifi6g?.SSID ?? '',
                                    SecurityMode: legacy?.WlanBasic?.wifi6g?.SecurityMode ?? '',
                                    SecurityModeAvailable: modes6g,
                                    KeyPassPhrase: legacy?.WlanBasic?.wifi6g?.Password ?? '',
                                    MFPConfig: ''
                                }
                            ]
                        }
                    ]
                }
            };
        }
        // Capture last successful GET snapshot for non-edit "Cancel"
        lastGetSnapshot.value = JSON.parse(JSON.stringify(data.value));
    }
    catch (e) {
        console.error('Error fetching WLAN Basic (multi) config:', e);
    }
    finally {
        loading.value = false;
    }
};
const groups = computed(() => data.value?.WlanBasic?.WlanGroup ?? []);
const summarizeGroup = (g) => {
    const enabledBandCount = (g.CommonSSIDBandSetting ?? []).filter((b) => b.Enable === 1).length;
    const bandInfo = `${enabledBandCount}/${bands.length} ${t('wireless.bandsEnabled')}`;
    const common = g.CommonSSIDEnable === 1 ? t('common.enabled') : t('common.no');
    const mlo = g.MLOEnable === 1 ? t('common.enabled') : t('common.no');
    return `${t('wireless.commonSsidShort')}: ${common} • ${t('wireless.mloShort')}: ${mlo} • ${bandInfo}`;
};
// PUBLIC_INTERFACE
const enterEdit = (index) => {
    /** Enter edit mode for a given SSID group index. */
    editIndex.value = index;
    draft.value = normalizeGroup(JSON.parse(JSON.stringify(groups.value[index])));
    // Reset passphrase visibility state in edit mode
    for (const b of bands) {
        showPassphrase[`${b}`] = false;
    }
    showPassphrase['CommonSSID'] = false;
};
// PUBLIC_INTERFACE
const cancelEdit = () => {
    /** Exit edit mode and discard draft changes. */
    editIndex.value = null;
    draft.value = null;
};
// PUBLIC_INTERFACE
const updateLocal = () => {
    /**
     * Apply draft changes back to the table/grid view (local state only),
     * without issuing a POST; then exit edit mode.
     */
    if (!data.value || editIndex.value === null || !draft.value)
        return;
    const idx = editIndex.value;
    // Normalize to ensure band/interface entries exist
    const normalized = normalizeGroup(JSON.parse(JSON.stringify(draft.value)));
    // Keep backend shape consistent: when Common SSID is enabled, ensure all interfaces match the single edited block
    if (normalized.CommonSSIDEnable === 1 && normalized.Interface.length > 0) {
        const base = normalized.Interface[0];
        for (const itf of normalized.Interface) {
            itf.SSID = base.SSID;
            itf.SecurityMode = base.SecurityMode;
            itf.KeyPassPhrase = base.KeyPassPhrase;
            // Enable in Common mode is controlled by Interface[0].Enable in this UI; mirror it across to be safe
            itf.Enable = base.Enable;
        }
    }
    data.value.WlanBasic.WlanGroup[idx] = normalized;
    cancelEdit();
};
// PUBLIC_INTERFACE
const restoreFromGet = () => {
    /**
     * Non-edit-mode "Cancel": restore local UI state to the last successful GET response.
     * Does not call backend.
     */
    if (!lastGetSnapshot.value)
        return;
    data.value = JSON.parse(JSON.stringify(lastGetSnapshot.value));
};
const securityModeOptionsForInterface = (itf) => {
    const csv = (itf.SecurityModeAvailable ?? '').trim();
    if (!csv)
        return [];
    return csv
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
};
const getInterfaceByBand = (band) => {
    return draft.value?.Interface?.find((x) => x.Band === band);
};
const getBandSettingByBand = (band) => {
    return draft.value?.CommonSSIDBandSetting?.find((x) => x.Band === band);
};
const onCommonSsidToggle = () => {
    if (!draft.value)
        return;
    if (draft.value.CommonSSIDEnable === 0) {
        // When disabling Common SSID, also disable MLO
        draft.value.MLOEnable = 0;
    }
    else {
        // When enabling Common SSID, keep the UI consistent by propagating
        // the first band's SSID/security/PSK to all bands (user edits are done in a single block).
        const first = draft.value.Interface?.[0];
        if (!first)
            return;
        for (const itf of draft.value.Interface) {
            itf.SSID = first.SSID;
            itf.SecurityMode = first.SecurityMode;
            itf.KeyPassPhrase = first.KeyPassPhrase;
            itf.Enable = first.Enable;
        }
    }
};
/**
 * Keep the backend payload shape intact.
 * UI may hide some fields (e.g., MFPConfig), but we still preserve values from the loaded config
 * and post them back unchanged unless the backend chooses to ignore them.
 */
const buildPostPayload = () => {
    if (!data.value)
        return null;
    const postGroups = groups.value.map((g) => {
        const norm = normalizeGroup(g);
        // When Common SSID is enabled, the UI edits only a single block; ensure all interfaces share those values.
        if (norm.CommonSSIDEnable === 1 && norm.Interface.length > 0) {
            const base = norm.Interface[0];
            for (const itf of norm.Interface) {
                itf.SSID = base.SSID;
                itf.SecurityMode = base.SecurityMode;
                itf.KeyPassPhrase = base.KeyPassPhrase;
                itf.Enable = base.Enable;
            }
        }
        return {
            SSIDGroupName: norm.SSIDGroupName,
            CommonSSIDEnable: norm.CommonSSIDEnable,
            MLOEnable: norm.MLOEnable,
            CommonSSIDBandSetting: norm.CommonSSIDBandSetting?.map((b) => ({
                Band: b.Band,
                Enable: b.Enable
            })),
            Interface: norm.Interface.map((i) => ({
                Band: i.Band,
                Enable: i.Enable,
                SSID: i.SSID,
                SecurityMode: i.SecurityMode,
                // Prefer KeyPassPhrase, but allow fallback from WpaPreShareKey
                KeyPassPhrase: (i.KeyPassPhrase ?? i.WpaPreShareKey ?? '').toString(),
                // MFPConfig is removed from the UI but preserved in payload for compatibility.
                MFPConfig: i.MFPConfig
            }))
        };
    });
    return { WlanBasic: { WlanGroup: postGroups } };
};
const showSuccessMessage = () => {
    showSuccess.value = true;
    setTimeout(() => (showSuccess.value = false), 2500);
};
// PUBLIC_INTERFACE
const applyPost = async () => {
    /**
     * Non-edit-mode "Apply": POST current local state to backend in WlanGroup + Interface structure.
     * Shows success feedback consistent with the rest of this page.
     */
    const payload = buildPostPayload();
    if (!payload)
        return;
    loading.value = true;
    try {
        await updateWlanBasicMulti(payload);
        showSuccessMessage();
        showBlockingOverlay.value = true;
        // After successful apply, treat current state as the new baseline for non-edit cancel.
        lastGetSnapshot.value = JSON.parse(JSON.stringify(data.value));
    }
    catch (e) {
        console.error('Error updating WLAN Basic (multi) config:', e);
    }
    finally {
        loading.value = false;
    }
};
const handleBlockingComplete = () => {
    showBlockingOverlay.value = false;
    router.go(0);
};
onMounted(fetchConfig);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['group-table-head']} */ ;
/** @type {__VLS_StyleScopedClasses['group-table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['group-table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['col-name']} */ ;
/** @type {__VLS_StyleScopedClasses['pill']} */ ;
/** @type {__VLS_StyleScopedClasses['pill']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['group-table-head']} */ ;
/** @type {__VLS_StyleScopedClasses['group-table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['fields-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['row-3']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wlan-basic-multi" },
    'data-testid': (__VLS_ctx.qa('wlan-basic-multi-root')),
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-overlay" },
        'data-testid': (__VLS_ctx.qa('wlan-basic-multi-loading')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-spinner" },
    });
}
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
        'data-testid': (__VLS_ctx.qa('wlan-basic-multi-success')),
    });
    (__VLS_ctx.t('common.apply'));
    (__VLS_ctx.t('common.saveSuccess'));
}
if (__VLS_ctx.editIndex === null) {
    /** @type {[typeof BaseCard, typeof BaseCard, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(BaseCard, new BaseCard({
        ...{ class: "compact-card" },
        dataTestid: (__VLS_ctx.qa('wlan-basic-multi-list-card')),
    }));
    const __VLS_1 = __VLS_0({
        ...{ class: "compact-card" },
        dataTestid: (__VLS_ctx.qa('wlan-basic-multi-list-card')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    __VLS_2.slots.default;
    {
        const { header: __VLS_thisSlot } = __VLS_2.slots;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-header-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-title" },
        });
        (__VLS_ctx.t('wireless.basicConfig'));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "group-table" },
        'data-testid': (__VLS_ctx.qa('wlan-basic-multi-group-table')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "group-table-head" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "col col-name" },
    });
    (__VLS_ctx.t('wireless.ssidGroupName'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "col col-common" },
    });
    (__VLS_ctx.t('wireless.commonSsidEnable'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "col col-mlo" },
    });
    (__VLS_ctx.t('wireless.mloEnable'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "col col-actions" },
    });
    (__VLS_ctx.t('common.action'));
    for (const [g, idx] of __VLS_getVForSourceType((__VLS_ctx.groups))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (`${g.SSIDGroupName}-${idx}`),
            ...{ class: "group-table-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "col col-name" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "name-line" },
        });
        (g.SSIDGroupName);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "sub-line" },
        });
        (__VLS_ctx.summarizeGroup(g));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "col col-common" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "pill" },
            ...{ class: (g.CommonSSIDEnable === 1 ? 'on' : 'off') },
        });
        (g.CommonSSIDEnable === 1 ? __VLS_ctx.t('common.enabled') : __VLS_ctx.t('common.no'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "col col-mlo" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "pill" },
            ...{ class: (g.MLOEnable === 1 ? 'on' : 'off') },
        });
        (g.MLOEnable === 1 ? __VLS_ctx.t('common.enabled') : __VLS_ctx.t('common.no'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "col col-actions" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.editIndex === null))
                        return;
                    __VLS_ctx.enterEdit(idx);
                } },
            ...{ class: "btn-action" },
            'data-testid': (__VLS_ctx.qa(`wlan-basic-multi-edit-${idx}`)),
            title: (__VLS_ctx.t('common.edit')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
    }
    if (__VLS_ctx.groups.length === 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "empty-row" },
        });
        (__VLS_ctx.t('wireless.noSsidGroups'));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "footer-actions" },
    });
    /** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
        ...{ 'onClick': {} },
        variant: "secondary",
        dataTestid: (__VLS_ctx.qa('wlan-basic-multi-view-cancel')),
    }));
    const __VLS_4 = __VLS_3({
        ...{ 'onClick': {} },
        variant: "secondary",
        dataTestid: (__VLS_ctx.qa('wlan-basic-multi-view-cancel')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
    let __VLS_6;
    let __VLS_7;
    let __VLS_8;
    const __VLS_9 = {
        onClick: (__VLS_ctx.restoreFromGet)
    };
    __VLS_5.slots.default;
    (__VLS_ctx.t('common.cancel'));
    var __VLS_5;
    /** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
        ...{ 'onClick': {} },
        variant: "primary",
        disabled: (__VLS_ctx.loading),
        dataTestid: (__VLS_ctx.qa('wlan-basic-multi-view-apply')),
    }));
    const __VLS_11 = __VLS_10({
        ...{ 'onClick': {} },
        variant: "primary",
        disabled: (__VLS_ctx.loading),
        dataTestid: (__VLS_ctx.qa('wlan-basic-multi-view-apply')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    let __VLS_13;
    let __VLS_14;
    let __VLS_15;
    const __VLS_16 = {
        onClick: (__VLS_ctx.applyPost)
    };
    __VLS_12.slots.default;
    (__VLS_ctx.t('common.apply'));
    var __VLS_12;
    var __VLS_2;
}
if (__VLS_ctx.draft && __VLS_ctx.editIndex !== null) {
    /** @type {[typeof BaseCard, typeof BaseCard, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(BaseCard, new BaseCard({
        ...{ class: "compact-card edit-card" },
        dataTestid: (__VLS_ctx.qa('wlan-basic-multi-edit-card')),
    }));
    const __VLS_18 = __VLS_17({
        ...{ class: "compact-card edit-card" },
        dataTestid: (__VLS_ctx.qa('wlan-basic-multi-edit-card')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    __VLS_19.slots.default;
    {
        const { header: __VLS_thisSlot } = __VLS_19.slots;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-header-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-title" },
        });
        (__VLS_ctx.t('common.edit'));
        (__VLS_ctx.draft.SSIDGroupName);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "edit-grid" },
        'data-testid': (__VLS_ctx.qa('wlan-basic-multi-edit-grid')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "edit-section" },
        'data-testid': (__VLS_ctx.qa('wlan-basic-multi-common-section')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "section-title" },
    });
    (__VLS_ctx.t('wireless.commonSsidSettings'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "fields-grid" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "field" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "switch-label" },
        'data-testid': (__VLS_ctx.qa('wlan-basic-multi-common-ssid-enable')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('wireless.commonSsidEnable'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        ...{ onChange: ((e) => { __VLS_ctx.draft.CommonSSIDEnable = e.target.checked ? 1 : 0; __VLS_ctx.onCommonSsidToggle(); }) },
        type: "checkbox",
        'data-testid': (__VLS_ctx.qa('wlan-basic-multi-common-ssid-enable-toggle')),
        checked: (__VLS_ctx.draft.CommonSSIDEnable === 1),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "field" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "switch-label" },
        'data-testid': (__VLS_ctx.qa('wlan-basic-multi-mlo-enable')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('wireless.mloEnable'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch" },
        ...{ class: ({ 'is-disabled': __VLS_ctx.draft.CommonSSIDEnable === 0 }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        ...{ onChange: ((e) => { __VLS_ctx.draft.MLOEnable = e.target.checked ? 1 : 0; }) },
        type: "checkbox",
        'data-testid': (__VLS_ctx.qa('wlan-basic-multi-mlo-enable-toggle')),
        checked: (__VLS_ctx.draft.MLOEnable === 1),
        disabled: (__VLS_ctx.draft.CommonSSIDEnable === 0),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    if (__VLS_ctx.draft.CommonSSIDEnable === 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "hint" },
        });
        (__VLS_ctx.t('wireless.commonSsidDisabled'));
    }
    if (__VLS_ctx.draft.CommonSSIDEnable === 1) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "edit-section" },
            'data-testid': (__VLS_ctx.qa('wlan-basic-multi-common-band-section')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-title" },
        });
        (__VLS_ctx.t('wireless.commonSsidBandSettings'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "row-head" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "row-title" },
        });
        (__VLS_ctx.t('common.enable'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "switch-label" },
            'data-testid': (__VLS_ctx.qa('wlan-basic-multi-common-band-enable')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "switch" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
            ...{ onChange: ((e) => { __VLS_ctx.draft.Interface[0].Enable = e.target.checked ? 1 : 0; }) },
            type: "checkbox",
            'data-testid': (__VLS_ctx.qa('wlan-basic-multi-common-band-enable-toggle')),
            checked: (__VLS_ctx.draft.Interface[0].Enable === 1),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "slider" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "common-ssid-fields compact-rows" },
            'data-testid': (__VLS_ctx.qa('wlan-basic-multi-common-ssid-fields')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "row row-3" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "cell cell-ssid" },
        });
        /** @type {[typeof BaseInput, ]} */ ;
        // @ts-ignore
        const __VLS_20 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
            modelValue: (__VLS_ctx.draft.Interface[0].SSID),
            label: (__VLS_ctx.t('wireless.ssid')),
            disabled: (__VLS_ctx.draft.Interface[0].Enable === 0),
            dataTestid: (__VLS_ctx.qa('wlan-basic-multi-common-ssid-ssid')),
        }));
        const __VLS_21 = __VLS_20({
            modelValue: (__VLS_ctx.draft.Interface[0].SSID),
            label: (__VLS_ctx.t('wireless.ssid')),
            disabled: (__VLS_ctx.draft.Interface[0].Enable === 0),
            dataTestid: (__VLS_ctx.qa('wlan-basic-multi-common-ssid-ssid')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_20));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "cell cell-auth" },
        });
        /** @type {[typeof BaseSelect, ]} */ ;
        // @ts-ignore
        const __VLS_23 = __VLS_asFunctionalComponent(BaseSelect, new BaseSelect({
            modelValue: (__VLS_ctx.draft.Interface[0].SecurityMode),
            label: (__VLS_ctx.t('wireless.authentication')),
            options: (__VLS_ctx.securityModeOptionsForInterface(__VLS_ctx.draft.Interface[0]).map((m) => ({ label: m, value: m }))),
            disabled: (__VLS_ctx.draft.Interface[0].Enable === 0),
            dataTestid: (__VLS_ctx.qa('wlan-basic-multi-common-ssid-security')),
        }));
        const __VLS_24 = __VLS_23({
            modelValue: (__VLS_ctx.draft.Interface[0].SecurityMode),
            label: (__VLS_ctx.t('wireless.authentication')),
            options: (__VLS_ctx.securityModeOptionsForInterface(__VLS_ctx.draft.Interface[0]).map((m) => ({ label: m, value: m }))),
            disabled: (__VLS_ctx.draft.Interface[0].Enable === 0),
            dataTestid: (__VLS_ctx.qa('wlan-basic-multi-common-ssid-security')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_23));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "cell cell-psk" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "pass-row" },
        });
        /** @type {[typeof BaseInput, ]} */ ;
        // @ts-ignore
        const __VLS_26 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
            modelValue: (__VLS_ctx.draft.Interface[0].KeyPassPhrase),
            label: (__VLS_ctx.t('wireless.password')),
            type: (__VLS_ctx.showPassphrase['CommonSSID'] ? 'text' : 'password'),
            disabled: (__VLS_ctx.draft.Interface[0].Enable === 0),
            dataTestid: (__VLS_ctx.qa('wlan-basic-multi-common-ssid-psk')),
        }));
        const __VLS_27 = __VLS_26({
            modelValue: (__VLS_ctx.draft.Interface[0].KeyPassPhrase),
            label: (__VLS_ctx.t('wireless.password')),
            type: (__VLS_ctx.showPassphrase['CommonSSID'] ? 'text' : 'password'),
            disabled: (__VLS_ctx.draft.Interface[0].Enable === 0),
            dataTestid: (__VLS_ctx.qa('wlan-basic-multi-common-ssid-psk')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_26));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.draft && __VLS_ctx.editIndex !== null))
                        return;
                    if (!(__VLS_ctx.draft.CommonSSIDEnable === 1))
                        return;
                    __VLS_ctx.showPassphrase['CommonSSID'] = !__VLS_ctx.showPassphrase['CommonSSID'];
                } },
            type: "button",
            ...{ class: "icon-btn" },
            disabled: (__VLS_ctx.draft.Interface[0].Enable === 0),
            'data-testid': (__VLS_ctx.qa('wlan-basic-multi-common-ssid-psk-toggle')),
            title: (__VLS_ctx.showPassphrase['CommonSSID'] ? __VLS_ctx.t('wireless.hide') : __VLS_ctx.t('wireless.show')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
        (__VLS_ctx.showPassphrase['CommonSSID'] ? 'visibility_off' : 'visibility');
        if (false) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            (__VLS_ctx.getBandSettingByBand('2.4GHz')?.Enable);
        }
    }
    if (__VLS_ctx.draft.CommonSSIDEnable === 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "edit-section" },
            'data-testid': (__VLS_ctx.qa('wlan-basic-multi-interfaces-section')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-title" },
        });
        (__VLS_ctx.t('wireless.perBandInterfaces'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "interfaces-rows" },
        });
        for (const [b] of __VLS_getVForSourceType((__VLS_ctx.bands))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                key: (b),
                ...{ class: "iface-row" },
                'data-testid': (__VLS_ctx.qa(`wlan-basic-multi-iface-${__VLS_ctx.slug(b)}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "row-head" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "row-title" },
            });
            (b);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "switch-label" },
                'data-testid': (__VLS_ctx.qa(`wlan-basic-multi-iface-enable-${__VLS_ctx.slug(b)}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "sr-only" },
            });
            (__VLS_ctx.t('common.enable'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
                ...{ class: "switch" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
                ...{ onChange: ((e) => { __VLS_ctx.getInterfaceByBand(b).Enable = e.target.checked ? 1 : 0; }) },
                type: "checkbox",
                'data-testid': (__VLS_ctx.qa(`wlan-basic-multi-iface-enable-toggle-${__VLS_ctx.slug(b)}`)),
                checked: (__VLS_ctx.getInterfaceByBand(b).Enable === 1),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "slider" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "row row-3" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "cell cell-ssid" },
            });
            /** @type {[typeof BaseInput, ]} */ ;
            // @ts-ignore
            const __VLS_29 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
                modelValue: (__VLS_ctx.getInterfaceByBand(b).SSID),
                label: (__VLS_ctx.t('wireless.ssid')),
                disabled: (__VLS_ctx.getInterfaceByBand(b).Enable === 0),
                dataTestid: (__VLS_ctx.qa(`wlan-basic-multi-iface-ssid-${__VLS_ctx.slug(b)}`)),
            }));
            const __VLS_30 = __VLS_29({
                modelValue: (__VLS_ctx.getInterfaceByBand(b).SSID),
                label: (__VLS_ctx.t('wireless.ssid')),
                disabled: (__VLS_ctx.getInterfaceByBand(b).Enable === 0),
                dataTestid: (__VLS_ctx.qa(`wlan-basic-multi-iface-ssid-${__VLS_ctx.slug(b)}`)),
            }, ...__VLS_functionalComponentArgsRest(__VLS_29));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "cell cell-auth" },
            });
            /** @type {[typeof BaseSelect, ]} */ ;
            // @ts-ignore
            const __VLS_32 = __VLS_asFunctionalComponent(BaseSelect, new BaseSelect({
                modelValue: (__VLS_ctx.getInterfaceByBand(b).SecurityMode),
                label: (__VLS_ctx.t('wireless.authentication')),
                options: (__VLS_ctx.securityModeOptionsForInterface(__VLS_ctx.getInterfaceByBand(b)).map((m) => ({ label: m, value: m }))),
                disabled: (__VLS_ctx.getInterfaceByBand(b).Enable === 0),
                dataTestid: (__VLS_ctx.qa(`wlan-basic-multi-iface-security-${__VLS_ctx.slug(b)}`)),
            }));
            const __VLS_33 = __VLS_32({
                modelValue: (__VLS_ctx.getInterfaceByBand(b).SecurityMode),
                label: (__VLS_ctx.t('wireless.authentication')),
                options: (__VLS_ctx.securityModeOptionsForInterface(__VLS_ctx.getInterfaceByBand(b)).map((m) => ({ label: m, value: m }))),
                disabled: (__VLS_ctx.getInterfaceByBand(b).Enable === 0),
                dataTestid: (__VLS_ctx.qa(`wlan-basic-multi-iface-security-${__VLS_ctx.slug(b)}`)),
            }, ...__VLS_functionalComponentArgsRest(__VLS_32));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "cell cell-psk" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "pass-row" },
            });
            /** @type {[typeof BaseInput, ]} */ ;
            // @ts-ignore
            const __VLS_35 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
                modelValue: (__VLS_ctx.getInterfaceByBand(b).KeyPassPhrase),
                label: (__VLS_ctx.t('wireless.password')),
                type: (__VLS_ctx.showPassphrase[b] ? 'text' : 'password'),
                disabled: (__VLS_ctx.getInterfaceByBand(b).Enable === 0),
                dataTestid: (__VLS_ctx.qa(`wlan-basic-multi-iface-psk-${__VLS_ctx.slug(b)}`)),
            }));
            const __VLS_36 = __VLS_35({
                modelValue: (__VLS_ctx.getInterfaceByBand(b).KeyPassPhrase),
                label: (__VLS_ctx.t('wireless.password')),
                type: (__VLS_ctx.showPassphrase[b] ? 'text' : 'password'),
                disabled: (__VLS_ctx.getInterfaceByBand(b).Enable === 0),
                dataTestid: (__VLS_ctx.qa(`wlan-basic-multi-iface-psk-${__VLS_ctx.slug(b)}`)),
            }, ...__VLS_functionalComponentArgsRest(__VLS_35));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.draft && __VLS_ctx.editIndex !== null))
                            return;
                        if (!(__VLS_ctx.draft.CommonSSIDEnable === 0))
                            return;
                        __VLS_ctx.showPassphrase[b] = !__VLS_ctx.showPassphrase[b];
                    } },
                type: "button",
                ...{ class: "icon-btn" },
                disabled: (__VLS_ctx.getInterfaceByBand(b).Enable === 0),
                'data-testid': (__VLS_ctx.qa(`wlan-basic-multi-iface-psk-toggle-${__VLS_ctx.slug(b)}`)),
                title: (__VLS_ctx.showPassphrase[b] ? __VLS_ctx.t('wireless.hide') : __VLS_ctx.t('wireless.show')),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
            (__VLS_ctx.showPassphrase[b] ? 'visibility_off' : 'visibility');
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "footer-actions" },
    });
    /** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
        ...{ 'onClick': {} },
        variant: "secondary",
        dataTestid: (__VLS_ctx.qa('wlan-basic-multi-edit-cancel')),
    }));
    const __VLS_39 = __VLS_38({
        ...{ 'onClick': {} },
        variant: "secondary",
        dataTestid: (__VLS_ctx.qa('wlan-basic-multi-edit-cancel')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    let __VLS_41;
    let __VLS_42;
    let __VLS_43;
    const __VLS_44 = {
        onClick: (__VLS_ctx.cancelEdit)
    };
    __VLS_40.slots.default;
    (__VLS_ctx.t('common.cancel'));
    var __VLS_40;
    /** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
        ...{ 'onClick': {} },
        variant: "primary",
        dataTestid: (__VLS_ctx.qa('wlan-basic-multi-edit-update')),
    }));
    const __VLS_46 = __VLS_45({
        ...{ 'onClick': {} },
        variant: "primary",
        dataTestid: (__VLS_ctx.qa('wlan-basic-multi-edit-update')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_45));
    let __VLS_48;
    let __VLS_49;
    let __VLS_50;
    const __VLS_51 = {
        onClick: (__VLS_ctx.updateLocal)
    };
    __VLS_47.slots.default;
    (__VLS_ctx.t('common.update'));
    var __VLS_47;
    var __VLS_19;
}
/** @type {[typeof BlockingOverlay, ]} */ ;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent(BlockingOverlay, new BlockingOverlay({
    ...{ 'onComplete': {} },
    dataTestid: (__VLS_ctx.qa('wlan-basic-multi-blocking-overlay')),
    isVisible: (__VLS_ctx.showBlockingOverlay),
    message: (__VLS_ctx.t('wireless.applyingBasicSettings')),
    duration: (30),
}));
const __VLS_53 = __VLS_52({
    ...{ 'onComplete': {} },
    dataTestid: (__VLS_ctx.qa('wlan-basic-multi-blocking-overlay')),
    isVisible: (__VLS_ctx.showBlockingOverlay),
    message: (__VLS_ctx.t('wireless.applyingBasicSettings')),
    duration: (30),
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
let __VLS_55;
let __VLS_56;
let __VLS_57;
const __VLS_58 = {
    onComplete: (__VLS_ctx.handleBlockingComplete)
};
var __VLS_54;
/** @type {__VLS_StyleScopedClasses['wlan-basic-multi']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['success-message']} */ ;
/** @type {__VLS_StyleScopedClasses['compact-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['group-table']} */ ;
/** @type {__VLS_StyleScopedClasses['group-table-head']} */ ;
/** @type {__VLS_StyleScopedClasses['col']} */ ;
/** @type {__VLS_StyleScopedClasses['col-name']} */ ;
/** @type {__VLS_StyleScopedClasses['col']} */ ;
/** @type {__VLS_StyleScopedClasses['col-common']} */ ;
/** @type {__VLS_StyleScopedClasses['col']} */ ;
/** @type {__VLS_StyleScopedClasses['col-mlo']} */ ;
/** @type {__VLS_StyleScopedClasses['col']} */ ;
/** @type {__VLS_StyleScopedClasses['col-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['group-table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['col']} */ ;
/** @type {__VLS_StyleScopedClasses['col-name']} */ ;
/** @type {__VLS_StyleScopedClasses['name-line']} */ ;
/** @type {__VLS_StyleScopedClasses['sub-line']} */ ;
/** @type {__VLS_StyleScopedClasses['col']} */ ;
/** @type {__VLS_StyleScopedClasses['col-common']} */ ;
/** @type {__VLS_StyleScopedClasses['pill']} */ ;
/** @type {__VLS_StyleScopedClasses['col']} */ ;
/** @type {__VLS_StyleScopedClasses['col-mlo']} */ ;
/** @type {__VLS_StyleScopedClasses['pill']} */ ;
/** @type {__VLS_StyleScopedClasses['col']} */ ;
/** @type {__VLS_StyleScopedClasses['col-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-row']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['compact-card']} */ ;
/** @type {__VLS_StyleScopedClasses['edit-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['edit-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['edit-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['fields-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['hint']} */ ;
/** @type {__VLS_StyleScopedClasses['edit-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['row-head']} */ ;
/** @type {__VLS_StyleScopedClasses['row-title']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['common-ssid-fields']} */ ;
/** @type {__VLS_StyleScopedClasses['compact-rows']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['row-3']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell-ssid']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell-auth']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell-psk']} */ ;
/** @type {__VLS_StyleScopedClasses['pass-row']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['edit-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['interfaces-rows']} */ ;
/** @type {__VLS_StyleScopedClasses['iface-row']} */ ;
/** @type {__VLS_StyleScopedClasses['row-head']} */ ;
/** @type {__VLS_StyleScopedClasses['row-title']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['row-3']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell-ssid']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell-auth']} */ ;
/** @type {__VLS_StyleScopedClasses['cell']} */ ;
/** @type {__VLS_StyleScopedClasses['cell-psk']} */ ;
/** @type {__VLS_StyleScopedClasses['pass-row']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-actions']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            BlockingOverlay: BlockingOverlay,
            BaseButton: BaseButton,
            BaseCard: BaseCard,
            BaseInput: BaseInput,
            BaseSelect: BaseSelect,
            t: t,
            qa: qa,
            slug: slug,
            loading: loading,
            showSuccess: showSuccess,
            showBlockingOverlay: showBlockingOverlay,
            editIndex: editIndex,
            draft: draft,
            showPassphrase: showPassphrase,
            bands: bands,
            groups: groups,
            summarizeGroup: summarizeGroup,
            enterEdit: enterEdit,
            cancelEdit: cancelEdit,
            updateLocal: updateLocal,
            restoreFromGet: restoreFromGet,
            securityModeOptionsForInterface: securityModeOptionsForInterface,
            getInterfaceByBand: getInterfaceByBand,
            getBandSettingByBand: getBandSettingByBand,
            onCommonSsidToggle: onCommonSsidToggle,
            applyPost: applyPost,
            handleBlockingComplete: handleBlockingComplete,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
