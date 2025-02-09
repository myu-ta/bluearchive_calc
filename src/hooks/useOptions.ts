import {
  calcTypeAtom,
  groupedByAtom,
  isConsiderCurrentEquipAtom,
  isDisplayOnlyLackAtom,
  isTargetDisplayAtom,
  magnificationAtom,
} from "@/atoms/optionsAtoms";
import { UserOptionsService } from "@/lib/userDataService";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";

export const loadOptions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const setIsConsiderCurrentEquip = useSetAtom(isConsiderCurrentEquipAtom);
  const setIsDisplayOnlyLack = useSetAtom(isDisplayOnlyLackAtom);
  const setIsTargetDisplayAtom = useSetAtom(isTargetDisplayAtom);
  const setCalcType = useSetAtom(calcTypeAtom);
  const setMagnification = useSetAtom(magnificationAtom);
  const setGroupedBy = useSetAtom(groupedByAtom);

  useEffect(() => {
    const userOptionsService = new UserOptionsService();
    const options = userOptionsService.loadFromLocalStorage();
    setIsConsiderCurrentEquip(options.isConsiderCurrentEquip);
    setIsDisplayOnlyLack(options.isDisplayOnlyLack);
    setIsTargetDisplayAtom(options.isTargetDisplay);
    setCalcType(options.calcType);
    setMagnification(options.magnification);
    setIsLoading(false);
    setGroupedBy(options.groupedBy);
  }, []);

  return isLoading;
};
