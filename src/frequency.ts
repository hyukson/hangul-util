import {
  CHO_HANGUL,
  JUNG_HANGUL,
  JONG_HANGUL,
  CHO_PERIOD,
  JONG_PERIOD,
  HANGUL_START_CHARCODE,
} from "./constant";
import { isHangulByCode } from "./isHangul";

interface FrequencyResult {
  cho: Record<string, number>;
  jung: Record<string, number>;
  jong: Record<string, number>;
  total: number;
}

/**
 * 한글 텍스트의 자모 빈도수 분석
 * @example
 * hangulFrequency("안녕하세요")
 * // { cho: { ㅇ: 2, ㄴ: 1, ㅎ: 1, ㅅ: 1 }, jung: { ... }, jong: { ... }, total: 5 }
 */
export function hangulFrequency(text: string): FrequencyResult {
  const cho: Record<string, number> = {};
  const jung: Record<string, number> = {};
  const jong: Record<string, number> = {};
  let total = 0;

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (!isHangulByCode(code)) continue;

    const charCode = code - HANGUL_START_CHARCODE;
    const choIndex = Math.floor(charCode / CHO_PERIOD);
    const jungIndex = Math.floor((charCode % CHO_PERIOD) / JONG_PERIOD);
    const jongIndex = charCode % JONG_PERIOD;

    const choChar = CHO_HANGUL[choIndex];
    const jungChar = JUNG_HANGUL[jungIndex];
    const jongChar = JONG_HANGUL[jongIndex];

    cho[choChar] = (cho[choChar] || 0) + 1;
    jung[jungChar] = (jung[jungChar] || 0) + 1;
    if (jongChar) {
      jong[jongChar] = (jong[jongChar] || 0) + 1;
    }

    total++;
  }

  return { cho, jung, jong, total };
}

/**
 * 텍스트에서 가장 많이 사용된 초성 반환
 * @example mostFrequentChoseong("사과 수박 사탕 시금치") → "ㅅ"
 */
export function mostFrequentChoseong(text: string): string {
  const { cho } = hangulFrequency(text);
  let maxChar = "";
  let maxCount = 0;

  for (const [char, count] of Object.entries(cho)) {
    if (count > maxCount) {
      maxCount = count;
      maxChar = char;
    }
  }

  return maxChar;
}
