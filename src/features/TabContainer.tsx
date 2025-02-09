"use client";
import { CalcEquipTab } from "@/features/CalcTab/CalcEqipsTab";
import { EquipEditTab } from "@/features/EquipEditTab/EquipEditTab";
import { loadOptions } from "@/hooks/useOptions";
import {
  loadUserCharaData,
  loadUserCharaSelect,
  loadUserEquipInventory,
} from "@/hooks/useUserData";
import { TAB_NAMES } from "@/utils/constants";
import { useState } from "react";

type TabContainerProps = {
  // userCharaDataService: UserCharaDataService;
  // userEquipInventoryService: UserEquipInventoryService;
  // userCharaSelectService: UserCharaSelectService;
  // equipsGrindCalcService: EquipsGrindCalcService;
};

export const TabContainer: React.FC<TabContainerProps> = () => {
  const [activeTab, setActiveTab] = useState(0);
  // ローカルストレージから読み込む処理(ここでjotaiのatomへのset処理を行う)
  const isLoadingUserCharaData = loadUserCharaData();
  const isLoadingUserCharaSelect = loadUserCharaSelect();
  const isLoadingUserEquipInventoryData = loadUserEquipInventory();
  const isLoadingUserOption = loadOptions();
  if (
    isLoadingUserCharaData ||
    isLoadingUserCharaSelect ||
    isLoadingUserEquipInventoryData ||
    isLoadingUserOption
  ) {
    return <div></div>;
  }
  return (
    <div>
      <div
        role="tablist"
        className="tabs tabs-bordered xs:tabs-xs sm:tabs-lg fixed top-0 w-full z-50"
      >
        {TAB_NAMES.map((tabName, idx) => (
          <a
            key={tabName}
            role="tab"
            className={
              activeTab === idx
                ? "tab tab-active bg-blue-400 text-blue-50 text-xs font-bold sm:text-lg"
                : "tab text-xs sm:text-lg bg-white"
            }
            onClick={() => setActiveTab(idx)}
          >
            {tabName}
          </a>
        ))}
      </div>
      {activeTab === 0 && <CalcEquipTab />}
      {activeTab === 1 && <EquipEditTab />}
    </div>
  );
};
