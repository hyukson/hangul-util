import {
  HANGUL_START_CHARCODE,
  HANGUL_END_CHARCODE,
  JAMO_START_CHARCODE,
  JAMO_END_CHARCODE,
  CONSONANT_START_CHARCODE,
  CONSONANT_END_CHARCODE,
  VOWEL_START_CHARCODE,
  VOWEL_END_CHARCODE,
} from "./constant";

/** 문자열의 모든 글자가 주어진 코드 범위 안에 있는지 확인한다. */
function everyCharInRange(word: string, start: number, end: number): boolean {
  if (!word) return false;

  for (let i = 0; i < word.length; i++) {
    const code = word.charCodeAt(i);
    if (code < start || code > end) return false;
  }

  return true;
}

/**
 * 자모(ㄱ-ㅣ)인지 확인
 * @example isJamo("ㄱ") → true
 * @example isJamo("가") → false
 */
export function isJamo(word: string = ""): boolean {
  return everyCharInRange(word, JAMO_START_CHARCODE, JAMO_END_CHARCODE);
}

/**
 * 각 글자가 자모인지 배열로 반환
 */
export function isJamoByGroups(word: string = ""): boolean[] {
  const result: boolean[] = [];

  for (let i = 0; i < word.length; i++) {
    const code = word.charCodeAt(i);
    result.push(code >= JAMO_START_CHARCODE && code <= JAMO_END_CHARCODE);
  }

  return result;
}

/**
 * 자음(ㄱ-ㅎ)인지 확인
 * @example isConsonant("ㄱ") → true
 * @example isConsonant("ㅏ") → false
 */
export function isConsonant(word: string = ""): boolean {
  return everyCharInRange(
    word,
    CONSONANT_START_CHARCODE,
    CONSONANT_END_CHARCODE
  );
}

/**
 * 모음(ㅏ-ㅣ)인지 확인
 * @example isVowel("ㅏ") → true
 * @example isVowel("ㄱ") → false
 */
export function isVowel(word: string = ""): boolean {
  return everyCharInRange(word, VOWEL_START_CHARCODE, VOWEL_END_CHARCODE);
}

/**
 * 완성형 한글(가-힣)인지 확인 (자모 제외)
 * @example isCompleteHangul("가") → true
 * @example isCompleteHangul("ㄱ") → false
 */
export function isCompleteHangul(word: string = ""): boolean {
  return everyCharInRange(word, HANGUL_START_CHARCODE, HANGUL_END_CHARCODE);
}

/**
 * 각 글자가 완성형 한글인지 배열로 반환
 */
export function isCompleteHangulByGroups(word: string = ""): boolean[] {
  const result: boolean[] = [];

  for (let i = 0; i < word.length; i++) {
    const code = word.charCodeAt(i);
    result.push(
      code >= HANGUL_START_CHARCODE && code <= HANGUL_END_CHARCODE
    );
  }

  return result;
}

const DOUBLE_CONSONANTS = new Set(["ㄲ", "ㄸ", "ㅃ", "ㅆ", "ㅉ"]);

/**
 * 쌍자음인지 확인
 * @example isDoubleConsonant("ㄲ") → true
 * @example isDoubleConsonant("ㄱ") → false
 */
export function isDoubleConsonant(word: string = ""): boolean {
  if (!word) return false;

  for (let i = 0; i < word.length; i++) {
    if (!DOUBLE_CONSONANTS.has(word[i])) return false;
  }

  return true;
}
