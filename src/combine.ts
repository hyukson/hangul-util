import {
  CHO_HANGUL,
  CHO_PERIOD,
  HANGUL_START_CHARCODE,
  JONG_COMPLETE_HANGUL,
  JONG_HANGUL,
  JUNG_COMPLETE_HANGUL,
  JUNG_HANGUL,
  JONG_PERIOD,
} from "./constant";

import { reverseByObject } from "./utils";

import { isCho } from "./isCho";
import { isJung } from "./isJung";
import { isJong } from "./isJong";
import { isHangulByCode } from "./isHangul";

const fromCharCodeMemo: Record<number, string> = {};

export function combineByCode(
  cho: number = 0,
  jung: number = 0,
  jong: number = 0
) {
  const hangulCode =
    HANGUL_START_CHARCODE + cho * CHO_PERIOD + jung * JONG_PERIOD + jong;

  if (!isHangulByCode(hangulCode)) {
    return "";
  }

  if (!fromCharCodeMemo[hangulCode]) {
    fromCharCodeMemo[hangulCode] = String.fromCharCode(hangulCode);
  }

  return fromCharCodeMemo[hangulCode];
}

export function combine(
  cho: string = "",
  jung: string = "",
  jong: string = ""
) {
  const combineJung = combineByJung(jung);
  const combineJong = combineByJong(jong);

  const choIndex = CHO_HANGUL.indexOf(cho);
  const jungIndex = JUNG_HANGUL.indexOf(combineJung);
  const jongIndex = JONG_HANGUL.indexOf(combineJong);

  if (choIndex === -1 || jungIndex === -1 || jongIndex === -1) {
    return cho || combineJung || combineJong;
  }

  return combineByCode(choIndex, jungIndex, jongIndex);
}

function combineLoop(wordList: string[]) {
  let index = 0;
  const result: string[] = [];

  while (index < wordList.length) {
    const first = wordList[index++];

    const cho = isCho(first) ? first : "";

    const jung = cho && isJung(wordList[index]) ? wordList[index++] : "";

    // 초성 또는 중성 합쳐지지 않고, 종성 의미 X,
    if (!cho || !jung) {
      result.push(first);
      continue;
    }

    // 중성이 없으면 소용 X
    const subJung = JUNG_COMPLETE_HANGUL[combineByJung(jung + wordList[index])]
      ? wordList[index++]
      : "";

    // 다음 문자에 모음이 안오는 경우 (합쳐질 가능성 존재)
    const jong =
      isJong(wordList[index]) && !isJung(wordList[index + 1])
        ? wordList[index++]
        : "";

    // 두 문자 모두 초성이면서 (이미 합쳐진 문자 X - ㅄ, ㄺ X)
    // 다음 문자에 모음이 안오는 경우 (합쳐질 가능성 존재)
    const subJong =
      JONG_COMPLETE_HANGUL[combineByJong(jong + wordList[index])] &&
      !isJung(wordList[index + 1])
        ? wordList[index++]
        : "";

    result.push(combine(cho, jung + subJung, jong + subJong));
  }

  return result.join("");
}

export function combineHangul(str: string | (string | string[])[] = "") {
  const word = typeof str === "string" ? str.toString().split("") : str;

  // Group 형식일 때, [ ['ㄱㅏ'], 'ㄴㅏ', ['ㄷ', 'ㅏ'] ]
  const result: string[] = [];
  const _temp: string[] = [];

  for (let index = 0; index < word.length; index++) {
    const item = word[index];

    if (typeof item === "string") {
      _temp.push(...item.toString().split(""));
    } else {
      result.push(
        combineLoop(_temp.splice(0)).concat(
          combineLoop(item.join("").split(""))
        )
      );
    }
  }

  result.push(combineLoop(_temp));

  return result.join("");
}

const REVERSE_JUNG_COMPLETE = reverseByObject(JUNG_COMPLETE_HANGUL);
const REVERSE_JONG_COMPLETE = reverseByObject(JONG_COMPLETE_HANGUL);

export function combineByJung(jung: string) {
  return REVERSE_JUNG_COMPLETE[jung] || jung;
}

export function combineByJong(jong: string) {
  return REVERSE_JONG_COMPLETE[jong] || jong;
}
