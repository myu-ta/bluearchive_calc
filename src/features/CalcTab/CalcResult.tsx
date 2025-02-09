import { EquipIcon } from "@/components/EquipIcon";
import { CalcResultWithDiff, DisplayGrindResult } from "@/types/ba-calc";
import {
  calcRequiredEquips,
  convertResultToDisplayArray,
  getDisplyItemsWithDiff,
} from "@/utils/calc";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ListCard } from "@/components/ListCard";
import { ALL_EQUIPS_NAME } from "@/const-ba-info/equips-info";
import { EditCalcResultEquipNum } from "@/components/EditCalcResultEquipNum";
import { GrindResult } from "@/components/GrindResult";
import { solveEquipGrind } from "@/utils/linearProblem";
import { useAtom, useAtomValue } from "jotai";
import {
  selectedCharasAtom,
  userCharaDataAtom,
  userEquipInventoryAtom,
} from "@/atoms/userDataAtoms";
import {
  calcTypeAtom,
  groupedByAtom,
  isConsiderCurrentEquipAtom,
  isDisplayOnlyLackAtom,
  magnificationAtom,
} from "@/atoms/optionsAtoms";
import { useFetchedDataContext } from "../DataProvider";
import { GroupedBy } from "@/types/options";
import { EquipName } from "@/types/ba-primitive-types";
import { UserEquipInventoryService } from "@/lib/userDataService";

