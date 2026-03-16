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

const reverseJung: Record<string, string> = {};
for (const [k, v] of Object.entries(JUNG_COMPLETE_HANGUL)) {
  reverseJung[v] = k;
}

const reverseJong: Record<string, string> = {};
for (const [k, v] of Object.entries(JONG_COMPLETE_HANGUL)) {
  reverseJong[v] = k;
}

/**
 * 한글을 자모 단위로 분해하여 배열 반환 (타이핑/슬라이스용)
 * 복합 모음/자음도 분해
 * @example hangulToJamo("한") → ["ㅎ", "ㅏ", "ㄴ"]
 * @example hangulToJamo("뷁") → ["ㅂ", "ㅜ", "ㅔ", "ㄹ", "ㄱ"]
 */
export function hangulToJamo(text: string): string[] {
  const result: string[] = [];

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);

    if (!isHangulByCode(code)) {
      result.push(text[i]);
      continue;
    }

    const charCode = code - HANGUL_START_CHARCODE;
    const choIndex = Math.floor(charCode / CHO_PERIOD);
    const jungIndex = Math.floor((charCode % CHO_PERIOD) / JONG_PERIOD);
    const jongIndex = charCode % JONG_PERIOD;

    result.push(CHO_HANGUL[choIndex]);

    const jung = JUNG_HANGUL[jungIndex];
    const jungSplit = JUNG_COMPLETE_HANGUL[jung];
    if (jungSplit) {
      result.push(...jungSplit.split(""));
    } else {
      result.push(jung);
    }

    if (jongIndex !== 0) {
      const jong = JONG_HANGUL[jongIndex];
      const jongSplit = JONG_COMPLETE_HANGUL[jong];
      if (jongSplit) {
        result.push(...jongSplit.split(""));
      } else {
        result.push(jong);
      }
    }
  }

  return result;
}

/**
 * 자모 단위로 문자열을 슬라이스 (잘린 한글이 부분적으로 보임)
 * @example hangulSlice("한글", 0, 2) → "하"  (ㅎ,ㅏ까지만)
 * @example hangulSlice("한글", 0, 3) → "한"  (ㅎ,ㅏ,ㄴ까지)
 * @example hangulSlice("한글", 0, 4) → "한ㄱ" (ㅎ,ㅏ,ㄴ,ㄱ까지)
 * @example hangulSlice("한글", 0, 5) → "한그" (ㅎ,ㅏ,ㄴ,ㄱ,ㅡ까지)
 */
export function hangulSlice(text: string, start: number = 0, end?: number): string {
  const jamos = hangulToJamo(text);
  const sliced = jamos.slice(start, end);

  // 자모들을 다시 한글로 합치기
  return assembleJamos(sliced);
}

/**
 * 자모 배열의 길이 반환 (자모 단위 길이)
 * @example hangulJamoLength("한글") → 6 (ㅎ,ㅏ,ㄴ,ㄱ,ㅡ,ㄹ)
 */
export function hangulJamoLength(text: string): number {
  return hangulToJamo(text).length;
}

function assembleJamos(jamos: string[]): string {
  let result = "";
  let i = 0;

  while (i < jamos.length) {
    const char = jamos[i];

    // 초성이 될 수 있는지 확인
    const choIndex = CHO_HANGUL.indexOf(char);
    if (choIndex === -1) {
      result += char;
      i++;
      continue;
    }

    // 다음이 중성인지 확인
    if (i + 1 >= jamos.length) {
      result += char;
      i++;
      continue;
    }

    const nextChar = jamos[i + 1];
    let jungIndex = JUNG_HANGUL.indexOf(nextChar);

    if (jungIndex === -1) {
      result += char;
      i++;
      continue;
    }

    i += 2;

    // 복합 중성 확인
    if (i < jamos.length) {
      const combined = nextChar + jamos[i];
      if (reverseJung[combined]) {
        const combJungIndex = JUNG_HANGUL.indexOf(reverseJung[combined]);
        if (combJungIndex !== -1) {
          jungIndex = combJungIndex;
          i++;
        }
      }
    }

    // 종성 확인
    let jongIndex = 0;

    if (i < jamos.length) {
      const jongChar = jamos[i];
      const tempJongIndex = JONG_HANGUL.indexOf(jongChar);

      if (tempJongIndex > 0) {
        // 다음 글자가 중성이면 이 자음은 다음 글자의 초성
        if (i + 1 < jamos.length && JUNG_HANGUL.indexOf(jamos[i + 1]) !== -1) {
          // 종성 없이 마무리
        } else {
          jongIndex = tempJongIndex;
          i++;

          // 복합 종성 확인
          if (i < jamos.length) {
            const nextJong = jongChar + jamos[i];
            if (reverseJong[nextJong]) {
              const combJongIndex = JONG_HANGUL.indexOf(reverseJong[nextJong]);
              if (combJongIndex !== -1) {
                // 복합 종성 뒤에 중성이 오면 두번째 자음은 다음 초성
                if (i + 1 < jamos.length && JUNG_HANGUL.indexOf(jamos[i + 1]) !== -1) {
                  // 복합 종성의 첫번째만 종성, 두번째는 다음 초성
                } else {
                  jongIndex = combJongIndex;
                  i++;
                }
              }
            }
          }
        }
      }
    }

    result += combineByCode(choIndex, jungIndex, jongIndex);
  }

  return result;
}
