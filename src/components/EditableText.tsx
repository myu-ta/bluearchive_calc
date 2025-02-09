import { useState, useEffect } from "react";

export const EditableText: React.FC<{
  isEditing: boolean;
  handleEditChange: (val: number | "") => void;
  displayValue: number; // 表示するvalue
  editValue: number; // 編集中のvalue
}> = (props) => {
  const { isEditing, handleEditChange, displayValue, editValue } = props;
  // クリックしたら編集できるやつ
  const [inputVal, setInputVal] = useState<number | string>(editValue);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setInputVal("");
      handleEditChange(Number(e.target.value));
      return;
    }
    if (isNaN(Number(e.target.value))) {
      // 数字ではなかった場合、何もしない
      return;
    }
    setInputVal(Number(e.target.value).toString());
    handleEditChange(Number(e.target.value));
  };
  useEffect(() => {
    setInputVal(displayValue);
  }, [isEditing, displayValue]);

  return (
    <div className="w-full text-center col-span-2 my-auto">
      {isEditing ? (
        <input
          type="text"
          value={inputVal}
          onChange={handleChange}
          className="border border-solid border-gray-500 text-sm sm:text-base w-3/4 text-center rounded-lg custom-number-input"
        />
      ) : (
        <div className=" hover:bg-black hover:bg-opacity-10 cursor-pointer text-sm sm:text-base text-center">
          <span>×{displayValue}</span>
        </div>
      )}
    </div>
  );
};
