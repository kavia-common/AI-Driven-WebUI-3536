import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getWifiNeighbors, scanWifiNeighbors } from '../../services/api';
import { useQA } from '../../utils/qa';
const { isQAMode, qa, slug } = useQA();
const { t } = useI18n();
const wifiNeighborData = ref(null);
const neighborResults = ref({
    '2': [],
    '5': [],
    '6': []
});
const loading = ref({
    '2': false,
    '5': false,
    '6': false
});
const errors = ref({
    '2': null,
    '5': null,
    '6': null
});
const fetchWifiNeighbors = async () => {
    try {
        wifiNeighborData.value = await getWifiNeighbors();
    }
    catch (error) {
        console.error('Error fetching WiFi neighbors:', error);
    }
};
const handleScan = async (band) => {
    if (loading.value[band])
        return;
    loading.value[band] = true;
    errors.value[band] = null;
    try {
        const response = await scanWifiNeighbors(band);
        if ('NOK' in response.WifiNeighbor) {
            errors.value[band] = String(response.WifiNeighbor.NOK);
            neighborResults.value[band] = [];
        }
        else {
            errors.value[band] = null;
            neighborResults.value[band] = response.WifiNeighbor;
        }
    }
    catch (error) {
        console.error(`Error scanning ${band}G band:`, error);
        errors.value[band] = error instanceof Error ? error.message : 'Unknown error occurred';
        neighborResults.value[band] = [];
    }
    finally {
        loading.value[band] = false;
    }
};
onMounted(fetchWifiNeighbors);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['scan-button-container']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
    'data-testid': (__VLS_ctx.qa('wifi-neighbor-title')),
});
(__VLS_ctx.t('wifiNeighbor.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "status-content" },
    'data-testid': (__VLS_ctx.qa('wifi-neighbor-content')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-section" },
    'data-testid': (__VLS_ctx.qa('wifi-neighbor-2g-section')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-title" },
    'data-testid': (__VLS_ctx.qa('wifi-neighbor-2g-title')),
});
(__VLS_ctx.t('wifiNeighbor.wifiNeighbor'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card-content" },
});
if (__VLS_ctx.errors['2']) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-message" },
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-2g-error')),
    });
    (__VLS_ctx.errors['2']);
}
if (__VLS_ctx.neighborResults['2'].length > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-container" },
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-2g-table')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-header-ssid')),
    });
    (__VLS_ctx.t('wifiNeighbor.ssid'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-header-bssid')),
    });
    (__VLS_ctx.t('wifiNeighbor.bssid'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-header-channel')),
    });
    (__VLS_ctx.t('wifiNeighbor.channel'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-header-signal')),
    });
    (__VLS_ctx.t('wifiNeighbor.signal'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-header-security')),
    });
    (__VLS_ctx.t('wifiNeighbor.security'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-header-wireless-mode')),
    });
    (__VLS_ctx.t('wifiNeighbor.wirelessMode'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [neighbor, neighborIndex] of __VLS_getVForSourceType((__VLS_ctx.neighborResults['2']))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: (neighbor.BSSID),
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-2g-row-${neighborIndex}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-2g-ssid-${neighborIndex}`)),
        });
        (neighbor.SSID);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-2g-bssid-${neighborIndex}`)),
        });
        (neighbor.BSSID);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-2g-channel-${neighborIndex}`)),
        });
        (neighbor.Channel);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-2g-signal-${neighborIndex}`)),
        });
        (neighbor.Signal);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-2g-security-${neighborIndex}`)),
        });
        (neighbor.Security);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-2g-wireless-mode-${neighborIndex}`)),
        });
        (neighbor.WirelessMode);
    }
}
if (__VLS_ctx.neighborResults['2'].length > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mobile-cards" },
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-2g-mobile')),
    });
    for (const [neighbor, neighborIndex] of __VLS_getVForSourceType((__VLS_ctx.neighborResults['2']))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "table-card" },
            key: (neighbor.BSSID),
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-2g-card-${neighborIndex}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-2g-card-ssid-label-${neighborIndex}`)),
        });
        (__VLS_ctx.t('wifiNeighbor.ssid'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-2g-card-ssid-value-${neighborIndex}`)),
        });
        (neighbor.SSID);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-2g-card-bssid-label-${neighborIndex}`)),
        });
        (__VLS_ctx.t('wifiNeighbor.bssid'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-2g-card-bssid-value-${neighborIndex}`)),
        });
        (neighbor.BSSID);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-2g-card-channel-label-${neighborIndex}`)),
        });
        (__VLS_ctx.t('wifiNeighbor.channel'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-2g-card-channel-value-${neighborIndex}`)),
        });
        (neighbor.Channel);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-2g-card-signal-label-${neighborIndex}`)),
        });
        (__VLS_ctx.t('wifiNeighbor.signal'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-2g-card-signal-value-${neighborIndex}`)),
        });
        (neighbor.Signal);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-2g-card-security-label-${neighborIndex}`)),
        });
        (__VLS_ctx.t('wifiNeighbor.security'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-2g-card-security-value-${neighborIndex}`)),
        });
        (neighbor.Security);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-2g-card-wireless-mode-label-${neighborIndex}`)),
        });
        (__VLS_ctx.t('wifiNeighbor.wirelessMode'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-2g-card-wireless-mode-value-${neighborIndex}`)),
        });
        (neighbor.WirelessMode);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "scan-button-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.handleScan('2');
        } },
    ...{ class: "btn btn-primary" },
    'data-testid': (__VLS_ctx.qa('wifi-neighbor-2g-scan-button')),
    disabled: (__VLS_ctx.loading['2'] || !__VLS_ctx.wifiNeighborData?.WifiNeighbor.Enable2g),
});
(__VLS_ctx.loading['2'] ? __VLS_ctx.t('wifiNeighbor.scanning') : __VLS_ctx.t('wifiNeighbor.scan'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-section" },
    'data-testid': (__VLS_ctx.qa('wifi-neighbor-5g-section')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-title" },
    'data-testid': (__VLS_ctx.qa('wifi-neighbor-5g-title')),
});
(__VLS_ctx.t('wifiNeighbor.wifiNeighbor'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card-content" },
});
if (__VLS_ctx.errors['5']) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-message" },
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-5g-error')),
    });
    (__VLS_ctx.errors['5']);
}
if (__VLS_ctx.neighborResults['5'].length > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-container" },
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-5g-table')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-header-ssid')),
    });
    (__VLS_ctx.t('wifiNeighbor.ssid'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-header-bssid')),
    });
    (__VLS_ctx.t('wifiNeighbor.bssid'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-header-channel')),
    });
    (__VLS_ctx.t('wifiNeighbor.channel'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-header-signal')),
    });
    (__VLS_ctx.t('wifiNeighbor.signal'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-header-security')),
    });
    (__VLS_ctx.t('wifiNeighbor.security'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-header-wireless-mode')),
    });
    (__VLS_ctx.t('wifiNeighbor.wirelessMode'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [neighbor, neighborIndex] of __VLS_getVForSourceType((__VLS_ctx.neighborResults['5']))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: (neighbor.BSSID),
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-5g-row-${neighborIndex}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-5g-ssid-${neighborIndex}`)),
        });
        (neighbor.SSID);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-5g-bssid-${neighborIndex}`)),
        });
        (neighbor.BSSID);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-5g-channel-${neighborIndex}`)),
        });
        (neighbor.Channel);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-5g-signal-${neighborIndex}`)),
        });
        (neighbor.Signal);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-5g-security-${neighborIndex}`)),
        });
        (neighbor.Security);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-5g-wireless-mode-${neighborIndex}`)),
        });
        (neighbor.WirelessMode);
    }
}
if (__VLS_ctx.neighborResults['5'].length > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mobile-cards" },
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-5g-mobile')),
    });
    for (const [neighbor, neighborIndex] of __VLS_getVForSourceType((__VLS_ctx.neighborResults['5']))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "table-card" },
            key: (neighbor.BSSID),
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-5g-card-${neighborIndex}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-5g-card-ssid-label-${neighborIndex}`)),
        });
        (__VLS_ctx.t('wifiNeighbor.ssid'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-5g-card-ssid-value-${neighborIndex}`)),
        });
        (neighbor.SSID);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-5g-card-bssid-label-${neighborIndex}`)),
        });
        (__VLS_ctx.t('wifiNeighbor.bssid'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-5g-card-bssid-value-${neighborIndex}`)),
        });
        (neighbor.BSSID);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-5g-card-channel-label-${neighborIndex}`)),
        });
        (__VLS_ctx.t('wifiNeighbor.channel'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-5g-card-channel-value-${neighborIndex}`)),
        });
        (neighbor.Channel);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-5g-card-signal-label-${neighborIndex}`)),
        });
        (__VLS_ctx.t('wifiNeighbor.signal'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-5g-card-signal-value-${neighborIndex}`)),
        });
        (neighbor.Signal);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-5g-card-security-label-${neighborIndex}`)),
        });
        (__VLS_ctx.t('wifiNeighbor.security'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-5g-card-security-value-${neighborIndex}`)),
        });
        (neighbor.Security);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-5g-card-wireless-mode-label-${neighborIndex}`)),
        });
        (__VLS_ctx.t('wifiNeighbor.wirelessMode'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-5g-card-wireless-mode-value-${neighborIndex}`)),
        });
        (neighbor.WirelessMode);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "scan-button-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.handleScan('5');
        } },
    ...{ class: "btn btn-primary" },
    'data-testid': (__VLS_ctx.qa('wifi-neighbor-5g-scan-button')),
    disabled: (__VLS_ctx.loading['5'] || !__VLS_ctx.wifiNeighborData?.WifiNeighbor.Enable5g),
});
(__VLS_ctx.loading['5'] ? __VLS_ctx.t('wifiNeighbor.scanning') : __VLS_ctx.t('wifiNeighbor.scan'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-section" },
    'data-testid': (__VLS_ctx.qa('wifi-neighbor-6g-section')),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-title" },
    'data-testid': (__VLS_ctx.qa('wifi-neighbor-6g-title')),
});
(__VLS_ctx.t('wifiNeighbor.wifiNeighbor'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card-content" },
});
if (__VLS_ctx.errors['6']) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-message" },
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-6g-error')),
    });
    (__VLS_ctx.errors['6']);
}
if (__VLS_ctx.neighborResults['6'].length > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-container" },
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-6g-table')),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-header-ssid')),
    });
    (__VLS_ctx.t('wifiNeighbor.ssid'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-header-bssid')),
    });
    (__VLS_ctx.t('wifiNeighbor.bssid'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-header-channel')),
    });
    (__VLS_ctx.t('wifiNeighbor.channel'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-header-signal')),
    });
    (__VLS_ctx.t('wifiNeighbor.signal'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-header-security')),
    });
    (__VLS_ctx.t('wifiNeighbor.security'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-header-wireless-mode')),
    });
    (__VLS_ctx.t('wifiNeighbor.wirelessMode'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [neighbor, neighborIndex] of __VLS_getVForSourceType((__VLS_ctx.neighborResults['6']))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: (neighbor.BSSID),
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-6g-row-${neighborIndex}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-6g-ssid-${neighborIndex}`)),
        });
        (neighbor.SSID);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-6g-bssid-${neighborIndex}`)),
        });
        (neighbor.BSSID);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-6g-channel-${neighborIndex}`)),
        });
        (neighbor.Channel);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-6g-signal-${neighborIndex}`)),
        });
        (neighbor.Signal);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-6g-security-${neighborIndex}`)),
        });
        (neighbor.Security);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-6g-wireless-mode-${neighborIndex}`)),
        });
        (neighbor.WirelessMode);
    }
}
if (__VLS_ctx.neighborResults['6'].length > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mobile-cards" },
        'data-testid': (__VLS_ctx.qa('wifi-neighbor-6g-mobile')),
    });
    for (const [neighbor, neighborIndex] of __VLS_getVForSourceType((__VLS_ctx.neighborResults['6']))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "table-card" },
            key: (neighbor.BSSID),
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-6g-card-${neighborIndex}`)),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-6g-card-ssid-label-${neighborIndex}`)),
        });
        (__VLS_ctx.t('wifiNeighbor.ssid'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-6g-card-ssid-value-${neighborIndex}`)),
        });
        (neighbor.SSID);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-6g-card-bssid-label-${neighborIndex}`)),
        });
        (__VLS_ctx.t('wifiNeighbor.bssid'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-6g-card-bssid-value-${neighborIndex}`)),
        });
        (neighbor.BSSID);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-6g-card-channel-label-${neighborIndex}`)),
        });
        (__VLS_ctx.t('wifiNeighbor.channel'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-6g-card-channel-value-${neighborIndex}`)),
        });
        (neighbor.Channel);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-6g-card-signal-label-${neighborIndex}`)),
        });
        (__VLS_ctx.t('wifiNeighbor.signal'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-6g-card-signal-value-${neighborIndex}`)),
        });
        (neighbor.Signal);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-6g-card-security-label-${neighborIndex}`)),
        });
        (__VLS_ctx.t('wifiNeighbor.security'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-6g-card-security-value-${neighborIndex}`)),
        });
        (neighbor.Security);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-row" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-label" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-6g-card-wireless-mode-label-${neighborIndex}`)),
        });
        (__VLS_ctx.t('wifiNeighbor.wirelessMode'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "card-value" },
            'data-testid': (__VLS_ctx.qa(`wifi-neighbor-6g-card-wireless-mode-value-${neighborIndex}`)),
        });
        (neighbor.WirelessMode);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "scan-button-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.handleScan('6');
        } },
    ...{ class: "btn btn-primary" },
    'data-testid': (__VLS_ctx.qa('wifi-neighbor-6g-scan-button')),
    disabled: (__VLS_ctx.loading['6'] || !__VLS_ctx.wifiNeighborData?.WifiNeighbor.Enable6g),
});
(__VLS_ctx.loading['6'] ? __VLS_ctx.t('wifiNeighbor.scanning') : __VLS_ctx.t('wifiNeighbor.scan'));
/** @type {__VLS_StyleScopedClasses['page-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
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
/** @type {__VLS_StyleScopedClasses['scan-button-container']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
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
/** @type {__VLS_StyleScopedClasses['scan-button-container']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
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
/** @type {__VLS_StyleScopedClasses['scan-button-container']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            qa: qa,
            t: t,
            wifiNeighborData: wifiNeighborData,
            neighborResults: neighborResults,
            loading: loading,
            errors: errors,
            handleScan: handleScan,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
