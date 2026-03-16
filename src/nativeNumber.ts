import { numberUnits, tenUnits, thousandUnits } from "./constant";

const NATIVE_NUMBERS: Record<number, string> = {
  1: "하나", 2: "둘", 3: "셋", 4: "넷", 5: "다섯",
  6: "여섯", 7: "일곱", 8: "여덟", 9: "아홉", 10: "열",
  20: "스물", 30: "서른", 40: "마흔", 50: "쉰",
  60: "예순", 70: "일흔", 80: "여든", 90: "아흔",
};

const NATIVE_COUNTER: Record<number, string> = {
  1: "한", 2: "두", 3: "세", 4: "네", 5: "다섯",
  6: "여섯", 7: "일곱", 8: "여덟", 9: "아홉", 10: "열",
  20: "스물", 30: "서른", 40: "마흔", 50: "쉰",
  60: "예순", 70: "일흔", 80: "여든", 90: "아흔",
};

/**
 * 숫자를 고유어 수사로 변환 (1~99)
 * @example nativeKoreanNumber(1) → "하나"
 * @example nativeKoreanNumber(25) → "스물다섯"
 */
export function nativeKoreanNumber(n: number): string {
  if (n <= 0 || n > 99 || !Number.isInteger(n)) return "";

  if (n <= 10) return NATIVE_NUMBERS[n];

  const tens = Math.floor(n / 10) * 10;
  const ones = n % 10;

  return (NATIVE_NUMBERS[tens] || "") + (ones ? NATIVE_NUMBERS[ones] : "");
}

/**
 * 숫자 + 단위명사 (수 관형사 형태)
 * @example counter(3, "개") → "세 개"
 * @example counter(1, "명") → "한 명"
 * @example counter(20, "살") → "스무 살"
 */
export function counter(n: number, unit: string = ""): string {
  if (n <= 0 || n > 99 || !Number.isInteger(n)) return "";

  let numStr: string;

  if (n === 20) {
    numStr = "스무";
  } else if (n <= 10) {
    numStr = NATIVE_COUNTER[n];
  } else {
    const tens = Math.floor(n / 10) * 10;
    const ones = n % 10;
    numStr = (NATIVE_COUNTER[tens] || "") + (ones ? NATIVE_COUNTER[ones] : "");
  }

  return unit ? `${numStr} ${unit}` : numStr;
}

/**
 * 서수사 반환
 * @example ordinal(1) → "첫째"
 * @example ordinal(3) → "셋째"
 * @example ordinal(11) → "열하나째"
 */
export function ordinal(n: number): string {
  if (n <= 0 || !Number.isInteger(n)) return "";

  if (n === 1) return "첫째";

  const native = nativeKoreanNumber(n);
  return native ? native + "째" : "";
}

/**
 * 숫자를 한자어 수사(순한글)로 변환
 * @example sinoKoreanNumber(123) → "백이십삼"
 * @example sinoKoreanNumber(10000) → "만"
 * @example sinoKoreanNumber(0) → "영"
 */
export function sinoKoreanNumber(n: number): string {
  if (!Number.isInteger(n) || n < 0) return "";
  if (n === 0) return "영";

  const str = String(n);
  const chunks: string[] = [];
  let start = str.length;

  while (start > 0) {
    const end = start;
    start = Math.max(0, start - 4);
    chunks.unshift(str.substring(start, end));
  }

  chunks.reverse();

  const parts: string[] = [];

  for (let i = chunks.length - 1; i >= 0; i--) {
    const chunk = chunks[i];
    const chunkNum = Number(chunk);
    if (chunkNum === 0) continue;

    let chunkStr = "";
    const padded = chunk.padStart(4, "0");

    for (let j = 0; j < 4; j++) {
      const digit = Number(padded[j]);
      if (digit === 0) continue;

      const tenUnit = tenUnits[3 - j];
      if (tenUnit && digit === 1) {
        chunkStr += tenUnit;
      } else {
        chunkStr += numberUnits[digit] + tenUnit;
      }
    }

    parts.push(chunkStr + thousandUnits[i]);
  }

  return parts.join("");
}