export const CalcResultComponent = () => {
  const [userEquipInventory, setUserEquipInventory] = useAtom(userEquipInventoryAtom);
  const userCharaData = useAtomValue(userCharaDataAtom);
  const selectedCharas = useAtomValue(selectedCharasAtom);
  const { charaData, equipRequirement, equipsGrind, rangeValues, eqiupsData, calcOutputTiers } =
    useFetchedDataContext();
  const [isConsiderCurrentEquip, setIsConsiderCurrentEquip] = useAtom(isConsiderCurrentEquipAtom);
  const [isDisplayOnlyLack, setIsDisplayOnlyLack] = useAtom(isDisplayOnlyLackAtom);
  const [calcType, setCalcType] = useAtom(calcTypeAtom);
  const [magnification, setMagnification] = useAtom(magnificationAtom);

  const [calcResultWithDiff, setCalcResultWithDiff] = useState<CalcResultWithDiff[]>([]);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [showCalcErrorMessage, setShowCalcErrorMessage] = useState(false);
  const [groupedBy, setGroupedBy] = useAtom(groupedByAtom); // 計算結果のgroupbyを、Tierでやるか装備でやるか
  const [currentTab, setCurrentTab] = useState("equipNumTab");
  const [grindResult, setGrindResult] = useState<DisplayGrindResult[]>([]);

  const handleEquipEditChange = useCallback(
    (tier: string, equipName: EquipName, value: number | "") => {
      const newInventory = { ...userEquipInventory };
      const newEquipsNums = { ...newInventory[tier] };
      newEquipsNums[equipName] = Number(value);
      newInventory[tier] = newEquipsNums;
      setUserEquipInventory(newInventory);
      new UserEquipInventoryService().saveToLocalStorage(newInventory);
    },
    [userEquipInventory]
  );

  // 現在選択されているキャラのデータ
  // ボタンのクリックイベントハンドラ
  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleGroupBy = useCallback((targetGroupedBy: GroupedBy) => {
    setGroupedBy(targetGroupedBy);
    localStorage.setItem("groupedBy", targetGroupedBy);
  }, []);

  const handleConsiderCurrentEquip = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsConsiderCurrentEquip(e.target.checked);
      localStorage.setItem("isConsiderCurrentEquip", e.target.checked.toString());
    },
    [isConsiderCurrentEquip]
  );

  const handleIsOnlyLack = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsDisplayOnlyLack(e.target.checked);
      localStorage.setItem("isDisplayOnlyLack", e.target.checked.toString());
    },
    [isDisplayOnlyLack]
  );
  const calcButtonClick = useCallback(() => {
    setCalcResultWithDiff([]);
    const result = calcRequiredEquips(
      charaData,
      equipRequirement,
      rangeValues,
      userCharaData,
      selectedCharas
    );
    const calcResult = convertResultToDisplayArray(result);
    // 現在の装備数との差を計算する
    const calcResultWithDiff = getDisplyItemsWithDiff(calcResult, userEquipInventory);
    if (calcResult.length === 0) {
      setShowCalcErrorMessage(true);
      setTimeout(() => {
        setShowCalcErrorMessage(false);
      }, 1000);
      return;
    }
    setCalcResultWithDiff(calcResultWithDiff);
    const solveAns = solveEquipGrind(
      equipsGrind,
      calcResultWithDiff,
      calcType === "不足分",
      magnification
    );
    setGrindResult(solveAns);
  }, [userCharaData, selectedCharas, userEquipInventory, magnification, calcType]);

  const handleDropRateClick = useCallback((rate: 1 | 2 | 3) => {
    setMagnification(rate);
    localStorage.setItem("magnification", rate.toString());
  }, []);
  const handleCalcTypeClick = useCallback((calcTypeOption: "通常" | "不足分") => {
    setCalcType(calcTypeOption);
    localStorage.setItem("calcType", calcTypeOption);
  }, []);
  const [displayKeys, filteredDisplays] = useMemo(() => {
    // isDisplayOnlyLackがtrueかつ、isConsiderCurrentEquipがTrueの場合のみ、不足してるものだけ表示
    const filteredDisplays =
      isDisplayOnlyLack && isConsiderCurrentEquip
        ? calcResultWithDiff.filter((item) => item.diff < 0)
        : calcResultWithDiff;
    //何でgroupbyするか
    const groupedByDisplays = Object.groupBy(filteredDisplays, (item) => item[groupedBy]);
    const keys =
      groupedBy === "equipName"
        ? ALL_EQUIPS_NAME.filter((name) => Object.keys(groupedByDisplays).includes(name))
        : calcOutputTiers.filter((tierName) => Object.keys(groupedByDisplays).includes(tierName));
    return [keys, groupedByDisplays];
  }, [isDisplayOnlyLack, calcResultWithDiff, groupedBy, isConsiderCurrentEquip]);

  useEffect(() => {
    if (calcResultWithDiff.length === 0) {
      return;
    }
    scrollToTarget();
  }, [calcResultWithDiff]);
  // キャラを選択し直したら計算結果が消えるようにする
  useEffect(() => setCalcResultWithDiff([]), [selectedCharas]);

  const tabsStyles = useMemo(() => {
    if (currentTab === "equipNumTab") {
      return ["tab [--tab-border-color:gray] tab-active", "tab [--tab-border-color:gray]"];
    } else {
      return ["tab [--tab-border-color:gray]", "tab [--tab-border-color:gray] tab-active"];
    }
  }, [currentTab]);

  return (
    <div className="flex flex-col items-center mb-5">
      {selectedCharas.length === 0 ? null : (
        <div className="flex flex-col items-center">
          <div className="collapse bg-gray-100 collapse-arrow" ref={targetRef}>
            <input type="checkbox" className="peer" defaultChecked />
            <div className="collapse-title text-md font-medium text-center peer-checked:bg-slate-50">
              周回数計算設定
            </div>
            <div className="collapse-content peer-checked:bg-slate-50">
              <p className="mt-2 text-sm sm:text-base font-semibold text-gray-900 bg-blue-100 p-2 rounded-lg shadow-xs text-center">
                ドロップ倍率
              </p>
              <div className="flex space-x-10">
                {[1, 2, 3].map((rate) => (
                  <label className="label cursor-pointer" key={rate}>
                    <input
                      type="radio"
                      name="rate"
                      value={rate}
                      checked={magnification === rate}
                      className="radio radio-sm checked:bg-blue-600"
                      onChange={() => handleDropRateClick(rate as 1 | 2 | 3)}
                    />
                    <span className="label-text ml-1 text-gray-800">{rate}倍</span>
                  </label>
                ))}
              </div>
              <p className="mt-3 text-sm sm:text-base font-semibold text-gray-900 bg-red-100 p-2 rounded-lg shadow-xs text-center">
                計算対象
              </p>
              <div className="flex space-x-10">
                {["通常", "不足分"].map((calcTypeOption) => (
                  <label className="label cursor-pointer" key={calcTypeOption}>
                    <input
                      type="radio"
                      name="calcType"
                      value={calcTypeOption}
                      checked={calcType === calcTypeOption}
                      className="radio radio-sm checked:bg-red-600"
                      onChange={() => handleCalcTypeClick(calcTypeOption as "通常" | "不足分")}
                    />
                    <span className="label-text ml-1 text-gray-800">{calcTypeOption}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-8">
            <button className="custom-button bg-sky-400 text-white mt-3" onClick={calcButtonClick}>
              計算する
            </button>
          </div>
        </div>
      )}

      <div className="sticky top-8 sm:top-12 bg-white w-full z-30">
        <div role="tablist" className="tabs tabs-bordered my-3 w-3/4 mx-auto">
          <a role="tab" className={tabsStyles[0]} onClick={() => setCurrentTab("equipNumTab")}>
            必要数
          </a>
          <a role="tab" className={tabsStyles[1]} onClick={() => setCurrentTab("grindTab")}>
            周回数
          </a>
        </div>
      </div>
      {currentTab !== "equipNumTab" && <GrindResult displayGrindResults={grindResult} />}
      {currentTab === "equipNumTab" && (
        <div className="w-full">
          {selectedCharas.length > 0 && (
            <div className="form-control mt-1">
              <label className="label cursor-pointer justify-center">
                <span className="label-text mr-2 text-sm">所持数との差を表示</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary toggle-sm sm:toggle-md"
                  checked={isConsiderCurrentEquip}
                  onChange={handleConsiderCurrentEquip}
                />
              </label>
            </div>
          )}
          {isConsiderCurrentEquip && (
            <div className="form-control">
              <label className="cursor-pointer label justify-center">
                <span className="label-text mr-2 text-sm">不足のみ表示</span>
                <input
                  type="checkbox"
                  checked={isDisplayOnlyLack}
                  onChange={handleIsOnlyLack}
                  className="checkbox checkbox-accent checkbox-sm sm:checkbox-md"
                />
              </label>
            </div>
          )}
          <p className="text-red-500 text-center text-sm sm:text-base">
            ※装備の所持数は、計算結果の必要数をクリックして変更できます
          </p>
          {selectedCharas.length > 0 && (
            <div className="flex justify-center space-x-8">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  aria-label="装備名ごと"
                  checked={groupedBy === "equipName"}
                  className="btn btn-sm"
                  value="equipName"
                  onChange={() => handleGroupBy("equipName")}
                  name="groupByRadio"
                />
              </label>
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  aria-label="装備Tierごと"
                  checked={groupedBy === "tier"}
                  value="tier"
                  className="btn btn-sm"
                  onChange={() => handleGroupBy("tier")}
                  name="groupByRadio"
                />
              </label>
            </div>
          )}
          <div className="mt-4 w-full">
            {displayKeys.map((key) => {
              // 当該Tierで表示するアイテム
              const groupedDisplays = filteredDisplays[key];
              return (
                <ListCard heading={key} key={key}>
                  {groupedDisplays?.map((item) => {
                    if (isConsiderCurrentEquip) {
                      const currentNum = userEquipInventory[item.tier][item.equipName];
                      // 不足してるものだけを表示する場合、diff>=0のものは非表示
                      return isDisplayOnlyLack && item.diff >= 0 ? null : (
                        <EquipIcon
                          equipName={item.equipName}
                          tier={item.tier}
                          key={item.equipName + item.num + item.tier}
                          imgUrl={eqiupsData[item.equipName][item.tier].imgUrl}
                        >
                          {/* 数字のところだけ自由に変えられるようになってる */}
                          <EditCalcResultEquipNum
                            currentNum={currentNum}
                            targetNum={item.num}
                            handleEditChange={(value: number) =>
                              handleEquipEditChange(item.tier, item.equipName, value)
                            }
                          />
                        </EquipIcon>
                      );
                    } else {
                      return (
                        <EquipIcon
                          equipName={item.equipName}
                          tier={item.tier}
                          key={item.equipName + item.num + item.tier}
                          imgUrl={eqiupsData[item.equipName][item.tier].imgUrl}
                        >
                          {/* 数字のところだけ自由に変えられるようになってる */}
                          <div className="my-auto col-span-2 w-11/12 text-center text-xs sm:text-base">
                            ×{item.num}
                          </div>
                        </EquipIcon>
                      );
                    }
                  })}
                </ListCard>
              );
            })}
          </div>
        </div>
      )}
      {showCalcErrorMessage && (
        <div className="fixed bottom-0 left-0 w-full p-3 bg-red-500 text-white text-center z-50 font-semibold text-lg">
          表示可能な計算結果がありません
        </div>
      )}
    </div>
  );
};
