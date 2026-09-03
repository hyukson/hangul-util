import { combineByCode } from "./combine";
import { CHO_HANGUL } from "./constant";

/** 초성 → 해당 초성으로 시작하는 완성형 한글 범위 (예: ㄱ → "[가-깋]") */
const CHO_RANGE: Record<string, string> = {};

CHO_HANGUL.forEach((cho, index) => {
  CHO_RANGE[cho] = `[${combineByCode(index, 0, 0)}-${combineByCode(
    index + 1,
    0,
    -1
  )}]`;
});

const CHO_PATTERN = new RegExp(`[${CHO_HANGUL.join("")}]`, "g");
const META_PATTERN = /[.*+?^${}()|[\]\\]/g;

/**
 * 초성 검색용 정규식을 만든다.
 *
 * 정규식 메타문자를 먼저 이스케이프한 뒤, 초성을 해당 초성으로 시작하는 음절
 * 범위로 바꾼다. (이스케이프하지 않으면 `includesByCho("(", ...)`처럼 사용자
 * 입력에 메타문자가 섞였을 때 정규식 컴파일이 실패한다.)
 */
export function makeRegexByCho(search: string = "") {
  const regex = search
    .replace(META_PATTERN, "\\$&")
    .replace(CHO_PATTERN, (cho) => CHO_RANGE[cho]);

  return new RegExp(`(${regex})`, "g");
}

export function includesByCho(search: string = "", word: string = "") {
  return makeRegexByCho(search).test(word);
}
