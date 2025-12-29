import { ref, onMounted, computed } from 'vue';
import { getTR471Config, runTR471Test } from '../../../services/api/tr471';
import BaseButton from '../../../components/common/BaseButton.vue';
import BaseInput from '../../../components/common/BaseInput.vue';
import BaseSelect from '../../../components/common/BaseSelect.vue';
import BaseCheckbox from '../../../components/common/BaseCheckbox.vue';
import BaseSpinner from '../../../components/common/BaseSpinner.vue';
import LineChart from '../../../components/LineChart.vue';
const loading = ref(false);
const showAdvanced = ref(false);
const config = ref(null);
const testTypes = ref({
    upload: false,
    download: false
});
const uploadResult = ref(null);
const downloadResult = ref(null);
const isRunning = ref(false);
onMounted(async () => {
    loading.value = true;
    try {
        const response = await getTR471Config();
        config.value = response.TR471;
    }
    catch (error) {
        console.error('Failed to load TR471 config:', error);
    }
    finally {
        loading.value = false;
    }
});
const canRunTest = computed(() => {
    return testTypes.value.upload || testTypes.value.download;
});
const toggleAdvanced = () => {
    showAdvanced.value = !showAdvanced.value;
};
const runTest = async () => {
    if (!canRunTest.value || !config.value)
        return;
    isRunning.value = true;
    uploadResult.value = null;
    downloadResult.value = null;
    try {
        if (testTypes.value.upload) {
            const uploadConfig = {
                ...config.value,
                Role: 'Sender'
            };
            delete uploadConfig.DiagnosticsState;
            delete uploadConfig.MaxIPLayerCapacity;
            delete uploadConfig.LossRatioSummary;
            delete uploadConfig.RTTRangeSummary;
            delete uploadConfig.PDVRangeSummary;
            delete uploadConfig.ListUDPPayloadContent;
            delete uploadConfig.ListTestType;
            delete uploadConfig.ListProtocolVersion;
            delete uploadConfig.ListInterface;
            delete uploadConfig.ListRateAdjAlgorithm;
            delete uploadConfig.IncrementalResult;
            const response = await runTR471Test(uploadConfig);
            uploadResult.value = {
                MaxIPLayerCapacity: response.TR471.MaxIPLayerCapacity || '0',
                LossRatioSummary: response.TR471.LossRatioSummary || '0',
                RTTRangeSummary: response.TR471.RTTRangeSummary || '0',
                PDVRangeSummary: response.TR471.PDVRangeSummary || '0',
                IncrementalResult: response.TR471.IncrementalResult || []
            };
        }
        if (testTypes.value.download) {
            const downloadConfig = {
                ...config.value,
                Role: 'Receiver'
            };
            delete downloadConfig.DiagnosticsState;
            delete downloadConfig.MaxIPLayerCapacity;
            delete downloadConfig.LossRatioSummary;
            delete downloadConfig.RTTRangeSummary;
            delete downloadConfig.PDVRangeSummary;
            delete downloadConfig.ListUDPPayloadContent;
            delete downloadConfig.ListTestType;
            delete downloadConfig.ListProtocolVersion;
            delete downloadConfig.ListInterface;
            delete downloadConfig.ListRateAdjAlgorithm;
            delete downloadConfig.IncrementalResult;
            const response = await runTR471Test(downloadConfig);
            downloadResult.value = {
                MaxIPLayerCapacity: response.TR471.MaxIPLayerCapacity || '0',
                LossRatioSummary: response.TR471.LossRatioSummary || '0',
                RTTRangeSummary: response.TR471.RTTRangeSummary || '0',
                PDVRangeSummary: response.TR471.PDVRangeSummary || '0',
                IncrementalResult: response.TR471.IncrementalResult || []
            };
        }
    }
    catch (error) {
        console.error('TR471 test failed:', error);
    }
    finally {
        isRunning.value = false;
    }
};
const getCombinedChartData = (field) => {
    const datasets = [];
    if (uploadResult.value && uploadResult.value.IncrementalResult) {
        const uploadData = uploadResult.value.IncrementalResult.map(r => parseFloat(r[field]));
        datasets.push({
            label: `Upload ${field}`,
            data: uploadData,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            tension: 0.4
        });
    }
    if (downloadResult.value && downloadResult.value.IncrementalResult) {
        const downloadData = downloadResult.value.IncrementalResult.map(r => parseFloat(r[field]));
        datasets.push({
            label: `Download ${field}`,
            data: downloadData,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4
        });
    }
    const maxLength = Math.max(uploadResult.value?.IncrementalResult?.length || 0, downloadResult.value?.IncrementalResult?.length || 0);
    return {
        labels: Array.from({ length: maxLength }, (_, i) => (i + 1).toString()),
        datasets
    };
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['checkbox-label']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['test-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-row']} */ ;
/** @type {__VLS_StyleScopedClasses['charts-grid']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "page-title" },
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-container" },
    });
    /** @type {[typeof BaseSpinner, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(BaseSpinner, new BaseSpinner({}));
    const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
else if (__VLS_ctx.config) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "status-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "panel-section" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-grid" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-field" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "form-label" },
    });
    /** @type {[typeof BaseInput, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
        modelValue: (__VLS_ctx.config.Server),
    }));
    const __VLS_4 = __VLS_3({
        modelValue: (__VLS_ctx.config.Server),
    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-field" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "form-label" },
    });
    /** @type {[typeof BaseInput, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
        modelValue: (__VLS_ctx.config.Port),
        type: "number",
    }));
    const __VLS_7 = __VLS_6({
        modelValue: (__VLS_ctx.config.Port),
        type: "number",
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "advanced-toggle" },
    });
    /** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
        ...{ 'onClick': {} },
        variant: "secondary",
        fullWidth: (true),
    }));
    const __VLS_10 = __VLS_9({
        ...{ 'onClick': {} },
        variant: "secondary",
        fullWidth: (true),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    let __VLS_12;
    let __VLS_13;
    let __VLS_14;
    const __VLS_15 = {
        onClick: (__VLS_ctx.toggleAdvanced)
    };
    __VLS_11.slots.default;
    (__VLS_ctx.showAdvanced ? 'Hide Advanced Config' : 'Show Advanced Config');
    var __VLS_11;
    if (__VLS_ctx.showAdvanced) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "advanced-config" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-grid" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-label" },
        });
        /** @type {[typeof BaseInput, ]} */ ;
        // @ts-ignore
        const __VLS_16 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
            modelValue: (__VLS_ctx.config.MTU),
            type: "number",
        }));
        const __VLS_17 = __VLS_16({
            modelValue: (__VLS_ctx.config.MTU),
            type: "number",
        }, ...__VLS_functionalComponentArgsRest(__VLS_16));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-label" },
        });
        /** @type {[typeof BaseInput, ]} */ ;
        // @ts-ignore
        const __VLS_19 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
            modelValue: (__VLS_ctx.config.DSCP),
            type: "number",
        }));
        const __VLS_20 = __VLS_19({
            modelValue: (__VLS_ctx.config.DSCP),
            type: "number",
        }, ...__VLS_functionalComponentArgsRest(__VLS_19));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-label" },
        });
        /** @type {[typeof BaseSelect, ]} */ ;
        // @ts-ignore
        const __VLS_22 = __VLS_asFunctionalComponent(BaseSelect, new BaseSelect({
            modelValue: (__VLS_ctx.config.ProtocolVersion),
            options: (__VLS_ctx.config.ListProtocolVersion || []),
        }));
        const __VLS_23 = __VLS_22({
            modelValue: (__VLS_ctx.config.ProtocolVersion),
            options: (__VLS_ctx.config.ListProtocolVersion || []),
        }, ...__VLS_functionalComponentArgsRest(__VLS_22));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-label" },
        });
        /** @type {[typeof BaseSelect, ]} */ ;
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(BaseSelect, new BaseSelect({
            modelValue: (__VLS_ctx.config.Interface),
            options: (__VLS_ctx.config.ListInterface || []),
        }));
        const __VLS_26 = __VLS_25({
            modelValue: (__VLS_ctx.config.Interface),
            options: (__VLS_ctx.config.ListInterface || []),
        }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-label" },
        });
        /** @type {[typeof BaseSelect, ]} */ ;
        // @ts-ignore
        const __VLS_28 = __VLS_asFunctionalComponent(BaseSelect, new BaseSelect({
            modelValue: (__VLS_ctx.config.RateAdjAlgorithm),
            options: (__VLS_ctx.config.ListRateAdjAlgorithm || []),
        }));
        const __VLS_29 = __VLS_28({
            modelValue: (__VLS_ctx.config.RateAdjAlgorithm),
            options: (__VLS_ctx.config.ListRateAdjAlgorithm || []),
        }, ...__VLS_functionalComponentArgsRest(__VLS_28));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field checkbox-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "checkbox-label" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            ...{ onChange: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!(__VLS_ctx.config))
                        return;
                    if (!(__VLS_ctx.showAdvanced))
                        return;
                    __VLS_ctx.config.JumboFramesPermitted = $event.target.checked ? 1 : 0;
                } },
            type: "checkbox",
            checked: (__VLS_ctx.config.JumboFramesPermitted === 1),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field checkbox-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "checkbox-label" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            ...{ onChange: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!(__VLS_ctx.config))
                        return;
                    if (!(__VLS_ctx.showAdvanced))
                        return;
                    __VLS_ctx.config.LocalInterfaceRateIncluded = $event.target.checked ? 1 : 0;
                } },
            type: "checkbox",
            checked: (__VLS_ctx.config.LocalInterfaceRateIncluded === 1),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field checkbox-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "checkbox-label" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            ...{ onChange: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!(__VLS_ctx.config))
                        return;
                    if (!(__VLS_ctx.showAdvanced))
                        return;
                    __VLS_ctx.config.IPDVEnable = $event.target.checked ? 1 : 0;
                } },
            type: "checkbox",
            checked: (__VLS_ctx.config.IPDVEnable === 1),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-label" },
        });
        /** @type {[typeof BaseInput, ]} */ ;
        // @ts-ignore
        const __VLS_31 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
            modelValue: (__VLS_ctx.config.FlowCount),
            type: "number",
        }));
        const __VLS_32 = __VLS_31({
            modelValue: (__VLS_ctx.config.FlowCount),
            type: "number",
        }, ...__VLS_functionalComponentArgsRest(__VLS_31));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-label" },
        });
        /** @type {[typeof BaseInput, ]} */ ;
        // @ts-ignore
        const __VLS_34 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
            modelValue: (__VLS_ctx.config.MaximumFlows),
            type: "number",
        }));
        const __VLS_35 = __VLS_34({
            modelValue: (__VLS_ctx.config.MaximumFlows),
            type: "number",
        }, ...__VLS_functionalComponentArgsRest(__VLS_34));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-label" },
        });
        /** @type {[typeof BaseInput, ]} */ ;
        // @ts-ignore
        const __VLS_37 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
            modelValue: (__VLS_ctx.config.EthernetPriority),
            type: "number",
        }));
        const __VLS_38 = __VLS_37({
            modelValue: (__VLS_ctx.config.EthernetPriority),
            type: "number",
        }, ...__VLS_functionalComponentArgsRest(__VLS_37));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-label" },
        });
        /** @type {[typeof BaseSelect, ]} */ ;
        // @ts-ignore
        const __VLS_40 = __VLS_asFunctionalComponent(BaseSelect, new BaseSelect({
            modelValue: (__VLS_ctx.config.UDPPayloadContent),
            options: (__VLS_ctx.config.ListUDPPayloadContent || []),
        }));
        const __VLS_41 = __VLS_40({
            modelValue: (__VLS_ctx.config.UDPPayloadContent),
            options: (__VLS_ctx.config.ListUDPPayloadContent || []),
        }, ...__VLS_functionalComponentArgsRest(__VLS_40));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-label" },
        });
        /** @type {[typeof BaseInput, ]} */ ;
        // @ts-ignore
        const __VLS_43 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
            modelValue: (__VLS_ctx.config.MaximumTestBandwidth),
            type: "number",
        }));
        const __VLS_44 = __VLS_43({
            modelValue: (__VLS_ctx.config.MaximumTestBandwidth),
            type: "number",
        }, ...__VLS_functionalComponentArgsRest(__VLS_43));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-label" },
        });
        /** @type {[typeof BaseInput, ]} */ ;
        // @ts-ignore
        const __VLS_46 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
            modelValue: (__VLS_ctx.config.StartSendingRate),
            type: "number",
        }));
        const __VLS_47 = __VLS_46({
            modelValue: (__VLS_ctx.config.StartSendingRate),
            type: "number",
        }, ...__VLS_functionalComponentArgsRest(__VLS_46));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-label" },
        });
        /** @type {[typeof BaseInput, ]} */ ;
        // @ts-ignore
        const __VLS_49 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
            modelValue: (__VLS_ctx.config.StartSendingRateIndex),
            type: "number",
        }));
        const __VLS_50 = __VLS_49({
            modelValue: (__VLS_ctx.config.StartSendingRateIndex),
            type: "number",
        }, ...__VLS_functionalComponentArgsRest(__VLS_49));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-label" },
        });
        /** @type {[typeof BaseInput, ]} */ ;
        // @ts-ignore
        const __VLS_52 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
            modelValue: (__VLS_ctx.config.NumberTestSubIntervals),
            type: "number",
        }));
        const __VLS_53 = __VLS_52({
            modelValue: (__VLS_ctx.config.NumberTestSubIntervals),
            type: "number",
        }, ...__VLS_functionalComponentArgsRest(__VLS_52));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-label" },
        });
        /** @type {[typeof BaseInput, ]} */ ;
        // @ts-ignore
        const __VLS_55 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
            modelValue: (__VLS_ctx.config.NumberFirstModeTestSubIntervals),
            type: "number",
        }));
        const __VLS_56 = __VLS_55({
            modelValue: (__VLS_ctx.config.NumberFirstModeTestSubIntervals),
            type: "number",
        }, ...__VLS_functionalComponentArgsRest(__VLS_55));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-label" },
        });
        /** @type {[typeof BaseInput, ]} */ ;
        // @ts-ignore
        const __VLS_58 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
            modelValue: (__VLS_ctx.config.TestSubInterval),
            type: "number",
        }));
        const __VLS_59 = __VLS_58({
            modelValue: (__VLS_ctx.config.TestSubInterval),
            type: "number",
        }, ...__VLS_functionalComponentArgsRest(__VLS_58));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-label" },
        });
        /** @type {[typeof BaseInput, ]} */ ;
        // @ts-ignore
        const __VLS_61 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
            modelValue: (__VLS_ctx.config.StatusFeedbackInterval),
            type: "number",
        }));
        const __VLS_62 = __VLS_61({
            modelValue: (__VLS_ctx.config.StatusFeedbackInterval),
            type: "number",
        }, ...__VLS_functionalComponentArgsRest(__VLS_61));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-label" },
        });
        /** @type {[typeof BaseInput, ]} */ ;
        // @ts-ignore
        const __VLS_64 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
            modelValue: (__VLS_ctx.config.RetryThresh),
            type: "number",
        }));
        const __VLS_65 = __VLS_64({
            modelValue: (__VLS_ctx.config.RetryThresh),
            type: "number",
        }, ...__VLS_functionalComponentArgsRest(__VLS_64));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-label" },
        });
        /** @type {[typeof BaseSelect, ]} */ ;
        // @ts-ignore
        const __VLS_67 = __VLS_asFunctionalComponent(BaseSelect, new BaseSelect({
            modelValue: (__VLS_ctx.config.TestType),
            options: (__VLS_ctx.config.ListTestType || []),
        }));
        const __VLS_68 = __VLS_67({
            modelValue: (__VLS_ctx.config.TestType),
            options: (__VLS_ctx.config.ListTestType || []),
        }, ...__VLS_functionalComponentArgsRest(__VLS_67));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-label" },
        });
        /** @type {[typeof BaseInput, ]} */ ;
        // @ts-ignore
        const __VLS_70 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
            modelValue: (__VLS_ctx.config.SeqErrThresh),
            type: "number",
        }));
        const __VLS_71 = __VLS_70({
            modelValue: (__VLS_ctx.config.SeqErrThresh),
            type: "number",
        }, ...__VLS_functionalComponentArgsRest(__VLS_70));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field checkbox-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "checkbox-label" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            ...{ onChange: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!(__VLS_ctx.config))
                        return;
                    if (!(__VLS_ctx.showAdvanced))
                        return;
                    __VLS_ctx.config.ReordDupIgnoreEnable = $event.target.checked ? 1 : 0;
                } },
            type: "checkbox",
            checked: (__VLS_ctx.config.ReordDupIgnoreEnable === 1),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-label" },
        });
        /** @type {[typeof BaseInput, ]} */ ;
        // @ts-ignore
        const __VLS_73 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
            modelValue: (__VLS_ctx.config.LowerThresh),
            type: "number",
        }));
        const __VLS_74 = __VLS_73({
            modelValue: (__VLS_ctx.config.LowerThresh),
            type: "number",
        }, ...__VLS_functionalComponentArgsRest(__VLS_73));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-label" },
        });
        /** @type {[typeof BaseInput, ]} */ ;
        // @ts-ignore
        const __VLS_76 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
            modelValue: (__VLS_ctx.config.UpperThresh),
            type: "number",
        }));
        const __VLS_77 = __VLS_76({
            modelValue: (__VLS_ctx.config.UpperThresh),
            type: "number",
        }, ...__VLS_functionalComponentArgsRest(__VLS_76));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-label" },
        });
        /** @type {[typeof BaseInput, ]} */ ;
        // @ts-ignore
        const __VLS_79 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
            modelValue: (__VLS_ctx.config.SlowAdjThresh),
            type: "number",
        }));
        const __VLS_80 = __VLS_79({
            modelValue: (__VLS_ctx.config.SlowAdjThresh),
            type: "number",
        }, ...__VLS_functionalComponentArgsRest(__VLS_79));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-label" },
        });
        /** @type {[typeof BaseInput, ]} */ ;
        // @ts-ignore
        const __VLS_82 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
            modelValue: (__VLS_ctx.config.HighSpeedDelta),
            type: "number",
        }));
        const __VLS_83 = __VLS_82({
            modelValue: (__VLS_ctx.config.HighSpeedDelta),
            type: "number",
        }, ...__VLS_functionalComponentArgsRest(__VLS_82));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field checkbox-group" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "checkbox-label" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            ...{ onChange: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!(__VLS_ctx.config))
                        return;
                    if (!(__VLS_ctx.showAdvanced))
                        return;
                    __VLS_ctx.config.AuthenticationEnabled = $event.target.checked ? 1 : 0;
                } },
            type: "checkbox",
            checked: (__VLS_ctx.config.AuthenticationEnabled === 1),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "form-field" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: "form-label" },
        });
        /** @type {[typeof BaseInput, ]} */ ;
        // @ts-ignore
        const __VLS_85 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
            modelValue: (__VLS_ctx.config.AuthenticationCode),
            type: "password",
            placeholder: "Enter authentication code",
        }));
        const __VLS_86 = __VLS_85({
            modelValue: (__VLS_ctx.config.AuthenticationCode),
            type: "password",
            placeholder: "Enter authentication code",
        }, ...__VLS_functionalComponentArgsRest(__VLS_85));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "test-controls" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "test-type-section" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "section-title" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "checkbox-row" },
    });
    /** @type {[typeof BaseCheckbox, ]} */ ;
    // @ts-ignore
    const __VLS_88 = __VLS_asFunctionalComponent(BaseCheckbox, new BaseCheckbox({
        modelValue: (__VLS_ctx.testTypes.upload),
        label: "Upload",
    }));
    const __VLS_89 = __VLS_88({
        modelValue: (__VLS_ctx.testTypes.upload),
        label: "Upload",
    }, ...__VLS_functionalComponentArgsRest(__VLS_88));
    /** @type {[typeof BaseCheckbox, ]} */ ;
    // @ts-ignore
    const __VLS_91 = __VLS_asFunctionalComponent(BaseCheckbox, new BaseCheckbox({
        modelValue: (__VLS_ctx.testTypes.download),
        label: "Download",
    }));
    const __VLS_92 = __VLS_91({
        modelValue: (__VLS_ctx.testTypes.download),
        label: "Download",
    }, ...__VLS_functionalComponentArgsRest(__VLS_91));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "run-test-button" },
    });
    /** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
    // @ts-ignore
    const __VLS_94 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
        ...{ 'onClick': {} },
        disabled: (!__VLS_ctx.canRunTest || __VLS_ctx.isRunning),
        variant: "primary",
    }));
    const __VLS_95 = __VLS_94({
        ...{ 'onClick': {} },
        disabled: (!__VLS_ctx.canRunTest || __VLS_ctx.isRunning),
        variant: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_94));
    let __VLS_97;
    let __VLS_98;
    let __VLS_99;
    const __VLS_100 = {
        onClick: (__VLS_ctx.runTest)
    };
    __VLS_96.slots.default;
    (__VLS_ctx.isRunning ? 'Running Test...' : 'Run Speed Test');
    var __VLS_96;
    if (__VLS_ctx.uploadResult || __VLS_ctx.downloadResult) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "results-section" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
            ...{ class: "section-title" },
        });
        if (__VLS_ctx.uploadResult) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "result-block" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
                ...{ class: "result-title" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "result-grid" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "result-item" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "result-label" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "result-value" },
            });
            (parseFloat(__VLS_ctx.uploadResult.MaxIPLayerCapacity).toFixed(6));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "result-item" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "result-label" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "result-value" },
            });
            (parseFloat(__VLS_ctx.uploadResult.LossRatioSummary).toFixed(6));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "result-item" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "result-label" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "result-value" },
            });
            (parseFloat(__VLS_ctx.uploadResult.RTTRangeSummary).toFixed(6));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "result-item" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "result-label" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "result-value" },
            });
            (parseFloat(__VLS_ctx.uploadResult.PDVRangeSummary).toFixed(6));
        }
        if (__VLS_ctx.downloadResult) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "result-block" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
                ...{ class: "result-title" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "result-grid" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "result-item" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "result-label" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "result-value" },
            });
            (parseFloat(__VLS_ctx.downloadResult.MaxIPLayerCapacity).toFixed(6));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "result-item" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "result-label" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "result-value" },
            });
            (parseFloat(__VLS_ctx.downloadResult.LossRatioSummary).toFixed(6));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "result-item" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "result-label" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "result-value" },
            });
            (parseFloat(__VLS_ctx.downloadResult.RTTRangeSummary).toFixed(6));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "result-item" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "result-label" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "result-value" },
            });
            (parseFloat(__VLS_ctx.downloadResult.PDVRangeSummary).toFixed(6));
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "charts-grid" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "chart-item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
            ...{ class: "chart-title" },
        });
        /** @type {[typeof LineChart, ]} */ ;
        // @ts-ignore
        const __VLS_101 = __VLS_asFunctionalComponent(LineChart, new LineChart({
            chartData: (__VLS_ctx.getCombinedChartData('IPLayerCapacity')),
        }));
        const __VLS_102 = __VLS_101({
            chartData: (__VLS_ctx.getCombinedChartData('IPLayerCapacity')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_101));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "chart-item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
            ...{ class: "chart-title" },
        });
        /** @type {[typeof LineChart, ]} */ ;
        // @ts-ignore
        const __VLS_104 = __VLS_asFunctionalComponent(LineChart, new LineChart({
            chartData: (__VLS_ctx.getCombinedChartData('RTTRange')),
        }));
        const __VLS_105 = __VLS_104({
            chartData: (__VLS_ctx.getCombinedChartData('RTTRange')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_104));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "chart-item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
            ...{ class: "chart-title" },
        });
        /** @type {[typeof LineChart, ]} */ ;
        // @ts-ignore
        const __VLS_107 = __VLS_asFunctionalComponent(LineChart, new LineChart({
            chartData: (__VLS_ctx.getCombinedChartData('PDVRange')),
        }));
        const __VLS_108 = __VLS_107({
            chartData: (__VLS_ctx.getCombinedChartData('PDVRange')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_107));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "chart-item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
            ...{ class: "chart-title" },
        });
        /** @type {[typeof LineChart, ]} */ ;
        // @ts-ignore
        const __VLS_110 = __VLS_asFunctionalComponent(LineChart, new LineChart({
            chartData: (__VLS_ctx.getCombinedChartData('LossRatio')),
        }));
        const __VLS_111 = __VLS_110({
            chartData: (__VLS_ctx.getCombinedChartData('LossRatio')),
        }, ...__VLS_functionalComponentArgsRest(__VLS_110));
    }
}
/** @type {__VLS_StyleScopedClasses['page-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-container']} */ ;
/** @type {__VLS_StyleScopedClasses['status-content']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-section']} */ ;
/** @type {__VLS_StyleScopedClasses['form-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['advanced-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['advanced-config']} */ ;
/** @type {__VLS_StyleScopedClasses['form-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-group']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-group']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-group']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-group']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-group']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-field']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['test-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['test-type-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox-row']} */ ;
/** @type {__VLS_StyleScopedClasses['run-test-button']} */ ;
/** @type {__VLS_StyleScopedClasses['results-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['result-block']} */ ;
/** @type {__VLS_StyleScopedClasses['result-title']} */ ;
/** @type {__VLS_StyleScopedClasses['result-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['result-item']} */ ;
/** @type {__VLS_StyleScopedClasses['result-label']} */ ;
/** @type {__VLS_StyleScopedClasses['result-value']} */ ;
/** @type {__VLS_StyleScopedClasses['result-item']} */ ;
/** @type {__VLS_StyleScopedClasses['result-label']} */ ;
/** @type {__VLS_StyleScopedClasses['result-value']} */ ;
/** @type {__VLS_StyleScopedClasses['result-item']} */ ;
/** @type {__VLS_StyleScopedClasses['result-label']} */ ;
/** @type {__VLS_StyleScopedClasses['result-value']} */ ;
/** @type {__VLS_StyleScopedClasses['result-item']} */ ;
/** @type {__VLS_StyleScopedClasses['result-label']} */ ;
/** @type {__VLS_StyleScopedClasses['result-value']} */ ;
/** @type {__VLS_StyleScopedClasses['result-block']} */ ;
/** @type {__VLS_StyleScopedClasses['result-title']} */ ;
/** @type {__VLS_StyleScopedClasses['result-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['result-item']} */ ;
/** @type {__VLS_StyleScopedClasses['result-label']} */ ;
/** @type {__VLS_StyleScopedClasses['result-value']} */ ;
/** @type {__VLS_StyleScopedClasses['result-item']} */ ;
/** @type {__VLS_StyleScopedClasses['result-label']} */ ;
/** @type {__VLS_StyleScopedClasses['result-value']} */ ;
/** @type {__VLS_StyleScopedClasses['result-item']} */ ;
/** @type {__VLS_StyleScopedClasses['result-label']} */ ;
/** @type {__VLS_StyleScopedClasses['result-value']} */ ;
/** @type {__VLS_StyleScopedClasses['result-item']} */ ;
/** @type {__VLS_StyleScopedClasses['result-label']} */ ;
/** @type {__VLS_StyleScopedClasses['result-value']} */ ;
/** @type {__VLS_StyleScopedClasses['charts-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-item']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-title']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-item']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-title']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-item']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-title']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-item']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-title']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            BaseButton: BaseButton,
            BaseInput: BaseInput,
            BaseSelect: BaseSelect,
            BaseCheckbox: BaseCheckbox,
            BaseSpinner: BaseSpinner,
            LineChart: LineChart,
            loading: loading,
            showAdvanced: showAdvanced,
            config: config,
            testTypes: testTypes,
            uploadResult: uploadResult,
            downloadResult: downloadResult,
            isRunning: isRunning,
            canRunTest: canRunTest,
            toggleAdvanced: toggleAdvanced,
            runTest: runTest,
            getCombinedChartData: getCombinedChartData,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
