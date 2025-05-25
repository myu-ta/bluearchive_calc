import { ProgressState, UserCharaDataItem } from "@/types/ba-userdata-type";
import { InputDisplays } from "@/types/search-elements";

export const TAB_NAMES = ["必要装備数計算", "所持装備数記入"];
export const LEVEL_KEY: Array<keyof UserCharaDataItem> = ["level"];
export const EQUIP_KEYS: Array<keyof UserCharaDataItem> = ["equip1", "equip2", "equip3"];
export const SKILLS_KEYS: Array<keyof UserCharaDataItem> = ["ex", "ns", "ps", "sub"];
export const PROGRESS_STATES: Array<keyof ProgressState> = ["current", "target"];
export const INPUT_DISPLAY_INFO: { [key in keyof InputDisplays]: string } = {
  isDisplayLevel: "レベル",
  isDisplayEquips: "装備",
  isDisplaySkills: "スキル",
};
export const KEY_NAME_OF_USER_CHARA_DATA: { [key in keyof UserCharaDataItem]: string } = {
  level: "レベル",
  equip1: "装備1",
  equip2: "装備2",
  equip3: "装備3",
  ex: "EX",
  ns: "NS",
  ps: "PS",
  sub: "Sub",
};

export const NORMAL_AP_COST = 10; // 通常のAP消費
