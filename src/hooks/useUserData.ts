import { useFetchedDataContext } from "@/features/DataProvider";
import {
  UserCharaDataService,
  UserCharaSelectService,
  UserEquipInventoryService,
} from "@/lib/userDataService";
import { useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import {
  selectedCharasAtom,
  userCharaDataAtom,
  userEquipInventoryAtom,
} from "@/atoms/userDataAtoms";

export const loadUserCharaData = () => {
  // ローカルストレージからキャラの現在のデータを読み込む処理
  const setUserCharaData = useSetAtom(userCharaDataAtom);
  const [isLoading, setIsLoading] = useState(true);
  const { charaData, rangeValues } = useFetchedDataContext();

  useEffect(() => {
    const userCharaDataService = new UserCharaDataService();
    const currentUserCharaData = userCharaDataService.loadFromLocalStorage(charaData, rangeValues);
    setUserCharaData(currentUserCharaData);
    setIsLoading(false);
  }, []);

  return isLoading;
};

export const loadUserCharaSelect = () => {
  // ローカルストレージから選択中のキャラを読み込む処理
  const setSelectedCharas = useSetAtom(selectedCharasAtom);
  const [isLoading, setIsLoading] = useState(true);

  const { charaData } = useFetchedDataContext();
  useEffect(() => {
    const userCharaSelectService = new UserCharaSelectService();
    const currentUserCharaData = userCharaSelectService.loadFromLocalStorage(charaData);
    setSelectedCharas(currentUserCharaData);
    setIsLoading(false);
  }, []);

  return isLoading;
};

export const loadUserEquipInventory = () => {
  // ローカルストレージから装備の所持数を読み込む処理
  const setUserEquipInventory = useSetAtom(userEquipInventoryAtom);
  const { calcOutputTiers } = useFetchedDataContext();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const userEquipInventoryService = new UserEquipInventoryService();
    const currentUserCharaData = userEquipInventoryService.loadFromLocalStorage(calcOutputTiers);
    setUserEquipInventory(currentUserCharaData);
    setIsLoading(false);
  }, []);

  return isLoading;
};
