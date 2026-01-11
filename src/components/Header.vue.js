import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { AuthService } from '../services/auth';
import { useQA } from '../utils/qa';
const { isQAMode, qa, slug } = useQA();
import { getSidebarMenu, updateSidebarMenuLanguage } from '../services/api/sidebarMenu';
const router = useRouter();
const { t, locale } = useI18n();
const handleLogout = () => {
    AuthService.getInstance().clearSession();
    router.push('/login');
};
const languageMap = {
    'zh-TW': 'zh_TW',
    'zh-CN': 'zh_CN',
    'en': 'en',
    'fr': 'fr',
    'ja': 'ja',
    'de': 'de',
    'ko': 'ko'
};
const reverseLanguageMap = Object.fromEntries(Object.entries(languageMap).map(([k, v]) => [v, k]));
const availableLanguages = ref([
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'ja', label: '日本語' },
    { code: 'de', label: 'Deutsch' },
    { code: 'zh_TW', label: '繁體中文' },
    { code: 'zh_CN', label: '简体中文' },
    { code: 'ko', label: '한국어' }
]);
const username = localStorage.getItem('username') || 'admin';
const handleLanguageChange = async (event) => {
    const newLocale = event.target.value;
    const datamodelLang = reverseLanguageMap[newLocale] || 'en';
    try {
        await updateSidebarMenuLanguage(datamodelLang);
        locale.value = newLocale;
    }
    catch (error) {
        console.error('Error updating language:', error);
        // Check if error is related to authentication
        if (error instanceof Error &&
            (error.message.includes('401') ||
                error.message.includes('403'))) {
            // Clear session and redirect to login
            AuthService.getInstance().clearSession();
            router.push('/login');
        }
    }
};
const fetchAvailableLanguages = async () => {
    try {
        const response = await getSidebarMenu();
        const availableCodes = response.SidebarMenu.language.available;
        // Filter languages to only show available ones
        availableLanguages.value = availableLanguages.value.filter(lang => response.SidebarMenu.language.available.includes(reverseLanguageMap[lang.code]));
        // Set current language
        locale.value = languageMap[response.SidebarMenu.language.current] || 'en';
    }
    catch (error) {
        console.error('Error fetching available languages:', error);
        // Check if error is related to authentication or contains the specific error message
        if (error instanceof Error &&
            (error.message.includes('401') ||
                error.message.includes('403') ||
                error.message.includes('Failed to fetch sidebar menu'))) {
            // Clear session and redirect to login
            AuthService.getInstance().clearSession();
            router.push('/login');
        }
    }
};
onMounted(() => {
    fetchAvailableLanguages();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['header-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['header-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['header-btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
    ...{ class: "header" },
    'data-testid': (__VLS_ctx.qa('header')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-controls" },
    'data-testid': (__VLS_ctx.qa('header-controls')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "language-select-container" },
    'data-testid': (__VLS_ctx.qa('header-language-container')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "material-icons" },
    'data-testid': (__VLS_ctx.qa('header-language-icon')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    ...{ onChange: (__VLS_ctx.handleLanguageChange) },
    ...{ class: "language-select" },
    'data-testid': (__VLS_ctx.qa('header-language-select')),
    value: (__VLS_ctx.locale),
});
for (const [lang] of __VLS_getVForSourceType((__VLS_ctx.availableLanguages))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (lang.code),
        value: (lang.code),
        'data-testid': (__VLS_ctx.qa(`header-language-option-${lang.code}`)),
    });
    (lang.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ class: "header-btn" },
    'data-testid': (__VLS_ctx.qa('header-account-button')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "material-icons" },
    'data-testid': (__VLS_ctx.qa('header-account-icon')),
});
(__VLS_ctx.username);
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleLogout) },
    ...{ class: "header-btn" },
    'data-testid': (__VLS_ctx.qa('header-logout-button')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "material-icons" },
    'data-testid': (__VLS_ctx.qa('header-logout-icon')),
});
(__VLS_ctx.t('header.logout'));
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['language-select-container']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['language-select']} */ ;
/** @type {__VLS_StyleScopedClasses['header-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['header-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
            locale: locale,
            handleLogout: handleLogout,
            availableLanguages: availableLanguages,
            username: username,
            handleLanguageChange: handleLanguageChange,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
