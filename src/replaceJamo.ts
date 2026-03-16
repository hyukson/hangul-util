import {
  CHO_HANGUL,
  JUNG_HANGUL,
  JONG_HANGUL,
  CHO_PERIOD,
  JONG_PERIOD,
  HANGUL_START_CHARCODE,
} from "./constant";
import { isHangulByCode } from "./isHangul";
import { combineByCode } from "./combine";

function decomposeChar(code: number) {
  const charCode = code - HANGUL_START_CHARCODE;
  return {
    cho: Math.floor(charCode / CHO_PERIOD),
    jung: Math.floor((charCode % CHO_PERIOD) / JONG_PERIOD),
    jong: charCode % JONG_PERIOD,
  };
}

/**
 * 종성을 제거
 * @example removeJongseong("한글") → "하그"
 */
export function removeJongseong(word: string = ""): string {
  return word
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      if (!isHangulByCode(code)) return char;
      const { cho, jung } = decomposeChar(code);
      return combineByCode(cho, jung, 0);
    })
    .join("");
}

/**
 * 초성을 교체
 * @example replaceChoseong("한글", (cho) => "ㅁ") → "만믈"
 */
export function replaceChoseong(
  word: string = "",
  replacer: (cho: string, index: number) => string
): string {
  return word
    .split("")
    .map((char, i) => {
      const code = char.charCodeAt(0);
      if (!isHangulByCode(code)) return char;
      const { cho, jung, jong } = decomposeChar(code);
      const newCho = replacer(CHO_HANGUL[cho], i);
      const newChoIndex = CHO_HANGUL.indexOf(newCho);
      if (newChoIndex === -1) return char;
      return combineByCode(newChoIndex, jung, jong);
    })
    .join("");
}

/**
 * 중성을 교체
 * @example replaceJungseong("한글", (jung) => "ㅜ") → "훈굴"
 */
export function replaceJungseong(
  word: string = "",
  replacer: (jung: string, index: number) => string
): string {
  return word
    .split("")
    .map((char, i) => {
      const code = char.charCodeAt(0);
      if (!isHangulByCode(code)) return char;
      const { cho, jung, jong } = decomposeChar(code);
      const newJung = replacer(JUNG_HANGUL[jung], i);
      const newJungIndex = JUNG_HANGUL.indexOf(newJung);
      if (newJungIndex === -1) return char;
      return combineByCode(cho, newJungIndex, jong);
    })
    .join("");
}

/**
 * 종성을 교체
 * @example replaceJongseong("한글", (jong) => "ㅁ") → "함긂"
 */
export function replaceJongseong(
  word: string = "",
  replacer: (jong: string, index: number) => string
): string {
  return word
    .split("")
    .map((char, i) => {
      const code = char.charCodeAt(0);
      if (!isHangulByCode(code)) return char;
      const { cho, jung, jong } = decomposeChar(code);
      const newJong = replacer(JONG_HANGUL[jong], i);
      const newJongIndex = JONG_HANGUL.indexOf(newJong);
      if (newJongIndex === -1) return char;
      return combineByCode(cho, jung, newJongIndex);
    })
    .join("");
}
