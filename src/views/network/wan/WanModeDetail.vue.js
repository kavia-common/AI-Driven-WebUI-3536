import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const __VLS_props = defineProps();
// Display mappings
const ipv4ModeDisplay = {
    'dhcp4': 'DHCP',
    'ppp4': 'PPPoE',
    'none': 'None',
    'static': 'Static',
    'dslite': 'DS-Lite',
    'link': 'Link'
};
const ipv6ModeDisplay = {
    'dhcp6': 'DHCP',
    'ppp6': 'PPPoE',
    'none': 'None',
    'static': 'Static',
    'link': 'Link'
};
const vlanTypeDisplay = {
    'untagged': 'Untagged',
    'vlan': 'VLAN',
    'atm': 'ATM'
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['status-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['wan-mode-detail']} */ ;
/** @type {__VLS_StyleScopedClasses['cards-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wan-mode-detail" },
    'data-testid': (__VLS_ctx.qa('wan-mode-detail-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-section" },
    'data-testid': (__VLS_ctx.qa('wan-mode-detail-panel')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-title" },
    'data-testid': (__VLS_ctx.qa('wan-mode-detail-title')),
});
(__VLS_ctx.mode.WANMode);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "cards-grid" },
    'data-testid': (__VLS_ctx.qa('wan-mode-detail-cards-grid')),
});
for (const [iface, ifaceIndex] of __VLS_getVForSourceType((__VLS_ctx.mode.Interfaces))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "interface-card" },
        key: (ifaceIndex),
        'data-testid': (__VLS_ctx.qa(`wan-mode-detail-interface-card-${ifaceIndex}`)),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-header" },
        'data-testid': (__VLS_ctx.qa(`wan-mode-detail-interface-header-${ifaceIndex}`)),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "title-with-status" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "status-dot" },
        'data-testid': (__VLS_ctx.qa(`wan-mode-detail-interface-status-dot-${ifaceIndex}`)),
        ...{ class: ({ active: __VLS_ctx.mode.Status === 'Enabled' }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "card-title" },
        'data-testid': (__VLS_ctx.qa(`wan-mode-detail-interface-title-${ifaceIndex}`)),
    });
    (ifaceIndex + 1);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-content" },
        'data-testid': (__VLS_ctx.qa(`wan-mode-detail-interface-content-${ifaceIndex}`)),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-label" },
        'data-testid': (__VLS_ctx.qa(`wan-mode-detail-interface-label-${ifaceIndex}`)),
    });
    (__VLS_ctx.t('wanManagement.interface'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-value" },
        'data-testid': (__VLS_ctx.qa(`wan-mode-detail-interface-value-${ifaceIndex}`)),
    });
    (iface.Interface);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-label" },
        'data-testid': (__VLS_ctx.qa(`wan-mode-detail-enable-sensing-label-${ifaceIndex}`)),
    });
    (__VLS_ctx.t('wanManagement.enableSensing'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-value" },
        'data-testid': (__VLS_ctx.qa(`wan-mode-detail-enable-sensing-value-${ifaceIndex}`)),
    });
    (__VLS_ctx.mode.EnableSensing ? 'True' : 'False');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-label" },
        'data-testid': (__VLS_ctx.qa(`wan-mode-detail-ipv4-dns-mode-label-${ifaceIndex}`)),
    });
    (__VLS_ctx.t('wanManagement.ipv4DnsMode'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-value" },
        'data-testid': (__VLS_ctx.qa(`wan-mode-detail-ipv4-dns-mode-value-${ifaceIndex}`)),
    });
    (__VLS_ctx.mode.DNSMode || 'None');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-label" },
        'data-testid': (__VLS_ctx.qa(`wan-mode-detail-ipv6-dns-mode-label-${ifaceIndex}`)),
    });
    (__VLS_ctx.t('wanManagement.ipv6DnsMode'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-value" },
        'data-testid': (__VLS_ctx.qa(`wan-mode-detail-ipv6-dns-mode-value-${ifaceIndex}`)),
    });
    (__VLS_ctx.mode.IPv6DNSMode || 'None');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-label" },
        'data-testid': (__VLS_ctx.qa(`wan-mode-detail-physical-type-label-${ifaceIndex}`)),
    });
    (__VLS_ctx.t('wanManagement.physicalType'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-value" },
        'data-testid': (__VLS_ctx.qa(`wan-mode-detail-physical-type-value-${ifaceIndex}`)),
    });
    (__VLS_ctx.mode.PhysicalType);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-label" },
        'data-testid': (__VLS_ctx.qa(`wan-mode-detail-status-label-${ifaceIndex}`)),
    });
    (__VLS_ctx.t('wanManagement.status'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-value" },
        'data-testid': (__VLS_ctx.qa(`wan-mode-detail-status-value-${ifaceIndex}`)),
    });
    (__VLS_ctx.mode.Status);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-label" },
        'data-testid': (__VLS_ctx.qa(`wan-mode-detail-ipv4-mode-label-${ifaceIndex}`)),
    });
    (__VLS_ctx.t('wanManagement.ipv4Mode'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-value" },
        'data-testid': (__VLS_ctx.qa(`wan-mode-detail-ipv4-mode-value-${ifaceIndex}`)),
    });
    (__VLS_ctx.ipv4ModeDisplay[iface.IPv4Mode]);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-label" },
        'data-testid': (__VLS_ctx.qa(`wan-mode-detail-ipv6-mode-label-${ifaceIndex}`)),
    });
    (__VLS_ctx.t('wanManagement.ipv6Mode'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-value" },
        'data-testid': (__VLS_ctx.qa(`wan-mode-detail-ipv6-mode-value-${ifaceIndex}`)),
    });
    (__VLS_ctx.ipv6ModeDisplay[iface.IPv6Mode]);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-label" },
        'data-testid': (__VLS_ctx.qa(`wan-mode-detail-vlan-type-label-${ifaceIndex}`)),
    });
    (__VLS_ctx.t('wanManagement.vlanType'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-value" },
        'data-testid': (__VLS_ctx.qa(`wan-mode-detail-vlan-type-value-${ifaceIndex}`)),
    });
    (__VLS_ctx.vlanTypeDisplay[iface.VLANType]);
    if (iface.VLANType !== 'untagged') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-vlan-id-row-${ifaceIndex}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-vlan-id-label-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.vlanId'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-vlan-id-value-${ifaceIndex}`)),
        });
        (iface.VLANID);
    }
    if (iface.VLANType !== 'untagged') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-vlan-priority-row-${ifaceIndex}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-vlan-priority-label-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.vlanPriority'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-vlan-priority-value-${ifaceIndex}`)),
        });
        (iface.VLANPriority);
    }
    if (iface.IPv4Mode === 'ppp4' || iface.IPv6Mode === 'ppp6') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-pppoe-username-row-${ifaceIndex}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-pppoe-username-label-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.pppoeUsername'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-pppoe-username-value-${ifaceIndex}`)),
        });
        (iface.PPPoEUserName);
    }
    if (iface.IPv4Mode === 'ppp4' || iface.IPv6Mode === 'ppp6') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-pppoe-password-row-${ifaceIndex}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-pppoe-password-label-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.pppoePassword'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-pppoe-password-value-${ifaceIndex}`)),
        });
        (iface.PPPoEPassword);
    }
    if (iface.IPv4Mode === 'static' && iface.StaticIPv4Address) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-divider" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-static-ipv4-divider-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.staticIpv4'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-static-ipv4-address-label-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.ipv4Address'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-static-ipv4-address-value-${ifaceIndex}`)),
        });
        (iface.StaticIPv4Address.IPv4Address);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-static-ipv4-router-label-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.defaultRouter'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-static-ipv4-router-value-${ifaceIndex}`)),
        });
        (iface.StaticIPv4Address.DefaultRouter);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-static-ipv4-subnet-label-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.subnetMask'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-static-ipv4-subnet-value-${ifaceIndex}`)),
        });
        (iface.StaticIPv4Address.SubnetMask);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-static-ipv4-dns-label-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.dnsServers'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-static-ipv4-dns-value-${ifaceIndex}`)),
        });
        (iface.StaticIPv4Address.DNSServers);
    }
    if (iface.IPv6Mode === 'static' && iface.StaticIPv6Address) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-divider" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-static-ipv6-divider-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.staticIpv6'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-static-ipv6-address-label-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.ipv6Address'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-static-ipv6-address-value-${ifaceIndex}`)),
        });
        (iface.StaticIPv6Address.IPv6Address);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-static-ipv6-router-label-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.defaultRouter'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-static-ipv6-router-value-${ifaceIndex}`)),
        });
        (iface.StaticIPv6Address.DefaultRouter);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-static-ipv6-prefix-label-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.prefixLength'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-static-ipv6-prefix-value-${ifaceIndex}`)),
        });
        (iface.StaticIPv6Address.PrefixLength);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-static-ipv6-dns-label-${ifaceIndex}`)),
        });
        (__VLS_ctx.t('wanManagement.dnsServers'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wan-mode-detail-static-ipv6-dns-value-${ifaceIndex}`)),
        });
        (iface.StaticIPv6Address.DNSServers);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "button-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.onBack) },
    ...{ class: "btn btn-primary" },
    'data-testid': (__VLS_ctx.qa('wan-mode-detail-back-button')),
});
(__VLS_ctx.t('mesh.back'));
/** @type {__VLS_StyleScopedClasses['wan-mode-detail']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['cards-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['interface-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['title-with-status']} */ ;
/** @type {__VLS_StyleScopedClasses['status-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['section-divider']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['section-divider']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['card-row']} */ ;
/** @type {__VLS_StyleScopedClasses['card-label']} */ ;
/** @type {__VLS_StyleScopedClasses['card-value']} */ ;
/** @type {__VLS_StyleScopedClasses['button-group']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
            ipv4ModeDisplay: ipv4ModeDisplay,
            ipv6ModeDisplay: ipv6ModeDisplay,
            vlanTypeDisplay: vlanTypeDisplay,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
