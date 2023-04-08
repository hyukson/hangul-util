import { reverseByArray } from "./utils";

const FIRST_REGEX = /(\s)?(^[가-힣]{0,3}|[가-힣]{1,3})(\s*)/;
const LAST_REGEX = /([\.|\,|\s])/;

const formater = [
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

const makeRegByFormater = (array: any) => {
  const result: string[] = [];

  array.forEach((caseList: any) => {
    const case1List = caseList[0].map(
      (case1: string) =>
        new RegExp(FIRST_REGEX.source + case1 + LAST_REGEX.source, "g")
    );

    const list = case1List.reduce(
      (acc2: RegExp[], regex: RegExp) =>
        acc2.concat(
          caseList[1].map((case2: string) => [
            regex,
            `$1;$2;$3;${case2.split("").join(";")};$4`,
          ])
        ),
      []
    );

    result.push(...list);
  });

  return result;
};

const BANMAL_REGEX_LIST = makeRegByFormater(formater);
const HONORIFIC_REGEX_LIST = makeRegByFormater(reverseByArray(formater));

export function toBanmal(string: string) {
  return BANMAL_REGEX_LIST.reduce(
    (acc: string, [$1, $2]: any) => acc.replace($1, $2),
    string
  ).replace(/;/g, "");
}

export function toHonorific(string: string) {
  return HONORIFIC_REGEX_LIST.reduce(
    (acc: string, [$1, $2]: any) => acc.replace($1, $2),
    string
  ).replace(/;/g, "");
}
