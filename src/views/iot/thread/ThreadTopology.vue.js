import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { getThreadTopology } from '../../../services/api/thread';
import * as d3 from 'd3';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const topologyData = ref(null);
const svgContainer = ref(null);
const selectedNode = ref(null);
const nodeDetails = ref(null);
const loading = ref(true);
const error = ref(null);
// Get node color based on role
const getNodeColor = (role) => {
    switch (role) {
        case 'Leader':
            return '#B19CD9'; // Purple for Leader
        case 'Router':
            return '#8FBCD4'; // Blue for Router
        default:
            return '#FFE082'; // Yellow for Child/other
    }
};
// Get node details
const showNodeDetails = (nodeId) => {
    if (!topologyData.value)
        return;
    const node = topologyData.value.ThreadTopology.Nodes[nodeId];
    if (node) {
        selectedNode.value = nodeId;
        nodeDetails.value = node;
    }
};
// Close node details panel
const closeNodeDetails = () => {
    selectedNode.value = null;
    nodeDetails.value = null;
};
// Fetch topology data
const fetchTopologyData = async () => {
    loading.value = true;
    error.value = null;
    try {
        topologyData.value = await getThreadTopology();
        // 等待下一個 tick，確保 svgContainer 已經有正確尺寸
        await nextTick();
        renderTopology();
    }
    catch (err) {
        console.error('Error fetching Thread topology:', err);
        error.value = 'Failed to fetch Thread topology';
    }
    finally {
        loading.value = false;
    }
};
// Handle refresh
const handleRefresh = () => {
    fetchTopologyData();
};
// Render topology visualization
const renderTopology = () => {
    if (!svgContainer.value || !topologyData.value)
        return;
    // Clear previous content
    d3.select(svgContainer.value).selectAll('*').remove();
    const width = svgContainer.value.clientWidth;
    const height = svgContainer.value.clientHeight;
    // Create SVG
    const svg = d3.select(svgContainer.value)
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', [0, 0, width, height]);
    // Create container group for zoom
    const g = svg.append('g');
    // Add zoom behavior
    const zoom = d3.zoom()
        .scaleExtent([0.1, 4])
        .on('zoom', (event) => {
        g.attr('transform', event.transform);
    });
    svg.call(zoom);
    // Create legend
    const legend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', 'translate(20, 20)');
    // Leader legend
    legend.append('circle')
        .attr('r', 10)
        .attr('cx', 10)
        .attr('cy', 10)
        .style('fill', getNodeColor('Leader'));
    legend.append('text')
        .attr('x', 25)
        .attr('y', 15)
        .text('Leader');
    // Router legend
    legend.append('circle')
        .attr('r', 10)
        .attr('cx', 10)
        .attr('cy', 40)
        .style('fill', getNodeColor('Router'));
    legend.append('text')
        .attr('x', 25)
        .attr('y', 45)
        .text('Router');
    // Child legend
    legend.append('circle')
        .attr('r', 10)
        .attr('cx', 10)
        .attr('cy', 70)
        .style('fill', getNodeColor('Child'));
    legend.append('text')
        .attr('x', 25)
        .attr('y', 75)
        .text('Child');
    // Prepare data for D3
    const nodes = [];
    const links = [];
    // Create nodes
    Object.entries(topologyData.value.ThreadTopology.Nodes).forEach(([id, node]) => {
        nodes.push({
            id,
            role: node.Role,
            rloc16: node.Rloc16
        });
    });
    // Create links
    Object.entries(topologyData.value.ThreadTopology.Links).forEach(([id, link]) => {
        const [source, target] = id.split('_');
        links.push({
            id,
            source,
            target,
            type: link.type
        });
    });
    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(150))
        .force('charge', d3.forceManyBody().strength(-500))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('x', d3.forceX(width / 2).strength(0.1))
        .force('y', d3.forceY(height / 2).strength(0.1));
    // Create links
    const link = g.selectAll('.link')
        .data(links)
        .enter()
        .append('line')
        .attr('class', 'link')
        .style('stroke', d => d.type === 'RouterLink' ? '#0070BB' : '#FFE082')
        .style('stroke-width', 2);
    // Create nodes
    const node = g.selectAll('.node')
        .data(nodes)
        .enter()
        .append('g')
        .attr('class', 'node')
        .on('click', (event, d) => {
        showNodeDetails(d.id);
    })
        .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));
    // Add circles to nodes
    node.append('circle')
        .attr('r', 25)
        .style('fill', d => getNodeColor(d.role))
        .style('stroke', '#fff')
        .style('stroke-width', 2);
    // Add hover effect
    node.append('title')
        .text(d => `${d.id}\nRole: ${d.role}\nRLOC16: ${d.rloc16}`);
    // Update positions on tick
    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);
        node
            .attr('transform', d => `translate(${d.x},${d.y})`);
    });
    // Drag functions
    function dragstarted(event, d) {
        if (!event.active)
            simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    function dragended(event, d) {
        if (!event.active)
            simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
};
// Watch for changes in topologyData
watch(() => topologyData.value, () => {
    if (topologyData.value) {
        renderTopology();
    }
}, { deep: true });
onMounted(() => {
    fetchTopologyData();
    // Handle window resize
    window.addEventListener('resize', renderTopology);
});
onUnmounted(() => {
    window.removeEventListener('resize', renderTopology);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['node-details-header']} */ ;
/** @type {__VLS_StyleScopedClasses['mode-section']} */ ;
/** @type {__VLS_StyleScopedClasses['ipv6-section']} */ ;
/** @type {__VLS_StyleScopedClasses['node']} */ ;
/** @type {__VLS_StyleScopedClasses['node']} */ ;
/** @type {__VLS_StyleScopedClasses['thread-content']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['topology-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['topology-view']} */ ;
/** @type {__VLS_StyleScopedClasses['node-details']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "thread-content" },
    'data-testid': (__VLS_ctx.qa('thread-topology-content')),
});
if (__VLS_ctx.loading && !__VLS_ctx.topologyData) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('thread-topology-loading')),
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
        'data-testid': (__VLS_ctx.qa('thread-topology-error')),
    });
    (__VLS_ctx.error);
}
else if (__VLS_ctx.topologyData) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
        'data-testid': (__VLS_ctx.qa('thread-topology-section')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "topology-layout" },
        'data-testid': (__VLS_ctx.qa('thread-topology-layout')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "topology-view" },
        'data-testid': (__VLS_ctx.qa('thread-topology-view')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "topology-header" },
        'data-testid': (__VLS_ctx.qa('thread-topology-header')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleRefresh) },
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('thread-topology-refresh-button')),
    });
    (__VLS_ctx.t('common.refresh'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "topology-container" },
        'data-testid': (__VLS_ctx.qa('thread-topology-container')),
        ref: "svgContainer",
    });
    /** @type {typeof __VLS_ctx.svgContainer} */ ;
    if (__VLS_ctx.selectedNode && __VLS_ctx.nodeDetails) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "node-details" },
            'data-testid': (__VLS_ctx.qa('thread-topology-node-details')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "node-details-header" },
            'data-testid': (__VLS_ctx.qa('thread-topology-node-details-header')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
            'data-testid': (__VLS_ctx.qa('thread-topology-node-details-title')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.closeNodeDetails) },
            ...{ class: "close-button" },
            'data-testid': (__VLS_ctx.qa('thread-topology-node-details-close')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "node-details-content" },
            'data-testid': (__VLS_ctx.qa('thread-topology-node-details-content')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "info-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "info-label" },
            'data-testid': (__VLS_ctx.qa('thread-topology-node-extended-mac-label')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "info-value" },
            'data-testid': (__VLS_ctx.qa('thread-topology-node-extended-mac-value')),
        });
        (__VLS_ctx.selectedNode);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "info-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "info-label" },
            'data-testid': (__VLS_ctx.qa('thread-topology-node-role-label')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "info-value" },
            'data-testid': (__VLS_ctx.qa('thread-topology-node-role-value')),
        });
        (__VLS_ctx.nodeDetails.Role);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "info-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "info-label" },
            'data-testid': (__VLS_ctx.qa('thread-topology-node-rloc16-label')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "info-value" },
            'data-testid': (__VLS_ctx.qa('thread-topology-node-rloc16-value')),
        });
        (__VLS_ctx.nodeDetails.Rloc16);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "info-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "info-label" },
            'data-testid': (__VLS_ctx.qa('thread-topology-node-router-id-label')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "info-value" },
            'data-testid': (__VLS_ctx.qa('thread-topology-node-router-id-value')),
        });
        (__VLS_ctx.nodeDetails.RouterId);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "info-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "info-label" },
            'data-testid': (__VLS_ctx.qa('thread-topology-node-client-id-label')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "info-value" },
            'data-testid': (__VLS_ctx.qa('thread-topology-node-client-id-value')),
        });
        (__VLS_ctx.nodeDetails.ClientId);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "mode-section" },
            'data-testid': (__VLS_ctx.qa('thread-topology-node-mode-section')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
            'data-testid': (__VLS_ctx.qa('thread-topology-node-mode-title')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "checkbox-group" },
            'data-testid': (__VLS_ctx.qa('thread-topology-node-mode-checkboxes')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-check" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "checkbox",
            id: "full-network-data",
            'data-testid': (__VLS_ctx.qa('thread-topology-node-full-network-data')),
            checked: (__VLS_ctx.nodeDetails.Mode.FullNetworkData),
            disabled: true,
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            for: "full-network-data",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-check" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "checkbox",
            id: "full-thread-device",
            'data-testid': (__VLS_ctx.qa('thread-topology-node-full-thread-device')),
            checked: (__VLS_ctx.nodeDetails.Mode.FullThreadDevice),
            disabled: true,
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            for: "full-thread-device",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-check" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "checkbox",
            id: "rx-on-when-idle",
            'data-testid': (__VLS_ctx.qa('thread-topology-node-rx-on-when-idle')),
            checked: (__VLS_ctx.nodeDetails.Mode.RxOnWhenIdle),
            disabled: true,
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            for: "rx-on-when-idle",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "ipv6-section" },
            'data-testid': (__VLS_ctx.qa('thread-topology-node-ipv6-section')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
            'data-testid': (__VLS_ctx.qa('thread-topology-node-ipv6-title')),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "ipv6-list" },
            'data-testid': (__VLS_ctx.qa('thread-topology-node-ipv6-list')),
        });
        for (const [address, index] of __VLS_getVForSourceType((__VLS_ctx.nodeDetails.IPv6AddressList))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                key: (index),
                ...{ class: "ipv6-address" },
                'data-testid': (__VLS_ctx.qa(`thread-topology-node-ipv6-address-${index}`)),
            });
            (index + 1);
            (address);
        }
    }
}
/** @type {__VLS_StyleScopedClasses['thread-content']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['topology-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['topology-view']} */ ;
/** @type {__VLS_StyleScopedClasses['topology-header']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['topology-container']} */ ;
/** @type {__VLS_StyleScopedClasses['node-details']} */ ;
/** @type {__VLS_StyleScopedClasses['node-details-header']} */ ;
/** @type {__VLS_StyleScopedClasses['close-button']} */ ;
/** @type {__VLS_StyleScopedClasses['node-details-content']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['mode-section']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check']} */ ;
/** @type {__VLS_StyleScopedClasses['form-check']} */ ;
/** @type {__VLS_StyleScopedClasses['ipv6-section']} */ ;
/** @type {__VLS_StyleScopedClasses['ipv6-list']} */ ;
/** @type {__VLS_StyleScopedClasses['ipv6-address']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
            topologyData: topologyData,
            svgContainer: svgContainer,
            selectedNode: selectedNode,
            nodeDetails: nodeDetails,
            loading: loading,
            error: error,
            closeNodeDetails: closeNodeDetails,
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
