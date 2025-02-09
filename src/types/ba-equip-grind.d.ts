import { Equip1Name, Equip2Name, Equip3Name, EquipName } from "./ba-primitive-types";

export type EquipGrind = {
  // 周回した際にドロップするもの
  areaName: string;
  first: EquipName;
  second: EquipName;
  third: EquipName;
  tier: number;
};

export type EquipDropProb = { first: number; second: number; third: number };
