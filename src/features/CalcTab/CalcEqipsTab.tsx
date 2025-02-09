import { useState, useMemo, useCallback, useRef } from "react";
import { CharaSelectModal } from "./CharaSelectModal";
import { CalcResultComponent } from "./CalcResult";
import { getInputItems } from "@/utils/input-info";
import { InputDisplays } from "@/types/search-elements";
import { CharaCard } from "@/components/CharaCard";
import { AppDescription } from "@/components/Description";
import { useAtom, useAtomValue } from "jotai";
import { selectedCharasAtom, userCharaDataAtom } from "@/atoms/userDataAtoms";
import { useFetchedDataContext } from "../DataProvider";
import { isTargetDisplayAtom } from "@/atoms/optionsAtoms";
import AlertModal from "@/components/AlertModal";
import { UserCharaDataService } from "@/lib/userDataService";

export const CalcEquipTab = () => {
  // localStorageから読み込み済の選択中のキャラリスト
  const selectedCharas = useAtomValue(selectedCharasAtom);
  const { charaData, rangeValues } = useFetchedDataContext();
  // 目標レベルを表示するか
  const [isTargetDisplay, setIsTargetDisplay] = useAtom(isTargetDisplayAtom);
  const [userCharaData, setUserCharaData] = useAtom(userCharaDataAtom);
  const handleIsTargetClick = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsTargetDisplay(e.target.checked);
      localStorage.setItem("isTargetDisplay", e.target.checked.toString());
    },
    [isTargetDisplay]
  );
  const maxTierModalRef = useRef<HTMLDialogElement>(null);
  const openMaxTierModal = useCallback(() => {
    if (maxTierModalRef.current) {
      maxTierModalRef.current.showModal();
    }
  }, []);
  // 選択中のキャラの目標Tierを最大にする
  const handleMaxTierOk = useCallback(() => {
    const newUserCharaData = { ...userCharaData };
    selectedCharas.forEach((charaName) => {
      const newUserCharaDataItem = { ...userCharaData[charaName] };
      newUserCharaDataItem.equip1.target = rangeValues.equip1.max;
      newUserCharaDataItem.equip2.target = rangeValues.equip2.max;
      newUserCharaDataItem.equip3.target = rangeValues.equip3.max;
      newUserCharaData[charaName] = newUserCharaDataItem;
    });
    setUserCharaData(newUserCharaData);
    new UserCharaDataService().saveToLocalStorage(newUserCharaData);
  }, [selectedCharas, userCharaData]);

  // TODO 将来的には目標レベルに必要なレポートや、目標スキルレベルに必要なオーパーツも表示できるようにしたい
  const [inputDisplays, setInputDisplays] = useState<InputDisplays>({
    isDisplayLevel: false,
    isDisplayEquips: true,
    isDisplaySkills: false,
  });
  // 表示するインプットのリストを管理
  const inputTargets = useMemo(() => getInputItems(inputDisplays), [inputDisplays]);

  return (
    <div className="mt-12 sm:mt-16 flex flex-col items-center w-11/12 mx-auto">
      <CharaSelectModal />
      <label className="label cursor-pointer mt-3">
        <span className="label-text mr-3">目標Tierを表示</span>
        <input
          type="checkbox"
          className="toggle toggle-accent"
          checked={isTargetDisplay}
          onChange={handleIsTargetClick}
        />
      </label>
      <div className="flex flex-col md:flex-row items-center md:items-center">
        <p className="text-red-500 text-center md:text-left">
          ※初回アクセス時の目標Tierは最大値に設定されています
        </p>
        <button className="btn btn-sm btn-warning mt-2 md:mt-0 md:ml-4" onClick={openMaxTierModal}>
          目標Tierを最大にする
        </button>
        <AlertModal
          handleOk={handleMaxTierOk}
          message="選択中の生徒の目標Tierがすべて最大になります。よろしいですか？"
          modalRef={maxTierModalRef}
        />
      </div>

      <div className="max-w-[95vw] sm:w-[1024px]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 my-4">
          {selectedCharas.map((charaName) => (
            <CharaCard
              key={charaName}
              charaName={charaName}
              imgUrl={charaData[charaName].imgUrl}
              inputTargets={inputTargets}
              isTargetDisplay={isTargetDisplay}
            />
          ))}
        </div>
        {/* 選択中のキャラリストと、現在のキャラの状態を渡して計算 */}
        <CalcResultComponent />
      </div>
      <AppDescription />
    </div>
  );
};
