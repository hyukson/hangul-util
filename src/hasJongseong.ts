import { HANGUL_START_CHARCODE, JONG_PERIOD } from "./constant";
import { isHangulByCode } from "./isHangul";

/**
 * 마지막 글자에 받침(종성)이 있는지 확인
 * @example hasJongseong("한") → true
 * @example hasJongseong("하") → false
 */
export function hasJongseong(word: string = ""): boolean {
  if (!word) return false;
  const lastChar = word.charCodeAt(word.length - 1);
  if (!isHangulByCode(lastChar)) return false;
  return (lastChar - HANGUL_START_CHARCODE) % JONG_PERIOD > 0;
}

/**
 * 각 글자의 받침 유무를 배열로 반환
 * @example hasJongseongByGroups("한글아") → [true, true, false]
 */
export function hasJongseongByGroups(word: string = ""): boolean[] {
  return word.split("").map((char) => {
    const code = char.charCodeAt(0);
    if (!isHangulByCode(code)) return false;
    return (code - HANGUL_START_CHARCODE) % JONG_PERIOD > 0;
  });
}
