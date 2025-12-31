<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import BlockingOverlay from '../../../components/BlockingOverlay.vue';
import BaseButton from '../../../components/common/BaseButton.vue';
import BaseCard from '../../../components/common/BaseCard.vue';

import BaseInput from '../../../components/common/BaseInput.vue';
import BaseSelect from '../../../components/common/BaseSelect.vue';
import { useQA } from '../../../utils/qa';
import { getWlanBasicMulti, updateWlanBasicMulti } from '../../../services/api/wireless';
import type {
  WlanBasicMultiGetResponse,
  WlanBasicMultiPostRequest,
  WlanGroupItem,
  WlanInterface,
  CommonSSIDBand
} from '../../../types/wlanBasicMulti';

type CommonSSIDBandSettingItem = NonNullable<WlanGroupItem['CommonSSIDBandSetting']>[number];

const { t } = useI18n();
const router = useRouter();
const { qa, slug } = useQA();

const loading = ref(false);
const showSuccess = ref(false);
const showBlockingOverlay = ref(false);

const data = ref<WlanBasicMultiGetResponse | null>(null);

/**
 * Snapshot of the last successful GET response.
 * Used by non-edit-mode "Cancel" to restore UI to the backend state.
 */
const lastGetSnapshot = ref<WlanBasicMultiGetResponse | null>(null);

const editIndex = ref<number | null>(null);
const draft = ref<WlanGroupItem | null>(null);
const showPassphrase = reactive<Record<string, boolean>>({});

const bands = ['2.4GHz', '5GHz', '6GHz'] as const;

const normalizeGroup = (group: WlanGroupItem): WlanGroupItem => {
  const copy: WlanGroupItem = JSON.parse(JSON.stringify(group));

  // Ensure CommonSSIDBandSetting exists with 2.4/5/6 entries
  if (!copy.CommonSSIDBandSetting || copy.CommonSSIDBandSetting.length === 0) {
    copy.CommonSSIDBandSetting = bands.map((b: (typeof bands)[number]) => ({ Band: b, Enable: 1 }));
  } else {
    // ensure all bands exist
    for (const b of bands) {
      if (!copy.CommonSSIDBandSetting.some((x: CommonSSIDBandSettingItem) => x.Band === b)) {
        copy.CommonSSIDBandSetting.push({ Band: b, Enable: 1 });
      }
    }
  }

  // Ensure Interface array has per-band entries
  if (!copy.Interface) copy.Interface = [];
  for (const b of bands) {
    if (!copy.Interface.some((i: WlanInterface) => i.Band === b)) {
      copy.Interface.push({
        Band: b,
        Enable: 1,
        Alias: '',
        SSID: copy.SSID || '',
        SecurityMode: copy.SecurityMode || '',
        SecurityModeAvailable: copy.SecurityModeAvailable,
        KeyPassPhrase: copy.KeyPassPhrase || '',
        MFPConfig: copy.MFPConfig
      });
    }
  }

  return copy;
};

