/**
 * 전각(全角) / 반각(半角) 변환.
 *
 * 전각 영숫자·기호(U+FF01~U+FF5E)는 반각 ASCII(U+0021~U+007E)와 겉보기만 다르고
 * 값이 달라, 검색·비교·유효성 검사에서 조용히 어긋난다. 한글 입력기나 일본어권
 * 시스템에서 넘어온 텍스트를 정리할 때 필요하다.
 */

/** 전각 "！" ~ "～" */
const FULL_WIDTH_START = 0xff01;
const FULL_WIDTH_END = 0xff5e;

/** 반각 "!" ~ "~" */
const HALF_WIDTH_START = 0x21;
const HALF_WIDTH_END = 0x7e;

/** 전각 공백과 반각 공백 */
const FULL_WIDTH_SPACE = 0x3000;
const HALF_WIDTH_SPACE = 0x20;

/** 전각과 반각의 코드포인트 차이 */
const WIDTH_OFFSET = FULL_WIDTH_START - HALF_WIDTH_START;

/**
 * 전각 문자를 반각으로 바꾼다.
 *
 * @example toHalfWidth("ＡＢＣ") → "ABC"
 * @example toHalfWidth("１２３") → "123"
 * @example toHalfWidth("한글　테스트") → "한글 테스트"   // 전각 공백도 변환
 */
export function toHalfWidth(text: string = ""): string {
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);

    if (code >= FULL_WIDTH_START && code <= FULL_WIDTH_END) {
      result += String.fromCharCode(code - WIDTH_OFFSET);
    } else if (code === FULL_WIDTH_SPACE) {
      result += " ";
    } else {
      result += text[i];
    }
  }

  return result;
}

/**
 * 반각 영숫자·기호를 전각으로 바꾼다.
 *
 * @example toFullWidth("ABC") → "ＡＢＣ"
 * @example toFullWidth("123") → "１２３"
 */
export function toFullWidth(text: string = ""): string {
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);

    if (code >= HALF_WIDTH_START && code <= HALF_WIDTH_END) {
      result += String.fromCharCode(code + WIDTH_OFFSET);
    } else if (code === HALF_WIDTH_SPACE) {
      result += String.fromCharCode(FULL_WIDTH_SPACE);
    } else {
      result += text[i];
    }
  }

  return result;
}
