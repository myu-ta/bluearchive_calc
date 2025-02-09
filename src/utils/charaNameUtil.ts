export const splitCharaName = (charaName: string): string[] => {
  if (charaName.includes("（")) {
    const [part1, part2] = charaName.split("（");
    const finalPart2 = `（${part2}`;
    return [part1, finalPart2];
  } else {
    return [charaName, ""];
  }
};

export function hiraganaToKatakana(input: string) {
  return input.replace(/[\u3041-\u3096]/g, (match) => {
    return String.fromCharCode(match.charCodeAt(0) + 0x60);
  });
}
