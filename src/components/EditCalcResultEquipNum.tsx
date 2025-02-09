import { useCallback, useEffect, useRef, useState } from "react";

export const EditCalcResultEquipNum: React.FC<{
  currentNum: number;
  targetNum: number;
  handleEditChange: (value: number) => void;
}> = (props) => {
  // クリックしてeditする
  const { currentNum, targetNum, handleEditChange } = props;
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const [editInput, setEditInput] = useState<number | string>(Number(currentNum));

  const clickNumText = () => {
    setIsEditing(true);
  };

  const handleOnBlur = () => {
    setIsEditing(false);
    handleEditChange(Number(editInput));
  };
  const handleCustomNumberChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setEditInput("");
      return;
    }
    if (isNaN(Number(e.target.value))) {
      // 数字ではなかった場合、何もしない
      return;
    }
    setEditInput(Number(e.target.value).toString());
  }, []);

  useEffect(() => {
    if (isEditing) {
      ref.current?.focus();
    }
  }, [isEditing]);

  return (
    <div className="my-auto col-span-2 w-full text-center text-xs sm:text-base">
      <p className={currentNum - targetNum >= 0 ? "text-green-500" : "text-red-500"}>
        {currentNum - targetNum}
      </p>
      {isEditing ? (
        <input
          className="custom-number-input mx-auto w-11/12 text-center"
          type="number"
          value={editInput}
          onChange={handleCustomNumberChange}
          onBlur={handleOnBlur}
          ref={ref}
        />
      ) : (
        <p
          onClick={clickNumText}
          className="bg-black bg-opacity-5 hover:bg-opacity-10 cursor-pointer mx-auto rounded-md"
        >
          {currentNum}/{targetNum}
        </p>
      )}
    </div>
  );
};
