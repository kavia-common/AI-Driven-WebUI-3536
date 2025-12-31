<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import BlockingOverlay from '../../../components/BlockingOverlay.vue';
import BaseButton from '../../../components/common/BaseButton.vue';
import BaseCard from '../../../components/common/BaseCard.vue';
import BaseCheckbox from '../../../components/common/BaseCheckbox.vue';
import BaseInput from '../../../components/common/BaseInput.vue';
import BaseSelect from '../../../components/common/BaseSelect.vue';
import { useQA } from '../../../utils/qa';
import { getWlanBasicMulti, updateWlanBasicMulti } from '../../../services/api/wireless';
import type {
  WlanBasicMultiGetResponse,
  WlanBasicMultiPostRequest,
  WlanGroup,
  WlanGroupBandSetting,
  WlanGroupInterface
} from '../../../types/wlanBasicMulti';

const { t } = useI18n();
const router = useRouter();
const { qa, slug } = useQA();

const loading = ref(false);
const showSuccess = ref(false);
const showBlockingOverlay = ref(false);

const data = ref<WlanBasicMultiGetResponse | null>(null);

const editIndex = ref<number | null>(null);
const draft = ref<WlanGroup | null>(null);
const showPassphrase = reactive<Record<string, boolean>>({});

const bands = ['2.4GHz', '5GHz', '6GHz'] as const;

const normalizeGroup = (group: WlanGroup): WlanGroup => {
  const copy: WlanGroup = JSON.parse(JSON.stringify(group));

  // Ensure CommonSSIDBandSetting exists with 2.4/5/6 entries
  if (!copy.CommonSSIDBandSetting || copy.CommonSSIDBandSetting.length === 0) {
    copy.CommonSSIDBandSetting = bands.map((b) => ({ Band: b, Enable: 1 }));
  } else {
    // ensure all bands exist
    for (const b of bands) {
      if (!copy.CommonSSIDBandSetting.some((x) => x.Band === b)) {
        copy.CommonSSIDBandSetting.push({ Band: b, Enable: 1 });
      }
    }
  }

  // Ensure Interface array has per-band entries
  if (!copy.Interface) copy.Interface = [];
  for (const b of bands) {
    if (!copy.Interface.some((i) => i.Band === b)) {
      copy.Interface.push({
        Band: b,
        Enable: 1,
        SSID: copy.SSIDGroupName || '',
        SecurityMode: '',
        SecurityModeAvailable: '',
        KeyPassPhrase: '',
        MFPConfig: ''
      });
    }
  }

  return copy;
};

const fetchConfig = async () => {
  loading.value = true;
  try {
    const resp = await getWlanBasicMulti();
    // Defensive: if backend still returns legacy schema, try to map into WlanGroup list
    if ((resp as any)?.WlanBasic?.WlanGroup) {
      data.value = resp;
    } else {
      // legacy -> wrap single "Home" group from previous schema
      const legacy = resp as any;
      const modes2g = legacy?.WlanBasic?.wifi2g?.SecurityModeAvailable ?? '';
      const modes5g = legacy?.WlanBasic?.wifi5g?.SecurityModeAvailable ?? '';
      const modes6g = legacy?.WlanBasic?.wifi6g?.SecurityModeAvailable ?? '';
      data.value = {
        WlanBasic: {
          WlanGroup: [
            {
              SSIDGroupName: t('wireless.groupDefaultName'),
              CommonSSIDEnable: legacy?.WlanBasic?.CommonSSIDEnable ?? 0,
              MLOEnable: legacy?.WlanBasic?.MLOEnable ?? 0,
              CommonSSIDBandSetting: bands.map((b) => ({ Band: b, Enable: 1 })),
              Interface: [
                {
                  Band: '2.4GHz',
                  Enable: legacy?.WlanBasic?.wifi2g?.Enable ?? 1,
                  SSID: legacy?.WlanBasic?.wifi2g?.SSID ?? '',
                  SecurityMode: legacy?.WlanBasic?.wifi2g?.SecurityMode ?? '',
                  SecurityModeAvailable: modes2g,
                  KeyPassPhrase: legacy?.WlanBasic?.wifi2g?.Password ?? '',
                  MFPConfig: ''
                },
                {
                  Band: '5GHz',
                  Enable: legacy?.WlanBasic?.wifi5g?.Enable ?? 1,
                  SSID: legacy?.WlanBasic?.wifi5g?.SSID ?? '',
                  SecurityMode: legacy?.WlanBasic?.wifi5g?.SecurityMode ?? '',
                  SecurityModeAvailable: modes5g,
                  KeyPassPhrase: legacy?.WlanBasic?.wifi5g?.Password ?? '',
                  MFPConfig: ''
                },
                {
                  Band: '6GHz',
                  Enable: legacy?.WlanBasic?.wifi6g?.Enable ?? 1,
                  SSID: legacy?.WlanBasic?.wifi6g?.SSID ?? '',
                  SecurityMode: legacy?.WlanBasic?.wifi6g?.SecurityMode ?? '',
                  SecurityModeAvailable: modes6g,
                  KeyPassPhrase: legacy?.WlanBasic?.wifi6g?.Password ?? '',
                  MFPConfig: ''
                }
              ]
            }
          ]
        }
      };
    }
  } catch (e) {
    console.error('Error fetching WLAN Basic (multi) config:', e);
  } finally {
    loading.value = false;
  }
};

