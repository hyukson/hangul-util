import {
  CHO_PERIOD,
  JONG_PERIOD,
  HANGUL_START_CHARCODE,
} from "./constant";
import { isHangulByCode } from "./isHangul";

interface Syllable {
  cho: number;
  jung: number;
  jong: number;
}

function decompose(code: number): Syllable {
  const charCode = code - HANGUL_START_CHARCODE;
  return {
    cho: Math.floor(charCode / CHO_PERIOD),
    jung: Math.floor((charCode % CHO_PERIOD) / JONG_PERIOD),
    jong: charCode % JONG_PERIOD,
  };
}

function compose(s: Syllable): string {
  return String.fromCharCode(
    HANGUL_START_CHARCODE + s.cho * CHO_PERIOD + s.jung * JONG_PERIOD + s.jong
  );
}

// 종성 index → 초성 index 매핑 (연음용)
const JONG_TO_CHO: Record<number, number> = {
  1: 0,    // ㄱ
  2: 1,    // ㄲ
  4: 2,    // ㄴ
  7: 3,    // ㄷ
  8: 5,    // ㄹ
  16: 6,   // ㅁ
  17: 7,   // ㅂ
  19: 9,   // ㅅ
  20: 10,  // ㅆ
  21: 11,  // ㅇ
  22: 12,  // ㅈ
  23: 14,  // ㅊ
  24: 15,  // ㅋ
  25: 16,  // ㅌ
  26: 17,  // ㅍ
  27: 18,  // ㅎ
};

// 비음화: 장애음 종성 → 비음 (ㄴ,ㅁ 앞)
const NASALIZATION_JONG: Record<number, number> = {
  1: 21,   // ㄱ → ㅇ
  2: 21,   // ㄲ → ㅇ
  24: 21,  // ㅋ → ㅇ
  7: 4,    // ㄷ → ㄴ
  19: 4,   // ㅅ → ㄴ
  20: 4,   // ㅆ → ㄴ
  22: 4,   // ㅈ → ㄴ
  23: 4,   // ㅊ → ㄴ
  25: 4,   // ㅌ → ㄴ
  17: 16,  // ㅂ → ㅁ
  26: 16,  // ㅍ → ㅁ
};

// 경음화 대상 종성
const FORTITION_JONG = new Set([1, 2, 24, 3, 9, 7, 19, 20, 22, 23, 25, 17, 26, 11, 18]);

// 경음화: 초성 → 경음
const FORTITION_MAP: Record<number, number> = {
  0: 1,    // ㄱ → ㄲ
  3: 4,    // ㄷ → ㄸ
  7: 8,    // ㅂ → ㅃ
  9: 10,   // ㅅ → ㅆ
  12: 13,  // ㅈ → ㅉ
};

// 격음화: 초성 + ㅎ → 격음
const H_ASPIRATE: Record<number, number> = {
  0: 15,   // ㄱ + ㅎ → ㅋ
  3: 16,   // ㄷ + ㅎ → ㅌ
  7: 17,   // ㅂ + ㅎ → ㅍ
  12: 14,  // ㅈ + ㅎ → ㅊ
};

// 종성 index → 초성 index (격음화 역방향 매핑용)
const JONG_TO_CHO_FOR_ASPIRATE: Record<number, number> = {
  1: 0,    // ㄱ
  7: 3,    // ㄷ
  17: 7,   // ㅂ
  22: 12,  // ㅈ
};

// 복합 종성 분리
const COMPOUND_JONG: Record<number, [number, number]> = {
  3: [1, 19],    // ㄳ → ㄱ, ㅅ
  5: [4, 22],    // ㄵ → ㄴ, ㅈ
  6: [4, 27],    // ㄶ → ㄴ, ㅎ
  9: [8, 1],     // ㄺ → ㄹ, ㄱ
  10: [8, 16],   // ㄻ → ㄹ, ㅁ
  11: [8, 17],   // ㄼ → ㄹ, ㅂ
  12: [8, 19],   // ㄽ → ㄹ, ㅅ
  13: [8, 25],   // ㄾ → ㄹ, ㅌ
  14: [8, 26],   // ㄿ → ㄹ, ㅍ
  15: [8, 27],   // ㅀ → ㄹ, ㅎ
  18: [17, 19],  // ㅄ → ㅂ, ㅅ
};

// 대표음 (7종성법)
const REPRESENTATIVE_JONG: Record<number, number> = {
  2: 1,    // ㄲ → ㄱ
  24: 1,   // ㅋ → ㄱ
  19: 7,   // ㅅ → ㄷ
  20: 7,   // ㅆ → ㄷ
  22: 7,   // ㅈ → ㄷ
  23: 7,   // ㅊ → ㄷ
  25: 7,   // ㅌ → ㄷ
  27: 7,   // ㅎ → ㄷ
  26: 17,  // ㅍ → ㅂ
};

// 비음 초성 (ㄴ=2, ㅁ=6)
const NASAL_CHO = new Set([2, 6]);

const JONG_H = 27;
const CHO_H = 18;
const L_JONG = 8;
const L_CHO = 5;
const N_JONG = 4;
const N_CHO = 2;
const IEUNG_CHO = 11;

