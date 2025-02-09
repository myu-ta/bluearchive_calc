export type CalcType = "通常" | "不足分";
export type Magnification = 1 | 2 | 3;
export type GroupedBy = "equipName" | "tier";
export type RangeValues = {
  equip1: { min: number; max: number };
  equip2: { min: number; max: number };
  equip3: { min: number; max: number };
  level: { min: number; max: number };
  ex: { min: number; max: number };
  ns: { min: number; max: number };
  ps: { min: number; max: number };
  sub: { min: number; max: number };
};
