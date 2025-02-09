import { ListCard } from "./ListCard";
import { DisplayGrindResult } from "@/types/ba-calc";
import { EquipIcon } from "./EquipIcon";
import { useFetchedDataContext } from "@/features/DataProvider";
import { useAtomValue } from "jotai";
import { userEquipInventoryAtom } from "@/atoms/userDataAtoms";

export type GrindResultProps = {
  displayGrindResults: DisplayGrindResult[];
};

export const GrindResult: React.FC<GrindResultProps> = (props) => {
  const { displayGrindResults } = props;
  const { eqiupsData } = useFetchedDataContext();
  const userEquipInventory = useAtomValue(userEquipInventoryAtom);
  return (
    <div>
      <p className="text-center mb-2">
        周回数の計算方法は、
        <a href="#description" className="text-blue-500">
          説明
        </a>
        参照
      </p>
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
