import { ALL_EQUIPS_NAME } from "@/const-ba-info/equips-info";
import { CharasData } from "@/types/ba-chara-data";
import { EquipName } from "@/types/ba-primitive-types";
import { UserCharaData, UserCharaDataItem, UserEquipInventory } from "@/types/ba-userdata-type";
import { CalcType, GroupedBy, Magnification, RangeValues } from "@/types/options";
import {
  getValidatedDataFromLocalStorage,
  isSelectedCharas,
  isUserCharaData,
  isUserEquipInventory,
} from "@/utils/typeValidationUtil";

export class UserCharaDataService {
  private initUserCharaData = (
    currentInfoStr: string | null,
    charaData: CharasData,
    rangeValues: RangeValues
  ) => {
    // バリデーションして、通らなかったら空のオブジェクトを現在の情報とする
    const currentInfo = getValidatedDataFromLocalStorage(
      currentInfoStr,
      isUserCharaData,
      {}
    ) as UserCharaData;
    const currentCharaSet = new Set(Object.keys(currentInfo));

    const outputUserCharaData = { ...currentInfo };
    for (const charaName of Object.keys(charaData)) {
      let currentUserCharaDataItem: Partial<UserCharaDataItem> = {};
      if (currentCharaSet.has(charaName)) {
        // ローカルストレージの中に、キャラの名前がある場合取得
        currentUserCharaDataItem = currentInfo[charaName];
      } else {
        currentUserCharaDataItem = {};
      }
      // デフォルトのデータ
      const initUserCharaDataItem: UserCharaDataItem = {
        level: { current: 1, target: rangeValues.level.max },
        equip1: { current: 1, target: rangeValues.equip1.max },
        equip2: { current: 1, target: rangeValues.equip2.max },
        equip3: { current: 1, target: rangeValues.equip3.max },
        ex: { current: 1, target: rangeValues.ex.max },
        ns: { current: 1, target: rangeValues.ns.max },
        ps: { current: 1, target: rangeValues.ps.max },
        sub: { current: 1, target: rangeValues.sub.max },
      };
      // 存在しない場合はデフォルトのデータをセット
      const outputUserCharaDataItem = { ...initUserCharaDataItem, ...currentUserCharaDataItem };
      outputUserCharaData[charaName] = outputUserCharaDataItem;
    }

    return outputUserCharaData;
  };
  public loadFromLocalStorage(charaData: CharasData, rangeValues: RangeValues): UserCharaData {
    // ローカルストレージからデータを取得
    const currentInfoStr = localStorage.getItem("userCharaData");
    const userCharaData = this.initUserCharaData(currentInfoStr, charaData, rangeValues);

    return userCharaData;
  }
  public saveToLocalStorage(userCharaData: UserCharaData): void {
    // ローカルストレージにデータを保存
    localStorage.setItem("userCharaData", JSON.stringify(userCharaData));
  }
}

export class UserEquipInventoryService {
  // プロパティの宣言

  // コンストラクタ
  constructor() {}
  private initUserEquipInventory = (currentInfoStr: string | null, calcOutputTiers: string[]) => {
    const currentInfo = getValidatedDataFromLocalStorage(
      currentInfoStr,
      isUserEquipInventory,
      {}
    ) as UserEquipInventory;

    const output: UserEquipInventory = {};

    calcOutputTiers.forEach((tier) => {
      // WARNING:ここは装備の種類は変わらない前提（もし装備の種類が増えたらここも直す必要がある）
      if (Object.keys(currentInfo).includes(tier)) {
        output[tier] = currentInfo[tier];
      } else {
        output[tier] = {} as { [key in EquipName]: number };
        ALL_EQUIPS_NAME.forEach((equipName) => {
          output[tier][equipName] = 0;
        });
      }
    });

    return output;
  };
  public loadFromLocalStorage(calcOutputTiers: string[]): UserEquipInventory {
    // ローカルストレージからデータを取得
    const currentInfoStr = localStorage.getItem("userEquipInventory");
    const userEquipInventory = this.initUserEquipInventory(currentInfoStr, calcOutputTiers);

    return userEquipInventory;
  }
  public saveToLocalStorage(userEquipInventory: UserEquipInventory): void {
    // ローカルストレージにデータを保存
    localStorage.setItem("userEquipInventory", JSON.stringify(userEquipInventory));
  }
}

export class UserCharaSelectService {
  // コンストラクタ
  public loadFromLocalStorage(charaData: CharasData): string[] {
    const allCharaSet = new Set(Object.keys(charaData));
    // ローカルストレージからデータを取得
    const selectedCharasStr = localStorage.getItem("selectedCharas");
    const currentSelected = getValidatedDataFromLocalStorage(
      selectedCharasStr,
      isSelectedCharas,
      []
    ) as string[];

    if (currentSelected.length > 0) {
      return currentSelected.filter((chara) => allCharaSet.has(chara));
    } else {
      return ["アイリ", "アイリ（バンド）"];
    }
  }
  public saveToLocalStorage(selectedCharas: string[]): void {
    // ローカルストレージにデータを保存
    localStorage.setItem("selectedCharas", JSON.stringify(selectedCharas));
  }
}

export class UserOptionsService {
  // プロパティの宣言

  public loadFromLocalStorage() {
    const currentIsDisplayOnlyLack = localStorage.getItem("isDisplayOnlyLack");
    const isDisplayOnlyLack = currentIsDisplayOnlyLack === "true";

    const currentIsConsiderCurrentEquip = localStorage.getItem("isConsiderCurrentEquip");
    const isConsiderCurrentEquip = currentIsConsiderCurrentEquip === "true";

    const currentIsTargetDisplay = localStorage.getItem("isTargetDisplay");
    const isTargetDisplay = currentIsTargetDisplay === "true";

    const currentCalcType = localStorage.getItem("calcType");
    const calcType: CalcType = currentCalcType === "不足分" ? "不足分" : "通常";

    const magnification = localStorage.getItem("magnification");
    const magnificationValue: Magnification =
      magnification === "2" || magnification === "3" ? (Number(magnification) as 2 | 3) : 1;

    const groupedBy: GroupedBy =
      localStorage.getItem("groupedBy") === "tier" ? "tier" : "equipName";
    return {
      isDisplayOnlyLack,
      isConsiderCurrentEquip,
      isTargetDisplay,
      calcType,
      groupedBy,
      magnification: magnificationValue,
    };
  }
  public saveToLocalStorage(isTargetDisplay: boolean): void {
    // ローカルストレージにデータを保存
    localStorage.setItem("isTargetDisplay", isTargetDisplay.toString());
  }
}
