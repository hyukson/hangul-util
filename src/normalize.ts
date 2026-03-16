import { NORMALIZE_CHO, NORMALIZE_JUNG, NORMALIZE_JONG } from "./constant";
import { divide } from "./divide";

type recordTypes = { cho: number; jung: number; jong: number };

export function normalize(text: string, isSpace: boolean = true) {
  const space = isSpace ? " " : "";
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const hangul = divide(text[i], {
      isSplit: false,
      resultType: "index",
    }) as recordTypes;

    const char =
      NORMALIZE_CHO[hangul.cho] +
      NORMALIZE_JUNG[hangul.jung] +
      NORMALIZE_JONG[hangul.jong];

    result += char ? char + space : hangul;
  }

  return result.replace(/\s{2,}/g, ' ').trim();
}
