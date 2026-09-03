import { CHO_HANGUL, JUNG_HANGUL, JONG_HANGUL } from "./constant";

/**
 * 유니코드에는 한글 자모가 두 벌 있다.
 *
 * - 호환 자모 (U+3131~U+3163) — "ㄱ", "ㅏ". 이 라이브러리의 모든 함수가 쓰는 형태.
 * - 조합형 자모 (U+1100~U+11FF) — 완성형 음절을 NFD로 분해하면 나오는 형태.
 *   초성/중성/종성이 서로 다른 코드로 구분된다.
 *
 * macOS 파일명(NFD), 일부 API 응답, 일부 입력기에서 조합형 자모가 그대로 들어오는데
 * 겉보기 글자는 같아서 눈으로는 구분되지 않는다. 이 경우 `isHangul`, `extractHangul`,
 * 초성 검색 등이 조용히 실패하므로 입력을 먼저 이 모듈로 정규화해야 한다.
 */

/** 조합형 초성 시작 (ᄀ) */
const CONJOINING_CHO_START = 0x1100;
/** 조합형 초성 끝 (ᅘ 이전, 현대 한글 19자) */
const CONJOINING_CHO_END = CONJOINING_CHO_START + CHO_HANGUL.length - 1;

/** 조합형 중성 시작 (ᅡ) */
const CONJOINING_JUNG_START = 0x1161;
const CONJOINING_JUNG_END = CONJOINING_JUNG_START + JUNG_HANGUL.length - 1;

/** 조합형 종성 시작 (ᆨ) — JONG_HANGUL[0]은 빈 종성이라 1부터 대응된다. */
const CONJOINING_JONG_START = 0x11a8;
const CONJOINING_JONG_END = CONJOINING_JONG_START + JONG_HANGUL.length - 2;

/** 조합형 자모 영역 전체 (한글 자모 블록) */
const CONJOINING_BLOCK_START = 0x1100;
const CONJOINING_BLOCK_END = 0x11ff;

/**
 * 문자열에 조합형 자모(U+1100~U+11FF)가 들어있는지 확인한다.
 *
 * @example hasConjoiningJamo("한글") → false
 * @example hasConjoiningJamo("한글".normalize("NFD")) → true
 */
export function hasConjoiningJamo(text: string = ""): boolean {
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code >= CONJOINING_BLOCK_START && code <= CONJOINING_BLOCK_END) {
      return true;
    }
  }

  return false;
}

/**
 * 조합형 자모(U+1100~U+11FF)를 호환 자모(U+3131~U+3163)로 바꾼다.
 * 완성형 음절과 그 밖의 문자는 그대로 둔다.
 *
 * @example toCompatibilityJamo("ᄀ") → "ㄱ"
 * @example toCompatibilityJamo("ᆨ") → "ㄱ"   // 종성 ㄱ도 같은 호환 자모로
 */
export function toCompatibilityJamo(text: string = ""): string {
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);

    if (code >= CONJOINING_CHO_START && code <= CONJOINING_CHO_END) {
      result += CHO_HANGUL[code - CONJOINING_CHO_START];
    } else if (code >= CONJOINING_JUNG_START && code <= CONJOINING_JUNG_END) {
      result += JUNG_HANGUL[code - CONJOINING_JUNG_START];
    } else if (code >= CONJOINING_JONG_START && code <= CONJOINING_JONG_END) {
      result += JONG_HANGUL[code - CONJOINING_JONG_START + 1];
    } else {
      result += text[i];
    }
  }

  return result;
}

/**
 * 호환 자모(U+3131~U+3163)를 조합형 자모(U+1100~U+11FF)로 바꾼다.
 *
 * 호환 자모의 자음은 초성인지 종성인지 구분이 없으므로 `position`으로 지정한다.
 * (기본값 "cho" — 초성으로 본다.)
 *
 * @example toConjoiningJamo("ㄱ") → "ᄀ"
 * @example toConjoiningJamo("ㄱ", "jong") → "ᆨ"
 */
export function toConjoiningJamo(
  text: string = "",
  position: "cho" | "jong" = "cho"
): string {
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    const jungIndex = JUNG_HANGUL.indexOf(char);
    if (jungIndex !== -1) {
      result += String.fromCharCode(CONJOINING_JUNG_START + jungIndex);
      continue;
    }

    if (position === "jong") {
      // JONG_HANGUL[0]은 빈 문자열이므로 1부터 찾는다.
      const jongIndex = JONG_HANGUL.indexOf(char, 1);
      if (jongIndex !== -1) {
        result += String.fromCharCode(CONJOINING_JONG_START + jongIndex - 1);
        continue;
      }
    }

    const choIndex = CHO_HANGUL.indexOf(char);
    if (choIndex !== -1) {
      result += String.fromCharCode(CONJOINING_CHO_START + choIndex);
      continue;
    }

    result += char;
  }

  return result;
}

/**
 * 한글을 이 라이브러리의 다른 함수들이 이해하는 형태로 정규화한다.
 *
 * 1. NFC로 합쳐 분해된 음절(NFD)을 완성형으로 되돌리고
 * 2. 그래도 남은 홑 조합형 자모를 호환 자모로 바꾼다.
 *
 * macOS 파일명이나 외부 입력을 다룰 때 다른 함수를 호출하기 전에 한 번 통과시키면 된다.
 *
 * @example normalizeHangul("한글".normalize("NFD")) → "한글"
 * @example normalizeHangul("가") → "가"
 * @example normalizeHangul("ᄀ") → "ㄱ"
 */
export function normalizeHangul(text: string = ""): string {
  const composed = text.normalize("NFC");

  // NFC로 합쳐지지 않은 홑 자모가 남아있을 때만 추가로 변환한다.
  return hasConjoiningJamo(composed)
    ? toCompatibilityJamo(composed)
    : composed;
}
