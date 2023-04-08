import { JUNG_START_CHARCODE, JUNG_END_CHARCODE } from "./constant";

export function isJungByCode(jung: number = 0) {
  return JUNG_START_CHARCODE <= jung && jung <= JUNG_END_CHARCODE;
}

export function isJung(word: string = "") {
  for (let index = 0; index < word.length; index++) {
    if (!isJungByCode(word.charCodeAt(index))) return false;
  }

  return !!word;
}

export function isJungByGroups(word: string = "") {
  const result: boolean[] = [];

  for (let index = 0; index < word.length; index++) {
    result.push(isJungByCode(word.charCodeAt(index)));
  }

  return result;
}
