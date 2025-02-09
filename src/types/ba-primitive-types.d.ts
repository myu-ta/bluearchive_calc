// stringかnumberの型だけを定義
export type RankOptions = "初級" | "中級" | "上級" | "最上級";
export type OopartsName = string;
export type NoteName = string;
export type OopartsType = string; // 「壊れたヴォイニッチ手稿」に対する「ヴォイニッチ手稿」の部分
export type SchoolName = string;
export type ImgURL = string;
export type BluerayName = string;
export type CharaName = string;
export type ReportName = "初級レポート" | "中級レポート" | "上級レポート" | "最上級レポート";
export type BallName = "初級強化珠" | "中級強化珠" | "上級強化珠" | "最上級強化珠";
export type Equip1Name = "帽子" | "グローブ" | "シューズ";
export type Equip2Name = "バッグ" | "バッジ" | "ヘアピン";
export type Equip3Name = "お守り" | "腕時計" | "ネックレス";
export type EquipName = Equip1Name | Equip2Name | Equip3Name;
export type Rarity = 1 | 2 | 3 | "1" | "2" | "3";
