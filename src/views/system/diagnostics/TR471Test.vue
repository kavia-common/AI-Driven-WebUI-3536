<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { getTR471Config, runTR471Test } from '../../../services/api/tr471';
import type { TR471Config, TR471TestResult } from '../../../types/tr471';
import BaseButton from '../../../components/common/BaseButton.vue';
import BaseInput from '../../../components/common/BaseInput.vue';
import BaseSelect from '../../../components/common/BaseSelect.vue';
import BaseCheckbox from '../../../components/common/BaseCheckbox.vue';
import BaseSpinner from '../../../components/common/BaseSpinner.vue';
import LineChart from '../../../components/LineChart.vue';

const { t } = useI18n();

const loading = ref(false);
const showAdvanced = ref(false);
const config = ref<TR471Config | null>(null);
const testTypes = ref({
  upload: false,
  download: false
});

const uploadResult = ref<TR471TestResult | null>(null);
const downloadResult = ref<TR471TestResult | null>(null);
const isRunning = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    const response = await getTR471Config();
    config.value = response.TR471;
  } catch (error) {
    console.error(t('tr471.message_loadConfigFailed') + ':', error);
  } finally {
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
  if (!canRunTest.value || !config.value) return;

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
  } catch (error) {
    console.error(t('tr471.message_testFailed') + ':', error);
  } finally {
    isRunning.value = false;
  }
};

const getCombinedChartData = (field: 'IPLayerCapacity' | 'RTTRange' | 'PDVRange' | 'LossRatio') => {
  const datasets: any[] = [];

  if (uploadResult.value && uploadResult.value.IncrementalResult) {
    const uploadData = uploadResult.value.IncrementalResult.map(r => parseFloat(r[field]));
    datasets.push({
      label: `${t('tr471.test_upload')} ${field}`,
      data: uploadData,
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      tension: 0.4
    });
  }

  if (downloadResult.value && downloadResult.value.IncrementalResult) {
    const downloadData = downloadResult.value.IncrementalResult.map(r => parseFloat(r[field]));
    datasets.push({
      label: `${t('tr471.test_download')} ${field}`,
      data: downloadData,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.4
    });
  }

  const maxLength = Math.max(
    uploadResult.value?.IncrementalResult?.length || 0,
    downloadResult.value?.IncrementalResult?.length || 0
  );

  return {
    labels: Array.from({ length: maxLength }, (_, i) => (i + 1).toString()),
    datasets
  };
};
</script>

