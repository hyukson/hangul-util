import { HANGUL_START_CHARCODE, HANGUL_END_CHARCODE } from "./constant";

const JAMO_START = 0x3131; // ㄱ
const JAMO_END = 0x3163;   // ㅣ
const CONSONANT_START = 0x3131; // ㄱ
const CONSONANT_END = 0x314E;   // ㅎ
const VOWEL_START = 0x314F; // ㅏ
const VOWEL_END = 0x3163;   // ㅣ

/**
 * 자모(ㄱ-ㅣ)인지 확인
 * @example isJamo("ㄱ") → true
 * @example isJamo("가") → false
 */
export function isJamo(word: string = ""): boolean {
  if (!word) return false;
  for (let i = 0; i < word.length; i++) {
    const code = word.charCodeAt(i);
    if (code < JAMO_START || code > JAMO_END) return false;
  }
  return true;
}

/**
 * 각 글자가 자모인지 배열로 반환
 */
export function isJamoByGroups(word: string = ""): boolean[] {
  return word.split("").map((char) => {
    const code = char.charCodeAt(0);
    return code >= JAMO_START && code <= JAMO_END;
  });
}

/**
 * 자음(ㄱ-ㅎ)인지 확인
 * @example isConsonant("ㄱ") → true
 * @example isConsonant("ㅏ") → false
 */
export function isConsonant(word: string = ""): boolean {
  if (!word) return false;
  for (let i = 0; i < word.length; i++) {
    const code = word.charCodeAt(i);
    if (code < CONSONANT_START || code > CONSONANT_END) return false;
  }
  return true;
}

/**
 * 모음(ㅏ-ㅣ)인지 확인
 * @example isVowel("ㅏ") → true
 * @example isVowel("ㄱ") → false
 */
export function isVowel(word: string = ""): boolean {
  if (!word) return false;
  for (let i = 0; i < word.length; i++) {
    const code = word.charCodeAt(i);
    if (code < VOWEL_START || code > VOWEL_END) return false;
  }
  return true;
}

/**
 * 완성형 한글(가-힣)인지 확인 (자모 제외)
 * @example isCompleteHangul("가") → true
 * @example isCompleteHangul("ㄱ") → false
 */
export function isCompleteHangul(word: string = ""): boolean {
  if (!word) return false;
  for (let i = 0; i < word.length; i++) {
    const code = word.charCodeAt(i);
    if (code < HANGUL_START_CHARCODE || code > HANGUL_END_CHARCODE) return false;
  }
  return true;
}

/**
 * 각 글자가 완성형 한글인지 배열로 반환
 */
export function isCompleteHangulByGroups(word: string = ""): boolean[] {
  return word.split("").map((char) => {
    const code = char.charCodeAt(0);
    return code >= HANGUL_START_CHARCODE && code <= HANGUL_END_CHARCODE;
  });
}

/**
 * 쌍자음인지 확인
 * @example isDoubleConsonant("ㄲ") → true
 * @example isDoubleConsonant("ㄱ") → false
 */
const doubles = new Set(["ㄲ", "ㄸ", "ㅃ", "ㅆ", "ㅉ"]);

export function isDoubleConsonant(word: string = ""): boolean {
  if (!word) return false;
  for (let i = 0; i < word.length; i++) {
    if (!doubles.has(word[i])) return false;
  }
  return true;
}
