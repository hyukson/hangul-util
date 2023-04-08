import { combineByCode } from "./combine";
import { CHO_HANGUL } from "./constant";

export function makeRegexByCho(search: string = "") {
  const regex = CHO_HANGUL.reduce(
    (acc: string, cho: string, index: number) =>
      acc.replace(
        new RegExp(cho, "g"),
        `[${combineByCode(index, 0, 0)}-${combineByCode(index + 1, 0, -1)}]`
      ),
    search
  );

  return new RegExp(`(${regex})`, "g");
}

export function includesByCho(search: string = "", word: string = "") {
  return makeRegexByCho(search).test(word);
}
