import {
  TIER_DROP_PROB,
  TIER_MINUS_2_DROP_PROB,
  TIER_MINUS_3_DROP_PROB,
} from "@/const-ba-info/tier-drop-probability";
import { CalcResultWithDiff, DropResult, GrindResultWithNum } from "@/types/ba-calc";
import { EquipGrind } from "@/types/ba-equip-grind";
import * as solver from "@bygdle/javascript-lp-solver";

const ordinalNums: Array<"first" | "second" | "third"> = ["first", "second", "third"];

export const solveEquipGrind = (
  equipsGrinds: EquipGrind[],
  calcResultWithDiffs: CalcResultWithDiff[],
  isDiff = false,
  magnification: 1 | 2 | 3
) => {
  // 回る回数
  const constraints: { [key in string]: { min: number } } = {};
  const variables: { [key in string]: { [key in string]: number } } = {};

  calcResultWithDiffs.forEach((result) => {
    if (isDiff && result.diff >= 0) {
      // diffを使って計算し、なおかつdiffが0以上の場合、装備は足りているので計算する必要がない
      return;
    }
    const uniqueName = result.equipName + result.tier;
    constraints[uniqueName] = {
      min: isDiff ? Math.abs(result.diff) : result.num,
    };
  });
  equipsGrinds.forEach((grind) => {
    const equation: { [key in string]: number } = { total: 1 };
    const grindTierStr = "T" + grind.tier;
    const grindTierStrMinus2 = "T" + (grind.tier - 2);
    const grindTierStrMinus3 = "T" + (grind.tier - 3);
    calcResultWithDiffs.forEach((result) => {
      if (isDiff && result.diff >= 0) {
        // diffを使って計算し、なおかつdiffが0以上の場合、装備は足りているので計算する必要がない
        return;
      }
      const uniqueName = result.equipName + result.tier;
      ordinalNums.forEach((ordinalNum) => {
        const grindEquipName = grind[ordinalNum];
        if (grindTierStr === result.tier && grindEquipName === result.equipName) {
          equation[uniqueName] = TIER_DROP_PROB[grind.tier][ordinalNum] * magnification;
        } else if (grindTierStrMinus2 === result.tier && grindEquipName === result.equipName) {
          // マイナス2のTierの場合
          equation[uniqueName] = TIER_MINUS_2_DROP_PROB[ordinalNum] * magnification;
        } else if (grindTierStrMinus3 === result.tier && grindEquipName === result.equipName) {
          // マイナス3のTierの場合
          equation[uniqueName] = TIER_MINUS_3_DROP_PROB[ordinalNum] * magnification;
        } else {
        }
      });
    });
    variables[grind.areaName] = equation;
  });

  const model = {
    optimize: "total",
    opType: "min" as "min" | "max",
    constraints: constraints,
    variables: variables,
  };
  const res = solver.Solve(model);
  const excluededKeys = ["feasible", "result", "bounded"];

  // {エリア名: 周回数}のオブジェクト
  const filteredResults = Object.keys(res)
    .filter((key) => !excluededKeys.includes(key)) // 許可されたキーだけを残す
    .reduce(
      (obj, key) => {
        obj[key] = Math.ceil(res[key] as number) || 0;
        return obj;
      },
      {} as { [key: string]: number }
    );

  const displayResult = equipsGrinds
    .filter((grind) => grind.areaName in filteredResults)
    .map((grind) => {
      const grindNum = filteredResults[grind.areaName];
      const grindsWithNum = { ...grind, grindNum: grindNum };
      const dropItems = getDropEquipNum(grindsWithNum, magnification);
      return { grindNum: grindNum, areaName: grind.areaName, dropItems: dropItems };
    });

  return displayResult;
};

const getDropEquipNum = (grind: GrindResultWithNum, magnification: number) => {
  //あるエリアを周回した時に、その回数からドロップ数を計算する関数
  const mainEquips = [] as DropResult[];
  const minus2Equips = [] as DropResult[];
  const minus3Equips = [] as DropResult[];
  ordinalNums.forEach((ordinalNum) => {
    const equipName = grind[ordinalNum];
    // 当該Tierで、n番目の場合にドロップする数
    const dropNum = TIER_DROP_PROB[grind.tier][ordinalNum] * grind.grindNum * magnification;
    mainEquips.push({ dropNum: Math.ceil(dropNum), tier: "T" + grind.tier, equipName: equipName });
    // Tier - 2のドロップ
    if (grind.tier >= 4) {
      // T4 -> T2
      const tierMinus2 = grind.tier - 2;
      const dropNumMinus2 = TIER_MINUS_2_DROP_PROB[ordinalNum] * grind.grindNum * magnification;
      minus2Equips.push({
        dropNum: Math.ceil(dropNumMinus2),
        tier: "T" + tierMinus2,
        equipName: equipName,
      });
    }
    if (grind.tier >= 5) {
      // T5 -> T2
      const tierMinus3 = grind.tier - 3;
      const dropNumMinus3 = TIER_MINUS_3_DROP_PROB[ordinalNum] * grind.grindNum * magnification;
      minus3Equips.push({
        dropNum: Math.ceil(dropNumMinus3),
        tier: "T" + tierMinus3,
        equipName: equipName,
      });
    }
  });

  return [...mainEquips, ...minus2Equips, ...minus3Equips];
};
// const testParams: CalcResultWithDiff[] = [
//   {
//     equipName: "帽子",
//     diff: 10,
//     num: 30,
//     tier: "T4",
//   },
//   {
//     equipName: "腕時計",
//     diff: 10,
//     num: 50,
//     tier: "T4",
//   },
//   {
//     equipName: "ネックレス",
//     diff: 10,
//     num: 20,
//     tier: "T4",
//   },
// ];
// const testLP = () => {
//   const startTime = performance.now(); // 開始時間
//   solveEquipGrind(testParams, false, 3);
//   const endTime = performance.now();
//   console.log(endTime - startTime); // 何ミリ秒かかったかを表示する
// }; // 終了時間
