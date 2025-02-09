import { UserCharaDataItem } from "@/types/ba-userdata-type";
import { LEVEL_KEY, EQUIP_KEYS, SKILLS_KEYS, PROGRESS_STATES } from "./constants";
import { InputTarget } from "@/types/constants-type";
import { InputDisplays } from "@/types/search-elements";

export const getInputItems = ({
  isDisplayLevel,
  isDisplayEquips,
  isDisplaySkills,
}: InputDisplays) => {
  let targets: Array<keyof UserCharaDataItem> = [];
  const result: InputTarget[] = [];
  if (isDisplayLevel) {
    targets = [...targets, ...LEVEL_KEY];
  }
  if (isDisplayEquips) {
    targets = [...targets, ...EQUIP_KEYS];
  }
  if (isDisplaySkills) {
    targets = [...targets, ...SKILLS_KEYS];
  }
  PROGRESS_STATES.forEach((progress) => {
    targets.forEach((skill) => {
      let res = { inputype: skill, progress: progress };
      result.push(res);
    });
  });
  return targets;
};
