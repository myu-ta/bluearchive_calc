import { CharaName } from "./ba-primitive-types";

// フィルターとソートの型を定義
export type CharaDataFilters = {
  // TODO 後で実装する
  charaName: CharaName;
};

export type UserDataFilters = {
  // 装備レベル全マックスのキャラを表示するか
  isDisplayMaxEquips: boolean;
  isDisplayMaxSkills: boolean;
  isDisplayMaxLevel: boolean;
};

export type SortMethod = { method: string; desc: boolean };

export type InputDisplays = {
  isDisplayLevel: boolean;
  isDisplayEquips: boolean;
  isDisplaySkills: boolean;
};
