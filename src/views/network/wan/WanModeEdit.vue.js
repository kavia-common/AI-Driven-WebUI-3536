import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const props = defineProps();
const emit = defineEmits();
const defaultStaticIPv4 = {
    DNSServers: '',
    DefaultRouter: '',
    IPv4Address: '',
    SubnetMask: ''
};
const defaultStaticIPv6 = {
    DNSServers: '',
    DefaultRouter: '',
    IPv6Address: '',
    PrefixLength: 0
};
const defaultInterface = {
    Interface: "wan",
    IPv4Mode: "dhcp4",
    IPv6Mode: "none",
    PPPoEUserName: '',
    PPPoEPassword: '',
    VLANType: "untagged",
    VLANID: 100,
    VLANPriority: 0,
    StaticIPv4Address: { ...defaultStaticIPv4 },
    StaticIPv6Address: { ...defaultStaticIPv6 }
};
const editingMode = ref(props.mode ? {
    ...JSON.parse(JSON.stringify(props.mode)),
    Interfaces: props.mode.Interfaces.map(iface => ({
        ...iface,
        StaticIPv4Address: iface.StaticIPv4Address || { ...defaultStaticIPv4 },
        StaticIPv6Address: iface.StaticIPv6Address || { ...defaultStaticIPv6 }
    }))
} : {
    WANMode: '',
    Status: 'Enabled',
    PhysicalType: 'Ethernet',
    EnableSensing: 1,
    DNSMode: 'Dynamic',
    IPv6DNSMode: 'Dynamic',
    Interfaces: [{ ...defaultInterface }]
});
const physicalTypes = ['Ethernet', 'ADSL', 'VDSL', 'SFP', 'GPON', 'GFAST', 'Bridge', 'WWAN'];
const allInterfaces = ['wan', 'voip', 'mgmt', 'iptv'];
const ipv4Modes = ['dhcp4', 'ppp4', 'none', 'static', 'dslite', 'link'];
const ipv6Modes = ['dhcp6', 'ppp6', 'none', 'static', 'link'];
const vlanTypes = ['untagged', 'vlan', 'atm'];
const dnsModes = ['Static', 'Dynamic', ''];
// Compute available interfaces (excluding already selected ones)
const availableInterfaces = computed(() => {
    const selectedInterfaces = new Set(editingMode.value.Interfaces.map(iface => iface.Interface));
    return allInterfaces.filter(iface => !selectedInterfaces.has(iface));
});
const getAvailableInterfaces = (currentInterface) => {
    const otherSelectedInterfaces = new Set(editingMode.value.Interfaces
        .map(iface => iface.Interface)
        .filter(iface => iface !== currentInterface));
    return allInterfaces.filter(iface => !otherSelectedInterfaces.has(iface));
};
const showPPPoE = (iface) => {
    return iface.IPv4Mode === 'ppp4' || iface.IPv6Mode === 'ppp6';
};
const showVLAN = (iface) => {
    return iface.VLANType === 'vlan' || iface.VLANType === 'atm';
};
const showStaticIPv4 = (iface) => {
    return iface.IPv4Mode === 'static';
};
const showStaticIPv6 = (iface) => {
    return iface.IPv6Mode === 'static';
};
const handleSave = () => {
    emit('save', editingMode.value);
};
const addInterface = () => {
    if (availableInterfaces.value.length > 0) {
        editingMode.value.Interfaces.push({
            ...defaultInterface,
            Interface: availableInterfaces.value[0],
            VLANType: 'vlan'
        });
    }
};
const validatePPPoEInput = (value, field) => {
    if (value.length > 64) {
        return value.slice(0, 64);
    }
    return value;
};
const validateVLANPriority = (value) => {
    const num = value;
    if (isNaN(num))
        return 0;
    return Math.max(-1, Math.min(7, num));
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['interface-section']} */ ;
/** @type {__VLS_StyleScopedClasses['static-section']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['wan-mode-edit']} */ ;
/** @type {__VLS_StyleScopedClasses['interface-section']} */ ;
/** @type {__VLS_StyleScopedClasses['interface-section']} */ ;
/** @type {__VLS_StyleScopedClasses['static-section']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wan-mode-edit" },
    'data-testid': (__VLS_ctx.qa('wan-mode-edit-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    'data-testid': (__VLS_ctx.qa('wan-mode-edit-title')),
});
(__VLS_ctx.mode?.WANMode ? __VLS_ctx.t('wanManagement.editMode') : __VLS_ctx.t('wanManagement.addMode'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.handleSave) },
    'data-testid': (__VLS_ctx.qa('wan-mode-edit-form')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('wan-mode-edit-name-label')),
});
(__VLS_ctx.t('wanManagement.name'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "text",
    'data-testid': (__VLS_ctx.qa('wan-mode-edit-name-input')),
    value: (__VLS_ctx.editingMode.WANMode),
    required: true,
    readonly: (!!__VLS_ctx.mode?.WANMode),
    ...{ class: ({ 'readonly': !!__VLS_ctx.mode?.WANMode }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "switch-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    'data-testid': (__VLS_ctx.qa('wan-mode-edit-enable-sensing-label')),
});
(__VLS_ctx.t('wanManagement.enableSensing'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "switch" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    type: "checkbox",
    'data-testid': (__VLS_ctx.qa('wan-mode-edit-enable-sensing-toggle')),
    'true-value': (1),
    'false-value': (0),
});
(__VLS_ctx.editingMode.EnableSensing);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "slider" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('wan-mode-edit-ipv4-dns-mode-label')),
});
(__VLS_ctx.t('wanManagement.ipv4DnsMode'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.editingMode.DNSMode),
    'data-testid': (__VLS_ctx.qa('wan-mode-edit-ipv4-dns-mode-select')),
});
for (const [mode] of __VLS_getVForSourceType((__VLS_ctx.dnsModes))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (mode),
        value: (mode),
        'data-testid': (__VLS_ctx.qa(`wan-mode-edit-ipv4-dns-mode-option-${__VLS_ctx.slug(mode || 'none')}`)),
    });
    (mode || 'None');
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('wan-mode-edit-ipv6-dns-mode-label')),
});
(__VLS_ctx.t('wanManagement.ipv6DnsMode'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.editingMode.IPv6DNSMode),
    'data-testid': (__VLS_ctx.qa('wan-mode-edit-ipv6-dns-mode-select')),
});
for (const [mode] of __VLS_getVForSourceType((__VLS_ctx.dnsModes))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (mode),
        value: (mode),
        'data-testid': (__VLS_ctx.qa(`wan-mode-edit-ipv6-dns-mode-option-${__VLS_ctx.slug(mode || 'none')}`)),
    });
    (mode || 'None');
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    'data-testid': (__VLS_ctx.qa('wan-mode-edit-physical-type-label')),
});
(__VLS_ctx.t('wanManagement.physicalType'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.editingMode.PhysicalType),
    'data-testid': (__VLS_ctx.qa('wan-mode-edit-physical-type-select')),
});
for (const [type] of __VLS_getVForSourceType((__VLS_ctx.physicalTypes))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (type),
        value: (type),
        'data-testid': (__VLS_ctx.qa(`wan-mode-edit-physical-type-option-${__VLS_ctx.slug(type)}`)),
    });
    (type);
}
for (const [iface, ifaceIndex] of __VLS_getVForSourceType((__VLS_ctx.editingMode.Interfaces))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "interface-section" },
        'data-testid': (__VLS_ctx.qa(`wan-mode-edit-interface-section-${ifaceIndex}`)),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        'data-testid': (__VLS_ctx.qa(`wan-mode-edit-interface-title-${ifaceIndex}`)),
    });
    (ifaceIndex + 1);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa(`wan-mode-edit-interface-label-${ifaceIndex}`)),
    });
    (__VLS_ctx.t('wanManagement.interface'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        value: (iface.Interface),
        'data-testid': (__VLS_ctx.qa(`wan-mode-edit-interface-select-${ifaceIndex}`)),
    });
    for (const [int] of __VLS_getVForSourceType((__VLS_ctx.getAvailableInterfaces(iface.Interface)))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
            key: (int),
            value: (int),
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-interface-option-${ifaceIndex}-${__VLS_ctx.slug(int)}`)),
        });
        (int);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa(`wan-mode-edit-ipv4-mode-label-${ifaceIndex}`)),
    });
    (__VLS_ctx.t('wanManagement.ipv4Mode'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        value: (iface.IPv4Mode),
        'data-testid': (__VLS_ctx.qa(`wan-mode-edit-ipv4-mode-select-${ifaceIndex}`)),
    });
    for (const [mode] of __VLS_getVForSourceType((__VLS_ctx.ipv4Modes))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
            key: (mode),
            value: (mode),
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-ipv4-mode-option-${ifaceIndex}-${__VLS_ctx.slug(mode)}`)),
        });
        (mode);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa(`wan-mode-edit-ipv6-mode-label-${ifaceIndex}`)),
    });
    (__VLS_ctx.t('wanManagement.ipv6Mode'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        value: (iface.IPv6Mode),
        'data-testid': (__VLS_ctx.qa(`wan-mode-edit-ipv6-mode-select-${ifaceIndex}`)),
    });
    for (const [mode] of __VLS_getVForSourceType((__VLS_ctx.ipv6Modes))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
            key: (mode),
            value: (mode),
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-ipv6-mode-option-${ifaceIndex}-${__VLS_ctx.slug(mode)}`)),
        });
        (mode);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa(`wan-mode-edit-vlan-type-label-${ifaceIndex}`)),
    });
    (__VLS_ctx.t('wanManagement.vlanType'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        value: (iface.VLANType),
        'data-testid': (__VLS_ctx.qa(`wan-mode-edit-vlan-type-select-${ifaceIndex}`)),
    });
    for (const [type] of __VLS_getVForSourceType((__VLS_ctx.vlanTypes))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
            key: (type),
            value: (type),
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-vlan-type-option-${ifaceIndex}-${__VLS_ctx.slug(type)}`)),
        });
        (type);
    }
    if (__VLS_ctx.showVLAN(iface)) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-vlan-id-label-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.vlanId'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "number",
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-vlan-id-input-${ifaceIndex}`)),
            required: true,
            min: "0",
        });
        (iface.VLANID);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-vlan-priority-label-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.vlanPriority'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            ...{ onInput: (...[$event]) => {
                    if (!(__VLS_ctx.showVLAN(iface)))
                        return;
                    iface.VLANPriority = __VLS_ctx.validateVLANPriority(Number($event.target.value));
                } },
            type: "number",
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-vlan-priority-input-${ifaceIndex}`)),
            required: true,
            min: "-1",
            max: "7",
        });
        (iface.VLANPriority);
    }
    if (__VLS_ctx.showPPPoE(iface)) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-pppoe-username-label-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.pppoeUsername'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            ...{ onInput: (...[$event]) => {
                    if (!(__VLS_ctx.showPPPoE(iface)))
                        return;
                    iface.PPPoEUserName = __VLS_ctx.validatePPPoEInput($event.target.value, 'username');
                } },
            type: "text",
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-pppoe-username-input-${ifaceIndex}`)),
            value: (iface.PPPoEUserName),
            required: true,
            maxlength: "64",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-pppoe-password-label-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.pppoePassword'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            ...{ onInput: (...[$event]) => {
                    if (!(__VLS_ctx.showPPPoE(iface)))
                        return;
                    iface.PPPoEPassword = __VLS_ctx.validatePPPoEInput($event.target.value, 'password');
                } },
            type: "password",
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-pppoe-password-input-${ifaceIndex}`)),
            required: true,
            maxlength: "64",
        });
        (iface.PPPoEPassword);
    }
    if (__VLS_ctx.showStaticIPv4(iface)) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "static-section" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-static-ipv4-section-${ifaceIndex}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-static-ipv4-title-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.staticIpv4'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-static-ipv4-address-label-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.ipv4Address'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "text",
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-static-ipv4-address-input-${ifaceIndex}`)),
            value: (iface.StaticIPv4Address.IPv4Address),
            required: true,
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-static-ipv4-router-label-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.defaultRouter'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "text",
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-static-ipv4-router-input-${ifaceIndex}`)),
            value: (iface.StaticIPv4Address.DefaultRouter),
            required: true,
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-static-ipv4-subnet-label-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.subnetMask'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "text",
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-static-ipv4-subnet-input-${ifaceIndex}`)),
            value: (iface.StaticIPv4Address.SubnetMask),
            required: true,
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-static-ipv4-dns-label-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.dnsServers'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "text",
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-static-ipv4-dns-input-${ifaceIndex}`)),
            value: (iface.StaticIPv4Address.DNSServers),
            required: true,
        });
    }
    if (__VLS_ctx.showStaticIPv6(iface)) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "static-section" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-static-ipv6-section-${ifaceIndex}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-static-ipv6-title-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.staticIpv6'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-static-ipv6-address-label-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.ipv6Address'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "text",
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-static-ipv6-address-input-${ifaceIndex}`)),
            value: (iface.StaticIPv6Address.IPv6Address),
            required: true,
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-static-ipv6-router-label-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.defaultRouter'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "text",
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-static-ipv6-router-input-${ifaceIndex}`)),
            value: (iface.StaticIPv6Address.DefaultRouter),
            required: true,
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-static-ipv6-prefix-label-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.prefixLength'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "text",
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-static-ipv6-prefix-input-${ifaceIndex}`)),
            value: (iface.StaticIPv6Address.PrefixLength),
            required: true,
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-static-ipv6-dns-label-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.dnsServers'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "text",
            'data-testid': (__VLS_ctx.qa(`wan-mode-edit-static-ipv6-dns-input-${ifaceIndex}`)),
            value: (iface.StaticIPv6Address.DNSServers),
            required: true,
        });
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "button-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.addInterface) },
    type: "button",
    ...{ class: "btn btn-secondary" },
    'data-testid': (__VLS_ctx.qa('wan-mode-edit-add-interface-button')),
    disabled: (__VLS_ctx.availableInterfaces.length === 0),
});
(__VLS_ctx.t('wanManagement.addInterface'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "button-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('cancel');
        } },
    type: "button",
    ...{ class: "btn btn-secondary" },
    'data-testid': (__VLS_ctx.qa('wan-mode-edit-cancel-button')),
});
(__VLS_ctx.t('common.cancel'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    ...{ class: "btn btn-primary" },
    'data-testid': (__VLS_ctx.qa('wan-mode-edit-save-button')),
});
(__VLS_ctx.t('common.save'));
/** @type {__VLS_StyleScopedClasses['wan-mode-edit']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['interface-section']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['static-section']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['static-section']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
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
            editingMode: editingMode,
            physicalTypes: physicalTypes,
            ipv4Modes: ipv4Modes,
            ipv6Modes: ipv6Modes,
            vlanTypes: vlanTypes,
            dnsModes: dnsModes,
            availableInterfaces: availableInterfaces,
            getAvailableInterfaces: getAvailableInterfaces,
            showPPPoE: showPPPoE,
            showVLAN: showVLAN,
            showStaticIPv4: showStaticIPv4,
            showStaticIPv6: showStaticIPv6,
            handleSave: handleSave,
            addInterface: addInterface,
            validatePPPoEInput: validatePPPoEInput,
            validateVLANPriority: validateVLANPriority,
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
