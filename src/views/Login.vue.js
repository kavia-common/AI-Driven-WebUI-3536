import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AuthService } from '../services/auth';
import { useQA } from '../utils/qa';
const { isQAMode, qa, slug } = useQA();
const router = useRouter();
const username = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const handleLogin = async () => {
    if (loading.value)
        return;
    loading.value = true;
    error.value = '';
    try {
        const auth = AuthService.getInstance();
        const success = await auth.login(username.value, password.value);
        if (success) {
            if (auth.needsWizard()) {
                await router.push('/wizard');
            }
            else {
                await router.push('/dashboard');
            }
        }
        else {
            error.value = 'Invalid username or password';
        }
    }
    catch (err) {
        console.error('Login error:', err);
        error.value = err instanceof Error ? err.message : 'Login failed. Please try again.';
    }
    finally {
        loading.value = false;
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['login-button']} */ ;
/** @type {__VLS_StyleScopedClasses['login-button']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "login-container" },
    'data-testid': (__VLS_ctx.qa('login-container')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "login-box" },
    'data-testid': (__VLS_ctx.qa('login-box')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "logo" },
    'data-testid': (__VLS_ctx.qa('login-logo')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.handleLogin) },
    ...{ class: "login-form" },
    'data-testid': (__VLS_ctx.qa('login-form')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "username",
    'data-testid': (__VLS_ctx.qa('login-username-label')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    id: "username",
    'data-testid': (__VLS_ctx.qa('login-username-input')),
    value: (__VLS_ctx.username),
    type: "text",
    required: true,
    placeholder: "Enter username",
    disabled: (__VLS_ctx.loading),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "password",
    'data-testid': (__VLS_ctx.qa('login-password-label')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    id: "password",
    'data-testid': (__VLS_ctx.qa('login-password-input')),
    type: "password",
    required: true,
    placeholder: "Enter password",
    disabled: (__VLS_ctx.loading),
});
(__VLS_ctx.password);
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-message" },
        'data-testid': (__VLS_ctx.qa('login-error-message')),
    });
    (__VLS_ctx.error);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    ...{ class: "login-button" },
    disabled: (__VLS_ctx.loading),
    'data-testid': (__VLS_ctx.qa('login-submit-button')),
});
(__VLS_ctx.loading ? 'Logging in...' : 'Login');
/** @type {__VLS_StyleScopedClasses['login-container']} */ ;
/** @type {__VLS_StyleScopedClasses['login-box']} */ ;
/** @type {__VLS_StyleScopedClasses['logo']} */ ;
/** @type {__VLS_StyleScopedClasses['login-form']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['login-button']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            username: username,
            password: password,
            error: error,
            loading: loading,
            handleLogin: handleLogin,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
