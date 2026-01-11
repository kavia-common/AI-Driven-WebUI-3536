import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getMeshMap, applySteeringControl } from '../../services/api/mesh';
import MeshNodeTable from '../../components/mesh/MeshNodeTable.vue';
import MeshClientTable from '../../components/mesh/MeshClientTable.vue';
import MeshSteeringModal from '../../components/mesh/MeshSteeringModal.vue';
import MeshTopologyMap from '../../components/mesh/MeshTopologyMap.vue';
import { useQA } from '../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const meshData = ref([]);
const showMap = ref(false);
const selectedClient = ref(null);
const loading = ref(false);
const error = ref(null);
const refreshInterval = ref(null);
const nodes = computed(() => meshData.value.filter(node => node.Mode !== 'Client'));
const clients = computed(() => meshData.value.filter(node => node.Mode === 'Client'));
// Function to check if mesh data has changed
const hasMeshDataChanged = (newData, oldData) => {
    if (newData.length !== oldData.length)
        return true;
    // Create maps for faster lookup
    const oldDataMap = new Map(oldData.map(node => [node.MACAddress, node]));
    // Check if any nodes are different
    return newData.some(newNode => {
        const oldNode = oldDataMap.get(newNode.MACAddress);
        if (!oldNode)
            return true;
        // Compare relevant properties
        return (newNode.Mode !== oldNode.Mode ||
            newNode.ipv4 !== oldNode.ipv4 ||
            newNode.MediaType !== oldNode.MediaType ||
            newNode.Upstream !== oldNode.Upstream ||
            newNode.SupportedBand !== oldNode.SupportedBand);
    });
};
const fetchMeshData = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await getMeshMap();
        if ('NOK' in response) {
            error.value = 'Mesh is disabled';
            meshData.value = [];
        }
        else {
            // Only update if data has changed
            if (hasMeshDataChanged(response.MeshMap, meshData.value)) {
                meshData.value = response.MeshMap;
            }
        }
    }
    catch (err) {
        console.error('Error fetching mesh data:', err);
        error.value = 'Failed to fetch mesh data';
        meshData.value = [];
    }
    finally {
        loading.value = false;
    }
};
const handleAction = (client) => {
    selectedClient.value = client;
};
const handleSteeringApply = async (data) => {
    if (!selectedClient.value)
        return;
    try {
        await applySteeringControl({
            stationMac: selectedClient.value.MACAddress,
            targetBssid: data.destination,
            band: data.band
        });
        // Refresh mesh data after successful steering
        await fetchMeshData();
        selectedClient.value = null;
    }
    catch (err) {
        console.error('Error applying steering control:', err);
        error.value = 'Failed to apply steering control';
    }
};
const getPossibleDestinations = () => {
    return nodes.value.filter(node => node.Mode === 'Agent' && node.MACAddress !== selectedClient.value?.Upstream);
};
onMounted(() => {
    fetchMeshData();
    // Set up auto-refresh every 5 seconds
    // refreshInterval.value = window.setInterval(fetchMeshData, 5000);
});
onUnmounted(() => {
    if (refreshInterval.value) {
        clearInterval(refreshInterval.value);
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
    'data-testid': (__VLS_ctx.qa('mesh-title')),
});
(__VLS_ctx.t('mesh.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('mesh-content')),
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('mesh-loading')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-spinner" },
    });
    (__VLS_ctx.t('common.loading'));
}
else if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-state" },
        'data-testid': (__VLS_ctx.qa('mesh-error')),
    });
    (__VLS_ctx.error);
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
        'data-testid': (__VLS_ctx.qa('mesh-network-section')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "header-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "section-title-sp" },
        'data-testid': (__VLS_ctx.qa('mesh-network-title')),
    });
    (__VLS_ctx.t('mesh.networkInformation'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.loading))
                    return;
                if (!!(__VLS_ctx.error))
                    return;
                __VLS_ctx.showMap = !__VLS_ctx.showMap;
            } },
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('mesh-toggle-view-button')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    (__VLS_ctx.showMap ? 'list' : 'map');
    (__VLS_ctx.showMap ? __VLS_ctx.t('mesh.list') : __VLS_ctx.t('mesh.map'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-content" },
    });
    if (!__VLS_ctx.showMap) {
        /** @type {[typeof MeshNodeTable, ]} */ ;
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(MeshNodeTable, new MeshNodeTable({
            nodes: (__VLS_ctx.nodes),
        }));
        const __VLS_1 = __VLS_0({
            nodes: (__VLS_ctx.nodes),
        }, ...__VLS_functionalComponentArgsRest(__VLS_0));
        /** @type {[typeof MeshClientTable, ]} */ ;
        // @ts-ignore
        const __VLS_3 = __VLS_asFunctionalComponent(MeshClientTable, new MeshClientTable({
            ...{ 'onAction': {} },
            clients: (__VLS_ctx.clients),
        }));
        const __VLS_4 = __VLS_3({
            ...{ 'onAction': {} },
            clients: (__VLS_ctx.clients),
        }, ...__VLS_functionalComponentArgsRest(__VLS_3));
        let __VLS_6;
        let __VLS_7;
        let __VLS_8;
        const __VLS_9 = {
            onAction: (__VLS_ctx.handleAction)
        };
        var __VLS_5;
    }
    else {
        /** @type {[typeof MeshTopologyMap, ]} */ ;
        // @ts-ignore
        const __VLS_10 = __VLS_asFunctionalComponent(MeshTopologyMap, new MeshTopologyMap({
            nodes: (__VLS_ctx.meshData),
        }));
        const __VLS_11 = __VLS_10({
            nodes: (__VLS_ctx.meshData),
        }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "button-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.fetchMeshData) },
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('mesh-refresh-button')),
        disabled: (__VLS_ctx.loading),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    (__VLS_ctx.t('common.refresh'));
}
if (__VLS_ctx.selectedClient) {
    /** @type {[typeof MeshSteeringModal, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(MeshSteeringModal, new MeshSteeringModal({
        ...{ 'onClose': {} },
        ...{ 'onApply': {} },
        dataTestid: (__VLS_ctx.qa('mesh-steering-modal')),
        node: (__VLS_ctx.selectedClient),
        destinations: (__VLS_ctx.getPossibleDestinations()),
    }));
    const __VLS_14 = __VLS_13({
        ...{ 'onClose': {} },
        ...{ 'onApply': {} },
        dataTestid: (__VLS_ctx.qa('mesh-steering-modal')),
        node: (__VLS_ctx.selectedClient),
        destinations: (__VLS_ctx.getPossibleDestinations()),
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    let __VLS_16;
    let __VLS_17;
    let __VLS_18;
    const __VLS_19 = {
        onClose: (...[$event]) => {
            if (!(__VLS_ctx.selectedClient))
                return;
            __VLS_ctx.selectedClient = null;
        }
    };
    const __VLS_20 = {
        onApply: (__VLS_ctx.handleSteeringApply)
    };
    var __VLS_15;
}
/** @type {__VLS_StyleScopedClasses['page-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['header-row']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title-sp']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            MeshNodeTable: MeshNodeTable,
            MeshClientTable: MeshClientTable,
            MeshSteeringModal: MeshSteeringModal,
            MeshTopologyMap: MeshTopologyMap,
            qa: qa,
            t: t,
            meshData: meshData,
            showMap: showMap,
            selectedClient: selectedClient,
            loading: loading,
            error: error,
            nodes: nodes,
            clients: clients,
            fetchMeshData: fetchMeshData,
            handleAction: handleAction,
            handleSteeringApply: handleSteeringApply,
            getPossibleDestinations: getPossibleDestinations,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
