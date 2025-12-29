import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getLanStatus } from '../../services/api';
import { useQA } from '../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const lanData = ref(null);
const loading = ref(false);
const error = ref(null);
const fetchLanStatus = async () => {
    loading.value = true;
    error.value = null;
    try {
        lanData.value = await getLanStatus();
    }
    catch (err) {
        console.error('Error fetching LAN status:', err);
        error.value = 'Failed to fetch LAN status';
    }
    finally {
        loading.value = false;
    }
};
onMounted(() => {
    fetchLanStatus();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['ip-section']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
});
(__VLS_ctx.t('lan.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-state" },
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
    });
    (__VLS_ctx.error);
}
else if (__VLS_ctx.lanData) {
    for (const [iface] of __VLS_getVForSourceType((__VLS_ctx.lanData.StatusLan))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (iface.Name),
            ...{ class: "panel-section" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-title" },
        });
        (iface.Name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-content" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "info-grid" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "info-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "info-label" },
            'data-testid': (__VLS_ctx.qa(`lan-mac-label-${__VLS_ctx.slug(iface.Name)}`)),
        });
        (__VLS_ctx.t('lan.macAddress'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "info-value" },
            'data-testid': (__VLS_ctx.qa(`lan-mac-value-${__VLS_ctx.slug(iface.Name)}`)),
        });
        (iface.MACAddress);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "info-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "info-label" },
            'data-testid': (__VLS_ctx.qa(`lan-mtu-label-${__VLS_ctx.slug(iface.Name)}`)),
        });
        (__VLS_ctx.t('lan.mtu'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "info-value" },
            'data-testid': (__VLS_ctx.qa(`lan-mtu-value-${__VLS_ctx.slug(iface.Name)}`)),
        });
        (iface.MTU);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "ip-section" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
            ...{ class: "subsection-title" },
            'data-testid': (__VLS_ctx.qa(`lan-ipv4-title-${__VLS_ctx.slug(iface.Name)}`)),
        });
        (__VLS_ctx.t('lan.ipv4'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "table-container" },
            'data-testid': (__VLS_ctx.qa(`lan-ipv4-table-${__VLS_ctx.slug(iface.Name)}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('lan-ipv4-header-name')),
        });
        (__VLS_ctx.t('lan.name'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('lan-ipv4-header-ip')),
        });
        (__VLS_ctx.t('lan.ipAddress'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('lan-ipv4-header-netmask')),
        });
        (__VLS_ctx.t('lan.netmask'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('lan-ipv4-header-status')),
        });
        (__VLS_ctx.t('lan.status'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
        for (const [ip, ipIndex] of __VLS_getVForSourceType((iface.ipv4))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
                key: (ip.Name),
                'data-testid': (__VLS_ctx.qa(`lan-ipv4-row-${__VLS_ctx.slug(iface.Name)}-${ipIndex}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`lan-ipv4-name-${__VLS_ctx.slug(iface.Name)}-${ipIndex}`)),
            });
            (ip.Name);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`lan-ipv4-address-${__VLS_ctx.slug(iface.Name)}-${ipIndex}`)),
            });
            (ip.IPv4Address);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`lan-ipv4-netmask-${__VLS_ctx.slug(iface.Name)}-${ipIndex}`)),
            });
            (ip.IPv4Netmask);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`lan-ipv4-status-${__VLS_ctx.slug(iface.Name)}-${ipIndex}`)),
            });
            (ip.Status);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "mobile-cards" },
            'data-testid': (__VLS_ctx.qa(`lan-ipv4-mobile-${__VLS_ctx.slug(iface.Name)}`)),
        });
        for (const [ip, ipIndex] of __VLS_getVForSourceType((iface.ipv4))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "table-card" },
                key: (ip.Name),
                'data-testid': (__VLS_ctx.qa(`lan-ipv4-card-${__VLS_ctx.slug(iface.Name)}-${ipIndex}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`lan-ipv4-card-name-label-${__VLS_ctx.slug(iface.Name)}-${ipIndex}`)),
            });
            (__VLS_ctx.t('lan.name'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`lan-ipv4-card-name-value-${__VLS_ctx.slug(iface.Name)}-${ipIndex}`)),
            });
            (ip.Name);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`lan-ipv4-card-ip-label-${__VLS_ctx.slug(iface.Name)}-${ipIndex}`)),
            });
            (__VLS_ctx.t('lan.ipAddress'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`lan-ipv4-card-ip-value-${__VLS_ctx.slug(iface.Name)}-${ipIndex}`)),
            });
            (ip.IPv4Address);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`lan-ipv4-card-netmask-label-${__VLS_ctx.slug(iface.Name)}-${ipIndex}`)),
            });
            (__VLS_ctx.t('lan.netmask'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`lan-ipv4-card-netmask-value-${__VLS_ctx.slug(iface.Name)}-${ipIndex}`)),
            });
            (ip.IPv4Netmask);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`lan-ipv4-card-status-label-${__VLS_ctx.slug(iface.Name)}-${ipIndex}`)),
            });
            (__VLS_ctx.t('lan.status'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`lan-ipv4-card-status-value-${__VLS_ctx.slug(iface.Name)}-${ipIndex}`)),
            });
            (ip.Status);
        }
        if (iface.ipv6.length > 0) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "ip-section" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
                ...{ class: "subsection-title" },
                'data-testid': (__VLS_ctx.qa(`lan-ipv6-title-${__VLS_ctx.slug(iface.Name)}`)),
            });
            (__VLS_ctx.t('lan.ipv6'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "table-container" },
                'data-testid': (__VLS_ctx.qa(`lan-ipv6-table-${__VLS_ctx.slug(iface.Name)}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
            __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
                'data-testid': (__VLS_ctx.qa('lan-ipv6-header-name')),
            });
            (__VLS_ctx.t('lan.name'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
                'data-testid': (__VLS_ctx.qa('lan-ipv6-header-ip')),
            });
            (__VLS_ctx.t('lan.ipAddress'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
                'data-testid': (__VLS_ctx.qa('lan-ipv6-header-status')),
            });
            (__VLS_ctx.t('lan.status'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
            for (const [ip, ipIndex] of __VLS_getVForSourceType((iface.ipv6))) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
                    key: (ip.Name),
                    'data-testid': (__VLS_ctx.qa(`lan-ipv6-row-${__VLS_ctx.slug(iface.Name)}-${ipIndex}`)),
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                    'data-testid': (__VLS_ctx.qa(`lan-ipv6-name-${__VLS_ctx.slug(iface.Name)}-${ipIndex}`)),
                });
                (ip.Name);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                    'data-testid': (__VLS_ctx.qa(`lan-ipv6-address-${__VLS_ctx.slug(iface.Name)}-${ipIndex}`)),
                });
                (ip.IPv6Address);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                    'data-testid': (__VLS_ctx.qa(`lan-ipv6-status-${__VLS_ctx.slug(iface.Name)}-${ipIndex}`)),
                });
                (ip.Status);
            }
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "mobile-cards" },
                'data-testid': (__VLS_ctx.qa(`lan-ipv6-mobile-${__VLS_ctx.slug(iface.Name)}`)),
            });
            for (const [ip, ipIndex] of __VLS_getVForSourceType((iface.ipv6))) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "table-card" },
                    key: (ip.Name),
                    'data-testid': (__VLS_ctx.qa(`lan-ipv6-card-${__VLS_ctx.slug(iface.Name)}-${ipIndex}`)),
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "card-row" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-label" },
                    'data-testid': (__VLS_ctx.qa(`lan-ipv6-card-name-label-${__VLS_ctx.slug(iface.Name)}-${ipIndex}`)),
                });
                (__VLS_ctx.t('lan.name'));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-value" },
                    'data-testid': (__VLS_ctx.qa(`lan-ipv6-card-name-value-${__VLS_ctx.slug(iface.Name)}-${ipIndex}`)),
                });
                (ip.Name);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "card-row" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-label" },
                    'data-testid': (__VLS_ctx.qa(`lan-ipv6-card-ip-label-${__VLS_ctx.slug(iface.Name)}-${ipIndex}`)),
                });
                (__VLS_ctx.t('lan.ipAddress'));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-value" },
                    'data-testid': (__VLS_ctx.qa(`lan-ipv6-card-ip-value-${__VLS_ctx.slug(iface.Name)}-${ipIndex}`)),
                });
                (ip.IPv6Address);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "card-row" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-label" },
                    'data-testid': (__VLS_ctx.qa(`lan-ipv6-card-status-label-${__VLS_ctx.slug(iface.Name)}-${ipIndex}`)),
                });
                (__VLS_ctx.t('lan.status'));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: "card-value" },
                    'data-testid': (__VLS_ctx.qa(`lan-ipv6-card-status-value-${__VLS_ctx.slug(iface.Name)}-${ipIndex}`)),
                });
                (ip.Status);
            }
        }
    }
}
/** @type {__VLS_StyleScopedClasses['page-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['info-grid']} */ ;
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
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            slug: slug,
            t: t,
            lanData: lanData,
            loading: loading,
            error: error,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
