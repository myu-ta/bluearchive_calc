import { UserCharaData, UserEquipInventory } from "@/types/ba-userdata-type";
import { atom } from "jotai";

export const userCharaDataAtom = atom<UserCharaData>({});
export const selectedCharasAtom = atom<string[]>([]);
export const userEquipInventoryAtom = atom<UserEquipInventory>({});
