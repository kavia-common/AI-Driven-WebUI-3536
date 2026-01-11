import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQA } from '../../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const __VLS_props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['ip-section']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wan-interface" },
    'data-testid': (__VLS_ctx.qa('wan-interface-container')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-title" },
    'data-testid': (__VLS_ctx.qa('wan-interface-title')),
});
(__VLS_ctx.t('wan.interface'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card-content" },
    'data-testid': (__VLS_ctx.qa('wan-interface-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "info-grid" },
    'data-testid': (__VLS_ctx.qa('wan-interface-basic-grid')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "info-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-label" },
    'data-testid': (__VLS_ctx.qa('wan-interface-name-label')),
});
(__VLS_ctx.t('wan.name'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-value" },
    'data-testid': (__VLS_ctx.qa('wan-interface-name-value')),
});
(__VLS_ctx.interface.Name);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "info-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-label" },
    'data-testid': (__VLS_ctx.qa('wan-interface-mac-label')),
});
(__VLS_ctx.t('wan.macAddress'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-value" },
    'data-testid': (__VLS_ctx.qa('wan-interface-mac-value')),
});
(__VLS_ctx.interface.MACAddress);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "info-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-label" },
    'data-testid': (__VLS_ctx.qa('wan-interface-speed-label')),
});
(__VLS_ctx.t('wan.speed'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-value" },
    'data-testid': (__VLS_ctx.qa('wan-interface-speed-value')),
});
(__VLS_ctx.interface.Speed);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "info-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-label" },
    'data-testid': (__VLS_ctx.qa('wan-interface-duplex-label')),
});
(__VLS_ctx.t('wan.duplex'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "info-value" },
    'data-testid': (__VLS_ctx.qa('wan-interface-duplex-value')),
});
(__VLS_ctx.interface.Duplex);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "ip-section" },
    'data-testid': (__VLS_ctx.qa('wan-interface-ipv4-section')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
    ...{ class: "subsection-title" },
    'data-testid': (__VLS_ctx.qa('wan-interface-ipv4-title')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "table-container" },
    'data-testid': (__VLS_ctx.qa('wan-interface-ipv4-table-container')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
    'data-testid': (__VLS_ctx.qa('wan-interface-ipv4-table')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('wan-interface-ipv4-header-mode')),
});
(__VLS_ctx.t('wan.mode'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('wan-interface-ipv4-header-address')),
});
(__VLS_ctx.t('wan.address'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('wan-interface-ipv4-header-gateway')),
});
(__VLS_ctx.t('wan.gateway'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('wan-interface-ipv4-header-dns')),
});
(__VLS_ctx.t('wan.dnsServer'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('wan-interface-ipv4-header-subnet')),
});
(__VLS_ctx.t('wan.subnetMask'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
    'data-testid': (__VLS_ctx.qa('wan-interface-ipv4-header-status')),
});
(__VLS_ctx.t('wan.status'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
for (const [ip, ipIndex] of __VLS_getVForSourceType((__VLS_ctx.interface.ipv4))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
        key: (ip.IPv4Address),
        'data-testid': (__VLS_ctx.qa(`wan-interface-ipv4-row-${ipIndex}`)),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`wan-interface-ipv4-mode-${ipIndex}`)),
    });
    (ip.IPv4Mode);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`wan-interface-ipv4-address-${ipIndex}`)),
    });
    (ip.IPv4Address);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`wan-interface-ipv4-gateway-${ipIndex}`)),
    });
    (ip.Gateway);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`wan-interface-ipv4-dns-${ipIndex}`)),
    });
    (ip.DNSServer);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`wan-interface-ipv4-subnet-${ipIndex}`)),
    });
    (ip.SubnetMask);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        'data-testid': (__VLS_ctx.qa(`wan-interface-ipv4-status-${ipIndex}`)),
    });
    (ip.Status);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mobile-cards" },
    'data-testid': (__VLS_ctx.qa('wan-interface-ipv4-mobile')),
});
for (const [ip, ipIndex] of __VLS_getVForSourceType((__VLS_ctx.interface.ipv4))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-card" },
        key: (ip.IPv4Address),
        'data-testid': (__VLS_ctx.qa(`wan-interface-ipv4-card-${ipIndex}`)),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-label" },
        'data-testid': (__VLS_ctx.qa(`wan-interface-ipv4-card-mode-label-${ipIndex}`)),
    });
    (__VLS_ctx.t('wan.mode'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-value" },
        'data-testid': (__VLS_ctx.qa(`wan-interface-ipv4-card-mode-value-${ipIndex}`)),
    });
    (ip.IPv4Mode);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-label" },
        'data-testid': (__VLS_ctx.qa(`wan-interface-ipv4-card-address-label-${ipIndex}`)),
    });
    (__VLS_ctx.t('wan.address'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-value" },
        'data-testid': (__VLS_ctx.qa(`wan-interface-ipv4-card-address-value-${ipIndex}`)),
    });
    (ip.IPv4Address);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-label" },
        'data-testid': (__VLS_ctx.qa(`wan-interface-ipv4-card-gateway-label-${ipIndex}`)),
    });
    (__VLS_ctx.t('wan.gateway'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-value" },
        'data-testid': (__VLS_ctx.qa(`wan-interface-ipv4-card-gateway-value-${ipIndex}`)),
    });
    (ip.Gateway);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-label" },
        'data-testid': (__VLS_ctx.qa(`wan-interface-ipv4-card-dns-label-${ipIndex}`)),
    });
    (__VLS_ctx.t('wan.dnsServer'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-value" },
        'data-testid': (__VLS_ctx.qa(`wan-interface-ipv4-card-dns-value-${ipIndex}`)),
    });
    (ip.DNSServer);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-label" },
        'data-testid': (__VLS_ctx.qa(`wan-interface-ipv4-card-subnet-label-${ipIndex}`)),
    });
    (__VLS_ctx.t('wan.subnetMask'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-value" },
        'data-testid': (__VLS_ctx.qa(`wan-interface-ipv4-card-subnet-value-${ipIndex}`)),
    });
    (ip.SubnetMask);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-label" },
        'data-testid': (__VLS_ctx.qa(`wan-interface-ipv4-card-status-label-${ipIndex}`)),
    });
    (__VLS_ctx.t('wan.status'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "card-value" },
        'data-testid': (__VLS_ctx.qa(`wan-interface-ipv4-card-status-value-${ipIndex}`)),
    });
    (ip.Status);
}
if (__VLS_ctx.interface.ipv6.length > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "ip-section" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
        ...{ class: "subsection-title" },
        'data-testid': (__VLS_ctx.qa('wan-interface-ipv6-title')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-container" },
        'data-testid': (__VLS_ctx.qa('wan-interface-ipv6-table-container')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
        'data-testid': (__VLS_ctx.qa('wan-interface-ipv6-table')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('wan-interface-ipv6-header-type')),
    });
    (__VLS_ctx.t('wan.type'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('wan-interface-ipv6-header-address')),
    });
    (__VLS_ctx.t('wan.address'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('wan-interface-ipv6-header-prefix')),
    });
    (__VLS_ctx.t('wan.prefix'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('wan-interface-ipv6-header-gateway')),
    });
    (__VLS_ctx.t('wan.gateway'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('wan-interface-ipv6-header-dns')),
    });
    (__VLS_ctx.t('wan.dnsServer'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('wan-interface-ipv6-header-status')),
    });
    (__VLS_ctx.t('wan.status'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [ip, ipIndex] of __VLS_getVForSourceType((__VLS_ctx.interface.ipv6))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: (ip.IPv6Type),
            'data-testid': (__VLS_ctx.qa(`wan-interface-ipv6-row-${ipIndex}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`wan-interface-ipv6-type-${ipIndex}`)),
        });
        (ip.IPv6Type);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`wan-interface-ipv6-address-${ipIndex}`)),
        });
        (ip.IPv6Address || '-');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`wan-interface-ipv6-prefix-${ipIndex}`)),
        });
        (ip.Prefix || '-');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`wan-interface-ipv6-gateway-${ipIndex}`)),
        });
        (ip.Gateway || '-');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`wan-interface-ipv6-dns-${ipIndex}`)),
        });
        (ip.DNSServer || '-');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`wan-interface-ipv6-status-${ipIndex}`)),
        });
        (ip.Status);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mobile-cards" },
        'data-testid': (__VLS_ctx.qa('wan-interface-ipv6-mobile')),
    });
    for (const [ip, ipIndex] of __VLS_getVForSourceType((__VLS_ctx.interface.ipv6))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "table-card" },
            key: (ip.IPv6Type),
            'data-testid': (__VLS_ctx.qa(`wan-interface-ipv6-card-${ipIndex}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wan-interface-ipv6-card-type-label-${ipIndex}`)),
        });
        (__VLS_ctx.t('wan.type'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wan-interface-ipv6-card-type-value-${ipIndex}`)),
        });
        (ip.IPv6Type);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wan-interface-ipv6-card-address-label-${ipIndex}`)),
        });
        (__VLS_ctx.t('wan.address'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wan-interface-ipv6-card-address-value-${ipIndex}`)),
        });
        (ip.IPv6Address || '-');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wan-interface-ipv6-card-prefix-label-${ipIndex}`)),
        });
        (__VLS_ctx.t('wan.prefix'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wan-interface-ipv6-card-prefix-value-${ipIndex}`)),
        });
        (ip.Prefix || '-');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wan-interface-ipv6-card-gateway-label-${ipIndex}`)),
        });
        (__VLS_ctx.t('wan.gateway'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wan-interface-ipv6-card-gateway-value-${ipIndex}`)),
        });
        (ip.Gateway || '-');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wan-interface-ipv6-card-dns-label-${ipIndex}`)),
        });
        (__VLS_ctx.t('wan.dnsServer'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wan-interface-ipv6-card-dns-value-${ipIndex}`)),
        });
        (ip.DNSServer || '-');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wan-interface-ipv6-card-status-label-${ipIndex}`)),
        });
        (__VLS_ctx.t('wan.status'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wan-interface-ipv6-card-status-value-${ipIndex}`)),
        });
        (ip.Status);
    }
}
/** @type {__VLS_StyleScopedClasses['wan-interface']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['info-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['info-row']} */ ;
/** @type {__VLS_StyleScopedClasses['info-label']} */ ;
/** @type {__VLS_StyleScopedClasses['info-value']} */ ;
/** @type {__VLS_StyleScopedClasses['ip-section']} */ ;
/** @type {__VLS_StyleScopedClasses['subsection-title']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
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
/** @type {__VLS_StyleScopedClasses['ip-section']} */ ;
/** @type {__VLS_StyleScopedClasses['subsection-title']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
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
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
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
