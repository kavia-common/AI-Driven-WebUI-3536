import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import * as d3 from 'd3';
import { useQA } from '../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const props = defineProps();
const svgContainer = ref(null);
const hoveredNode = ref(null);
const hoverPosition = ref({ x: 0, y: 0 });
const selectedNode = ref(null);
const simulation = ref(null);
// Constants for node sizes and layout
const NODE_SIZES = {
    Controller: 60,
    Agent: 48,
    Client: 40
};
// Load images
const controllerIcon = new URL('/src/assets/icons/mesh_map/controller.png', import.meta.url).href;
const agentIcon = new URL('/src/assets/icons/mesh_map/agent.png', import.meta.url).href;
const clientIcon = new URL('/src/assets/icons/mesh_map/client.png', import.meta.url).href;
const getNodeIcon = (nodeType) => {
    switch (nodeType) {
        case 'Controller': return controllerIcon;
        case 'Agent': return agentIcon;
        case 'Client': return clientIcon;
        default: return clientIcon;
    }
};
const getNodeSize = (nodeType) => {
    return NODE_SIZES[nodeType] || NODE_SIZES.Client;
};
// Calculate hierarchical levels for each node
const calculateHierarchy = (nodes) => {
    const nodeMap = new Map();
    const macToNode = new Map();
    // Build MAC to node mapping
    nodes.forEach(node => {
        macToNode.set(node.MACAddress, node);
    });
    // Find controller (root node) - node with Upstream === '-'
    const controller = nodes.find(n => n.Upstream === '-');
    if (!controller) {
        // If no controller found, treat first node as root
        nodes.forEach((node, idx) => {
            nodeMap.set(node.MACAddress, { node, level: idx === 0 ? 0 : 1 });
        });
        return nodeMap;
    }
    // BFS to assign levels
    const queue = [{ mac: controller.MACAddress, level: 0 }];
    const visited = new Set();
    while (queue.length > 0) {
        const { mac, level } = queue.shift();
        if (visited.has(mac))
            continue;
        visited.add(mac);
        const node = macToNode.get(mac);
        if (node) {
            nodeMap.set(mac, { node, level });
            // Find all children (nodes whose Upstream is this node's MAC)
            const children = nodes.filter(n => n.Upstream === mac);
            children.forEach(child => {
                queue.push({ mac: child.MACAddress, level: level + 1 });
            });
        }
    }
    // Add any remaining nodes that weren't reached
    nodes.forEach(node => {
        if (!nodeMap.has(node.MACAddress)) {
            nodeMap.set(node.MACAddress, { node, level: 0 });
        }
    });
    return nodeMap;
};
// Prepare nodes and links for D3 with hierarchical positioning
const prepareNodesAndLinks = () => {
    const hierarchy = calculateHierarchy(props.nodes);
    // Group nodes by level
    const levelGroups = new Map();
    hierarchy.forEach(({ node, level }) => {
        if (!levelGroups.has(level)) {
            levelGroups.set(level, []);
        }
        levelGroups.get(level).push(node);
    });
    // Create D3 nodes with initial positions
    const nodeMap = new Map();
    props.nodes.forEach(node => {
        nodeMap.set(node.MACAddress, { ...node });
    });
    // Create links array ensuring both source and target nodes exist
    const links = props.nodes
        .filter(node => node.Upstream !== '-' && nodeMap.has(node.Upstream))
        .map(node => ({
        source: nodeMap.get(node.Upstream),
        target: nodeMap.get(node.MACAddress),
        mediaType: node.MediaType
    }));
    return { nodes: Array.from(nodeMap.values()), links, hierarchy };
};
const createSimulation = (width, height) => {
    const { nodes, links, hierarchy } = prepareNodesAndLinks();
    // Calculate the number of levels
    const maxLevel = Math.max(...Array.from(hierarchy.values()).map(h => h.level));
    const verticalPadding = 80;
    const levelHeight = (height - verticalPadding * 2) / Math.max(maxLevel, 1);
    // Group nodes by level for positioning
    const levelGroups = new Map();
    hierarchy.forEach(({ level }, mac) => {
        const node = nodes.find(n => n.MACAddress === mac);
        if (node) {
            if (!levelGroups.has(level)) {
                levelGroups.set(level, []);
            }
            levelGroups.get(level).push(node);
        }
    });
    // Calculate positions for each level
    levelGroups.forEach((nodesInLevel, level) => {
        const y = verticalPadding + level * levelHeight;
        // Calculate horizontal spacing
        const horizontalPadding = 80;
        const availableWidth = width - horizontalPadding * 2;
        const nodeCount = nodesInLevel.length;
        if (nodeCount === 1) {
            // Center single node
            nodesInLevel[0].fx = width / 2;
            nodesInLevel[0].fy = y;
        }
        else {
            // Distribute multiple nodes evenly
            const spacing = availableWidth / (nodeCount - 1);
            nodesInLevel.forEach((node, index) => {
                node.fx = horizontalPadding + spacing * index;
                node.fy = y;
            });
        }
    });
    // Use minimal force simulation just to handle rendering
    const sim = d3.forceSimulation()
        .nodes(nodes)
        .force('link', d3.forceLink(links)
        .id(d => d.MACAddress)
        .distance(levelHeight * 0.8)
        .strength(0))
        .alphaDecay(1) // Stop immediately
        .stop(); // Don't run simulation, use fixed positions
    return { simulation: sim, nodes, links };
};
const renderChart = () => {
    if (!svgContainer.value)
        return;
    // Stop any existing simulation
    if (simulation.value) {
        simulation.value.stop();
    }
    // Clear previous content
    d3.select(svgContainer.value).selectAll('*').remove();
    const containerWidth = svgContainer.value.clientWidth;
    const containerHeight = svgContainer.value.clientHeight;
    // Create SVG
    const svg = d3.select(svgContainer.value)
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', [0, 0, containerWidth, containerHeight]);
    // Create container group for zoom
    const g = svg.append('g');
    // Add zoom behavior
    const zoomBehavior = d3.zoom()
        .scaleExtent([0.1, 4])
        .on('zoom', (event) => {
        g.attr('transform', event.transform);
    });
    svg.call(zoomBehavior);
    // Click on background to deselect
    svg.on('click', () => {
        selectedNode.value = null;
        // Reset all node styles
        g.selectAll('.node image')
            .style('opacity', 1)
            .style('filter', 'none');
    });
    // Create simulation and get prepared nodes and links
    const { simulation: sim, nodes, links } = createSimulation(containerWidth, containerHeight);
    simulation.value = sim;
    // Create links
    const link = g.selectAll('.link')
        .data(links)
        .join('line')
        .attr('class', 'link')
        .style('stroke', d => d.mediaType === 'Wi-Fi' ? '#4CAF50' : '#2196F3')
        .style('stroke-width', 2)
        .style('stroke-dasharray', d => d.mediaType === 'Wi-Fi' ? '5,5' : '');
    // Store original positions for each node
    const originalPositions = new Map();
    nodes.forEach(node => {
        if (node.fx !== undefined && node.fx !== null && node.fy !== undefined && node.fy !== null) {
            originalPositions.set(node.MACAddress, { x: node.fx, y: node.fy });
        }
    });
    // Define update function for positions
    const updatePositions = () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);
        node
            .attr('transform', d => `translate(${d.x},${d.y})`);
    };
    // Create node groups with optional drag behavior
    const node = g.selectAll('.node')
        .data(nodes)
        .join('g')
        .attr('class', 'node')
        .call(d3.drag()
        .on('start', (event, d) => {
        const originalPos = originalPositions.get(d.MACAddress);
        if (originalPos) {
            d.fx = d.x;
            d.fy = originalPos.y; // Keep Y fixed
        }
    })
        .on('drag', (event, d) => {
        const originalPos = originalPositions.get(d.MACAddress);
        if (originalPos) {
            // Only allow horizontal dragging
            d.fx = event.x;
            d.fy = originalPos.y; // Keep Y fixed at original level
            d.x = event.x;
            d.y = originalPos.y;
            // Update positions immediately
            updatePositions();
        }
    })
        .on('end', (event, d) => {
        const originalPos = originalPositions.get(d.MACAddress);
        if (originalPos) {
            // Keep the new horizontal position
            d.fx = event.x;
            d.fy = originalPos.y;
        }
    }));
    // Add images to nodes
    node.append('image')
        .attr('xlink:href', d => getNodeIcon(d.Mode))
        .attr('width', d => getNodeSize(d.Mode))
        .attr('height', d => getNodeSize(d.Mode))
        .attr('x', d => -getNodeSize(d.Mode) / 2)
        .attr('y', d => -getNodeSize(d.Mode) / 2);
    // Add labels
    node.append('text')
        .text(d => d.Name)
        .attr('text-anchor', 'middle')
        .attr('dy', d => getNodeSize(d.Mode) / 2 + 20)
        .style('font-size', '12px')
        .style('fill', '#333');
    // Add hover and click events
    node.on('mouseover', (event, d) => {
        hoveredNode.value = d;
        const rect = event.target.getBoundingClientRect();
        hoverPosition.value = {
            x: rect.left + window.scrollX,
            y: rect.top + window.scrollY
        };
    })
        .on('mouseout', () => {
        hoveredNode.value = null;
    })
        .on('click', (event, d) => {
        event.stopPropagation();
        selectedNode.value = d;
        // Highlight selected node
        node.selectAll('image')
            .style('opacity', n => n === d ? 1 : 0.6)
            .style('filter', n => n === d ? 'drop-shadow(0 0 8px rgba(33, 150, 243, 0.8))' : 'none');
    });
    // Trigger initial position calculation and render
    sim.tick();
    updatePositions();
};
// Watch for changes in nodes
watch(() => props.nodes, () => {
    renderChart();
}, { deep: true });
// Handle window resize
const handleResize = () => {
    renderChart();
};
onMounted(() => {
    renderChart();
    window.addEventListener('resize', handleResize);
});
onUnmounted(() => {
    if (simulation.value) {
        simulation.value.stop();
    }
    window.removeEventListener('resize', handleResize);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['svg-container']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-header']} */ ;
/** @type {__VLS_StyleScopedClasses['close-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-value']} */ ;
/** @type {__VLS_StyleScopedClasses['node']} */ ;
/** @type {__VLS_StyleScopedClasses['node']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "topology-map" },
    'data-testid': (__VLS_ctx.qa('mesh-topology-map-container')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ref: "svgContainer",
    ...{ class: "svg-container" },
    ...{ class: ({ 'with-sidebar': __VLS_ctx.selectedNode }) },
    'data-testid': (__VLS_ctx.qa('mesh-topology-map-svg')),
});
/** @type {typeof __VLS_ctx.svgContainer} */ ;
if (__VLS_ctx.hoveredNode && !__VLS_ctx.selectedNode) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "node-tooltip" },
        'data-testid': (__VLS_ctx.qa('mesh-topology-map-tooltip')),
        ...{ style: ({
                left: `${__VLS_ctx.hoverPosition.x + 10}px`,
                top: `${__VLS_ctx.hoverPosition.y + 10}px`
            }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "tooltip-content" },
        'data-testid': (__VLS_ctx.qa('mesh-topology-map-tooltip-content')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        'data-testid': (__VLS_ctx.qa('mesh-topology-map-tooltip-name')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (__VLS_ctx.hoveredNode.Name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        'data-testid': (__VLS_ctx.qa('mesh-topology-map-tooltip-mode')),
    });
    (__VLS_ctx.hoveredNode.Mode);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        'data-testid': (__VLS_ctx.qa('mesh-topology-map-tooltip-ip')),
    });
    (__VLS_ctx.hoveredNode.ipv4);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        'data-testid': (__VLS_ctx.qa('mesh-topology-map-tooltip-mac')),
    });
    (__VLS_ctx.hoveredNode.MACAddress);
}
const __VLS_0 = {}.transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    name: "slide",
}));
const __VLS_2 = __VLS_1({
    name: "slide",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
if (__VLS_ctx.selectedNode) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "node-detail-panel" },
        'data-testid': (__VLS_ctx.qa('mesh-topology-map-detail-panel')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (__VLS_ctx.t('mesh.nodeDetails') || 'Node Details');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.selectedNode))
                    return;
                __VLS_ctx.selectedNode = null;
            } },
        ...{ class: "close-btn" },
        'data-testid': (__VLS_ctx.qa('mesh-topology-map-detail-close')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "detail-section" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "detail-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "detail-label" },
    });
    (__VLS_ctx.t('mesh.deviceName') || 'Device Name');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "detail-value" },
    });
    (__VLS_ctx.selectedNode.Name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "detail-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "detail-label" },
    });
    (__VLS_ctx.t('mesh.mode') || 'Mode');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "detail-value" },
        ...{ class: (`mode-${__VLS_ctx.selectedNode.Mode.toLowerCase()}`) },
    });
    (__VLS_ctx.selectedNode.Mode);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "detail-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "detail-label" },
    });
    (__VLS_ctx.t('mesh.ipAddress') || 'IP Address');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "detail-value" },
    });
    (__VLS_ctx.selectedNode.ipv4 || '-');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "detail-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "detail-label" },
    });
    (__VLS_ctx.t('mesh.macAddress') || 'MAC Address');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "detail-value mono" },
    });
    (__VLS_ctx.selectedNode.MACAddress);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "detail-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "detail-label" },
    });
    (__VLS_ctx.t('mesh.mediaType') || 'Media Type');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "detail-value" },
    });
    (__VLS_ctx.selectedNode.MediaType);
    if (__VLS_ctx.selectedNode.Upstream !== '-') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "detail-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "detail-label" },
        });
        (__VLS_ctx.t('mesh.upstream') || 'Upstream');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "detail-value mono" },
        });
        (__VLS_ctx.selectedNode.Upstream);
    }
    if (__VLS_ctx.selectedNode.SupportedBand) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "detail-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "detail-label" },
        });
        (__VLS_ctx.t('mesh.band') || 'Band');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "detail-value" },
        });
        (__VLS_ctx.selectedNode.SupportedBand);
    }
    if (__VLS_ctx.selectedNode.TxRate) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "detail-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "detail-label" },
        });
        (__VLS_ctx.t('mesh.txRate') || 'TX Rate');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "detail-value" },
        });
        (__VLS_ctx.selectedNode.TxRate);
    }
    if (__VLS_ctx.selectedNode.RxRate) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "detail-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "detail-label" },
        });
        (__VLS_ctx.t('mesh.rxRate') || 'RX Rate');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "detail-value" },
        });
        (__VLS_ctx.selectedNode.RxRate);
    }
    if (__VLS_ctx.selectedNode.RSSI) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "detail-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "detail-label" },
        });
        (__VLS_ctx.t('mesh.rssi') || 'RSSI');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "detail-value" },
        });
        (__VLS_ctx.selectedNode.RSSI);
    }
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['topology-map']} */ ;
/** @type {__VLS_StyleScopedClasses['svg-container']} */ ;
/** @type {__VLS_StyleScopedClasses['node-tooltip']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip-content']} */ ;
/** @type {__VLS_StyleScopedClasses['node-detail-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-header']} */ ;
/** @type {__VLS_StyleScopedClasses['close-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-content']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-section']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-row']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-label']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-value']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-row']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-label']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-value']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-row']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-label']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-value']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-row']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-label']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-value']} */ ;
/** @type {__VLS_StyleScopedClasses['mono']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-row']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-label']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-value']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-row']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-label']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-value']} */ ;
/** @type {__VLS_StyleScopedClasses['mono']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-row']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-label']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-value']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-row']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-label']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-value']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-row']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-label']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-value']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-row']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-label']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-value']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
            svgContainer: svgContainer,
            hoveredNode: hoveredNode,
            hoverPosition: hoverPosition,
            selectedNode: selectedNode,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
