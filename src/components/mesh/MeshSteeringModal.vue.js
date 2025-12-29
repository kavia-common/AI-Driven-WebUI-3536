import { ref, defineProps, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQA } from '../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const props = defineProps();
const emit = defineEmits();
const selectedDestination = ref('');
const selectedBand = ref('');
const bands = ['2.4G', '5G', '6G'];
const handleApply = () => {
    if (selectedDestination.value && selectedBand.value) {
        emit('apply', {
            destination: selectedDestination.value,
            band: selectedBand.value
        });
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "modal-overlay" },
    'data-testid': (__VLS_ctx.qa('mesh-steering-modal-overlay')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "modal" },
    'data-testid': (__VLS_ctx.qa('mesh-steering-modal-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "modal-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    'data-testid': (__VLS_ctx.qa('mesh-steering-modal-title')),
});
(__VLS_ctx.t('mesh.steeringControl'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('close');
        } },
    ...{ class: "close-button" },
    'data-testid': (__VLS_ctx.qa('mesh-steering-modal-close')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "modal-content" },
    'data-testid': (__VLS_ctx.qa('mesh-steering-modal-body')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('mesh-steering-modal-selected-node-label')),
});
(__VLS_ctx.t('mesh.selectedNode'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "selected-node" },
    'data-testid': (__VLS_ctx.qa('mesh-steering-modal-selected-node-value')),
});
(__VLS_ctx.node.Name);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('mesh-steering-modal-destination-label')),
});
(__VLS_ctx.t('mesh.destination'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.selectedDestination),
    'data-testid': (__VLS_ctx.qa('mesh-steering-modal-destination-select')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "",
    disabled: true,
    'data-testid': (__VLS_ctx.qa('mesh-steering-modal-destination-placeholder')),
});
(__VLS_ctx.t('mesh.selectDestination'));
for (const [dest] of __VLS_getVForSourceType((__VLS_ctx.destinations))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (dest.MACAddress),
        value: (dest.MACAddress),
        'data-testid': (__VLS_ctx.qa(`mesh-steering-modal-destination-option-${__VLS_ctx.slug(dest.Name)}`)),
    });
    (dest.Name);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('mesh-steering-modal-band-label')),
});
(__VLS_ctx.t('mesh.band'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.selectedBand),
    'data-testid': (__VLS_ctx.qa('mesh-steering-modal-band-select')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "",
    disabled: true,
    'data-testid': (__VLS_ctx.qa('mesh-steering-modal-band-placeholder')),
});
(__VLS_ctx.t('mesh.selectBand'));
for (const [band] of __VLS_getVForSourceType((__VLS_ctx.bands))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (band),
        value: (band),
        'data-testid': (__VLS_ctx.qa(`mesh-steering-modal-band-option-${__VLS_ctx.slug(band)}`)),
    });
    (band);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "modal-footer" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('close');
        } },
    ...{ class: "btn btn-secondary" },
    'data-testid': (__VLS_ctx.qa('mesh-steering-modal-cancel')),
});
(__VLS_ctx.t('common.close'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleApply) },
    ...{ class: "btn btn-primary" },
    'data-testid': (__VLS_ctx.qa('mesh-steering-modal-apply')),
    disabled: (!__VLS_ctx.selectedDestination || !__VLS_ctx.selectedBand),
});
(__VLS_ctx.t('common.apply'));
/** @type {__VLS_StyleScopedClasses['modal-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['modal']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
/** @type {__VLS_StyleScopedClasses['close-button']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['selected-node']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            slug: slug,
            t: t,
            selectedDestination: selectedDestination,
            selectedBand: selectedBand,
            bands: bands,
            handleApply: handleApply,
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
