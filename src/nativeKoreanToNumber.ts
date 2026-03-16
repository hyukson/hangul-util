const NATIVE_TO_NUM: Record<string, number> = {
  하나: 1, 둘: 2, 셋: 3, 넷: 4, 다섯: 5,
  여섯: 6, 일곱: 7, 여덟: 8, 아홉: 9, 열: 10,
  스물: 20, 서른: 30, 마흔: 40, 쉰: 50,
  예순: 60, 일흔: 70, 여든: 80, 아흔: 90,
};

// 수 관형사 형태도 지원
const COUNTER_TO_NUM: Record<string, number> = {
  한: 1, 두: 2, 세: 3, 네: 4, 다섯: 5,
  여섯: 6, 일곱: 7, 여덟: 8, 아홉: 9, 열: 10,
  스물: 20, 스무: 20, 서른: 30, 마흔: 40, 쉰: 50,
  예순: 60, 일흔: 70, 여든: 80, 아흔: 90,
};

// 십의 자리 (긴 것부터 매칭)
const TENS = ["스물", "스무", "서른", "마흔", "예순", "일흔", "여든", "아흔", "쉰", "열"];
const ONES = ["하나", "둘", "셋", "넷", "다섯", "여섯", "일곱", "여덟", "아홉"];
const COUNTER_ONES = ["한", "두", "세", "네", "다섯", "여섯", "일곱", "여덟", "아홉"];

/**
 * 고유어 수사를 숫자로 변환 (1~99)
 * @example nativeKoreanToNumber("하나") → 1
 * @example nativeKoreanToNumber("스물다섯") → 25
 * @example nativeKoreanToNumber("아흔아홉") → 99
 * @example nativeKoreanToNumber("세") → 3  (수 관형사도 지원)
 */
export function nativeKoreanToNumber(word: string = ""): number {
  const cleaned = word.trim();
  if (!cleaned) return 0;

  // 단일 매칭 (기본형)
  if (NATIVE_TO_NUM[cleaned] !== undefined) return NATIVE_TO_NUM[cleaned];
  if (COUNTER_TO_NUM[cleaned] !== undefined) return COUNTER_TO_NUM[cleaned];

  // 십의 자리 + 일의 자리 분해
  let result = 0;
  let remaining = cleaned;

  // 십의 자리 찾기
  for (const ten of TENS) {
    if (remaining.startsWith(ten)) {
      result += NATIVE_TO_NUM[ten] ?? COUNTER_TO_NUM[ten] ?? 0;
      remaining = remaining.slice(ten.length);
      break;
    }
  }

  if (!remaining) return result;

  // 일의 자리 찾기 (기본형)
  for (const one of ONES) {
    if (remaining === one) {
      result += NATIVE_TO_NUM[one];
      return result;
    }
  }

  // 일의 자리 찾기 (관형사형)
  for (const one of COUNTER_ONES) {
    if (remaining === one) {
      result += COUNTER_TO_NUM[one];
      return result;
    }
  }

  return result || 0;
}
