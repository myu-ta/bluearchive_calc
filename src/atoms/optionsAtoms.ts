import { CalcType, GroupedBy, Magnification } from "@/types/options";
import { atom } from "jotai";

export const isConsiderCurrentEquipAtom = atom<boolean>(false);
export const isDisplayOnlyLackAtom = atom<boolean>(false);
export const isTargetDisplayAtom = atom<boolean>(true);
export const calcTypeAtom = atom<CalcType>("通常");
export const magnificationAtom = atom<Magnification>(1);
export const groupedByAtom = atom<GroupedBy>("equipName");
