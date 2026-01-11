import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { getSidebarMenu, updateSidebarMenuLanguage } from '../services/api/sidebarMenu';
import { AuthService } from '../services/auth';
import { useQA } from '../utils/qa';
const { isQAMode, qa, slug } = useQA();
const router = useRouter();
const route = useRoute();
const { t, locale } = useI18n();
const activeMenu = ref('Status');
const activeSubItem = ref('');
const expandedMenus = ref([]);
const isMobileMenuOpen = ref(false);
const deviceMode = ref('Gateway');
const hasStreambow = ref(false);
const features = ref({});
const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
import homeIcon from '/src/assets/icons/icon-1/ico-home.svg';
import statusIcon from '/src/assets/icons/icon-1/menu-status.svg';
import basicIcon from '/src/assets/icons/icon-1/menu-basic.svg';
import advancedIcon from '/src/assets/icons/icon-1/menu-advanced.svg';
import managementIcon from '/src/assets/icons/icon-1/menu-utilities.svg';
import applicationIcon from '/src/assets/icons/icon-1/menu-application.svg';
const menuVisibility = {
    'Status': {
        'WAN': { gateway: true, extender: false },
        'WAN Failover': { gateway: true, extender: false },
        'LAN': { gateway: true, extender: true },
        'WLAN': { gateway: true, extender: true },
        'Statistics': { gateway: true, extender: true },
        'Throughput': { gateway: true, extender: true },
        'WiFi Neighbor': { gateway: true, extender: false },
        'Mesh Information': { gateway: true, extender: false },
        'LCM': { gateway: true, extender: true },
        'Dual Image': { gateway: true, extender: true },
        'Cellular': { gateway: true, extender: false },
        'Log': { gateway: true, extender: true }
    },
    'Basic Setup': {
        'WAN': { gateway: true, extender: false },
        'Backup WAN': { gateway: true, extender: false },
        'LAN': { gateway: true, extender: true },
        'WLAN': { gateway: true, extender: true },
        'Cellular': { gateway: true, extender: false },
        'NAT': { gateway: true, extender: false },
        'Security': { gateway: true, extender: false },
        'Routing': { gateway: true, extender: false }
    },
    'Advance Setup': {
        'SSH Service': { gateway: true, extender: false },
        'Service Control': { gateway: true, extender: false },
        'QoS': { gateway: true, extender: false }
    },
    'Application': {
        'UPnP': { gateway: true, extender: false },
        'DDNS': { gateway: true, extender: false }
    },
    'Management': {
        'Reboot': { gateway: true, extender: true },
        'Account Management': { gateway: true, extender: false },
        'NTP': { gateway: true, extender: false },
        'Device Management': { gateway: true, extender: false },
        'Settings': { gateway: true, extender: true },
        'Tools': { gateway: true, extender: true }
    },
    'Speed Test': {
        'XperienceControl': { gateway: false, extender: false, requiresStreambow: true },
        'TR-471': { gateway: true, extender: false }
    }
};
const baseMenuItems = [
    {
        name: 'Home',
        icon: homeIcon,
        path: '/dashboard',
        translationKey: 'menu.home'
    },
    {
        name: 'Status',
        icon: statusIcon,
        translationKey: 'menu.status',
        subItems: [
            { name: 'WAN', path: '/status/wan', translationKey: 'menu.wan' },
            { name: 'WAN Failover', path: '/status/wan-failover', translationKey: 'menu.wanFailover' },
            { name: 'LAN', path: '/status/lan', translationKey: 'menu.lan' },
            { name: 'WLAN', path: '/status/wlan', translationKey: 'menu.wlan' },
            { name: 'Statistics', path: '/status/statistics', translationKey: 'menu.statistics' },
            { name: 'Throughput', path: '/status/system-stats', translationKey: 'menu.throughput' },
            { name: 'WiFi Neighbor', path: '/status/wifi-neighbor', translationKey: 'menu.wifiNeighbor' },
            { name: 'Mesh Information', path: '/status/mesh', translationKey: 'menu.meshInfo' },
            { name: 'LCM', path: '/status/lcm', translationKey: 'menu.lcm' },
            { name: 'Dual Image', path: '/status/dual-image', translationKey: 'menu.dualImage' },
            { name: 'Cellular', path: '/status/cellular', translationKey: 'menu.cellular' },
            { name: 'Log', path: '/status/log', translationKey: 'menu.logs' }
        ]
    },
    {
        name: 'Basic Setup',
        icon: basicIcon,
        translationKey: 'menu.basicSetup',
        subItems: [
            { name: 'WAN', path: '/basic/wan', translationKey: 'menu.wan' },
            { name: 'Backup WAN', path: '/basic/backup-wan', translationKey: 'menu.backupWan' },
            {
                name: 'LAN',
                path: '/basic/lan',
                translationKey: 'menu.lan',
                children: [
                    { name: 'IPv4 Configuration', path: '/basic/lan/ipv4', translationKey: 'menu.ipv4Config' },
                    { name: 'IPv6 Configuration', path: '/basic/lan/ipv6', translationKey: 'menu.ipv6Config' },
                    { name: 'Device Connected', path: '/basic/lan/devices', translationKey: 'menu.deviceConnected' }
                ]
            },
            {
                name: 'WLAN',
                path: '/basic/wlan',
                translationKey: 'menu.wlan',
                children: [
                    { name: 'Basic Config', path: '/basic/wlan/basic', translationKey: 'menu.basicConfig' },
                    { name: 'Advanced Config', path: '/basic/wlan/advanced', translationKey: 'menu.advancedConfig' },
                    { name: 'WPS Configuration', path: '/basic/wlan/wps', translationKey: 'menu.wpsConfig' },
                    { name: 'Mesh Network', path: '/basic/wlan/mesh', translationKey: 'menu.meshNetwork' },
                    { name: 'WiFi Zones', path: '/basic/wlan/zones', translationKey: 'menu.wifiZones' },
                    { name: 'Wireless Extender', path: '/basic/wlan/extender', translationKey: 'menu.wirelessExtender' }
                ]
            },
            { name: 'Cellular', path: '/basic/cellular', translationKey: 'menu.cellular' },
            {
                name: 'NAT',
                path: '/basic/nat',
                translationKey: 'menu.nat',
                children: [
                    { name: 'Port Forwarding', path: '/basic/nat?tab=portforwarding', translationKey: 'menu.portForwarding' },
                    { name: 'DMZ Host', path: '/basic/nat?tab=dmz', translationKey: 'menu.dmzHost' },
                    { name: 'ALG', path: '/basic/nat?tab=alg', translationKey: 'menu.alg' }
                ]
            },
            {
                name: 'Security',
                path: '/basic/security',
                translationKey: 'menu.security',
                children: [
                    { name: 'IP Filtering', path: '/basic/security?tab=ipfiltering', translationKey: 'menu.ipFiltering' },
                    { name: 'MAC Filtering', path: '/basic/security?tab=macfiltering', translationKey: 'menu.macFiltering' }
                ]
            },
            { name: 'Routing', path: '/basic/routing', translationKey: 'menu.routing' }
        ]
    },
    {
        name: 'Advance Setup',
        icon: advancedIcon,
        translationKey: 'menu.advanceSetup',
        subItems: [
            { name: 'SSH Service', path: '/advance/ssh', translationKey: 'menu.sshService' },
            { name: 'Service Control', path: '/advance/service-control', translationKey: 'menu.serviceControl' },
            { name: 'QoS', path: '/advance/qos', translationKey: 'menu.qos' }
        ]
    },
    {
        name: 'Application',
        icon: applicationIcon,
        translationKey: 'menu.application',
        subItems: [
            { name: 'UPnP', path: '/application/upnp', translationKey: 'menu.upnp' },
            { name: 'DDNS', path: '/application/ddns', translationKey: 'menu.ddns' }
        ]
    },
    {
        name: 'Management',
        icon: managementIcon,
        translationKey: 'menu.management',
        subItems: [
            { name: 'Reboot', path: '/management/reboot', translationKey: 'menu.reboot' },
            { name: 'Account Management', path: '/management/account', translationKey: 'menu.account' },
            { name: 'NTP', path: '/management/ntp', translationKey: 'menu.ntp' },
            { name: 'Device Management', path: '/management/device', translationKey: 'menu.device' },
            {
                name: 'Settings',
                path: '/management/settings',
                translationKey: 'menu.settings',
                children: [
                    { name: 'Reset to Default', path: '/management/settings/reset', translationKey: 'menu.resetToDefault' },
                    { name: 'Backup/Restore', path: '/management/settings/backup', translationKey: 'menu.backupRestore' },
                    { name: 'Update Software', path: '/management/settings/update', translationKey: 'menu.updateSoftware' }
                ]
            },
            {
                name: 'Tools',
                path: '/management/tools',
                translationKey: 'menu.tools',
                children: [
                    { name: 'Ping Diagnosis', path: '/management/tools/ping', translationKey: 'menu.pingDiagnosis' },
                    { name: 'Trace Route Diagnosis', path: '/management/tools/traceroute', translationKey: 'menu.traceRouteDiagnosis' },
                    { name: 'DNS Diagnosis', path: '/management/tools/dns', translationKey: 'menu.dnsDiagnosis' }
                ]
            }
        ]
    },
    {
        name: 'Speed Test',
        icon: applicationIcon,
        translationKey: 'menu.speedTest',
        subItems: [
            { name: 'XperienceControl', path: '/application/xperience-control', translationKey: 'menu.xperienceControl' },
            { name: 'TR-471', path: '/system/diagnostics/tr471', translationKey: 'menu.tr471' }
        ]
    }
];
const menuItems = ref(baseMenuItems);
const filterMenuItems = () => {
    const isGateway = deviceMode.value === 'Gateway';
    menuItems.value = baseMenuItems.map(item => {
        // Skip filtering for Home (top-level menu item without subItems)
        if (item.name === 'Home')
            return item;
        if (item.subItems) {
            const filteredSubItems = item.subItems.filter(subItem => {
                const visibilityCategory = menuVisibility[item.name];
                if (!visibilityCategory)
                    return true;
                const visibility = visibilityCategory[subItem.name];
                if (!visibility)
                    return true;
                if (visibility.requiresStreambow) {
                    return hasStreambow.value;
                }
                return isGateway ? visibility.gateway : visibility.extender;
            });
            if (filteredSubItems.length === 0)
                return null;
            return {
                ...item,
                subItems: filteredSubItems
            };
        }
        return item;
    }).filter((item) => item !== null);
};
const toggleMenu = (menuName) => {
    if (expandedMenus.value.includes(menuName)) {
        expandedMenus.value = expandedMenus.value.filter(name => name !== menuName);
    }
    else {
        expandedMenus.value = [menuName];
    }
};
const handleMenuClick = (menuName, path) => {
    activeMenu.value = menuName;
    activeSubItem.value = '';
    if (path) {
        router.push(path);
    }
    else {
        toggleMenu(menuName);
    }
};
const handleSubItemClick = (subItem, event) => {
    if (event) {
        event.stopPropagation();
    }
    activeSubItem.value = subItem.name;
    router.push(subItem.path);
};
const isMenuExpanded = (menuName) => {
    return expandedMenus.value.includes(menuName);
};
const STREAMBOW_KEYWORDS = ['streambow'];
const fetchSidebarMenu = async () => {
    try {
        const response = await getSidebarMenu();
        deviceMode.value = response.SidebarMenu.mode;
        features.value = response.SidebarMenu.features || {};
        hasStreambow.value = response.SidebarMenu.Apps.some(app => {
            if (app.state !== 'active')
                return false;
            const name = app.name?.toLowerCase() || '';
            const alias = app.alias?.toLowerCase() || '';
            return STREAMBOW_KEYWORDS.some(keyword => name.includes(keyword) || alias.includes(keyword));
        });
        if (response.SidebarMenu.language.current !== locale.value) {
            locale.value = response.SidebarMenu.language.current;
        }
        filterMenuItems();
    }
    catch (err) {
        console.error('Error fetching sidebar menu:', err);
        if (err instanceof Error &&
            (err.message.includes('403') ||
                err.message.includes('401') ||
                err.message.includes('Failed to fetch sidebar menu'))) {
            const auth = AuthService.getInstance();
            auth.clearSession();
            router.push('/login');
        }
    }
};
watch(() => locale.value, async (newLocale) => {
    try {
        await updateSidebarMenuLanguage(newLocale);
    }
    catch (error) {
        console.error('Error updating language:', error);
        if (error instanceof Error &&
            (error.message.includes('403') ||
                error.message.includes('401'))) {
            const auth = AuthService.getInstance();
            auth.clearSession();
            router.push('/login');
        }
    }
});
watch(() => route.path, (newPath) => {
    let found = false;
    // Path mapping for redirects: maps menu paths to their actual routes
    const pathRedirects = {
        '/basic/wan': ['/network/wan'],
        '/basic/lan': ['/network/lan'],
        '/basic/lan/ipv4': ['/network/lan/ipv4'],
        '/basic/lan/devices': ['/network/lan/devices'],
        '/basic/wlan': ['/network/wireless'],
        '/basic/wlan/basic': ['/network/wireless/basic'],
        '/basic/wlan/advanced': ['/network/wireless/advanced'],
        '/basic/wlan/wps': ['/network/wireless/wps'],
        '/basic/wlan/mesh': ['/network/wireless/mesh'],
        '/basic/wlan/extender': ['/network/wireless/extender'],
        '/basic/nat': ['/advanced/nat'],
        '/basic/nat/dmz': ['/advanced/nat/dmz'],
        '/basic/security': ['/advanced/security'],
        '/advance/ssh': ['/advanced/ssh'],
        '/advance/service-control': ['/advanced/service-control'],
        '/advance/qos': ['/advanced/qos'],
        '/application/ddns': ['/advanced/ddns'],
        '/management/tools': ['/system/diagnostics'],
        '/management/tools/ping': ['/system/diagnostics/ping'],
        '/management/tools/traceroute': ['/system/diagnostics/traceroute'],
        '/management/tools/dns': ['/system/diagnostics/dns'],
        '/management/reboot': ['/system/reboot'],
        '/management/ntp': ['/system/ntp'],
        '/management/settings': ['/system/settings'],
        '/management/settings/reset': ['/system/settings/reset'],
        '/management/settings/backup': ['/system/settings/backup'],
        '/management/settings/update': ['/system/settings/update'],
        '/management/device': ['/system/device'],
        '/management/account': ['/system/account']
    };
    const pathMatches = (menuPath, currentPath) => {
        // Exact match
        if (menuPath === currentPath)
            return true;
        // Check if menuPath has a known redirect to currentPath
        if (pathRedirects[menuPath]) {
            if (pathRedirects[menuPath].includes(currentPath)) {
                return true;
            }
        }
        return false;
    };
    for (const item of menuItems.value) {
        if (item.path && pathMatches(item.path, newPath)) {
            activeMenu.value = item.name;
            activeSubItem.value = '';
            found = true;
            break;
        }
        if (item.subItems) {
            const subItem = item.subItems.find(sub => pathMatches(sub.path, newPath));
            if (subItem) {
                activeMenu.value = item.name;
                activeSubItem.value = subItem.name;
                if (!expandedMenus.value.includes(item.name)) {
                    expandedMenus.value = [item.name];
                }
                found = true;
                break;
            }
            for (const subItem of item.subItems) {
                if (subItem.children) {
                    const childItem = subItem.children.find(child => pathMatches(child.path, newPath));
                    if (childItem) {
                        activeMenu.value = item.name;
                        activeSubItem.value = subItem.name;
                        if (!expandedMenus.value.includes(item.name)) {
                            expandedMenus.value = [item.name];
                        }
                        found = true;
                        break;
                    }
                }
            }
            if (found)
                break;
        }
    }
    if (!found) {
        activeSubItem.value = '';
        expandedMenus.value = [];
    }
}, { immediate: true });
onMounted(() => {
    fetchSidebarMenu();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['mobile-menu-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['menu']} */ ;
/** @type {__VLS_StyleScopedClasses['menu']} */ ;
/** @type {__VLS_StyleScopedClasses['menu']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-header']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-header']} */ ;
/** @type {__VLS_StyleScopedClasses['arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['submenu']} */ ;
/** @type {__VLS_StyleScopedClasses['expanded']} */ ;
/** @type {__VLS_StyleScopedClasses['submenu-item']} */ ;
/** @type {__VLS_StyleScopedClasses['submenu-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-top-header']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['menu']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-header']} */ ;
/** @type {__VLS_StyleScopedClasses['submenu-item']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mobile-top-header" },
    'data-testid': (__VLS_ctx.qa('mobile-header')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.toggleMobileMenu) },
    ...{ class: "mobile-menu-toggle" },
    'data-testid': (__VLS_ctx.qa('mobile-menu-toggle')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "material-icons" },
    'data-testid': (__VLS_ctx.qa('mobile-menu-icon')),
});
(__VLS_ctx.isMobileMenuOpen ? 'close' : 'menu');
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "mobile-logo" },
    'data-testid': (__VLS_ctx.qa('mobile-logo')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.aside, __VLS_intrinsicElements.aside)({
    ...{ class: "sidebar" },
    'data-testid': (__VLS_ctx.qa('sidebar')),
    ...{ class: ({ 'mobile-open': __VLS_ctx.isMobileMenuOpen }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "logo desktop-only" },
    'data-testid': (__VLS_ctx.qa('sidebar-logo')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "logo-text" },
    'data-testid': (__VLS_ctx.qa('sidebar-logo-text')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
    ...{ class: "menu" },
    'data-testid': (__VLS_ctx.qa('sidebar-menu')),
});
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.menuItems))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (item.name),
        ...{ class: "menu-item" },
        'data-testid': (__VLS_ctx.qa(`sidebar-menu-item-${__VLS_ctx.slug(item.name)}`)),
        ...{ class: ({ active: __VLS_ctx.activeMenu === item.name }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.handleMenuClick(item.name, item.path);
            } },
        ...{ class: "menu-header" },
        'data-testid': (__VLS_ctx.qa(`sidebar-menu-header-${__VLS_ctx.slug(item.name)}`)),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "icon" },
        'data-testid': (__VLS_ctx.qa(`sidebar-menu-icon-${__VLS_ctx.slug(item.name)}`)),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (item.icon),
        alt: "icon",
    });
    (__VLS_ctx.t(item.translationKey));
    if (item.subItems) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "arrow" },
            'data-testid': (__VLS_ctx.qa(`sidebar-menu-arrow-${__VLS_ctx.slug(item.name)}`)),
            ...{ class: ({ expanded: __VLS_ctx.isMenuExpanded(item.name) }) },
        });
    }
    if (item.subItems) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "submenu" },
            'data-testid': (__VLS_ctx.qa(`sidebar-submenu-${__VLS_ctx.slug(item.name)}`)),
            ...{ class: ({ expanded: __VLS_ctx.isMenuExpanded(item.name) }) },
        });
        for (const [subItem] of __VLS_getVForSourceType((item.subItems))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ onClick: (...[$event]) => {
                        if (!(item.subItems))
                            return;
                        __VLS_ctx.handleSubItemClick(subItem, $event);
                    } },
                key: (subItem.name),
                ...{ class: "submenu-item" },
                'data-testid': (__VLS_ctx.qa(`sidebar-submenu-item-${__VLS_ctx.slug(item.name)}-${__VLS_ctx.slug(subItem.name)}`)),
                ...{ class: ({ active: __VLS_ctx.activeSubItem === subItem.name }) },
            });
            (__VLS_ctx.t(subItem.translationKey));
        }
    }
}
/** @type {__VLS_StyleScopedClasses['mobile-top-header']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-menu-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['material-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['logo']} */ ;
/** @type {__VLS_StyleScopedClasses['desktop-only']} */ ;
/** @type {__VLS_StyleScopedClasses['logo-text']} */ ;
/** @type {__VLS_StyleScopedClasses['menu']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-item']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-header']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['submenu']} */ ;
/** @type {__VLS_StyleScopedClasses['submenu-item']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            slug: slug,
            t: t,
            activeMenu: activeMenu,
            activeSubItem: activeSubItem,
            isMobileMenuOpen: isMobileMenuOpen,
            toggleMobileMenu: toggleMobileMenu,
            menuItems: menuItems,
            handleMenuClick: handleMenuClick,
            handleSubItemClick: handleSubItemClick,
            isMenuExpanded: isMenuExpanded,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
