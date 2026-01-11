import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { getWlanMesh, updateWlanMesh } from '../../../services/api/wireless';
import BlockingOverlay from '../../../components/BlockingOverlay.vue';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const meshData = ref(null);
const loading = ref(false);
const showSuccess = ref(false);
const error = ref(null);
const showBlockingOverlay = ref(false);
// Computed property to check if Mesh is disabled by MLO
const isMeshDisabledByMLO = computed(() => {
    return meshData.value?.WlanMesh.MLOEnable === 1;
});
const fetchMeshConfig = async () => {
    loading.value = true;
    error.value = null;
    try {
        meshData.value = await getWlanMesh();
    }
    catch (err) {
        console.error('Error fetching mesh config:', err);
        error.value = 'Failed to fetch mesh config';
    }
    finally {
        loading.value = false;
    }
};
const showSuccessMessage = () => {
    showSuccess.value = true;
    setTimeout(() => {
        showSuccess.value = false;
    }, 3000);
};
const handleBlockingComplete = () => {
    showBlockingOverlay.value = false;
    // 保持在 mesh 分頁並重新載入頁面
    const currentPath = route.path;
    router.replace({ path: currentPath, query: { tab: 'mesh' } }).then(() => {
        router.go(0);
    });
};
const handleSubmit = async () => {
    if (!meshData.value)
        return;
    showBlockingOverlay.value = true;
    loading.value = true;
    try {
        await updateWlanMesh({
            WlanMesh: {
                MeshEnable: Number(meshData.value.WlanMesh.MeshEnable),
                CommonSSID: meshData.value.WlanMesh.CommonSSID
            }
        });
        showSuccessMessage();
        // Show blocking overlay instead of immediate refresh
    }
    catch (err) {
        console.error('Error updating mesh config:', err);
        error.value = 'Failed to update mesh config';
    }
    finally {
        loading.value = false;
    }
};
onMounted(fetchMeshConfig);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['info-banner']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['mesh-config']} */ ;
/** @type {__VLS_StyleScopedClasses['ssid-content']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mesh-config" },
    'data-testid': (__VLS_ctx.qa('wireless-mesh-config-content')),
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('wireless-mesh-config-loading')),
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
        'data-testid': (__VLS_ctx.qa('wireless-mesh-config-error')),
    });
    (__VLS_ctx.error);
}
else if (__VLS_ctx.meshData) {
    if (__VLS_ctx.isMeshDisabledByMLO) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "mlo-status" },
            'data-testid': (__VLS_ctx.qa('wireless-mesh-config-mlo-status')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "info-banner" },
            'data-testid': (__VLS_ctx.qa('wireless-mesh-config-mlo-info-banner')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "material-icons" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.t('wireless.mloMeshWarning'));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "switch-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        'data-testid': (__VLS_ctx.qa('wireless-mesh-config-enable-label')),
    });
    (__VLS_ctx.t('wireless.easyMesh'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "checkbox",
        'data-testid': (__VLS_ctx.qa('wireless-mesh-config-enable-toggle')),
        'true-value': (1),
        'false-value': (0),
    });
    (__VLS_ctx.meshData.WlanMesh.MeshEnable);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    if (__VLS_ctx.meshData.WlanMesh.MeshEnable === 1) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "common-ssid" },
            'data-testid': (__VLS_ctx.qa('wireless-mesh-config-ssid-section')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-title" },
            'data-testid': (__VLS_ctx.qa('wireless-mesh-config-ssid-title')),
        });
        (__VLS_ctx.t('wireless.commonSsidConfig'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "ssid-content" },
            'data-testid': (__VLS_ctx.qa('wireless-mesh-config-ssid-content')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            'data-testid': (__VLS_ctx.qa('wireless-mesh-config-ssid-label')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "text",
            'data-testid': (__VLS_ctx.qa('wireless-mesh-config-ssid-input')),
            value: (__VLS_ctx.meshData.WlanMesh.CommonSSID),
            required: true,
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "button-group" },
        'data-testid': (__VLS_ctx.qa('wireless-mesh-config-button-group')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.fetchMeshConfig) },
        ...{ class: "btn btn-secondary" },
        'data-testid': (__VLS_ctx.qa('wireless-mesh-config-cancel-button')),
        disabled: (__VLS_ctx.loading),
    });
    (__VLS_ctx.t('common.cancel'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleSubmit) },
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('wireless-mesh-config-apply-button')),
        disabled: (__VLS_ctx.loading),
    });
    (__VLS_ctx.t('common.apply'));
}
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
        'data-testid': (__VLS_ctx.qa('wireless-mesh-config-success-message')),
    });
    (__VLS_ctx.t('common.apply'));
}
/** @type {[typeof BlockingOverlay, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(BlockingOverlay, new BlockingOverlay({
    ...{ 'onComplete': {} },
    dataTestid: (__VLS_ctx.qa('wireless-mesh-config-blocking-overlay')),
    isVisible: (__VLS_ctx.showBlockingOverlay),
    message: "Applying WiFi Mesh Settings...",
    duration: (30),
}));
const __VLS_1 = __VLS_0({
    ...{ 'onComplete': {} },
    dataTestid: (__VLS_ctx.qa('wireless-mesh-config-blocking-overlay')),
    isVisible: (__VLS_ctx.showBlockingOverlay),
    message: "Applying WiFi Mesh Settings...",
    duration: (30),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onComplete: (__VLS_ctx.handleBlockingComplete)
};
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['mesh-config']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['mlo-status']} */ ;
/** @type {__VLS_StyleScopedClasses['info-banner']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['common-ssid']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['ssid-content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
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
            BlockingOverlay: BlockingOverlay,
            qa: qa,
            t: t,
            meshData: meshData,
            loading: loading,
            showSuccess: showSuccess,
            error: error,
            showBlockingOverlay: showBlockingOverlay,
            isMeshDisabledByMLO: isMeshDisabledByMLO,
            fetchMeshConfig: fetchMeshConfig,
            handleBlockingComplete: handleBlockingComplete,
            handleSubmit: handleSubmit,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
