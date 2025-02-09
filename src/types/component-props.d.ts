import { CharaInfo } from "./ba-chara-data";
import { CharaName } from "./ba-primitive-types";
import { UserCharaData, UserCharaDataItem } from "./ba-userdata-type";
import { InputTarget } from "./constants-type";
import { InputDisplays } from "./search-elements";

export type CharaSelectModalProps = {
  selectedCharas: CharaName[];
  setSelectedCharas: Dispatch<SetStateAction<string[]>>;
};

export type CharaListProps = {
  selectedCharas: Set<CharaName>;
  setSelectedCharas: Dispatch<SetStateAction<Set<CharaName>>>;
  filteredCharas: CharaName[];
};

export type SelectedRowProps = {
  charaName: CharaName;
  userCharaDataSelected: UserCharaData;
  setUserCharaDataSelected: Dispatch<SetStateAction<UserCharaData>>;
  inputTargets: InputTarget[];
  colsStyle: {
    gridTemplateColumns: string;
  };
  inputDisplays: InputDisplays;
};

export type CharaCardProps = {
  charaName: CharaName;
  imgUrl: string;
  inputTargets: Array<keyof UserCharaDataItem>;
  isTargetDisplay: boolean;
};

export type DisplayInputProps = {
  inputType: keyof InputDisplays;
  inputDisplays: InputDisplays;
  setInputDisplays: Dispatch<SetStateAction<InputDisplays>>;
};

export type EquipIconProps = { equipName: EquipName; tier: string; children: React.ReactNode };
