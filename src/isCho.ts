import { CHO_HANGUL } from "./constant";

export function isCho(cho: string) {
  return CHO_HANGUL.indexOf(cho) !== -1;
}

export function isChoByGroups(word: string) {
  let index = 0;

  while (word.length > index) {
    if (!isCho(word[index++])) return false;
  }

  return true;
}