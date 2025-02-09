import {
  BallName,
  BluerayName,
  CharaName,
  ImgURL,
  NoteName,
  OopartsName,
  OopartsType,
  RankOptions,
  ReportName,
} from "./ba-primitive-types";
import { EquipName } from "./ba-primitive-types";

// アイテムのデータ
export type EquipsData = {
  [key in EquipName]: {
    [key: string]: { name: string; imgUrl: string };
  };
  // {
  //   "帽子 ": {
  //     "T3": ,{name: "ビッグブラザーの中折れ帽", imgUrl: "https://hoge.com"}
  //   }
  // }
};
// オーパーツのデータ
type OopartsData = {
  [key: OopartsName]: {
    type: OopartsType;
    rank: RankOptions;
    imgUrl: ImgURL;
  };
  // {
  //   完全なレヒニッツ写本: {
  //     type: "レヒニッツ写本",
  //     rank: "初級",
  //     imgUrl: "https://xxxxxxxx.com",
  //   },
  // };
};

// ノートのデータ
type NoteData = {
  [key: NoteName]: {
    school: SchoolName;
    rank: RankOptions;
    imgUrl: ImgURL;
  };
  // {
  //   "初級技術ノート(ミレニアム)": {
  //     school: "ミレニアム",
  //     rank: "初級",
  //     imgUrl: "https://xxxxx.com",
  //   },
  // };
};

// ブルーレイのデータ
type BluerayData = {
  [key: BluerayName]: {
    school: SchoolName;
    rank: RankOptions;
    imgUrl: ImgURL;
  };
  // {
  //   "初級戦術教育BD(ミレニアム)": {
  //     school: "ミレニアム",
  //     rank: "初級",
  //     imgUrl: "https://xxxxx.com",
  //   },
  // };
};

type Items4Skill = {
  note: [{ name: NoteName; num: number }];
  ooparts: [{ name: OopartsName; num: number }];
  // 秘伝ノートがあるか
  hiddenNote: boolean;
};

type Chara4Skill = {
  // キャラごとに取得するアイテム
  // [key: number] -> レベル
  // 例えば、1 -> 4に上げる場合、2,3,4の値を合計する
  [key: CharaName]: { [key: number]: Items4Skill };
};

// 強化珠とレポートのやつ
type CommonConsumptionInfo = { exp: number; imgUrl: ImgURL };

type ReportData = {
  [key in ReportName]: CommonConsumptionInfo;
};

type BallData = {
  [key in BallName]: CommonConsumptionInfo;
};

// ここは調整して、一番目の要素を0にする
// 1 -> 4 だと indexは1, 2, 3のものを足す
type RequiredReports = number[];

// 1 -> 3だと、1から3までを足す
type RequiredBalls = number[];
