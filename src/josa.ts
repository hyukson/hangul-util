import { JOSA_LIST } from "./constant";
import { isHangulByCode } from "./isHangul";
import { getJongIndex } from "./syllable";

/** 종성 ㄹ의 인덱스 (JONG_HANGUL 기준) */
const JONG_RIEUL = 8;

/**
 * 숫자로 끝나는 단어의 받침은 그 숫자를 읽은 소리로 판단한다.
 * 예) 1(일)·7(칠)·8(팔)·0(영) → 받침 있음, 2(이)·4(사)·5(오)·9(구) → 받침 없음
 */
const DIGIT_HAS_JONG: Record<string, boolean> = {
  "0": true, // 영
  "1": true, // 일
  "2": false, // 이
  "3": true, // 삼
  "4": false, // 사
  "5": false, // 오
  "6": true, // 육
  "7": true, // 칠
  "8": true, // 팔
  "9": false, // 구
};

/** 숫자 1(일), 7(칠)은 ㄹ 받침으로 끝나 "으로"가 아닌 "로"를 쓴다. */
const DIGIT_RIEUL_JONG: Record<string, boolean> = { "1": true, "7": true };

interface JongInfo {
  hasJong: boolean;
  isRieul: boolean;
}

function getJongInfo(letter: string): JongInfo {
  if (!letter) return { hasJong: false, isRieul: false };

  const last = letter[letter.length - 1];
  const code = last.charCodeAt(0);

  if (isHangulByCode(code)) {
    const jong = getJongIndex(code);
    return { hasJong: jong > 0, isRieul: jong === JONG_RIEUL };
  }

  if (DIGIT_HAS_JONG[last] !== undefined) {
    return {
      hasJong: DIGIT_HAS_JONG[last],
      isRieul: DIGIT_RIEUL_JONG[last] === true,
    };
  }

  return { hasJong: false, isRieul: false };
}

/**
 * 앞 글자의 받침에 맞는 조사를 고른다.
 * @example josa("영희", "는") → "는"
 * @example josa("서울", "으로") → "로"   // ㄹ 받침 예외
 * @example josa("3", "은") → "은"        // 숫자는 읽는 소리로 판단
 */
export function josa(letter: string = "", _josa: string = "이") {
  const { hasJong, isRieul } = getJongInfo(letter);

  const josa = _josa.replace(/\[|\]/g, "");

  const josaCase = getJosaCasc(josa.split("/")[0]) || josa;

  const options = josaCase.split("/");

  // "으로/로"는 ㄹ 받침 뒤에서 "로"를 쓴다. (서울로, 지하철로)
  const josaIndex = hasJong && !(isRieul && josaCase === "으로/로") ? 0 : 1;

  return options[josaIndex] ?? josa;
}

// 오늘[은/는] 사과[이/가]
export function formatJosa(letter: string = "") {
  return letter.replace(
    /[가-힣0-9]\[[가-힣]+\/[가-힣]+\]/g,
    (match) => match[0] + josa(match[0], match.slice(1))
  );
}

function getJosaCasc(josa: string = "") {
  return JOSA_LIST[josa] ?? josa;
}
