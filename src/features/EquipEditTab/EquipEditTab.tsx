import { EditableText } from "@/components/EditableText";
import { EquipIcon } from "@/components/EquipIcon";
import { ListCard } from "@/components/ListCard";
import { ALL_EQUIPS_NAME } from "@/const-ba-info/equips-info";
import { useCallback, useState } from "react";
import { UserEquipInventory } from "@/types/ba-userdata-type";
import { useAtom } from "jotai";
import { userEquipInventoryAtom } from "@/atoms/userDataAtoms";
import { UserEquipInventoryService } from "@/lib/userDataService";
import { useFetchedDataContext } from "../DataProvider";
import { EquipName } from "@/types/ba-primitive-types";

// React.FC<>
export const EquipEditTab = () => {
  const [userEquipInventory, setUserEquipInventory] = useAtom(userEquipInventoryAtom);
  const { eqiupsData, calcOutputTiers } = useFetchedDataContext();
  const [isEditing, setIsEditing] = useState(false);
  // 編集中のデータ
  const [editingEquipInventory, setEditingEquipInventory] =
    useState<UserEquipInventory>(userEquipInventory);

  const handleClickConfirm = useCallback(() => {
    // 確定ボタンを押したら、編集中のものを全体のequipInvetoryに適用し、localstorageに保存する
    setUserEquipInventory(editingEquipInventory);
    new UserEquipInventoryService().saveToLocalStorage(editingEquipInventory);
    setIsEditing(false);
  }, [editingEquipInventory, setUserEquipInventory]);

  const handleClickEdit = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);

  const handleEquipEditChange = useCallback(
    (tier: string, equipName: EquipName, value: number | "") => {
      const newInventory = { ...editingEquipInventory };
      const newEquipsNums = { ...newInventory[tier] };
      newEquipsNums[equipName] = Number(value);
      newInventory[tier] = newEquipsNums;
      setEditingEquipInventory(newInventory);
    },
    [editingEquipInventory]
  );

  return (
    <div className="w-[95vw] sm:w-[70vw] lg:w-[50vw] mx-auto flex flex-col items-center mt-12">
      <div className="flex justify-center space-x-10 sticky top-8 sm:top-12 bg-white z-10 w-[90vw] pb-4">
        <button className="custom-button bg-sky-400 w-[8vw] mt-3" onClick={handleClickEdit}>
          {isEditing ? "戻る" : "編集"}
        </button>
        {isEditing ? (
          <button className="custom-button bg-yellow-300 w-[8vw] mt-3" onClick={handleClickConfirm}>
            確定
          </button>
        ) : null}
      </div>
      {ALL_EQUIPS_NAME.map((equipName) => (
        <ListCard heading={equipName} key={equipName}>
          {calcOutputTiers.map(
            (tier) =>
              eqiupsData[equipName][tier] && (
                <EquipIcon
                  equipName={equipName}
                  tier={tier}
                  key={equipName + tier}
                  imgUrl={eqiupsData[equipName][tier].imgUrl}
                >
                  {/* 数字のところだけ自由に変えられるようになってる */}
                  <EditableText
                    isEditing={isEditing}
                    handleEditChange={(val: number | "") =>
                      handleEquipEditChange(tier, equipName, val)
                    }
                    editValue={userEquipInventory[tier][equipName]}
                    displayValue={userEquipInventory[tier][equipName]}
                  />
                </EquipIcon>
              )
          )}
        </ListCard>
      ))}
    </div>
  );
};