const groups = computed(() => data.value?.WlanBasic?.WlanGroup ?? []);

const summarizeGroup = (g: WlanGroup) => {
  const enabledBandCount = (g.CommonSSIDBandSetting ?? []).filter((b) => b.Enable === 1).length;
  const bandInfo = `${enabledBandCount}/${bands.length} ${t('wireless.bandsEnabled')}`;
  const common = g.CommonSSIDEnable === 1 ? t('common.enabled') : t('common.no');
  const mlo = g.MLOEnable === 1 ? t('common.enabled') : t('common.no');
  return `${t('wireless.commonSsidShort')}: ${common} • ${t('wireless.mloShort')}: ${mlo} • ${bandInfo}`;
};

const startEdit = (index: number) => {
  editIndex.value = index;
  draft.value = normalizeGroup(JSON.parse(JSON.stringify(groups.value[index])));
  // Reset passphrase visibility state in edit mode
  for (const b of bands) {
    showPassphrase[`${b}`] = false;
  }
  showPassphrase['CommonSSID'] = false;
};

const cancelEdit = () => {
  editIndex.value = null;
  draft.value = null;
};

const securityModeOptionsForInterface = (itf: WlanGroupInterface): string[] => {
  const csv = (itf.SecurityModeAvailable ?? '').trim();
  if (!csv) return [];
  return csv.split(',').map((s) => s.trim()).filter(Boolean);
};

const getInterfaceByBand = (band: string): WlanGroupInterface | undefined => {
  return draft.value?.Interface?.find((x) => x.Band === band);
};

const getBandSettingByBand = (band: string): WlanGroupBandSetting | undefined => {
  return draft.value?.CommonSSIDBandSetting?.find((x) => x.Band === band);
};

const onCommonSsidToggle = () => {
  if (!draft.value) return;
  if (draft.value.CommonSSIDEnable === 0) {
    // When disabling Common SSID, also disable MLO
    draft.value.MLOEnable = 0;
  } else {
    // When enabling Common SSID, keep the UI consistent by propagating
    // the first band's SSID/security/PSK to all bands (user edits are done in a single block).
    const first = draft.value.Interface?.[0];
    if (!first) return;

    for (const itf of draft.value.Interface) {
      itf.SSID = first.SSID;
      itf.SecurityMode = first.SecurityMode;
      itf.KeyPassPhrase = first.KeyPassPhrase;
    }
  }
};

/**
 * Keep the backend payload shape intact.
 * UI may hide some fields (e.g., MFPConfig), but we still preserve values from the loaded config
 * and post them back unchanged unless the backend chooses to ignore them.
 */
