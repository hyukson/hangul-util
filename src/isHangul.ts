import {
  CHO_HANGUL,
  HANGUL_END_CHARCODE,
  HANGUL_START_CHARCODE,
  JUNG_HANGUL,
} from "./constant";

export function isHangul(charCode: number) {
  return HANGUL_START_CHARCODE <= charCode && charCode <= HANGUL_END_CHARCODE;
}

export function isHangulByGroups(word: string) {
  let index = 0;

  while (word.length > index) {
    if (!isHangul(word.charCodeAt(index++))) return false;
  }

  return true;
}