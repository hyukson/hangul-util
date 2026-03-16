import {
  CHO_PERIOD,
  JONG_PERIOD,
  HANGUL_START_CHARCODE,
} from "./constant";
import { isHangulByCode } from "./isHangul";

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

interface RomanizeOptions {
  capitalize?: boolean;
  separator?: string;
}

/**
 * 국립국어원 로마자 표기법에 따른 로마자 변환
 * @example romanize("한글") → "hangeul"
 * @example romanize("대한민국") → "daehanminguk"
 * @example romanize("서울", { capitalize: true }) → "Seoul"
 */
export function romanize(text: string, options: RomanizeOptions = {}): string {
  const { capitalize = false, separator = "" } = options;
  const result: string[] = [];
  let isWordStart = true;

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);

    if (!isHangulByCode(code)) {
      result.push(text[i]);
      if (text[i] === " " || text[i] === "\n" || text[i] === "\t") {
        isWordStart = true;
      }
      continue;
    }

    const charCode = code - HANGUL_START_CHARCODE;
    const cho = Math.floor(charCode / CHO_PERIOD);
    const jung = Math.floor((charCode % CHO_PERIOD) / JONG_PERIOD);
    const jong = charCode % JONG_PERIOD;

    if (separator && result.length > 0 && result[result.length - 1] !== " ") {
      const lastChar = result[result.length - 1];
      if (lastChar && /[a-zA-Z]/.test(lastChar)) {
        result.push(separator);
      }
    }

    const choStr = capitalize && isWordStart
      ? ROMANIZE_CHO_INITIAL[cho]
      : ROMANIZE_CHO[cho];

    result.push(choStr);
    result.push(ROMANIZE_JUNG[jung]);

    if (jong !== 0) {
      result.push(ROMANIZE_JONG[jong]);
    }

    isWordStart = false;
  }

  return result.join("");
}