const buildPostPayload = (): WlanBasicMultiPostRequest | null => {
  if (!data.value) return null;

  // If editing, use edited group; else, post current data
  const postGroups: WlanBasicMultiPostRequest['WlanBasic']['WlanGroup'] = groups.value.map((g, idx) => {
    const src = editIndex.value === idx && draft.value ? draft.value : g;
    const norm = normalizeGroup(src);

    // When Common SSID is enabled, the UI edits only a single block; ensure all interfaces share those values.
    if (norm.CommonSSIDEnable === 1 && norm.Interface.length > 0) {
      const base = norm.Interface[0];
      for (const itf of norm.Interface) {
        itf.SSID = base.SSID;
        itf.SecurityMode = base.SecurityMode;
        itf.KeyPassPhrase = base.KeyPassPhrase;
      }
    }

    return {
      SSIDGroupName: norm.SSIDGroupName,
      CommonSSIDEnable: norm.CommonSSIDEnable,
      MLOEnable: norm.MLOEnable,
      CommonSSIDBandSetting: norm.CommonSSIDBandSetting?.map((b) => ({
        Band: b.Band,
        Enable: b.Enable
      })),
      Interface: norm.Interface.map((i) => ({
        Band: i.Band,
        Enable: i.Enable,
        SSID: i.SSID,
        SecurityMode: i.SecurityMode,
        // Prefer KeyPassPhrase, but allow fallback from WpaPreShareKey
        KeyPassPhrase: (i.KeyPassPhrase ?? i.WpaPreShareKey ?? '').toString(),
        // MFPConfig is removed from the UI but preserved in payload for compatibility.
        MFPConfig: i.MFPConfig
      }))
    };
  });

  return { WlanBasic: { WlanGroup: postGroups } };
};

const showSuccessMessage = () => {
  showSuccess.value = true;
  setTimeout(() => (showSuccess.value = false), 2500);
};

const submit = async () => {
  const payload = buildPostPayload();
  if (!payload) return;

  loading.value = true;
  try {
    await updateWlanBasicMulti(payload);
    showSuccessMessage();
    showBlockingOverlay.value = true;
  } catch (e) {
    console.error('Error updating WLAN Basic (multi) config:', e);
  } finally {
    loading.value = false;
    cancelEdit();
  }
};

const handleBlockingComplete = () => {
  showBlockingOverlay.value = false;
  router.go(0);
};

onMounted(fetchConfig);
</script>

