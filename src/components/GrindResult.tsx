import { ListCard } from "./ListCard";
import { DisplayGrindResult } from "@/types/ba-calc";
import { EquipIcon } from "./EquipIcon";
import { useFetchedDataContext } from "@/features/DataProvider";
import { useAtomValue } from "jotai";
import { userEquipInventoryAtom } from "@/atoms/userDataAtoms";
import { NORMAL_AP_COST } from "@/utils/constants";
import { useMemo } from "react";

export type GrindResultProps = {
  displayGrindResults: DisplayGrindResult[];
};

export const GrindResult: React.FC<GrindResultProps> = (props) => {
  const { displayGrindResults } = props;
  const { eqiupsData } = useFetchedDataContext();
  const userEquipInventory = useAtomValue(userEquipInventoryAtom);
  const grindTotalNum = useMemo(() => {
    return displayGrindResults.reduce((total, result) => total + result.grindNum, 0);
  }, [displayGrindResults]);

  return (
    <div>
      <div className="mb-2 text-center">
        <span className="font-bold text-md">合計周回数: </span>
        <span className="font-bold text-lg text-blue-600">{grindTotalNum}</span>
        <span className="font-bold text-md"> 回</span>
        <span className="font-bold text-md">（消費AP: </span>
        <span className="font-bold text-md text-blue-600">{grindTotalNum * NORMAL_AP_COST}）</span>
      </div>

      {displayGrindResults.map((result) => (
        <ListCard heading={`${result.areaName} : ${result.grindNum}回`} key={result.areaName}>
          {result.dropItems.map((item) => (
            <div
              className="lg:tooltip"
              data-tip={`所持数: ${userEquipInventory[item.tier][item.equipName]}`}
              key={item.equipName + item.dropNum + item.tier}
            >
              <EquipIcon
                equipName={item.equipName}
                tier={item.tier}
                imgUrl={eqiupsData[item.equipName][item.tier].imgUrl}
              >
                {/* 数字のところだけ自由に変えられるようになってる */}
                <div className="my-auto col-span-2 w-11/12 text-center text-sm sm:text-base">
                  ×{item.dropNum}
                </div>
              </EquipIcon>
            </div>
          ))}
        </ListCard>
      ))}
    </div>
  );
};
