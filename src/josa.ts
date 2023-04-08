import { HANGUL_START_CHARCODE, JONG_PERIOD, JOSA_LIST } from "./constant";

export function josa(letter: string = "", _josa: string = "이") {
  const hasJong =
    (letter.charCodeAt(letter.length - 1) - HANGUL_START_CHARCODE) %
      JONG_PERIOD >
    0;
  const josaIndex = hasJong ? 0 : 1;

  const josa = _josa.replace(/\[|\]/g, "");

  const josaCase = getJosaCasc(josa.split("/")[0]) || josa;

  return josaCase.split("/")[josaIndex] ?? josa;
}

// 오늘[은/는] 사과[이/가]
export function formatJosa(letter: string = "") {
  return letter.replace(
    /[가-힣]\[[가-힣]+\/[가-힣]+\]/g,
    (match) => match[0] + josa(match[0], match.slice(1))
  );
}

function getJosaCasc(josa: string = "") {
  return JOSA_LIST[josa] ?? josa;
}
