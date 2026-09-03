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

/**
 * 큰 수 단위 중 숫자 낱자(일~구)와 겹치지 않는 것만 사용한다.
 *
 * `thousandUnits`에는 10^32을 뜻하는 "구"가 들어있는데, 이는 숫자 9를 뜻하는
 * "구"와 글자가 같다. 이를 단위로 인식하면 "구십"이 90이 아니라 10^32이 되고
 * "삼백구십"은 3e34가 된다. 10^32은 어차피 배정밀도 실수로 정확히 표현할 수
 * 없는 범위이므로, 겹치는 단위는 숫자 낱자 해석을 우선한다.
 */
const LARGE_UNITS = thousandUnits
  .filter((unit) => unit && SINO_DIGIT_MAP[unit] === undefined)
  .reverse();

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
 * @example hangulToNumber("구십") → 90
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
