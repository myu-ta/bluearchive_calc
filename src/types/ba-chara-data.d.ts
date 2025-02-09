import {
  CharaName,
  Equip1Name,
  Equip2Name,
  Equip3Name,
  ImgURL,
  Rarity,
  SchoolName,
} from "./ba-primitive-types";

export type CharaInfo = {
  charaName: CharaName;
  equip1: Equip1Name;
  equip2: Equip2Name;
  equip3: Equip3Name;
  imgUrl: string;
  rarity?: Rarity;
  weaponType?: string;
  cover?: string;
  role?: string;
  position?: string;
  class?: string;
  school?: SchoolName;
  attack?: string;
  defense?: string;
  urban?: string;
  outdoor?: string;
  indoor?: string;
};

export type CharasData = {
  [key: CharaName]: CharaInfo;
};

// export type EquipRequirement = { [key: string]: number[] };
export type EquipRequirement = number[][];
// T2, T3, T4, T5....の必要数
// [15, 0, 0, 0, 0, 0, 0, 0, 0], // T1 -> T2
// [0, 20, 0, 0, 0, 0, 0, 0, 0], // T2 -> T3
// [10, 0, 30, 0, 0, 0, 0, 0, 0],
// [15, 20, 0, 35, 0, 0, 0, 0, 0],
// [0, 5, 15, 0, 40, 0, 0, 0, 0],
// [0, 0, 5, 15, 0, 40, 0, 0, 0],
// [0, 0, 0, 5, 15, 0, 40, 0, 0],
// [0, 0, 0, 0, 10, 15, 0, 50, 0],
