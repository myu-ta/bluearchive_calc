import { EquipName } from "@/types/ba-primitive-types";
import {
  ProgressState,
  UserCharaData,
  UserCharaDataItem,
  UserEquipInventory,
} from "@/types/ba-userdata-type";

// ここからユーザーごとのキャラデータの型ガード
function isProgressState(obj: any): obj is ProgressState {
  return (
    obj &&
    (typeof obj.current === "number" || obj.current === "") &&
    (typeof obj.target === "number" || obj.target === "")
  );
}

function isUserCharaDataItem(obj: any): obj is UserCharaDataItem {
  return (
    obj &&
    isProgressState(obj.level) &&
    isProgressState(obj.equip1) &&
    isProgressState(obj.equip2) &&
    isProgressState(obj.equip3) &&
    isProgressState(obj.ex) &&
    isProgressState(obj.ns) &&
    isProgressState(obj.ps) &&
    isProgressState(obj.sub)
  );
}

export function isUserCharaData(obj: any): obj is UserCharaData {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  return Object.keys(obj).every((key) => isUserCharaDataItem(obj[key]));
}

// ここから装備データ型ガード
function isEquipName(key: any): key is EquipName {
  const equipNames: EquipName[] = [
    "帽子",
    "グローブ",
    "シューズ",
    "バッグ",
    "バッジ",
    "ヘアピン",
    "お守り",
    "腕時計",
    "ネックレス",
  ];
  return equipNames.includes(key);
}

export function isUserEquipInventory(obj: any): obj is UserEquipInventory {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  return Object.values(obj).every((value) => {
    if (typeof value !== "object" || value === null) {
      return false;
    }

    return Object.entries(value).every(([key, val]) => {
      return isEquipName(key) && typeof val === "number";
    });
  });
}

export function getValidatedDataFromLocalStorage(
  currentInfoStr: null | string,
  validateFunc: (obj: any) => boolean,
  initialVal: any
) {
  // localStorageから取得したstr | nullと、バリデーション関数、初期値を引数として、読み込み時のユーザーデータを取得する
  let currentInfo = initialVal;
  if (currentInfoStr === null) {
    // localStroageにデータがない場合、初期値を返す
    return initialVal;
  }
  try {
    currentInfo = JSON.parse(currentInfoStr);
  } catch (error) {
    // parseエラーの場合は、何も読み込まない
    return initialVal;
  }
  if (!validateFunc(currentInfo)) {
    // 型バリデーションが通らない場合、初期値を返す
    return initialVal;
  }
  return currentInfo;
}

export function isSelectedCharas(value: any): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}
