// Types for WLAN multi-SSID Basic Config schema (WlanGroup-based).
// Kept as a dedicated module so other legacy WLAN types remain unaffected.

export type WlanBand = '2.4GHz' | '5GHz' | '6GHz';
export type EnableFlag = 0 | 1;

export interface WlanInterface {
  Enable: EnableFlag;
  Band: WlanBand;
  Alias: string;
  SSID: string;
  KeyPassPhrase: string;
  SecurityMode: string;
  SecurityModeAvailable?: string;
  MFPConfig?: number | string;
  AccessPointReference?: string;
  SSIDReference?: string;
}

export interface CommonSSIDBand {
  Band: WlanBand;
  Enable: EnableFlag;
  SSID?: string;
  SecurityMode?: string;
  KeyPassPhrase?: string;
}

export interface WlanGroupItem {
  Enable: EnableFlag;
  Alias: string;
  SSID: string;
  KeyPassPhrase: string;
  SecurityMode: string;
  SecurityModeAvailable?: string;
  CommonSSIDEnable: EnableFlag;
  MLOEnable: EnableFlag;
  BridgeInterface?: string;
  MFPConfig?: number | string;
  Interface: WlanInterface[];
  CommonSSIDBandSetting?: CommonSSIDBand[];
}

export interface WlanBasicMultiGetResponse {
  WlanGroup: WlanGroupItem[];
}

export interface WlanBasicMultiPostRequest {
  WlanGroup: WlanGroupItem[];
}
