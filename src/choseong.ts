import { CHO_HANGUL, JUNG_HANGUL, JONG_HANGUL } from "./constant";
import { isHangulByCode } from "./isHangul";
import { getChoIndex, getJungIndex, getJongIndex } from "./syllable";

/** 각 글자를 인덱스 추출 함수 + 자모 표로 변환한다. 한글이 아니면 그대로 둔다. */
function mapByJamo(
  word: string,
  getIndex: (code: number) => number,
  table: readonly string[]
): string {
  let result = "";

  for (let i = 0; i < word.length; i++) {
    const code = word.charCodeAt(i);
    result += isHangulByCode(code) ? table[getIndex(code)] : word[i];
  }

  return result;
}

/**
 * 문자열에서 초성만 추출
 * @example getChoseong("프로그래밍") → "ㅍㄹㄱㄹㅁ"
 */
export function getChoseong(word: string = ""): string {
  return mapByJamo(word, getChoIndex, CHO_HANGUL);
}

/**
 * 문자열에서 중성만 추출
 * @example getJungseong("프로그래밍") → "ㅡㅗㅡㅐㅣ"
 */
export function getJungseong(word: string = ""): string {
  return mapByJamo(word, getJungIndex, JUNG_HANGUL);
}

/**
 * 문자열에서 종성만 추출 (종성 없으면 빈 문자열)
 * @example getJongseong("한글") → "ㄴㄹ"
 */
export function getJongseong(word: string = ""): string {
  return mapByJamo(word, getJongIndex, JONG_HANGUL);
}
