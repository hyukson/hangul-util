import { JONG_COMPLETE_HANGUL } from "./constant";
import { isJongByCode } from "./isJong";

export function isChoByChar(cho: string = "") {
  return isJongByCode(cho.charCodeAt(0)) && !JONG_COMPLETE_HANGUL[cho];
}

export function isCho(word: string = "") {
  for (let index = 0; index < word.length; index++) {
    if (!isChoByChar(word[index])) return false;
  }

  return !!word;
}

export function isChoByGroups(word: string = "") {
  return word.split('').map(isChoByChar);
}
