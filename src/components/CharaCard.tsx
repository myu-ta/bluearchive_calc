import { userCharaDataAtom } from "@/atoms/userDataAtoms";
import { useFetchedDataContext } from "@/features/DataProvider";
import { UserCharaDataService } from "@/lib/userDataService";
import { CharaName } from "@/types/ba-primitive-types";
import { ProgressState, UserCharaDataItem } from "@/types/ba-userdata-type";
import { CharaCardProps } from "@/types/component-props";
import { splitCharaName } from "@/utils/charaNameUtil";
import { KEY_NAME_OF_USER_CHARA_DATA } from "@/utils/constants";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";

export const CharaCard: React.FC<CharaCardProps> = (props) => {
  const { charaName, inputTargets, isTargetDisplay, imgUrl } = props;
  const { rangeValues } = useFetchedDataContext();
  const [userCharaData, setUserCharaData] = useAtom(userCharaDataAtom);
  const userCharaDataItem = userCharaData[charaName];
  const [currentUserharaDataItem, setCurrentUserCharaDataItem] = useState(userCharaData[charaName]);
  const [part1, part2] = splitCharaName(charaName);

  const handleNumChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    targetStatus: keyof UserCharaDataItem,
    progressState: keyof ProgressState
  ) => {
    let targetValue: string | number = -1;
    if (e.target.value === "") {
      targetValue = "";
    } else if (isNaN(Number(e.target.value))) {
      // 数字ではなかった場合
      targetValue = "";
    } else {
      targetValue = Math.max(
        rangeValues[targetStatus].min,
        Math.min(rangeValues[targetStatus].max, Number(e.target.value))
      );
    }
    const newUserCharaDataItem = {
      ...currentUserharaDataItem,
      [targetStatus]: {
        ...currentUserharaDataItem[targetStatus],
        [progressState]: targetValue,
      },
    };
    setCurrentUserCharaDataItem(newUserCharaDataItem);
  };

  const handleOnBlur = (charaName: CharaName, targetStatus: keyof UserCharaDataItem) => {
    const newUserCharaDataItem = { ...currentUserharaDataItem };
    const newProgressState = {
      ...currentUserharaDataItem[targetStatus],
    };
    const currentNum: number = Math.max(Number(currentUserharaDataItem[targetStatus].current), 1);
    const targetNum: number = Math.min(
      Number(currentUserharaDataItem[targetStatus].target),
      rangeValues[targetStatus].max
    );
    newUserCharaDataItem[targetStatus] = {
      current: currentNum,
      target: targetNum,
    };
    // inputから離れた時に特に変更がなく、異常値でない場合は何もしない
    // 不要なlocalStorageへのアクセスを防ぐ
    if (
      userCharaDataItem[targetStatus].current === currentNum &&
      userCharaDataItem[targetStatus].target === targetNum &&
      currentNum <= targetNum
    ) {
      return;
    }
    if (currentNum > targetNum) {
      newUserCharaDataItem[targetStatus] = {
        ...newProgressState,
        target: currentNum,
      };
    }
    setCurrentUserCharaDataItem(newUserCharaDataItem);
    setUserCharaData({ ...userCharaData, [charaName]: currentUserharaDataItem });
    new UserCharaDataService().saveToLocalStorage({
      ...userCharaData,
      [charaName]: newUserCharaDataItem,
    });
  };
  const colSpan = useMemo(() => {
    return isTargetDisplay ? "grid-cols-3" : "grid-cols-2";
  }, [isTargetDisplay]);

  return (
    <div className="p-2 border shadow-md text-center bg-white m-1 card text-sm sm:text-base">
      <div className="flex justify-between items-center">
        <div className="mb-2">
          <div className="w-12 h-12 mx-auto rounded-full overflow-hidden">
            <img className="w-12 h-12" src={imgUrl} alt="キャラアイコン" />
          </div>
        </div>
        <div className="mx-auto">
          <div className="text-sm font-semibold">
            <span>{part1}</span>
            <span className="text-xs">{part2}</span>
          </div>
        </div>
      </div>
      <div className={`grid ${colSpan} gap-1 mb-1 `}>
        <div className="col-span-1 font-bold"></div>
        <div className="col-span-1 font-bold">現在</div>
        {isTargetDisplay && <div className="col-span-1 font-bold">目標</div>}
      </div>
      {inputTargets.map((inputTarget) => (
        <div className={`grid  ${colSpan} gap-1 mb-1`} key={inputTarget}>
          <div className="col-span-1 font-bold  my-auto">
            {KEY_NAME_OF_USER_CHARA_DATA[inputTarget]}
          </div>
          <div className="col-span-1 bg-gray-100 p-1 rounded">
            <input
              value={currentUserharaDataItem[inputTarget].current}
              type="text"
              className="w-11/12 text-center px-0   lg:text-lg m-auto bg-gray-100"
              onChange={(e) => handleNumChange(e, inputTarget, "current")}
              onBlur={() => handleOnBlur(charaName, inputTarget)}
            />
          </div>
          {isTargetDisplay && (
            <div className="col-span-1 bg-gray-200 p-1 rounded">
              <input
                value={currentUserharaDataItem[inputTarget].target}
                type="text"
                className="w-11/12 text-center px-0    lg:text-lg m-auto bg-gray-200"
                onChange={(e) => handleNumChange(e, inputTarget, "target")}
                onBlur={() => handleOnBlur(charaName, inputTarget)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
