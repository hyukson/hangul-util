import { JONG_START_CHARCODE, JONG_END_CHARCODE } from "./constant";

export function isJongByCode(jong: number = 0) {
  return JONG_START_CHARCODE <= jong && jong <= JONG_END_CHARCODE;
}

export function isJong(word: string = "") {
  for (let index = 0; index < word.length; index++) {
    if (!isJongByCode(word.charCodeAt(index))) return false;
  }

  return !!word;
}

export function isJongByGroups(word: string = "") {
  const result: boolean[] = [];

  for (let index = 0; index < word.length; index++) {
    result.push(isJongByCode(word.charCodeAt(index)));
  }

  return result;
}
