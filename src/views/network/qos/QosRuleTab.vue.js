import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseCard from '../../../components/common/BaseCard.vue';
import BaseButton from '../../../components/common/BaseButton.vue';
import BaseModal from '../../../components/common/BaseModal.vue';
import BaseInput from '../../../components/common/BaseInput.vue';
import BaseSelect from '../../../components/common/BaseSelect.vue';
import { qosApi } from '../../../services/api/qos';
const { t } = useI18n();
const formData = ref({
    ApplicationTypeList: [],
    DeviceList: [],
    ProtocolList: [],
    PriorityList: [],
    RuleList: []
});
const originalData = ref(null);
const showAddModal = ref(false);
const editingIndex = ref(null);
const selectedApplicationType = ref('');
const selectedDevice = ref('');
const loading = ref(false);
const draggedIndex = ref(null);
const dragOverIndex = ref(null);
const currentRule = ref({
    Order: 0,
    Type: 'Application',
    ApplicationName: '',
    DeviceName: '',
    MACAddress: '',
    Port: '',
    Protocol: '',
    Priority: ''
});
const columns = [
    { key: 'no', label: t('qos.no'), slot: 'no' },
    { key: 'type', label: t('qos.type'), slot: 'type' },
    { key: 'name', label: t('qos.name'), slot: 'name' },
    { key: 'description', label: t('qos.description'), slot: 'description' },
    { key: 'priority', label: t('qos.priority'), slot: 'priority' },
    { key: 'action', label: t('qos.action'), slot: 'action', width: '120px' }
];
const typeOptions = computed(() => [
    { value: 'Application', label: t('qos.application') },
    { value: 'Device', label: t('qos.device') }
]);
const applicationTypeOptions = computed(() => {
    return formData.value.ApplicationTypeList.map((app) => ({
        value: app.ApplicationType,
        label: app.ApplicationType
    }));
});
const deviceOptions = computed(() => {
    return formData.value.DeviceList.map((device) => ({
        value: device.DeviceName,
        label: device.DeviceName
    }));
});
const protocolOptions = computed(() => {
    return formData.value.ProtocolList.map((protocol) => ({
        value: protocol,
        label: protocol
    }));
});
const priorityOptions = computed(() => {
    return formData.value.PriorityList.map((priority) => ({
        value: priority,
        label: priority
    }));
});
const formatDescription = (rule) => {
    if (rule.Type === 'Device') {
        return rule.MACAddress;
    }
    else {
        const parts = [];
        if (rule.Port)
            parts.push(rule.Port);
        if (rule.Protocol)
            parts.push(rule.Protocol.toLowerCase());
        return parts.join('/');
    }
};
const handleTypeChange = () => {
    currentRule.value = {
        Order: currentRule.value.Order,
        Type: currentRule.value.Type,
        ApplicationName: '',
        DeviceName: '',
        MACAddress: '',
        Port: '',
        Protocol: '',
        Priority: currentRule.value.Priority
    };
    selectedApplicationType.value = '';
    selectedDevice.value = '';
};
const handleApplicationTypeChange = () => {
    const appType = formData.value.ApplicationTypeList.find((app) => app.ApplicationType === selectedApplicationType.value);
    if (appType && selectedApplicationType.value !== 'Self-defined') {
        currentRule.value.ApplicationName = appType.ApplicationType;
        currentRule.value.Port = appType.Port;
        currentRule.value.Protocol = appType.Protocol;
    }
    else if (selectedApplicationType.value === 'Self-defined') {
        currentRule.value.ApplicationName = '';
        currentRule.value.Port = '';
        currentRule.value.Protocol = '';
    }
};
const openAddModal = () => {
    // 這次是新增，不是編輯
    editingIndex.value = null;
    // 從後端帶回來的清單裡挑預設值
    const defaultProtocol = formData.value.ProtocolList.includes('TCP,UDP')
        ? 'TCP,UDP'
        : formData.value.ProtocolList[0] || '';
    const defaultPriority = formData.value.PriorityList.includes('Medium')
        ? 'Medium'
        : formData.value.PriorityList[0] || '';
    // 初始化這次要新增的 rule
    currentRule.value = {
        Order: 0,
        Type: 'Application', // 走 Application 分支
        ApplicationName: '',
        DeviceName: '',
        MACAddress: '',
        Port: '', // 留空，顯示 placeholder
        Protocol: defaultProtocol,
        Priority: defaultPriority
    };
    // dropdown 的預設值
    selectedApplicationType.value = 'Self-defined'; // Application Type
    selectedDevice.value = '';
    // 打開彈窗
    showAddModal.value = true;
};
const handleDeviceChange = () => {
    const device = formData.value.DeviceList.find((d) => d.DeviceName === selectedDevice.value);
    if (device) {
        currentRule.value.DeviceName = device.DeviceName;
        currentRule.value.MACAddress = device.MACAddress;
    }
};
const handleEdit = (rule, index) => {
    editingIndex.value = index;
    currentRule.value = { ...rule };
    if (rule.Type === 'Application') {
        selectedApplicationType.value = rule.ApplicationName;
    }
    else {
        selectedDevice.value = rule.DeviceName;
    }
    showAddModal.value = true;
};
const handleDelete = (index) => {
    if (confirm(t('qos.confirmDelete'))) {
        formData.value.RuleList.splice(index, 1);
        formData.value.RuleList.forEach((rule, idx) => {
            rule.Order = idx + 1;
        });
    }
};
const handleAddOrUpdate = () => {
    if (!validateRule()) {
        return;
    }
    if (editingIndex.value !== null) {
        formData.value.RuleList[editingIndex.value] = { ...currentRule.value };
    }
    else {
        currentRule.value.Order = formData.value.RuleList.length + 1;
        formData.value.RuleList.push({ ...currentRule.value });
    }
    closeModal();
};
const validateRule = () => {
    if (!currentRule.value.Priority) {
        alert(t('qos.priorityRequired'));
        return false;
    }
    if (currentRule.value.Type === 'Application') {
        if (!currentRule.value.ApplicationName) {
            alert(t('qos.applicationNameRequired'));
            return false;
        }
        if (selectedApplicationType.value === 'Self-defined') {
            if (!currentRule.value.Port) {
                alert(t('qos.portRequired'));
                return false;
            }
            if (!currentRule.value.Protocol) {
                alert(t('qos.protocolRequired'));
                return false;
            }
        }
    }
    else {
        if (!currentRule.value.DeviceName) {
            alert(t('qos.deviceRequired'));
            return false;
        }
    }
    return true;
};
const closeModal = () => {
    showAddModal.value = false;
    editingIndex.value = null;
    selectedApplicationType.value = '';
    selectedDevice.value = '';
    currentRule.value = {
        Order: 0,
        Type: 'Application',
        ApplicationName: '',
        DeviceName: '',
        MACAddress: '',
        Port: '',
        Protocol: '',
        Priority: ''
    };
};
const handleApply = async () => {
    try {
        loading.value = true;
        await qosApi.updateRule({
            QosRule: {
                RuleList: formData.value.RuleList
            }
        });
        originalData.value = JSON.parse(JSON.stringify(formData.value));
        alert(t('common.saveSuccess'));
    }
    catch (error) {
        console.error('Failed to save QoS rules:', error);
        alert(t('common.saveFailed'));
    }
    finally {
        loading.value = false;
    }
};
const handleCancel = () => {
    if (originalData.value) {
        formData.value = JSON.parse(JSON.stringify(originalData.value));
    }
};
const loadData = async () => {
    try {
        loading.value = true;
        const response = await qosApi.getRule();
        formData.value = response.QosRule;
        originalData.value = JSON.parse(JSON.stringify(response.QosRule));
    }
    catch (error) {
        console.error('Failed to load QoS rules:', error);
    }
    finally {
        loading.value = false;
    }
};
const handleDragStart = (event, index) => {
    draggedIndex.value = index;
    if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/html', String(index));
    }
    const target = event.target;
    target.style.opacity = '0.4';
};
const handleDragOver = (event, index) => {
    event.preventDefault();
    if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
    }
};
const handleDragEnter = (event, index) => {
    event.preventDefault();
    if (draggedIndex.value !== null && draggedIndex.value !== index) {
        dragOverIndex.value = index;
    }
};
const handleDragLeave = (event) => {
    const relatedTarget = event.relatedTarget;
    const currentTarget = event.currentTarget;
    if (!currentTarget.contains(relatedTarget)) {
        dragOverIndex.value = null;
    }
};
const handleDrop = (event, dropIndex) => {
    event.preventDefault();
    event.stopPropagation();
    if (draggedIndex.value !== null && draggedIndex.value !== dropIndex) {
        const items = [...formData.value.RuleList];
        const draggedItem = items[draggedIndex.value];
        items.splice(draggedIndex.value, 1);
        items.splice(dropIndex, 0, draggedItem);
        items.forEach((item, idx) => {
            item.Order = idx + 1;
        });
        formData.value.RuleList = items;
    }
    dragOverIndex.value = null;
};
const handleDragEnd = (event) => {
    const target = event.target;
    target.style.opacity = '1';
    draggedIndex.value = null;
    dragOverIndex.value = null;
};
onMounted(() => {
    loadData();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['rule-header']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['draggable-table']} */ ;
/** @type {__VLS_StyleScopedClasses['draggable-table']} */ ;
/** @type {__VLS_StyleScopedClasses['draggable-table']} */ ;
/** @type {__VLS_StyleScopedClasses['draggable-table']} */ ;
/** @type {__VLS_StyleScopedClasses['draggable-table']} */ ;
/** @type {__VLS_StyleScopedClasses['draggable-table']} */ ;
/** @type {__VLS_StyleScopedClasses['drag-handle']} */ ;
/** @type {__VLS_StyleScopedClasses['drag-handle']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['rule-header']} */ ;
/** @type {__VLS_StyleScopedClasses['draggable-table']} */ ;
/** @type {__VLS_StyleScopedClasses['draggable-table']} */ ;
/** @type {__VLS_StyleScopedClasses['draggable-table']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "qos-rule-tab" },
});
/** @type {[typeof BaseCard, typeof BaseCard, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(BaseCard, new BaseCard({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_2.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "rule-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
(__VLS_ctx.t('qos.qosRuleLists'));
/** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
    ...{ 'onClick': {} },
    variant: "primary",
}));
const __VLS_4 = __VLS_3({
    ...{ 'onClick': {} },
    variant: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
let __VLS_6;
let __VLS_7;
let __VLS_8;
const __VLS_9 = {
    onClick: (__VLS_ctx.openAddModal)
};
__VLS_5.slots.default;
(__VLS_ctx.t('qos.addRule'));
var __VLS_5;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "rule-table-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
    ...{ class: "draggable-table" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
(__VLS_ctx.t('qos.no'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
(__VLS_ctx.t('qos.type'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
(__VLS_ctx.t('qos.name'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
(__VLS_ctx.t('qos.description'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
(__VLS_ctx.t('qos.priority'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
(__VLS_ctx.t('qos.action'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
for (const [row, index] of __VLS_getVForSourceType((__VLS_ctx.formData.RuleList))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
        ...{ onDragstart: (...[$event]) => {
                __VLS_ctx.handleDragStart($event, index);
            } },
        ...{ onDragover: (...[$event]) => {
                __VLS_ctx.handleDragOver($event, index);
            } },
        ...{ onDragenter: (...[$event]) => {
                __VLS_ctx.handleDragEnter($event, index);
            } },
        ...{ onDragleave: (...[$event]) => {
                __VLS_ctx.handleDragLeave($event);
            } },
        ...{ onDrop: (...[$event]) => {
                __VLS_ctx.handleDrop($event, index);
            } },
        ...{ onDragend: (__VLS_ctx.handleDragEnd) },
        key: (`rule-${index}`),
        draggable: "true",
        ...{ class: ({ 'drag-over': __VLS_ctx.dragOverIndex === index }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "drag-handle" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (index + 1);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (row.Type);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (row.Type === 'Application' ? row.ApplicationName : row.DeviceName);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (__VLS_ctx.formatDescription(row));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (row.Priority);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "action-buttons" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.handleEdit(row, index);
            } },
        ...{ class: "icon-btn" },
        title: (__VLS_ctx.t('common.edit')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.handleDelete(index);
            } },
        ...{ class: "icon-btn" },
        title: (__VLS_ctx.t('common.delete')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "button-group" },
});
/** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
    ...{ 'onClick': {} },
    variant: "secondary",
}));
const __VLS_11 = __VLS_10({
    ...{ 'onClick': {} },
    variant: "secondary",
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
let __VLS_13;
let __VLS_14;
let __VLS_15;
const __VLS_16 = {
    onClick: (__VLS_ctx.handleCancel)
};
__VLS_12.slots.default;
(__VLS_ctx.t('common.cancel'));
var __VLS_12;
/** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
    ...{ 'onClick': {} },
    variant: "primary",
}));
const __VLS_18 = __VLS_17({
    ...{ 'onClick': {} },
    variant: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_20;
let __VLS_21;
let __VLS_22;
const __VLS_23 = {
    onClick: (__VLS_ctx.handleApply)
};
__VLS_19.slots.default;
(__VLS_ctx.t('common.apply'));
var __VLS_19;
var __VLS_2;
/** @type {[typeof BaseModal, typeof BaseModal, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(BaseModal, new BaseModal({
    ...{ 'onClose': {} },
    modelValue: (__VLS_ctx.showAddModal),
    title: (__VLS_ctx.editingIndex !== null ? __VLS_ctx.t('qos.editRule') : __VLS_ctx.t('qos.addQosRule')),
}));
const __VLS_25 = __VLS_24({
    ...{ 'onClose': {} },
    modelValue: (__VLS_ctx.showAddModal),
    title: (__VLS_ctx.editingIndex !== null ? __VLS_ctx.t('qos.editRule') : __VLS_ctx.t('qos.addQosRule')),
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
let __VLS_27;
let __VLS_28;
let __VLS_29;
const __VLS_30 = {
    onClose: (__VLS_ctx.closeModal)
};
__VLS_26.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "modal-form" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "form-label" },
});
(__VLS_ctx.t('qos.type'));
/** @type {[typeof BaseSelect, ]} */ ;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(BaseSelect, new BaseSelect({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.currentRule.Type),
    options: (__VLS_ctx.typeOptions),
}));
const __VLS_32 = __VLS_31({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.currentRule.Type),
    options: (__VLS_ctx.typeOptions),
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
let __VLS_34;
let __VLS_35;
let __VLS_36;
const __VLS_37 = {
    onChange: (__VLS_ctx.handleTypeChange)
};
var __VLS_33;
if (__VLS_ctx.currentRule.Type === 'Device') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "form-label" },
    });
    (__VLS_ctx.t('qos.device'));
    /** @type {[typeof BaseSelect, ]} */ ;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent(BaseSelect, new BaseSelect({
        ...{ 'onChange': {} },
        modelValue: (__VLS_ctx.selectedDevice),
        options: (__VLS_ctx.deviceOptions),
    }));
    const __VLS_39 = __VLS_38({
        ...{ 'onChange': {} },
        modelValue: (__VLS_ctx.selectedDevice),
        options: (__VLS_ctx.deviceOptions),
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    let __VLS_41;
    let __VLS_42;
    let __VLS_43;
    const __VLS_44 = {
        onChange: (__VLS_ctx.handleDeviceChange)
    };
    var __VLS_40;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "form-label" },
    });
    (__VLS_ctx.t('qos.macAddress'));
    /** @type {[typeof BaseInput, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
        modelValue: (__VLS_ctx.currentRule.MACAddress),
        disabled: (true),
    }));
    const __VLS_46 = __VLS_45({
        modelValue: (__VLS_ctx.currentRule.MACAddress),
        disabled: (true),
    }, ...__VLS_functionalComponentArgsRest(__VLS_45));
}
if (__VLS_ctx.currentRule.Type === 'Application') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "form-label" },
    });
    (__VLS_ctx.t('qos.applicationType'));
    /** @type {[typeof BaseSelect, ]} */ ;
    // @ts-ignore
    const __VLS_48 = __VLS_asFunctionalComponent(BaseSelect, new BaseSelect({
        ...{ 'onChange': {} },
        modelValue: (__VLS_ctx.selectedApplicationType),
        options: (__VLS_ctx.applicationTypeOptions),
    }));
    const __VLS_49 = __VLS_48({
        ...{ 'onChange': {} },
        modelValue: (__VLS_ctx.selectedApplicationType),
        options: (__VLS_ctx.applicationTypeOptions),
    }, ...__VLS_functionalComponentArgsRest(__VLS_48));
    let __VLS_51;
    let __VLS_52;
    let __VLS_53;
    const __VLS_54 = {
        onChange: (__VLS_ctx.handleApplicationTypeChange)
    };
    var __VLS_50;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "form-label" },
    });
    (__VLS_ctx.t('qos.applicationName'));
    /** @type {[typeof BaseInput, ]} */ ;
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
        modelValue: (__VLS_ctx.currentRule.ApplicationName),
        disabled: (__VLS_ctx.selectedApplicationType !== 'Self-defined'),
    }));
    const __VLS_56 = __VLS_55({
        modelValue: (__VLS_ctx.currentRule.ApplicationName),
        disabled: (__VLS_ctx.selectedApplicationType !== 'Self-defined'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_55));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "form-label" },
    });
    (__VLS_ctx.t('qos.port'));
    /** @type {[typeof BaseInput, ]} */ ;
    // @ts-ignore
    const __VLS_58 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
        modelValue: (__VLS_ctx.currentRule.Port),
        disabled: (__VLS_ctx.selectedApplicationType !== 'Self-defined'),
        placeholder: (__VLS_ctx.t('qos.portPlaceholder')),
    }));
    const __VLS_59 = __VLS_58({
        modelValue: (__VLS_ctx.currentRule.Port),
        disabled: (__VLS_ctx.selectedApplicationType !== 'Self-defined'),
        placeholder: (__VLS_ctx.t('qos.portPlaceholder')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_58));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "field-hint" },
    });
    (__VLS_ctx.t('qos.portHint'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "form-label" },
    });
    (__VLS_ctx.t('qos.protocol'));
    /** @type {[typeof BaseSelect, ]} */ ;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(BaseSelect, new BaseSelect({
        modelValue: (__VLS_ctx.currentRule.Protocol),
        options: (__VLS_ctx.protocolOptions),
        disabled: (__VLS_ctx.selectedApplicationType !== 'Self-defined'),
    }));
    const __VLS_62 = __VLS_61({
        modelValue: (__VLS_ctx.currentRule.Protocol),
        options: (__VLS_ctx.protocolOptions),
        disabled: (__VLS_ctx.selectedApplicationType !== 'Self-defined'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "form-label" },
});
(__VLS_ctx.t('qos.priority'));
/** @type {[typeof BaseSelect, ]} */ ;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent(BaseSelect, new BaseSelect({
    modelValue: (__VLS_ctx.currentRule.Priority),
    options: (__VLS_ctx.priorityOptions),
}));
const __VLS_65 = __VLS_64({
    modelValue: (__VLS_ctx.currentRule.Priority),
    options: (__VLS_ctx.priorityOptions),
}, ...__VLS_functionalComponentArgsRest(__VLS_64));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "modal-actions" },
});
/** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
    ...{ 'onClick': {} },
    variant: "primary",
}));
const __VLS_68 = __VLS_67({
    ...{ 'onClick': {} },
    variant: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
let __VLS_70;
let __VLS_71;
let __VLS_72;
const __VLS_73 = {
    onClick: (__VLS_ctx.handleAddOrUpdate)
};
__VLS_69.slots.default;
(__VLS_ctx.editingIndex !== null ? __VLS_ctx.t('common.update') : __VLS_ctx.t('common.add'));
var __VLS_69;
/** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
// @ts-ignore
const __VLS_74 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
    ...{ 'onClick': {} },
    variant: "secondary",
}));
const __VLS_75 = __VLS_74({
    ...{ 'onClick': {} },
    variant: "secondary",
}, ...__VLS_functionalComponentArgsRest(__VLS_74));
let __VLS_77;
let __VLS_78;
let __VLS_79;
const __VLS_80 = {
    onClick: (__VLS_ctx.closeModal)
};
__VLS_76.slots.default;
(__VLS_ctx.t('common.cancel'));
var __VLS_76;
var __VLS_26;
/** @type {__VLS_StyleScopedClasses['qos-rule-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['rule-header']} */ ;
/** @type {__VLS_StyleScopedClasses['rule-table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['draggable-table']} */ ;
/** @type {__VLS_StyleScopedClasses['drag-handle']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['action-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-form']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['field-hint']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-actions']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            BaseCard: BaseCard,
            BaseButton: BaseButton,
            BaseModal: BaseModal,
            BaseInput: BaseInput,
            BaseSelect: BaseSelect,
            t: t,
            formData: formData,
            showAddModal: showAddModal,
            editingIndex: editingIndex,
            selectedApplicationType: selectedApplicationType,
            selectedDevice: selectedDevice,
            dragOverIndex: dragOverIndex,
            currentRule: currentRule,
            typeOptions: typeOptions,
            applicationTypeOptions: applicationTypeOptions,
            deviceOptions: deviceOptions,
            protocolOptions: protocolOptions,
            priorityOptions: priorityOptions,
            formatDescription: formatDescription,
            handleTypeChange: handleTypeChange,
            handleApplicationTypeChange: handleApplicationTypeChange,
            openAddModal: openAddModal,
            handleDeviceChange: handleDeviceChange,
            handleEdit: handleEdit,
            handleDelete: handleDelete,
            handleAddOrUpdate: handleAddOrUpdate,
            closeModal: closeModal,
            handleApply: handleApply,
            handleCancel: handleCancel,
            handleDragStart: handleDragStart,
            handleDragOver: handleDragOver,
            handleDragEnter: handleDragEnter,
            handleDragLeave: handleDragLeave,
            handleDrop: handleDrop,
            handleDragEnd: handleDragEnd,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
