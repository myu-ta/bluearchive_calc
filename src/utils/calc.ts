import {
  ALL_EQUIPS_NAME,
  EQUIP1_NAMES,
  EQUIP2_NAMES,
  EQUIP3_NAMES,
  REVERSED_ALL_EQUIPS_NAME,
} from "@/const-ba-info/equips-info";
import { CalcResult, CalcResultWithDiff } from "@/types/ba-calc";
import { CharasData, EquipRequirement } from "@/types/ba-chara-data";
import {
  CharaName,
  Equip1Name,
  Equip2Name,
  Equip3Name,
  EquipName,
} from "@/types/ba-primitive-types";
import { UserCharaData, UserEquipInventory } from "@/types/ba-userdata-type";
import { RangeValues } from "@/types/options";

export const calcRequiredEquips = (
  charaData: CharasData,
  equipRequirement: EquipRequirement,
  rangeValues: RangeValues,
  userCharaData: UserCharaData,
  selectedCharas: CharaName[]
) => {
  const result: { [key: string]: number[] } = {};
  // ALL_EQUIPS_NAMEの中のすべてのNAMEについて、キーをネーム、値がすべてが0の配列でオブジェクトを作成する初期化を行う
  // このオブジェクトを後の処理で更新して、最終的にはresultとする
  // EQUIP1_NAMESの場合はrangeValues.equip1.max分の長さの、すべてが0の配列にする
  // EQUIP2_NAMESの場合はrangeValues.equip2.max分の長さの、すべてが0の配列にする
  // EQUIP3_NAMESの場合はrangeValues.equip3.max分の長さの、すべてが0の配列にする

  // 初期化
  const equip1ArrayLength = rangeValues.equip1.max - 1;
  const equip2ArrayLength = rangeValues.equip2.max - 1;
  const equip3ArrayLength = rangeValues.equip3.max - 1;

  for (const equipName of ALL_EQUIPS_NAME) {
    if (EQUIP1_NAMES.includes(equipName as Equip1Name)) {
      result[equipName] = Array(equip1ArrayLength).fill(0);
    } else if (EQUIP2_NAMES.includes(equipName as Equip2Name)) {
      result[equipName] = Array(equip2ArrayLength).fill(0);
    } else if (EQUIP3_NAMES.includes(equipName as Equip3Name)) {
      result[equipName] = Array(equip3ArrayLength).fill(0);
    } else {
    }
  }

  for (const charaName of selectedCharas) {
    // userCharaDataItemから、equip1, equip2, equip3のcurrentとtargetを取得する
    const charaDataItem = userCharaData[charaName];
    // CharaInfoから、equip1, equip2, equip3の名前を取得する
    // userCharaDataにキャラ名でアクセスしてuserCharaDataItemを取る
    const charaInfo = charaData[charaName];

    if (!charaDataItem || !charaInfo) continue;

    const equip1Name = charaInfo.equip1;
    const equip2Name = charaInfo.equip2;
    const equip3Name = charaInfo.equip3;

    const { equip1, equip2, equip3 } = charaDataItem;
    const equip1Requirement = sumColumnsInRange(
      equipRequirement,
      equip1.current - 1,
      equip1.target - 2
    );
    const equip2Requirement = sumColumnsInRange(
      equipRequirement,
      equip2.current - 1,
      equip2.target - 2
    );
    const equip3Requirement = sumColumnsInRange(
      equipRequirement,
      equip3.current - 1,
      equip3.target - 2
    );
    // charaDataから、キャラの情報（CharaInfo）を取得する

    // 必要数を加算
    // result[equipName]にある配列と、新たに取得した配列を、列ごとに足し合わせる（列の長さは同じことが保証されている）

    if (result[equip1Name]) {
      for (let i = 0; i < Math.min(equip1Requirement.length, equip1ArrayLength); i++) {
        result[equip1Name][i] += equip1Requirement[i];
      }
    }

    if (result[equip2Name]) {
      for (let i = 0; i < Math.min(equip2Requirement.length, equip2ArrayLength); i++) {
        result[equip2Name][i] += equip2Requirement[i];
      }
    }

    if (result[equip3Name]) {
      for (let i = 0; i < Math.min(equip3Requirement.length, equip3ArrayLength); i++) {
        result[equip3Name][i] += equip3Requirement[i];
      }
    }
  }

  return result;
};

export const convertResultToDisplayArray = (result: { [key: string]: number[] }) => {
  const equipArray: CalcResult[] = [];

  for (const equipName in result) {
    const counts = result[equipName as EquipName];
    for (let i = 0; i < counts.length; i++) {
      if (counts[i] > 0) {
        equipArray.push({
          equipName: equipName as EquipName,
          tier: `T${i + 2}`,
          tierNum: i + 2,
          num: counts[i],
        });
      }
    }
  }

  return equipArray;
};

export const groupByTier = (equipArray: CalcResultWithDiff[]) => {
  return equipArray.reduce(
    (acc, item) => {
      if (!acc[item.tier]) {
        acc[item.tier] = [];
      }
      acc[item.tier].push(item);
      return acc;
    },
    {} as Record<string, CalcResultWithDiff[]>
  );
};

export const groupByEquipName = (equipArray: CalcResultWithDiff[]) => {
  return equipArray.reduce(
    (acc, item) => {
      if (!acc[item.equipName]) {
        acc[item.equipName] = [];
      }
      acc[item.equipName].push(item);
      return acc;
    },
    {} as Record<string, CalcResultWithDiff[]>
  );
};

export const getDisplyItemsWithDiff = (
  displayItems: CalcResult[],
  userEquipInventory: UserEquipInventory
): CalcResultWithDiff[] => {
  const itemsWithDiff = displayItems.map((displayItem) => {
    const currentTier = displayItem.tier;
    const currentEquipName = displayItem.equipName;
    const currentNum = userEquipInventory[currentTier][currentEquipName];

    return { ...displayItem, diff: currentNum - displayItem.num };
  });
  // 武器名とtierでソート
  return itemsWithDiff.sort(sortByMultipleKeys(["tierNum", "equipName"]));
};

const sortByMultipleKeys =
  (keys: (keyof CalcResultWithDiff)[]) => (a: CalcResultWithDiff, b: CalcResultWithDiff) => {
    for (let key of keys) {
      if (key === "equipName") {
        return ALL_EQUIPS_NAME.indexOf(a.equipName) - ALL_EQUIPS_NAME.indexOf(b.equipName);
      }
      // 逆順ソート
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
    }
    return 0;
  };

const sumColumnsInRange = (arr: number[][], startRow: number, endRow: number): number[] => {
  // e.g.) arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]], startRow = 0, endRow = 1
  // => [5, 7, 9]
  if (arr.length === 0) return [];

  const rowCount = arr.length;
  const colCount = arr[0].length;

  // 境界チェック
  if (startRow > endRow) return new Array(colCount).fill(0);
  startRow = Math.max(0, startRow);
  endRow = Math.min(rowCount - 1, endRow);

  const result: number[] = new Array(colCount).fill(0);

  for (let j = 0; j < colCount; j++) {
    for (let i = startRow; i <= endRow; i++) {
      result[j] += arr[i][j];
    }
  }

  return result;
};
