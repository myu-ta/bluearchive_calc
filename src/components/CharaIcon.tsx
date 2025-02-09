import { IconName } from "./IconName";

type CharaIconProps = {
  charaName: string;
  imgUrl: string;
  isSelected: boolean;
  handleSelectChara: () => void;
};

export const CharaIcon: React.FC<CharaIconProps> = (props) => {
  const { charaName, imgUrl, isSelected, handleSelectChara } = props;

  return (
    <div
      onClick={handleSelectChara}
      key={charaName}
      className="sm:w-20 flex flex-col items-center m-1 sm:m-2 cursor-pointer shadowtextSizeSecond-md border border-slate-200 rounded-md"
    >
      <div className="relative group">
        <img src={imgUrl} alt={charaName} />
        {/* 何もない時は透明度が変わらないが、ホバーした時に不透明度が70になる */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-100"></div>
        {isSelected && (
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 flex items-center justify-center">
            <span className="text-white text-lg">選択中</span>
          </div>
        )}
      </div>
      {/* （があって、かつ文字数が多い場合は、括弧で改行して２行にする */}
      <IconName charaName={charaName} />
    </div>
  );
};
