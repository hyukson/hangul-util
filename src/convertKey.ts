import { combineHangul } from "./combine";
import { KEY_MAPS } from "./constant";
import { divideHangul } from "./divide";
import { LocalTypes } from "./types";
import { reverseByObject } from "./utils";

const REVERSE_MAPS: Record<string, string> = reverseByObject(KEY_MAPS);

function toKo(english: string = "") {
  return english
    .toString()
    .split("")
    .map((char) => REVERSE_MAPS[char] || char)
    .join("");
}

function toEn(korean: string = "") {
  return korean
    .toString()
    .split("")
    .map((char) => KEY_MAPS[char] || char)
    .join("");
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
