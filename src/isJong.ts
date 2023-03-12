import { JUNG_HANGUL } from "./constant";

export function isJong(cho: string) {
  return JUNG_HANGUL.indexOf(cho) !== -1;
}

export function isJongByGroups(word: string) {
  let index = 0;

  while (word.length > index) {
    if (!isJong(word[index++])) return false;
  }

  return true;
}
