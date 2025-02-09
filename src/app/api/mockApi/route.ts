import { CHARA_DATA } from "./mockData/chara-info";
import { EQUIP_REQUIREMENT } from "./mockData/equip-requiremetn";
import { EQUIPS_DETAIL } from "./mockData/equips-detail";
import { EQUIPS_GRINDS } from "./mockData/equips-grinds";
import { RANGE_VALUES, CALC_OUTPUT_TIERS } from "./mockData/rangeValues";

export async function GET() {
  return Response.json(
    {
      equipsGrind: EQUIPS_GRINDS,
      charaData: CHARA_DATA,
      equipRequirement: EQUIP_REQUIREMENT,
      equipsDetail: EQUIPS_DETAIL,
      rangeValues: RANGE_VALUES,
      calcOutputTiers: CALC_OUTPUT_TIERS,
      // yyyy-mm-dd形式の日付
      // updatedAt: new Date().toISOString().split("T")[0],
    },
    { status: 200 }
  );
}
