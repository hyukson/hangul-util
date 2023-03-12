import { JUNG_HANGUL } from "./constant";

export function isJung(cho: string) {
  return JUNG_HANGUL.indexOf(cho) !== -1;
}

export function isJungByGroups(word: string) {
  let index = 0;

  while (word.length > index) {
    if (!isJung(word[index++])) return false;
  }

  return true;
}