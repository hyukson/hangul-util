import { isHangulByCode } from "./isHangul";
import { decomposeCode } from "./syllable";
import { pronounce } from "./pronounce";

// 국립국어원 로마자 표기법 (Revised Romanization of Korean)

// 초성 (어두)
const ROMANIZE_CHO = [
  "g", "kk", "n", "d", "tt",
  "r", "m", "b", "pp", "s",
  "ss", "", "j", "jj", "ch",
  "k", "t", "p", "h",
];

// 초성 (어두 대문자)
const ROMANIZE_CHO_INITIAL = [
  "G", "Kk", "N", "D", "Tt",
  "R", "M", "B", "Pp", "S",
  "Ss", "", "J", "Jj", "Ch",
  "K", "T", "P", "H",
];

// 중성
const ROMANIZE_JUNG = [
  "a", "ae", "ya", "yae", "eo",
  "e", "yeo", "ye", "o", "wa",
  "wae", "oe", "yo", "u", "wo",
  "we", "wi", "yu", "eu", "ui",
  "i",
];

// 종성
const ROMANIZE_JONG = [
  "", "k", "k", "k", "n", "n",
  "n", "t", "l", "k", "m",
  "p", "l", "l", "l", "l",
  "m", "p", "p", "t", "t",
  "ng", "t", "t", "k", "t",
  "p", "t",
];

/** 초성 ㄹ의 인덱스 */
const CHO_RIEUL = 5;
/** 종성 ㄹ의 인덱스 */
const JONG_RIEUL = 8;

export interface RomanizeOptions {
  /** 어두 초성을 대문자로 표기한다. */
  capitalize?: boolean;
  /** 음절 사이에 넣을 구분자. */
  separator?: string;
  /** 변환 전에 표준 발음법(음운 변동)을 먼저 적용한다. */
  usePronunciation?: boolean;
}

/**
 * 국립국어원 로마자 표기법에 따른 로마자 변환
 *
 * 표기법은 원칙적으로 표준 발음법에 따른 소리를 옮기도록 정하고 있다.
 * `usePronunciation: true`를 주면 변환 전에 `pronounce()`로 음운 변동을 적용한다.
 *
 * @example romanize("한글") → "hangeul"
 * @example romanize("대한민국") → "daehanminguk"
 * @example romanize("서울", { capitalize: true }) → "Seoul"
 * @example romanize("신라") → "sinra"
 * @example romanize("신라", { usePronunciation: true }) → "silla"
 */
export function romanize(text: string, options: RomanizeOptions = {}): string {
  const {
    capitalize = false,
    separator = "",
    usePronunciation = false,
  } = options;

  const source = usePronunciation ? pronounce(text) : text;

  const result: string[] = [];
  let isWordStart = true;
  /** 직전 음절의 종성 인덱스. 음절이 아니었으면 -1. */
  let prevJong = -1;

  for (let i = 0; i < source.length; i++) {
    const code = source.charCodeAt(i);

    if (!isHangulByCode(code)) {
      result.push(source[i]);
      if (source[i] === " " || source[i] === "\n" || source[i] === "\t") {
        isWordStart = true;
      }
      prevJong = -1;
      continue;
    }

    const { cho, jung, jong } = decomposeCode(code);

    if (separator && result.length > 0 && result[result.length - 1] !== " ") {
      const lastChar = result[result.length - 1];
      if (lastChar && /[a-zA-Z]/.test(lastChar)) {
        result.push(separator);
      }
    }

    let choStr =
      capitalize && isWordStart ? ROMANIZE_CHO_INITIAL[cho] : ROMANIZE_CHO[cho];

    // 표기법 규칙: "ㄹㄹ"은 "rr"이 아니라 "ll"로 적는다. (신라 → silla)
    if (cho === CHO_RIEUL && prevJong === JONG_RIEUL) {
      choStr = choStr === "R" ? "L" : "l";
    }

    result.push(choStr);
    result.push(ROMANIZE_JUNG[jung]);

    if (jong !== 0) {
      result.push(ROMANIZE_JONG[jong]);
    }

    isWordStart = false;
    prevJong = jong;
  }

  return result.join("");
}
