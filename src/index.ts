// 한글 판별
export { isCho, isChoByChar, isChoByGroups } from "./isCho";
export { isJung, isJungByCode, isJungByGroups } from "./isJung";
export { isJong, isJongByCode, isJongByGroups } from "./isJong";
export { isHangul, isHangulByCode, isHangulByGroups } from "./isHangul";
export {
  isJamo,
  isJamoByGroups,
  isConsonant,
  isVowel,
  isCompleteHangul,
  isCompleteHangulByGroups,
  isDoubleConsonant,
} from "./isJamo";

// 한글 분리/결합
export {
  divide,
  divideByJong,
  divideByJung,
  divideHangul,
  divideHangulByGroups,
} from "./divide";

export {
  combine,
  combineHangul,
  combineByCode,
  combineByJung,
  combineByJong,
} from "./combine";

// 초성/중성/종성 추출
export { getChoseong, getJungseong, getJongseong } from "./choseong";
export { hasJongseong, hasJongseongByGroups } from "./hasJongseong";

// 초/중/종성 교체 및 제거
export {
  removeJongseong,
  replaceChoseong,
  replaceJungseong,
  replaceJongseong,
} from "./replaceJamo";

// 한글 추출/검출
export {
  extractHangul,
  containsHangul,
  removeHangul,
  hangulLength,
} from "./extract";

// 한글 검색
export {
  hangulIncludes,
  hangulStartsWith,
  hangulEndsWith,
  hangulFilter,
  hangulHighlight,
} from "./hangulSearch";

export * from "./includesByCho";

// 정렬
export * from "./sortHangul";

// 숫자 변환
export * from "./formatNumber";
export { hangulToNumber } from "./hangulToNumber";
export { nativeKoreanToNumber } from "./nativeKoreanToNumber";
export {
  nativeKoreanNumber,
  counter,
  ordinal,
  sinoKoreanNumber,
} from "./nativeNumber";

// 날짜
export * from "./formatDate";
export { days, months } from "./days";

// 조사
export * from "./josa";

// 존댓말/반말
export * from "./banmal";
export { detectSpeechLevel, isFormal, isInformal } from "./speechLevel";

// 발음
export { pronounce } from "./pronounce";

// 로마자 변환
export { romanize } from "./romanize";
export * from "./normalize";

// 키보드 변환
export * from "./convertKey";

// 타이핑 효과
export { disassembleForTyping } from "./typing";

// 자모 단위 슬라이스
export { hangulToJamo, hangulSlice, hangulJamoLength } from "./hangulSlice";

// 빈도 분석
export { hangulFrequency, mostFrequentChoseong } from "./frequency";

// 거리/유사도
export * from "./distance";

// 언어 감지
export * from "./getLocal";

// 인코딩
export * from "./encode";

// 유니코드 정규화 (조합형 자모 / NFD)
export {
  normalizeHangul,
  toCompatibilityJamo,
  toConjoiningJamo,
  hasConjoiningJamo,
} from "./jamoNormalize";

// 바이트 길이
export { getByteLength, sliceByByte } from "./byteLength";
export type { ByteEncoding } from "./byteLength";

// 전각/반각
export { toHalfWidth, toFullWidth } from "./width";

// 유틸리티
export * from "./utils";

// 타입
export type {
  LocalTypes,
  DivideOptionTypes,
  TypingOptionTypes,
  DividedIndex,
  DividedJamo,
  DividedResult,
} from "./types";
export type { RomanizeOptions } from "./romanize";
export type { Syllable } from "./syllable";
export {
  decomposeCode,
  composeCode,
  getChoIndex,
  getJungIndex,
  getJongIndex,
} from "./syllable";