<template>
  <div class="page-container">
    <h1 class="page-title">{{ t('tr471.title') }}</h1>

    <div v-if="loading" class="loading-container">
      <BaseSpinner />
    </div>

    <div v-else-if="config" class="status-content">
      <div class="panel-section">
        <div class="form-grid">
          <div class="form-field">
            <label class="form-label">{{ t('tr471.connection_server') }}</label>
            <BaseInput v-model="config.Server" />
          </div>

          <div class="form-field">
            <label class="form-label">{{ t('tr471.connection_port') }}</label>
            <BaseInput v-model="config.Port" type="number" />
          </div>
        </div>

        <div class="advanced-toggle">
          <BaseButton
            @click="toggleAdvanced"
            variant="secondary"
            :fullWidth="true"
          >
            {{ showAdvanced ? t('tr471.advanced_toggleHide') : t('tr471.advanced_toggleShow') }}
          </BaseButton>
        </div>

        <div v-if="showAdvanced" class="advanced-config">
          <div class="form-grid">
            <div class="form-field">
              <label class="form-label">{{ t('tr471.connection_mtu') }}</label>
              <BaseInput v-model="config.MTU" type="number" />
            </div>

            <div class="form-field">
              <label class="form-label">{{ t('tr471.connection_dscp') }}</label>
              <BaseInput v-model="config.DSCP" type="number" />
            </div>

            <div class="form-field">
              <label class="form-label">{{ t('tr471.connection_protocolVersion') }}</label>
              <BaseSelect
                v-model="config.ProtocolVersion"
                :options="config.ListProtocolVersion || []"
              />
            </div>

            <div class="form-field">
              <label class="form-label">{{ t('tr471.connection_networkInterface') }}</label>
              <BaseSelect
                v-model="config.Interface"
                :options="config.ListInterface || []"
              />
            </div>

            <div class="form-field">
              <label class="form-label">{{ t('tr471.connection_algorithm') }}</label>
              <BaseSelect
                v-model="config.RateAdjAlgorithm"
                :options="config.ListRateAdjAlgorithm || []"
              />
            </div>

            <div class="form-field checkbox-group">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  :checked="config.JumboFramesPermitted === 1"
                  @change="config.JumboFramesPermitted = ($event.target as HTMLInputElement).checked ? 1 : 0"
                />
                <span>{{ t('tr471.connection_jumboFramesPermitted') }}</span>
              </label>
            </div>

            <div class="form-field checkbox-group">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  :checked="config.LocalInterfaceRateIncluded === 1"
                  @change="config.LocalInterfaceRateIncluded = ($event.target as HTMLInputElement).checked ? 1 : 0"
                />
                <span>{{ t('tr471.connection_interfaceRateIncluded') }}</span>
              </label>
            </div>

            <div class="form-field checkbox-group">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  :checked="config.IPDVEnable === 1"
                  @change="config.IPDVEnable = ($event.target as HTMLInputElement).checked ? 1 : 0"
                />
                <span>{{ t('tr471.connection_ipdvEnable') }}</span>
              </label>
            </div>

            <div class="form-field">
              <label class="form-label">{{ t('tr471.advanced_flowCount') }}</label>
              <BaseInput v-model="config.FlowCount" type="number" />
            </div>

            <div class="form-field">
              <label class="form-label">{{ t('tr471.advanced_maximumFlows') }}</label>
              <BaseInput v-model="config.MaximumFlows" type="number" />
            </div>

            <div class="form-field">
              <label class="form-label">{{ t('tr471.connection_ethernetPriority') }}</label>
              <BaseInput v-model="config.EthernetPriority" type="number" />
            </div>

            <div class="form-field">
              <label class="form-label">{{ t('tr471.connection_udpPayloadContent') }}</label>
              <BaseSelect
                v-model="config.UDPPayloadContent"
                :options="config.ListUDPPayloadContent || []"
              />
            </div>

            <div class="form-field">
              <label class="form-label">{{ t('tr471.advanced_maximumTestBandwidth') }}</label>
              <BaseInput v-model="config.MaximumTestBandwidth" type="number" />
            </div>

            <div class="form-field">
              <label class="form-label">{{ t('tr471.advanced_startSendingRate') }}</label>
              <BaseInput v-model="config.StartSendingRate" type="number" />
            </div>

            <div class="form-field">
              <label class="form-label">{{ t('tr471.advanced_startSendingRateIndex') }}</label>
              <BaseInput v-model="config.StartSendingRateIndex" type="number" />
            </div>

            <div class="form-field">
              <label class="form-label">{{ t('tr471.advanced_numberTestSubIntervals') }}</label>
              <BaseInput v-model="config.NumberTestSubIntervals" type="number" />
            </div>

            <div class="form-field">
              <label class="form-label">{{ t('tr471.advanced_numberFirstModeTestSubIntervals') }}</label>
              <BaseInput v-model="config.NumberFirstModeTestSubIntervals" type="number" />
            </div>

            <div class="form-field">
              <label class="form-label">{{ t('tr471.advanced_testSubInterval') }}</label>
              <BaseInput v-model="config.TestSubInterval" type="number" />
            </div>

            <div class="form-field">
              <label class="form-label">{{ t('tr471.advanced_statusFeedbackInterval') }}</label>
              <BaseInput v-model="config.StatusFeedbackInterval" type="number" />
            </div>

            <div class="form-field">
              <label class="form-label">{{ t('tr471.advanced_retryThresh') }}</label>
              <BaseInput v-model="config.RetryThresh" type="number" />
            </div>

            <div class="form-field">
              <label class="form-label">{{ t('tr471.advanced_testType') }}</label>
              <BaseSelect
                v-model="config.TestType"
                :options="config.ListTestType || []"
              />
            </div>

            <div class="form-field">
              <label class="form-label">{{ t('tr471.advanced_seqErrThresh') }}</label>
              <BaseInput v-model="config.SeqErrThresh" type="number" />
            </div>

            <div class="form-field checkbox-group">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  :checked="config.ReordDupIgnoreEnable === 1"
                  @change="config.ReordDupIgnoreEnable = ($event.target as HTMLInputElement).checked ? 1 : 0"
                />
                <span>{{ t('tr471.advanced_reordDupIgnoreEnable') }}</span>
              </label>
            </div>

            <div class="form-field">
              <label class="form-label">{{ t('tr471.advanced_lowerThresh') }}</label>
              <BaseInput v-model="config.LowerThresh" type="number" />
            </div>

            <div class="form-field">
              <label class="form-label">{{ t('tr471.advanced_upperThresh') }}</label>
              <BaseInput v-model="config.UpperThresh" type="number" />
            </div>

            <div class="form-field">
              <label class="form-label">{{ t('tr471.advanced_slowAdjThresh') }}</label>
              <BaseInput v-model="config.SlowAdjThresh" type="number" />
            </div>

            <div class="form-field">
              <label class="form-label">{{ t('tr471.advanced_highSpeedDelta') }}</label>
              <BaseInput v-model="config.HighSpeedDelta" type="number" />
            </div>

            <div class="form-field checkbox-group">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  :checked="config.AuthenticationEnabled === 1"
                  @change="config.AuthenticationEnabled = ($event.target as HTMLInputElement).checked ? 1 : 0"
                />
                <span>{{ t('tr471.connection_authenticationEnabled') }}</span>
              </label>
            </div>

            <div class="form-field">
              <label class="form-label">{{ t('tr471.connection_authenticationCode') }}</label>
              <BaseInput
                v-model="config.AuthenticationCode"
                type="password"
                :placeholder="t('tr471.connection_authenticationCode')"
              />
            </div>
          </div>
        </div>

        <div class="test-controls">
          <div class="test-type-section">
            <h3 class="section-title">{{ t('tr471.test_sectionTitle') }}</h3>
            <div class="checkbox-row">
              <BaseCheckbox
                v-model="testTypes.upload"
                :label="t('tr471.test_upload')"
              />
              <BaseCheckbox
                v-model="testTypes.download"
                :label="t('tr471.test_download')"
              />
            </div>
          </div>

          <div class="run-test-button">
            <BaseButton
              @click="runTest"
              :disabled="!canRunTest || isRunning"
              variant="primary"
            >
              {{ isRunning ? t('tr471.test_running') : t('tr471.test_run') }}
            </BaseButton>
          </div>
        </div>

        <div v-if="uploadResult || downloadResult" class="results-section">
          <h2 class="section-title">{{ t('tr471.results_title') }}</h2>

          <div v-if="uploadResult" class="result-block">
            <h3 class="result-title">{{ t('tr471.results_uploadTitle') }}</h3>
            <div class="result-grid">
              <div class="result-item">
                <span class="result-label">{{ t('tr471.results_label_ipLayerCapacity') }}:</span>
                <span class="result-value">{{ parseFloat(uploadResult.MaxIPLayerCapacity).toFixed(6) }}</span>
              </div>
              <div class="result-item">
                <span class="result-label">{{ t('tr471.results_label_lossRatio') }}:</span>
                <span class="result-value">{{ parseFloat(uploadResult.LossRatioSummary).toFixed(6) }}</span>
              </div>
              <div class="result-item">
                <span class="result-label">{{ t('tr471.results_label_rttRange') }}:</span>
                <span class="result-value">{{ parseFloat(uploadResult.RTTRangeSummary).toFixed(6) }}</span>
              </div>
              <div class="result-item">
                <span class="result-label">{{ t('tr471.results_label_pdvRange') }}:</span>
                <span class="result-value">{{ parseFloat(uploadResult.PDVRangeSummary).toFixed(6) }}</span>
              </div>
            </div>
          </div>

          <div v-if="downloadResult" class="result-block">
            <h3 class="result-title">{{ t('tr471.results_downloadTitle') }}</h3>
            <div class="result-grid">
              <div class="result-item">
                <span class="result-label">{{ t('tr471.results_label_ipLayerCapacity') }}:</span>
                <span class="result-value">{{ parseFloat(downloadResult.MaxIPLayerCapacity).toFixed(6) }}</span>
              </div>
              <div class="result-item">
                <span class="result-label">{{ t('tr471.results_label_lossRatio') }}:</span>
                <span class="result-value">{{ parseFloat(downloadResult.LossRatioSummary).toFixed(6) }}</span>
              </div>
              <div class="result-item">
                <span class="result-label">{{ t('tr471.results_label_rttRange') }}:</span>
                <span class="result-value">{{ parseFloat(downloadResult.RTTRangeSummary).toFixed(6) }}</span>
              </div>
              <div class="result-item">
                <span class="result-label">{{ t('tr471.results_label_pdvRange') }}:</span>
                <span class="result-value">{{ parseFloat(downloadResult.PDVRangeSummary).toFixed(6) }}</span>
              </div>
            </div>
          </div>

          <div class="charts-grid">
            <div class="chart-item">
              <h4 class="chart-title">{{ t('tr471.results_chart_ipLayerCapacity') }}</h4>
              <LineChart :chartData="getCombinedChartData('IPLayerCapacity')" />
            </div>
            <div class="chart-item">
              <h4 class="chart-title">{{ t('tr471.results_chart_roundTripTime') }}</h4>
              <LineChart :chartData="getCombinedChartData('RTTRange')" />
            </div>
            <div class="chart-item">
              <h4 class="chart-title">{{ t('tr471.results_chart_jitter') }}</h4>
              <LineChart :chartData="getCombinedChartData('PDVRange')" />
            </div>
            <div class="chart-item">
              <h4 class="chart-title">{{ t('tr471.results_chart_loss') }}</h4>
              <LineChart :chartData="getCombinedChartData('LossRatio')" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.panel-section {
    background-color: var(--bg-secondary);
    border-radius: 4px;
    box-shadow: var(--shadow-md);
    overflow: hidden;
    margin-bottom: 1.5rem;
    padding: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.checkbox-group {
  justify-content: center;
  padding-top: 1.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--text-primary);
}

.checkbox-label input[type="checkbox"] {
  cursor: pointer;
}

.checkbox-label span {
  user-select: none;
}

.advanced-toggle {
  margin: 1.5rem 0;
}

.advanced-config {
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.test-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin: 2rem 0;
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.test-type-section {
  flex: 1;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.checkbox-row {
  display: flex;
  gap: 2rem;
}

.run-test-button {
  flex-shrink: 0;
}

.results-section {
  margin-top: 2rem;
}

.result-block {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.result-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--bg-primary);
  border-radius: 4px;
  border: 1px solid var(--border-color);
}

.result-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.result-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.chart-item {
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.chart-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .test-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .checkbox-row {
    flex-direction: column;
    gap: 1rem;
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