const fetchConfig = async () => {
  loading.value = true;
  try {
    const resp = await getWlanBasicMulti();

    // If backend already returns the new schema, accept it directly.
    if ((resp as any)?.WlanGroup) {
      data.value = resp as WlanBasicMultiGetResponse;
    } else {
      // legacy -> wrap single "Home" group from previous schema
      const legacy = resp as any;
      const modes2g = legacy?.WlanBasic?.wifi2g?.SecurityModeAvailable ?? '';
      const modes5g = legacy?.WlanBasic?.wifi5g?.SecurityModeAvailable ?? '';
      const modes6g = legacy?.WlanBasic?.wifi6g?.SecurityModeAvailable ?? '';

      data.value = {
        WlanGroup: [
          {
            Enable: 1,
            Alias: t('wireless.groupDefaultName'),
            SSID: legacy?.WlanBasic?.wifi2g?.SSID ?? '',
            KeyPassPhrase: legacy?.WlanBasic?.wifi2g?.Password ?? '',
            SecurityMode: legacy?.WlanBasic?.wifi2g?.SecurityMode ?? '',
            SecurityModeAvailable: modes2g,
            CommonSSIDEnable: legacy?.WlanBasic?.CommonSSIDEnable ?? 0,
            MLOEnable: legacy?.WlanBasic?.MLOEnable ?? 0,
            CommonSSIDBandSetting: bands.map((b) => ({ Band: b, Enable: 1 })),
            Interface: [
              {
                Band: '2.4GHz',
                Enable: legacy?.WlanBasic?.wifi2g?.Enable ?? 1,
                Alias: '',
                SSID: legacy?.WlanBasic?.wifi2g?.SSID ?? '',
                SecurityMode: legacy?.WlanBasic?.wifi2g?.SecurityMode ?? '',
                SecurityModeAvailable: modes2g,
                KeyPassPhrase: legacy?.WlanBasic?.wifi2g?.Password ?? '',
                MFPConfig: ''
              },
              {
                Band: '5GHz',
                Enable: legacy?.WlanBasic?.wifi5g?.Enable ?? 1,
                Alias: '',
                SSID: legacy?.WlanBasic?.wifi5g?.SSID ?? '',
                SecurityMode: legacy?.WlanBasic?.wifi5g?.SecurityMode ?? '',
                SecurityModeAvailable: modes5g,
                KeyPassPhrase: legacy?.WlanBasic?.wifi5g?.Password ?? '',
                MFPConfig: ''
              },
              {
                Band: '6GHz',
                Enable: legacy?.WlanBasic?.wifi6g?.Enable ?? 1,
                Alias: '',
                SSID: legacy?.WlanBasic?.wifi6g?.SSID ?? '',
                SecurityMode: legacy?.WlanBasic?.wifi6g?.SecurityMode ?? '',
                SecurityModeAvailable: modes6g,
                KeyPassPhrase: legacy?.WlanBasic?.wifi6g?.Password ?? '',
                MFPConfig: ''
              }
            ]
          }
        ]
      };
    }

    // Capture last successful GET snapshot for non-edit "Cancel"
    lastGetSnapshot.value = JSON.parse(JSON.stringify(data.value));
  } catch (e) {
    console.error('Error fetching WLAN Basic (multi) config:', e);
  } finally {
    loading.value = false;
  }
};

const groups = computed(() => data.value?.WlanGroup ?? []);

const summarizeGroup = (g: WlanGroupItem) => {
  const enabledBandCount = (g.CommonSSIDBandSetting ?? []).filter((b: CommonSSIDBandSettingItem) => b.Enable === 1).length;
  const bandInfo = `${enabledBandCount}/${bands.length} ${t('wireless.bandsEnabled')}`;
  const common = g.CommonSSIDEnable === 1 ? t('common.enabled') : t('common.no');
  const mlo = g.MLOEnable === 1 ? t('common.enabled') : t('common.no');
  return `${t('wireless.commonSsidShort')}: ${common} • ${t('wireless.mloShort')}: ${mlo} • ${bandInfo}`;
};

// PUBLIC_INTERFACE
const enterEdit = (index: number) => {
  /** Enter edit mode for a given SSID group index. */
  editIndex.value = index;
  draft.value = normalizeGroup(JSON.parse(JSON.stringify(groups.value[index])));
  // Reset passphrase visibility state in edit mode
  for (const b of bands) {
    showPassphrase[`${b}`] = false;
  }
  showPassphrase['CommonSSID'] = false;
};

// PUBLIC_INTERFACE
const cancelEdit = () => {
  /** Exit edit mode and discard draft changes. */
  editIndex.value = null;
  draft.value = null;
};

// PUBLIC_INTERFACE
const updateLocal = () => {
  /**
   * Apply draft changes back to the table/grid view (local state only),
   * without issuing a POST; then exit edit mode.
   */
  if (!data.value || editIndex.value === null || !draft.value) return;
  const idx = editIndex.value;

  // Normalize to ensure band/interface entries exist
  const normalized = normalizeGroup(JSON.parse(JSON.stringify(draft.value)));

  // Keep backend shape consistent: when Common SSID is enabled, ensure all interfaces match the single edited block
  if (normalized.CommonSSIDEnable === 1 && normalized.Interface.length > 0) {
    const base = normalized.Interface[0];
    for (const itf of normalized.Interface) {
      itf.SSID = base.SSID;
      itf.SecurityMode = base.SecurityMode;
      itf.KeyPassPhrase = base.KeyPassPhrase;
      // Enable in Common mode is controlled by Interface[0].Enable in this UI; mirror it across to be safe
      itf.Enable = base.Enable;
    }
  }

  data.value.WlanGroup[idx] = normalized;
  cancelEdit();
};

