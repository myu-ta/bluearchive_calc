import { CharaName } from "@/types/ba-primitive-types";
import { splitCharaName } from "@/utils/charaNameUtil";
import React from "react";

export const IconName: React.FC<{ charaName: CharaName }> = (props) => {
  const { charaName } = props;
  const dividedCharaName = splitCharaName(charaName);
  // 括弧がない場合、1行
  if (dividedCharaName.length === 1) {
    return (
      <div className="bg-slate-400 text-xs sm:text-sm md:text-base w-full text-center text-white flex flex-col items-center h-10">
        <p className="text-sm">{charaName}</p>
      </div>
    );
  }

  // 括弧がある場合、文字列を分割
  const part1 = dividedCharaName[0];
  const part2 = dividedCharaName[1];
  // 2つ目の長さで文字の大きさを変える
  const textSizeSecond = part2.length >= 7 ? "text-[9px]" : "text-[12px]";
  return (
    <div className="bg-slate-400 text-xs sm:text-sm md:text-base w-full text-center text-white flex flex-col items-center h-10">
      <p className="icon-text text-sm">{part1}</p>
      <p className={textSizeSecond}>{part2}</p>
    </div>
  );
};

export const InputIconName: React.FC<{ charaName: CharaName }> = (props) => {
  const { charaName } = props;
  const dividedCharaName = splitCharaName(charaName);
  if (dividedCharaName.length === 1) {
    return (
      <div className="text-xs w-full text-center  flex flex-col items-center h-10">
        <p className="icon-text text-sm">{charaName}</p>
      </div>
    );
  }
  // 括弧がある場合、文字列を分割
  const part1 = dividedCharaName[0];
  const part2 = dividedCharaName[1];
  let textSizeSecond = "";
  if (part2.length >= 7) {
    textSizeSecond = "text-[6.5px] sm:text-[7px]";
  } else if (part2.length >= 5) {
    textSizeSecond = "text-[10.5px]";
  } else {
    textSizeSecond = "text-[10.5px]";
  }

  return (
    <div className="text-xs w-full text-center  flex flex-col items-center h-10">
      <p className="icon-text text-sm">{part1}</p>

      <p className={textSizeSecond}>{part2}</p>
    </div>
  );
};
