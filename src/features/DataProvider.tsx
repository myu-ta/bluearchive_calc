"use client";
import { CharasData, EquipRequirement } from "@/types/ba-chara-data";
import { EquipsData } from "@/types/ba-consumption-items";
import { EquipGrind } from "@/types/ba-equip-grind";
import { RangeValues } from "@/types/options";
import { createContext, useContext } from "react";
type FetchedDataContextType = {
  eqiupsData: EquipsData;
  equipRequirement: EquipRequirement;
  equipsGrind: EquipGrind[];
  charaData: CharasData;
  rangeValues: RangeValues;
  calcOutputTiers: string[];
};
const FetchedDataContext = createContext<FetchedDataContextType | undefined>(undefined);

export const FetchedDataProvider: React.FC<{
  value: FetchedDataContextType;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return <FetchedDataContext.Provider value={value}>{children}</FetchedDataContext.Provider>;
};
export const useFetchedDataContext = () => {
  const context = useContext(FetchedDataContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};
