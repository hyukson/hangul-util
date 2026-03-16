import { divideHangul } from "./divide";
import { sortByASC } from "./sortHangul";

function minBy(x1: number, x2: number, x3: number) {
  return x1 > x2 ? (x2 > x3 ? x3 : x2) : x3 > x1 ? x1 : x3;
}

const memo: any = {};

// levenshtein distance
export function getDistance(first: string, second: string): number {
  if (first === second) return 0;
  if (!first) return second.length;
  if (!second) return first.length;

  const key = first + '||' + second;
  if (memo[key]) return memo[key];

  const m = first.length;
  const n = second.length;

  let prev = new Array(n + 1);
  let curr = new Array(n + 1);

  for (let j = 0; j <= n; j++) prev[j] = j;

  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      curr[j] = minBy(
        prev[j] + 1,
        curr[j - 1] + 1,
        prev[j - 1] + (first[i - 1] === second[j - 1] ? 0 : 1)
      );
    }
    const tmp = prev;
    prev = curr;
    curr = tmp;
  }

  memo[key] = prev[n];
  return prev[n];
}

export function correctByDistance(
  word: string,
  list: string[],
  option?: { distance?: number; maxSlice?: number; isSplit?: boolean }
) {
  const distance = option?.distance ?? Math.max(word.length / 2, 2);
  const maxSlice = option?.maxSlice ?? 10;
  const isSplit = option?.isSplit ?? true;

  const minDist = [];

  const dividedWord = divideHangul(word, true).join("");

  for (let index = 0; index < list.length; index++) {
    const dist = isSplit
      ? getDistance(dividedWord, divideHangul(list[index], true).join(""))
      : getDistance(word, list[index]);

    if (dist <= distance) {
      minDist.push({ dist, word: list[index] });
    }
  }

  return sortByASC(minDist, "dist")
    .slice(0, maxSlice)
    .map((item) => item.word);
}
