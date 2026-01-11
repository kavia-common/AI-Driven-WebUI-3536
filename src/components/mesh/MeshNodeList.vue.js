import { defineProps, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQA } from '../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const __VLS_props = defineProps();
const __VLS_emit = defineEmits();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['action-button']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "table-list" },
    'data-testid': (__VLS_ctx.qa('mesh-node-list-container')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
    'data-testid': (__VLS_ctx.qa('mesh-node-list-table')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('mesh-node-list-header-name')),
});
(__VLS_ctx.t('mesh.name'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('mesh-node-list-header-mode')),
});
(__VLS_ctx.t('mesh.mode'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('mesh-node-list-header-ip')),
});
(__VLS_ctx.t('mesh.ipAddress'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('mesh-node-list-header-mac')),
});
(__VLS_ctx.t('mesh.macAddress'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('mesh-node-list-header-media-type')),
});
(__VLS_ctx.t('mesh.mediaType'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('mesh-node-list-header-supported-band')),
});
(__VLS_ctx.t('mesh.supportedBand'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('mesh-node-list-header-upstream')),
});
(__VLS_ctx.t('mesh.upstream'));
if (__VLS_ctx.nodes.some(node => node.Mode === 'Client')) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('mesh-node-list-header-action')),
    });
    (__VLS_ctx.t('mesh.action'));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
for (const [node, index] of __VLS_getVForSourceType((__VLS_ctx.nodes))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
        key: (node.MACAddress),
        'data-testid': (__VLS_ctx.qa(`mesh-node-list-row-${index}`)),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`mesh-node-list-name-${index}`)),
    });
    (node.Name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`mesh-node-list-mode-${index}`)),
    });
    (node.Mode);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`mesh-node-list-ip-${index}`)),
    });
    (node.ipv4);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`mesh-node-list-mac-${index}`)),
    });
    (node.MACAddress);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`mesh-node-list-media-type-${index}`)),
    });
    (node.MediaType);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`mesh-node-list-supported-band-${index}`)),
    });
    (node.SupportedBand || '-');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`mesh-node-list-upstream-${index}`)),
    });
    (node.Upstream === '-' ? '-' : node.Upstream);
    if (node.Mode === 'Client') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(node.Mode === 'Client'))
                        return;
                    __VLS_ctx.$emit('action', node);
                } },
            ...{ class: "action-button" },
            'data-testid': (__VLS_ctx.qa(`mesh-node-list-action-${index}`)),
        });
        (__VLS_ctx.t('mesh.action'));
    }
}
/** @type {__VLS_StyleScopedClasses['table-list']} */ ;
/** @type {__VLS_StyleScopedClasses['action-button']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
