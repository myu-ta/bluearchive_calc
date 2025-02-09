import { CharasData } from "@/types/ba-chara-data";
import { CharaName } from "@/types/ba-primitive-types";
import { UserCharaData } from "@/types/ba-userdata-type";
import { RangeValues } from "@/types/options";
import { CharaDataFilters, SortMethod, UserDataFilters } from "@/types/search-elements";

export const getCharaDataFilteredSorted = (
  charaData: CharasData,
  rangeValues: RangeValues,
  userCharaData: UserCharaData,
  charaDataFilters: CharaDataFilters,
  userDataFilters: UserDataFilters,
  sortMethod: SortMethod,
  selectedCharas: CharaName[] = []
): CharaName[] => {
  const selectedSet = new Set(selectedCharas);
  // キャラをフィルターしてソートした結果のキャラリストを取得
  const charaNameFilter = (charaName: CharaName): boolean => {
    if (selectedSet.has(charaName)) {
      return false;
    }
    // キャラ名検索にヒットするか
    const isHitCharaName = charaName.startsWith(charaDataFilters.charaName);
    // userDataFilters.isDisplayMaxLevelがfalseかつ、レベルがマックスのものは表示されない
    const isDisplayMaxEquips = userDataFilters.isDisplayMaxEquips;
    const isDisplayMaxLevel = userDataFilters.isDisplayMaxLevel;
    const isDisplayMaxSkills = userDataFilters.isDisplayMaxSkills;
    const currentLevel = userCharaData[charaName].level.current;

    const currentEquip1 = userCharaData[charaName].equip1.current;
    const currentEquip2 = userCharaData[charaName].equip2.current;
    const currentEquip3 = userCharaData[charaName].equip3.current;

    const currentEX = userCharaData[charaName].ex.current;
    const currentNS = userCharaData[charaName].ns.current;
    const currentPS = userCharaData[charaName].ps.current;
    const currentSub = userCharaData[charaName].sub.current;

    const isMaxLevel = currentLevel === rangeValues.level.max;
    const isSkillMax =
      currentEX === rangeValues.ex.max &&
      currentPS === rangeValues.ps.max &&
      currentNS === rangeValues.ns.max &&
      currentSub === rangeValues.sub.max;

    const isEquipsMax =
      currentEquip1 === rangeValues.equip1.max &&
      currentEquip2 === rangeValues.equip2.max &&
      currentEquip3 === rangeValues.equip3.max;

    // それぞれの観点から表示するかどうか決定
    //　レベルマックスであり、かつマックスを表示しない場合→false
    // それ以外はtrue
    const isDisplayInLevel = !isMaxLevel || isDisplayMaxLevel;
    const isDisplayInSkills = !isSkillMax || isDisplayMaxSkills;
    const isDisplayInEquips = !isEquipsMax || isDisplayMaxEquips;

    return isDisplayInLevel && isDisplayInSkills && isDisplayInEquips && isHitCharaName;
  };

  return [...selectedCharas, ...Object.keys(charaData).filter(charaNameFilter).sort()];
};
