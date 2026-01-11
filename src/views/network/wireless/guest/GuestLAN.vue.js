import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getGuestLAN, updateGuestLAN } from '../../../../services/api/guestAccess';
import { useQA } from '../../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const guestLANData = ref(null);
const loading = ref(false);
const showSuccess = ref(false);
const error = ref(null);
const fetchGuestLAN = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await getGuestLAN();
        guestLANData.value = response;
    }
    catch (err) {
        console.error('Error fetching Guest LAN settings:', err);
        error.value = 'Failed to fetch Guest LAN settings';
    }
    finally {
        loading.value = false;
    }
};
// Validation functions
const isValidIPv4 = (ip) => {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipv4Regex.test(ip))
        return false;
    const parts = ip.split('.');
    return parts.every(part => {
        const num = parseInt(part, 10);
        return num >= 0 && num <= 255;
    });
};
const isValidSubnetMask = (mask) => {
    const maskRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!maskRegex.test(mask))
        return false;
    const parts = mask.split('.').map(part => parseInt(part, 10));
    let binary = '';
    parts.forEach(num => {
        binary += num.toString(2).padStart(8, '0');
    });
    // Valid subnet masks should have continuous 1s followed by continuous 0s
    return /^1+0*$/.test(binary);
};
const validateIPInput = (ip) => {
    if (!ip)
        return '';
    const parts = ip.split('.');
    return parts.map(part => {
        const num = parseInt(part, 10);
        if (isNaN(num))
            return '0';
        return Math.min(255, Math.max(0, num)).toString();
    }).join('.');
};
const validateLeaseTime = (time) => {
    if (isNaN(time))
        return 43200; // Default to 12 hours
    return Math.max(300, Math.min(604800, time)); // Between 5 minutes and 7 days
};
const validateLANSettings = () => {
    if (!guestLANData.value)
        return false;
    const { GUESTIPSetting, DHCPv4Setting } = guestLANData.value.GuestLAN;
    // Validate LAN IP
    if (!isValidIPv4(GUESTIPSetting.IPAddress)) {
        error.value = 'Invalid LAN IP address format';
        return false;
    }
    if (!isValidSubnetMask(GUESTIPSetting.SubnetMask)) {
        error.value = 'Invalid subnet mask format';
        return false;
    }
    // Validate DHCP settings if enabled
    if (DHCPv4Setting.Enable) {
        if (!isValidIPv4(DHCPv4Setting.BeginAddress)) {
            error.value = 'Invalid DHCP start address';
            return false;
        }
        if (!isValidIPv4(DHCPv4Setting.EndAddress)) {
            error.value = 'Invalid DHCP end address';
            return false;
        }
        if (!isValidSubnetMask(DHCPv4Setting.SubnetMask)) {
            error.value = 'Invalid DHCP subnet mask';
            return false;
        }
        // Validate DHCP range is within LAN subnet
        const ipToNumber = (ip) => {
            const parts = ip.split('.').map(part => parseInt(part, 10));
            return (parts[0] << 24) + (parts[1] << 16) + (parts[2] << 8) + parts[3];
        };
        const maskToNumber = (mask) => {
            const parts = mask.split('.').map(part => parseInt(part, 10));
            return (parts[0] << 24) + (parts[1] << 16) + (parts[2] << 8) + parts[3];
        };
        const lanIp = ipToNumber(GUESTIPSetting.IPAddress);
        const lanMask = maskToNumber(GUESTIPSetting.SubnetMask);
        const beginIp = ipToNumber(DHCPv4Setting.BeginAddress);
        const endIp = ipToNumber(DHCPv4Setting.EndAddress);
        const networkAddr = lanIp & lanMask;
        const broadcastAddr = networkAddr | (~lanMask >>> 0);
        if (beginIp < networkAddr || beginIp > broadcastAddr) {
            error.value = 'DHCP start address must be within LAN subnet';
            return false;
        }
        if (endIp < networkAddr || endIp > broadcastAddr) {
            error.value = 'DHCP end address must be within LAN subnet';
            return false;
        }
        if (beginIp >= endIp) {
            error.value = 'DHCP start address must be lower than end address';
            return false;
        }
        // Validate DNS server if provided
        if (DHCPv4Setting.DNSServers && !DHCPv4Setting.DNSServers.split(',').every(ip => isValidIPv4(ip.trim()))) {
            error.value = 'Invalid DNS server address';
            return false;
        }
    }
    return true;
};
const showSuccessMessage = () => {
    showSuccess.value = true;
    setTimeout(() => {
        showSuccess.value = false;
    }, 3000);
};
const handleSubmit = async () => {
    if (!guestLANData.value)
        return;
    error.value = null;
    if (!validateLANSettings()) {
        return;
    }
    loading.value = true;
    try {
        const leaseTime = typeof guestLANData.value.GuestLAN.DHCPv4Setting.LeaseTime === 'string'
            ? parseInt(guestLANData.value.GuestLAN.DHCPv4Setting.LeaseTime, 10)
            : guestLANData.value.GuestLAN.DHCPv4Setting.LeaseTime;
        await updateGuestLAN({
            GuestLAN: {
                GUESTIPSetting: guestLANData.value.GuestLAN.GUESTIPSetting,
                DHCPv4Setting: {
                    ...guestLANData.value.GuestLAN.DHCPv4Setting,
                    LeaseTime: validateLeaseTime(leaseTime)
                }
            }
        });
        showSuccessMessage();
        await fetchGuestLAN();
    }
    catch (err) {
        console.error('Error updating Guest LAN settings:', err);
        error.value = 'Failed to update Guest LAN settings';
    }
    finally {
        loading.value = false;
    }
};
const handleIPInput = (event, field) => {
    if (!guestLANData.value)
        return;
    const input = event.target;
    const validatedIP = validateIPInput(input.value);
    if (field === 'lanIP') {
        guestLANData.value.GuestLAN.GUESTIPSetting.IPAddress = validatedIP;
    }
    else if (field === 'dnsServer') {
        guestLANData.value.GuestLAN.DHCPv4Setting.DNSServers = validatedIP;
    }
    else if (field === 'beginAddress') {
        guestLANData.value.GuestLAN.DHCPv4Setting.BeginAddress = validatedIP;
    }
    else if (field === 'endAddress') {
        guestLANData.value.GuestLAN.DHCPv4Setting.EndAddress = validatedIP;
    }
};
onMounted(fetchGuestLAN);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['guest-lan']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "guest-lan" },
    'data-testid': (__VLS_ctx.qa('guest-lan-content')),
});
if (__VLS_ctx.loading && !__VLS_ctx.guestLANData) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('guest-lan-loading')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-spinner" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('common.loading'));
}
else if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-state" },
        'data-testid': (__VLS_ctx.qa('guest-lan-error')),
    });
    (__VLS_ctx.error);
}
else if (__VLS_ctx.guestLANData) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
        ...{ onSubmit: (__VLS_ctx.handleSubmit) },
        'data-testid': (__VLS_ctx.qa('guest-lan-form')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
        'data-testid': (__VLS_ctx.qa('guest-lan-ip-section')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "section-title" },
        'data-testid': (__VLS_ctx.qa('guest-lan-ip-title')),
    });
    (__VLS_ctx.t('guest.lanIpSetting'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "switch-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        'data-testid': (__VLS_ctx.qa('guest-lan-ip-enable-label')),
    });
    (__VLS_ctx.t('guest.enable'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "checkbox",
        'data-testid': (__VLS_ctx.qa('guest-lan-ip-enable-toggle')),
        'true-value': (1),
        'false-value': (0),
    });
    (__VLS_ctx.guestLANData.GuestLAN.GUESTIPSetting.Enable);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('guest-lan-ip-address-label')),
    });
    (__VLS_ctx.t('guest.ipAddress'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!!(__VLS_ctx.loading && !__VLS_ctx.guestLANData))
                    return;
                if (!!(__VLS_ctx.error))
                    return;
                if (!(__VLS_ctx.guestLANData))
                    return;
                __VLS_ctx.handleIPInput($event, 'lanIP');
            } },
        type: "text",
        'data-testid': (__VLS_ctx.qa('guest-lan-ip-address-input')),
        value: (__VLS_ctx.guestLANData.GuestLAN.GUESTIPSetting.IPAddress),
        disabled: (!__VLS_ctx.guestLANData.GuestLAN.GUESTIPSetting.Enable),
        placeholder: "192.168.2.1",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('guest-lan-subnet-mask-label')),
    });
    (__VLS_ctx.t('guest.subnetMask'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "text",
        'data-testid': (__VLS_ctx.qa('guest-lan-subnet-mask-input')),
        value: (__VLS_ctx.guestLANData.GuestLAN.GUESTIPSetting.SubnetMask),
        disabled: (!__VLS_ctx.guestLANData.GuestLAN.GUESTIPSetting.Enable),
        placeholder: "255.255.255.0",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
        'data-testid': (__VLS_ctx.qa('guest-lan-dhcp-section')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "section-title" },
        'data-testid': (__VLS_ctx.qa('guest-lan-dhcp-title')),
    });
    (__VLS_ctx.t('guest.dhcpSetting'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "switch-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        'data-testid': (__VLS_ctx.qa('guest-lan-dhcp-enable-label')),
    });
    (__VLS_ctx.t('guest.enableDhcpServer'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "checkbox",
        'data-testid': (__VLS_ctx.qa('guest-lan-dhcp-enable-toggle')),
        'true-value': (1),
        'false-value': (0),
    });
    (__VLS_ctx.guestLANData.GuestLAN.DHCPv4Setting.Enable);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('guest-lan-dns-server-label')),
    });
    (__VLS_ctx.t('guest.dnsServer'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!!(__VLS_ctx.loading && !__VLS_ctx.guestLANData))
                    return;
                if (!!(__VLS_ctx.error))
                    return;
                if (!(__VLS_ctx.guestLANData))
                    return;
                __VLS_ctx.handleIPInput($event, 'dnsServer');
            } },
        type: "text",
        'data-testid': (__VLS_ctx.qa('guest-lan-dns-server-input')),
        value: (__VLS_ctx.guestLANData.GuestLAN.DHCPv4Setting.DNSServers),
        disabled: (!__VLS_ctx.guestLANData.GuestLAN.DHCPv4Setting.Enable),
        placeholder: "192.168.2.1",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('guest-lan-begin-address-label')),
    });
    (__VLS_ctx.t('guest.beginAddress'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!!(__VLS_ctx.loading && !__VLS_ctx.guestLANData))
                    return;
                if (!!(__VLS_ctx.error))
                    return;
                if (!(__VLS_ctx.guestLANData))
                    return;
                __VLS_ctx.handleIPInput($event, 'beginAddress');
            } },
        type: "text",
        'data-testid': (__VLS_ctx.qa('guest-lan-begin-address-input')),
        value: (__VLS_ctx.guestLANData.GuestLAN.DHCPv4Setting.BeginAddress),
        disabled: (!__VLS_ctx.guestLANData.GuestLAN.DHCPv4Setting.Enable),
        placeholder: "192.168.2.2",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('guest-lan-end-address-label')),
    });
    (__VLS_ctx.t('guest.endAddress'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!!(__VLS_ctx.loading && !__VLS_ctx.guestLANData))
                    return;
                if (!!(__VLS_ctx.error))
                    return;
                if (!(__VLS_ctx.guestLANData))
                    return;
                __VLS_ctx.handleIPInput($event, 'endAddress');
            } },
        type: "text",
        'data-testid': (__VLS_ctx.qa('guest-lan-end-address-input')),
        value: (__VLS_ctx.guestLANData.GuestLAN.DHCPv4Setting.EndAddress),
        disabled: (!__VLS_ctx.guestLANData.GuestLAN.DHCPv4Setting.Enable),
        placeholder: "192.168.2.254",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('guest-lan-dhcp-subnet-mask-label')),
    });
    (__VLS_ctx.t('guest.subnetMask'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "text",
        'data-testid': (__VLS_ctx.qa('guest-lan-dhcp-subnet-mask-input')),
        value: (__VLS_ctx.guestLANData.GuestLAN.DHCPv4Setting.SubnetMask),
        disabled: (!__VLS_ctx.guestLANData.GuestLAN.DHCPv4Setting.Enable),
        placeholder: "255.255.255.0",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('guest-lan-lease-time-label')),
    });
    (__VLS_ctx.t('guest.leaseTime'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "input-with-unit" },
        'data-testid': (__VLS_ctx.qa('guest-lan-lease-time-container')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "number",
        'data-testid': (__VLS_ctx.qa('guest-lan-lease-time-input')),
        disabled: (!__VLS_ctx.guestLANData.GuestLAN.DHCPv4Setting.Enable),
        min: "300",
        max: "604800",
    });
    (__VLS_ctx.guestLANData.GuestLAN.DHCPv4Setting.LeaseTime);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "unit" },
        'data-testid': (__VLS_ctx.qa('guest-lan-lease-time-unit')),
    });
    (__VLS_ctx.t('guest.seconds'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "button-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.fetchGuestLAN) },
        type: "button",
        ...{ class: "btn btn-secondary" },
        'data-testid': (__VLS_ctx.qa('guest-lan-cancel-button')),
    });
    (__VLS_ctx.t('common.cancel'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        type: "submit",
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('guest-lan-apply-button')),
    });
    (__VLS_ctx.t('common.apply'));
}
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
        'data-testid': (__VLS_ctx.qa('guest-lan-success-message')),
    });
    (__VLS_ctx.t('common.apply'));
}
/** @type {__VLS_StyleScopedClasses['guest-lan']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['input-with-unit']} */ ;
/** @type {__VLS_StyleScopedClasses['unit']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['success-message']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
            guestLANData: guestLANData,
            loading: loading,
            showSuccess: showSuccess,
            error: error,
            fetchGuestLAN: fetchGuestLAN,
            handleSubmit: handleSubmit,
            handleIPInput: handleIPInput,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
