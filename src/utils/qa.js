import { ref, computed } from 'vue';
const QA_KEY = 'qa:enabled';
const _isQAMode = ref(false);
let _inited = false;
function initQAModeOnce() {
    if (_inited)
        return;
    _inited = true;
    try {
        const url = new URL(window.location.href);
        const qp = url.searchParams.get('__qa');
        if (qp === '1')
            localStorage.setItem(QA_KEY, '1');
        if (qp === '0')
            localStorage.removeItem(QA_KEY);
    }
    catch { }
    _isQAMode.value = localStorage.getItem(QA_KEY) === '1';
    window.addEventListener('storage', (e) => {
        if (e.key === QA_KEY)
            _isQAMode.value = e.newValue === '1';
    });
}
export function useQA() {
    initQAModeOnce();
    const isQAMode = computed(() => _isQAMode.value);
    const qa = (id) => (_isQAMode.value ? id : undefined);
    const slug = (s) => (s ?? '').toString().trim().toLowerCase().replace(/\s+/g, '-');
    return { isQAMode, qa, slug };
}
