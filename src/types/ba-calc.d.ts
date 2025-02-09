import { EquipName } from "./ba-primitive-types";

export type CalcResult = { equipName: EquipName; tier: string; num: number; tierNum: number };
export type CalcResultWithDiff = {
  equipName: EquipName;
  tier: string;
  num: number;
  diff: number;
  tierNum: number;
};
export type GrindResultWithNum = {
  grindNum: number;
  areaName: string;
  first: EquipName;
  second: EquipName;
  third: EquipName;
  tier: number;
};

export type DisplayGrindResult = {
  grindNum: number;
  areaName: string;
  dropItems: DropResult[];
};
export type DropResult = {
  dropNum: number;
  tier: string;
  equipName: EquipName;
};
