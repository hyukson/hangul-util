import {
  CHO_PERIOD,
  JONG_PERIOD,
  HANGUL_START_CHARCODE,
  HANGUL_END_CHARCODE,
} from "./constant";

export interface Syllable {
  cho: number;
  jung: number;
  jong: number;
}

/**
 * 완성형 한글 코드포인트를 초/중/종성 인덱스로 분해한다.
 * 호출 전에 `isHangulByCode`로 완성형 여부를 확인해야 한다.
 */
export function decomposeCode(code: number): Syllable {
  const charCode = code - HANGUL_START_CHARCODE;

  return {
    cho: Math.floor(charCode / CHO_PERIOD),
    jung: Math.floor((charCode % CHO_PERIOD) / JONG_PERIOD),
    jong: charCode % JONG_PERIOD,
  };
}

export function getChoIndex(code: number): number {
  return Math.floor((code - HANGUL_START_CHARCODE) / CHO_PERIOD);
}

export function getJungIndex(code: number): number {
  return Math.floor(((code - HANGUL_START_CHARCODE) % CHO_PERIOD) / JONG_PERIOD);
}

export function getJongIndex(code: number): number {
  return (code - HANGUL_START_CHARCODE) % JONG_PERIOD;
}

/** 초/중/종성 인덱스를 완성형 한글 코드포인트로 합친다. */
export function composeCode(cho: number, jung: number, jong: number): number {
  return HANGUL_START_CHARCODE + cho * CHO_PERIOD + jung * JONG_PERIOD + jong;
}

export function isHangulCode(code: number): boolean {
  return HANGUL_START_CHARCODE <= code && code <= HANGUL_END_CHARCODE;
}
