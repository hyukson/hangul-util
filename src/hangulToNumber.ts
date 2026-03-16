import { numberUnits, thousandUnits } from "./constant";

const SINO_DIGIT_MAP: Record<string, number> = {};
numberUnits.forEach((unit, i) => {
  if (unit) SINO_DIGIT_MAP[unit] = i;
});

const TEN_UNIT_MAP: Record<string, number> = {
  십: 10,
  백: 100,
  천: 1000,
};

const THOUSAND_UNIT_MAP: Record<string, number> = {};
thousandUnits.forEach((unit, i) => {
  if (unit) THOUSAND_UNIT_MAP[unit] = Math.pow(10000, i);
});

const LARGE_UNITS = thousandUnits.filter((u) => u).reverse();

function parseSmallHangul(hangul: string): number {
  let result = 0;
  let current = 0;

  for (let i = 0; i < hangul.length; i++) {
    const char = hangul[i];

    if (SINO_DIGIT_MAP[char] !== undefined) {
      current = SINO_DIGIT_MAP[char];
    } else if (TEN_UNIT_MAP[char] !== undefined) {
      if (current === 0) current = 1;
      result += current * TEN_UNIT_MAP[char];
      current = 0;
    }
  }

  result += current;
  return result;
}

/**
 * 한글 숫자를 숫자로 변환
 * @example hangulToNumber("백이십삼") → 123
 * @example hangulToNumber("삼만 오천") → 35000
 * @example hangulToNumber("일억 이천삼백만") → 123000000
 */
export function hangulToNumber(hangul: string = ""): number {
  const cleaned = hangul.replace(/\s/g, "");

  if (!cleaned) return 0;

  let result = 0;
  let remaining = cleaned;

  for (const unit of LARGE_UNITS) {
    const unitIndex = remaining.indexOf(unit);
    if (unitIndex === -1) continue;

    const before = remaining.substring(0, unitIndex);
    remaining = remaining.substring(unitIndex + unit.length);

    const value = before ? parseSmallHangul(before) : 1;
    result += value * THOUSAND_UNIT_MAP[unit];
  }

  if (remaining) {
    result += parseSmallHangul(remaining);
  }

  return result;
}
