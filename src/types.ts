export type LocalTypes = "ko" | "en" | "number" | "special" | "etc";

export type DivideOptionTypes = {
  isSplit?: boolean;
  resultType?: "object" | "string" | "array" | "index";
};

export type TypingOptionTypes = {
  content?: string;
  speed?: number;
};

/** divide(resultType: "index") 결과 — 초/중/종성 인덱스 */
export type DividedIndex = {
  cho: number;
  jung: number;
  jong: number;
};

/** divide(resultType: "object") 결과 — 초/중/종성 문자열 */
export type DividedJamo = {
  cho: string;
  jung: string;
  jong: string;
};

/** divide 가 반환할 수 있는 모든 형태 */
export type DividedResult = DividedIndex | DividedJamo | string | string[];
