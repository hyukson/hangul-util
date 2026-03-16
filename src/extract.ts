import { HANGUL_START_CHARCODE, HANGUL_END_CHARCODE } from "./constant";

const JAMO_START = 0x3131;
const JAMO_END = 0x3163;

function isHangulChar(code: number): boolean {
  return (
    (code >= HANGUL_START_CHARCODE && code <= HANGUL_END_CHARCODE) ||
    (code >= JAMO_START && code <= JAMO_END)
  );
}

/**
 * 문자열에서 한글만 추출
 * @example extractHangul("hello안녕world세계") → "안녕세계"
 */
export function extractHangul(word: string = ""): string {
  return word
    .split("")
    .filter((char) => isHangulChar(char.charCodeAt(0)))
    .join("");
}

/**
 * 문자열에 한글이 포함되어 있는지 확인
 * @example containsHangul("hello안녕") → true
 * @example containsHangul("hello") → false
 */
export function containsHangul(word: string = ""): boolean {
  for (let i = 0; i < word.length; i++) {
    if (isHangulChar(word.charCodeAt(i))) return true;
  }
  return false;
}

/**
 * 문자열에서 한글을 제거
 * @example removeHangul("hello안녕world") → "helloworld"
 */
export function removeHangul(word: string = ""): string {
  return word
    .split("")
    .filter((char) => !isHangulChar(char.charCodeAt(0)))
    .join("");
}

/**
 * 문자열에서 한글 글자 수를 반환
 * @example hangulLength("hello안녕") → 2
 */
export function hangulLength(word: string = ""): number {
  let count = 0;
  for (let i = 0; i < word.length; i++) {
    if (isHangulChar(word.charCodeAt(i))) count++;
  }
  return count;
}
