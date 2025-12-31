// Types for the multi-SSID Basic Config screen (WlanGroup-based schema).
// This file is intentionally separate from the legacy WlanBasic* types to avoid breaking existing pages.

/** A UI/JSON union for 0/1 style booleans used by the backend. */
export type BooleanInt = 0 | 1;

export type WlanBandName = '2.4GHz' | '5GHz' | '6GHz';

export interface WlanGroupBandSetting {
  /** e.g., "2.4GHz", "5GHz", "6GHz" */
  Band: WlanBandName | string;
  Enable: BooleanInt;
}

export interface WlanGroupInterface {
  /** Often an interface name or alias, may be empty. */
  Name?: string;

  /** A unique ID or alias; presence depends on backend. */
  Alias?: string;

  /** e.g., "2.4GHz", "5GHz", "6GHz" */
  Band: WlanBandName | string;

  Enable: BooleanInt;
  SSID: string;

  /** e.g., "WPA2-Personal" etc. */
  SecurityMode: string;

  /** Comma-separated list of security modes supported for this interface */
  SecurityModeAvailable?: string;

  /**
   * WPA pre-shared key / passphrase.
   * Backend sometimes uses "KeyPassPhrase"; UI should write back as "KeyPassPhrase".
   */
  KeyPassPhrase?: string;

  /**
   * Some backends still expose "WpaPreShareKey". Keep optional for compatibility.
   * UI should prefer KeyPassPhrase when posting.
   */
  WpaPreShareKey?: string;

  /** Management Frame Protection configuration */
  MFPConfig?: string;
}

export interface WlanGroup {
  /** UI label like "Home", "Guest", etc. */
  SSIDGroupName: string;

  CommonSSIDEnable: BooleanInt;
  MLOEnable: BooleanInt;

  /** Band toggles for the group when Common SSID is enabled */
  CommonSSIDBandSetting?: WlanGroupBandSetting[];

  /** Per-band interface settings */
  Interface: WlanGroupInterface[];
}

export interface WlanBasicMultiGetResponse {
  WlanBasic: {
    /**
     * Array of SSID groups.
     * Each group contains CommonSSID/MLO flags and per-band Interface items.
     */
    WlanGroup: WlanGroup[];
  };
}

export interface WlanBasicMultiPostRequest {
  WlanBasic: {
    WlanGroup: Array<{
      SSIDGroupName: string;
      CommonSSIDEnable: BooleanInt;
      MLOEnable: BooleanInt;
      CommonSSIDBandSetting?: WlanGroupBandSetting[];
      Interface: Array<{
        Band: string;
        Enable: BooleanInt;
        SSID: string;
        SecurityMode: string;
        KeyPassPhrase?: string;
        MFPConfig?: string;
      }>;
    }>;
  };
}