// PUBLIC_INTERFACE
const restoreFromGet = () => {
  /**
   * Non-edit-mode "Cancel": restore local UI state to the last successful GET response.
   * Does not call backend.
   */
  if (!lastGetSnapshot.value) return;
  data.value = JSON.parse(JSON.stringify(lastGetSnapshot.value));
};

const securityModeOptionsForInterface = (itf: WlanInterface): string[] => {
  const csv = (itf.SecurityModeAvailable ?? '').trim();
  if (!csv) return [];
  return csv
    .split(',')
    .map((s: string) => s.trim())
    .filter((s: string) => Boolean(s));
};

const getInterfaceByBand = (band: string): WlanInterface | undefined => {
  return draft.value?.Interface?.find((x: WlanInterface) => x.Band === band);
};

const getBandSettingByBand = (band: string): CommonSSIDBand | undefined => {
  return draft.value?.CommonSSIDBandSetting?.find((x: CommonSSIDBand) => x.Band === band);
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
      itf.Enable = first.Enable;
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

  const postGroups: WlanBasicMultiPostRequest['WlanGroup'] = groups.value.map((g: WlanGroupItem) => {
    const norm = normalizeGroup(g);

    // When Common SSID is enabled, the UI edits only a single block; ensure all interfaces share those values.
    if (norm.CommonSSIDEnable === 1 && norm.Interface.length > 0) {
      const base = norm.Interface[0];
      for (const itf of norm.Interface) {
        itf.SSID = base.SSID;
        itf.SecurityMode = base.SecurityMode;
        itf.KeyPassPhrase = base.KeyPassPhrase;
        itf.Enable = base.Enable;
      }
    }

    return {
      Enable: norm.Enable,
      Alias: norm.Alias,
      SSID: norm.SSID,
      KeyPassPhrase: norm.KeyPassPhrase,
      SecurityMode: norm.SecurityMode,
      SecurityModeAvailable: norm.SecurityModeAvailable,
      CommonSSIDEnable: norm.CommonSSIDEnable,
      MLOEnable: norm.MLOEnable,
      BridgeInterface: norm.BridgeInterface,
      MFPConfig: norm.MFPConfig,
      CommonSSIDBandSetting: norm.CommonSSIDBandSetting?.map((b: CommonSSIDBand) => ({
        Band: b.Band,
        Enable: b.Enable,
        SSID: b.SSID,
        SecurityMode: b.SecurityMode,
        KeyPassPhrase: b.KeyPassPhrase
      })),
      Interface: norm.Interface.map((i: WlanInterface) => ({
        Enable: i.Enable,
        Band: i.Band,
        Alias: i.Alias,
        SSID: i.SSID,
        KeyPassPhrase: i.KeyPassPhrase,
        SecurityMode: i.SecurityMode,
        SecurityModeAvailable: i.SecurityModeAvailable,
        MFPConfig: i.MFPConfig,
        AccessPointReference: i.AccessPointReference,
        SSIDReference: i.SSIDReference
      }))
    };
  });

  return { WlanGroup: postGroups };
};

const showSuccessMessage = () => {
  showSuccess.value = true;
  setTimeout(() => (showSuccess.value = false), 2500);
};

