import { NORMALIZE_CHO, NORMALIZE_JUNG, NORMALIZE_JONG } from "./constant";
import { divideHangulByGroups } from "./divide";

type recordTypes = { cho: number; jung: number; jong: number };

export function normalize(text: string, isSpace: boolean = true) {
  const divided = divideHangulByGroups(text, {
    isSplit: false,
    resultType: "index",
  }) as recordTypes[];

  const space = isSpace ? " " : "";

  return divided
    .map((hangul: recordTypes) => {
      const char =
        NORMALIZE_CHO[hangul.cho] +
        NORMALIZE_JUNG[hangul.jung] +
        NORMALIZE_JONG[hangul.jong];

      return char ? char + space : hangul;
    })
    .join("")
    .replace(/\s{2,}/g, ' ')
    .trim();
}
