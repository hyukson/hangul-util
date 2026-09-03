import {
  CHO_HANGUL,
  JUNG_HANGUL,
  JONG_HANGUL,
  JUNG_COMPLETE_HANGUL,
  JONG_COMPLETE_HANGUL,
} from "./constant";

import { isHangulByCode } from "./isHangul";
import { decomposeCode } from "./syllable";
import {
  DivideOptionTypes,
  DividedIndex,
  DividedJamo,
  DividedResult,
} from "./types";

/** 한 글자를 초/중/종성 인덱스로 반환한다. */
export function divide(
  word: string | undefined,
  option: DivideOptionTypes & { resultType: "index" }
): DividedIndex | string[];
/** 한 글자를 초/중/종성 문자열 객체로 반환한다. */
export function divide(
  word: string | undefined,
  option: DivideOptionTypes & { resultType: "object" }
): DividedJamo | string[];
/** 한 글자를 이어붙인 자모 문자열로 반환한다. */
export function divide(
  word: string | undefined,
  option: DivideOptionTypes & { resultType: "string" }
): string | string[];
/** 한 글자를 자모 배열로 반환한다. (기본값) */
export function divide(
  word?: string,
  option?: DivideOptionTypes
): DividedResult;
export function divide(
  word: string = "",
  option: DivideOptionTypes = {}
): DividedResult {
  const { isSplit, resultType } = option;

  const wordCode = word.charCodeAt(0);

  if (!isHangulByCode(wordCode)) {
    return [word[0]];
  }

  const { cho: choIndex, jung: jungIndex, jong: jongIndex } =
    decomposeCode(wordCode);

  const cho = CHO_HANGUL[choIndex] || "";
  const jung = JUNG_HANGUL[jungIndex] || "";
  const jong = JONG_HANGUL[jongIndex] || "";

  // 더 세분하게 분리하기 ㅙ -> ㅗㅐ
  const dividedJung = isSplit ? divideByJung(jung) : jung;
  const dividedJong = isSplit ? divideByJong(jong) : jong;

  if (resultType === "index") {
    return { cho: choIndex, jung: jungIndex, jong: jongIndex };
  }

  if (resultType === "object") {
    return { cho, jung: dividedJung, jong: dividedJong };
  }

  if (resultType === "string") {
    return cho + dividedJung + dividedJong;
  }

  return (cho + dividedJung + dividedJong).split("");
}

export function divideHangulByGroups(
  word: string = "",
  option: DivideOptionTypes = {}
) {
  const isSplit = option?.isSplit ?? true;
  const resultType = option?.resultType ?? "array";

  return word
    .toString()
    .split("")
    .map((char) => divide(char, { isSplit, resultType }));
}

export function divideHangul(word: string = "", isSplit: boolean = true) {
  const str = word.toString();
  const result: string[] = [];

  for (let i = 0; i < str.length; i++) {
    // 한글이면 자모 문자열, 아니면 원본 한 글자짜리 배열. 둘 다 인덱스로 순회 가능하다.
    const divided = divide(str[i], { isSplit, resultType: "string" });
    for (let j = 0; j < divided.length; j++) result.push(divided[j]);
  }

  return result;
}

export function divideByJung(jung: string) {
  return JUNG_COMPLETE_HANGUL[jung] || jung;
}

export function divideByJong(jong: string) {
  return JONG_COMPLETE_HANGUL[jong] || jong;
}
