import { isHangulByCode } from "./isHangul";
import { getJongIndex } from "./syllable";

function codeHasJong(code: number): boolean {
  return isHangulByCode(code) && getJongIndex(code) > 0;
}

/**
 * 마지막 글자에 받침(종성)이 있는지 확인
 * @example hasJongseong("한") → true
 * @example hasJongseong("하") → false
 */
export function hasJongseong(word: string = ""): boolean {
  if (!word) return false;

  return codeHasJong(word.charCodeAt(word.length - 1));
}

/**
 * 각 글자의 받침 유무를 배열로 반환
 * @example hasJongseongByGroups("한글아") → [true, true, false]
 */
export function hasJongseongByGroups(word: string = ""): boolean[] {
  const result: boolean[] = [];

  for (let i = 0; i < word.length; i++) {
    result.push(codeHasJong(word.charCodeAt(i)));
  }

  return result;
}
