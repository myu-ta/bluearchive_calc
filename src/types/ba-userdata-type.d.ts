import { EquipName } from "./ba-primitive-types";

export type UserCharaDataItem = {
  level: ProgressState;
  equip1: ProgressState;
  equip2: ProgressState;
  equip3: ProgressState;
  ex: ProgressState;
  ns: ProgressState;
  ps: ProgressState;
  sub: ProgressState;
};

export type UserCharaData = {
  [key: string]: UserCharaDataItem;
};

export type ProgressState = {
  current: number;
  target: number;
};

export type UserEquipInventory = {
  // ユーザーがどれくらい装備を持っているか
  [key: string]: {
    [key in EquipName]: number;
  };
  // {帽子: {T1: 14, T2:25, T3: 4}... "ネックレス": {T1: 14, T2:25, T3: 4}}
};
