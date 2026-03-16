import {
  CHO_HANGUL,
  JUNG_HANGUL,
  JONG_HANGUL,
  CHO_PERIOD,
  JONG_PERIOD,
  HANGUL_START_CHARCODE,
} from "./constant";
import { isHangulByCode } from "./isHangul";

/**
 * 문자열에서 초성만 추출
 * @example getChoseong("프로그래밍") → "ㅍㄹㄱㄹㅁ"
 */
export function getChoseong(word: string = ""): string {
  return word
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      if (!isHangulByCode(code)) return char;
      const choIndex = Math.floor((code - HANGUL_START_CHARCODE) / CHO_PERIOD);
      return CHO_HANGUL[choIndex];
    })
    .join("");
}

/**
 * 문자열에서 중성만 추출
 * @example getJungseong("프로그래밍") → "ㅡㅗㅡㅐㅣ"
 */
export function getJungseong(word: string = ""): string {
  return word
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      if (!isHangulByCode(code)) return char;
      const charCode = code - HANGUL_START_CHARCODE;
      const jungIndex = Math.floor((charCode % CHO_PERIOD) / JONG_PERIOD);
      return JUNG_HANGUL[jungIndex];
    })
    .join("");
}

/**
 * 문자열에서 종성만 추출 (종성 없으면 빈 문자열)
 * @example getJongseong("한글") → "ㄴㄹ"
 */
export function getJongseong(word: string = ""): string {
  return word
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      if (!isHangulByCode(code)) return char;
      const jongIndex = (code - HANGUL_START_CHARCODE) % JONG_PERIOD;
      return JONG_HANGUL[jongIndex];
    })
    .join("");
}
