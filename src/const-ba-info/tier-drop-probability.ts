// WARNING 装備品が増えたら変更
import { EquipDropProb } from "@/types/ba-equip-grind";

export const TIER_DROP_PROB: { [key: number]: EquipDropProb } = {
  // tier: {first: 確率, second: 確率,  third: 確率}
  2: {
    first: 1.2,
    second: 0.9,
    third: 0.9,
  },
  3: {
    first: 0.9,
    second: 0.675,
    third: 0.675,
  },
  4: {
    first: 0.6,
    second: 0.45,
    third: 0.45,
  },
  5: {
    first: 0.336,
    second: 0.252,
    third: 0.252,
  },
  6: {
    first: 0.336,
    second: 0.252,
    third: 0.252,
  },
  7: {
    first: 0.336,
    second: 0.252,
    third: 0.252,
  },
  8: {
    first: 0.336,
    second: 0.252,
    third: 0.252,
  },
  9: {
    first: 0.336,
    second: 0.252,
    third: 0.252,
  },
  10: {
    first: 0.336,
    second: 0.252,
    third: 0.252,
  },
};
export const TIER_MINUS_2_DROP_PROB = { first: 0.2, second: 0.15, third: 0.15 };
export const TIER_MINUS_3_DROP_PROB = { first: 0.1, second: 0.075, third: 0.075 };
