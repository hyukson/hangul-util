import {
  CHO_HANGUL,
  JUNG_HANGUL,
  JONG_HANGUL,
  JUNG_COMPLETE_HANGUL,
  JONG_COMPLETE_HANGUL,
  CHO_PERIOD,
  JONG_PERIOD,
  HANGUL_START_CHARCODE,
} from "./constant";
import { isHangulByCode } from "./isHangul";
import { combineByCode } from "./combine";

/**
 * 타이핑 효과를 위한 한글 분해 (각 자모가 추가되는 중간 과정 생성)
 * @example disassembleForTyping("한") → ["ㅎ", "하", "한"]
 * @example disassembleForTyping("한글") → ["ㅎ", "하", "한", "한ㄱ", "한그", "한글"]
 */
export function disassembleForTyping(text: string): string[] {
  const result: string[] = [];
  let accumulated = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const code = char.charCodeAt(0);

    if (!isHangulByCode(code)) {
      accumulated += char;
      result.push(accumulated);
      continue;
    }

    const charCode = code - HANGUL_START_CHARCODE;
    const choIndex = Math.floor(charCode / CHO_PERIOD);
    const jungIndex = Math.floor((charCode % CHO_PERIOD) / JONG_PERIOD);
    const jongIndex = charCode % JONG_PERIOD;

    // Step 1: 초성
    result.push(accumulated + CHO_HANGUL[choIndex]);

    // Step 2: 복합 중성이면 중간 단계 추가
    const jungStr = JUNG_HANGUL[jungIndex];
    const jungCompound = JUNG_COMPLETE_HANGUL[jungStr];

    if (jungCompound) {
      const firstJung = jungCompound[0];
      const firstJungIndex = JUNG_HANGUL.indexOf(firstJung);
      if (firstJungIndex !== -1) {
        result.push(accumulated + combineByCode(choIndex, firstJungIndex, 0));
      }
    }

    // Step 3: 초성 + 중성
    result.push(accumulated + combineByCode(choIndex, jungIndex, 0));

    // Step 4: 종성
    if (jongIndex !== 0) {
      const jongStr = JONG_HANGUL[jongIndex];
      const jongCompound = JONG_COMPLETE_HANGUL[jongStr];

      if (jongCompound) {
        const firstJong = jongCompound[0];
        const firstJongIndex = JONG_HANGUL.indexOf(firstJong);
        if (firstJongIndex !== -1) {
          result.push(
            accumulated + combineByCode(choIndex, jungIndex, firstJongIndex)
          );
        }
      }

      result.push(accumulated + char);
    }

    accumulated += char;
  }

  return result;
}
