import { useRef, useState, useMemo, useCallback } from "react";
import { getCharaDataFilteredSorted } from "@/utils/chara-info";
import { CharaName } from "@/types/ba-primitive-types";
import { CharaDataFilters, SortMethod, UserDataFilters } from "@/types/search-elements";
import { useAtom, useAtomValue } from "jotai";
import { selectedCharasAtom, userCharaDataAtom } from "@/atoms/userDataAtoms";
import { UserCharaSelectService } from "@/lib/userDataService";
import { CharaIcon } from "@/components/CharaIcon";
import { useFetchedDataContext } from "@/features/DataProvider";

export const CharaSelectModal: React.FC<{}> = () => {
  // グローバルに共有されるデータ
  const [selectedCharas, setSelectedCharas] = useAtom(selectedCharasAtom);
  const userCharaData = useAtomValue(userCharaDataAtom);
  const { charaData, rangeValues } = useFetchedDataContext();

  // 以下、Modal内でのみ使うhooks
  const [isAllSelected, setIsAllSelected] = useState(false);
  // モーダル内で選択されたもの
  const [selectedCharasInModal, setSelectedCharasInModal] = useState<Set<CharaName>>(new Set());
  // キャラのデータによるフィルター
  const [charaDataFilters, setCharaDataFilters] = useState<CharaDataFilters>({ charaName: "" });
  // ユーザのデータからのフィルター
  const [userDataFilters, setUserDataFilters] = useState<UserDataFilters>({
    isDisplayMaxEquips: true,
    isDisplayMaxLevel: true,
    isDisplayMaxSkills: true,
  });
  // ソートの種類と降順・昇順
  const [sortMethod, setSortMethod] = useState<SortMethod>({ method: "name", desc: false }); // 現状使ってない
  const charaSelectModalRef = useRef<HTMLDialogElement>(null);

  const filteredCharaNames = useMemo(() => {
    return getCharaDataFilteredSorted(
      charaData,
      rangeValues,
      userCharaData,
      charaDataFilters,
      userDataFilters,
      sortMethod,
      selectedCharas
    );
  }, [charaDataFilters, userDataFilters, sortMethod, userCharaData, selectedCharas]);

  //　モーダルを開いた時の挙動
  // モーダル内部で選択しているものをリセットして、現在選択済みとして表示しているものをセットする
  const openCharaSelectModal = () => {
    if (charaSelectModalRef.current) {
      setCharaDataFilters({ charaName: "" });
      charaSelectModalRef.current.showModal();
      setSelectedCharasInModal(new Set());
      setSelectedCharasInModal(new Set(selectedCharas));
    }
  };

  // 適用ボタンをクリックした時に、選択中のキャラをセットし、ローカルストレージに保存する
  const handleApplyClick = useCallback(() => {
    const newSelectedCharas = Array.from(selectedCharasInModal).sort();
    setSelectedCharas(newSelectedCharas);
    new UserCharaSelectService().saveToLocalStorage(newSelectedCharas);
  }, [selectedCharasInModal]);

  //閉じるボタンを押した時、selectedCharasInModalをリセットする
  const handleCloseClick = useCallback(() => {
    setSelectedCharasInModal(new Set());
  }, []);

  // ユーザデータに基づくフィルターを押した時の挙動
  const handleUserDataFilters = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as keyof UserDataFilters;
    const newFilters = { ...userDataFilters };
    //
    newFilters[name] = !event.target.checked;
    setUserDataFilters(newFilters);
  };

  const handleIsAllSelected = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        // チェックマークがついた時
        setSelectedCharasInModal(new Set(filteredCharaNames));
      } else {
        // 外された時
        setSelectedCharasInModal(new Set());
      }
      setIsAllSelected(e.target.checked);
    },
    [isAllSelected]
  );

  // アイコンボタンを押した時の挙動
  const handleSelectCharasInModal = useCallback(
    (charaName: CharaName) => {
      const newSet = new Set(selectedCharasInModal);
      if (selectedCharasInModal.has(charaName)) {
        // クリックされた段階で、名前が選択中にある場合、外す
        newSet.delete(charaName);
      } else {
        newSet.add(charaName);
      }
      setSelectedCharasInModal(newSet);
    },
    [selectedCharasInModal]
  );

  return (
    <div className="flex flex-col items-center">
      <dialog id="my_modal_1" className="modal" ref={charaSelectModalRef}>
        <div className="modal-box max-w-[90vw] lg:max-w-[70vw] h-[80vh] sm:h-[90vh] flex flex-col items-center bg-slate-50	relative">
          <div className="sticky top-0 mb-3 w-11/12 flex flex-wrap items-center">
            <label className="cursor-pointer label justify-normal w-52  mr-3 p-0">
              <span className="label-text mr-1">全装備最大の生徒を非表示</span>
              <input
                type="checkbox"
                name="isDisplayMaxEquips"
                className="checkbox checkbox-primary"
                checked={!userDataFilters["isDisplayMaxEquips"]}
                onChange={handleUserDataFilters}
              />
            </label>
            <label className="cursor-pointer label justify-normal w-20 py-1 px-0 mr-20">
              <span className="label-text mr-1">全選択</span>
              <input
                type="checkbox"
                name="isAllSelected"
                className="checkbox checkbox-primary"
                checked={isAllSelected}
                onChange={handleIsAllSelected}
              />
            </label>
            <input
              type="text"
              placeholder="生徒名で検索"
              value={charaDataFilters.charaName}
              className="input input-primary input-sm w-48 mb-0"
              onChange={(e) => setCharaDataFilters({ charaName: e.target.value })}
            />
          </div>
          <div className="overflow-auto w-full h-11/12 bg-white">
            <div className="grid grid-cols-4 sm:flex sm:flex-wrap justify-start  pr-0">
              {filteredCharaNames.map((charaName) => (
                <CharaIcon
                  key={charaName}
                  charaName={charaName}
                  imgUrl={charaData[charaName].imgUrl}
                  isSelected={selectedCharasInModal.has(charaName)}
                  handleSelectChara={() => handleSelectCharasInModal(charaName)}
                />
              ))}
            </div>
          </div>
          <div className="modal-action  flex justify-center  bg-slate-50 w-full">
            <form method="dialog" className="flex justify-around w-full ">
              {/* モーダルの中にボタンがあったら、それはcloseボタンになる https://daisyui.com/components/modal/ */}
              <button className="custom-button bg-sky-100 text-black" onClick={handleCloseClick}>
                閉じる
              </button>
              <button className="custom-button bg-sky-400" onClick={handleApplyClick}>
                適用
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <button className="custom-button bg-yellow-300 text-black" onClick={openCharaSelectModal}>
        生徒を選択
      </button>
    </div>
  );
};
