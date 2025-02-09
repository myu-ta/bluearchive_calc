import { TabContainer } from "@/features/TabContainer";
import { CharasData, EquipRequirement } from "@/types/ba-chara-data";
import { EquipsData } from "@/types/ba-consumption-items";
import { EquipGrind } from "@/types/ba-equip-grind";
import { FetchedDataProvider } from "@/features/DataProvider";
import { RangeValues } from "@/types/options";

export async function generateMetadata() {
  const title = "ブルアカ装備品計算ツール";
  const description =
    "ブルアカ装備品計算ツールです。生徒を選択して、必要な装備品の数や、周回数を計算できます。";
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: "https://nu-lo.com/bluearchive_calc/",
      images: [
        {
          url: "https://nu-lo.com/static/favicon.ico",
          width: 600,
          height: 600,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary",
      title: title,
      description: description,
      images: ["https://nu-lo.com/static/favicon.ico"],
    },
  };
}

export default async function Home() {
  // データフェッチ層
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const apiURL = process.env.API_URL || `http://localhost:3000${basePath}/api/mockApi`;
  // static exportなので、APIエラーハンドリングは適当
  const response = await fetch(apiURL);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const responseJson: {
    equipsGrind: EquipGrind[];
    charaData: CharasData;
    equipRequirement: EquipRequirement;
    equipsDetail: EquipsData;
    rangeValues: RangeValues;
    calcOutputTiers: string[];
  } = await response.json();
  const { equipsGrind, charaData, equipRequirement, equipsDetail, rangeValues, calcOutputTiers } =
    responseJson;

  return (
    // Server Componentからjotaiを使うのが面倒そうなので、普通のProviderで代用
    <FetchedDataProvider
      value={{
        eqiupsData: equipsDetail,
        equipRequirement: equipRequirement,
        equipsGrind: equipsGrind,
        charaData: charaData,
        rangeValues: rangeValues,
        calcOutputTiers: calcOutputTiers,
      }}
    >
      <TabContainer />
    </FetchedDataProvider>
  );
}
