import { HANGUL_END_CHARCODE, HANGUL_START_CHARCODE } from "./constant";

export function isHangulByCode(hangul: number = 0) {
  return HANGUL_START_CHARCODE <= hangul && hangul <= HANGUL_END_CHARCODE;
}

export function isHangul(word: string = "") {
  for (let index = 0; index < word.length; index++) {
    if (!isHangulByCode(word.charCodeAt(index))) return false;
  }

  return !!word;
}

export function isHangulByGroups(word: string = "") {
  const result: boolean[] = [];

  for (let index = 0; index < word.length; index++) {
    result.push(isHangulByCode(word.charCodeAt(index)));
  }

  return result;
}