// PUBLIC_INTERFACE
const applyPost = async () => {
  /**
   * Non-edit-mode "Apply": POST current local state to backend in WlanGroup + Interface structure.
   * Shows success feedback consistent with the rest of this page.
   */
  const payload = buildPostPayload();
  if (!payload) return;

  loading.value = true;
  try {
    await updateWlanBasicMulti(payload);
    showSuccessMessage();
    showBlockingOverlay.value = true;

    // After successful apply, treat current state as the new baseline for non-edit cancel.
    lastGetSnapshot.value = JSON.parse(JSON.stringify(data.value));
  } catch (e) {
    console.error('Error updating WLAN Basic (multi) config:', e);
  } finally {
    loading.value = false;
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

    <!-- Compact list view (hidden while editing) -->
    <BaseCard
      v-if="editIndex === null"
      class="compact-card"
      :data-testid="qa('wlan-basic-multi-list-card')"
    >
      <template #header>
        <div class="card-header-row">
          <div class="card-title">{{ t('wireless.basicConfig') }}</div>
          <!-- Refresh button removed per requirements -->
        </div>
      </template>

      <div class="group-table" :data-testid="qa('wlan-basic-multi-group-table')">
        <div class="group-table-head">
          <div class="col col-name">{{ t('wireless.ssidGroupName') }}</div>
          <div class="col col-common">{{ t('wireless.commonSsidEnable') }}</div>
          <div class="col col-mlo">{{ t('wireless.mloEnable') }}</div>
          <div class="col col-actions">{{ t('common.action') }}</div>
        </div>

        <div v-for="(g, idx) in groups" :key="`${g.Alias}-${idx}`" class="group-table-row">
          <div class="col col-name">
            <div class="name-line">{{ g.Alias }}</div>
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
            <button
              class="btn-action"
              :data-testid="qa(`wlan-basic-multi-edit-${idx}`)"
              :title="t('common.edit')"
              @click="enterEdit(idx)"
            >
              <span class="material-icons">edit</span>
            </button>
          </div>
        </div>

        <div v-if="groups.length === 0" class="empty-row">
          {{ t('wireless.noSsidGroups') }}
        </div>
      </div>

      <!-- Non-edit footer actions: Cancel restores last GET, Apply posts -->
      <div class="footer-actions">
        <BaseButton variant="secondary" :data-testid="qa('wlan-basic-multi-view-cancel')" @click="restoreFromGet">
          {{ t('common.cancel') }}
        </BaseButton>
        <BaseButton variant="primary" :disabled="loading" :data-testid="qa('wlan-basic-multi-view-apply')" @click="applyPost">
          {{ t('common.apply') }}
        </BaseButton>
      </div>
    </BaseCard>

    <!-- Edit mode (Basic Config list is hidden while this is shown) -->
    <BaseCard v-if="draft && editIndex !== null" class="compact-card edit-card" :data-testid="qa('wlan-basic-multi-edit-card')">
      <template #header>
        <div class="card-header-row">
          <div class="card-title">
            {{ t('common.edit') }}: {{ draft.Alias }}
          </div>
          <!-- Inline header actions removed per requirements -->
        </div>
      </template>

      <div class="edit-grid" :data-testid="qa('wlan-basic-multi-edit-grid')">
        <!-- Common toggles -->
        <div class="edit-section" :data-testid="qa('wlan-basic-multi-common-section')">
          <div class="section-title">{{ t('wireless.commonSsidSettings') }}</div>
          <div class="fields-grid">
            <div class="field">
              <div class="switch-label" :data-testid="qa('wlan-basic-multi-common-ssid-enable')">
                <span>{{ t('wireless.commonSsidEnable') }}</span>
                <label class="switch">
                  <input
                    type="checkbox"
                    :data-testid="qa('wlan-basic-multi-common-ssid-enable-toggle')"
                    :checked="draft.CommonSSIDEnable === 1"
                    @change="(e: Event) => { draft!.CommonSSIDEnable = (e.target as HTMLInputElement).checked ? 1 : 0; onCommonSsidToggle(); }"
                  >
                  <span class="slider"></span>
                </label>
              </div>
            </div>

            <div class="field">
              <div class="switch-label" :data-testid="qa('wlan-basic-multi-mlo-enable')">
                <span>{{ t('wireless.mloEnable') }}</span>
                <label class="switch" :class="{ 'is-disabled': draft.CommonSSIDEnable === 0 }">
                  <input
                    type="checkbox"
                    :data-testid="qa('wlan-basic-multi-mlo-enable-toggle')"
                    :checked="draft.MLOEnable === 1"
                    :disabled="draft.CommonSSIDEnable === 0"
                    @change="(e: Event) => { draft!.MLOEnable = (e.target as HTMLInputElement).checked ? 1 : 0; }"
                  >
                  <span class="slider"></span>
                </label>
              </div>

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
            <div class="row-right">
              <div class="switch-label" :data-testid="qa('wlan-basic-multi-common-band-enable')">
                <label class="switch">
                  <input
                    type="checkbox"
                    :data-testid="qa('wlan-basic-multi-common-band-enable-toggle')"
                    :checked="draft.Interface[0].Enable === 1"
                    @change="(e: Event) => { draft!.Interface[0].Enable = (e.target as HTMLInputElement).checked ? 1 : 0; }"
                  >
                  <span class="slider"></span>
                </label>
              </div>
            </div>
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
                    :modelValue="draft.Interface[0].KeyPassPhrase ?? ''"
                    :label="t('wireless.password')"
                    :type="showPassphrase['CommonSSID'] ? 'text' : 'password'"
                    :disabled="draft.Interface[0].Enable === 0"
                    :data-testid="qa('wlan-basic-multi-common-ssid-psk')"
                    @update:modelValue="(v) => { draft!.Interface[0].KeyPassPhrase = String(v ?? ''); }"
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

          <!-- Kept: CommonSSIDBandSetting data is still preserved in payload via normalizeGroup/buildPostPayload.
               UI intentionally does not expose per-band toggles here to preserve compact design rules. -->
          <div v-if="false">
            {{ getBandSettingByBand('2.4GHz')?.Enable }}
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
                <div class="row-right">
                  <div class="switch-label" :data-testid="qa(`wlan-basic-multi-iface-enable-${slug(b)}`)">
                    <span class="sr-only">{{ t('common.enable') }}</span>
                    <label class="switch">
                      <input
                        type="checkbox"
                        :data-testid="qa(`wlan-basic-multi-iface-enable-toggle-${slug(b)}`)"
                        :checked="getInterfaceByBand(b)!.Enable === 1"
                        @change="(e: Event) => { getInterfaceByBand(b)!.Enable = (e.target as HTMLInputElement).checked ? 1 : 0; }"
                      >
                      <span class="slider"></span>
                    </label>
                  </div>
                </div>
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
                      :modelValue="getInterfaceByBand(b)!.KeyPassPhrase ?? ''"
                      :label="t('wireless.password')"
                      :type="showPassphrase[b] ? 'text' : 'password'"
                      :disabled="getInterfaceByBand(b)!.Enable === 0"
                      :data-testid="qa(`wlan-basic-multi-iface-psk-${slug(b)}`)"
                      @update:modelValue="(v) => { getInterfaceByBand(b)!.KeyPassPhrase = String(v ?? ''); }"
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

      <!-- Edit footer actions: Cancel (discard) + Update (local-only, no POST) -->
      <div class="footer-actions">
        <BaseButton variant="secondary" :data-testid="qa('wlan-basic-multi-edit-cancel')" @click="cancelEdit">
          {{ t('common.cancel') }}
        </BaseButton>
        <BaseButton variant="primary" :data-testid="qa('wlan-basic-multi-edit-update')" @click="updateLocal">
          {{ t('common.update') }}
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
  gap: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 10px;
}

/* Right-align header controls (e.g., slide switches) while keeping compact layout. */
.row-right {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
}

.row-title {
  font-size: 13px;
  font-weight: 600;
}

/* Switch styling (matches Advanced Config slide switch pattern) */
.switch-label {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
}

/* In header rows, the switch should size to content so it can sit flush right. */
.row-head .switch-label {
  width: auto;
}

.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 26px;
  flex-shrink: 0;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: #ccc;
  transition: 0.2s;
  border-radius: 999px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.2s;
  border-radius: 50%;
}

.switch input:checked + .slider {
  background-color: #0070BB;
}

.switch input:checked + .slider:before {
  transform: translateX(22px);
}

.switch input:focus + .slider {
  box-shadow: 0 0 0 2px rgba(0, 112, 187, 0.25);
}

.switch input:disabled + .slider {
  cursor: not-allowed;
  opacity: 0.5;
}

.switch.is-disabled {
  opacity: 0.8;
}

/* Screen-reader only utility for unlabeled switches */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
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

/* Minimal tweak: some browsers render Material Icons slightly low inside square buttons.
   Nudge only the glyph (not the button) to keep hit area unchanged. */
.icon-btn .material-icons {
  line-height: 1;
  transform: translateY(-1px);
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

/* Match Port Forwarding action icon button exactly */
.btn-action {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: 4px;
}

.btn-action:hover {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
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
