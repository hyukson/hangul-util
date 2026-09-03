import { NORMALIZE_CHO, NORMALIZE_JUNG, NORMALIZE_JONG } from "./constant";
import { isHangulByCode } from "./isHangul";
import { decomposeCode } from "./syllable";

/**
 * 한글을 발음에 가까운 알파벳 표기로 바꾼다.
 * 한글이 아닌 문자는 그대로 둔다.
 *
 * @param text 변환할 문자열
 * @param isSpace 음절 사이를 공백으로 구분할지 여부
 * @example normalize("사과") → "sa gwa"
 * @example normalize("이탈리아", false) → "itarria"
 */
export function normalize(text: string = "", isSpace: boolean = true): string {
  const space = isSpace ? " " : "";

  let result = "";

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);

    if (!isHangulByCode(code)) {
      result += text[i];
      continue;
    }

    const { cho, jung, jong } = decomposeCode(code);

    result +=
      NORMALIZE_CHO[cho] + NORMALIZE_JUNG[jung] + NORMALIZE_JONG[jong] + space;
  }

  return result.replace(/\s{2,}/g, " ").trim();
}
