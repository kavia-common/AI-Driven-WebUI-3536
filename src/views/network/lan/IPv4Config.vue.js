import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getLanBasic, updateLanBasic } from '../../../services/api/lanBasic';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const lanData = ref(null);
const loading = ref(false);
const showSuccess = ref(false);
const error = ref(null);
const editingIndex = ref(null);
// Local state for IP Address Reservation
const reservations = ref([]);
const tempReservation = ref({
    MACAddress: '',
    IPAddress: '',
    Enable: 1
});
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
const isValidMACAddress = (mac) => {
    return /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(mac);
};
const isIPInRange = (ip, beginIp, endIp) => {
    const ipToNumber = (ip) => {
        const parts = ip.split('.').map(part => parseInt(part, 10));
        return (parts[0] << 24) + (parts[1] << 16) + (parts[2] << 8) + parts[3];
    };
    const ipNum = ipToNumber(ip);
    const beginNum = ipToNumber(beginIp);
    const endNum = ipToNumber(endIp);
    return ipNum >= beginNum && ipNum <= endNum;
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
const fetchLanBasic = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await getLanBasic();
        lanData.value = response;
        reservations.value = [...response.LanBasic.IPAddressReservation];
    }
    catch (err) {
        console.error('Error fetching LAN basic:', err);
        error.value = 'Failed to fetch LAN settings';
    }
    finally {
        loading.value = false;
    }
};
const handleAddReservation = () => {
    reservations.value.push({
        MACAddress: '',
        IPAddress: '',
        Enable: 1
    });
    editingIndex.value = reservations.value.length - 1;
};
const validateReservation = (reservation) => {
    if (!isValidMACAddress(reservation.MACAddress)) {
        error.value = 'Invalid MAC address format';
        return false;
    }
    if (!isValidIPv4(reservation.IPAddress)) {
        error.value = 'Invalid IP address format';
        return false;
    }
    if (lanData.value && lanData.value.LanBasic.DHCPv4Setting.Enable) {
        const { BeginAddress, EndAddress } = lanData.value.LanBasic.DHCPv4Setting;
        if (!isIPInRange(reservation.IPAddress, BeginAddress, EndAddress)) {
            error.value = 'Reserved IP must be within DHCP range';
            return false;
        }
    }
    return true;
};
const handleConfirmReservation = (index) => {
    const reservation = reservations.value[index];
    if (!validateReservation(reservation)) {
        return;
    }
    editingIndex.value = null;
    error.value = null;
};
const handleCancelReservation = (index) => {
    if (reservations.value[index].MACAddress === '' && reservations.value[index].IPAddress === '') {
        reservations.value.splice(index, 1);
    }
    editingIndex.value = null;
    error.value = null;
};
const handleEditReservation = (index) => {
    editingIndex.value = index;
    tempReservation.value = { ...reservations.value[index] };
};
const handleDeleteReservation = (index) => {
    reservations.value.splice(index, 1);
    editingIndex.value = null;
};
const validateLANSettings = () => {
    if (!lanData.value)
        return false;
    const { LANIPSetting, DHCPv4Setting } = lanData.value.LanBasic;
    // Validate LAN IP
    if (!isValidIPv4(LANIPSetting.IPAddress)) {
        error.value = 'Invalid LAN IP address format';
        return false;
    }
    if (!isValidSubnetMask(LANIPSetting.SubnetMask)) {
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
        const lanIp = ipToNumber(LANIPSetting.IPAddress);
        const lanMask = maskToNumber(LANIPSetting.SubnetMask);
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
const handleApply = async () => {
    if (!lanData.value)
        return;
    error.value = null;
    if (!validateLANSettings()) {
        return;
    }
    loading.value = true;
    try {
        await updateLanBasic({
            LanBasic: {
                LANIPSetting: lanData.value.LanBasic.LANIPSetting,
                DHCPv4Setting: {
                    ...lanData.value.LanBasic.DHCPv4Setting,
                    LeaseTime: validateLeaseTime(lanData.value.LanBasic.DHCPv4Setting.LeaseTime)
                },
                IPAddressReservation: reservations.value
            }
        });
        showSuccess.value = true;
        setTimeout(() => {
            showSuccess.value = false;
        }, 3000);
        await fetchLanBasic();
    }
    catch (err) {
        console.error('Error updating LAN settings:', err);
        error.value = 'Failed to update LAN settings';
    }
    finally {
        loading.value = false;
    }
};
const handleIPInput = (event, field) => {
    if (!lanData.value)
        return;
    const input = event.target;
    const validatedIP = validateIPInput(input.value);
    if (field === 'lanIP') {
        lanData.value.LanBasic.LANIPSetting.IPAddress = validatedIP;
    }
    else if (field === 'dnsServer') {
        lanData.value.LanBasic.DHCPv4Setting.DNSServers = validatedIP;
    }
    else if (field === 'beginAddress') {
        lanData.value.LanBasic.DHCPv4Setting.BeginAddress = validatedIP;
    }
    else if (field === 'endAddress') {
        lanData.value.LanBasic.DHCPv4Setting.EndAddress = validatedIP;
    }
};
onMounted(fetchLanBasic);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['ipv4-configuration']} */ ;
/** @type {__VLS_StyleScopedClasses['header-row']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "ipv4-configuration" },
    'data-testid': (__VLS_ctx.qa('ipv4-configuration-content')),
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-loading')),
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
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-error')),
    });
    (__VLS_ctx.error);
}
else if (__VLS_ctx.lanData) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-lan-ip-section')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "section-title" },
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-lan-ip-title')),
    });
    (__VLS_ctx.t('lanBasic.lanIpSetting'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-content" },
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-lan-ip-content')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "switch-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-lan-ip-enable-label')),
    });
    (__VLS_ctx.t('lanBasic.enable'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "checkbox",
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-lan-ip-enable-toggle')),
        'true-value': (1),
        'false-value': (0),
    });
    (__VLS_ctx.lanData.LanBasic.LANIPSetting.Enable);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-lan-ip-address-label')),
    });
    (__VLS_ctx.t('lanBasic.ipAddress'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!!(__VLS_ctx.loading))
                    return;
                if (!!(__VLS_ctx.error))
                    return;
                if (!(__VLS_ctx.lanData))
                    return;
                __VLS_ctx.handleIPInput($event, 'lanIP');
            } },
        type: "text",
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-lan-ip-address-input')),
        value: (__VLS_ctx.lanData.LanBasic.LANIPSetting.IPAddress),
        disabled: (!__VLS_ctx.lanData.LanBasic.LANIPSetting.Enable),
        placeholder: "192.168.1.1",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-lan-ip-subnet-mask-label')),
    });
    (__VLS_ctx.t('lanBasic.subnetMask'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "text",
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-lan-ip-subnet-mask-input')),
        value: (__VLS_ctx.lanData.LanBasic.LANIPSetting.SubnetMask),
        disabled: (!__VLS_ctx.lanData.LanBasic.LANIPSetting.Enable),
        placeholder: "255.255.255.0",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-dhcp-section')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "section-title" },
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-dhcp-title')),
    });
    (__VLS_ctx.t('lanBasic.dhcpv4Setting'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-content" },
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-dhcp-content')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "switch-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-dhcp-enable-label')),
    });
    (__VLS_ctx.t('lanBasic.enableDhcpServer'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "switch" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "checkbox",
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-dhcp-enable-toggle')),
        'true-value': (1),
        'false-value': (0),
    });
    (__VLS_ctx.lanData.LanBasic.DHCPv4Setting.Enable);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "slider" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-dhcp-dns-server-label')),
    });
    (__VLS_ctx.t('lanBasic.dnsServer'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!!(__VLS_ctx.loading))
                    return;
                if (!!(__VLS_ctx.error))
                    return;
                if (!(__VLS_ctx.lanData))
                    return;
                __VLS_ctx.handleIPInput($event, 'dnsServer');
            } },
        type: "text",
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-dhcp-dns-server-input')),
        value: (__VLS_ctx.lanData.LanBasic.DHCPv4Setting.DNSServers),
        disabled: (!__VLS_ctx.lanData.LanBasic.DHCPv4Setting.Enable),
        placeholder: "192.168.1.1",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-dhcp-begin-address-label')),
    });
    (__VLS_ctx.t('lanBasic.beginAddress'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!!(__VLS_ctx.loading))
                    return;
                if (!!(__VLS_ctx.error))
                    return;
                if (!(__VLS_ctx.lanData))
                    return;
                __VLS_ctx.handleIPInput($event, 'beginAddress');
            } },
        type: "text",
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-dhcp-begin-address-input')),
        value: (__VLS_ctx.lanData.LanBasic.DHCPv4Setting.BeginAddress),
        disabled: (!__VLS_ctx.lanData.LanBasic.DHCPv4Setting.Enable),
        placeholder: "192.168.1.2",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-dhcp-end-address-label')),
    });
    (__VLS_ctx.t('lanBasic.endAddress'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!!(__VLS_ctx.loading))
                    return;
                if (!!(__VLS_ctx.error))
                    return;
                if (!(__VLS_ctx.lanData))
                    return;
                __VLS_ctx.handleIPInput($event, 'endAddress');
            } },
        type: "text",
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-dhcp-end-address-input')),
        value: (__VLS_ctx.lanData.LanBasic.DHCPv4Setting.EndAddress),
        disabled: (!__VLS_ctx.lanData.LanBasic.DHCPv4Setting.Enable),
        placeholder: "192.168.1.254",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-dhcp-subnet-mask-label')),
    });
    (__VLS_ctx.t('lanBasic.subnetMask'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "text",
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-dhcp-subnet-mask-input')),
        value: (__VLS_ctx.lanData.LanBasic.DHCPv4Setting.SubnetMask),
        disabled: (!__VLS_ctx.lanData.LanBasic.DHCPv4Setting.Enable),
        placeholder: "255.255.255.0",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-dhcp-lease-time-label')),
    });
    (__VLS_ctx.t('lanBasic.leaseTime'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "input-with-unit" },
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-dhcp-lease-time-container')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "number",
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-dhcp-lease-time-input')),
        disabled: (!__VLS_ctx.lanData.LanBasic.DHCPv4Setting.Enable),
        min: "300",
        max: "604800",
    });
    (__VLS_ctx.lanData.LanBasic.DHCPv4Setting.LeaseTime);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "unit" },
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-dhcp-lease-time-unit')),
    });
    (__VLS_ctx.t('lanBasic.seconds'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-reservation-section')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "header-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "section-title-sp" },
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-reservation-title')),
    });
    (__VLS_ctx.t('lanBasic.ipAddressReservation'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleAddReservation) },
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-reservation-add-button')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "material-icons" },
    });
    (__VLS_ctx.t('lanBasic.add'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-content" },
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-reservation-content')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-container" },
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-reservation-table-container')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-reservation-table')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-reservation-header-mac')),
    });
    (__VLS_ctx.t('lanBasic.macAddress'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-reservation-header-ip')),
    });
    (__VLS_ctx.t('lanBasic.ipAddress'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-reservation-header-enable')),
    });
    (__VLS_ctx.t('lanBasic.enable'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-reservation-header-action')),
    });
    (__VLS_ctx.t('lanBasic.action'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [reservation, resIndex] of __VLS_getVForSourceType((__VLS_ctx.reservations))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: (resIndex),
            'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-row-${resIndex}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        if (__VLS_ctx.editingIndex === resIndex) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "text",
                'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-mac-input-${resIndex}`)),
                value: (reservation.MACAddress),
                placeholder: "00:11:22:33:44:55",
            });
        }
        else {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-mac-value-${resIndex}`)),
            });
            (reservation.MACAddress);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        if (__VLS_ctx.editingIndex === resIndex) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "text",
                'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-ip-input-${resIndex}`)),
                value: (reservation.IPAddress),
                placeholder: "192.168.1.100",
            });
        }
        else {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-ip-value-${resIndex}`)),
            });
            (reservation.IPAddress);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "switch-label" },
            'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-enable-container-${resIndex}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "switch" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
            type: "checkbox",
            'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-enable-toggle-${resIndex}`)),
            'true-value': (1),
            'false-value': (0),
        });
        (reservation.Enable);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "slider" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "action-buttons" },
            'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-actions-${resIndex}`)),
        });
        if (__VLS_ctx.editingIndex === resIndex) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!(__VLS_ctx.lanData))
                            return;
                        if (!(__VLS_ctx.editingIndex === resIndex))
                            return;
                        __VLS_ctx.handleConfirmReservation(resIndex);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-confirm-${resIndex}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!(__VLS_ctx.lanData))
                            return;
                        if (!(__VLS_ctx.editingIndex === resIndex))
                            return;
                        __VLS_ctx.handleCancelReservation(resIndex);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-cancel-${resIndex}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
        }
        else {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!(__VLS_ctx.lanData))
                            return;
                        if (!!(__VLS_ctx.editingIndex === resIndex))
                            return;
                        __VLS_ctx.handleEditReservation(resIndex);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-edit-${resIndex}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!(__VLS_ctx.lanData))
                            return;
                        if (!!(__VLS_ctx.editingIndex === resIndex))
                            return;
                        __VLS_ctx.handleDeleteReservation(resIndex);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-delete-${resIndex}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mobile-cards" },
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-reservation-mobile')),
    });
    for (const [reservation, resIndex] of __VLS_getVForSourceType((__VLS_ctx.reservations))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "table-card" },
            key: (resIndex),
            'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-card-${resIndex}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-card-mac-label-${resIndex}`)),
        });
        (__VLS_ctx.t('lanBasic.macAddress'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
        });
        if (__VLS_ctx.editingIndex === resIndex) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "text",
                'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-card-mac-input-${resIndex}`)),
                value: (reservation.MACAddress),
                placeholder: "00:11:22:33:44:55",
            });
        }
        else {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-card-mac-value-${resIndex}`)),
            });
            (reservation.MACAddress);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-card-ip-label-${resIndex}`)),
        });
        (__VLS_ctx.t('lanBasic.ipAddress'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
        });
        if (__VLS_ctx.editingIndex === resIndex) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
                type: "text",
                'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-card-ip-input-${resIndex}`)),
                value: (reservation.IPAddress),
                placeholder: "192.168.1.100",
            });
        }
        else {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-card-ip-value-${resIndex}`)),
            });
            (reservation.IPAddress);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-card-enable-label-${resIndex}`)),
        });
        (__VLS_ctx.t('lanBasic.enable'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "switch-label" },
            'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-card-enable-container-${resIndex}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "switch" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
            type: "checkbox",
            'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-card-enable-toggle-${resIndex}`)),
            'true-value': (1),
            'false-value': (0),
        });
        (reservation.Enable);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "slider" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-actions" },
            'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-card-actions-${resIndex}`)),
        });
        if (__VLS_ctx.editingIndex === resIndex) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!(__VLS_ctx.lanData))
                            return;
                        if (!(__VLS_ctx.editingIndex === resIndex))
                            return;
                        __VLS_ctx.handleConfirmReservation(resIndex);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-card-confirm-${resIndex}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!(__VLS_ctx.lanData))
                            return;
                        if (!(__VLS_ctx.editingIndex === resIndex))
                            return;
                        __VLS_ctx.handleCancelReservation(resIndex);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-card-cancel-${resIndex}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
        }
        else {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!(__VLS_ctx.lanData))
                            return;
                        if (!!(__VLS_ctx.editingIndex === resIndex))
                            return;
                        __VLS_ctx.handleEditReservation(resIndex);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-card-edit-${resIndex}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!(__VLS_ctx.lanData))
                            return;
                        if (!!(__VLS_ctx.editingIndex === resIndex))
                            return;
                        __VLS_ctx.handleDeleteReservation(resIndex);
                    } },
                ...{ class: "btn-action" },
                'data-testid': (__VLS_ctx.qa(`ipv4-configuration-reservation-card-delete-${resIndex}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "material-icons" },
            });
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "button-group" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.fetchLanBasic) },
        ...{ class: "btn btn-secondary" },
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-cancel-button')),
    });
    (__VLS_ctx.t('lanBasic.cancel'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleApply) },
        ...{ class: "btn btn-primary" },
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-apply-button')),
    });
    (__VLS_ctx.t('lanBasic.apply'));
}
if (__VLS_ctx.showSuccess) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "success-message" },
        'data-testid': (__VLS_ctx.qa('ipv4-configuration-success-message')),
    });
    (__VLS_ctx.t('common.apply'));
}
/** @type {__VLS_StyleScopedClasses['ipv4-configuration']} */ ;
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
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['header-row']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title-sp']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['action-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['table-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch-label']} */ ;
/** @type {__VLS_StyleScopedClasses['switch']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['card-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-action']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
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
            lanData: lanData,
            loading: loading,
            showSuccess: showSuccess,
            error: error,
            editingIndex: editingIndex,
            reservations: reservations,
            fetchLanBasic: fetchLanBasic,
            handleAddReservation: handleAddReservation,
            handleConfirmReservation: handleConfirmReservation,
            handleCancelReservation: handleCancelReservation,
            handleEditReservation: handleEditReservation,
            handleDeleteReservation: handleDeleteReservation,
            handleApply: handleApply,
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
