const NATIVE_DAYS: Record<number, string> = {
  1: "하루",
  2: "이틀",
  3: "사흘",
  4: "나흘",
  5: "닷새",
  6: "엿새",
  7: "이레",
  8: "여드레",
  9: "아흐레",
  10: "열흘",
  11: "열하루",
  12: "열이틀",
  13: "열사흘",
  14: "열나흘",
  15: "보름",
  16: "열엿새",
  17: "열이레",
  18: "열여드레",
  19: "열아흐레",
  20: "스무날",
  21: "스무하루",
  22: "스무이틀",
  23: "스무사흘",
  24: "스무나흘",
  25: "스무닷새",
  26: "스무엿새",
  27: "스무이레",
  28: "스무여드레",
  29: "스무아흐레",
  30: "그믐",
};

const KOREAN_MONTHS: Record<number, string> = {
  1: "일월",
  2: "이월",
  3: "삼월",
  4: "사월",
  5: "오월",
  6: "유월",
  7: "칠월",
  8: "팔월",
  9: "구월",
  10: "시월",
  11: "십일월",
  12: "십이월",
};

/**
 * 고유어 날짜 이름 (1~30)
 * @example days(1) → "하루"
 * @example days(3) → "사흘"
 * @example days(15) → "보름"
 */
export function days(n: number): string {
  return NATIVE_DAYS[n] || "";
}

/**
 * 한국어 월 이름 (1~12)
 * @example months(6) → "유월"
 * @example months(10) → "시월"
 */
export function months(n: number): string {
  return KOREAN_MONTHS[n] || "";
}