<template>
  <div class="wlan-basic-multi" :data-testid="qa('wlan-basic-multi-root')">
    <div v-if="loading" class="loading-overlay" :data-testid="qa('wlan-basic-multi-loading')">
      <div class="loading-spinner"></div>
    </div>

    <div v-if="showSuccess" class="success-message" :data-testid="qa('wlan-basic-multi-success')">
      {{ t('common.apply') }} {{ t('common.saveSuccess') }}
    </div>

    <!-- Compact list view -->
    <BaseCard class="compact-card" :data-testid="qa('wlan-basic-multi-list-card')">
      <template #header>
        <div class="card-header-row">
          <div class="card-title">{{ t('wireless.basicConfig') }}</div>
          <BaseButton
            variant="secondary"
            size="sm"
            :disabled="loading"
            :data-testid="qa('wlan-basic-multi-refresh')"
            @click="fetchConfig"
          >
            {{ t('common.refresh') }}
          </BaseButton>
        </div>
      </template>

      <div class="group-table" :data-testid="qa('wlan-basic-multi-group-table')">
        <div class="group-table-head">
          <div class="col col-name">{{ t('wireless.ssidGroupName') }}</div>
          <div class="col col-common">{{ t('wireless.commonSsidEnable') }}</div>
          <div class="col col-mlo">{{ t('wireless.mloEnable') }}</div>
          <div class="col col-actions">{{ t('common.action') }}</div>
        </div>

        <div v-for="(g, idx) in groups" :key="`${g.SSIDGroupName}-${idx}`" class="group-table-row">
          <div class="col col-name">
            <div class="name-line">{{ g.SSIDGroupName }}</div>
            <div class="sub-line">{{ summarizeGroup(g) }}</div>
          </div>

          <div class="col col-common">
            <span class="pill" :class="g.CommonSSIDEnable === 1 ? 'on' : 'off'">
              {{ g.CommonSSIDEnable === 1 ? t('common.enabled') : t('common.no') }}
            </span>
          </div>

          <div class="col col-mlo">
            <span class="pill" :class="g.MLOEnable === 1 ? 'on' : 'off'">
              {{ g.MLOEnable === 1 ? t('common.enabled') : t('common.no') }}
            </span>
          </div>

          <div class="col col-actions">
            <BaseButton
              variant="primary"
              size="sm"
              :data-testid="qa(`wlan-basic-multi-edit-${idx}`)"
              @click="startEdit(idx)"
            >
              {{ t('common.edit') }}
            </BaseButton>
          </div>
        </div>

        <div v-if="groups.length === 0" class="empty-row">
          {{ t('wireless.noSsidGroups') }}
        </div>
      </div>
    </BaseCard>

    <!-- Edit mode -->
    <BaseCard v-if="draft && editIndex !== null" class="compact-card edit-card" :data-testid="qa('wlan-basic-multi-edit-card')">
      <template #header>
        <div class="card-header-row">
          <div class="card-title">
            {{ t('common.edit') }}: {{ draft.SSIDGroupName }}
          </div>

          <div class="header-actions">
            <BaseButton variant="secondary" size="sm" :data-testid="qa('wlan-basic-multi-edit-cancel-top')" @click="cancelEdit">
              {{ t('common.cancel') }}
            </BaseButton>
            <BaseButton variant="primary" size="sm" :data-testid="qa('wlan-basic-multi-edit-apply-top')" @click="submit">
              {{ t('common.apply') }}
            </BaseButton>
          </div>
        </div>
      </template>

      <div class="edit-grid" :data-testid="qa('wlan-basic-multi-edit-grid')">
        <!-- Common toggles -->
        <div class="edit-section" :data-testid="qa('wlan-basic-multi-common-section')">
          <div class="section-title">{{ t('wireless.commonSsidSettings') }}</div>
          <div class="fields-grid">
            <div class="field">
              <BaseCheckbox
                :model-value="draft.CommonSSIDEnable === 1"
                :label="t('wireless.commonSsidEnable')"
                :data-testid="qa('wlan-basic-multi-common-ssid-enable')"
                @update:model-value="(v: boolean) => { draft!.CommonSSIDEnable = v ? 1 : 0; onCommonSsidToggle(); }"
              />
            </div>
            <div class="field">
              <BaseCheckbox
                :model-value="draft.MLOEnable === 1"
                :label="t('wireless.mloEnable')"
                :disabled="draft.CommonSSIDEnable === 0"
                :data-testid="qa('wlan-basic-multi-mlo-enable')"
                @update:model-value="(v: boolean) => { draft!.MLOEnable = v ? 1 : 0; }"
              />
              <div v-if="draft.CommonSSIDEnable === 0" class="hint">
                {{ t('wireless.commonSsidDisabled') }}
              </div>
            </div>
          </div>
        </div>

        <!-- Common SSID band settings (ONLY when Common SSID is ON) -->
        <div
          v-if="draft.CommonSSIDEnable === 1"
          class="edit-section"
          :data-testid="qa('wlan-basic-multi-common-band-section')"
        >
          <div class="section-title">{{ t('wireless.commonSsidBandSettings') }}</div>

          <!-- Requirement: In Common SSID mode, this section must have ONLY its own Enable toggle. -->
          <div class="row-head">
            <div class="row-title">{{ t('common.enable') }}</div>
            <BaseCheckbox
              :model-value="draft.Interface[0].Enable === 1"
              :label="t('common.enable')"
              :data-testid="qa('wlan-basic-multi-common-band-enable')"
              @update:model-value="(v: boolean) => { draft!.Interface[0].Enable = v ? 1 : 0; }"
            />
          </div>

          <!-- Common SSID fields: single block for SSID/Auth/PSK -->
          <div class="common-ssid-fields compact-rows" :data-testid="qa('wlan-basic-multi-common-ssid-fields')">
            <div class="row row-3">
              <div class="cell cell-ssid">
                <BaseInput
                  v-model="draft.Interface[0].SSID"
                  :label="t('wireless.ssid')"
                  :disabled="draft.Interface[0].Enable === 0"
                  :data-testid="qa('wlan-basic-multi-common-ssid-ssid')"
                />
              </div>

              <div class="cell cell-auth">
                <BaseSelect
                  v-model="draft.Interface[0].SecurityMode"
                  :label="t('wireless.authentication')"
                  :options="securityModeOptionsForInterface(draft.Interface[0]).map((m) => ({ label: m, value: m }))"
                  :disabled="draft.Interface[0].Enable === 0"
                  :data-testid="qa('wlan-basic-multi-common-ssid-security')"
                />
              </div>

              <div class="cell cell-psk">
                <div class="pass-row">
                  <BaseInput
                    v-model="draft.Interface[0].KeyPassPhrase"
                    :label="t('wireless.password')"
                    :type="showPassphrase['CommonSSID'] ? 'text' : 'password'"
                    :disabled="draft.Interface[0].Enable === 0"
                    :data-testid="qa('wlan-basic-multi-common-ssid-psk')"
                  />
                  <button
                    type="button"
                    class="icon-btn"
                    :disabled="draft.Interface[0].Enable === 0"
                    :data-testid="qa('wlan-basic-multi-common-ssid-psk-toggle')"
                    @click="showPassphrase['CommonSSID'] = !showPassphrase['CommonSSID']"
                    :title="showPassphrase['CommonSSID'] ? t('wireless.hide') : t('wireless.show')"
                  >
                    <span class="material-icons">{{ showPassphrase['CommonSSID'] ? 'visibility_off' : 'visibility' }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Per-band interface rows (only when Common SSID is OFF) -->
        <div
          v-if="draft.CommonSSIDEnable === 0"
          class="edit-section"
          :data-testid="qa('wlan-basic-multi-interfaces-section')"
        >
          <div class="section-title">{{ t('wireless.perBandInterfaces') }}</div>

          <div class="interfaces-rows">
            <div v-for="b in bands" :key="b" class="iface-row" :data-testid="qa(`wlan-basic-multi-iface-${slug(b)}`)">
              <div class="row-head">
                <div class="row-title">{{ b }}</div>
                <BaseCheckbox
                  :model-value="getInterfaceByBand(b)!.Enable === 1"
                  :label="t('common.enable')"
                  :data-testid="qa(`wlan-basic-multi-iface-enable-${slug(b)}`)"
                  @update:model-value="(v: boolean) => { getInterfaceByBand(b)!.Enable = v ? 1 : 0; }"
                />
              </div>

              <div class="row row-3">
                <div class="cell cell-ssid">
                  <BaseInput
                    v-model="getInterfaceByBand(b)!.SSID"
                    :label="t('wireless.ssid')"
                    :disabled="getInterfaceByBand(b)!.Enable === 0"
                    :data-testid="qa(`wlan-basic-multi-iface-ssid-${slug(b)}`)"
                  />
                </div>

                <div class="cell cell-auth">
                  <BaseSelect
                    v-model="getInterfaceByBand(b)!.SecurityMode"
                    :label="t('wireless.authentication')"
                    :options="securityModeOptionsForInterface(getInterfaceByBand(b)!).map((m) => ({ label: m, value: m }))"
                    :disabled="getInterfaceByBand(b)!.Enable === 0"
                    :data-testid="qa(`wlan-basic-multi-iface-security-${slug(b)}`)"
                  />
                </div>

                <div class="cell cell-psk">
                  <div class="pass-row">
                    <BaseInput
                      v-model="getInterfaceByBand(b)!.KeyPassPhrase"
                      :label="t('wireless.password')"
                      :type="showPassphrase[b] ? 'text' : 'password'"
                      :disabled="getInterfaceByBand(b)!.Enable === 0"
                      :data-testid="qa(`wlan-basic-multi-iface-psk-${slug(b)}`)"
                    />
                    <button
                      type="button"
                      class="icon-btn"
                      :disabled="getInterfaceByBand(b)!.Enable === 0"
                      :data-testid="qa(`wlan-basic-multi-iface-psk-toggle-${slug(b)}`)"
                      @click="showPassphrase[b] = !showPassphrase[b]"
                      :title="showPassphrase[b] ? t('wireless.hide') : t('wireless.show')"
                    >
                      <span class="material-icons">{{ showPassphrase[b] ? 'visibility_off' : 'visibility' }}</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- MFPConfig removed from UI intentionally -->
            </div>
          </div>
        </div>
      </div>

      <div class="footer-actions">
        <BaseButton variant="secondary" :data-testid="qa('wlan-basic-multi-edit-cancel')" @click="cancelEdit">
          {{ t('common.cancel') }}
        </BaseButton>
        <BaseButton variant="primary" :data-testid="qa('wlan-basic-multi-edit-apply')" @click="submit">
          {{ t('common.apply') }}
        </BaseButton>
      </div>
    </BaseCard>

    <BlockingOverlay
      :data-testid="qa('wlan-basic-multi-blocking-overlay')"
      :is-visible="showBlockingOverlay"
      :message="t('wireless.applyingBasicSettings')"
      :duration="30"
      @complete="handleBlockingComplete"
    />
  </div>
</template>

<style scoped>
.wlan-basic-multi {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.compact-card {
  padding: 0;
}

.loading-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.75);
  display: grid;
  place-items: center;
  z-index: 10;
  border-radius: 6px;
}

