import {
  CHO_HANGUL,
  JUNG_HANGUL,
  JONG_HANGUL,
  JUNG_COMPLETE_HANGUL,
  JONG_COMPLETE_HANGUL,
  CHO_PERIOD,
  JONG_PERIOD,
  HANGUL_START_CHARCODE,
} from "./constant";

import { isHangulByCode } from "./isHangul";
import { DivideOptionTypes } from "./types";

export function divide(word: string = "", option: DivideOptionTypes = {}) {
  const { isSplit, resultType } = option;

  const wordCode = word.charCodeAt(0);
  const charCode = wordCode - HANGUL_START_CHARCODE;

  if (!isHangulByCode(wordCode)) {
    return [word[0]];
  }

  const choIndex = Math.floor(charCode / CHO_PERIOD);
  const jungIndex = Math.floor((charCode % CHO_PERIOD) / JONG_PERIOD);
  const jongIndex = charCode % JONG_PERIOD;

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

  return word.split("").map((char) => divide(char, { isSplit, resultType }));
}

export function divideHangul(word: string = "", isSplit: boolean = true) {
  const divided = word
    .split("")
    .map((char) => divide(char, { isSplit, resultType: "string" }))
    .join("");

  return divided.split("");
}

export function divideByJung(jung: string) {
  return JUNG_COMPLETE_HANGUL[jung] || jung;
}

export function divideByJong(jong: string) {
  return JONG_COMPLETE_HANGUL[jong] || jong;
}
