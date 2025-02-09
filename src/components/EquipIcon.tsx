import { EquipName } from "@/types/ba-primitive-types";

export const EquipIcon: React.FC<{
  equipName: EquipName;
  tier: string;
  imgUrl: string;
  children: React.ReactNode;
}> = (props) => {
  return (
    <div className="custom-icon bg-blue-100  flex flex-col p-0 pt-1 m-1 shadow-md h-auto">
      <div className="col-span-2 row-span-2 relative">
        <img
          src={props.imgUrl}
          className="bg-white rounded-lg object-contain w-5/6 mx-auto"
          alt={props.equipName + props.tier}
        />
        <div className="badge badge-outline badge-xs sm:badge-sm text-blue-500 py-[6px] bg-white absolute inset-0">
          {props.tier}
        </div>
      </div>
      {props.children}
    </div>
  );
};