.loading-spinner {
  width: 36px;
  height: 36px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #0070bb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.success-message {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4caf50;
  color: white;
  padding: 10px 14px;
  border-radius: 6px;
  z-index: 100;
}

.card-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.group-table {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.group-table-head,
.group-table-row {
  display: grid;
  grid-template-columns: 1.6fr 0.6fr 0.6fr 0.5fr;
  gap: 8px;
  padding: 10px 12px;
  align-items: center;
}

.group-table-head {
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  font-size: 12px;
  font-weight: 600;
}

.group-table-row {
  border-bottom: 1px solid var(--border-color);
  font-size: 13px;
}

.group-table-row:last-child {
  border-bottom: none;
}

.col-name .name-line {
  font-weight: 600;
}

.col-name .sub-line {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 2px;
  line-height: 1.2;
}

.pill {
  display: inline-flex;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  border: 1px solid var(--border-color);
  justify-content: center;
}

.pill.on {
  background: rgba(76, 175, 80, 0.12);
  border-color: rgba(76, 175, 80, 0.4);
  color: #2e7d32;
}

.pill.off {
  background: rgba(0, 0, 0, 0.04);
  color: var(--text-secondary);
}

.empty-row {
  padding: 14px 12px;
  color: var(--text-secondary);
  font-size: 13px;
}

.edit-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
}

.edit-section {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 10px;
}

.section-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 10px;
}

.fields-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.hint {
  margin-top: 6px;
  font-size: 12px;
  color: var(--text-secondary);
}

.row-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 10px;
}

.row-title {
  font-size: 13px;
  font-weight: 600;
}

.compact-rows {
  margin-top: 10px;
}

.interfaces-rows {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.iface-row {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 10px;
  background: #fff;
}

/* Row layout: SSID | Authentication | Enabled (toggle is in header) */
.row {
  display: grid;
  gap: 10px;
  align-items: end;
}

.row-3 {
  grid-template-columns: 1.6fr 1fr 1.1fr;
}

.cell {
  min-width: 0;
}

.pass-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: end;
}

.icon-btn {
  height: 36px;
  width: 36px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  background: white;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.icon-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.footer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 0 12px 12px;
}

@media (max-width: 960px) {
  .group-table-head,
  .group-table-row {
    grid-template-columns: 1fr 0.6fr 0.6fr 0.6fr;
  }

  .fields-grid {
    grid-template-columns: 1fr;
  }

  .row-3 {
    grid-template-columns: 1fr;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
