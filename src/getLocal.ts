import { LocalTypes } from "./types";
import { makePercentByObject } from "./utils";

const LANGUAGE_REGEXP: Record<LocalTypes, RegExp> = {
  ko: /^[가-힣|ㄱ-ㅎ|ㅏ-ㅣ|\s]+$/,
  en: /^[a-zA-Z|\s]+$/,
  number: /^[0-9]+$/,
  special: /^[\`\~\!\@\#\$\%\^\&\*\(\)\_\+\-\=\\\|\{\}\[\]\;\:\'\"\<\,\.\>\/\?\s]+$/,
  etc: /.*/,
};

export function getLocal(word: string = "") {
  if (LANGUAGE_REGEXP["special"].test(word)) {
    return "special";
  }

  if (LANGUAGE_REGEXP["ko"].test(word)) {
    return "ko";
  }

  if (LANGUAGE_REGEXP["en"].test(word)) {
    return "en";
  }

  if (LANGUAGE_REGEXP["number"].test(word)) {
    return "number";
  }

  return "etc";
}

export function getLocalByGroups(
  word: string = "",
  isPercent: boolean = false,
) {
  const countObject = {
    ko: 0,
    en: 0,
    number: 0,
    special: 0,
    etc: 0,
  };
  
  const result: string[] = [];

  for (let index = 0; index < word.length; index++) {
    const language = getLocal(word[index]);

    if (isPercent) {
      countObject[language]++;
    } else {
      result.push(language);
    }
  }

  if (isPercent) {
    return makePercentByObject(countObject);
  }

  return result;
}
