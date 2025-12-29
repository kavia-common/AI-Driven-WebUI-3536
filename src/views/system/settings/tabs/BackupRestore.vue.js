import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { backupConfiguration, restoreConfiguration } from '../../../../services/api/backup';
import { useQA } from '../../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const selectedFile = ref(null);
const loading = ref(false);
const error = ref(null);
const fileInput = ref(null);
const isDragging = ref(false);
const handleBackup = async () => {
    loading.value = true;
    error.value = null;
    try {
        await backupConfiguration();
    }
    catch (err) {
        console.error('Error backing up configuration:', err);
        error.value = err instanceof Error ? err.message : 'Failed to backup configuration';
    }
    finally {
        loading.value = false;
    }
};
const handleFileSelect = (event) => {
    const input = event.target;
    if (input.files && input.files.length > 0) {
        selectedFile.value = input.files[0];
    }
};
const handleDrop = (event) => {
    event.preventDefault();
    isDragging.value = false;
    if (event.dataTransfer?.files.length) {
        selectedFile.value = event.dataTransfer.files[0];
    }
};
const handleDragOver = (event) => {
    event.preventDefault();
    isDragging.value = true;
};
const handleDragLeave = (event) => {
    event.preventDefault();
    isDragging.value = false;
};
const handleRestore = async () => {
    if (!selectedFile.value)
        return;
    loading.value = true;
    error.value = null;
    try {
        await restoreConfiguration(selectedFile.value);
        selectedFile.value = null;
    }
    catch (err) {
        console.error('Error restoring configuration:', err);
        error.value = err instanceof Error ? err.message : 'Failed to restore configuration';
    }
    finally {
        loading.value = false;
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['drop-zone']} */ ;
/** @type {__VLS_StyleScopedClasses['drop-zone']} */ ;
/** @type {__VLS_StyleScopedClasses['selected-file']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-clear']} */ ;
/** @type {__VLS_StyleScopedClasses['drop-zone']} */ ;
/** @type {__VLS_StyleScopedClasses['drop-zone']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['drop-text']} */ ;
/** @type {__VLS_StyleScopedClasses['selected-file']} */ ;
/** @type {__VLS_StyleScopedClasses['file-name']} */ ;
/** @type {__VLS_StyleScopedClasses['button-container']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('backup-restore-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-section" },
    'data-testid': (__VLS_ctx.qa('backup-section')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-title" },
    'data-testid': (__VLS_ctx.qa('backup-section-title')),
});
(__VLS_ctx.t('backup.backupTitle'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "description" },
    'data-testid': (__VLS_ctx.qa('backup-description')),
});
(__VLS_ctx.t('backup.backupDescription'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "button-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleBackup) },
    ...{ class: "btn btn-primary" },
    'data-testid': (__VLS_ctx.qa('backup-button')),
    disabled: (__VLS_ctx.loading),
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
}
(__VLS_ctx.t('backup.backupButton'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-section" },
    'data-testid': (__VLS_ctx.qa('restore-section')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-title" },
    'data-testid': (__VLS_ctx.qa('restore-section-title')),
});
(__VLS_ctx.t('backup.restoreTitle'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "description" },
    'data-testid': (__VLS_ctx.qa('restore-description')),
});
(__VLS_ctx.t('backup.restoreDescription'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onDrop: (__VLS_ctx.handleDrop) },
    ...{ onDragover: (__VLS_ctx.handleDragOver) },
    ...{ onDragleave: (__VLS_ctx.handleDragLeave) },
    ...{ class: "drop-zone" },
    ...{ class: ({ dragging: __VLS_ctx.isDragging }) },
    'data-testid': (__VLS_ctx.qa('restore-drop-zone')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "drop-zone-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "material-icons" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "drop-text" },
    'data-testid': (__VLS_ctx.qa('restore-drop-text')),
});
(__VLS_ctx.t('backup.dragAndDrop'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "separator" },
    'data-testid': (__VLS_ctx.qa('restore-separator-text')),
});
(__VLS_ctx.t('backup.selectFromComputer'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (() => __VLS_ctx.fileInput?.click()) },
    ...{ class: "btn btn-secondary" },
    'data-testid': (__VLS_ctx.qa('restore-choose-file-button')),
});
(__VLS_ctx.t('backup.chooseFile'));
if (__VLS_ctx.selectedFile) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "selected-file" },
        'data-testid': (__VLS_ctx.qa('restore-selected-file')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "file-name" },
        'data-testid': (__VLS_ctx.qa('restore-selected-file-name')),
    });
    (__VLS_ctx.selectedFile.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.selectedFile))
                    return;
                __VLS_ctx.selectedFile = null;
            } },
        ...{ class: "btn-clear" },
        'data-testid': (__VLS_ctx.qa('restore-clear-file-button')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    ...{ onChange: (__VLS_ctx.handleFileSelect) },
    type: "file",
    ref: "fileInput",
    'data-testid': (__VLS_ctx.qa('restore-file-input')),
    ...{ style: {} },
    accept: ".bin",
});
/** @type {typeof __VLS_ctx.fileInput} */ ;
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-message" },
        'data-testid': (__VLS_ctx.qa('restore-error-message')),
    });
    (__VLS_ctx.error);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "button-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleRestore) },
    ...{ class: "btn btn-primary" },
    'data-testid': (__VLS_ctx.qa('restore-button')),
    disabled: (!__VLS_ctx.selectedFile || __VLS_ctx.loading),
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
}
(__VLS_ctx.loading ? __VLS_ctx.t('backup.processing') : __VLS_ctx.t('backup.restoreButton'));
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['description']} */ ;
/** @type {__VLS_StyleScopedClasses['button-container']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['description']} */ ;
/** @type {__VLS_StyleScopedClasses['drop-zone']} */ ;
/** @type {__VLS_StyleScopedClasses['drop-zone-content']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['drop-text']} */ ;
/** @type {__VLS_StyleScopedClasses['separator']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['selected-file']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['file-name']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-clear']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['button-container']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
            selectedFile: selectedFile,
            loading: loading,
            error: error,
            fileInput: fileInput,
            isDragging: isDragging,
            handleBackup: handleBackup,
            handleFileSelect: handleFileSelect,
            handleDrop: handleDrop,
            handleDragOver: handleDragOver,
            handleDragLeave: handleDragLeave,
            handleRestore: handleRestore,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
