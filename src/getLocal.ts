import { LocalTypes } from "./types";
import { makePercentByObject } from "./utils";
import {
  HANGUL_START_CHARCODE,
  HANGUL_END_CHARCODE,
  JAMO_START_CHARCODE,
  JAMO_END_CHARCODE,
} from "./constant";

// 문자 클래스 안의 "|"는 대체(alternation)가 아니라 문자 그대로의 파이프다.
// 원래는 구분자로 쓰려던 것이지만 실제로는 "|"를 한글/영어로 분류하게 만들었으므로 제거했다.
const LANGUAGE_REGEXP: Record<LocalTypes, RegExp> = {
  ko: /^[가-힣ㄱ-ㅎㅏ-ㅣ\s]+$/,
  en: /^[a-zA-Z\s]+$/,
  number: /^[0-9]+$/,
  special: /^[`~!@#$%^&*()_+\-=\\|{}[\];:'"<,.>/?\s]+$/,
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
    (code >= HANGUL_START_CHARCODE && code <= HANGUL_END_CHARCODE) ||
    (code >= JAMO_START_CHARCODE && code <= JAMO_END_CHARCODE)
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

/** 각 글자의 언어 종류를 배열로 반환한다. */
export function getLocalByGroups(word?: string, isPercent?: false): LocalTypes[];
/** 언어 종류별 비율(%)을 반환한다. */
export function getLocalByGroups(
  word: string | undefined,
  isPercent: true
): Record<LocalTypes, number>;
export function getLocalByGroups(
  word?: string,
  isPercent?: boolean
): LocalTypes[] | Record<LocalTypes, number>;
export function getLocalByGroups(
  word: string = "",
  isPercent: boolean = false
): LocalTypes[] | Record<LocalTypes, number> {
  const countObject = {
    ko: 0,
    en: 0,
    number: 0,
    special: 0,
    etc: 0,
  };

  const result: LocalTypes[] = [];

  for (let index = 0; index < word.length; index++) {
    const language = getLocalByCode(word.charCodeAt(index));

    if (isPercent) {
      countObject[language]++;
    } else {
      result.push(language);
    }
  }

  if (isPercent) {
    return makePercentByObject(countObject) as Record<LocalTypes, number>;
  }

  return result;
}
