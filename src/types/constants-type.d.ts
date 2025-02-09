import { ProgressState, UserCharaDataItem } from "./ba-userdata-type";

export type InputTarget = {
  inputype: keyof UserCharaDataItem;
  progress: keyof ProgressState;
};
