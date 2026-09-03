import { reverseByArray } from "./utils";

const FIRST_REGEX = /(\s)?(^[가-힣]{0,3}|[가-힣]{1,3})(\s*)/;
const LAST_REGEX = /([\.|\,|\s])/;

/** [바꿀 어미들, 바뀐 어미들] 쌍 */
type SpeechRule = [string[], string[]];

/** [찾을 정규식, 치환 문자열] 쌍 */
type ReplaceRule = [RegExp, string];

const formater: SpeechRule[] = [
  [["습니다"], ["다"]],
  [["주세요"], ["라"]],
  [["입니다"], ["이다"]],
  [["합니다"], ["하다"]],
  [["옵니다"], ["온다"]],
  [["됩니다"], ["된다"]],
  [["갑니다"], ["간다"]],
  [["깁니다"], ["긴다"]],
  [["십니다"], ["신다"]],
  [["랍니다"], ["란다"]],
  [["저는"], ["나는"]],
];

const makeRegByFormater = (array: SpeechRule[]): ReplaceRule[] => {
  const result: ReplaceRule[] = [];

  array.forEach(([from, to]) => {
    from.forEach((case1) => {
      const regex = new RegExp(
        FIRST_REGEX.source + case1 + LAST_REGEX.source,
        "g"
      );

      to.forEach((case2) => {
        // 치환된 글자가 다시 다른 규칙에 걸리지 않도록 ";"로 구분해 두고 마지막에 제거한다.
        result.push([regex, `$1;$2;$3;${case2.split("").join(";")};$4`]);
      });
    });
  });

  return result;
};

const BANMAL_REGEX_LIST = makeRegByFormater(formater);
const HONORIFIC_REGEX_LIST = makeRegByFormater(reverseByArray(formater));

export function toBanmal(string: string) {
  return BANMAL_REGEX_LIST.reduce(
    (acc, [pattern, replacement]) => acc.replace(pattern, replacement),
    string
  ).replace(/;/g, "");
}

export function toHonorific(string: string) {
  return HONORIFIC_REGEX_LIST.reduce(
    (acc, [pattern, replacement]) => acc.replace(pattern, replacement),
    string
  ).replace(/;/g, "");
}
