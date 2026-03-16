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

function getLocalByCode(code: number): LocalTypes {
  if (
    (code >= 0xAC00 && code <= 0xD7A3) ||
    (code >= 0x3131 && code <= 0x314E) ||
    (code >= 0x314F && code <= 0x3163)
  ) return "ko";
  if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) return "en";
  if (code >= 48 && code <= 57) return "number";
  if (
    code === 32 || code === 9 || code === 10 || code === 13 ||
    (code >= 33 && code <= 47) || (code >= 58 && code <= 64) ||
    (code >= 91 && code <= 96) || (code >= 123 && code <= 126)
  ) return "special";
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
    const language = getLocalByCode(word.charCodeAt(index));

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
