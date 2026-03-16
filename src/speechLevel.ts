type SpeechLevel = "formal" | "polite" | "informal" | "plain" | "unknown";

// [어미, 레벨] 쌍 — 긴 어미부터 정렬하여 가장 구체적인 것이 먼저 매칭
const ENDINGS: [string, SpeechLevel][] = [
  // 합쇼체 (격식 높임) — ㅂ니다/습니다 계열
  ["습니까", "formal"],
  ["습니다", "formal"],
  ["십시오", "formal"],
  ["옵소서", "formal"],
  ["니까", "formal"],
  ["니다", "formal"],
  // 해요체 (비격식 높임)
  ["겠어요", "polite"],
  ["거예요", "polite"],
  ["이에요", "polite"],
  ["세요", "polite"],
  ["에요", "polite"],
  ["어요", "polite"],
  ["아요", "polite"],
  ["여요", "polite"],
  ["해요", "polite"],
  ["워요", "polite"],
  ["지요", "polite"],
  ["네요", "polite"],
  ["데요", "polite"],
  ["래요", "polite"],
  ["나요", "polite"],
  ["가요", "polite"],
  ["죠", "polite"],
  // 해라체 (격식 낮춤) — 긴 것부터
  ["리로다", "plain"],
  ["겠다", "plain"],
  ["었다", "plain"],
  ["았다", "plain"],
  ["한다", "plain"],
  ["는다", "plain"],
  ["인다", "plain"],
  ["이다", "plain"],
  ["더라", "plain"],
  ["도다", "plain"],
  ["느냐", "plain"],
  ["는가", "plain"],
  ["리라", "plain"],
  ["다", "plain"],
  // 해체 (비격식 낮춤)
  ["잖아", "informal"],
  ["는데", "informal"],
  ["나봐", "informal"],
  ["거든", "informal"],
  ["어", "informal"],
  ["아", "informal"],
  ["여", "informal"],
  ["워", "informal"],
  ["해", "informal"],
  ["래", "informal"],
  ["게", "informal"],
  ["지", "informal"],
  ["냐", "informal"],
  ["니", "informal"],
  ["야", "informal"],
  ["가", "informal"],
];

// 긴 어미부터 매칭하도록 정렬
const SORTED_ENDINGS = [...ENDINGS].sort((a, b) => b[0].length - a[0].length);

function cleanSentence(text: string): string {
  return text.replace(/[.!?~,\s]+$/, "").trim();
}

/**
 * 문장의 존댓말 레벨을 감지
 * @example detectSpeechLevel("감사합니다") → "formal"
 * @example detectSpeechLevel("감사해요") → "polite"
 * @example detectSpeechLevel("감사해") → "informal"
 * @example detectSpeechLevel("감사하다") → "plain"
 */
export function detectSpeechLevel(text: string = ""): SpeechLevel {
  const cleaned = cleanSentence(text);
  if (!cleaned) return "unknown";

  for (const [ending, level] of SORTED_ENDINGS) {
    if (cleaned.endsWith(ending)) return level;
  }

  return "unknown";
}

/**
 * 문장이 존댓말인지 확인
 * @example isFormal("감사합니다") → true
 * @example isFormal("감사해") → false
 */
export function isFormal(text: string = ""): boolean {
  const level = detectSpeechLevel(text);
  return level === "formal" || level === "polite";
}

/**
 * 문장이 반말인지 확인
 * @example isInformal("고마워") → true
 * @example isInformal("감사합니다") → false
 */
export function isInformal(text: string = ""): boolean {
  const level = detectSpeechLevel(text);
  return level === "informal" || level === "plain";
}
