import { combineHangul } from "./combine";
import { KEY_MAPS } from "./constant";
import { divideHangul } from "./divide";
import { LocalTypes } from "./types";
import { reverseByObject } from "./utils";

const REVERSE_MAPS: Record<string, string> = reverseByObject(KEY_MAPS);

function toKo(english: string = "") {
  const str = english.toString();
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += REVERSE_MAPS[str[i]] || str[i];
  }
  return result;
}

function toEn(korean: string = "") {
  const str = korean.toString();
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += KEY_MAPS[str[i]] || str[i];
  }
  return result;
}

export function convertKey(
  word: string = "",
  toLanguage: LocalTypes = "ko",
  isCombine: boolean = true
) {
  const hangul = (
    isCombine ? divideHangul(word) : word.toString().split("")
  ).join("");

  // 한타로 변환
  if (toLanguage === "ko") {
    return isCombine ? combineHangul(toKo(hangul)) : toKo(hangul);
  }

  // 영타로 변환
  if (toLanguage === "en") {
    return toEn(hangul);
  }

  return word;
}
