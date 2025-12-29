import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getWlanStatus } from '../../services/api';
import WlanBandInfo from '../../components/status/WlanBandInfo.vue';
import { useQA } from '../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const wlanData = ref(null);
const bandOrder = ["2.4GHz", "5GHz", "6GHz"];
const fetchWlanStatus = async () => {
    try {
        const response = await getWlanStatus();
        response.StatusWlan.sort((a, b) => {
            const aIndex = bandOrder.indexOf(a.Band);
            const bIndex = bandOrder.indexOf(b.Band);
            return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
        });
        wlanData.value = response;
    }
    catch (error) {
        console.error('Error fetching WLAN status:', error);
    }
};
onMounted(() => {
    fetchWlanStatus();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
    'data-testid': (__VLS_ctx.qa('wlan-title')),
});
(__VLS_ctx.t('wlan.title'));
if (__VLS_ctx.wlanData) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "status-content" },
        'data-testid': (__VLS_ctx.qa('wlan-content')),
    });
    for (const [band] of __VLS_getVForSourceType((__VLS_ctx.wlanData.StatusWlan))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (band.Band),
            ...{ class: "panel-section" },
            'data-testid': (__VLS_ctx.qa(`wlan-band-${__VLS_ctx.slug(band.Band)}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "section-title" },
            'data-testid': (__VLS_ctx.qa(`wlan-band-title-${__VLS_ctx.slug(band.Band)}`)),
        });
        (band.Band);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-content" },
        });
        /** @type {[typeof WlanBandInfo, ]} */ ;
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(WlanBandInfo, new WlanBandInfo({
            band: (band),
        }));
        const __VLS_1 = __VLS_0({
            band: (band),
        }, ...__VLS_functionalComponentArgsRest(__VLS_0));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "table-container" },
            'data-testid': (__VLS_ctx.qa(`wlan-band-table-${__VLS_ctx.slug(band.Band)}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('wlan-header-name')),
        });
        (__VLS_ctx.t('wlan.name'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('wlan-header-alias')),
        });
        (__VLS_ctx.t('wlan.alias'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('wlan-header-status')),
        });
        (__VLS_ctx.t('wlan.status'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('wlan-header-ssid')),
        });
        (__VLS_ctx.t('wlan.ssid'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('wlan-header-authentication')),
        });
        (__VLS_ctx.t('wlan.authentication'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('wlan-header-encryption')),
        });
        (__VLS_ctx.t('wlan.encryption'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('wlan-header-password')),
        });
        (__VLS_ctx.t('wlan.password'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
            'data-testid': (__VLS_ctx.qa('wlan-header-bssid')),
        });
        (__VLS_ctx.t('wlan.bssid'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
        for (const [iface, ifaceIndex] of __VLS_getVForSourceType((band.Interface))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
                key: (iface.Name),
                'data-testid': (__VLS_ctx.qa(`wlan-interface-row-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`wlan-interface-name-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            (iface.Name);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`wlan-interface-alias-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            (iface.Alias);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`wlan-interface-status-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            (iface.Enable ? __VLS_ctx.t('wlan.enable') : __VLS_ctx.t('wlan.disable'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`wlan-interface-ssid-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            (iface.SSID);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`wlan-interface-authentication-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            (iface.Authentication);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`wlan-interface-encryption-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            (iface.Encryption);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`wlan-interface-password-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            (iface.Password);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                'data-testid': (__VLS_ctx.qa(`wlan-interface-bssid-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            (iface.BSSID);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "mobile-cards" },
            'data-testid': (__VLS_ctx.qa(`wlan-band-mobile-${__VLS_ctx.slug(band.Band)}`)),
        });
        for (const [iface, ifaceIndex] of __VLS_getVForSourceType((band.Interface))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "table-card" },
                key: (iface.Name),
                'data-testid': (__VLS_ctx.qa(`wlan-interface-card-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`wlan-interface-card-name-label-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            (__VLS_ctx.t('wlan.name'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`wlan-interface-card-name-value-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            (iface.Name);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`wlan-interface-card-alias-label-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            (__VLS_ctx.t('wlan.alias'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`wlan-interface-card-alias-value-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            (iface.Alias);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`wlan-interface-card-status-label-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            (__VLS_ctx.t('wlan.status'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`wlan-interface-card-status-value-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            (iface.Enable ? __VLS_ctx.t('wlan.enable') : __VLS_ctx.t('wlan.disable'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`wlan-interface-card-ssid-label-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            (__VLS_ctx.t('wlan.ssid'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`wlan-interface-card-ssid-value-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            (iface.SSID);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`wlan-interface-card-authentication-label-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            (__VLS_ctx.t('wlan.authentication'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`wlan-interface-card-authentication-value-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            (iface.Authentication);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`wlan-interface-card-encryption-label-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            (__VLS_ctx.t('wlan.encryption'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`wlan-interface-card-encryption-value-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            (iface.Encryption);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`wlan-interface-card-password-label-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            (__VLS_ctx.t('wlan.password'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`wlan-interface-card-password-value-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            (iface.Password);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "card-row" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-label" },
                'data-testid': (__VLS_ctx.qa(`wlan-interface-card-bssid-label-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            (__VLS_ctx.t('wlan.bssid'));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "card-value" },
                'data-testid': (__VLS_ctx.qa(`wlan-interface-card-bssid-value-${__VLS_ctx.slug(band.Band)}-${ifaceIndex}`)),
            });
            (iface.BSSID);
        }
    }
}
/** @type {__VLS_StyleScopedClasses['page-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
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
            WlanBandInfo: WlanBandInfo,
            qa: qa,
            slug: slug,
            t: t,
            wlanData: wlanData,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