/**
 * 한글 발음 변환 (표준 발음법)
 * 연음, 비음화, 경음화, 격음화, 유음화, 구개음화 등 적용
 * @example pronounce("먹어") → "머거"
 * @example pronounce("국물") → "궁물"
 * @example pronounce("학교") → "학꾜"
 * @example pronounce("좋아") → "조아"
 * @example pronounce("신라") → "실라"
 */
export function pronounce(text: string): string {
  const chars = text.split("");
  const syllables: (Syllable | null)[] = [];
  const nonHangul: (string | null)[] = [];

  for (let i = 0; i < chars.length; i++) {
    const code = chars[i].charCodeAt(0);
    if (isHangulByCode(code)) {
      syllables.push({ ...decompose(code) });
      nonHangul.push(null);
    } else {
      syllables.push(null);
      nonHangul.push(chars[i]);
    }
  }

  for (let i = 0; i < syllables.length - 1; i++) {
    const curr = syllables[i];
    const next = syllables[i + 1];

    if (!curr || !next) continue;
    if (curr.jong === 0) continue;

    // 1. 복합 종성 처리
    if (COMPOUND_JONG[curr.jong]) {
      const [first, second] = COMPOUND_JONG[curr.jong];

      // 복합종성 + ㅇ초성 → 연음
      if (next.cho === IEUNG_CHO) {
        curr.jong = first;
        next.cho = JONG_TO_CHO[second] ?? next.cho;
        continue;
      }

      // 복합종성의 ㅎ + 초성 → 격음화
      if (second === JONG_H && H_ASPIRATE[next.cho] !== undefined) {
        curr.jong = first;
        next.cho = H_ASPIRATE[next.cho];
        continue;
      }

      // 종성 + ㅎ초성 → 격음화
      if (next.cho === CHO_H && JONG_TO_CHO_FOR_ASPIRATE[second] !== undefined) {
        curr.jong = first;
        next.cho = H_ASPIRATE[JONG_TO_CHO_FOR_ASPIRATE[second]];
        continue;
      }
    }

    // 2. 연음법칙: 종성 + ㅇ초성
    if (next.cho === IEUNG_CHO) {
      // ㅎ종성 + ㅇ → ㅎ탈락
      if (curr.jong === JONG_H) {
        curr.jong = 0;
        continue;
      }
      next.cho = JONG_TO_CHO[curr.jong] ?? next.cho;
      curr.jong = 0;
      continue;
    }

    // 3. 격음화: ㅎ종성 + ㄱ,ㄷ,ㅂ,ㅈ → 격음
    if (curr.jong === JONG_H && H_ASPIRATE[next.cho] !== undefined) {
      curr.jong = 0;
      next.cho = H_ASPIRATE[next.cho];
      continue;
    }

    // 4. 격음화: 종성 + ㅎ초성
    if (next.cho === CHO_H && JONG_TO_CHO_FOR_ASPIRATE[curr.jong] !== undefined) {
      next.cho = H_ASPIRATE[JONG_TO_CHO_FOR_ASPIRATE[curr.jong]];
      curr.jong = 0;
      continue;
    }

    // 5. 구개음화: ㄷ/ㅌ종성 + ㅣ모음 → ㅈ/ㅊ
    if (next.jung === 20 && next.cho === IEUNG_CHO) { // ㅣ
      if (curr.jong === 7) { // ㄷ
        curr.jong = 0;
        next.cho = 12; // ㅈ
        continue;
      }
      if (curr.jong === 25) { // ㅌ
        curr.jong = 0;
        next.cho = 14; // ㅊ
        continue;
      }
    }

    // 6. 비음화: 장애음 + ㄴ,ㅁ
    if (NASAL_CHO.has(next.cho) && NASALIZATION_JONG[curr.jong] !== undefined) {
      curr.jong = NASALIZATION_JONG[curr.jong];
      continue;
    }

    // 7. 유음화: ㄴ+ㄹ → ㄹ+ㄹ, ㄹ+ㄴ → ㄹ+ㄹ
    if (curr.jong === N_JONG && next.cho === L_CHO) {
      curr.jong = L_JONG;
      continue;
    }
    if (curr.jong === L_JONG && next.cho === N_CHO) {
      next.cho = L_CHO;
      continue;
    }

    // 8. 경음화
    if (FORTITION_JONG.has(curr.jong) && FORTITION_MAP[next.cho] !== undefined) {
      next.cho = FORTITION_MAP[next.cho];
      continue;
    }
  }

  // 어말 대표음 처리
  for (let i = 0; i < syllables.length; i++) {
    const s = syllables[i];
    if (!s || s.jong === 0) continue;

    const isWordFinal = i === syllables.length - 1 || syllables[i + 1] === null;

    if (isWordFinal) {
      if (COMPOUND_JONG[s.jong]) {
        s.jong = COMPOUND_JONG[s.jong][0];
      }
      if (REPRESENTATIVE_JONG[s.jong] !== undefined) {
        s.jong = REPRESENTATIVE_JONG[s.jong];
      }
    }
  }

  const result: string[] = [];
  for (let i = 0; i < syllables.length; i++) {
    if (syllables[i]) {
      result.push(compose(syllables[i]!));
    } else {
      result.push(nonHangul[i]!);
    }
  }

  return result.join("");
}
