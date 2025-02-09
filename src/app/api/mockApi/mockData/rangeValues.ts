import { RangeValues } from "@/types/options";

// TODO ここも定数ではなく、DBから取得するようにしたい
export const RANGE_VALUES: RangeValues = {
  equip1: { min: 1, max: 9 },
  equip2: { min: 1, max: 9 },
  equip3: { min: 1, max: 9 },
  level: { min: 1, max: 90 },
  ex: { min: 1, max: 5 },
  ns: { min: 1, max: 10 },
  ps: { min: 1, max: 10 },
  sub: { min: 1, max: 10 },
};
// WARNING 基本的には装備品のTierが増えたら変更する

export const CALC_OUTPUT_TIERS = ["T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9"];
