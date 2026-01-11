import { computed, ref, watch } from 'vue';
const props = withDefaults(defineProps(), {
    modelValue: 0,
    variant: 'default',
    vertical: false,
});
const emit = defineEmits();
const activeTab = ref(props.modelValue);
watch(() => props.modelValue, (newValue) => {
    activeTab.value = newValue;
});
const tabsClasses = computed(() => {
    const classes = ['tabs'];
    if (props.vertical) {
        classes.push('tabs-vertical');
    }
    return classes;
});
const navigationClasses = computed(() => {
    const classes = ['tab-navigation'];
    if (props.variant === 'pills') {
        classes.push('tabs-pills');
    }
    else if (props.variant === 'boxed') {
        classes.push('tabs-boxed');
    }
    return classes;
});
const getTabButtonClass = (index) => {
    return ['tab-button', { active: activeTab.value === index }];
};
const selectTab = (index) => {
    if (props.tabs[index].disabled)
        return;
    activeTab.value = index;
    emit('update:modelValue', index);
    emit('tab-change', index, props.tabs[index]);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    modelValue: 0,
    variant: 'default',
    vertical: false,
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: (__VLS_ctx.tabsClasses) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: (__VLS_ctx.navigationClasses) },
});
for (const [tab, index] of __VLS_getVForSourceType((__VLS_ctx.tabs))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.selectTab(index);
            } },
        key: (tab.key || index),
        ...{ class: (__VLS_ctx.getTabButtonClass(index)) },
        disabled: (tab.disabled),
    });
    if (tab.icon) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "tab-button-icon" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
            ...{ class: (tab.icon) },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (tab.label);
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (tab.label);
    }
    if (tab.badge) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "tab-badge" },
        });
        (tab.badge);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tab-content" },
});
for (const [tab, index] of __VLS_getVForSourceType((__VLS_ctx.tabs))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (tab.key || index),
        ...{ class: (['tab-pane', { active: __VLS_ctx.activeTab === index }]) },
    });
    var __VLS_0 = {
        tab: (tab),
        index: (index),
    };
    var __VLS_1 = __VLS_tryAsConstant(`tab-${index}`);
}
/** @type {__VLS_StyleScopedClasses['tab-button-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-content']} */ ;
// @ts-ignore
var __VLS_2 = __VLS_1, __VLS_3 = __VLS_0;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            activeTab: activeTab,
            tabsClasses: tabsClasses,
            navigationClasses: navigationClasses,
            getTabButtonClass: getTabButtonClass,
            selectTab: selectTab,
        };
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
