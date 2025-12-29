import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getMockWanStatus } from './services/mockApi';
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';
const route = useRoute();
const wanData = ref(null);
const fetchWanStatus = async () => {
    try {
        wanData.value = getMockWanStatus();
    }
    catch (error) {
        console.error('Error fetching WAN status:', error);
    }
};
onMounted(() => {
    fetchWanStatus();
});
const isLoginPage = computed(() => route.path === '/login');
const isWizardPage = computed(() => route.path === '/wizard');
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "app-container" },
});
if (!__VLS_ctx.isLoginPage && !__VLS_ctx.isWizardPage) {
    /** @type {[typeof Sidebar, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(Sidebar, new Sidebar({}));
    const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "main-content" },
    });
    /** @type {[typeof Header, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(Header, new Header({}));
    const __VLS_4 = __VLS_3({}, ...__VLS_functionalComponentArgsRest(__VLS_3));
    const __VLS_6 = {}.RouterView;
    /** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
    const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
}
else {
    const __VLS_10 = {}.RouterView;
    /** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({}));
    const __VLS_12 = __VLS_11({}, ...__VLS_functionalComponentArgsRest(__VLS_11));
}
/** @type {__VLS_StyleScopedClasses['app-container']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Sidebar: Sidebar,
            Header: Header,
            isLoginPage: isLoginPage,
            isWizardPage: isWizardPage,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
